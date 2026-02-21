import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/mailer';
import { LeadStatus } from '@/generated/prisma';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
        status,
        hospitalId,
        originalCost,
        isEmergency,
        hasCard,
        notes
    } = body;

    try {
        // Calculate revenue if hospital and cost are provided
        let discountedCost = originalCost;
        let revenue = null;

        if (originalCost && hospitalId) {
            const hospital = await prisma.hospital.findUnique({
                where: { id: hospitalId }
            });

            if (hospital) {
                const discount = hasCard ? (originalCost * (hospital.discountPercent / 100)) : 0;
                discountedCost = originalCost - discount;
                revenue = discountedCost * 0.15; // 15% standard commission
            }
        }

        const updatedLead = await prisma.lead.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(hospitalId && { hospitalId }),
                ...(originalCost !== undefined && { originalCost }),
                ...(discountedCost !== undefined && { discountedCost }),
                ...(revenue !== undefined && { revenue }),
                ...(isEmergency !== undefined && { isEmergency }),
                ...(hasCard !== undefined && { hasCard }),
                ...(notes !== undefined && { notes }),
            },
            include: {
                hospital: true,
                surgery: true
            }
        });

        // Trigger email notification if status changed and patient has email
        if (status && updatedLead.email) {
            try {
                const template = emailTemplates.statusUpdate(
                    updatedLead.fullName,
                    status.replace('_', ' '),
                    status === 'ASSIGNED' ? `Matched with ${updatedLead.hospital?.name || 'a partner hospital'}.` : undefined
                );

                await sendEmail({
                    to: updatedLead.email,
                    subject: template.subject,
                    text: template.text,
                    html: template.html,
                });
            } catch (emailError) {
                console.error('Failed to send status update email:', emailError);
                // Don't fail the whole request if email fails
            }
        }

        return NextResponse.json({ success: true, lead: updatedLead });
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}

// GET /api/dashboard/leads/export — CSV download (id='export' used as route)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    if (id !== 'export') return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const surgery = searchParams.get('surgery');
    const city = searchParams.get('city');

    const where: Record<string, unknown> = {};
    if (status && Object.values(LeadStatus).includes(status as LeadStatus)) where.status = status;
    if (surgery) where.surgeryId = surgery;
    if (city) where.city = { contains: city, mode: 'insensitive' };

    const leads = await prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { surgery: { select: { name: true } } },
    });

    const headers = ['Reference ID', 'Full Name', 'Phone', 'Email', 'City', 'Surgery', 'Description', 'Insurance', 'Callback Time', 'Status', 'UTM Source', 'UTM Campaign', 'Created At'];
    const rows = leads.map((lead) => [
        lead.referenceId, lead.fullName, lead.phone, lead.email || '', lead.city,
        lead.surgery.name, `"${lead.description.replace(/"/g, '""')}"`,
        lead.insurance, lead.callbackTime || '', lead.status,
        lead.utmSource || '', lead.utmCampaign || '', lead.createdAt.toISOString(),
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
        },
    });
}
