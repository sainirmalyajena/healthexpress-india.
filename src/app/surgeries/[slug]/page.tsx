import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
// import prisma from '@/lib/prisma';
import { getCategoryLabel, getCategoryIcon, formatCurrency } from '@/lib/utils';
import { LeadForm } from '@/components/forms';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { generateMedicalProcedureSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema';

interface PageProps {
    params: Promise<{ slug: string }>;
}

import { prisma } from '@/lib/prisma';

async function getSurgery(slug: string) {
    return prisma.surgery.findUnique({
        where: { slug },
        include: {
            doctors: {
                include: {
                    hospital: true
                }
            }
        }
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const surgery = await getSurgery(slug);

    if (!surgery) {
        return { title: 'Surgery Not Found' };
    }

    return {
        title: surgery.name,
        description: surgery.overview.substring(0, 160),
        openGraph: {
            title: `${surgery.name} - HealthExpress India`,
            description: surgery.overview.substring(0, 160),
            type: 'article',
        },
        keywords: [
            surgery.name,
            `${surgery.name} cost India`,
            `${surgery.name} surgery`,
            `best hospital for ${surgery.name}`,
            `${surgery.name} recovery`,
            'affordable surgery india',
            'medical tourism india'
        ],
    };
}

export async function generateStaticParams() {
    const surgeries = await prisma.surgery.findMany({
        select: { slug: true },
        take: 100,
    });

    return surgeries.map((s) => ({ slug: s.slug }));
}

export default async function SurgeryDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const surgery = await getSurgery(slug);

    if (!surgery) {
        notFound();
    }

    const faqs = surgery.faqs as { question: string; answer: string }[];
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://healthexpressindia.com';

    // Generate structured data
    const medicalProcedureSchema = generateMedicalProcedureSchema({
        name: surgery.name,
        description: surgery.overview,
        category: getCategoryLabel(surgery.category),
        costMin: surgery.costRangeMin,
        costMax: surgery.costRangeMax,
        duration: surgery.duration,
        hospitalStay: surgery.hospitalStay,
        recovery: surgery.recovery,
        risks: surgery.risks,
        preparation: surgery.preparation
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: baseUrl },
        { name: 'Surgeries', url: `${baseUrl}/surgeries` },
        { name: getCategoryLabel(surgery.category), url: `${baseUrl}/surgeries?category=${surgery.category}` },
        { name: surgery.name, url: `${baseUrl}/surgeries/${surgery.slug}` }
    ]);

    const faqSchema = faqs && faqs.length > 0 ? generateFAQSchema(faqs) : null;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {/* Breadcrumb */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-slate-500 hover:text-teal-600">Home</Link>
                        <span className="text-slate-300">/</span>
                        <Link href="/surgeries" className="text-slate-500 hover:text-teal-600">Surgeries</Link>
                        <span className="text-slate-300">/</span>
                        <Link href={`/surgeries?category=${surgery.category}`} className="text-slate-500 hover:text-teal-600">
                            {getCategoryLabel(surgery.category)}
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{surgery.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{getCategoryIcon(surgery.category)}</span>
                                <span className="text-sm font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                    {getCategoryLabel(surgery.category)}
                                </span>
                                {surgery.insuranceLikely && (
                                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        Insurance Likely
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                {surgery.name}
                            </h1>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Duration</p>
                                    <p className="font-semibold text-slate-900">{surgery.duration}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Hospital Stay</p>
                                    <p className="font-semibold text-slate-900">{surgery.hospitalStay}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Recovery</p>
                                    <p className="font-semibold text-slate-900">{surgery.recovery.split('.')[0]}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 mb-1">Est. Cost</p>
                                    <p className="font-semibold text-teal-600">
                                        {formatCurrency(surgery.costRangeMin)} - {formatCurrency(surgery.costRangeMax)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Overview */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm">📋</span>
                                Overview
                            </h2>
                            <div className="prose-surgery">
                                <p>{surgery.overview}</p>
                            </div>
                        </section>

                        {/* Top Surgeons */}
                        {surgery.doctors && surgery.doctors.length > 0 && (
                            <section className="bg-white rounded-xl shadow-sm p-8">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm">👨‍⚕️</span>
                                    Top Surgeons for {surgery.name}
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {surgery.doctors.map((doctor) => (
                                        <DoctorCard key={doctor.id} doctor={doctor} />
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        href="/doctors"
                                        className="text-teal-600 font-medium hover:underline inline-flex items-center gap-1"
                                    >
                                        View All Doctors
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </section>
                        )}

                        {/* When is it needed */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">⚠️</span>
                                When Is It Needed?
                            </h2>
                            <div className="prose-surgery">
                                <p>{surgery.indications}</p>
                            </div>

                            {/* Symptoms Tags */}
                            {surgery.symptoms.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-slate-700 mb-2">Common Symptoms:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {surgery.symptoms.map((symptom) => (
                                            <span key={symptom} className="text-sm bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                                                {symptom}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Procedure */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">🔬</span>
                                Procedure Summary
                            </h2>
                            <div className="prose-surgery">
                                <p>{surgery.procedure}</p>
                            </div>
                        </section>

                        {/* Preparation */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">✅</span>
                                Preparation Checklist
                            </h2>
                            <div className="prose-surgery">
                                <p>{surgery.preparation}</p>
                            </div>
                        </section>

                        {/* Recovery */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-sm">🏠</span>
                                Recovery & Post-Op Care
                            </h2>
                            <div className="prose-surgery space-y-4">
                                <div>
                                    <h3 className="font-medium text-slate-800 mb-2">Recovery Timeline</h3>
                                    <p>{surgery.recovery}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium text-slate-800 mb-2">Post-Operative Care Tips</h3>
                                    <p>{surgery.postOpCare}</p>
                                </div>
                            </div>
                        </section>

                        {/* Risks */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm">⚡</span>
                                Risks & Complications
                            </h2>
                            <div className="prose-surgery">
                                <p>{surgery.risks}</p>
                            </div>
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                                <p className="text-sm text-red-700">
                                    <strong>Note:</strong> All surgical procedures carry some level of risk. Your surgeon will discuss specific risks based on your individual health profile.
                                </p>
                            </div>
                        </section>

                        {/* Cost & Insurance */}
                        <section className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm">💰</span>
                                Cost & Insurance
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">Estimated Cost Range</p>
                                    <p className="text-2xl font-bold text-teal-600">
                                        {formatCurrency(surgery.costRangeMin)} - {formatCurrency(surgery.costRangeMax)}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-2">*Costs vary by city, hospital, and complexity</p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg">
                                    <p className="text-sm text-slate-500 mb-1">Insurance Coverage</p>
                                    <p className={`text-lg font-semibold ${surgery.insuranceLikely ? 'text-green-600' : 'text-amber-600'}`}>
                                        {surgery.insuranceLikely ? 'Usually Covered by Insurance' : 'May Not Be Covered'}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-2">*Check with your insurance provider for specifics</p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-sm text-blue-700">
                                    <strong>Cashless Treatment:</strong> Many of our partner hospitals offer cashless treatment for insured patients. Contact us to check eligibility and hospital tie-ups.
                                </p>
                            </div>
                        </section>

                        {/* FAQs */}
                        {faqs.length > 0 && (
                            <section className="bg-white rounded-xl shadow-sm p-8">
                                <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">❓</span>
                                    Frequently Asked Questions
                                </h2>

                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <details key={index} className="group">
                                            <summary className="flex items-center justify-between cursor-pointer p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                                <span className="font-medium text-slate-900 pr-4">{faq.question}</span>
                                                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </summary>
                                            <div className="p-4 text-slate-600">
                                                {faq.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar - Lead Form */}
                    <aside className="lg:col-span-1 mt-8 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-slate-900 mb-2">Get in Touch</h2>
                            <p className="text-sm text-slate-600 mb-6">
                                Interested in this surgery? Fill out the form and our team will contact you within 24 hours.
                            </p>

                            <LeadForm surgeryId={surgery.id} surgeryName={surgery.name} />

                            {/* Trust Elements */}
                            <div className="mt-8 pt-6 border-t border-slate-100 space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900 mb-3">What happens next?</h3>
                                    <div className="space-y-4 relative">
                                        <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-slate-100"></div>
                                        {[
                                            { title: 'We Call You', desc: 'Expert consultation in 24 hrs' },
                                            { title: 'Get Guidance', desc: 'Hospital & cost options' },
                                            { title: 'Start Treatment', desc: 'Priority admission support' }
                                        ].map((step, i) => (
                                            <div key={i} className="flex gap-3 relative">
                                                <div className="w-3 h-3 rounded-full bg-teal-100 border-2 border-teal-500 flex-shrink-0 mt-1 z-10"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900">{step.title}</p>
                                                    <p className="text-xs text-slate-500">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <p>Your data is 100% safe. We never spam.</p>
                                    </div>
                                    <p className="text-xs text-slate-400 pl-6">
                                        Read our <Link href="/privacy" className="underline hover:text-teal-600">Privacy Policy</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Medical Disclaimer */}
            <div className="bg-slate-100 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-start gap-3">
                        <span className="text-xl">⚕️</span>
                        <p className="text-sm text-slate-600">
                            <strong>Medical Disclaimer:</strong> The information provided on this page is for awareness only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider for medical decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
