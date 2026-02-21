import { sendEmail, emailTemplates } from '../src/lib/mailer';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function runTest() {
    console.log('🚀 Starting Email Test...');
    console.log(`SMTP User: ${process.env.SMTP_USER}`);
    console.log(`Target: ${process.env.OPS_EMAIL || 'healthexpressindia@healthexpressindia.com'}`);

    try {
        const testDetails = {
            referenceId: 'TEST-' + Math.random().toString(36).substring(7).toUpperCase(),
            fullName: 'Test User (Antigravity Recovery)',
            phone: '0000000000',
            city: 'Test City',
            surgeryName: 'Restoration Verification',
            sourcePage: '/recovery-test'
        };

        const template = emailTemplates.adminInquiry(testDetails);

        const result = await sendEmail({
            to: process.env.OPS_EMAIL || 'healthexpressindia@healthexpressindia.com',
            subject: '✅ Code Restoration SUCCESS - Test Email',
            text: template.text,
            html: template.html,
        });

        console.log('✅ Email sent successfully!');
        console.log('Message ID:', (result as any).messageId);
    } catch (error) {
        console.error('❌ Failed to send test email:');
        console.error(error);
        process.exit(1);
    }
}

runTest();
