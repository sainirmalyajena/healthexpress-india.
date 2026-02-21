import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Metadata } from 'next';
import { Prisma } from '@/generated/prisma';

export const metadata: Metadata = {
    title: 'Best Surgeons & Doctors in India | HealthExpress',
    description: 'Find top-rated surgeons and doctors for your treatment. Browse by specialty, experience, and hospital affiliation.',
};

export default async function DoctorsPage({
    searchParams,
}: {
    searchParams: Promise<{ specialty?: string; city?: string }>;
}) {
    const { specialty, city } = await searchParams;

    const where: Prisma.DoctorWhereInput = {};
    if (specialty) {
        where.qualification = { contains: specialty, mode: 'insensitive' };
    }
    if (city) {
        where.hospital = { city: { equals: city, mode: 'insensitive' } };
    }

    const doctors = await prisma.doctor.findMany({
        where,
        include: {
            hospital: true,
        },
        orderBy: {
            experience: 'desc',
        },
    });

    const specialtiesList = [
        'Orthopedics', 'Cardiology', 'Ophthalmology', 'Gynecology', 'Urology', 'General Surgery'
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        Meet Our Expert Surgeons
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        We partner with India&apos;s most experienced specialists to ensure you get the best possible care.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-wrap gap-4 justify-center">
                    {specialtiesList.map(s => (
                        <Link
                            key={s}
                            href={`/doctors?specialty=${s}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${specialty === s
                                ? 'bg-teal-600 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                        >
                            {s}
                        </Link>
                    ))}
                    <Link
                        href="/doctors"
                        className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                        Clear Filters
                    </Link>
                </div>

                {/* Grid */}
                {doctors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((doctor) => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500 text-lg">No doctors found matching your criteria.</p>
                        <Link href="/doctors" className="text-teal-600 font-medium hover:underline mt-2 inline-block">
                            View All Doctors
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
