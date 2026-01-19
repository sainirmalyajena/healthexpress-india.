'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/surgeries', label: 'Surgeries' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
                                HealthExpress
                            </span>
                            <span className="text-xs text-slate-500 block -mt-0.5">India</span>
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
                            href="/surgeries"
                            className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            Find Surgery
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-200">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                        isActive(link.href)
                                            ? 'bg-teal-50 text-teal-600'
                                            : 'text-slate-600 hover:bg-slate-50'
                                    )}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/surgeries"
                                className="mx-4 mt-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-medium rounded-lg text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Find Surgery
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
