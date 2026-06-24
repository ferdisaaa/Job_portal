import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { RecommendationCard } from "../../components/recommendation/RecommendationCard";
import { Card } from "../../components/ui/Card";
import { Table } from "../../components/ui/Table";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { recommendationService } from "../../services/recommendation.service";
import type { Recommendation } from "../../types";

export default function RecommendationPage() {
  const { data = [] } = useQuery({ queryKey: ["recommendations"], queryFn: recommendationService.list });
  const { data: summary } = useQuery({ queryKey: ["recommendation-summary"], queryFn: recommendationService.summary });

  return (
    <DashboardLayout title="AI Job Recommendation">
      <div className="mb-6 grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="p-6 text-center">
          <Sparkles className="mx-auto text-primary" size={30} />
          <p className="mt-4 text-sm font-bold text-muted">Match Score</p>
          <p className="mt-2 text-6xl font-extrabold text-dark">{summary?.matchScore ?? 95}%</p>
          <p className="mt-3 text-sm text-muted">Top role: {summary?.topRole ?? "Frontend Developer"}</p>
        </Card>
        <Table<Recommendation>
          data={data.slice(0, 5)}
          columns={[
            { header: "Ranking", render: (item) => `#${item.ranking}` },
            { header: "Posisi", render: (item) => <span className="font-bold">{item.job.position}</span> },
            { header: "Perusahaan", render: (item) => item.job.company },
            { header: "Skor", render: (item) => <span className="font-extrabold text-primary">{item.score}%</span> },
          ]}
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.slice(0, 3).map((item) => (
          <RecommendationCard key={item.job.id} item={item} />
        ))}
      </div>
    </DashboardLayout>
  );
}
