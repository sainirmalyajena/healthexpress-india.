/**
 * Common medical synonyms and aliases to improve search discoverability.
 * Maps common/layman terms to technical or database terms.
 */
export const surgerySynonyms: Record<string, string[]> = {
    'piles': ['hemorrhoid', 'haemorrhoid', 'anorectal'],
    'stones': ['calculus', 'lithiasis', 'stone removal'],
    'kidney stones': ['pcnl', 'eswl', 'ureteroscopy', 'renal calculus'],
    'gallbladder stones': ['cholecystectomy', 'gallstone'],
    'hernia': ['inguinal', 'ventral', 'umbilical', 'hernioplasty'],
    'appendix': ['appendectomy', 'appendicitis'],
    'cataract': ['phacoemulsification', 'lens replacement', 'eye surgery'],
    'joint pain': ['replacement', 'arthroplasty', 'arthroscopy'],
    'knee pain': ['knee replacement', 'acl reconstruction', 'meniscus repair'],
    'hip pain': ['hip replacement', 'arthroplasty'],
    'tonsils': ['tonsillectomy', 'adenoidectomy'],
    'sinus': ['fess', 'septoplasty', 'sinusitis'],
    'heart': ['cardiac', 'bypass', 'cabg', 'angioplasty', 'valve'],
    'spine': ['spinal', 'discectomy', 'fusion', 'laminectomy'],
    'uterus': ['hysterectomy', 'fibroid', 'gynecology'],
    'weight loss': ['bariatric', 'gastric sleeve', 'bypass'],
    'fracture': ['orif', 'bone fixation', 'trauma'],
    'laser': ['laparoscopic', 'minimally invasive'],
    'cancer': ['oncology', 'tumor', 'mastectomy', 'resection'],
    'prostate': ['turp', 'prostatectomy', 'urology'],
};

/**
 * Expands a search query with its synonyms.
 * @param query The user's search query
 * @returns An array of strings representing the query and its potential synonyms
 */
export function expandQuery(query: string): string[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return [];

    const result = new Set([normalizedQuery]);

    // Check for exact matches and partial matches in synonym keys
    for (const [key, synonyms] of Object.entries(surgerySynonyms)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            synonyms.forEach(s => result.add(s));
        }
    }

    return Array.from(result);
}
