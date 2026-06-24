import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/format";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold text-dark">{label}</span>}
      <input
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-dark outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-blue-100",
          error && "border-red-400 focus:border-red-500 focus:ring-red-100",
          className,
        )}
        {...props}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
