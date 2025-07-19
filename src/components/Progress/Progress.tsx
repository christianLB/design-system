import React from 'react';
import clsx from 'clsx';

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
      ...props
    },
    ref
  ) => {
    const value = valueProp ?? 0;
    const clampedValue = Math.max(0, Math.min(maxValue, value));
    const percentage = (clampedValue / maxValue) * 100;

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
