/**
 * CheckboxField
 *
 * FormField-wrapped version of Checkbox with label, description, and error support.
 *
 * @category input
 * @generated DO NOT EDIT - modify foundry/schemas/checkbox.schema.json
 */

import * as React from 'react';
import { Checkbox, type CheckboxProps } from './Checkbox';

/**
 * CheckboxField
 *
 * Checkbox/Radio with inline label support.
 * Ready for react-hook-form integration.
 */
export interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'id'> {
  /** Field name - required for form handling */
  name: string;
  /** Inline label */
  label?: string;
  /** Additional description */
  description?: string;
  /** Error message */
  error?: string;
  /** ID override (defaults to name) */
  id?: string;
}

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ name, label, description, error, id, className, ...props }, ref) => {
    const fieldId = id || name;

    return (
      <div className="flex items-start space-x-3">
        <Checkbox
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          className={className}
          {...props}
        />
        <div className="space-y-1 leading-none">
          {label && (
            <label
              htmlFor={fieldId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';