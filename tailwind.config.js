/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    screens: {
      'xs': '475px',
      'epx':'800px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}