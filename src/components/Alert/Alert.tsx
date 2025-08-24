import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

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
      style,
      ...props
    },
    ref
  ) => {
    const { activeTheme } = useTheme();
    
    const classes = clsx(
      'alert',
      `alert-${variant}`,
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      className
    );
    
    // Map variants to CSS variables
    const getAlertCSSVars = () => {
      const variantMap: Record<string, { bg: string; text: string; border: string; icon: string }> = {
        default: {
          bg: 'var(--secondary)',
          text: 'var(--secondary-foreground)',
          border: 'var(--secondary)',
          icon: 'var(--secondary-foreground)',
        },
        destructive: {
          bg: 'var(--destructive)',
          text: 'var(--destructive-foreground)',
          border: 'var(--destructive)',
          icon: 'var(--destructive-foreground)',
        },
        success: {
          bg: 'var(--success)',
          text: 'var(--success-foreground)',
          border: 'var(--success)',
          icon: 'var(--success-foreground)',
        },
        warning: {
          bg: 'var(--warning)',
          text: 'var(--warning-foreground)',
          border: 'var(--warning)',
          icon: 'var(--warning-foreground)',
        },
        info: {
          bg: 'var(--info)',
          text: 'var(--info-foreground)',
          border: 'var(--info)',
          icon: 'var(--info-foreground)',
        },
        'cyberpunk-matrix': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-matrix-green, #39ff14)',
          border: 'var(--cyber-matrix-green, #39ff14)',
          icon: 'var(--cyber-matrix-green, #39ff14)',
        },
        'cyberpunk-doom': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-doom-red, #ff0000)',
          border: 'var(--cyber-doom-red, #ff0000)',
          icon: 'var(--cyber-doom-red, #ff0000)',
        },
        'cyberpunk-ghost': {
          bg: 'transparent',
          text: 'var(--cyber-pure-white, #ffffff)',
          border: 'var(--cyber-light-charcoal, #2f3336)',
          icon: 'var(--cyber-pure-white, #ffffff)',
        },
        'cyberpunk-neon': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          text: 'var(--cyber-hot-pink, #ff1493)',
          border: 'var(--cyber-hot-pink, #ff1493)',
          icon: 'var(--cyber-hot-pink, #ff1493)',
        },
      };
      
      const config = variantMap[variant] || variantMap.default;
      
      return {
        '--alert-bg': config.bg,
        '--alert-text': config.text,
        '--alert-border': config.border,
        '--alert-icon': config.icon,
      };
    };
    
    const cssVars = getAlertCSSVars();

    return (
      <motion.div
        ref={ref}
        role="alert"
        className={classes}
        style={{
          ...cssVars,
          ...style
        }}
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
