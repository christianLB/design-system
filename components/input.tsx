import * as React from 'react';
import { cn } from '../utils';
import { tokens } from '../tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Input type
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Input value (controlled)
   */
  value?: string | number | readonly string[];
  /**
   * Change handler
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * A customizable input component with consistent styling.
 * @component
 * @example
 * <Input placeholder="Enter something..." />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          'flex w-full min-w-0',
          tokens.radius.DEFAULT,
          'border bg-transparent',
          tokens.colors.borderInput,
          'px-3 py-1 text-base md:text-sm',
          'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'selection:bg-primary selection:text-primary-foreground',
          tokens.transition.DEFAULT,
          tokens.colors.focus.ring,
          tokens.colors.focus.ringOffset,
          tokens.colors.focus.ringWidth,
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
