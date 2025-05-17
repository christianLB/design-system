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
    background: 'bg-background',
    backgroundMuted: 'bg-muted',
    backgroundDestructive: 'bg-destructive',
    
    // Text colors
    text: 'text-foreground',
    textMuted: 'text-muted-foreground',
    textDestructive: 'text-destructive',
    
    // Border colors
    border: 'border-border',
    borderInput: 'border-input',
    borderDestructive: 'border-destructive',
    
    // Interactive states
    hover: {
      primary: 'hover:bg-primary/90',
      secondary: 'hover:bg-secondary/80',
      destructive: 'hover:bg-destructive/90',
      muted: 'hover:bg-muted/50',
    },
    
    // Focus states
    focus: {
      ring: 'focus-visible:ring-ring/50',
      ringOffset: 'focus-visible:ring-offset-background',
      ringWidth: 'focus-visible:ring-[3px]',
      ringDestructive: 'focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
    },
    
    // Opacity
    opacity: {
      disabled: 'opacity-50',
      hover: 'hover:opacity-90',
      active: 'active:opacity-80',
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
