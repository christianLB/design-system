import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { FormField, FormFieldProps } from '../FormField/FormField';
import { useMicroInteraction } from '../../hooks';

export interface TextFieldProps
  extends Omit<HTMLMotionProps<'input'>, 'id'>,
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
    const micro = useMicroInteraction('input');
    return (
      <FormField
        id={id}
        label={label}
        description={description}
        error={error}
        required={required}
        className={wrapperClassName}
      >
        <motion.input
          ref={ref}
          type={type}
          className={clsx(
            'w-full rounded-[var(--radius)] border border-[var(--input)] bg-[var(--background)] p-2 text-sm',
            'focus:outline-none focus:border-[var(--ring)]',
            className,
          )}
          {...micro}
          {...props}
        />
      </FormField>
    );
  },
);

TextField.displayName = 'TextField';

export default TextField;
