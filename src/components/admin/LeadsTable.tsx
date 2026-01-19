'use client';

import { useState } from 'react';
import { formatDateTime, getStatusColor } from '@/lib/utils';
import LeadStatusSelect from './LeadStatusSelect';
import CaseManagerModal from './CaseManagerModal';

interface LeadsTableProps {
    leads: any[];
    hospitals: any[];
    statuses: string[];
}

export default function LeadsTable({ leads, hospitals, statuses }: LeadsTableProps) {
    const [selectedLead, setSelectedLead] = useState<any | null>(null);

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Reference</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Patient</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Surgery</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">City</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Details</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                                        No leads found. Adjust your filters or wait for new inquiries.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <span className="font-mono text-xs text-slate-600">{lead.referenceId}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-slate-900">{lead.fullName}</p>
                                                <p className="text-xs text-slate-500">{lead.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{lead.surgery.name}</td>
                                        <td className="px-4 py-3 text-sm text-slate-700">{lead.city}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-700">
                                            {lead.revenue ? (
                                                <span className="text-teal-600 font-medium">₹{lead.revenue.toLocaleString()}</span>
                                            ) : (
                                                <span className="text-slate-400 italic">Unassigned</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <LeadStatusSelect
                                                    leadId={lead.id}
                                                    currentStatus={lead.status || 'NEW'}
                                                    statuses={statuses}
                                                />
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="p-1 px-2 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-100 rounded hover:bg-teal-100 transition-colors"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedLead && (
                <CaseManagerModal
                    lead={selectedLead}
                    hospitals={hospitals}
                    onClose={() => setSelectedLead(null)}
                />
            )}
        </>
    );
}
