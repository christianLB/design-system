import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';

const Card = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ className, ...props }, ref) => {
    const micro = useMicroInteraction('card');
    return (
      <motion.div
        ref={ref}
        className={`card ${className || ''}`}
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

