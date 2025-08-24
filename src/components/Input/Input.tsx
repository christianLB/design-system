import React from 'react';
import { Label } from '../Label';
import { useTheme } from '../../theme/ThemeContext';

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
    { id, label, value, onChange, error, className, disabled, style, ...props },
    ref,
  ) => {
    const { activeTheme } = useTheme();
    
    const inputClasses = ['input', error ? 'input--error' : '', className || '']
      .filter(Boolean)
      .join(' ');
    
    // CSS variables for theming
    const cssVars = {
      '--input-bg': error ? 'var(--destructive-light, #fef2f2)' : 'var(--background)',
      '--input-text': 'var(--foreground)',
      '--input-border': error ? 'var(--destructive)' : 'var(--border)',
      '--input-focus-border': error ? 'var(--destructive)' : 'var(--primary)',
      '--input-placeholder': 'var(--muted-foreground)',
      '--input-disabled-opacity': '0.5',
    };

    return (
      <div className="input-wrapper">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          ref={ref}
          id={id}
          className={inputClasses}
          style={{
            ...cssVars,
            ...style
          }}
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
