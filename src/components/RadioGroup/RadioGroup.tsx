import React from 'react';
import { Label } from '../Label';

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
  ...props
}: RadioGroupProps) => {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <fieldset className={`radio-group-fieldset ${className || ''}`} {...props}>
      <legend className="radio-group-legend">{legend}</legend>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        return (
          <label key={opt.value} className="radio-item">
            <input
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={value === opt.value}
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
