import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '../Label';
import { useMicroInteraction } from '../../hooks';

export interface InputFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  layout?: 'vertical' | 'inline';
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      error,
      disabled,
      placeholder,
      layout = 'vertical',
      className,
      ...props
    },
    ref
  ) => {
    const wrapperClasses = [
      'input-wrapper',
      layout === 'inline' ? 'input-wrapper--inline' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');
    const errorId = error ? `${id}-error` : undefined;
    const micro = useMicroInteraction('input');

    return (
      <div className={wrapperClasses}>
        <Label htmlFor={id}>{label}</Label>
        <motion.input
          ref={ref}
          id={id}
          className={`input ${error ? 'input--error' : ''}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          disabled={disabled}
          {...micro}
          {...props}
        />
        {error && (
          <p role="alert" id={errorId} className="input-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export { InputField };
