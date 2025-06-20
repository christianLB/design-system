import React from 'react';
import clsx from 'clsx';
import { FormField, FormFieldProps } from '../FormField/FormField';

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>,
    Pick<FormFieldProps, 'id' | 'label' | 'description' | 'error' | 'required'> {
  wrapperClassName?: string;
}

/**
 * Text input with label, helper text and error message.
 */
export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      label,
      description,
      error,
      required,
      wrapperClassName,
      className,
      type = 'text',
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
          type={type}
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

TextField.displayName = 'TextField';

export default TextField;
