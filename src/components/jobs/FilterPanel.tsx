import { Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

const groups = [
  { title: "Job Type", options: ["Full-time", "Part-time", "Freelance", "Contract", "Internship"] },
  { title: "Experience", options: ["Entry Level", "Mid Level", "Senior Level", "Lead / Manager"] },
  { title: "Work Type", options: ["Remote", "Hybrid", "On-site"] },
  { title: "Salary", options: ["Rp 5jt+", "Rp 10jt+", "Rp 15jt+", "Rp 25jt+"] },
];

export function FilterPanel() {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-border p-5">
        <h3 className="font-bold text-dark">Filter</h3>
        <button className="text-sm font-semibold text-red-500">Clear filter</button>
      </div>
      <div className="divide-y divide-border">
        {groups.map((group) => (
          <div key={group.title} className="p-5">
            <h4 className="mb-4 font-bold text-dark">{group.title}</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {group.options.map((option, index) => (
                <label key={option} className="flex items-center gap-2 text-sm font-medium text-muted">
                  <input defaultChecked={index === 0} type="checkbox" className="h-4 w-4 rounded border-border accent-primary" />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-5">
        <div className="mb-3 flex items-center gap-2 font-bold text-dark">
          <Sparkles size={18} className="text-primary" />
          Use AI smart match
        </div>
        <p className="mb-4 text-sm leading-6 text-muted">Biarkan sistem merekomendasikan pekerjaan berdasarkan skill dan pengalamanmu.</p>
        <Button className="w-full">Match me</Button>
      </div>
    </Card>
  );
}
