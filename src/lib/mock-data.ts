import { Category } from '@/generated/prisma';

// Helper to generate slug
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const createSurgery = (
    id: string,
    name: string,
    category: Category,
    symptoms: string[],
    costMin: number,
    costMax: number,
    insurance: boolean,
    duration: string,
    stay: string
) => {
    const slug = slugify(name);
    return {
        id,
        name,
        slug,
        category,
        overview: `${name} is a ${insurance ? 'commonly performed' : 'specialized'} procedure in ${category.replace('_', ' ')}. This surgery is designed to address specific medical conditions and improve patient quality of life.`,
        indications: `Recommended for: ${symptoms.join(', ')}.`,
        procedure: `The procedure typically involves pre-operative preparation, the surgical intervention (${duration}), and post-operative recovery monitoring.`,
        duration,
        hospitalStay: stay,
        recovery: `Full recovery typically takes 4-8 weeks.`,
        risks: `Potential risks include infection, bleeding, and reaction to anesthesia.`,
        preparation: `Fasting is required. Complete all pre-op tests.`,
        postOpCare: `Keep wound dry. Follow medication schedule to pain management.`,
        costRangeMin: costMin,
        costRangeMax: costMax,
        insuranceLikely: insurance,
        symptoms,
        faqs: [
            { question: 'Recover Time?', answer: '4-6 weeks' },
            { question: 'Insurance?', answer: insurance ? 'Likely covered' : 'Check provider' }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

export const MOCK_SURGERIES = [
    // GENERAL
    createSurgery('1', 'Appendectomy', 'GENERAL_SURGERY', ['abdominal pain'], 40000, 120000, true, '1-2 hours', '1-2 days'),
    createSurgery('2', 'Hernia Repair', 'GENERAL_SURGERY', ['bulge', 'pain'], 50000, 150000, true, '1 hour', '1 day'),
    createSurgery('3', 'Gallbladder Removal', 'GENERAL_SURGERY', ['stones', 'pain'], 60000, 180000, true, '1.5 hours', '1 day'),

    // ORTHO
    createSurgery('4', 'Total Knee Replacement', 'ORTHOPEDICS', ['knee pain', 'arthritis'], 150000, 400000, true, '2-3 hours', '5 days'),
    createSurgery('5', 'ACL Reconstruction', 'ORTHOPEDICS', ['instability', 'sports injury'], 100000, 250000, true, '2 hours', '1 day'),

    // CARDIAC
    createSurgery('6', 'Coronary Angioplasty', 'CARDIAC', ['chest pain'], 150000, 350000, true, '1 hour', '2 days'),
    createSurgery('7', 'Bypass Surgery (CABG)', 'CARDIAC', ['artery blockage'], 250000, 600000, true, '4 hours', '7 days'),

    // OPHTHALMOLOGY
    createSurgery('8', 'LASIK Eye Surgery', 'OPHTHALMOLOGY', ['vision correction'], 40000, 100000, false, '30 mins', 'Daycare'),
    createSurgery('9', 'Cataract Surgery', 'OPHTHALMOLOGY', ['cloudy vision'], 25000, 80000, true, '30 mins', 'Daycare'),

    // DENTAL
    createSurgery('10', 'Dental Implant', 'DENTAL', ['missing tooth'], 25000, 80000, false, '1 hour', 'Daycare'),
    createSurgery('11', 'Root Canal', 'DENTAL', ['tooth pain'], 5000, 15000, true, '1 hour', 'Daycare'),
];

export const MOCK_LEADS = []; // Empty initially
