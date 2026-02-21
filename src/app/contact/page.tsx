'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackFormSubmission } from '@/components/Analytics';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get('name') as string,
            phone: formData.get('phone') as string,
            city: formData.get('city') as string || 'Not specified',
            surgeryId: formData.get('surgery') as string || undefined,
            description: `General inquiry from contact form. Surgery: ${formData.get('surgery') || 'Not specified'}`,
            insurance: (formData.get('insurance') === 'yes' ? 'YES' : 'NO') as 'YES' | 'NO',
            callbackTime: formData.get('time') as string || undefined,
            sourcePage: 'contact',
        };

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSubmitted(true);
                console.log('Lead saved with reference:', result.referenceId);

                // Track conversion in Google Analytics
                trackFormSubmission('contact_form', formData.get('surgery') as string | undefined);
            } else {
                alert(result.error || 'Failed to submit. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-lg text-teal-100">
                            Have questions about a surgery or need help finding the right hospital? Our team is here to help.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                                        <p className="text-teal-600 font-medium">
                                            <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>
                                                {process.env.NEXT_PUBLIC_PHONE || 'Add Phone in .env'}
                                            </a>
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">Mon-Sat, 9 AM - 6 PM IST</p>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                                        <p className="text-teal-600 font-medium">
                                            <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                                                {process.env.NEXT_PUBLIC_EMAIL || 'Add Email in .env'}
                                            </a>
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">We respond within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">WhatsApp</h3>
                                        <p className="text-green-600 font-medium">
                                            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
                                                {process.env.NEXT_PUBLIC_PHONE || 'Add WhatsApp'}
                                            </a>
                                        </p>
                                        <p className="text-sm text-slate-500 mt-1">Quick responses</p>
                                    </div>
                                </div>
                            </div>

                            {/* Office Address */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">Office</h3>
                                        <p className="text-slate-600 text-sm whitespace-pre-line">
                                            {process.env.NEXT_PUBLIC_ADDRESS || 'Add Address in .env'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-8 p-6 bg-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link href="/surgeries" className="flex items-center text-sm text-teal-600 hover:text-teal-700">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Browse Surgeries
                                </Link>
                                <Link href="/surgeries?category=GENERAL_SURGERY" className="flex items-center text-sm text-teal-600 hover:text-teal-700">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    General Surgery
                                </Link>
                                <Link href="/surgeries?category=ORTHOPEDICS" className="flex items-center text-sm text-teal-600 hover:text-teal-700">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Orthopedics
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                                    <p className="text-slate-600 mb-6">
                                        We&apos;ve received your inquiry. Our team will call you within 24 hours to discuss your needs and provide expert guidance.
                                    </p>
                                    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-6">
                                        <h4 className="font-semibold text-teal-900 mb-2">What happens next?</h4>
                                        <ul className="text-sm text-teal-700 space-y-1 text-left max-w-md mx-auto">
                                            <li>✓ Expert will review your case</li>
                                            <li>✓ We&apos;ll call you to understand your requirements</li>
                                            <li>✓ Receive personalized hospital and cost recommendations</li>
                                        </ul>
                                    </div>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-teal-600 hover:text-teal-700 font-medium"
                                    >
                                        Submit another inquiry
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold text-slate-900 mb-6">Request a Free Callback</h2>
                                    <p className="text-slate-600 mb-6">
                                        Not sure which surgery you need? Fill the form and we&apos;ll help you find the right hospital and get a cost estimate.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                                                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" placeholder="Your Name" />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                                                <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" placeholder="+91 98765 43210" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                                <input type="text" id="city" name="city" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. Mumbai" />
                                            </div>
                                            <div>
                                                <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">Preferred Callback Time</label>
                                                <select id="time" name="time" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500">
                                                    <option value="">Anytime</option>
                                                    <option value="morning">Morning (9 AM - 12 PM)</option>
                                                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                                    <option value="evening">Evening (4 PM - 8 PM)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="surgery" className="block text-sm font-medium text-slate-700 mb-2">Surgery / Treatment (if known)</label>
                                            <input type="text" id="surgery" name="surgery" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" placeholder="e.g. Knee Replacement" />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Do you have Health Insurance?</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center">
                                                    <input type="radio" name="insurance" value="yes" className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                                                    <span className="ml-2 text-sm text-slate-700">Yes</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="insurance" value="no" className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300" />
                                                    <span className="ml-2 text-sm text-slate-700">No</span>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Submitting...' : 'Request Free Consultation'}
                                        </button>
                                        <p className="text-xs text-slate-500 text-center mt-2">
                                            By submitting, you agree to our <Link href="/terms" className="text-teal-600 underline">Terms</Link> and <Link href="/privacy" className="text-teal-600 underline">Privacy Policy</Link>.
                                        </p>
                                    </form>

                                    <div className="mt-8 pt-8 border-t border-slate-200">
                                        <h3 className="font-semibold text-slate-900 mb-4">Or send us a general inquiry</h3>
                                        <p className="text-sm text-slate-600 mb-4">
                                            Email us at <a href="mailto:hello@healthexpress.in" className="text-teal-600 hover:underline">hello@healthexpress.in</a> with your questions.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
