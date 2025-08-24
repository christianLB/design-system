import * as React from 'react';
import { useTheme } from '../../theme/ThemeContext';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, style, ...props }, ref) => {
    const id = React.useId();
    const { activeTheme } = useTheme();
    
    // CSS variables for theming
    const cssVars = {
      '--checkbox-bg': props.checked ? 'var(--primary)' : 'var(--background)',
      '--checkbox-border': props.checked ? 'var(--primary)' : 'var(--border)',
      '--checkbox-check': 'var(--primary-foreground)',
      '--checkbox-hover-border': 'var(--primary)',
      '--checkbox-focus-ring': 'var(--ring)',
      '--checkbox-disabled-opacity': '0.5',
    };
    
    return (
      <div className={`checkbox-wrapper ${className || ''}`} style={style}>
        <input
          type="checkbox"
          ref={ref}
          id={id}
          className="checkbox"
          style={cssVars}
          {...props}
        />
        {label && <label htmlFor={id} className="checkbox-label">{label}</label>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
