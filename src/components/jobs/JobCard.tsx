import { Bookmark, MapPin, Sparkles, Wallet, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "../../types";
import { shortSalary } from "../../utils/format";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface JobCardProps {
  job: Job;
  onBookmark?: (id: string) => void;
}

export function JobCard({
  job,
  onBookmark
}: JobCardProps) {
  return (
    <Card className="group p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft rounded-2xl bg-white border border-slate-100 flex flex-col justify-between h-full">
      {/* Bagian Atas: Informasi Perusahaan & Posisi */}
      <div>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-sm font-extrabold text-white">
              {job.companyLogo}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-slate-500 truncate max-w-[120px]">
                  {job.company}
                </p>

                {job.verified && (
                  <Badge tone="blue">
                    Verified
                  </Badge>
                )}
              </div>

              <h3 className="mt-1 text-lg font-extrabold text-slate-900 tracking-tight line-clamp-1">
                {job.position}
              </h3>
            </div>
          </div>

          <Button
            variant="secondary"
            size="icon"
            aria-label="Bookmark"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (onBookmark) {
                onBookmark(job.id);
              }
            }}
            icon={
              <Bookmark
                size={18}
                fill={job.isBookmarked ? "currentColor" : "none"}
              />
            }
          />
        </div>

        {/* Informasi Jenis Pekerjaan & Lokasi */}
        <div className="mb-4 flex flex-wrap gap-3 text-sm font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <BriefcaseBusiness
              size={16}
              className="text-slate-400"
            />
            {job.jobType}
          </span>

          <span className="inline-flex items-center gap-1.5 truncate">
            <MapPin
              size={16}
              className="text-slate-400"
            />
            {job.location}
          </span>
        </div>

        {/* Deskripsi Singkat */}
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-slate-500">
          {job.description ||
            `Mulai kembangkan karirmu bersama ${job.company} untuk posisi ${job.position} di ${job.location}.`}
        </p>
      </div>

      {/* Bagian Bawah */}
      <div>
        <div className="mb-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="inline-flex items-center gap-2 text-base font-extrabold text-slate-900">
            <Wallet
              size={17}
              className="text-blue-500"
            />

            {shortSalary(
              job.salaryMin,
              job.salaryMax
            )}
          </span>

          <span className="text-sm font-medium text-slate-400">
            {job.postedAt}
          </span>
        </div>

        <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-extrabold text-blue-600 flex items-center justify-center gap-2">
          <Sparkles
            size={16}
            className="text-blue-500"
          />

          Match Score: {job.matchScore ?? 0}%
        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="block"
        >
          <Button
            variant="primary"
            className="w-full text-white font-bold py-2.5 rounded-xl transition"
          >
            Detail
          </Button>
        </Link>
      </div>
    </Card>
  );
}