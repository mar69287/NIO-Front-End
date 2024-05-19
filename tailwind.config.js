/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: '#6338F1',
        primary2: '#FD3995',
        secondary: '#1DC987',
        accent1: '#7AD629',
        accent2: '#0057FD',
        accent3: '#F9123A',
      },
    },
  },
  plugins: [],
}

