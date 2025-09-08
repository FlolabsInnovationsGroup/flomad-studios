import type { Config } from "tailwindcss";

const config: Config = {
  // Use "class" strategy for toggling dark mode
  darkMode: "class",
  // Define the files Tailwind should scan for class names
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Enhanced color palette with glassmorphism support
      colors: {
        background: {
          DEFAULT: "#0a0a0a", // Rich dark background
          light: "#ffffff",   // Clean light background  
          surface: "#111111", // Slightly lighter surface
        },
        foreground: {
          DEFAULT: "#f0f0f0", // Crisp white text
          dark: "#1a1a1a",    // Rich dark text
          muted: "#888888",   // Muted text
        },
        // Flomad brand colors - More unique and memorable
        primary: {
          DEFAULT: "#6366f1", // Modern indigo
          light: "#818cf8",   // Lighter indigo
          dark: "#4338ca",    // Deeper indigo
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#5b21b6",
          900: "#312e81",
        },
        secondary: {
          DEFAULT: "#06b6d4", // Vibrant cyan
          light: "#22d3ee",   // Lighter cyan
          dark: "#0891b2",    // Deeper cyan
          50: "#ecfeff",
          100: "#cffafe",
          500: "#06b6d4",
          600: "#0891b2",
          900: "#164e63",
        },
        accent: {
          DEFAULT: "#f59e0b", // Warm amber
          light: "#fbbf24",   // Lighter amber
          dark: "#d97706",    // Deeper amber
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          900: "#92400e",
        },
        // Glassmorphism colors for modern effects
        glass: {
          white: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.1)",
          primary: "rgba(99, 102, 241, 0.1)",
          secondary: "rgba(6, 182, 212, 0.1)",
          accent: "rgba(245, 158, 11, 0.1)",
        },
        // Neutral colors for better contrast
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        // Border colors with transparency
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)", // Glass border in dark mode
          light: "rgba(0, 0, 0, 0.1)",         // Glass border in light mode
        },
      },
      // Enhanced gradient backgrounds with glassmorphism
      backgroundImage: {
        "gradient-border": "linear-gradient(90deg, #f59e0b, #6366f1)",
        "gradient-primary": "linear-gradient(135deg, #6366f1, #06b6d4)",
        "gradient-secondary": "linear-gradient(135deg, #06b6d4, #10b981)",
        "gradient-accent": "linear-gradient(135deg, #f59e0b, #ef4444)",
        "gradient-hero": "linear-gradient(135deg, #6366f1, #f59e0b, #06b6d4)",
        "gradient-card": "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 100%)",
        // Glassmorphism gradients
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "glass-primary": "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))",
        "glass-secondary": "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.05))",
      },
      // Enhanced fonts
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        mono: ["Menlo", "Monaco", "Consolas", "monospace"],
      },
      // Enhanced animations with glassmorphism
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(99, 102, 241, 0.6)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      // Extended spacing utilities
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      // Extended border radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      // Enhanced box shadows with glassmorphism
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)',
        'glow': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-accent': '0 0 15px rgba(245, 158, 11, 0.5)',
        'glow-secondary': '0 0 15px rgba(6, 182, 212, 0.5)',
        'inner-glow': 'inset 0 0 15px rgba(99, 102, 241, 0.2)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.2)',
        'strong': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      // Backdrop blur utilities for glassmorphism
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      // Extended breakpoints for responsiveness
      screens: {
        "2xl": "1440px", // Extra-wide screens
      },
    },
  },
  // Add useful plugins
  plugins: [
    require("@tailwindcss/typography"), // Adds better text utilities
  ],
};

export default config;