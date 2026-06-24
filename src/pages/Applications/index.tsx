import { useQuery } from "@tanstack/react-query";
import type { Application, ApplicationStatus } from "../../types";
import { Badge } from "../../components/ui/Badge";
import { Table } from "../../components/ui/Table";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { applicationService } from "../../services/application.service";

const tone: Record<ApplicationStatus, "blue" | "green" | "yellow" | "red" | "gray"> = {
  Pending: "yellow",
  Reviewed: "blue",
  Interview: "blue",
  Accepted: "green",
  Rejected: "red",
};

export default function ApplicationsPage() {
  const { data = [] } = useQuery({ queryKey: ["applications"], queryFn: applicationService.list });
  return (
    <DashboardLayout title="Applications">
      <Table<Application>
        data={data}
        columns={[
          { header: "Posisi", render: (item) => <span className="font-bold">{item.position}</span> },
          { header: "Perusahaan", render: (item) => item.company },
          { header: "Tanggal", render: (item) => item.date },
          { header: "Status", render: (item) => <Badge tone={tone[item.status]}>{item.status}</Badge> },
        ]}
      />
    </DashboardLayout>
  );
}
