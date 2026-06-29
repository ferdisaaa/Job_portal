// --- Type untuk data yang dikirim dari Front-End (input) ---
export interface JobInput {
  title: string;
  company: string;
  location: string;
  type: string; // misal: 'Full-time', 'Part-time', 'Internship'
  salary?: string;
  description?: string;
  company_logo?: string;
  url?: string;
}

// --- Type untuk record di tabel (Prisma) ---
export interface JobRecord {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string | null;
  description?: string | null;
  company_logo?: string | null;
  url?: string | null;
  distance?: number | null;
  education?: string | null;
  requirements?: string[] | null;
  created_at?: Date | string;
}

// --- Interface untuk query params filter ---
export interface JobFilterParams {
  search?: string;
  education?: string;
  maxDistance?: string;
}
