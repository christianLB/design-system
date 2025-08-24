import React from 'react';
import { Label } from '../Label';
import { useTheme } from '../../theme/ThemeContext';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  legend: string;
  error?: string;
}

const RadioGroup = ({
  name,
  options,
  value,
  onChange,
  legend,
  error,
  className,
  style,
  ...props
}: RadioGroupProps) => {
  const errorId = error ? `${name}-error` : undefined;
  const { activeTheme } = useTheme();
  
  // CSS variables for theming
  const cssVars = {
    '--radio-bg': 'var(--background)',
    '--radio-border': 'var(--border)',
    '--radio-checked-bg': 'var(--primary)',
    '--radio-checked-border': 'var(--primary)',
    '--radio-dot': 'var(--primary-foreground)',
    '--radio-hover-border': 'var(--primary)',
    '--radio-focus-ring': 'var(--ring)',
    '--radio-disabled-opacity': '0.5',
  };
  return (
    <fieldset className={`radio-group-fieldset ${className || ''}`} style={{ ...cssVars, ...style }} {...props}>
      <legend className="radio-group-legend">{legend}</legend>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const isChecked = value === opt.value;
        const itemVars = {
          '--radio-item-bg': isChecked ? 'var(--primary)' : 'var(--background)',
          '--radio-item-border': isChecked ? 'var(--primary)' : 'var(--border)',
        };
        return (
          <label key={opt.value} className="radio-item" style={itemVars}>
            <input
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={(e) => onChange(e.target.value)}
              disabled={opt.disabled}
              className="radio-item__input"
              aria-invalid={Boolean(error)}
              aria-describedby={errorId}
            />
            <Label htmlFor={id}>{opt.label}</Label>
          </label>
        );
      })}
      {error && (
        <p role="alert" id={errorId} className="input-error">
          {error}
        </p>
      )}
    </fieldset>
  );
};

export { RadioGroup };
