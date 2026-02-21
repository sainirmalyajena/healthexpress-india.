
import React from 'react';

export const metadata = {
    title: 'Terms of Service - HealthExpress India',
    description: 'Terms of Service for HealthExpress India.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Terms of Service</h1>
                    <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="space-y-8 text-slate-700 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Service Description</h2>
                            <p>
                                HealthExpress India is a medical facilitation and coordination service. We connect patients with hospitals and surgeons.
                                We are <strong>not</strong> a hospital, nor are we medical professionals. We do not provide medical advice, diagnosis, or treatment.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Medical Disclaimer</h2>
                            <p>
                                All content on this website is for informational purposes only. Always seek the advice of your physician or other qualified health provider
                                with any questions you may have regarding a medical condition. Reliance on any information provided by HealthExpress India is solely at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Eligibility</h2>
                            <p>
                                You must be at least 18 years of age to use our services independently. If you are seeking treatment for a minor, you must be the legal guardian.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. User Responsibilities</h2>
                            <p>
                                You agree to provide accurate and complete information about your medical history and requirements.
                                You are responsible for verifying the credentials of any medical provider you choose to engage with, although we strive to partner only with accredited institutions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Limitation of Liability</h2>
                            <p>
                                HealthExpress India shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of our services
                                or from any medical treatment received at partner hospitals. Any medical disputes are strictly between the patient and the hospital/doctor.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Governing Law</h2>
                            <p>
                                These terms are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                            <p>
                                For any questions regarding these Terms, please contact us at:<br />
                                <strong>Email:</strong> {process.env.NEXT_PUBLIC_EMAIL || 'hello@healthexpress.in'}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
