import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../theme/ThemeContext';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  maxValue?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'cyberpunk-matrix' | 'cyberpunk-doom' | 'cyberpunk-ghost' | 'cyberpunk-neon';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelFormat?: (value: number, maxValue: number) => string;
  isIndeterminate?: boolean;
  /** Cyberpunk glow intensity */
  cyberpunkGlow?: 'subtle' | 'normal' | 'intense';
  /** Adds cyberpunk scanline effects */
  scanlines?: boolean;
  /** Adds Matrix-style digital rain effect */
  matrixRain?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value: valueProp,
      maxValue = 100,
      variant = 'default',
      size = 'md',
      showLabel = true,
      labelFormat = (val, max) => `${Math.round((val / max) * 100)}%`,
      isIndeterminate = false,
      cyberpunkGlow,
      scanlines = false,
      matrixRain = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const { activeTheme } = useTheme();
    const value = valueProp ?? 0;
    const clampedValue = Math.max(0, Math.min(maxValue, value));
    const percentage = (clampedValue / maxValue) * 100;
    
    // Map variants to CSS variables
    const getProgressCSSVars = () => {
      const variantMap: Record<string, { bg: string; fill: string; text: string }> = {
        default: {
          bg: 'var(--muted)',
          fill: 'var(--primary)',
          text: 'var(--foreground)',
        },
        primary: {
          bg: 'var(--primary-light, var(--muted))',
          fill: 'var(--primary)',
          text: 'var(--primary-foreground)',
        },
        success: {
          bg: 'var(--success-light, var(--muted))',
          fill: 'var(--success)',
          text: 'var(--success-foreground)',
        },
        warning: {
          bg: 'var(--warning-light, var(--muted))',
          fill: 'var(--warning)',
          text: 'var(--warning-foreground)',
        },
        danger: {
          bg: 'var(--destructive-light, var(--muted))',
          fill: 'var(--destructive)',
          text: 'var(--destructive-foreground)',
        },
        info: {
          bg: 'var(--info-light, var(--muted))',
          fill: 'var(--info)',
          text: 'var(--info-foreground)',
        },
        'cyberpunk-matrix': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          fill: 'var(--cyber-matrix-green, #39ff14)',
          text: 'var(--cyber-matrix-green, #39ff14)',
        },
        'cyberpunk-doom': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          fill: 'var(--cyber-doom-red, #ff0000)',
          text: 'var(--cyber-doom-red, #ff0000)',
        },
        'cyberpunk-ghost': {
          bg: 'var(--cyber-void-black, #000000)',
          fill: 'var(--cyber-pure-white, #ffffff)',
          text: 'var(--cyber-pure-white, #ffffff)',
        },
        'cyberpunk-neon': {
          bg: 'var(--cyber-dark-charcoal, #0d1117)',
          fill: 'var(--cyber-hot-pink, #ff1493)',
          text: 'var(--cyber-hot-pink, #ff1493)',
        },
      };
      
      const config = variantMap[variant] || variantMap.default;
      
      return {
        '--progress-bg': config.bg,
        '--progress-fill': config.fill,
        '--progress-text': config.text,
      };
    };
    
    const cssVars = getProgressCSSVars();

    const label = isIndeterminate
      ? 'Loading...'
      : labelFormat(clampedValue, maxValue);

    const containerClasses = clsx(
      'progress-bar-container',
      // Cyberpunk modifier classes
      scanlines && 'cyber-scanlines',
      matrixRain && 'cyber-matrix-overlay',
      cyberpunkGlow && `cyber-glow-${cyberpunkGlow}`,
      className
    );

    const trackClasses = clsx(
      'progress-bar-track',
      `progress-bar-track--${size}`,
      `progress-bar-track--${variant}`
    );

    const indicatorClasses = clsx(
      'progress-bar-indicator',
      `progress-bar-indicator--${variant}`,
      isIndeterminate && 'progress-bar-indicator--indeterminate'
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={{
          ...cssVars,
          ...style
        }}
        role="progressbar"
        aria-label="progress"
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        aria-valuetext={isIndeterminate ? 'Loading...' : label}
        {...props}
      >
        <div className={trackClasses}>
          <div
            className={indicatorClasses}
            style={{ width: isIndeterminate ? '100%' : `${percentage}%` }}
          />
        </div>
        {showLabel && <div className="progress-bar-label">{label}</div>}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
