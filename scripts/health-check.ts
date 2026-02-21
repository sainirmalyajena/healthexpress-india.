
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { PrismaClient } from '../src/generated/prisma';

async function main() {
    console.log("Starting Health Check...");

    // 1. Check Environment Variables
    const requiredEnvVars = ['DATABASE_URL', 'NEXT_PUBLIC_APP_URL'];
    const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);

    if (missingEnvVars.length > 0) {
        console.error(`❌ Missing environment variables: ${missingEnvVars.join(', ')}`);
        process.exit(1);
    } else {
        console.log("✅ Environment variables check passed.");
    }

    // 2. Check Database Connection
    const prisma = new PrismaClient();
    try {
        await prisma.$connect();
        console.log("✅ Database connection successful.");

        // 3. Simple Query Check
        const leadCount = await prisma.lead.count();
        console.log(`✅ Database query successful. Found ${leadCount} leads.`);

    } catch (e) {
        console.error('❌ Database check failed:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }

    console.log("Health Check Complete!");
}

main();
