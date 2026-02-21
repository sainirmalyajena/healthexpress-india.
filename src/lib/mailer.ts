import { resend } from './resend';
import LeadConfirmationEmail from '@/emails/LeadConfirmation';
import AdminNotificationEmail from '@/emails/AdminNotification';
import * as React from 'react';

export async function sendEmail({
    to,
    subject,
    react,
    text,
}: {
    to: string;
    subject: string;
    react: React.ReactElement;
    text: string;
}) {
    if (!process.env.RESEND_API_KEY) {
        console.log('--- MOCK EMAIL (Resend Key Missing) ---');
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: ${text}`);
        console.log('---------------------------------------');
        return { id: 'mock-id' };
    }

    try {
        const data = await resend.emails.send({
            from: 'HealthExpress India <hello@healthexpressindia.com>',
            to,
            subject,
            react,
            text,
        });
        return data;
    } catch (error) {
        console.error('Error sending email via Resend:', error);
        throw error;
    }
}

export const emailTemplates = {
    leadConfirmation: (patientName: string, referenceId: string, surgeryName: string) => ({
        subject: `Your HealthExpress Inquiry Received - ${referenceId}`,
        text: `Hi ${patientName}, Thank you for choosing HealthExpress India. We have received your inquiry for ${surgeryName}. Reference ID: ${referenceId}.`,
        react: React.createElement(LeadConfirmationEmail, {
            patientName,
            referenceId,
            surgeryName,
        }),
    }),
    adminInquiry: (details: {
        referenceId: string;
        fullName: string;
        phone: string;
        email?: string;
        city: string;
        surgeryName: string;
        sourcePage: string;
    }) => ({
        subject: `🚨 NEW LEAD: ${details.surgeryName} - ${details.fullName}`,
        text: `New Lead: ${details.fullName} (${details.phone}) for ${details.surgeryName}. Ref: ${details.referenceId}`,
        react: React.createElement(AdminNotificationEmail, details),
    }),
};
