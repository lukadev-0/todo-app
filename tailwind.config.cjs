const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},

    colors: {
      gray: colors.zinc,
      primary: colors.teal,
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      danger: colors.red,
      success: colors.green,
    },
  },
  plugins: [],
}
