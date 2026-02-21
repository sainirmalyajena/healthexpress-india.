export interface InsuranceProvider {
    id: string;
    name: string;
    logo?: string;
    coveragePercent: number; // Typical coverage percentage
    cashlessAvailable: boolean;
    copayPercent: number; // Co-payment percentage
    notes?: string;
}

export const insuranceProviders: InsuranceProvider[] = [
    {
        id: 'star-health',
        name: 'Star Health Insurance',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Wide network coverage across India',
    },
    {
        id: 'hdfc-ergo',
        name: 'HDFC ERGO',
        coveragePercent: 85,
        cashlessAvailable: true,
        copayPercent: 15,
        notes: 'Fast claim processing',
    },
    {
        id: 'icici-lombard',
        name: 'ICICI Lombard',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Comprehensive coverage plans',
    },
    {
        id: 'max-bupa',
        name: 'Niva Bupa (Max Bupa)',
        coveragePercent: 85,
        cashlessAvailable: true,
        copayPercent: 15,
        notes: 'International coverage available',
    },
    {
        id: 'care-health',
        name: 'Care Health Insurance',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Instant e-card facility',
    },
    {
        id: 'bajaj-allianz',
        name: 'Bajaj Allianz',
        coveragePercent: 75,
        cashlessAvailable: true,
        copayPercent: 25,
        notes: 'Affordable premiums',
    },
    {
        id: 'royal-sundaram',
        name: 'Royal Sundaram',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'No pre-inspection for sum insured up to ₹5 lakhs',
    },
    {
        id: 'new-india',
        name: 'New India Assurance',
        coveragePercent: 75,
        cashlessAvailable: true,
        copayPercent: 25,
        notes: 'Government-backed insurer',
    },
    {
        id: 'reliance-health',
        name: 'Reliance Health Insurance',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Good for critical illness coverage',
    },
    {
        id: 'united-india',
        name: 'United India Insurance',
        coveragePercent: 75,
        cashlessAvailable: true,
        copayPercent: 25,
        notes: 'Public sector insurance',
    },
    {
        id: 'cigna-ttk',
        name: 'Cigna TTK',
        coveragePercent: 85,
        cashlessAvailable: true,
        copayPercent: 15,
        notes: 'Global coverage with TTK network',
    },
    {
        id: 'religare',
        name: 'Religare Health Insurance',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Unlimited automatic recharge on sum insured',
    },
    {
        id: 'aditya-birla',
        name: 'Aditya Birla Health Insurance',
        coveragePercent: 80,
        cashlessAvailable: true,
        copayPercent: 20,
        notes: 'Wellness benefits included',
    },
    {
        id: 'sbi-health',
        name: 'SBI Health Insurance',
        coveragePercent: 75,
        cashlessAvailable: true,
        copayPercent: 25,
        notes: 'Banking integration available',
    },
    {
        id: 'cghs',
        name: 'CGHS (Central Govt)',
        coveragePercent: 100,
        cashlessAvailable: true,
        copayPercent: 0,
        notes: 'For central government employees',
    },
    {
        id: 'esic',
        name: 'ESIC',
        coveragePercent: 100,
        cashlessAvailable: true,
        copayPercent: 0,
        notes: 'Employee State Insurance Corporation',
    },
];

export function getInsuranceProvider(id: string): InsuranceProvider | undefined {
    return insuranceProviders.find((provider) => provider.id === id);
}
