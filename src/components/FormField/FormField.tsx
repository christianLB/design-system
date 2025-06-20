import React from 'react';
import clsx from 'clsx';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactElement;
}

/**
 * FormField aligns a label, input element and validation messages.
 * It clones the child element to apply accessibility attributes.
 */
export const FormField = ({
  id,
  label,
  description,
  error,
  required,
  children,
  className,
  ...props
}: FormFieldProps) => {
  const descId = description ? `${id}-desc` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  const child = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<any>, {
        id,
        'aria-describedby': [descId, errorId].filter(Boolean).join(' ') || undefined,
        'aria-invalid': !!error,
        required,
      } as any)
    : children;

  return (
    <div className={clsx('flex flex-col gap-1', className)} {...props}>
      <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="ml-0.5 text-[var(--destructive)]">*</span>}
      </label>
      {description && (
        <p id={descId} className="text-xs text-[var(--muted-foreground)]">
          {description}
        </p>
      )}
      {child}
      {error && (
        <p role="alert" id={errorId} className="text-xs text-[var(--destructive)]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
