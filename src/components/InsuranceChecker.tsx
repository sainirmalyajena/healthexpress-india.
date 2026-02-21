'use client';

import { useState } from 'react';
import { insuranceProviders } from '@/data/insurance-providers';
import { Shield, CheckCircle2, Info, Phone } from 'lucide-react';
import Link from 'next/link';

export function InsuranceChecker() {
    const [selectedProvider, setSelectedProvider] = useState<string>('');
    const [showDetails, setShowDetails] = useState(false);

    const provider = insuranceProviders.find((p) => p.id === selectedProvider);

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Check Insurance Eligibility</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Select your insurance provider to see typical coverage details for surgeries.
            </p>

            {/* Provider Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Insurance Provider</label>
                <select
                    value={selectedProvider}
                    onChange={(e) => {
                        setSelectedProvider(e.target.value);
                        setShowDetails(!!e.target.value);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">-- Select Your Provider --</option>
                    {insuranceProviders.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Coverage Details */}
            {showDetails && provider && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                    <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <div className="text-sm font-medium text-gray-900">Typical Coverage</div>
                            <div className="text-lg font-bold text-green-700">{provider.coveragePercent}%</div>
                            <div className="text-xs text-gray-500 mt-1">of approved surgery costs</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                        <div className="text-sm font-medium text-gray-900 mb-1">Your Co-payment</div>
                        <div className="text-base font-semibold text-gray-700">{provider.copayPercent}%</div>
                        <div className="text-xs text-gray-500">Amount you pay from pocket</div>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                        <div className="flex items-start gap-2">
                            {provider.cashlessAvailable ? (
                                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            ) : (
                                <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                            )}
                            <div>
                                <div className="text-sm font-medium text-gray-900">
                                    {provider.cashlessAvailable ? 'Cashless Facility Available' : 'Reimbursement Basis'}
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">{provider.notes}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                        <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-xs text-gray-700">
                                <strong>Note:</strong> Coverage varies by policy type, sum insured, and waiting periods. Contact us
                                for exact coverage verification before surgery.
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors mt-3"
                    >
                        <Phone className="h-4 w-4" />
                        Verify My Coverage Now
                    </Link>
                </div>
            )}

            {!showDetails && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 text-center text-gray-500 text-sm">
                    Select your insurance provider to see coverage details
                </div>
            )}
        </div>
    );
}
