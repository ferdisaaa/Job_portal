import type { ReactNode } from "react";
import { Card } from "../ui/Card";

export function MetricCard({ label, value, trend, icon }: { label: string; value: string; trend: string; icon: ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-muted">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-primary">{icon}</span>
      </div>
      <p className="text-3xl font-extrabold text-dark">{value}</p>
      <p className="mt-2 text-sm font-semibold text-success">{trend}</p>
    </Card>
  );
}
