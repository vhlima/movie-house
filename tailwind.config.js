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
        background: '#121212',
        surface: '#121212',
        complementary: '#000',
        primary: '#BB86FC',
        primaryVariant: '#3700B3',
        secondary: '#cfcfcf',
        secondaryVariant: '#a8a8a8',
        complementaryVariant: '#1e1e1e',
        complementary2: '#373737',
        complementary3: '#222222',
        complementary4: '#545354',
        complementary5: '#848484',
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
