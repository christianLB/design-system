import * as React from 'react';
import { cn } from '../../utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether the label should be displayed in a disabled state
   */
  disabled?: boolean;
  /**
   * Whether the label is required (shows an asterisk)
   */
  required?: boolean;
  /**
   * Additional class name for the label
   */
  className?: string;
  /**
   * The label content
   */
  children: React.ReactNode;
  /**
   * The ID of the form control the label is for
   */
  htmlFor?: string;
}

/**
 * A label component for form controls.
 *
 * @component
 * @example
 * ```tsx
 * <Label htmlFor="username">Username</Label>
 * <Input id="username" />
 * ```
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, disabled, required, htmlFor, ...props }, ref) => {
    return (
      <label
        ref={ref} data-testid="label"
        className={cn(
          'text-sm font-medium leading-none text-foreground',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          disabled && 'cursor-not-allowed opacity-70 text-muted-foreground',
          className
        )}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
