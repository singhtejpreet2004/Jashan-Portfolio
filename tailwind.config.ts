import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#0a0a0a",
          secondary: "#111827",
          tertiary: "#0f172a",
        },
        light: {
          bg: "#fafafa",
        },
        card: "#1e293b",
        accent: {
          teal: "#2dd4bf",
          indigo: "#818cf8",
          amber: "#f59e0b",
          pink: "#f472b6",
          emerald: "#34d399",
          blue: "#60a5fa",
        },
      },
      fontFamily: {
        heading: ["var(--font-inter)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
