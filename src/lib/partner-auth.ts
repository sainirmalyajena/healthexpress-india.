import { auth } from "@/auth";

export async function getPartnerSession() {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'partner') return null;

    return {
        hospitalId: (session.user as any).id,
        email: session.user.email || '',
        name: session.user.name || '',
    };
}
