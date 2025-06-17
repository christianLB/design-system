import React, { useState } from 'react';

export interface RadioGroupItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: RadioGroupItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  label?: string;
}

const RadioGroup = ({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  name = 'radio-group',
  disabled = false,
  orientation = 'vertical',
  label,
  className,
  ...props
}: RadioGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : internalValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const containerClasses = [
    'radio-group',
    `radio-group--${orientation}`,
    disabled ? 'radio-group--disabled' : '',
    className || ''
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} role="radiogroup" aria-label={label} {...props}>
      {label && <span className="radio-group__label">{label}</span>}
      <div className="radio-group__items-container">
        {items.map((item) => (
          <label
            key={item.value}
            className={`radio-item ${item.disabled || disabled ? 'radio-item--disabled' : ''}`}>
            <input
              type="radio"
              name={name}
              value={item.value}
              checked={currentValue === item.value}
              onChange={handleChange}
              disabled={disabled || item.disabled}
              className="radio-item__input"
            />
            <span className="radio-item__label">{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };