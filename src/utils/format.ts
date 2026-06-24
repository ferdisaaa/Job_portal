export const currency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const shortSalary = (min: number, max: number) =>
  `Rp ${Math.round(min / 1_000_000)}jt - Rp ${Math.round(max / 1_000_000)}jt`;

export const cn = (...classes: Array<string | false | undefined | null>) => classes.filter(Boolean).join(" ");
