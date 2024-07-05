
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
        auth_grey: '#D8D8F6',
        primary: {
          light: '#ffffff',
          DEFAULT: '#ffffff', //white
          //'#1B172A',// purple
          dark: '#281A34',// purple
        },
        secondary: {
          light: '#EEEEEE',
          DEFAULT: '#EEEEEE', 
          dark: '#31213C', // raisin black #201F30
        },
        tertiary: {
          light: '#836EEE',
          DEFAULT: '#836EEE', // 
          dark: '#836EEE',
        }
    },
  },
  plugins: [],
}
}
export default config;
