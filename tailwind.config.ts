import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          chocolate: "#4A2511",
          gold: "#E8B520",
          cream: "#FBF6EE",
          blush: "#F4DCD6",
          dark: "#2A1409",
          muted: "#7A6458",
          sand: "#F5ECE1",
          goldLight: "#F7DF94",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(74, 37, 17, 0.08)",
        "soft-lg": "0 20px 40px -15px rgba(74, 37, 17, 0.12)",
        gold: "0 8px 24px -4px rgba(232, 181, 32, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
