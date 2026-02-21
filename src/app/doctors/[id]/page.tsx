import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getDoctor(id: string) {
    const doctor = await prisma.doctor.findUnique({
        where: { id },
        include: {
            hospital: true,
            surgeries: true,
        },
    });
    return doctor;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const doctor = await getDoctor(id);
    if (!doctor) return { title: 'Doctor Not Found' };

    return {
        title: `Dr. ${doctor.name} - ${doctor.qualification} | HealthExpress India`,
        description: doctor.about,
    };
}

export default async function DoctorProfilePage({ params }: PageProps) {
    const { id } = await params;
    const doctor = await getDoctor(id);

    if (!doctor) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <Link href="/doctors" className="text-teal-600 hover:text-teal-700 text-sm font-medium mb-8 inline-flex items-center gap-1">
                    ← Back to Doctors
                </Link>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-4">
                    <div className="md:flex">
                        {/* Photo */}
                        <div className="md:w-64 h-64 md:h-auto bg-slate-100 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-6 md:p-8 flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900">Dr. {doctor.name}</h1>
                                    <p className="text-teal-600 font-medium mt-1">{doctor.qualification}</p>
                                </div>
                                <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                                    {doctor.experience}+ Years
                                </span>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                                <span>🏥</span>
                                <span className="font-medium text-slate-700">{doctor.hospital.name}</span>
                                <span>•</span>
                                <span>{doctor.hospital.city}</span>
                            </div>

                            <p className="mt-6 text-slate-600 leading-relaxed">{doctor.about}</p>

                            {/* Specialties */}
                            {doctor.surgeries.length > 0 && (
                                <div className="mt-6">
                                    <h2 className="text-sm font-semibold text-slate-900 mb-3">Procedures & Specialties</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.surgeries.map((surgery) => (
                                            <Link
                                                key={surgery.id}
                                                href={`/surgeries/${surgery.slug}`}
                                                className="px-3 py-1.5 bg-teal-50 text-teal-700 text-sm rounded-full hover:bg-teal-100 transition-colors font-medium"
                                            >
                                                {surgery.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    href={`/contact?doctor=${doctor.name}`}
                                    className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                                >
                                    Book Consultation
                                </Link>
                                <a
                                    href={`https://wa.me/919307861041?text=Hi, I want to consult Dr. ${doctor.name} (${doctor.qualification})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    💬 WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hospital Info */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mt-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Hospital Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-slate-500">Hospital Name</p>
                            <p className="font-medium text-slate-900">{doctor.hospital.name}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">City</p>
                            <p className="font-medium text-slate-900">{doctor.hospital.city}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Accreditation</p>
                            <p className="font-medium text-slate-900">NABH Accredited</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Cashless Discount</p>
                            <p className="font-medium text-teal-600">{doctor.hospital.discountPercent}% off with health card</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
