'use client';

import { useState } from 'react';

interface SetHospitalPasswordButtonProps {
    hospitalId: string;
    hospitalName: string;
}

export default function SetHospitalPasswordButton({ hospitalId, hospitalName }: SetHospitalPasswordButtonProps) {
    const [password, setPassword] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || password.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/dashboard/hospitals/${hospitalId}/password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                alert(`Password set successfully for ${hospitalName}`);
                setPassword('');
                setShowInput(false);
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Failed to set password'}`);
            }
        } catch (error) {
            console.error('Password set failed', error);
            alert('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!showInput) {
        return (
            <button
                onClick={() => setShowInput(true)}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-all"
            >
                Set Portal Access
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="px-2 py-1 text-xs border border-slate-200 rounded outline-none focus:ring-1 focus:ring-teal-500 w-32"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="px-2 py-1 bg-teal-600 text-white rounded text-xs font-bold hover:bg-teal-700 disabled:opacity-50"
            >
                {isLoading ? '...' : 'Save'}
            </button>
            <button
                type="button"
                onClick={() => setShowInput(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
            >
                Cancel
            </button>
        </form>
    );
}
