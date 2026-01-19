// Email service stub
// Replace with actual email provider (SendGrid, Resend, etc.) in production

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
    const apiKey = process.env.EMAIL_API_KEY;

    // If no API key, log and return success (stub mode)
    if (!apiKey) {
        console.log('📧 Email stub - would send:', {
            to: options.to,
            subject: options.subject,
            preview: options.html.substring(0, 100) + '...',
        });
        return true;
    }

    // TODO: Implement actual email sending with your provider
    // Example with Resend:
    // const resend = new Resend(apiKey);
    // await resend.emails.send({
    //   from: process.env.EMAIL_FROM!,
    //   to: options.to,
    //   subject: options.subject,
    //   html: options.html,
    // });

    console.log('📧 Email sent:', options.to);
    return true;
}

export async function sendLeadConfirmation(
    email: string,
    name: string,
    referenceId: string,
    surgeryName: string
): Promise<void> {
    await sendEmail({
        to: email,
        subject: `Your HealthExpress Inquiry - ${referenceId}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">Thank You, ${name}!</h1>
        <p>We've received your inquiry about <strong>${surgeryName}</strong>.</p>
        <p>Your reference ID is: <strong>${referenceId}</strong></p>
        <p>Our team will contact you within 24 hours to discuss your requirements.</p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="color: #6b7280; font-size: 14px;">
          This is an automated message from HealthExpress India.<br />
          Please do not reply to this email.
        </p>
      </div>
    `,
    });
}

export async function notifyOpsTeam(
    referenceId: string,
    name: string,
    phone: string,
    surgeryName: string,
    city: string
): Promise<void> {
    const opsEmail = process.env.OPS_EMAIL || 'ops@healthexpress.in';

    await sendEmail({
        to: opsEmail,
        subject: `New Lead: ${surgeryName} - ${referenceId}`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0f766e;">New Lead Received</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Reference ID</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${referenceId}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Name</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Surgery</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${surgeryName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">City</td>
            <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${city}</td>
          </tr>
        </table>
        <p style="margin-top: 20px;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads" 
             style="background: #0f766e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View in Dashboard
          </a>
        </p>
      </div>
    `,
    });
}
