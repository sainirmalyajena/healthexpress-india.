import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOTP, sendOTP } from "@/lib/patient-auth";

export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
        }

        // Check if lead exists with this phone
        const lead = await prisma.lead.findFirst({
            where: { phone: phone },
            orderBy: { createdAt: 'desc' }
        });

        if (!lead) {
            return NextResponse.json({
                error: "No record found with this phone number. Please submit an inquiry first."
            }, { status: 404 });
        }

        const otp = await generateOTP(phone);
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Update lead with OTP
        await prisma.lead.update({
            where: { id: lead.id },
            data: {
                otp: otp,
                otpExpires: expires
            }
        });

        // Send OTP (In console for demo, Twilio in prod)
        await sendOTP(phone, otp);

        return NextResponse.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error("OTP send error:", error);
        return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
    }
}
