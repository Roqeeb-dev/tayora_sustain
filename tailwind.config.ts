import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        "background-subtle": "var(--color-background-subtle)",

        foreground: "var(--color-foreground)",
        "foreground-muted": "var(--color-foreground-muted)",

        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-foreground": "var(--color-primary-foreground)",

        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-foreground": "var(--color-accent-foreground)",

        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        "secondary-foreground": "var(--color-secondary-foreground)",

        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",

        card: "var(--color-card)",
        "card-raised": "var(--color-card-raised)",
        "card-foreground": "var(--color-card-foreground)",

        success: "var(--color-success)",
        "success-foreground": "var(--color-success-foreground)",
        warning: "var(--color-warning)",
        "warning-foreground": "var(--color-warning-foreground)",
        destructive: "var(--color-destructive)",
        "destructive-foreground": "var(--color-destructive-foreground)",

        border: "var(--color-border)",
        "border-subtle": "var(--color-border-subtle)",

        input: "var(--color-input)",
        "input-focus": "var(--color-input-focus)",

        ring: "var(--color-ring)",

        "status-pending": "var(--color-status-pending)",
        "status-approved": "var(--color-status-approved)",
        "status-matched": "var(--color-status-matched)",
        "status-collected": "var(--color-status-collected)",
        "status-delivered": "var(--color-status-delivered)",
        "status-rejected": "var(--color-status-rejected)",
      },

      borderColor: {
        DEFAULT: "var(--color-border)",
      },

      ringColor: {
        DEFAULT: "var(--color-ring)",
      },

      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },

      boxShadow: {
        card: "0 2px 8px rgba(36, 10, 0, 0.06)",
        "card-hover": "0 6px 20px rgba(36, 10, 0, 0.12)",
        modal: "0 16px 48px rgba(36, 10, 0, 0.18)",
      },
    },
  },

  plugins: [],
};

export default config;
