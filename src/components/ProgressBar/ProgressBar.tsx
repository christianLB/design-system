import React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  maxValue?: number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  labelFormat?: (value: number, maxValue: number) => string;
  isIndeterminate?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    value: valueProp,
    maxValue = 100,
    variant = 'default',
    size = 'md',
    showLabel = true,
    labelFormat = (val, max) => `${Math.round((val / max) * 100)}%`,
    isIndeterminate = false,
    className,
    ...props
  }, ref) => {
    const value = valueProp ?? 0;
    const clampedValue = Math.max(0, Math.min(maxValue, value));
    const percentage = (clampedValue / maxValue) * 100;

    const label = isIndeterminate ? 'Loading...' : labelFormat(clampedValue, maxValue);

    const trackClasses = [
      'progress-bar-track',
      `progress-bar-track--${size}`,
      `progress-bar-track--${variant}`
    ].join(' ');

    const indicatorClasses = [
      'progress-bar-indicator',
      `progress-bar-indicator--${variant}`,
      isIndeterminate ? 'progress-bar-indicator--indeterminate' : ''
    ].join(' ');

    return (
      <div
        ref={ref}
        className={`progress-bar-container ${className || ''}`}
        role="progressbar"
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
        {showLabel && (
          <div className="progress-bar-label">
            {label}
          </div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };
