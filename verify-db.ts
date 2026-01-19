import { PrismaClient } from './src/generated/prisma';

async function main() {
    const prisma = new PrismaClient();
    try {
        const surgeryCount = await prisma.surgery.count();
        const leadCount = await prisma.lead.count();
        const hospitalCount = await prisma.hospital.count();

        console.log('--- DB Verification ---');
        console.log('Surgeries:', surgeryCount);
        console.log('Leads:', leadCount);
        console.log('Hospitals:', hospitalCount);
        console.log('-----------------------');
    } catch (e) {
        console.error('Error querying DB:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
