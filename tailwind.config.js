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
      colors: {
        border: 'hsl(var(--app-border-color))',
        input: 'hsl(var(--input-border))',
        ring: 'hsl(var(--color-primary))', // Or a specific ring color variable if defined
        background: 'hsl(var(--app-bg))',
        foreground: 'hsl(var(--text-color))',
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          foreground: 'hsl(var(--text-inverse-color))', // Assuming primary buttons use inverse text color
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))',
          foreground: 'hsl(var(--text-inverse-color))', // Assuming secondary buttons use inverse text color
        },
        destructive: {
          DEFAULT: 'hsl(var(--color-destructive))',
          foreground: 'hsl(var(--color-destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--app-content-bg))', // Or a specific muted bg color
          foreground: 'hsl(var(--text-muted-color))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-secondary))', // Example: using secondary as accent
          foreground: 'hsl(var(--text-inverse-color))', // Assuming accent buttons use inverse text color
        },
        popover: {
          DEFAULT: 'hsl(var(--app-content-bg))',
          foreground: 'hsl(var(--text-color))',
        },
        card: {
          DEFAULT: 'hsl(var(--app-content-bg))',
          foreground: 'hsl(var(--text-color))',
        },
      },
      borderRadius: {
        lg: "var(--app-border-radius)",
        md: "calc(var(--app-border-radius) - 2px)",
        sm: "calc(var(--app-border-radius) - 4px)",
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
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    // require('tailwindcss-radix'),
  ],
};
