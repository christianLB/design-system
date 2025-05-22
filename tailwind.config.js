/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  safelist: [
    'ultra-specific-cascade-test-class', // Added for testing
    // Button base classes (some might be complex for JIT)
    'inline-flex',
    'items-center',
    'justify-center',
    // Example classes from Button variants and sizes
    'bg-background',
    'text-foreground',
    'bg-primary',
    'text-primary-foreground',
    'bg-secondary',
    'text-secondary-foreground',
    'bg-destructive',
    'text-destructive-foreground',
    'border',
    'border-input',
    'hover:bg-accent',
    'hover:text-accent-foreground',
    'text-primary',
    // Sizing
    'h-9',
    'h-10',
    'h-11',
    'px-3',
    'px-4',
    'px-8',
    'py-2',
    'rounded-md',
    'size-9',
    // States
    'disabled:opacity-50',
    'focus-visible:ring-[3px]',
    // Add other commonly used component classes if needed
    {
      pattern: /^(bg-|text-|border-|ring-|hover:bg-|hover:text-)/, // Broadly safelist theme-related classes
    },
  ],
  theme: {
    extend: {
      /*
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      */
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    // require('tailwindcss-animate'),
    // require('tailwindcss-radix'),
  ],
};