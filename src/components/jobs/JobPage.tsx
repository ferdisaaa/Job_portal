import React, { useState } from 'react';
import { JobCard } from './JobCard'; 
import { Pagination } from '../ui/Pagination'; 

// Data Lowongan Pekerjaan Tiruan (Untuk 3 Halaman)
const allJobs = [
  // Halaman 1
  { id: 1, company: 'Talently Asia', position: 'UI/UX Designer', companyLogo: 'TA', jobType: 'Contract', location: 'Remote, Indonesia', salaryMin: 6000000, salaryMax: 10000000, postedAt: '10 hari lalu', matchScore: 88, verified: true },
  { id: 2, company: 'Bright EduTech', position: 'Data Analyst', companyLogo: 'BE', jobType: 'Full-time', location: 'Yogyakarta, Indonesia', salaryMin: 7000000, salaryMax: 12000000, postedAt: '12 hari lalu', matchScore: 79, verified: true },
  { id: 3, company: 'Karya Studio', position: 'Mobile Developer', companyLogo: 'KS', jobType: 'Freelance', location: 'Denpasar, Indonesia', salaryMin: 10000000, salaryMax: 18000000, postedAt: '18 hari lalu', matchScore: 82, verified: true },
  { id: 4, company: 'Bibit.id', position: 'Frontend Developer (React/TS)', companyLogo: 'BT', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 12000000, salaryMax: 18000000, postedAt: '3 hari lalu', matchScore: 95, verified: true },
  { id: 5, company: 'Gojek', position: 'Product Manager', companyLogo: 'GJ', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 22000000, salaryMax: 35000000, postedAt: '6 jam lalu', matchScore: 91, verified: true },
  { id: 6, company: 'Bukalapak', position: 'UI/UX Lead Designer', companyLogo: 'BL', jobType: 'Remote', location: 'Remote, Indonesia', salaryMin: 18000000, salaryMax: 28000000, postedAt: '1 hari lalu', matchScore: 84, verified: true },

  // Halaman 2
  { id: 7, company: 'Microsoft Indonesia', position: 'Software Engineering Manager', companyLogo: 'MS', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 40000000, salaryMax: 60000000, postedAt: '8 jam lalu', matchScore: 97, verified: true },
  { id: 8, company: 'Sea Group', position: 'Data Scientist', companyLogo: 'SG', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 28000000, salaryMax: 45000000, postedAt: '1 hari lalu', matchScore: 94, verified: true },
  { id: 9, company: 'Traveloka', position: 'Backend Lead (Go)', companyLogo: 'TR', jobType: 'Hybrid', location: 'Jakarta, Indonesia', salaryMin: 35000000, salaryMax: 50000000, postedAt: '2 hari lalu', matchScore: 90, verified: true },
  { id: 10, company: 'DANA Indonesia', position: 'Cloud Infrastructure Lead', companyLogo: 'DA', jobType: 'Full-time', location: 'Tangerang, Indonesia', salaryMin: 32000000, salaryMax: 48000000, postedAt: '4 hari lalu', matchScore: 89, verified: true },
  { id: 11, company: 'Kredivo Group', position: 'Digital Marketing Lead', companyLogo: 'KD', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 16000000, salaryMax: 24000000, postedAt: '6 hari lalu', matchScore: 87, verified: true },
  { id: 12, company: 'Ninja Xpress', position: 'Operations Research Lead', companyLogo: 'NX', jobType: 'Full-time', location: 'Bekasi, Indonesia', salaryMin: 18000000, salaryMax: 26000000, postedAt: '8 hari lalu', matchScore: 85, verified: true },

  // Halaman 3
  { id: 13, company: 'Netflix Indonesia', position: 'DevOps Engineer', companyLogo: 'NF', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 40000000, salaryMax: 65000000, postedAt: '3 jam lalu', matchScore: 96, verified: true },
  { id: 14, company: 'Grab Indonesia', position: 'AI/ML Lead', companyLogo: 'GR', jobType: 'Full-time', location: 'Tangerang, Indonesia', salaryMin: 38000000, salaryMax: 55000000, postedAt: '9 jam lalu', matchScore: 93, verified: true },
  { id: 15, company: 'Halodoc', position: 'Full-Stack Developer', companyLogo: 'HL', jobType: 'Remote', location: 'Remote', salaryMin: 22000000, salaryMax: 32000000, postedAt: '1 hari lalu', matchScore: 92, verified: true },
  { id: 16, company: 'Ajaib Group', position: 'Product Lead', companyLogo: 'AJ', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 30000000, salaryMax: 45000000, postedAt: '3 hari lalu', matchScore: 90, verified: true },
  { id: 17, company: 'OVO', position: 'Senior QA Engineer', companyLogo: 'OV', jobType: 'Hybrid', location: 'Tangerang, Indonesia', salaryMin: 14000000, salaryMax: 20000000, postedAt: '5 hari lalu', matchScore: 88, verified: true },
  { id: 18, company: 'Xendit', position: 'Infrastructure Lead', companyLogo: 'XD', jobType: 'Full-time', location: 'Jakarta, Indonesia', salaryMin: 35000000, salaryMax: 52000000, postedAt: '7 hari lalu', matchScore: 87, verified: true },
];

const JOBS_PER_PAGE = 6;

const JobPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);

  // Slicing data sesuai halaman aktif
  const currentJobs = allJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Statistik Ringkas */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Rekomendasi Pekerjaan</h1>
          <p className="text-slate-500 text-sm mt-1">
            Ditemukan {allJobs.length} lowongan berdasarkan kriteria pencarian Anda.
          </p>
        </div>
      </div>

      {/* Grid List Pekerjaan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          // Konversi job.id menjadi string pada prop key untuk menghindari type error
          <JobCard key={`job-${job.id}`} job={job as any} />
        ))}
      </div>

      {/* Komponen Pagination Dinamis terhubung langsung dengan state halaman */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={(page) => setCurrentPage(page)} 
      />
    </div>
  );
};

export default JobPage;