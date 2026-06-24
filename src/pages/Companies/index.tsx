import { Building2, MapPin, Search, Star, Users } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { companies } from "../../services/mockData";

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="container-pad py-8">
        <section className="mb-8 rounded-[24px] border border-border bg-white p-6 shadow-card lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Badge tone="blue">Company Directory</Badge>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-dark">Temukan perusahaan terbaik untuk langkah karier berikutnya.</h1>
              <p className="mt-4 max-w-2xl leading-7 text-muted">
                Jelajahi company profile, industri, rating, dan jumlah lowongan aktif tanpa bercampur dengan halaman pencarian pekerjaan.
              </p>
            </div>
            <div className="rounded-xl2 border border-border bg-canvas p-4">
              <label className="flex h-12 items-center gap-3 rounded-xl border border-border bg-white px-4">
                <Search size={18} className="text-muted" />
                <input className="w-full bg-transparent text-sm outline-none" placeholder="Cari nama perusahaan atau industri" />
              </label>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm outline-none">
                  <option>Semua Industri</option>
                  <option>Technology</option>
                  <option>Fintech</option>
                  <option>HR Technology</option>
                </select>
                <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm outline-none">
                  <option>Sort: Rating</option>
                  <option>Open Jobs</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {companies.map((company) => (
            <Card key={company.id} className="p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-xl2 bg-slate-950 text-lg font-extrabold text-white">{company.logo}</div>
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
                  <Star size={15} fill="currentColor" /> {company.rating}
                </div>
              </div>
              <h2 className="text-xl font-extrabold text-dark">{company.name}</h2>
              <p className="mt-1 text-sm font-semibold text-primary">{company.industry}</p>
              <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-6 text-muted">{company.description}</p>
              <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm font-semibold text-muted">
                <p className="flex items-center gap-2">
                  <MapPin size={16} /> {company.location}
                </p>
                <p className="flex items-center gap-2">
                  <Users size={16} /> {company.employees} employees
                </p>
                <p className="flex items-center gap-2">
                  <Building2 size={16} /> {company.openJobs} lowongan aktif
                </p>
              </div>
              <Button className="mt-5 w-full" variant="secondary">
                Lihat Perusahaan
              </Button>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
