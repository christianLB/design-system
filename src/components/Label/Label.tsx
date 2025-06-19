import * as React from 'react';


export type LabelSize = 'sm' | 'md' | 'lg';

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
   * Optional size of the label text
   */
  size?: LabelSize;
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
  (
    { className, children, disabled, required, htmlFor, size = 'md', ...props },
    ref,
  ) => {
    return (
      <label
        ref={ref} data-testid="label"
        className={`label label--${size} ${disabled ? 'label--disabled' : ''} ${
          className || ''
        }`}
        htmlFor={htmlFor}
        {...props}
      >
        {children}
        {required && <span className="label-required-indicator"> *</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };
