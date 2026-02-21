'use client';

import { useState } from 'react';
import { Calculator, TrendingDown, Building2 } from 'lucide-react';

interface CostEstimatorProps {
    baseCostMin: number;
    baseCostMax: number;
    surgeryName: string;
}

export function CostEstimator({ baseCostMin, baseCostMax }: CostEstimatorProps) {
    const [city, setCity] = useState<string>('mumbai');
    const [hasInsurance, setHasInsurance] = useState<boolean>(false);
    const [hospitalType, setHospitalType] = useState<'budget' | 'mid' | 'premium'>('mid');

    // City multipliers
    const cityMultipliers: Record<string, number> = {
        mumbai: 1.2,
        delhi: 1.15,
        bangalore: 1.15,
        hyderabad: 1.0,
        chennai: 1.0,
        pune: 1.05,
        kolkata: 0.95,
        ahmedabad: 0.9,
        jaipur: 0.85,
        other: 0.8,
    };

    // Hospital type multipliers
    const hospitalMultipliers = {
        budget: 0.7,
        mid: 1.0,
        premium: 1.4,
    };

    // Insurance typically covers 70-80% after co-pay
    const insuranceDiscount = hasInsurance ? 0.75 : 0;

    const cityMult = cityMultipliers[city] || 1;
    const hospitalMult = hospitalMultipliers[hospitalType];

    const estimatedMin = Math.round(baseCostMin * cityMult * hospitalMult);
    const estimatedMax = Math.round(baseCostMax * cityMult * hospitalMult);

    const outOfPocketMin = hasInsurance ? Math.round(estimatedMin * (1 - insuranceDiscount)) : estimatedMin;
    const outOfPocketMax = hasInsurance ? Math.round(estimatedMax * (1 - insuranceDiscount)) : estimatedMax;

    const savings = hasInsurance ? estimatedMin - outOfPocketMin : 0;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Estimate Your Surgery Cost</h3>
            </div>

            {/* City Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Your City</label>
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi NCR</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="chennai">Chennai</option>
                    <option value="pune">Pune</option>
                    <option value="kolkata">Kolkata</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="jaipur">Jaipur</option>
                    <option value="other">Other City</option>
                </select>
            </div>

            {/* Hospital Type */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="inline h-4 w-4 mr-1" />
                    Hospital Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => setHospitalType('budget')}
                        className={`px-3 py-2 text-sm rounded-md border ${hospitalType === 'budget'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                            }`}
                    >
                        Budget
                    </button>
                    <button
                        onClick={() => setHospitalType('mid')}
                        className={`px-3 py-2 text-sm rounded-md border ${hospitalType === 'mid'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                            }`}
                    >
                        Standard
                    </button>
                    <button
                        onClick={() => setHospitalType('premium')}
                        className={`px-3 py-2 text-sm rounded-md border ${hospitalType === 'premium'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                            }`}
                    >
                        Premium
                    </button>
                </div>
            </div>

            {/* Insurance Toggle */}
            <div className="mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={hasInsurance}
                        onChange={(e) => setHasInsurance(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">I have health insurance</span>
                </label>
            </div>

            {/* Estimated Cost */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Estimated Total Cost</div>
                <div className="text-2xl font-bold text-gray-900">
                    ₹{estimatedMin.toLocaleString('en-IN')} - ₹{estimatedMax.toLocaleString('en-IN')}
                </div>

                {hasInsurance && (
                    <>
                        <div className="border-t border-gray-200 mt-3 pt-3">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <TrendingDown className="h-4 w-4" />
                                <span className="text-sm font-medium">With Insurance Coverage</span>
                            </div>
                            <div className="text-xl font-bold text-green-700">
                                ₹{outOfPocketMin.toLocaleString('en-IN')} - ₹{outOfPocketMax.toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Estimated savings: ₹{savings.toLocaleString('en-IN')}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-3 text-xs text-gray-500">
                * Costs are estimates based on {city.charAt(0).toUpperCase() + city.slice(1)} average pricing. Actual costs
                may vary based on hospital, doctor fees, and complications. Insurance coverage depends on your policy terms.
            </div>
        </div>
    );
}
