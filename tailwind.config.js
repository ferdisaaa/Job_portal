/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#2563EB",
        dark: "#111827",
        muted: "#6B7280",
        border: "#E5E7EB",
        canvas: "#F8FAFC",
        success: "#22C55E",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(17, 24, 39, 0.08)",
        card: "0 10px 30px rgba(17, 24, 39, 0.06)",
      },
      borderRadius: {
        xl2: "16px",
      },
    },
  },
  plugins: [],
};
