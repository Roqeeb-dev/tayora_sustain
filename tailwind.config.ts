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
        brown: {
          DEFAULT: "#240A00",
          deep: "#1A0700",
          mid: "#6B2E1A",
          warm: "#A0522D",
        },
        plaster: {
          DEFAULT: "#D3BAB0",
          muted: "#B0948A",
        },
        beige: {
          DEFAULT: "#F5EFEA",
          soft: "#F9F6F3",
          hover: "#EDE4DE",
        },

        brand: {
          primary: "#240A00",
          secondary: "#6B2E1A",
          accent: "#A0522D",
        },
        surface: {
          base: "#F5EFEA",
          card: "#FFFFFF",
          subtle: "#F9F6F3",
          hover: "#EDE4DE",
          border: "#D3BAB0",
        },
        content: {
          primary: "#240A00",
          secondary: "#333333",
          muted: "#B0948A",
          inverse: "#FFFFFF",
        },

        status: {
          pending: "#C8860A",
          approved: "#2D6A4F",
          matched: "#2C5F8A",
          collected: "#240A00",
          delivered: "#5C3D7A",
          rejected: "#9B2335",
        },
      },

      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },

      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },

      boxShadow: {
        card: "0 2px 8px rgba(36, 10, 0, 0.06)",
        "card-hover": "0 6px 20px rgba(36, 10, 0, 0.12)",
        modal: "0 16px 48px rgba(36, 10, 0, 0.18)",
        nav: "0 1px 0 #D3BAB0",
      },

      backgroundImage: {
        "overlay-dark":
          "linear-gradient(to bottom, rgba(36,10,0,0.55), rgba(36,10,0,0.75))",
        "overlay-medium":
          "linear-gradient(to bottom, rgba(36,10,0,0.25), rgba(36,10,0,0.55))",
        "overlay-subtle":
          "linear-gradient(to bottom, rgba(36,10,0,0.05), rgba(36,10,0,0.30))",
        "overlay-side":
          "linear-gradient(to right,  rgba(36,10,0,0.70), rgba(36,10,0,0.40))",
        "overlay-fade":
          "linear-gradient(to bottom, transparent 40%, rgba(36,10,0,0.80))",
      },
    },
  },
  plugins: [],
};

export default config;
