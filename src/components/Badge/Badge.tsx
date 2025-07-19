import * as React from 'react';
import clsx from 'clsx';

export type BadgeVariant = 
  | 'default' 
  | 'secondary' 
  | 'destructive' 
  | 'success' 
  | 'warning' 
  | 'info'
  | 'outline'
  | 'cyberpunk-matrix'
  | 'cyberpunk-doom'
  | 'cyberpunk-ghost'
  | 'cyberpunk-neon';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Badge visual variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Cyberpunk glow intensity */
  cyberpunkGlow?: 'subtle' | 'normal' | 'intense';
  /** Adds cyberpunk scanline effects */
  scanlines?: boolean;
  /** Adds Matrix-style digital rain effect */
  matrixRain?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default',
    size = 'md',
    cyberpunkGlow,
    scanlines = false,
    matrixRain = false,
    ...props 
  }, ref) => {
    const classes = clsx(
      'badge',
      // Variant classes
      `badge--${variant}`,
      // Size classes
      `badge--${size}`,
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      // Custom class name passed as prop
      className
    );

    return <div className={classes} ref={ref} {...props} />;
  },
);

Badge.displayName = 'Badge';

export { Badge };
