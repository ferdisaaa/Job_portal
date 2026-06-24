import { Bookmark, Briefcase, CalendarCheck, Sparkles } from "lucide-react";
import { MetricCard } from "../components/dashboard/MetricCard";
import { Table } from "../components/ui/Table";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { applications } from "../services/mockData";
import type { Application } from "../types";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Job Seeker Dashboard">
      <div className="mb-6 grid gap-5 md:grid-cols-4">
        <MetricCard label="Total Lamaran" value="24" trend="+5 minggu ini" icon={<Briefcase size={20} />} />
        <MetricCard label="Bookmark" value="18" trend="+3 tersimpan" icon={<Bookmark size={20} />} />
        <MetricCard label="Interview" value="6" trend="+2 jadwal" icon={<CalendarCheck size={20} />} />
        <MetricCard label="Match Score" value="95%" trend="Top 8%" icon={<Sparkles size={20} />} />
      </div>
      <Table<Application>
        data={applications}
        columns={[
          { header: "Recent Applications", render: (item) => <span className="font-bold">{item.position}</span> },
          { header: "Perusahaan", render: (item) => item.company },
          { header: "Tanggal", render: (item) => item.date },
          { header: "Status", render: (item) => item.status },
        ]}
      />
    </DashboardLayout>
  );
}
