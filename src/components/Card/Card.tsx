import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';
import clsx from 'clsx';

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
    ...props 
  }, ref) => {
    const micro = useMicroInteraction('card');
    
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

