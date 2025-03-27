/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        PrimaryColor: "#14b8a6",
        SecondaryColor: "#0d9488",
        DarkColor: "#0f766e",
        ExtraDarkColor: "#0f766e",
      },
    },
  },
  plugins: [],
}

