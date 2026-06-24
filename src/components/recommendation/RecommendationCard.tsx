import { Sparkles } from "lucide-react";
import type { Recommendation } from "../../types";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-muted">{item.job.company}</p>
          <h3 className="text-xl font-extrabold text-dark">{item.job.position}</h3>
        </div>
        <div className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-extrabold text-primary">Match: {item.score}%</div>
      </div>
      <p className="mb-5 text-sm leading-6 text-muted">{item.reason}</p>
      <Button className="w-full" icon={<Sparkles size={18} />}>
        Lamar Sekarang
      </Button>
    </Card>
  );
}
