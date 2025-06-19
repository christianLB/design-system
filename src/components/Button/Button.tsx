import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import clsx from 'clsx';
import './button.css';

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
    const classes = clsx(
      'button',
      `button--${variant}`,
      `button--${size}`,
      className,
    );

    return (
      <motion.button
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileFocus={{ scale: disabled ? 1 : 1.02 }}
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
