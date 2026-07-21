import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F3F7F3",
        charcoal: "#17241E",
        stone: "#5F7268",
        sand: "#DCE6DE",
        sage: {
          DEFAULT: "#6F9574",
          dark: "#4F6F54",
          light: "#A9C5AD",
          soft: "#EAF2EB",
          mist: "#C5D9C8",
        },
        accent: {
          DEFAULT: "#E07A3D",
          light: "#F2B07A",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        heading: ["Cormorant", "Georgia", "serif"],
      },
      borderRadius: {
        card: "1.75rem",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(23, 36, 30, 0.10)",
        card: "0 12px 32px rgba(23, 36, 30, 0.07)",
        lift: "0 24px 60px rgba(23, 36, 30, 0.14)",
        glow: "0 0 0 1px rgba(111, 149, 116, 0.15), 0 18px 40px rgba(111, 149, 116, 0.18)",
      },
      backgroundImage: {
        "sage-glow":
          "radial-gradient(ellipse at 30% 20%, rgba(169, 197, 173, 0.45), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(79, 111, 84, 0.35), transparent 50%)",
        "forest-mesh":
          "linear-gradient(145deg, #6F9574 0%, #5A8260 45%, #4F6F54 100%)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
