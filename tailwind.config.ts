import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        auth_grey: '#e9edc9',
        primary: {
          light: '#240046',
          DEFAULT: '#10002b', //dark blue
          dark: '#10002b',
        },
        secondary: {
          light: '#fb8500',
          DEFAULT: '#f26419', // orange
          dark: '#f26419',
        },
        tertiary: {
          light: '#e9ecef',
          DEFAULT: '#e5e5e5', // grey
          dark: '#e5e5e5',
        }
    },
  },
  plugins: [],
}
}
export default config;
