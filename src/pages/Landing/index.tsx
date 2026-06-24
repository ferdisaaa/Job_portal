import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BarChart3, BriefcaseBusiness, CheckCircle2, Sparkles, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/layout/Navbar";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <section className="container-pad grid min-h-[calc(100vh-80px)] items-center gap-12 py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial="hidden" animate="show" variants={fade} transition={{ duration: 0.6 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Sparkles size={16} /> Smart decision support for careers
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-dark sm:text-5xl lg:text-6xl">
            Temukan Karier yang Sesuai Dengan Potensimu
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Platform pencarian kerja berbasis sistem pendukung keputusan yang membantu menemukan pekerjaan terbaik berdasarkan skill dan pengalaman.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/jobs">
              <Button size="lg" icon={<BriefcaseBusiness size={20} />}>
                Cari Pekerjaan
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Mulai Sekarang <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="relative">
          <div className="rounded-[24px] border border-border bg-white p-4 shadow-soft">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-white">
                  <BriefcaseBusiness size={21} />
                </span>
                <div>
                  <p className="font-extrabold text-dark">CareerMatch AI</p>
                  <p className="text-sm text-muted">Recommendation dashboard</p>
                </div>
              </div>
              <Button size="sm">95% Match</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div className="rounded-xl2 border border-border p-4">
                {["Remote", "Full-time", "Mid Level", "Rp 8jt+"].map((item) => (
                  <div key={item} className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted">
                    <CheckCircle2 size={16} className="text-primary" /> {item}
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Frontend Developer", "Product Designer", "Data Analyst", "Mobile Developer"].map((item, index) => (
                  <div key={item} className="rounded-xl2 border border-border bg-white p-4">
                    <div className="mb-4 h-10 w-10 rounded-xl bg-slate-950" />
                    <h3 className="font-extrabold text-dark">{item}</h3>
                    <p className="mt-1 text-sm text-muted">PT Digital Indonesia</p>
                    <div className="mt-4 rounded-xl bg-blue-50 py-2 text-center text-sm font-bold text-primary">AI Match: {95 - index * 4}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="container-pad grid gap-4 py-10 md:grid-cols-4">
        {[
          ["12K+", "Lowongan aktif"],
          ["96%", "Akurasi rekomendasi"],
          ["4.8/5", "Rating kandidat"],
          ["850+", "Perusahaan partner"],
        ].map(([value, label]) => (
          <Card key={label} className="p-6 text-center">
            <p className="text-3xl font-extrabold text-dark">{value}</p>
            <p className="mt-2 text-sm font-semibold text-muted">{label}</p>
          </Card>
        ))}
      </section>
      <section className="container-pad py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-extrabold text-dark">Cara Kerja</h2>
          <p className="mt-3 text-muted">Profil, preferensi, dan data lowongan diranking agar keputusan melamar lebih cepat dan akurat.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Lengkapi Profil", Users],
            ["Analisis Match", BarChart3],
            ["Lamar Cepat", BadgeCheck],
          ].map(([title, Icon], index) => (
            <Card key={String(title)} className="p-6">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-primary">{typeof Icon !== "string" && <Icon size={22} />}</div>
              <p className="text-sm font-bold text-primary">Step {index + 1}</p>
              <h3 className="mt-2 text-xl font-extrabold text-dark">{String(title)}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">CareerMatch membantu kamu membaca peluang tanpa kehilangan konteks penting dari setiap lowongan.</p>
            </Card>
          ))}
        </div>
      </section>
      <section id="features" className="bg-white py-16">
        <div className="container-pad grid gap-5 md:grid-cols-3">
          {["Smart Match Score", "Job Portal Premium", "Recruiter Workflow"].map((title) => (
            <Card key={title} className="p-6">
              <Star className="mb-4 text-primary" size={24} />
              <h3 className="text-xl font-extrabold text-dark">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">Didesain clean, profesional, dan siap dikembangkan menjadi produk rekrutmen end-to-end.</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="container-pad py-16">
        <Card className="p-8">
          <p className="text-lg leading-8 text-muted">"CareerMatch membuat proses mencari kerja terasa jauh lebih terarah. Match score-nya membantu saya memilih prioritas lamaran."</p>
          <p className="mt-5 font-extrabold text-dark">Nadia Putri, Frontend Developer</p>
        </Card>
      </section>
      <footer className="border-t border-border bg-white py-8">
        <div className="container-pad flex flex-col justify-between gap-3 text-sm font-semibold text-muted md:flex-row">
          <span>CareerMatch</span>
          <span>© 2026 CareerMatch. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
