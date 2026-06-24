import type { ReactNode } from "react";
import { Bell, Bookmark, Briefcase, LayoutDashboard, Sparkles, User, Users, BarChart3, FileText } from "lucide-react";
import { Sidebar, type SidebarItem } from "../components/layout/Sidebar";
import { Button } from "../components/ui/Button";

const seekerItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Jobs", href: "/jobs", icon: <Briefcase size={18} /> },
  { label: "Applications", href: "/applications", icon: <FileText size={18} /> },
  { label: "Bookmarks", href: "/bookmarks", icon: <Bookmark size={18} /> },
  { label: "Recommendation", href: "/recommendation", icon: <Sparkles size={18} /> },
  { label: "Profile", href: "/profile", icon: <User size={18} /> },
];

const recruiterItems: SidebarItem[] = [
  { label: "Dashboard", href: "/recruiter", icon: <LayoutDashboard size={18} /> },
  { label: "Manage Jobs", href: "/recruiter/jobs", icon: <Briefcase size={18} /> },
  { label: "Applicants", href: "/recruiter/applicants", icon: <Users size={18} /> },
  { label: "Statistics", href: "/recruiter/statistics", icon: <BarChart3 size={18} /> },
];

export function DashboardLayout({ children, mode = "seeker", title }: { children: ReactNode; mode?: "seeker" | "recruiter"; title: string }) {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="container-pad grid gap-6 py-6 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <Sidebar items={mode === "recruiter" ? recruiterItems : seekerItems} />
        </div>
        <main>
          <div className="mb-6 flex items-center justify-between rounded-xl2 border border-border bg-white p-4 shadow-card">
            <div>
              <p className="text-sm font-semibold text-muted">CareerMatch Workspace</p>
              <h1 className="text-2xl font-extrabold text-dark">{title}</h1>
            </div>
            <Button variant="secondary" size="icon" aria-label="Notification" icon={<Bell size={18} />} />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
