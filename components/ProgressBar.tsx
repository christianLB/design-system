import React from 'react';
import { cn } from '../utils';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current progress value (0-100 or 0-maxValue if maxValue is provided)
   */
  value?: number;
  /**
   * Maximum value (default: 100)
   * @default 100
   */
  maxValue?: number;
  /**
   * Variant of the progress bar
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  /**
   * Size of the progress bar
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether to show the percentage label
   * @default true
   */
  showLabel?: boolean;
  /**
   * Custom label format function
   */
  labelFormat?: (value: number) => string;
  /**
   * Whether to show the progress indicator
   * @default true
   */
  showIndicator?: boolean;
  /**
   * Whether to show the track
   * @default true
   */
  showTrack?: boolean;
  /**
   * Whether the progress is indeterminate
   * @default false
   */
  isIndeterminate?: boolean;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const variantClasses = {
  default: 'bg-blue-600',
  primary: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
  info: 'bg-blue-400',
};

const trackClasses = {
  default: 'bg-gray-200 dark:bg-gray-700',
  primary: 'bg-primary/20',
  success: 'bg-green-500/20',
  warning: 'bg-yellow-500/20',
  danger: 'bg-red-500/20',
  info: 'bg-blue-400/20',
};

/**
 * A progress bar component that displays the progress of a task.
 * @component
 * @example
 * // Basic usage
 * <ProgressBar value={75} />
 * 
 * // With custom variant and size
 * <ProgressBar value={50} variant="success" size="lg" />
 * 
 * // Indeterminate progress
 * <ProgressBar isIndeterminate />
 */
const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({
    value: valueProp,
    maxValue = 100,
    variant = 'default',
    size = 'md',
    showLabel = true,
    labelFormat = (val) => `${Math.round((val / maxValue) * 100)}%`,
    showIndicator = true,
    showTrack = true,
    isIndeterminate = false,
    className,
    ...props
  }, ref) => {
    const value = valueProp ?? 0;
    const clampedValue = Math.max(0, Math.min(maxValue, value));
    const percentage = (clampedValue / maxValue) * 100;
    const displayValue = isIndeterminate ? 100 : percentage;
    const label = isIndeterminate ? 'Loading...' : labelFormat(clampedValue);

    return (
      <div 
        ref={ref}
        className={cn('w-full', className)}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : displayValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={isIndeterminate ? 'Loading...' : undefined}
        {...props}
      >
        <div className="flex items-center gap-3">
          <div 
            className={cn(
              'relative flex-1 rounded-full overflow-hidden',
              showTrack ? trackClasses[variant] : 'bg-transparent',
              sizeClasses[size]
            )}
          >
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300 ease-in-out',
                variantClasses[variant],
                isIndeterminate ? 'progress-bar-indeterminate' : ''
              )}
              style={{
                width: isIndeterminate ? '100%' : `${displayValue}%`,
              }}
            >
              {showIndicator && !isIndeterminate && displayValue > 0 && (
                <div className="h-full w-full bg-white/20 absolute right-0 top-0"></div>
              )}
            </div>
          </div>
          {showLabel && !isIndeterminate && (
            <div className={cn(
              'text-xs whitespace-nowrap',
              variant === 'default' ? 'text-gray-700 dark:text-gray-300' : `text-${variant}`
            )}>
              {label}
            </div>
          )}
          {isIndeterminate && showLabel && (
            <div className="text-xs text-muted-foreground">
              Loading...
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };