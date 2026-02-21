import { auth } from "@/auth";

export async function getPatientSession() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'patient') return null;

    return {
        leadId: (session.user as any).id,
        phone: (session.user as any).phone || '',
        name: session.user.name || '',
    };
}

// OTP Logic
export async function generateOTP(phone: string): Promise<string> {
    // For testing/demo purposes
    if (phone === '9999999999' || process.env.NODE_ENV === 'development') {
        return '123456';
    }
    // In production, generate random 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTP(phone: string, otp: string): Promise<void> {
    // In production, integrate with SMS provider (Twilio/Msg91)
    console.log(`[OTP SENT] To: ${phone}, Code: ${otp}`);
}
