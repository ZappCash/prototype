import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00FF88", // Verde brillante
        secondary: "#00CC66", // Verde medio
        dark: {
          950: "#0a0a0a",
          900: "#111111",
          800: "#1a1a1a",
          700: "#252525",
        },
        gray: {
          100: "#FFFFFF",
          200: "#E5E5E5",
          300: "#A0A0A0",
          400: "#808080",
          500: "#666666",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0D2818 0%, #50C878 100%)", // Fondo: verde oscuro a esmeralda
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(180deg, #0D2818 0%, #0a0a0a 100%)", // Hero: verde oscuro a negro
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(0, 255, 136, 0.3)",
        "glow-md": "0 0 20px rgba(0, 255, 136, 0.4)",
        "glow-lg": "0 0 30px rgba(0, 255, 136, 0.5)",
        "glow-xl": "0 0 40px rgba(0, 255, 136, 0.6)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-slower": "float-slower 10s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "orb-1": "orb-float-1 20s ease-in-out infinite",
        "orb-2": "orb-float-2 25s ease-in-out infinite",
        "orb-3": "orb-float-3 30s ease-in-out infinite",
        "orb-4": "orb-float-4 22s ease-in-out infinite",
        "orb-5": "orb-float-5 28s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-30px) translateX(10px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-20px) translateX(30px)" },
          "50%": { transform: "translateY(-40px) translateX(-30px)" },
          "75%": { transform: "translateY(-20px) translateX(20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "orb-float-1": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.35"
          },
          "33%": {
            transform: "translate(100px, -80px) scale(1.1)",
            opacity: "0.45"
          },
          "66%": {
            transform: "translate(-50px, 60px) scale(0.9)",
            opacity: "0.3"
          },
        },
        "orb-float-2": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.3"
          },
          "33%": {
            transform: "translate(-120px, 90px) scale(1.15)",
            opacity: "0.4"
          },
          "66%": {
            transform: "translate(80px, -70px) scale(0.95)",
            opacity: "0.25"
          },
        },
        "orb-float-3": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1) rotate(0deg)",
            opacity: "0.25"
          },
          "50%": {
            transform: "translate(-60px, -100px) scale(1.2) rotate(180deg)",
            opacity: "0.35"
          },
        },
        "orb-float-4": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.2"
          },
          "25%": {
            transform: "translate(70px, 50px) scale(1.1)",
            opacity: "0.3"
          },
          "50%": {
            transform: "translate(-90px, -40px) scale(0.9)",
            opacity: "0.25"
          },
          "75%": {
            transform: "translate(50px, -80px) scale(1.05)",
            opacity: "0.28"
          },
        },
        "orb-float-5": {
          "0%, 100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.25"
          },
          "40%": {
            transform: "translate(-80px, 70px) scale(1.15)",
            opacity: "0.35"
          },
          "80%": {
            transform: "translate(60px, -90px) scale(0.85)",
            opacity: "0.2"
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
