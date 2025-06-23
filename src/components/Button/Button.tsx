import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useMicroInteraction } from '../../hooks';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'success' | 'outline' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  /** Adds a subtle glow effect, great for futuristic themes */
  glow?: boolean;
  /** Makes the button look like it's elevated from the surface */
  elevated?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled,
      className,
      children,
      fullWidth = false,
      glow = false,
      elevated = false,
      ...props
    },
    ref,
  ) => {
    const micro = useMicroInteraction('button');
    const base = clsx(
      'inline-flex flex-row items-center justify-center rounded-[var(--radius)]',
      'border border-[var(--border)]',
      'transition-all duration-[var(--duration-normal)] ease-[var(--easing-in-out)]',
      'cursor-pointer font-medium',
      'focus:outline-none focus:ring-2 focus:ring-opacity-50',
      disabled && 'opacity-60 cursor-not-allowed pointer-events-none',
      fullWidth && 'w-full',
      elevated && 'shadow-md hover:shadow-lg',
    );

    const variantClasses: Record<ButtonVariant, string> = {
      primary: clsx(
        'bg-[var(--primary)] text-[var(--primary-foreground)]',
        'hover:bg-[var(--primary-hover)]',
        'focus:ring-[var(--primary)]',
        'active:translate-y-0.5',
        glow && 'shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]'
      ),
      secondary: clsx(
        'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
        'hover:bg-[var(--secondary-hover)]',
        'focus:ring-[var(--secondary)]',
        'active:translate-y-0.5',
        glow && 'shadow-[0_0_15px_rgba(var(--secondary-rgb),0.3)]'
      ),
      ghost: clsx(
        'bg-transparent text-[var(--foreground)]',
        'hover:bg-[var(--background-subtle)] hover:text-[var(--foreground-emphasis)]',
        'border-transparent',
        'focus:ring-[var(--foreground-muted)]',
        'active:bg-[var(--background-muted)]'
      ),
      destructive: clsx(
        'bg-[var(--destructive)] text-[var(--destructive-foreground)]',
        'hover:bg-[var(--destructive-hover)]',
        'border-[var(--destructive)]',
        'focus:ring-[var(--destructive)]',
        'active:translate-y-0.5',
        glow && 'shadow-[0_0_15px_rgba(var(--destructive-rgb),0.5)]'
      ),
      success: clsx(
        'bg-[var(--success)] text-[var(--success-foreground)]',
        'hover:bg-[var(--success-hover)]',
        'border-[var(--success)]',
        'focus:ring-[var(--success)]',
        'active:translate-y-0.5',
        glow && 'shadow-[0_0_15px_rgba(var(--success-rgb),0.5)]'
      ),
      outline: clsx(
        'bg-transparent', 
        'text-[var(--foreground)]',
        'border-[var(--border)]',
        'hover:bg-[var(--background-subtle)] hover:text-[var(--foreground-emphasis)]',
        'active:bg-[var(--background-muted)]',
        'focus:ring-[var(--border)]'
      ),
      link: clsx(
        'bg-transparent text-[var(--primary)]',
        'border-transparent underline-offset-4 hover:underline',
        'hover:text-[var(--primary-hover)]',
        'focus:text-[var(--primary-hover)]',
        'p-0 h-auto'
      ),
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'text-[var(--font-size-sm)] px-[var(--spacing-md)] py-[var(--spacing-xs)] gap-[var(--spacing-xs)]',
      md: 'text-[var(--font-size-md)] px-[var(--spacing-lg)] py-[var(--spacing-sm)] gap-[var(--spacing-sm)]',
      lg: 'text-[var(--font-size-lg)] px-[var(--spacing-xl)] py-[var(--spacing-md)] gap-[var(--spacing-md)]',
    };

    const variantClass = `button--${variant}`;
    const classes = clsx(
      base,
      variantClass,
      variantClasses[variant],
      sizeClasses[size],
      className,
    );

    return (
      <motion.button
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        whileHover={disabled ? undefined : micro.whileHover}
        whileTap={disabled ? undefined : micro.whileTap}
        whileFocus={disabled ? undefined : micro.whileFocus}
        transition={micro.transition}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
