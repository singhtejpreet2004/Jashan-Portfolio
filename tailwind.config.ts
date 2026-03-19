import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#030712",
          card: "#0d1117",
          border: "#161b22",
          "border-subtle": "#21262d",
        },
        matrix: {
          green: "#00ff41",
          "green-dim": "#00cc33",
          "green-glow": "rgba(0, 255, 65, 0.15)",
        },
        github: {
          blue: "#58a6ff",
          orange: "#f0883e",
          dark: "#0d1117",
          "dark-secondary": "#161b22",
        },
        text: {
          primary: "#e6edf3",
          secondary: "#8b949e",
          muted: "#484f58",
        },
      },
      fontFamily: {
        display: ['"IBM Plex Mono"', '"Space Mono"', "monospace"],
        mono: ["var(--font-jetbrains)", '"IBM Plex Mono"', "monospace"],
        body: ['"IBM Plex Mono"', "var(--font-inter)", "sans-serif"],
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        typing: "typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite",
        "grid-fade": "grid-fade 4s ease-in-out infinite alternate",
        "branch-grow": "branch-grow 1.5s ease-out forwards",
        "pulse-green": "pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            textShadow: "0 0 4px #00ff41, 0 0 11px #00ff41, 0 0 19px #00ff41",
          },
          "100%": {
            textShadow: "0 0 8px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        "blink-caret": {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#00ff41" },
        },
        "grid-fade": {
          "0%": { opacity: "0.3" },
          "100%": { opacity: "0.8" },
        },
        "branch-grow": {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "100%", opacity: "1" },
        },
        "pulse-green": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(0, 255, 65, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 12px rgba(0, 255, 65, 0)",
          },
        },
      },
      boxShadow: {
        "glow-green": "0 0 15px rgba(0, 255, 65, 0.3), 0 0 30px rgba(0, 255, 65, 0.1)",
        "glow-blue": "0 0 15px rgba(88, 166, 255, 0.3), 0 0 30px rgba(88, 166, 255, 0.1)",
        "glow-orange": "0 0 15px rgba(240, 136, 62, 0.3), 0 0 30px rgba(240, 136, 62, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
