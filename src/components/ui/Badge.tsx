import type { ReactNode } from "react";
import { cn } from "../../utils/format";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "green" | "yellow" | "red" | "gray";
  className?: string;
};

export function Badge({ children, tone = "gray", className }: BadgeProps) {
  const tones = {
    blue: "bg-blue-50 text-primary",
    green: "bg-green-50 text-green-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    gray: "bg-slate-100 text-slate-700",
  };

  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", tones[tone], className)}>{children}</span>;
}
