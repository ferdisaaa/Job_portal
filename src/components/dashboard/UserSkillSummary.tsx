import { Card } from "../ui/Card";

// Interface untuk tipe data skill agar type-safe
interface SkillItem {
  name: string;
  level: "Expert" | "Advanced" | "Intermediate";
  score: number; // Nilai bobot untuk perhitungan SPK (0 - 100)
}

// Mock data kriteria skill user (Bisa kamu ganti dengan data dari API/State nantinya)
const userSkills: SkillItem[] = [
  { name: "React / TypeScript", level: "Expert", score: 95 },
  { name: "Tailwind CSS", level: "Expert", score: 90 },
  { name: "Node.js & MySQL", level: "Advanced", score: 85 },
  { name: "Data Analysis (Python)", level: "Intermediate", score: 70 },
];

export function UserSkillSummary() {
  // Fungsi helper untuk menentukan warna badge berdasarkan level keahlian
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "Advanced":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-amber-50 text-amber-600 border-amber-100";
    }
  };

  return (
    <Card className="p-6 bg-white border border-slate-100 shadow-sm h-full flex flex-col justify-between">
      <div>
        {/* Header Komponen */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-bold text-slate-800">Kriteria & Skill Anda</h3>
            <p className="text-xs text-slate-400">Bobot kompetensi utama untuk kalkulasi AI</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            Edit Kriteria
          </button>
        </div>

        {/* Daftar Skill / Kriteria */}
        <div className="space-y-4">
          {userSkills.map((skill, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{skill.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getLevelColor(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>
                <span className="font-bold text-slate-600">{skill.score}%</span>
              </div>
              
              {/* Progress Bar Bobot SPK */}
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Tambahan di Bagian Bawah */}
      <div className="mt-6 pt-4 border-t border-slate-50 text-center">
        <p className="text-xs text-slate-400">
          💡 <span className="font-medium text-slate-500">Tips:</span> Perbarui core skill kamu secara berkala untuk meningkatkan akurasi persentase *Match* pada sistem.
        </p>
      </div>
    </Card>
  );
}