/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a0a", // Deep dark navy / near black
        secondary: "#171717",
        accent: {
          blue: "#3b82f6",   // Electric blue
          violet: "#8b5cf6", // Violet
          cyan: "#06b6d4",   // Cyan
          purple: "#d946ef", // Soft purple
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1aa", // soft gray
          muted: "#71717a",    // muted gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #3b82f633 0deg, #8b5cf633 180deg, #06b6d433 360deg)',
      },
      // ADDED: Pure CSS Keyframes for GPU-accelerated marquee
      keyframes: {
        'marquee-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        'marquee-left': 'marquee-left 30s linear infinite',
        'marquee-right': 'marquee-right 30s linear infinite',
      }
    },
  },
  plugins: [],
}