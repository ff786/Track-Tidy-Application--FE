/** @type {import('tailwindcss').Config} */
export default {

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          // ... other shades
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        PrimaryColor: "#14b8a6",
        SecondaryColor: "#0d9488",
        DarkColor: "#0f766e",
        ExtraDarkColor: "#0f766e",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },

  },
  plugins: [],
}

