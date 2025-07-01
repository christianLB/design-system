import * as React from 'react';
import clsx from 'clsx';

export type NotificationBadgeVariant = 'dot' | 'count';
export type NotificationBadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface NotificationBadgeProps {
  count?: number;
  variant?: NotificationBadgeVariant;
  position?: NotificationBadgePosition;
  maxCount?: number;
  showZero?: boolean;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

const NotificationBadge = React.forwardRef<HTMLDivElement, NotificationBadgeProps>(
  ({ 
    count = 0,
    variant = 'count',
    position = 'top-right',
    maxCount = 99,
    showZero = false,
    color = 'bg-red-500',
    children,
    className,
    ...props 
  }, ref) => {
    
    const shouldShow = count > 0 || (showZero && count === 0);
    
    const getDisplayCount = () => {
      if (variant === 'dot') return '';
      if (count > maxCount) return `${maxCount}+`;
      return count.toString();
    };

    const positionStyles = {
      'top-right': '-top-1 -right-1',
      'top-left': '-top-1 -left-1', 
      'bottom-right': '-bottom-1 -right-1',
      'bottom-left': '-bottom-1 -left-1',
    };

    const badgeStyles = variant === 'dot' 
      ? 'w-2 h-2' 
      : 'min-w-5 h-5 px-1';

    return (
      <div ref={ref} className={clsx('relative inline-block', className)} {...props}>
        {children}
        {shouldShow && (
          <span
            className={clsx(
              'absolute flex items-center justify-center',
              'text-white text-xs font-medium rounded-full',
              'border-2 border-white',
              color,
              badgeStyles,
              positionStyles[position]
            )}
          >
            {getDisplayCount()}
          </span>
        )}
      </div>
    );
  }
);

NotificationBadge.displayName = 'NotificationBadge';

export { NotificationBadge };
export default NotificationBadge;