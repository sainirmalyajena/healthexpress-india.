'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    Menu,
    Search,
    X,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/surgeries', label: 'Surgeries' },
        { href: '/doctors', label: 'Our Doctors' },
        { href: '/blog', label: 'Medical Blog' },
        { href: '/partners', label: 'Partner with Us' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="HealthExpress Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                                HealthExpress
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-500 block font-semibold">India</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'text-sm font-medium transition-colors relative py-2',
                                    isActive(link.href)
                                        ? 'text-teal-600'
                                        : 'text-slate-600 hover:text-teal-600'
                                )}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/\D/g, '') || '9307861041'}`}
                            className="text-sm font-semibold text-slate-600 hover:text-teal-600 mr-2 flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            {process.env.NEXT_PUBLIC_PHONE || '93078-61041'}
                        </Link>
                        <Link
                            href="/surgeries"
                            className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                        >
                            Find Surgery
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl flex flex-col"
                        >
                            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                <span className="font-bold text-lg text-slate-800">Menu</span>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={cn(
                                            'block px-4 py-3 rounded-xl text-base font-medium transition-all',
                                            isActive(link.href)
                                                ? 'bg-teal-50 text-teal-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="p-4 border-t border-slate-100 space-y-4 pb-8">
                                <Link
                                    href="/surgeries"
                                    className="block w-full py-3 px-4 bg-teal-600 text-white text-center font-semibold rounded-xl shadow-md active:scale-95 transition-transform"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Find Surgery
                                </Link>
                                <a
                                    href={`tel:${process.env.NEXT_PUBLIC_PHONE?.replace(/\D/g, '') || '9307861041'}`}
                                    className="block w-full py-3 px-4 bg-slate-50 text-slate-700 text-center font-semibold rounded-xl border border-slate-200"
                                >
                                    Call Support
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </header>
    );
}

