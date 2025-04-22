import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white border-transparent',
        secondary: 'bg-secondary-500 text-white border-transparent',
        success: 'bg-green-500 text-white border-transparent',
        error: 'bg-red-500 text-white border-transparent',
        default: 'bg-gray-100 text-gray-900 border-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  className,
  ...props
}) => {
  return (
    <span
      className={badgeVariants({ variant, className })}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;