import { BriefcaseBusiness, Menu, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/Button";

const nav = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur">
      <div className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white">
            <BriefcaseBusiness size={22} />
          </span>
          <span className="text-xl font-extrabold text-dark">CareerMatch</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <NavLink key={item.label} to={item.href} className={({ isActive }) => `text-sm font-semibold ${isActive ? "text-primary" : "text-muted hover:text-dark"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" size="icon" aria-label="Search">
            <Search size={18} />
          </Button>
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
        <Button className="md:hidden" variant="secondary" size="icon" aria-label="Menu" icon={<Menu size={20} />} />
      </div>
    </header>
  );
}
