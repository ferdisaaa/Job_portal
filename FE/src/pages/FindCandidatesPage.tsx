import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useJobs } from '../context/JobContext';

export default function FindCandidatesPage() {
  const { applicants, jobs, auth } = useJobs();
  const [search, setSearch] = useState('');

  const filtered = applicants.filter((app) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return app.name.toLowerCase().includes(q) || app.email.toLowerCase().includes(q) || app.proposal.toLowerCase().includes(q);
  });

  const getJobTitle = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || 'General Application';
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark">Find Candidates</h1>
            <p className="text-gray-500 text-sm mt-1">Jelajahi talenta yang melamar melalui platform Kerjago</p>
          </div>
          {auth?.role === 'perusahaan' && (
            <a
              href="/dashboard"
              className="bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              Buka Dashboard
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border border-brand-border rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total Pelamar</p>
            <p className="text-3xl font-bold text-brand-dark mt-1">{applicants.length}</p>
          </div>
          <div className="bg-white border border-brand-border rounded-xl p-6">
            <p className="text-gray-500 text-sm">Lowongan Terisi</p>
            <p className="text-3xl font-bold text-brand-dark mt-1">{new Set(applicants.map((a) => a.jobId)).size}</p>
          </div>
          <div className="bg-white border border-brand-border rounded-xl p-6">
            <p className="text-gray-500 text-sm">Total Lowongan</p>
            <p className="text-3xl font-bold text-brand-dark mt-1">{jobs.length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari pelamar berdasarkan nama, email, atau proposal..."
            className="w-full max-w-md border border-brand-border rounded-full px-5 py-2.5 text-sm outline-none focus:border-brand-dark transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Candidates List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-brand-border rounded-xl">
            <p className="text-gray-400 text-lg">
              {applicants.length === 0 ? 'Belum ada pelamar. Pelamar akan muncul di sini.' : 'Tidak ada hasil pencarian.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((app) => (
              <div key={app.id} className="bg-white border border-brand-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {app.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark">{app.name}</h3>
                      <p className="text-gray-500 text-sm">{app.email}</p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="bg-brand-lime/30 text-brand-dark text-xs font-medium px-3 py-1 rounded-full">
                          {app.candidateType}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                          {getJobTitle(app.jobId)}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {new Date(app.appliedAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-600 text-sm italic">"{app.proposal}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
