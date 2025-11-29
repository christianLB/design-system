/**
 * Icon Component
 *
 * A wrapper component for Lucide icons with consistent sizing and styling.
 * Supports both dynamic icon name lookup and direct component passing for tree-shaking.
 *
 * @example
 * // Using icon name (dynamic - includes all icons in bundle)
 * <Icon name="Check" size="md" />
 *
 * // Using icon component (tree-shakeable - recommended)
 * import { Check } from 'lucide-react';
 * <Icon icon={Check} size="lg" variant="success" />
 */

import * as React from 'react';
import * as Icons from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const iconVariants = cva('shrink-0 inline-block', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
      '2xl': 'h-10 w-10',
    },
    variant: {
      default: 'text-current',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      error: 'text-red-600 dark:text-red-500',
      info: 'text-blue-600 dark:text-blue-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

export type IconName = keyof typeof Icons;
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconVariant =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface IconProps
  extends Omit<React.SVGAttributes<SVGElement>, 'ref'>,
    VariantProps<typeof iconVariants> {
  /** Icon name from Lucide (dynamic import) */
  name?: IconName;
  /** Direct icon component (tree-shakeable, recommended) */
  icon?: LucideIcon;
  /** Size variant */
  size?: IconSize;
  /** Color/semantic variant */
  variant?: IconVariant;
  /** Additional CSS classes */
  className?: string;
  /** Accessible label (makes icon not aria-hidden) */
  label?: string;
}

// Size to pixel mapping for Lucide's size prop
const sizePixels: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
};

// Type-safe icon lookup
const iconSet = Icons as unknown as Record<string, LucideIcon>;

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, icon, size = 'md', variant, className, label, ...props }, ref) => {
    // Determine which icon to render
    const IconComponent = icon || (name ? iconSet[name] : null);

    if (!IconComponent) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon: No icon found for name "${name}"`);
      }
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        size={sizePixels[size]}
        className={cn(iconVariants({ size, variant }), className)}
        aria-hidden={!label}
        aria-label={label}
        role={label ? 'img' : undefined}
        {...props}
      />
    );
  },
);

Icon.displayName = 'Icon';

export { iconVariants };
export default Icon;
