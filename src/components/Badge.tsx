import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

const badgeVariants = cva(
  'inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white border-transparent',
        secondary: 'bg-secondary-500 text-white border-transparent',
        success: 'bg-green-500 text-white border-transparent',
        error: 'bg-red-500 text-white border-transparent',
        warning: 'bg-yellow-500 text-white border-transparent',
        info: 'bg-blue-500 text-white border-transparent',
        outline: 'bg-transparent border-input hover:bg-accent hover:text-accent-foreground',
        default: 'bg-gray-100 text-gray-900 border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * The visual style of the badge
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'outline';
}

function Badge({
  children,
  variant = 'default',
  className,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };