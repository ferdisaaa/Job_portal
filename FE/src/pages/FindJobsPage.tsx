import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import JobCard from '../components/JobCard';
import { useJobs, type Job } from '../context/JobContext';

const jobTypes = ['Semua', 'Full-time', 'Part-time', 'Contract', 'Internship'];
const categories = ['Semua', 'UX/UI Design', 'Digital Marketing', 'Web Development', 'Data Science'];
const salaryRanges = [
  'Semua',
  'Rp 0 – Rp 5 Jt',
  'Rp 5 Jt – Rp 10 Jt',
  'Rp 10 Jt – Rp 20 Jt',
  'Rp 20 Jt – Rp 40 Jt',
  'Rp 40 Jt+',
];

function parseSalaryMin(salary: string): number {
  const match = salary.match(/Rp ([\d.]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/\./g, ''), 10);
}

export default function FindJobsPage() {
  const { jobs } = useJobs();
  const [keyword, setKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('Semua');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSalary, setSelectedSalary] = useState('Semua');
  const [selectedDistance, setSelectedDistance] = useState('Semua');
  const [selectedEducation, setSelectedEducation] = useState('Semua');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const distanceOptions = ['Semua', '< 5 km', '< 15 km', '< 30 km', '< 50 km'];
  const educationOptions = ['Semua', 'SMA/SMK Sederajat', 'Diploma (D3/D4)', 'Sarjana (S1)', 'Pascasarjana (S2/S3)'];

  const filtered = jobs.filter((job) => {
    if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) && !job.company.toLowerCase().includes(keyword.toLowerCase())) return false;
    if (selectedType !== 'Semua' && job.type !== selectedType) return false;
    if (selectedCategory !== 'Semua' && job.category !== selectedCategory) return false;
    if (selectedEducation !== 'Semua' && job.education !== selectedEducation) return false;
    if (selectedDistance !== 'Semua') {
      const distance = job.distance || 0;
      if (selectedDistance === '< 5 km' && distance > 5) return false;
      if (selectedDistance === '< 15 km' && distance > 15) return false;
      if (selectedDistance === '< 30 km' && distance > 30) return false;
      if (selectedDistance === '< 50 km' && distance > 50) return false;
    }
    const sal = parseSalaryMin(job.salary);
    if (selectedSalary === 'Rp 0 – Rp 5 Jt' && sal > 5000000) return false;
    if (selectedSalary === 'Rp 5 Jt – Rp 10 Jt' && (sal < 5000000 || sal > 10000000)) return false;
    if (selectedSalary === 'Rp 10 Jt – Rp 20 Jt' && (sal < 10000000 || sal > 20000000)) return false;
    if (selectedSalary === 'Rp 20 Jt – Rp 40 Jt' && (sal < 20000000 || sal > 40000000)) return false;
    if (selectedSalary === 'Rp 40 Jt+' && sal < 40000000) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-brand-dark">Semua Lowongan Kerja</h1>
          <p className="text-gray-500 text-sm">{filtered.length} lowongan ditemukan</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-64 shrink-0">
            {/* Search */}
            <div className="bg-white border border-brand-border rounded-xl p-5 mb-4">
              <label className="text-xs font-semibold text-brand-dark mb-2 block">Cari</label>
              <input
                type="text"
                placeholder="Posisi atau perusahaan..."
                className="w-full border border-brand-border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-dark transition-colors"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            {/* Tipe Pekerjaan */}
            <div className="bg-white border border-brand-border rounded-xl p-5 mb-4">
              <h3 className="text-xs font-semibold text-brand-dark mb-3 uppercase tracking-wider">Tipe Pekerjaan</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="jobType"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="accent-brand-dark"
                    />
                    <span className="text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Kategori */}
            <div className="bg-white border border-brand-border rounded-xl p-5 mb-4">
              <h3 className="text-xs font-semibold text-brand-dark mb-3 uppercase tracking-wider">Kategori</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-brand-dark"
                    />
                    <span className="text-sm text-gray-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rentang Gaji */}
            <div className="bg-white border border-brand-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-brand-dark mb-3 uppercase tracking-wider">Rentang Gaji</h3>
              <div className="space-y-2">
                {salaryRanges.map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="salary"
                      checked={selectedSalary === range}
                      onChange={() => setSelectedSalary(range)}
                      className="accent-brand-dark"
                    />
                    <span className="text-sm text-gray-600">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Jarak Lokasi */}
            <div className="bg-white border border-brand-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-brand-dark mb-3 uppercase tracking-wider">Jarak Lokasi</h3>
              <div className="space-y-2">
                {distanceOptions.map((distance) => (
                  <label key={distance} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="distance" checked={selectedDistance === distance} onChange={() => setSelectedDistance(distance)} className="accent-brand-dark" />
                    <span className="text-sm text-gray-600">{distance}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pendidikan Terakhir */}
            <div className="bg-white border border-brand-border rounded-xl p-5">
              <h3 className="text-xs font-semibold text-brand-dark mb-3 uppercase tracking-wider">Pendidikan Terakhir</h3>
              <div className="space-y-2">
                {educationOptions.map((education) => (
                  <label key={education} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="education" checked={selectedEducation === education} onChange={() => setSelectedEducation(education)} className="accent-brand-dark" />
                    <span className="text-sm text-gray-600">{education}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Tidak ada lowongan yang cocok dengan filter Anda.</p>
                <button
                  onClick={() => { setKeyword(''); setSelectedType('Semua'); setSelectedCategory('Semua'); setSelectedSalary('Semua'); setSelectedDistance('Semua'); setSelectedEducation('Semua'); }}
                  className="mt-4 text-brand-dark font-semibold underline text-sm"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((job) => (
                  <JobCard key={job.id} {...job} onSelect={() => setSelectedJob(job)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* ── Modal Detail Lowongan ── */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-brand-border px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-bold text-lg text-brand-dark">{selectedJob.title}</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Info perusahaan */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-brand-dark text-sm shrink-0">
                  {selectedJob.companyLogo}
                </div>
                <div>
                  <p className="font-semibold text-brand-dark">{selectedJob.company}</p>
                  <p className="text-gray-500 text-sm">{selectedJob.location}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="bg-brand-lime/30 text-brand-dark text-xs font-medium px-3 py-1 rounded-full">
                      {selectedJob.type}
                    </span>
                    <span className="font-bold text-brand-dark text-sm">{selectedJob.salary}</span>
                  </div>
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <h3 className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">Deskripsi Pekerjaan</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{selectedJob.description}</p>
              </div>

              {/* Persyaratan Kerja */}
              <div>
                <h3 className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-2">
                  Persyaratan Kerja
                </h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 mt-0.5 text-lime-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Info tambahan */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-brand-border">
                <div>
                  <p className="text-xs text-gray-400">Jarak Lokasi</p>
                  <p className="text-sm font-medium text-brand-dark">{selectedJob.distance} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pendidikan</p>
                  <p className="text-sm font-medium text-brand-dark">{selectedJob.education}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-brand-border px-6 py-4 rounded-b-2xl">
              <button
                onClick={() => { setSelectedJob(null); }}
                className="w-full bg-brand-dark text-white text-sm font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
