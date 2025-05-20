/**
 * Design Tokens
 * 
 * This file contains all design tokens used across the design system.
 * Always use these tokens instead of hardcoded values.
 */

export const tokens = {
  // Typography Tokens (for Tailwind config compatibility)
  typography: {
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
  // Color Tokens
  colors: {
    // Background colors
    background: '#ffffff', // light background
    backgroundMuted: '#f3f4f6', // muted background
    backgroundDestructive: '#fee2e2', // destructive background

    // Text colors
    text: '#111827', // default foreground
    textMuted: '#6b7280', // muted foreground
    textDestructive: '#b91c1c', // destructive text

    // Border colors
    border: '#e5e7eb', // default border
    borderInput: '#d1d5db', // input border
    borderDestructive: '#fca5a5', // destructive border

    // Interactive states (these are for reference, not direct Tailwind utilities)
    hover: {
      primary: '#2563eb', // blue-600
      secondary: '#6d28d9', // purple-700
      destructive: '#dc2626', // red-600
      muted: '#e5e7eb', // gray-200
    },

    // Focus states (for reference, not direct Tailwind utilities)
    focus: {
      ring: '#3b82f6', // blue-500
      ringOffset: '#ffffff', // white
      ringWidth: '3px',
      ringDestructive: '#fca5a5', // red-300
    },

    // Opacity (not needed for Tailwind config)
    opacity: {
      disabled: '0.5',
      hover: '0.9',
      active: '0.8',
    },
  },
  
  // Spacing Tokens (in rem)
  spacing: {
    px: 'px-[1px]',
    0: 'p-0',
    0.5: 'p-0.5',
    1: 'p-1',
    1.5: 'p-1.5',
    2: 'p-2',
    2.5: 'p-2.5',
    3: 'p-3',
    4: 'p-4',
    5: 'p-5',
    6: 'p-6',
    8: 'p-8',
    10: 'p-10',
    12: 'p-12',
  },
  
  // Sizing Tokens
  size: {
    xs: 'size-4',
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-12',
  },
  
  // Border Radius
  radius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    DEFAULT: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  
  // Shadows
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    DEFAULT: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    inner: 'shadow-inner',
  },
  
  // Transitions
  transition: {
    DEFAULT: 'transition-[color,box-shadow]',
    all: 'transition-all',
    colors: 'transition-colors',
    opacity: 'transition-opacity',
    shadow: 'transition-shadow',
    transform: 'transition-transform',
  },
  
  // Z-index
  zIndex: {
    auto: 'z-auto',
    0: 'z-0',
    10: 'z-10',
    20: 'z-20',
    30: 'z-30',
    40: 'z-40',
    50: 'z-50',
  },
} as const;

/**
 * Helper function to combine multiple token classes
 */
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get spacing utility classes
 */
export function spacing(
  value: keyof typeof tokens.spacing | number,
  direction: 'all' | 'x' | 'y' | 't' | 'r' | 'b' | 'l' = 'all'
) {
  if (typeof value === 'number') {
    const map = { all: 'p', x: 'px', y: 'py', t: 'pt', r: 'pr', b: 'pb', l: 'pl' };
    return `${map[direction]}-${value}`;
  }
  return tokens.spacing[value as keyof typeof tokens.spacing];
}
