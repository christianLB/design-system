/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './stories/**/*.stories.@(js|jsx|ts|tsx)',
    './app/**/*.{ts,tsx}',
    './demo/**/*.{ts,tsx,js,jsx,html}',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        background: 'var(--color-background)',
        muted: 'var(--color-background-muted)',
        destructive: 'var(--color-background-destructive)',
        
        // Text colors
        foreground: 'var(--color-text)',
        'muted-foreground': 'var(--color-text-muted)',
        'destructive-foreground': 'var(--color-text-destructive)',
        
        // Border colors
        border: 'var(--color-border)',
        input: 'var(--color-border-input)',
        
        // Interactive colors
        primary: 'var(--color-primary)',
        'primary-foreground': 'white',
        secondary: 'var(--color-secondary)',
        'secondary-foreground': 'white',
        accent: 'var(--color-muted)',
        'accent-foreground': 'var(--color-text)',
        
        // Ring colors
        ring: 'var(--color-focus-ring)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        inner: 'var(--shadow-inner)',
        none: 'none',
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
      },
      lineHeight: {
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      fontFamily: {
        sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
      },
    },
  },
  plugins: [],
};