/**
 * SelectField
 *
 * FormField-wrapped version of Select with label, description, and error support.
 *
 * @category input
 * @generated DO NOT EDIT - modify foundry/schemas/select.schema.json
 */

import * as React from 'react';
import { Select, type SelectProps } from './Select';

/**
 * SelectField
 *
 * FormField-wrapped version with label, description, error support.
 * Ready for react-hook-form integration.
 */
export interface SelectFieldProps
  extends Omit<SelectProps, 'id'> {
  /** Field name - required for form handling */
  name: string;
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** ID override (defaults to name) */
  id?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, description, error, required, id, className, ...props }, ref) => {
    const fieldId = id || name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={fieldId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <Select
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={description ? `${fieldId}-description` : undefined}
          className={className}
          {...props}
        />
        {description && !error && (
          <p id={`${fieldId}-description`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';