/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        blue: '#52AFFD',
        yellow: '#fba003',
        green: '#0fbb82',
        red: '#DC3545',
        gray: 'D9D9D9'
      }
    },
  },
  plugins: [],
}

