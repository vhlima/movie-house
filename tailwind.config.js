/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme'); /* eslint-disable-line */

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        ...defaultTheme.screens,
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        ...defaultTheme.colors,
        background: '#121212',
        surface: '#121212',
        complementary: '#000',
        primary: '#BB86FC',
        primaryVariant: '#3700B3',
        secondary: '#dbdbdb',
        secondaryVariant: '#a8a8a8',
      },
    },
  },
  plugins: [],
};
