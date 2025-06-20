import React from 'react';
import clsx from 'clsx';
import { FormField, FormFieldProps } from '../FormField/FormField';

export interface DateFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'>,
    Pick<FormFieldProps, 'id' | 'label' | 'description' | 'error' | 'required'> {
  wrapperClassName?: string;
}

export const DateField = React.forwardRef<HTMLInputElement, DateFieldProps>(
  (
    { id, label, description, error, required, wrapperClassName, className, ...props },
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
          type="date"
          className={clsx(
            'w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--background)] p-2 text-sm',
            'focus:outline-none focus:border-[var(--ring)]',
            className,
          )}
          {...props}
        />
      </FormField>
    );
  },
);

DateField.displayName = 'DateField';

export default DateField;
