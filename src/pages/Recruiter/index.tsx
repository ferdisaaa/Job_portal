import { Briefcase, CheckCircle, FileText, XCircle } from "lucide-react";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Table } from "../../components/ui/Table";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { applications } from "../../services/mockData";
import type { Application } from "../../types";

export default function RecruiterDashboardPage() {
  return (
    <DashboardLayout title="Recruiter Dashboard" mode="recruiter">
      <div className="mb-6 grid gap-5 md:grid-cols-4">
        <MetricCard label="Total Jobs" value="24" trend="+4 bulan ini" icon={<Briefcase size={20} />} />
        <MetricCard label="Applicants" value="312" trend="+18%" icon={<FileText size={20} />} />
        <MetricCard label="Accepted" value="42" trend="+8 kandidat" icon={<CheckCircle size={20} />} />
        <MetricCard label="Rejected" value="73" trend="-3%" icon={<XCircle size={20} />} />
      </div>
      <Table<Application>
        data={applications}
        columns={[
          { header: "Applicant Role", render: (item) => <span className="font-bold">{item.position}</span> },
          { header: "Company", render: (item) => item.company },
          { header: "Date", render: (item) => item.date },
          { header: "Status", render: (item) => item.status },
        ]}
      />
    </DashboardLayout>
  );
}
