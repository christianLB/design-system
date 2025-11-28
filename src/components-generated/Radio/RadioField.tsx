/**
 * RadioField
 *
 * FormField-wrapped version of Radio with label, description, and error support.
 *
 * @category input
 * @generated DO NOT EDIT - modify foundry/schemas/radio.schema.json
 */

import * as React from 'react';
import { Radio, type RadioProps } from './Radio';

/**
 * RadioField
 *
 * Checkbox/Radio with inline label support.
 * Ready for react-hook-form integration.
 */
export interface RadioFieldProps
  extends Omit<RadioProps, 'id'> {
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

export const RadioField = React.forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ name, label, description, error, id, className, ...props }, ref) => {
    const fieldId = id || name;

    return (
      <div className="flex items-start space-x-3">
        <Radio
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

RadioField.displayName = 'RadioField';