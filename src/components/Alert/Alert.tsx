import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info' | 'cyberpunk-matrix' | 'cyberpunk-doom' | 'cyberpunk-ghost' | 'cyberpunk-neon';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
  /** Cyberpunk glow intensity */
  cyberpunkGlow?: 'subtle' | 'normal' | 'intense';
  /** Adds cyberpunk scanline effects */
  scanlines?: boolean;
  /** Adds Matrix-style digital rain effect */
  matrixRain?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & AlertProps>(
  (
    {
      className,
      children,
      title,
      description,
      variant = 'default',
      icon,
      dismissible = false,
      onClose,
      cyberpunkGlow,
      scanlines = false,
      matrixRain = false,
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      'alert',
      `alert-${variant}`,
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      className
    );

    return (
      <motion.div
        ref={ref}
        role="alert"
        className={classes}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-content">
          {title && <h5 className="alert-title">{title}</h5>}
          {description || children ? (
            <div className="alert-description">{description ?? children}</div>
          ) : null}
        </div>
        {dismissible && (
          <button
            className="alert-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
          >
            &times;
          </button>
        )}
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
