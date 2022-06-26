/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin') /* eslint-disable-line */

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
        movieHouse: {
          light: '#996DFF',
          mid: '#8257E5',
          dark: '#633BBC',
        },
        error: {
          light: '#FC4737',
          mid: '#D73628',
          dark: '#AD1E12',
          low: '#42110D',
        },
        success: {
          light: '#04D361',
          base: '#1B873F',
          low: '#051B0D',
        },
        danger: {
          light: '#F75A68',
          base: '#CC2937',
          low: '#2D090C',
        },
        warning: {
          light: '#FBA94C',
          base: '#EB8A1D',
          low: '#2E1B06',
        },
        grey: {
          /* Text Title */
          100: '#E1E1E6',
          /* Text Base */
          200: '#C4C4CC',
          /* Text Support */
          300: '#8D8D99',
          /* Placeholder */
          400: '#7C7C8A',
          /* Input Icons */
          500: '#505059',
          /* Shape Tertiary */
          600: '#323238',
          /* Shape Secondary */
          700: '#29292E',
          /* Shape Primary */
          800: '#202024',
          /* Background */
          900: '#121214',
          950: '#09090A',
        },
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.no-scroll': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
