import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0908",
        surface: "#151214",
        surface2: "#1c181a",
        border: "#2c2528",
        red: "#e8384a",
        reddim: "#7a2029",
        redglow: "rgba(232,56,74,.16)",
        text: "#f2ede9",
        textmuted: "#938c89",
        textfaint: "#5c5654",
        amber: "#d9a441",
        green: "#5fae7a",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        num: ["var(--font-num)", "monospace"],
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
