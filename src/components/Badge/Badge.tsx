import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, ...props }, ref) => {
    return <div className={`badge ${className || ''}`} ref={ref} {...props} />;
  },
);

Badge.displayName = 'Badge';

export { Badge };
