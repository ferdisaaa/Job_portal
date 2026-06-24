import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

export type SidebarItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export function Sidebar({ items }: { items: SidebarItem[] }) {
  return (
    <aside className="sticky top-6 h-fit rounded-xl2 border border-border bg-white p-4 shadow-card">
      <div className="mb-6 flex items-center gap-3 px-2">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
          <BriefcaseBusiness size={20} />
        </span>
        <div>
          <p className="font-extrabold text-dark">CareerMatch</p>
          <p className="text-xs font-medium text-muted">Workspace</p>
        </div>
      </div>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-primary" : "text-muted hover:bg-slate-50 hover:text-dark"}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
