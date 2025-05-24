import * as React from 'react';
import { cn } from '../../utils';

export interface RadioItem<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps<T extends string = string> 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of radio items to display
   */
  items: RadioItem<T>[];
  /**
   * The value of the currently selected radio item
   */
  value?: T;
  /**
   * The default value of the radio group
   */
  defaultValue?: T;
  /**
   * Callback when the selected value changes
   */
  onChange?: (value: T) => void;
  /**
   * The name attribute of the radio inputs
   * @default 'radio-group'
   */
  name?: string;
  /**
   * Whether the radio group is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * The size of the radio buttons
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The variant of the radio buttons
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  /**
   * The orientation of the radio group
   * @default 'vertical'
   */
  orientation?: 'vertical' | 'horizontal';
  /**
   * Whether to show a label for the radio group
   */
  label?: string;
  /**
   * Optional description text for the radio group
   */
  description?: string;
  /**
   * Optional error message to display
   */
  error?: string;
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

const labelSizeClasses = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
};

const variantClasses = {
  default: 'text-primary focus:ring-ring',
  primary: 'text-primary focus:ring-ring',
  success: 'text-success focus:ring-success/40',
  warning: 'text-warning focus:ring-warning/40',
  danger: 'text-destructive focus:ring-destructive/40',
};

/**
 * A group of radio buttons that allows single selection from a set of options.
 * @component
 * @example
 * // Basic usage
 * <RadioGroup 
 *   items={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   defaultValue="option1"
 *   onChange={(value) => console.log(value)}
 * />
 */
const RadioGroup = <T extends string = string>({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  name = 'radio-group',
  disabled = false,
  size = 'md',
  variant = 'default',
  orientation = 'vertical',
  label,
  description,
  error,
  className,
  ...props
}: RadioGroupProps<T>) => {
  const [value, setValue] = React.useState<T | undefined>(defaultValue);
  const isControlled = valueProp !== undefined;
  const currentValue = isControlled ? valueProp : value;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as T;
    if (!isControlled) {
      setValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1">
          {label}
        </label>
      )}
      {description && (
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
      )}
      <div 
        className={cn(
          orientation === 'horizontal' 
            ? 'flex flex-wrap gap-4 items-center' 
            : 'space-y-3',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        role="radiogroup"
        aria-label={label}
        aria-describedby={error ? `${name}-error` : undefined}
      >
        {items.map((item) => (
          <div 
            key={String(item.value)}
            className={cn(
              'flex items-start',
              orientation === 'horizontal' ? 'flex-shrink-0' : 'w-full',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center h-5">
              <input
                id={`${name}-${item.value}`}
                name={name}
                type="radio"
                value={item.value}
                checked={currentValue === item.value}
                onChange={handleChange}
                disabled={disabled || item.disabled}
                className={cn(
                  'rounded-full border border-border',
                  variantClasses[variant],
                  sizeClasses[size],
                  'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'transition-colors',
                  'cursor-pointer',
                  error && 'border-destructive focus:ring-destructive/30',
                  item.disabled && 'cursor-not-allowed'
                )}
                aria-describedby={error ? `${name}-error` : undefined}
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor={`${name}-${item.value}`}
                className={cn(
                  'block font-medium',
                  labelSizeClasses[size],
                  item.disabled ? 'text-muted-foreground' : 'text-foreground',
                  'cursor-pointer',
                  item.disabled && 'cursor-not-allowed'
                )}
              >
                {item.label}
              </label>
              {item.description && (
                <p 
                  className={cn(
                    'text-sm',
                    item.disabled ? 'text-muted-foreground/70' : 'text-muted-foreground'
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <p 
          id={`${name}-error`} 
          className="mt-2 text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };