import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { JobCard } from "../../components/jobs/JobCard";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { jobs } from "../../services/mockData";

export default function BookmarksPage() {
  const [data, setData] = useState(jobs.slice(0, 4));

  return (
    <DashboardLayout title="Bookmarks">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.map((job) => (
          <div key={job.id}>
            <JobCard job={job} />
            <div className="mt-3">
              <Button variant="danger" className="w-full" icon={<Trash2 size={18} />} onClick={() => setData((current) => current.filter((item) => item.id !== job.id))}>
                Hapus Bookmark
              </Button>
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="rounded-xl2 border border-border bg-white p-8 text-center shadow-card">
          <p className="text-lg font-extrabold text-dark">Belum ada bookmark</p>
          <p className="mt-2 text-muted">Pekerjaan yang kamu simpan akan tampil di sini.</p>
        </div>
      )}
    </DashboardLayout>
  );
}
