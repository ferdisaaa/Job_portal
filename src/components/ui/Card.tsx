import type { HTMLAttributes } from "react";
import { cn } from "../../utils/format";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl2 border border-border bg-white shadow-card", className)} {...props} />;
}
