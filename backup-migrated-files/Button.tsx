import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

/**
 * Available button visual variants
 */
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

/**
 * Available button size variants
 */
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/**
 * Button variants configuration for class-variance-authority
 */
const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium',
    'transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    'shrink-0', // Ensure button doesn't shrink in flex containers
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary/90',
        ),
        destructive: cn(
          'bg-destructive',
          'text-destructive-foreground',
          'hover:bg-destructive/90',
        ),
        outline: cn(
          'border',
          'border-border',
          'bg-background',
          'text-foreground',
          'hover:bg-accent hover:text-accent-foreground',
        ),
        secondary: cn(
          'bg-secondary',
          'text-secondary-foreground',
          'hover:bg-secondary/90',
        ),
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline focus:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8 text-base',
        icon: 'h-10 w-10 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  /**
   * Render as a different element type using Radix UI Slot
   * @default false
   */
  asChild?: boolean;
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: ButtonVariant;
  /**
   * Size variant
   * @default 'default'
   */
  size?: ButtonSize;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * A customizable button component with multiple variants and sizes.
 * @component
 * @example
 * <Button variant="default" size="default">Click me</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    asChild = false,
    type = 'button',
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export type { ButtonProps, ButtonVariant, ButtonSize };
