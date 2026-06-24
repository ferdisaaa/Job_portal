import { Briefcase, MapPin, Search, SlidersHorizontal, Wallet } from "lucide-react";
import { Button } from "../ui/Button";

export function SearchBar() {
  return (
    <div className="rounded-xl2 border border-border bg-white p-4 shadow-card">
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4">
          <Search size={18} className="text-muted" />
          <input className="w-full outline-none" placeholder="Keyword, role, company" defaultValue="Frontend Developer" />
        </label>
        <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4">
          <MapPin size={18} className="text-muted" />
          <input className="w-full outline-none" placeholder="Location" defaultValue="Anywhere" />
        </label>
        <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4">
          <Wallet size={18} className="text-muted" />
          <select className="w-full bg-transparent outline-none" defaultValue="8-15">
            <option value="8-15">Rp 8jt - 15jt</option>
            <option value="15-25">Rp 15jt - 25jt</option>
            <option value="25+">Rp 25jt+</option>
          </select>
        </label>
        <label className="flex h-12 items-center gap-3 rounded-xl border border-border px-4">
          <SlidersHorizontal size={18} className="text-muted" />
          <select className="w-full bg-transparent outline-none" defaultValue="latest">
            <option value="latest">Sort: Latest</option>
            <option value="match">Best Match</option>
            <option value="salary">Highest Salary</option>
          </select>
        </label>
        <Button className="h-12" icon={<Briefcase size={18} />}>
          Search
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-dark">Popular searches:</span>
        {["Product Designer", "Full-Stack Developer", "AI Engineer"].map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
