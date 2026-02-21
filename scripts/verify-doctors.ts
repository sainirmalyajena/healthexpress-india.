import { prisma } from '@/lib/prisma';

async function main() {
    console.log('--- DOCTOR VERIFICATION ---');

    // 1. Check Total Doctors
    const doctorCount = await prisma.doctor.count();
    console.log(`Total Doctors: ${doctorCount}`);

    if (doctorCount === 0) {
        console.error('❌ No doctors found!');
        return;
    }

    // 2. Check Doctor Links
    const doctors = await prisma.doctor.findMany({
        include: { hospital: true, surgeries: true },
        take: 5
    });

    console.log('\nSample Doctors:');
    for (const doc of doctors) {
        console.log(`- ${doc.name} (${doc.qualification})`);
        console.log(`  Hospital: ${doc.hospital?.name || '❌ None'}`);
        console.log(`  Surgeries: ${doc.surgeries.map(s => s.name).join(', ') || '❌ None'}`);

        if (!doc.hospital) console.error(`  ❌ Missing Hospital Link for ${doc.name}`);
        if (doc.surgeries.length === 0) console.warn(`  ⚠️ No Surgeries linked for ${doc.name}`);
    }

    // 3. Check Surgery Page Integration
    // We check if "Total Knee Replacement" has doctors
    const surgery = await prisma.surgery.findFirst({
        where: { slug: 'total-knee-replacement' },
        include: { doctors: true }
    });

    if (surgery) {
        console.log(`\nSurgery '${surgery.name}' has ${surgery.doctors.length} doctors linked.`);
    } else {
        console.log("\n⚠️ 'Total Knee Replacement' surgery not found to verify links.");
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
