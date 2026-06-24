import { LayoutGrid, ListFilter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "../../components/layout/Navbar";
import { FilterPanel } from "../../components/jobs/FilterPanel";
import { JobCard } from "../../components/jobs/JobCard";
import { SearchBar } from "../../components/jobs/SearchBar";
import { Pagination } from "../../components/ui/Pagination";
import { jobService } from "../../services/job.service";

export default function JobsPage() {
  const { data = [] } = useQuery({ queryKey: ["jobs"], queryFn: jobService.list });

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="container-pad py-8">
        <SearchBar />
        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside>
            <FilterPanel />
          </aside>
          <section>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-xl font-extrabold text-dark">{data.length * 14} Frontend Developer jobs found</h1>
                <p className="mt-1 text-sm text-muted">Lowongan pilihan dengan skor kecocokan tertinggi.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white text-primary">
                  <LayoutGrid size={18} />
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white text-muted">
                  <ListFilter size={18} />
                </button>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <Pagination />
          </section>
        </div>
      </main>
    </div>
  );
}
