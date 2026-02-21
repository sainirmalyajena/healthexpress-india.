'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface LeadStatusSelectProps {
    leadId: string;
    currentStatus: string;
    statuses: string[];
}

export default function LeadStatusSelect({ leadId, currentStatus, statuses }: LeadStatusSelectProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleChange = async (newStatus: string) => {
        if (!newStatus) return;

        try {
            const response = await fetch(`/api/dashboard/leads/${leadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error('Failed to update status', error);
        }
    };

    return (
        <select
            defaultValue={currentStatus}
            onChange={(e) => handleChange(e.target.value)}
            disabled={isPending}
            className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 disabled:opacity-50"
        >
            {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
            ))}
        </select>
    );
}
