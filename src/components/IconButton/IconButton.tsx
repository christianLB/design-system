/**
 * IconButton Component
 *
 * A button that displays only an icon, with consistent sizing and styling.
 * Perfect for toolbars, action menus, and compact UI elements.
 *
 * @example
 * import { Settings, Trash } from 'lucide-react';
 *
 * <IconButton icon={Settings} label="Settings" />
 * <IconButton icon={Trash} variant="destructive" label="Delete" />
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-md',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        destructive: 'text-destructive hover:bg-destructive/10',
      },
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

// Map button size to icon size
const iconSizeMap = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
} as const;

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconButtonVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  /** The Lucide icon component to render */
  icon: LucideIcon;
  /** Size variant */
  size?: IconButtonSize;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Accessible label (required for screen readers) */
  label: string;
  /** Show label as tooltip on hover */
  showTooltip?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: IconComponent, size = 'md', variant, label, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(iconButtonVariants({ size, variant }), className)}
        aria-label={label}
        title={label}
        {...props}
      >
        <IconComponent size={iconSizeMap[size]} aria-hidden="true" />
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';

export { iconButtonVariants };
export default IconButton;
