/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0a0a',
          card: '#1a1a1a',
          accent: '#e63946',
          muted: '#a3a3a3'
        }
      }
    },
  },
  plugins: [],
}
