import * as React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

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
    style,
    ...props 
  }, ref) => {
    const { activeTheme } = useTheme();
    
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
    
    // Map variants to CSS variables
    const getBadgeCSSVars = () => {
      const variantMap: Record<string, { bg: string; text: string; border: string }> = {
        default: {
          bg: 'var(--secondary)',
          text: 'var(--secondary-foreground)',
          border: 'var(--secondary)',
        },
        secondary: {
          bg: 'var(--secondary)',
          text: 'var(--secondary-foreground)',
          border: 'var(--secondary)',
        },
        destructive: {
          bg: 'var(--destructive)',
          text: 'var(--destructive-foreground)',
          border: 'var(--destructive)',
        },
        success: {
          bg: 'var(--success)',
          text: 'var(--success-foreground)',
          border: 'var(--success)',
        },
        warning: {
          bg: 'var(--warning)',
          text: 'var(--warning-foreground)',
          border: 'var(--warning)',
        },
        info: {
          bg: 'var(--info)',
          text: 'var(--info-foreground)',
          border: 'var(--info)',
        },
        outline: {
          bg: 'transparent',
          text: 'var(--foreground)',
          border: 'var(--border)',
        },
        'cyberpunk-matrix': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-matrix-green, #39ff14)',
          border: 'var(--cyber-matrix-green, #39ff14)',
        },
        'cyberpunk-doom': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-doom-red, #ff0000)',
          border: 'var(--cyber-doom-red, #ff0000)',
        },
        'cyberpunk-ghost': {
          bg: 'transparent',
          text: 'var(--cyber-pure-white, #ffffff)',
          border: 'var(--cyber-light-charcoal, #2f3336)',
        },
        'cyberpunk-neon': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-hot-pink, #ff1493)',
          border: 'var(--cyber-hot-pink, #ff1493)',
        },
      };
      
      const config = variantMap[variant] || variantMap.default;
      
      return {
        '--badge-bg': config.bg,
        '--badge-text': config.text,
        '--badge-border': config.border,
      };
    };
    
    const cssVars = getBadgeCSSVars();

    return <div className={classes} ref={ref} style={{ ...cssVars, ...style }} {...props} />;
  },
);

Badge.displayName = 'Badge';

export { Badge };
