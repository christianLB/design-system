import React from 'react';
import clsx from 'clsx';
import { FormField, FormFieldProps } from '../FormField/FormField';

export interface CheckboxFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>,
    Pick<FormFieldProps, 'id' | 'label' | 'description' | 'error' | 'required'> {
  wrapperClassName?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxField = React.forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      id,
      label,
      description,
      error,
      required,
      wrapperClassName,
      className,
      checked,
      onChange,
      ...props
    },
    ref,
  ) => {
    return (
      <FormField
        id={id}
        label={label}
        description={description}
        error={error}
        required={required}
        className={wrapperClassName}
      >
        <input
          ref={ref}
          type="checkbox"
          className={clsx(
            'h-4 w-4 rounded border border-[var(--input)] text-[var(--primary)]',
            'focus:ring-[var(--ring)]',
            className,
          )}
          checked={checked}
          onChange={onChange}
          {...props}
        />
      </FormField>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';

export default CheckboxField;
