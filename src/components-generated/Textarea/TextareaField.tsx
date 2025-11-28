/**
 * TextareaField
 *
 * FormField-wrapped version of Textarea with label, description, and error support.
 *
 * @category input
 * @generated DO NOT EDIT - modify foundry/schemas/textarea.schema.json
 */

import * as React from 'react';
import { Textarea, type TextareaProps } from './Textarea';

/**
 * TextareaField
 *
 * FormField-wrapped version with label, description, error support.
 * Ready for react-hook-form integration.
 */
export interface TextareaFieldProps
  extends Omit<TextareaProps, 'id'> {
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

export const TextareaField = React.forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
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
        <Textarea
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

TextareaField.displayName = 'TextareaField';