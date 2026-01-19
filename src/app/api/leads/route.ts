import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations';
import { generateReferenceId, extractUTMParams } from '@/lib/utils';
import { sendLeadConfirmation, notifyOpsTeam } from '@/lib/email';
import { prisma } from '@/lib/prisma';

// Rate limiting disabled for Demo Mode
async function checkRateLimit(ip: string): Promise<boolean> {
    return true;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        const allowed = await checkRateLimit(ip);
        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate input
        const parsed = leadFormSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const data = parsed.data;

        // Check honeypot (spam protection)
        if (data.website && data.website.length > 0) {
            // Silently reject but return success to confuse bots
            return NextResponse.json({
                success: true,
                referenceId: generateReferenceId()
            });
        }

        // Verify surgery exists
        const surgery = await prisma.surgery.findUnique({
            where: { id: data.surgeryId }
        });

        if (!surgery) {
            return NextResponse.json({ error: 'Invalid surgery selected' }, { status: 400 });
        }

        // Parse UTM parameters from source page
        let utmSource, utmCampaign, utmMedium, utmTerm, utmContent;
        try {
            const utmParams = extractUTMParams(body.sourcePage || 'https://healthexpress.in');
            utmSource = utmParams.source;
            utmCampaign = utmParams.campaign;
            utmMedium = utmParams.medium;
            utmTerm = utmParams.term;
            utmContent = utmParams.content;
        } catch {
            // Invalid URL, ignore
        }

        // Generate reference ID
        const referenceId = generateReferenceId();

        // Save to Database
        const lead = await prisma.lead.create({
            data: {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email || null,
                city: data.city,
                surgeryId: data.surgeryId,
                description: `Inquiry for ${surgery.name}`,
                sourcePage: body.sourcePage || '/',
                utmSource,
                utmCampaign,
                utmMedium,
                utmTerm,
                utmContent,
                referenceId,
                status: 'NEW'
            }
        });

        // Send emails (don't await - fire and forget)
        if (data.email) {
            sendLeadConfirmation(data.email, data.fullName, referenceId, surgery.name).catch(console.error);
        }
        notifyOpsTeam(referenceId, data.fullName, data.phone, surgery.name, data.city).catch(console.error);

        return NextResponse.json({
            success: true,
            referenceId,
        });
    } catch (error) {
        console.error('Lead creation error:', error);
        return NextResponse.json(
            { error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
