import { auth } from "@/auth";

export async function getDoctorSession() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'doctor') return null;

    return {
        doctorId: (session.user as any).id,
        email: session.user.email || '',
        name: session.user.name || '',
        hospitalId: (session.user as any).hospitalId || '',
    };
}
