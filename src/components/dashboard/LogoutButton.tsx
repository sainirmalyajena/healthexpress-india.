'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LogoutButtonProps {
    variant?: 'sidebar' | 'header' | 'default';
    logoutUrl: string;
}

export default function LogoutButton({ variant = 'default', logoutUrl }: LogoutButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm('Are you sure you want to sign out?')) return;

        setIsLoading(true);
        try {
            const response = await fetch(logoutUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push(logoutUrl.includes('partner') ? '/partner/login' : logoutUrl.includes('patient') ? '/patient/login' : '/dashboard/login');
                router.refresh();
            } else {
                alert('Logout failed. Please try again.');
            }
        } catch (error) {
            console.error('Logout error', error);
            alert('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === 'sidebar') {
        return (
            <form onSubmit={handleLogout}>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-xs font-semibold text-red-400 bg-red-400/10 hover:bg-red-400/20 py-2.5 rounded-xl transition-all border border-red-400/20 disabled:opacity-50"
                >
                    {isLoading ? 'Signing Out...' : 'Sign Out'}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleLogout}>
            <button
                type="submit"
                disabled={isLoading}
                className="text-sm text-slate-500 hover:text-slate-700 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
                {isLoading ? '...' : 'Logout'}
            </button>
        </form>
    );
}
