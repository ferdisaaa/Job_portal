import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/Card";

const data = [
  { month: "Jan", matchRate: 72 },
  { month: "Feb", matchRate: 78 },
  { month: "Mar", matchRate: 75 },
  { month: "Apr", matchRate: 85 },
  { month: "Mei", matchRate: 82 },
  { month: "Jun", matchRate: 95 },
];

export function MatchStatusChart() {
  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-800">Analisis Kecocokan AI</h3>
          <p className="text-xs text-slate-400">Rata-rata akurasi kriteria skill kamu dengan kebutuhan pasar</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-1.5 text-xs font-semibold text-slate-600">
          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
          <span>% Match Rate</span>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="matchGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#94a3b8" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ 
                background: "#fff", 
                border: "1px solid #e2e8f0", 
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
              formatter={(value: number) => [`${value}%`, "Kecocokan"]}
            />
            <Area 
              type="monotone" 
              dataKey="matchRate" 
              stroke="#2563eb" 
              strokeWidth={3} 
              fillOpacity={1} 
              fill="url(#matchGlow)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}