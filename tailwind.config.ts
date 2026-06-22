// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {

    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        arizona: ["var(--font-marcellus)", "serif"],
      },
    },
  },

  plugins: [],
};

export default config;