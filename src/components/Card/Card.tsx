import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';
import clsx from 'clsx';

export type CardVariant =
  | 'default'
  | 'cyberpunk-matrix'
  | 'cyberpunk-doom'
  | 'cyberpunk-ghost'
  | 'cyberpunk-neon';

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

