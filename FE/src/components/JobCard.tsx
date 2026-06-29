import { useJobs } from '../context/JobContext';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: string;
  type: string;
  verified: boolean;
  distance?: number;
  education?: string;
  onSelect?: () => void;
}

export default function JobCard({ id, title, company, companyLogo, location, salary, type, verified, distance, education, onSelect }: JobCardProps) {
  const { addApplicant, auth, profile } = useJobs();

  const isProfileComplete = (): boolean => {
    if (!profile) return false;
    if (profile.role === 'recruiter') return true; // recruiter doesn't need CV
    return !!(profile.name && profile.email && profile.phone && profile.pendidikan && profile.cvFile);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!auth) {
      window.location.href = '/login';
      return;
    }
    if (!profile || !isProfileComplete()) {
      alert('Profil Belum Lengkap! Silakan lengkapi data diri dan upload CV Anda terlebih dahulu di halaman Profil Saya.');
      window.location.href = '/profile';
      return;
    }
    // Instant Apply — gunakan data dari profil
    addApplicant({
      jobId: id,
      name: profile.name,
      email: profile.email,
      candidateType: 'Pencari Kerja',
      proposal: `Application for ${title} at ${company}`,
      cvFile: profile.cvFile,
      avatar: profile.avatar,
    });
    alert('Lamaran berhasil dikirim! Perusahaan akan menghubungi Anda melalui email.');
  };

  return (
    <div
      className="group bg-white border border-brand-border rounded-xl p-5 flex flex-col gap-3 hover:shadow-xl hover:-translate-y-2 hover:border-lime-500/40 transition-all duration-300 ease-out cursor-pointer"
      onClick={onSelect}
    >
      {/* Top row: logo + info */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-brand-dark text-sm shrink-0 group-hover:bg-brand-lime/30 transition-colors duration-300">
          {companyLogo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-brand-dark text-sm truncate">{title}</h3>
            {verified && (
              <span className="text-blue-500 shrink-0">
                <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs">{company}</p>
          <p className="text-gray-400 text-xs mt-0.5">{location}</p>
          {distance !== undefined && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <span>📍</span>
              <span>{distance} km</span>
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-brand-lime/30 text-brand-dark text-xs font-medium px-3 py-1 rounded-full">
          {type}
        </span>
        {education && (
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
            🎓 {education}
          </span>
        )}
      </div>

      {/* Bottom: salary + apply */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="font-bold text-brand-dark text-sm">{salary}</span>
        <button
          onClick={handleApply}
          className="border border-brand-dark text-brand-dark text-xs font-semibold px-5 py-2 rounded-full hover:bg-brand-dark hover:text-white hover:shadow-md active:scale-95 transition-all duration-200"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
