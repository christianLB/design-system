import React from 'react';
import { Label } from '../Label';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'> {
  id: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, value, onChange, error, className, disabled, ...props },
    ref,
  ) => {
    const inputClasses = ['input', error ? 'input--error' : '', className || '']
      .filter(Boolean)
      .join(' ');

    return (
      <div className="input-wrapper">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          disabled={disabled}
          {...props}
        />
        {error && (
          <p role="alert" className="input-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
