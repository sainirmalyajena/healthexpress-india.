'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DateRangeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRange = searchParams.get('range') || 'all';

    const ranges = [
        { label: 'All Time', value: 'all' },
        { label: 'This Month', value: 'month' },
        { label: 'Last 7 Days', value: 'week' },
        { label: 'Today', value: 'today' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('range', e.target.value);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Time Range:</label>
            <select
                value={currentRange}
                onChange={handleChange}
                className="text-sm border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
                {ranges.map((range) => (
                    <option key={range.value} value={range.value}>
                        {range.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
