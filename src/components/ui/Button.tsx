import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/format";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: ReactNode;
};

export function Button({ children, className, variant = "primary", size = "md", icon, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-primary text-white shadow-sm hover:bg-blue-700",
    secondary: "border border-border bg-white text-dark hover:bg-slate-50",
    ghost: "bg-transparent text-dark hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10 p-0",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
