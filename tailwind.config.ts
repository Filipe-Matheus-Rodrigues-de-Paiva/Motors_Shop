import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        brand: {
          100: "#4529E6",
          200: "#5126EA",
          300: "#B0A6F0",
          400: "#EDEAFD",
        },
        gray: {
          100: "#0B0D0D",
          200: "#212529",
          300: "#495057",
          400: "#868E96",
          500: "#ADB5BD",
          600: "#CED4DA",
          700: "#DEE2E6",
          800: "#E9ECEF",
          900: "#F1F3F5",
          1000: "#F8F9FA",
          1100: "#FDFDFD",
        },
        feedback: {
          alert: "#CD2B31",
          alertLight: "#FDD8D8",
          success: "#18794E",
          successLight: "#CCEBD7",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        "light-100":
          "0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
        "light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
        "dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
        "dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
      },
      backgroundImage: {
        "home-page": "url('/Content.svg')",
        "home-page-tablet": "url('/maserati.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
