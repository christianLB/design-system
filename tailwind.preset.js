// tailwind.preset.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'selector'
  theme: {
    extend: {
      // Extend Tailwind's default theme here
      // colors: { primary: '#...' },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
    // require('@tailwindcss/forms'),
  ],
};
