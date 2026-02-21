import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
    const email = 'apollo@example.com';
    const password = 'password123';
    const hospitalName = 'Apollo Hospital'; // Or match an existing one

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or Create Hospital
    // First try to find by name if you have existing data
    let hospital = await prisma.hospital.findFirst({
        where: { name: { contains: 'Apollo' } }
    });

    if (hospital) {
        console.log(`Updating existing hospital: ${hospital.name}`);
        hospital = await prisma.hospital.update({
            where: { id: hospital.id },
            data: {
                email,
                passwordHash: hashedPassword,
                status: 'ACTIVE'
            }
        });
    } else {
        console.log('Creating new test hospital');
        hospital = await prisma.hospital.create({
            data: {
                name: hospitalName,
                city: 'Bangalore',
                specialties: ['Cardiology', 'Orthopedics'],
                discountPercent: 10,
                email,
                passwordHash: hashedPassword,
                status: 'ACTIVE'
            }
        });
    }

    console.log('================================');
    console.log('Partner Credentials Generated:');
    console.log(`Hospital: ${hospital.name}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log('Login at: /partner/login');
    console.log('================================');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
