import { BarChart3, CheckCircle2, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <section className="container-pad py-12">
          <div className="rounded-[24px] border border-border bg-white p-8 shadow-card lg:p-12">
            <Badge tone="blue">About CareerMatch</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-dark lg:text-5xl">
              Sistem pendukung keputusan untuk pencarian kerja yang lebih presisi.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              CareerMatch memisahkan pencarian lowongan, eksplorasi perusahaan, dan rekomendasi karier agar kandidat bisa mengambil keputusan dengan konteks yang lengkap.
            </p>
          </div>
        </section>

        <section className="container-pad grid gap-5 pb-12 md:grid-cols-3">
          {[
            ["Smart Ranking", "Setiap lowongan diberi skor berdasarkan skill, pengalaman, preferensi kerja, dan range gaji.", Sparkles],
            ["Professional Portal", "Desain dibuat untuk workflow pencarian kerja yang serius, cepat dipindai, dan responsif.", Target],
            ["Trusted Workflow", "Recruiter dapat mengelola lowongan dan kandidat melalui interface yang jelas.", ShieldCheck],
          ].map(([title, body, Icon]) => (
            <Card key={String(title)} className="p-6">
              {typeof Icon !== "string" && (
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-primary">
                  <Icon size={22} />
                </span>
              )}
              <h2 className="text-xl font-extrabold text-dark">{String(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{String(body)}</p>
            </Card>
          ))}
        </section>

        <section className="bg-white py-12">
          <div className="container-pad grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-dark">Kenapa CareerMatch berbeda?</h2>
              <p className="mt-4 leading-7 text-muted">
                Portal ini tidak hanya menampilkan daftar pekerjaan. CareerMatch membantu kandidat memahami kecocokan, membandingkan perusahaan, dan melacak lamaran dalam satu pengalaman yang rapi.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["12K+", "lowongan aktif", BarChart3],
                ["850+", "perusahaan partner", Users],
                ["95%", "top match score", Sparkles],
                ["4 langkah", "workflow lamaran", CheckCircle2],
              ].map(([value, label, Icon]) => (
                <div key={String(label)} className="rounded-xl2 border border-border p-5">
                  {typeof Icon !== "string" && <Icon className="mb-4 text-primary" size={22} />}
                  <p className="text-3xl font-extrabold text-dark">{String(value)}</p>
                  <p className="mt-1 text-sm font-semibold text-muted">{String(label)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
