// tailwind.preset.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'selector'
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        body: 'var(--font-family-body)',
        heading: 'var(--font-family-heading)',
        mono: 'var(--font-family-mono)',
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
    // require('@tailwindcss/forms'),
  ],
};
