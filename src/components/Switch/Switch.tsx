import React, { useState, forwardRef, HTMLAttributes } from 'react';

export interface SwitchProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ 
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    disabled = false,
    className,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    const isControlled = checkedProp !== undefined;
    const isChecked = isControlled ? checkedProp : internalChecked;

    const handleClick = () => {
      if (disabled) return;
      const newChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const switchClasses = [
      'switch',
      isChecked ? 'switch--checked' : 'switch--unchecked',
      disabled ? 'switch--disabled' : '',
      className || ''
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleClick}
        className={switchClasses}
        {...props}
      >
        <span className="switch-thumb" />
      </button>
    );
  }
);

Switch.displayName = 'Switch';

export { Switch };
