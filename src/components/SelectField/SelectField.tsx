import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { FormField, FormFieldProps } from '../FormField/FormField';
import { useMicroInteraction } from '../../hooks';

export interface SelectFieldProps
  extends Omit<HTMLMotionProps<'select'>, 'id'>,
    Pick<FormFieldProps, 'id' | 'label' | 'description' | 'error' | 'required'> {
  wrapperClassName?: string;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ( 
    { id, label, description, error, required, wrapperClassName, className, children, ...props },
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
        <motion.select
          ref={ref}
          className={clsx(
            'input',
            error && 'input--error',
            className,
          )}
          {...micro}
          {...props}
        >
          {children}
        </motion.select>
      </FormField>
    );
  },
);

SelectField.displayName = 'SelectField';

export default SelectField;
