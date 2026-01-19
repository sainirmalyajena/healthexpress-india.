import Link from 'next/link';
import { getCategoryLabel, getCategoryIcon } from '@/lib/utils';

import { Category } from '@/generated/prisma';

const categories = Object.values(Category);

const steps = [
  {
    number: '01',
    title: 'Find Your Surgery',
    description: 'Browse our comprehensive directory or search for the specific surgery you need.',
    icon: '🔍',
  },
  {
    number: '02',
    title: 'Get Expert Guidance',
    description: 'Our team connects you with the right hospital and specialist for your needs.',
    icon: '👨‍⚕️',
  },
  {
    number: '03',
    title: 'Receive Quality Care',
    description: 'Get treated at partner hospitals with transparent pricing and support.',
    icon: '🏥',
  },
];

const trustPoints = [
  {
    icon: '🔒',
    title: 'Privacy Protected',
    description: 'Your health information is kept strictly confidential',
  },
  {
    icon: '🏆',
    title: '500+ Partner Hospitals',
    description: 'Access to top healthcare providers across India',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'Know your costs upfront with no hidden charges',
  },
  {
    icon: '🤝',
    title: 'End-to-End Support',
    description: 'Assistance from inquiry to recovery',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Surgery & Hospitalization Support{' '}
              <span className="text-teal-200">Across India</span>
            </h1>
            <p className="text-lg md:text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Find the right surgery, the right hospital, and the right care. We connect you with 500+ partner hospitals for quality treatment at transparent prices.
            </p>

            {/* Search Bar */}
            <form action="/surgeries" method="GET" className="max-w-2xl mx-auto mb-8 transform transition-all hover:scale-[1.01]">
              <div className="relative group">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for a surgery (e.g., Knee Replacement, Appendectomy)"
                  autoComplete="off"
                  className="w-full pl-6 pr-16 py-5 rounded-2xl text-lg text-slate-900 bg-white placeholder:text-slate-400 shadow-2xl shadow-teal-900/20 border-2 border-transparent focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0"
                  aria-label="Search surgeries"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/surgeries"
                className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
              >
                Browse All Surgeries
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-teal-800/50 text-white font-semibold rounded-lg border border-teal-400/30 hover:bg-teal-800/70 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 50L48 45.7C96 41 192 33 288 35.3C384 38 480 52 576 58.3C672 65 768 65 864 58.3C960 52 1056 38 1152 33.3C1248 28 1344 33 1392 35.7L1440 38V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Browse by Specialty
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore surgeries across 13 medical specialties. Find detailed information about procedures, recovery, and costs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/surgeries?category=${category}`}
                className="group p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(category)}
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-teal-600 transition-colors">
                  {getCategoryLabel(category)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Getting the surgery you need is simple with HealthExpress
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-teal-300" />
                )}

                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-teal-600 mb-2">Step {step.number}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose HealthExpress
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Trusted by thousands of patients across India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-teal-500/50 transition-colors"
              >
                <div className="text-3xl mb-4">{point.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                <p className="text-slate-400 text-sm">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-teal-100 mb-8">
            Browse our surgery directory or get in touch with our team for personalized assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/surgeries"
              className="px-8 py-3 bg-white text-teal-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              Browse Surgeries
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-teal-800/50 text-white font-semibold rounded-lg border border-teal-400/30 hover:bg-teal-800/70 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
