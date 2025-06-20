import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { FormField, FormFieldProps } from '../FormField/FormField';

export interface TextAreaFieldProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>,
    Pick<FormFieldProps, 'id' | 'label' | 'description' | 'error' | 'required'> {
  autoGrow?: boolean;
  wrapperClassName?: string;
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      id,
      label,
      description,
      error,
      required,
      autoGrow,
      wrapperClassName,
      className,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = (node: HTMLTextAreaElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
    };

    useEffect(() => {
      if (autoGrow && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [autoGrow, props.value]);

    return (
      <FormField
        id={id}
        label={label}
        description={description}
        error={error}
        required={required}
        className={wrapperClassName}
      >
        <textarea
          ref={combinedRef}
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

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
