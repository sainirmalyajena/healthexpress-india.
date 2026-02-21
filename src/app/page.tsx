import Link from 'next/link';
import { getCategoryLabel } from '@/lib/utils';
import { CategoryIcon } from '@/components/ui/CategoryIcon';
import { Category } from '@/generated/prisma';
import { motion } from 'framer-motion';
import {
  Search,
  UserRound,
  Building2,
  ShieldCheck,
  Trophy,
  CircleDollarSign,
  Handshake,
  ArrowRight,
  Phone,
  MessageSquare
} from 'lucide-react';

const categories = Object.values(Category);

const steps = [
  {
    number: '01',
    title: 'Find Your Surgery',
    description: 'Browse our comprehensive directory or search for the specific surgery you need.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Get Expert Guidance',
    description: 'Our team connects you with the right hospital and specialist for your needs.',
    icon: UserRound,
  },
  {
    number: '03',
    title: 'Receive Quality Care',
    description: 'Get treated at partner hospitals with transparent pricing and support.',
    icon: Building2,
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: 'Privacy Protected',
    description: 'Strict confidentiality',
  },
  {
    icon: Trophy,
    title: '500+ Hospitals',
    description: 'Top providers across India',
  },
  {
    icon: CircleDollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden charges',
  },
  {
    icon: Handshake,
    title: 'End-to-End Support',
    description: 'Admission to recovery',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white overflow-hidden pb-16 pt-20 md:py-32">
        {/* Abstract shapes for premium feel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-800/50 border border-teal-500/30 backdrop-blur-sm mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              <span className="text-xs md:text-sm font-medium text-teal-100">India&apos;s Most Trusted Surgery Partner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight"
            >
              Expert Surgical Care <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white">
                Simplified & Affordable
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-teal-100/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              We connect you with 500+ accredited hospitals. Get transparent cost estimates and end-to-end support for your surgery journey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 px-4"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white text-teal-800 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Get Cost Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/surgeries"
                className="w-full sm:w-auto px-8 py-4 bg-teal-900/40 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl border border-teal-500/30 hover:bg-teal-900/60 transition-all active:scale-95"
              >
                Find Surgery
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section - Mobile Optimized Grid */}
      <section className="py-12 md:py-24 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/surgeries?category=${category}`}
                className="group p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all duration-300 text-center flex flex-col items-center justify-center h-32 md:h-40"
              >
                <div className="text-teal-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                  <CategoryIcon category={category} className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-700 group-hover:text-teal-700 leading-tight">
                  {getCategoryLabel(category)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - modern cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Journey to Recovery
            </h2>
            <p className="text-slate-500">Simple steps to get the best care</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative bg-slate-50 rounded-3xl p-8 hover:bg-teal-50/50 transition-colors border border-slate-100"
              >
                <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-teal-600">
                  <step.icon className="w-7 h-7" />
                </div>
                <div className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-2">Step {step.number}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Trust - Dark Aesthetic */}
      <section className="py-20 bg-slate-900 text-white rounded-t-[3rem] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {trustPoints.map((point, idx) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-teal-400 mb-4">
                  <point.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold mb-1">{point.title}</h3>
                <p className="text-sm text-slate-400">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Carousel on mobile (simplified list for MVP) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Patients Love Us
            </h2>
            <div className="w-20 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              // Placeholder for Testimonials (re-using previous data logic but with better UI)
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">&quot;HealthExpress helped me find the best doctor for my knee surgery. The team was supportive and the cost was exactly as estimated.&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center font-bold text-teal-700">R</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Rajesh Kumar</p>
                    <p className="text-xs text-slate-500">Mumbai • Knee Replacement</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom - Enhanced */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-teal-600 to-teal-800 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">Start Your Recovery Today</h2>
          <p className="text-teal-100 mb-8 max-w-2xl mx-auto text-lg relative z-10">
            Don&apos;t let cost or confusion delay your treatment. Talk to our health experts now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact" className="px-8 py-4 bg-white text-teal-800 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
              Talk to an Expert
            </Link>
            <a href="tel:9307861041" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Call 93078-61041
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

