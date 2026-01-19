import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default-secret-change-in-production'
);

export interface SessionPayload {
    userId: string;
    email: string;
    name: string;
    role: string;
}

export async function createSession(payload: SessionPayload): Promise<string> {
    const token = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secretKey);

    return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload as unknown as SessionPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) return null;

    return verifySession(token);
}

export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
    });
}

export async function clearSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}
