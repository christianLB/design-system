import React from 'react';
import { Label } from '../Label';

export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
}

const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    { id, label, checked, onChange, error, helperText, className, ...props },
    ref
  ) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={`checkbox-field ${className || ''}`.trim()}>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            className="checkbox"
            checked={checked}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={
              errorId || (helperText ? `${id}-helper` : undefined)
            }
            {...props}
          />
          <Label htmlFor={id}>{label}</Label>
        </div>
        {helperText && !error && (
          <p id={`${id}-helper`} className="checkbox-helper">
            {helperText}
          </p>
        )}
        {error && (
          <p role="alert" id={errorId} className="input-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

export { CheckboxField };
