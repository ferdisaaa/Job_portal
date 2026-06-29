import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  category: string;
  verified: boolean;
  featured: boolean;
  distance: number;
  education: string;
  requirements: string[];
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  candidateType: string;
  proposal: string;
  appliedAt: string;
  cvFile?: string;
  avatar?: string;
  status?: 'pending' | 'diterima' | 'ditolak';
}

export type UserRole = 'pencari-kerja' | 'perusahaan';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName?: string;
}

export interface UserProfile {
  role: 'jobseeker' | 'recruiter';
  name: string;
  email: string;
  phone: string;
  avatar: string;
  // Khusus Jobseeker
  pendidikan?: string;
  riwayatKerja?: string;
  pengalamanTahun?: number;
  cvFile?: string;
  // Khusus Recruiter
  companyName?: string;
  companyDesc?: string;
  companyLocation?: string;
}

interface JobContextType {
  jobs: Job[];
  applicants: Applicant[];
  auth: AuthUser | null;
  profile: UserProfile | null;
  fetchJobs: (filters?: { search?: string; education?: string; maxDistance?: number }) => Promise<void>;
  addJob: (job: Omit<Job, 'id'>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  addApplicant: (applicant: Omit<Applicant, 'id' | 'appliedAt'>) => void;
  login: (user: AuthUser) => void;
  register: (user: AuthUser) => void;
  logout: () => void;
  setProfile: (profile: UserProfile | null) => void;
  updateApplicantStatus: (id: string, status: 'pending' | 'diterima' | 'ditolak') => void;
  deleteApplicant: (id: string) => void;
  updateApplicantJobId: (oldJobId: string, newJobId: string) => void;
}

const JobContext = createContext<JobContextType | null>(null);

const API_BASE = 'http://localhost:5000/api/jobs';

const defaultApplicants: Applicant[] = [];

// ── Storage helpers (for auth & profile only) ──
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<Applicant[]>(() => loadFromStorage('kerjago_applicants', defaultApplicants));
  const [auth, setAuth] = useState<AuthUser | null>(() => loadFromStorage('kerjago_auth', null));
  const [profile, setProfile] = useState<UserProfile | null>(() => loadFromStorage('kerjago_profile', null));

  // ── Fetch jobs from API ──
  const fetchJobs = async (filters?: {
    search?: string;
    education?: string;
    maxDistance?: number;
  }) => {
    try {
      const params = new URLSearchParams();
      if (filters?.search) params.set('search', filters.search);
      if (filters?.education && filters.education !== 'Semua') params.set('education', filters.education);
      if (filters?.maxDistance !== undefined) params.set('maxDistance', String(filters.maxDistance));

      const url = `${API_BASE}${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Job[] = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // ── Add job via API ──
  const addJob = async (job: Omit<Job, 'id'>) => {
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // Refetch to stay in sync with server
      await fetchJobs();
    } catch (err) {
      console.error('Failed to add job:', err);
    }
  };

  const updateJob = (id: string, updated: Partial<Job>) => {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...updated } : j)));
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setApplicants((prev) => prev.filter((a) => a.jobId !== id));
  };

  const addApplicant = (applicant: Omit<Applicant, 'id' | 'appliedAt'>) => {
    const newApplicant: Applicant = {
      ...applicant,
      id: Date.now().toString(),
      appliedAt: new Date().toISOString(),
      status: 'pending',
    };
    setApplicants((prev) => [newApplicant, ...prev]);
  };

  const login = (user: AuthUser) => setAuth(user);
  const register = (user: AuthUser) => setAuth(user);
  const logout = () => setAuth(null);

  const updateApplicantStatus = (id: string, status: 'pending' | 'diterima' | 'ditolak') => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteApplicant = (id: string) => {
    setApplicants((prev) => prev.filter((a) => a.id !== id));
  };

  const updateApplicantJobId = (oldJobId: string, newJobId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.jobId === oldJobId ? { ...a, jobId: newJobId } : a))
    );
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        applicants,
        auth,
        profile,
        fetchJobs,
        addJob,
        updateJob,
        deleteJob,
        addApplicant,
        updateApplicantStatus,
        deleteApplicant,
        login,
        register,
        logout,
        setProfile,
        updateApplicantJobId,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be used within JobProvider');
  return ctx;
}

export default JobContext;
