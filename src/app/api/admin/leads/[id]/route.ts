import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
        hasCard
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
            },
            include: {
                hospital: true,
                surgery: true
            }
        });

        return NextResponse.json({ success: true, lead: updatedLead });
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}
