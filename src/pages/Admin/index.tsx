import { BarChart3, Briefcase, ShieldCheck, Users } from "lucide-react";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { DashboardLayout } from "../../layouts/DashboardLayout";

type Audit = { id: string; module: string; status: string; owner: string };

const audits: Audit[] = [
  { id: "AUD-001", module: "Job Verification", status: "Healthy", owner: "Operations" },
  { id: "AUD-002", module: "User Growth", status: "Monitoring", owner: "Growth" },
  { id: "AUD-003", module: "Recommendation Engine", status: "Healthy", owner: "Data" },
];

export default function AdminPage() {
  return (
    <DashboardLayout title="Admin Overview">
      <div className="mb-6 grid gap-5 md:grid-cols-4">
        <MetricCard label="Users" value="18.2K" trend="+12%" icon={<Users size={20} />} />
        <MetricCard label="Jobs" value="4.8K" trend="+7%" icon={<Briefcase size={20} />} />
        <MetricCard label="Matches" value="92%" trend="+5%" icon={<BarChart3 size={20} />} />
        <MetricCard label="System" value="99.9%" trend="Stable" icon={<ShieldCheck size={20} />} />
      </div>
      <Card className="p-5">
        <h2 className="mb-4 text-xl font-extrabold text-dark">Platform Health</h2>
        <Table<Audit>
          data={audits}
          columns={[
            { header: "ID", render: (item) => item.id },
            { header: "Module", render: (item) => <span className="font-bold">{item.module}</span> },
            { header: "Status", render: (item) => item.status },
            { header: "Owner", render: (item) => item.owner },
          ]}
        />
      </Card>
    </DashboardLayout>
  );
}
