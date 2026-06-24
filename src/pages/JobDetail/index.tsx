import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Bookmark, BriefcaseBusiness, Calendar, MapPin, Sparkles, Wallet } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { jobService } from "../../services/job.service";
import { shortSalary } from "../../utils/format";

export default function JobDetailPage() {
  const { id = "" } = useParams();
  const { data: job } = useQuery({ queryKey: ["jobs", id], queryFn: () => jobService.detail(id) });

  if (!job) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar />
        <div className="container-pad py-12">Lowongan tidak ditemukan.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="container-pad py-8">
        <Link to="/jobs" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
          <ArrowLeft size={18} /> Kembali ke Jobs
        </Link>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="p-8">
            <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-start">
              <div className="flex gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-xl2 bg-slate-950 text-xl font-extrabold text-white">{job.companyLogo}</div>
                <div>
                  <p className="font-semibold text-muted">{job.company}</p>
                  <h1 className="mt-1 text-3xl font-extrabold text-dark">{job.position}</h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge tone="blue">{job.jobType}</Badge>
                    <Badge tone="green">{job.workType}</Badge>
                    <Badge>{job.experience}</Badge>
                  </div>
                </div>
              </div>
              <Button variant="secondary" icon={<Bookmark size={18} />}>
                Bookmark
              </Button>
            </div>
            <h2 className="text-xl font-extrabold text-dark">Deskripsi Pekerjaan</h2>
            <p className="mt-4 leading-8 text-muted">{job.description}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                ["Lokasi", job.location, MapPin],
                ["Gaji", shortSalary(job.salaryMin, job.salaryMax), Wallet],
                ["Deadline", job.deadline, Calendar],
                ["Kategori", job.category, BriefcaseBusiness],
              ].map(([label, value, Icon]) => (
                <div key={String(label)} className="rounded-xl border border-border p-4">
                  {typeof Icon !== "string" && <Icon className="mb-3 text-primary" size={20} />}
                  <p className="text-sm font-semibold text-muted">{String(label)}</p>
                  <p className="mt-1 font-extrabold text-dark">{String(value)}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="h-fit p-6">
            <div className="rounded-xl2 bg-blue-50 p-6 text-center">
              <Sparkles className="mx-auto text-primary" size={28} />
              <p className="mt-3 text-sm font-bold text-primary">Match Score</p>
              <p className="mt-1 text-5xl font-extrabold text-dark">{job.matchScore}%</p>
            </div>
            <Button className="mt-5 w-full">Lamar Sekarang</Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
