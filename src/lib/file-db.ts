
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'leads.json');

export interface Lead {
    id: string;
    referenceId: string;
    fullName: string;
    phone: string;
    email: string;
    city: string;
    surgeryId: string;
    surgeryName: string;
    description: string;
    insurance: string;
    status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CLOSED';
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown;
}

export async function getLeads(): Promise<Lead[]> {
    try {
        const fileContent = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
}

export async function saveLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'> & { status?: string }) {
    const leads = await getLeads();
    const newLead: Lead = {
        id: Math.random().toString(36).substr(2, 9),
        status: 'NEW',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...leadData,
    } as Lead;

    leads.push(newLead);
    await fs.writeFile(DB_PATH, JSON.stringify(leads, null, 2));
    return newLead;
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
    const leads = await getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) {
        leads[index] = { ...leads[index], status, updatedAt: new Date().toISOString() };
        await fs.writeFile(DB_PATH, JSON.stringify(leads, null, 2));
        return leads[index];
    }
    return null;
}
