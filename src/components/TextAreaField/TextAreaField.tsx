import React, { useEffect, useRef } from 'react';
import { Label } from '../Label';

export interface TextAreaFieldProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'onChange' | 'value'
  > {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  autoGrow?: boolean;
  layout?: 'vertical' | 'inline';
}

const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      error,
      autoGrow,
      layout = 'vertical',
      className,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const combinedRef = (node: HTMLTextAreaElement) => {
      internalRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
          node;
    };

    useEffect(() => {
      if (autoGrow && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [value, autoGrow]);

    const wrapperClasses = [
      'input-wrapper',
      layout === 'inline' ? 'input-wrapper--inline' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={wrapperClasses}>
        <Label htmlFor={id}>{label}</Label>
        <textarea
          ref={combinedRef}
          id={id}
          className={`textarea ${error ? 'textarea--error' : ''}`}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          {...props}
        />
        {error && (
          <p role="alert" id={errorId} className="input-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export { TextAreaField };
