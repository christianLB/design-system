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
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium',
    'transition-[color,box-shadow]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    'outline-none',
    'focus-visible:ring-ring/50',
    'focus-visible:ring-offset-background',
    'focus-visible:ring-[3px]',
    'shrink-0', // Ensure button doesn't shrink in flex containers
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-background',
          'text-foreground',
          'hover:bg-primary/90',
          'hover:text-primary-foreground',
        ),
        destructive: cn(
          'bg-destructive',
          'text-destructive-foreground',
          'hover:bg-destructive/90',
        ),
        outline: cn(
          'border',
          'border-input',
          'bg-background',
          'hover:bg-accent',
          'hover:text-accent-foreground',
        ),
        secondary: cn(
          'bg-secondary',
          'text-secondary-foreground',
          'hover:bg-secondary/80',
        ),
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-9',
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
