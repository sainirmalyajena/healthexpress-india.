import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { LeadStatus } from '@/generated/prisma';

export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const surgery = searchParams.get('surgery');
    const city = searchParams.get('city');

    const where: Record<string, unknown> = {};

    if (status && Object.values(LeadStatus).includes(status as LeadStatus)) {
        where.status = status;
    }

    if (surgery) {
        where.surgeryId = surgery;
    }

    if (city) {
        where.city = { contains: city, mode: 'insensitive' };
    }

    const leads = await prisma.lead.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { surgery: { select: { name: true } } },
    });

    // Generate CSV
    const headers = [
        'Reference ID',
        'Full Name',
        'Phone',
        'Email',
        'City',
        'Surgery',
        'Description',
        'Insurance',
        'Callback Time',
        'Status',
        'UTM Source',
        'UTM Campaign',
        'Created At',
    ];

    const rows = leads.map((lead) => [
        lead.referenceId,
        lead.fullName,
        lead.phone,
        lead.email || '',
        lead.city,
        lead.surgery.name,
        `"${lead.description.replace(/"/g, '""')}"`,
        lead.insurance,
        lead.callbackTime || '',
        lead.status,
        lead.utmSource || '',
        lead.utmCampaign || '',
        lead.createdAt.toISOString(),
    ]);

    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
        },
    });
}
