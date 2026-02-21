'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface ApprovePartnerButtonProps {
    requestId: string;
    hospitalName: string;
}

export default function ApprovePartnerButton({ requestId, hospitalName }: ApprovePartnerButtonProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);

    const handleApprove = async () => {
        if (!confirm(`Are you sure you want to approve "${hospitalName}"? This will create an active hospital record.`)) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/dashboard/partners/${requestId}/approve`, {
                method: 'POST',
            });

            if (response.ok) {
                alert('Partner approved successfully!');
                startTransition(() => {
                    router.refresh();
                });
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Failed to approve partner'}`);
            }
        } catch (error) {
            console.error('Approval failed', error);
            alert('An unexpected error occurred during approval.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleApprove}
            disabled={isLoading || isPending}
            className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-100 disabled:opacity-50"
        >
            {isLoading ? 'Approving...' : 'Approve'}
        </button>
    );
}
