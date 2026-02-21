'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LeadStatus } from '@/generated/prisma';

interface PartnerStatusUpdateProps {
    leadId: string;
    currentStatus: LeadStatus;
}

export default function PartnerStatusUpdate({ leadId, currentStatus }: PartnerStatusUpdateProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<LeadStatus>(currentStatus);
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`/api/partner/leads/${leadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: status !== currentStatus ? status : undefined,
                    hospitalNotes: note
                }),
            });

            if (response.ok) {
                setNote('');
                startTransition(() => {
                    router.refresh();
                });
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Failed to update case'}`);
            }
        } catch (error) {
            console.error('Update failed', error);
            alert('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const statusOptions = [
        { value: 'ASSIGNED', label: 'Assigned / In Review' },
        { value: 'SCHEDULED', label: 'Surgery Scheduled' },
        { value: 'COMPLETED', label: 'Surgery Completed' },
        { value: 'CLOSED', label: 'Case Closed / Declined' },
    ];

    return (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4 shadow-inner">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Update Case Progress</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">New Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as LeadStatus)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Daily Log / Note</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Add a clinical update or coordination note..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all min-h-[42px] max-h-[120px]"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={isLoading || isPending || (status === currentStatus && !note)}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-teal-600 shadow-lg shadow-slate-900/10 disabled:opacity-50 transition-all active:scale-95"
                >
                    {isLoading ? 'Updating...' : 'Post Update'}
                </button>
            </div>
        </form>
    );
}
