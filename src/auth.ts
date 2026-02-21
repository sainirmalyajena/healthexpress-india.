import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            id: "admin-login",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: (credentials.email as string).toLowerCase() },
                });

                if (!user || !user.passwordHash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
        Credentials({
            id: "doctor-login",
            name: "Doctor Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const doctor = await prisma.doctor.findUnique({
                    where: { email: (credentials.email as string).toLowerCase() },
                });

                if (!doctor || !doctor.passwordHash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    doctor.passwordHash
                );

                if (!isValid) return null;

                return {
                    id: doctor.id,
                    email: doctor.email,
                    name: doctor.name,
                    role: "doctor",
                };
            },
        }),
        Credentials({
            id: "partner-login",
            name: "Partner Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const hospital = await prisma.hospital.findUnique({
                    where: { email: (credentials.email as string).toLowerCase() },
                });

                if (!hospital || !hospital.passwordHash) return null;

                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    hospital.passwordHash
                );

                if (!isValid) return null;

                return {
                    id: hospital.id,
                    email: hospital.email,
                    name: hospital.name,
                    role: "partner",
                };
            },
        }),
        Credentials({
            id: "patient-login",
            name: "Patient Login",
            credentials: {
                phone: { label: "Phone", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.otp) return null;

                // Verify OTP logic
                const lead = await prisma.lead.findFirst({
                    where: {
                        phone: credentials.phone as string,
                        otp: credentials.otp as string,
                        otpExpires: { gt: new Date() }
                    },
                });

                if (!lead) return null;

                return {
                    id: lead.id,
                    phone: lead.phone,
                    name: lead.fullName,
                    role: "patient",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
});
