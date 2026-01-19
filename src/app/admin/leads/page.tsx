import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { formatDateTime, getStatusColor } from '@/lib/utils';
import { prisma } from '@/lib/prisma';
import { LeadStatus } from '@/generated/prisma';
import LeadsTable from '@/components/admin/LeadsTable';

interface SearchParams {
    status?: string;
    surgery?: string;
    city?: string;
    page?: string;
}

const ITEMS_PER_PAGE = 20;

async function getLeads(searchParams: SearchParams) {
    const page = parseInt(searchParams.page || '1');
    const skip = (page - 1) * ITEMS_PER_PAGE;

    const where: any = {};

    if (searchParams.status) {
        where.status = searchParams.status;
    }

    if (searchParams.surgery) {
        where.surgeryId = searchParams.surgery;
    }

    if (searchParams.city) {
        where.city = {
            contains: searchParams.city
        };
    }

    const [leads, total] = await Promise.all([
        prisma.lead.findMany({
            where,
            include: {
                surgery: true,
                hospital: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip,
            take: ITEMS_PER_PAGE
        }),
        prisma.lead.count({ where })
    ]);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE) || 1;

    // Get filter data
    const [surgeries, hospitals, citiesData] = await Promise.all([
        prisma.surgery.findMany({ select: { id: true, name: true } }),
        prisma.hospital.findMany({ select: { id: true, name: true, discountPercent: true } }),
        prisma.lead.findMany({
            select: { city: true },
            distinct: ['city'],
            where: { city: { not: undefined } }
        })
    ]);

    return {
        leads,
        total,
        page,
        totalPages,
        surgeries,
        hospitals,
        cities: citiesData.map(c => c.city).filter(Boolean) as string[],
    };
}

export default async function AdminLeadsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    try {
        const session = await getSession();

        if (!session) {
            redirect('/admin/login');
        }

        const params = await searchParams;
        const data = await getLeads(params);

        const statuses = Object.values(LeadStatus);

        return (
            <div className="min-h-screen bg-slate-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    {/* ... same header ... */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link href="/admin" className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">H</span>
                                    </div>
                                    <span className="font-semibold text-slate-900">Admin</span>
                                </Link>
                                <span className="text-slate-300">/</span>
                                <span className="text-slate-600">Leads</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <form action="/admin/leads" method="GET" className="flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                <select
                                    name="status"
                                    defaultValue={params.status || ''}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">All Statuses</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Surgery</label>
                                <select
                                    name="surgery"
                                    defaultValue={params.surgery || ''}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="">All Surgeries</option>
                                    {data.surgeries.map((surgery) => (
                                        <option key={surgery.id} value={surgery.id}>{surgery.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    defaultValue={params.city || ''}
                                    placeholder="Filter by city"
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Filter
                                </button>
                                <Link
                                    href="/admin/leads"
                                    className="px-4 py-2 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    Clear
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-600">
                            Showing {data.leads.length} of {data.total} leads
                        </p>
                    </div>

                    {/* Table */}
                    <LeadsTable
                        leads={data.leads}
                        hospitals={data.hospitals}
                        statuses={statuses}
                    />
                    {/* Pagination */}
                    {data.totalPages > 1 && (
                        <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-600">
                                Page {data.page} of {data.totalPages}
                            </p>
                            <div className="flex gap-2">
                                {data.page > 1 && (
                                    <Link
                                        href={`/admin/leads?${new URLSearchParams({
                                            ...params,
                                            page: String(data.page - 1),
                                        } as Record<string, string>).toString()}`}
                                        className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                                    >
                                        Previous
                                    </Link>
                                )}
                                {data.page < data.totalPages && (
                                    <Link
                                        href={`/admin/leads?${new URLSearchParams({
                                            ...params,
                                            page: String(data.page + 1),
                                        } as Record<string, string>).toString()}`}
                                        className="px-3 py-1 text-sm text-white bg-teal-600 rounded hover:bg-teal-700"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-screen bg-red-50 p-8">
                <h1 className="text-2xl font-bold text-red-800">Error Loading Page</h1>
                <pre className="mt-4 p-4 bg-white rounded shadow text-red-600 overflow-auto">
                    {error instanceof Error ? error.message : String(error)}
                    {'\n\n'}
                    {error instanceof Error ? error.stack : ''}
                </pre>
            </div>
        );
    }
}
