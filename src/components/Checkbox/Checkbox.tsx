import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className={`checkbox-wrapper ${className || ''}`}>
        <input
          type="checkbox"
          ref={ref}
          id={id}
          className="checkbox"
          {...props}
        />
        {label && <label htmlFor={id} className="checkbox-label">{label}</label>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
