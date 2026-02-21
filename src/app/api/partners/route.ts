import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateReferenceId } from '@/lib/utils';
import { sendEmail, emailTemplates } from '@/lib/mailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.hospitalName || !body.email || !body.phone) {
            return NextResponse.json(
                { error: 'Hospital name, email, and phone are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate specialties
        if (!body.specialties || body.specialties.length === 0) {
            return NextResponse.json(
                { error: 'Please select at least one specialty' },
                { status: 400 }
            );
        }

        // Generate reference ID
        const referenceId = generateReferenceId();

        // Save to Database
        const partnerRequest = await prisma.partnerRequest.create({
            data: {
                // Basic Info
                hospitalName: body.hospitalName,
                registrationNumber: body.registrationNumber,
                city: body.city,
                state: body.state,
                pincode: body.pincode,

                // Contact
                contactPerson: body.contactPerson,
                designation: body.designation,
                email: body.email,
                phone: body.phone,
                website: body.website || null,

                // Hospital Details
                hospitalType: body.hospitalType || [],
                specialties: body.specialties,
                bedCapacity: parseInt(body.bedCapacity as string),
                icuBeds: body.icuBeds ? parseInt(body.icuBeds as string) : null,
                hasOT: body.hasOT || false,
                yearsInOperation: parseInt(body.yearsInOperation as string),

                // Accreditation
                isNABH: body.isNABH || false,
                isJCI: body.isJCI || false,
                isISO: body.isISO || false,

                // Facilities
                has24x7Emergency: body.has24x7Emergency || false,
                hasAmbulance: body.hasAmbulance || false,
                hasPharmacy: body.hasPharmacy || false,
                hasDiagnosticLab: body.hasDiagnosticLab || false,
                hasBloodBank: body.hasBloodBank || false,

                // Additional
                partnershipReason: body.partnershipReason,
                monthlyPatients: body.monthlyPatients ? parseInt(body.monthlyPatients as string) : null,
                insuranceTieups: body.insuranceTieups || null,

                // Status
                referenceId,
                status: 'PENDING'
            }
        });

        console.log('Partner request created:', {
            id: partnerRequest.id,
            hospital: partnerRequest.hospitalName,
            referenceId
        });

        // Send notification email to admin
        try {
            const template = emailTemplates.partnerRequest({
                hospitalName: partnerRequest.hospitalName,
                contactPerson: partnerRequest.contactPerson,
                phone: partnerRequest.phone,
                city: partnerRequest.city
            });

            const opsEmail = process.env.OPS_EMAIL || 'ops@healthexpressindia.com';
            sendEmail({
                to: opsEmail,
                subject: template.subject,
                text: template.text,
                html: template.html,
            }).catch(err => console.error('Admin partner alert error:', err));
        } catch (emailErr) {
            console.error('Email preparation error:', emailErr);
        }

        return NextResponse.json({
            success: true,
            referenceId,
            message: 'Your partnership application has been received successfully!'
        });
    } catch (error) {
        console.error('Partner request submission error:', error);
        return NextResponse.json(
            { error: 'An error occurred while submitting your application. Please try again.' },
            { status: 500 }
        );
    }
}
