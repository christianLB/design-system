import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

export type CardVariant =
  | 'default'
  | 'cyberpunk-matrix'
  | 'cyberpunk-doom'
  | 'cyberpunk-ghost'
  | 'cyberpunk-neon'
  | 'alien-chamber'
  | 'alien-organ'
  | 'alien-membrane'
  | 'alien-cavity';

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  /** React ref to the HTML div element */
  ref?: React.Ref<HTMLDivElement>;
  /** Card visual variant */
  variant?: CardVariant;
  /** Adds cyberpunk scanline effects */
  scanlines?: boolean;
  /** Adds Matrix-style digital rain effect */
  matrixRain?: boolean;
  /** Cyberpunk glow intensity */
  cyberpunkGlow?: 'subtle' | 'normal' | 'intense';
  /** Adds a subtle glow effect */
  glow?: boolean;
  /** Makes the card look elevated from the surface */
  elevated?: boolean;
  /** Adds atmospheric alien breathing effects */
  vital?: boolean;
  /** Enables neural pathways effect for alien theme */
  neural?: boolean;
  /** Adds alien atmospheric effects */
  atmospheric?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default',
    scanlines = false,
    matrixRain = false,
    cyberpunkGlow,
    glow = false,
    elevated = false,
    vital = false,
    neural = false,
    atmospheric = false,
    style,
    ...props 
  }, ref) => {
    const micro = useMicroInteraction('card');
    const { activeTheme } = useTheme();
    
    // Map variants to CSS variables for theming
    const getCardCSSVars = () => {
      const variantMap: Record<string, { bg: string; text: string; border: string }> = {
        default: {
          bg: 'var(--card)',
          text: 'var(--card-foreground)',
          border: 'var(--border)',
        },
        // Cyberpunk variants
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
          bg: 'var(--cyber-void-black, #000000)',
          text: 'var(--cyber-pure-white, #ffffff)',
          border: 'var(--cyber-light-charcoal, #2f3336)',
        },
        'cyberpunk-neon': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-hot-pink, #ff1493)',
          border: 'var(--cyber-hot-pink, #ff1493)',
        },
        // Alien variants
        'alien-chamber': {
          bg: 'var(--alien-primordial-void, #0d1117)',
          text: 'var(--alien-pulsing-life, #e56e47)',
          border: 'var(--alien-ancient-blood, #6b7280)',
        },
        'alien-organ': {
          bg: 'var(--alien-adrenaline, #d4552f)',
          text: 'var(--alien-ancient-blood, #6b7280)',
          border: 'var(--alien-steel-organic, #708090)',
        },
        'alien-membrane': {
          bg: 'var(--alien-steel-organic, #708090)',
          text: 'var(--alien-pulsing-life, #e56e47)',
          border: 'var(--alien-adrenaline, #d4552f)',
        },
        'alien-cavity': {
          bg: 'var(--alien-primordial-void, #0d1117)',
          text: 'var(--alien-steel-organic, #708090)',
          border: 'var(--alien-pulsing-life, #e56e47)',
        },
      };
      
      const config = variantMap[variant] || variantMap.default;
      
      return {
        '--card-bg': config.bg,
        '--card-text': config.text,
        '--card-border': config.border,
        '--card-shadow': elevated ? '0 10px 40px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
        '--card-radius': 'var(--radius)',
      };
    };
    
    const cssVars = getCardCSSVars();
    
    const classes = clsx(
      'card',
      // Variant classes
      variant !== 'default' && `card--${variant}`,
      // State and modifier classes
      elevated && 'card--elevated',
      glow && 'card--glow',
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      // Alien modifier classes
      atmospheric && 'neural-pathways',
      vital && 'vital-element active',
      neural && 'atmospheric-neural',
      // Alien variant-specific classes
      variant === 'alien-chamber' && 'atmospheric-container-chamber atmospheric-interactive',
      variant === 'alien-organ' && 'atmospheric-container-organ atmospheric-interactive',
      variant === 'alien-membrane' && 'atmospheric-container-vessel atmospheric-interactive',
      variant === 'alien-cavity' && 'atmospheric-membrane atmospheric-border-cavity atmospheric-depth-cavity atmospheric-interactive',
      // Custom class name passed as prop
      className
    );
    
    return (
      <motion.div
        ref={ref}
        className={classes}
        style={{
          ...cssVars,
          ...style
        }}
        {...micro}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-header ${className || ''}`} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={`card-title ${className || ''}`} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-content ${className || ''}`} {...props} />
  ),
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`card-footer ${className || ''}`} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };

