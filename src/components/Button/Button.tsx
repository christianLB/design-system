import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const base = clsx(
      'inline-flex items-center justify-center rounded-[var(--radius)]',
      'border border-[var(--border)]',
      'transition-colors duration-[var(--duration-normal)] ease-[var(--easing-in-out)]',
      'cursor-pointer',
    );

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
      secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
      ghost: 'bg-transparent text-[var(--primary)]',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'text-[var(--font-size-sm)] px-[var(--spacing-sm)] py-[var(--spacing-xs)]',
      md: 'text-[var(--font-size-md)] px-[var(--spacing-md)] py-[var(--spacing-sm)]',
      lg: 'text-[var(--font-size-lg)] px-[var(--spacing-lg)] py-[var(--spacing-md)]',
    };

    const classes = clsx(base, variantClasses[variant], sizeClasses[size], className);

    return (
      <motion.button
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        whileHover={{
          scale: disabled ? 1 : 1.05,
          boxShadow: disabled ? 'none' : '0 0 0 4px var(--ring)',
          filter: disabled ? 'none' : 'brightness(1.1)',
        }}
        whileFocus={{
          scale: disabled ? 1 : 1.05,
          boxShadow: disabled ? 'none' : '0 0 0 4px var(--ring)',
        }}
        transition={{ duration: 0.15 }}
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
