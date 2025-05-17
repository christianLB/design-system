/** @type {import('tailwindcss').Config} */
const { tokens } = require('./tokens');

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
    './app/**/*.{ts,tsx}',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      transitionProperty: tokens.transition,
      fontSize: tokens.typography.fontSize,
      lineHeight: tokens.typography.lineHeight,
      fontFamily: tokens.typography.fontFamily,
    },
  },
  plugins: [],
};