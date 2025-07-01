import * as React from 'react';
import clsx from 'clsx';
import { Text } from '../Text';

export type IndicatorStatus = 'online' | 'offline' | 'maintenance' | 'error' | 'warning';
export type IndicatorSize = 'sm' | 'md' | 'lg';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: IndicatorStatus;
  size?: IndicatorSize;
  withLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ 
    status,
    size = 'md',
    withLabel = false,
    label,
    animated = false,
    className,
    ...props 
  }, ref) => {
    
    const statusConfig = {
      online: {
        color: 'bg-green-500',
        textColor: 'text-green-800',
        bgColor: 'bg-green-100',
        label: 'Online'
      },
      offline: {
        color: 'bg-gray-500',
        textColor: 'text-gray-800', 
        bgColor: 'bg-gray-100',
        label: 'Offline'
      },
      maintenance: {
        color: 'bg-yellow-500',
        textColor: 'text-yellow-800',
        bgColor: 'bg-yellow-100', 
        label: 'Maintenance'
      },
      error: {
        color: 'bg-red-500',
        textColor: 'text-red-800',
        bgColor: 'bg-red-100',
        label: 'Error'
      },
      warning: {
        color: 'bg-orange-500',
        textColor: 'text-orange-800',
        bgColor: 'bg-orange-100',
        label: 'Warning'
      }
    };

    const sizeStyles = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4'
    };

    const config = statusConfig[status];
    const displayLabel = label || config.label;

    const dotElement = (
      <div
        className={clsx(
          'rounded-full',
          config.color,
          sizeStyles[size],
          animated && 'animate-pulse'
        )}
      />
    );

    if (withLabel) {
      return (
        <div
          ref={ref}
          className={clsx(
            'inline-flex items-center gap-2 px-3 py-1 rounded-full',
            config.bgColor,
            className
          )}
          {...props}
        >
          {dotElement}
          <Text size="sm" className={clsx('font-medium', config.textColor)}>
            {displayLabel}
          </Text>
        </div>
      );
    }

    return (
      <div ref={ref} className={clsx('inline-flex', className)} {...props}>
        {dotElement}
      </div>
    );
  }
);

StatusIndicator.displayName = 'StatusIndicator';

export { StatusIndicator };
export default StatusIndicator;