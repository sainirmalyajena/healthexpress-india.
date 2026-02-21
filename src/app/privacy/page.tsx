
import React from 'react';

export const metadata = {
    title: 'Privacy Policy - HealthExpress India',
    description: 'Privacy Policy for HealthExpress India. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <div className="space-y-8 text-slate-700 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Overview</h2>
                            <p>
                                At HealthExpress India, we value your privacy and are committed to protecting your personal information.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website
                                or use our services to find surgery and hospitalization support.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Information We Collect</h2>
                            <p>We may collect personal information that you voluntarily provide to us when you inquire about our services, such as:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Name, email address, and phone number.</li>
                                <li>Medical history, symptoms, or surgery requirements (only what you choose to share).</li>
                                <li>Insurance details to assist with coverage verification.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">3. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Connect you with relevant doctors, surgeons, and hospitals.</li>
                                <li>Provide cost estimates and facilitate hospital admissions.</li>
                                <li>Communicate with you regarding your inquiry (via Phone, WhatsApp, or Email).</li>
                                <li>Improve our website and services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Information Sharing</h2>
                            <p>
                                We may share your basic contact and medical details with our partner hospitals and surgeons <strong>only</strong> for the purpose
                                of facilitating your treatment. We do not sell your data to third-party marketers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Data Security</h2>
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information.
                                However, please be aware that no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">6. User Rights</h2>
                            <p>
                                You have the right to request access to the personal information we hold about you, request corrections, or request deletion of your data.
                                Keep in mind that deleting your data may affect our ability to assist with your medical coordination.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Contact Us</h2>
                            <p>
                                If you have questions or comments about this Privacy Policy, please contact us at:<br />
                                <strong>Email:</strong> {process.env.NEXT_PUBLIC_EMAIL || 'hello@healthexpress.in'}<br />
                                <strong>Phone:</strong> {process.env.NEXT_PUBLIC_PHONE || '+91 93078 61041'}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
