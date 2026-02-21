
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('--- STATUS CHECK ---');

    // 1. Recent Leads
    console.log('\nChecking for recent enquiries...');
    const leads = await prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { surgery: true }
    });

    if (leads.length === 0) {
        console.log('No enquiries found.');
    } else {
        console.log(`Found ${leads.length} recent enquiries:`);
        leads.forEach(l => {
            console.log(`- [${l.createdAt.toISOString().split('T')[0]}] ${l.fullName} (${l.phone}) - Interest: ${l.surgery?.name || 'General'}`);
        });
    }

    // 2. Admin Access Info
    console.log('\n--- ADMIN ACCESS ---');
    console.log('Dashboard URL: http://localhost:3000/dashboard');

    // Check for admin user
    const admin = await prisma.user.findFirst({
        where: { role: 'admin' }
    });

    if (admin) {
        console.log(`Admin User exists: ${admin.email}`);
        console.log('Default Password (from seed): admin123');
    } else {
        console.log('WARNING: No admin user found in database.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
