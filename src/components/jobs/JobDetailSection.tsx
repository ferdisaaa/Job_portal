import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface Job {
  id: string;
  company: string;
  companyLogo: string;
  position: string;
  location: string;
  workType: string;
  jobType: string;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  category: string;
  description: string;
  postedAt: string;
  deadline: string;
  matchScore: number;
  status: string;
  verified: boolean;
}

interface JobDetailSectionProps {
  job?: Job;
  userRole?: "applicant" | "recruiter";
  onEdit?: (job: Job) => void;
}

export default function JobDetailSection({
  job,
  userRole = "applicant",
  onEdit,
}: JobDetailSectionProps) {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!job) {
    return (
      <Card className="p-8 flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="font-semibold text-slate-700">
            Pilih Lowongan Pekerjaan
          </h3>
          <p className="text-slate-500 text-sm mt-2">
            Detail pekerjaan akan muncul di sini.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4 border-b pb-6">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              {job.companyLogo}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-slate-800">
                  {job.position}
                </h2>

                {job.verified && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
                    Verified
                  </span>
                )}
              </div>

              <p className="text-slate-600 font-medium">
                {job.company}
              </p>

              <p className="text-sm text-slate-500">
                {job.location} • {job.workType}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold">
              AI Match {job.matchScore}%
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500">Tipe</p>
            <p className="font-semibold">{job.jobType}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500">Pengalaman</p>
            <p className="font-semibold">{job.experience}</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500">Gaji</p>
            <p className="font-semibold text-emerald-600">
              {formatRupiah(job.salaryMin)} - {formatRupiah(job.salaryMax)}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500">Deadline</p>
            <p className="font-semibold text-red-500">
              {job.deadline}
            </p>
          </div>
        </div>

        {/* KATEGORI */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-2">
            Kategori
          </h3>

          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
            {job.category}
          </span>
        </div>

        {/* DESKRIPSI */}
        <div>
          <h3 className="font-semibold text-slate-800 mb-3">
            Deskripsi Pekerjaan
          </h3>

          <div className="bg-slate-50 p-4 rounded-xl text-slate-600 leading-relaxed whitespace-pre-line">
            {job.description}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t pt-6">
          <span className="text-sm text-slate-500">
            Diposting: {job.postedAt}
          </span>

          {userRole === "recruiter" ? (
            <Button
              onClick={() => onEdit?.(job)}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Edit Lowongan
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button className="border border-slate-300 bg-white text-slate-700">
                Simpan
              </Button>

              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Lamar Sekarang
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}