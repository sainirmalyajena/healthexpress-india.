
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
    console.log('--- SEO CONTENT VERIFICATION ---');

    const surgeries = [
        'Kidney Stone Removal (PCNL)',
        'ACL Reconstruction',
        'Cataract Surgery',
        'Coronary Artery Bypass (CABG)',
        'Total Knee Replacement',
        'Appendectomy',
        'Cesarean Section (C-Section)',
        'Rhinoplasty (Nose Job)',
        'Dental Implant'
    ];

    for (const name of surgeries) {
        const surgery = await prisma.surgery.findFirst({
            where: { name },
            select: { name: true, overview: true }
        });

        if (surgery) {
            console.log(`\n✅ ${surgery.name}:`);
            console.log(`Overview Preview: ${surgery.overview.substring(0, 100)}...`);
            if (surgery.overview.includes('commonly performed procedure')) {
                console.error('❌ Still using generic template!');
            } else {
                console.log('✅ Unique content detected.');
            }
        } else {
            console.error(`❌ Surgery not found: ${name}`);
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
