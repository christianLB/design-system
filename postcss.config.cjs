module.exports = {
  plugins: [
    require('@tailwindcss/postcss')({
      // Explicitly point to the Tailwind config
      config: './tailwind.config.js',
    }),
  ],
};
