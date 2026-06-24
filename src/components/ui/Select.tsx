import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/format";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string }>;
};

export function Select({ label, error, options, className, ...props }: SelectProps) {
  return (
    <label className="block">
      {label && <span className="mb-2 block text-sm font-semibold text-dark">{label}</span>}
      <select
        className={cn(
          "h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-blue-100",
          error && "border-red-400 focus:border-red-500 focus:ring-red-100",
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
