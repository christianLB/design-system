/**
 * Form Component
 *
 * A form wrapper that integrates with react-hook-form
 * for validation and state management.
 */

import * as React from 'react';
import {
  FormProvider,
  useFormContext,
  useController,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormReturn,
  type SubmitHandler,
  type SubmitErrorHandler,
} from 'react-hook-form';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useFormValidation, type UseFormValidationOptions } from '../../hooks/useFormValidation';

const formVariants = cva('', {
  variants: {
    layout: {
      vertical: 'space-y-4',
      horizontal: 'space-y-4 [&_>_*]:flex [&_>_*]:items-start [&_>_*]:gap-4',
      inline: 'flex flex-wrap gap-4 items-end',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export interface FormProps<T extends FieldValues>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError'>,
    VariantProps<typeof formVariants> {
  /** Form instance from useFormValidation or useForm */
  form?: UseFormReturn<T>;
  /** Form options if not providing form instance */
  formOptions?: UseFormValidationOptions<T>;
  /** Submit handler */
  onSubmit: SubmitHandler<T>;
  /** Error handler */
  onError?: SubmitErrorHandler<T>;
  /** Show validation summary */
  showValidationSummary?: boolean;
  /** Show success message after successful submit */
  showSuccessMessage?: boolean;
  /** Success message text */
  successMessage?: string;
  /** Disable form while submitting */
  disableOnSubmit?: boolean;
  /** Reset form after successful submit */
  resetOnSubmit?: boolean;
}

function FormComponent<T extends FieldValues>(
  {
    form: externalForm,
    formOptions,
    onSubmit,
    onError,
    layout,
    showValidationSummary = false,
    showSuccessMessage = false,
    successMessage = 'Form submitted successfully',
    disableOnSubmit = true,
    resetOnSubmit = false,
    children,
    className,
    ...props
  }: FormProps<T>,
  ref: React.ForwardedRef<HTMLFormElement>,
) {
  const internalForm = useFormValidation<T>(formOptions);
  const form = externalForm || internalForm;
  const [showSuccess, setShowSuccess] = React.useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = form;

  const errorMessages = React.useMemo(() => {
    const messages: string[] = [];
    const extractMessages = (errs: typeof errors, prefix = '') => {
      Object.entries(errs).forEach(([key, value]) => {
        if (value?.message) {
          messages.push(value.message as string);
        } else if (typeof value === 'object') {
          extractMessages(value as typeof errors, `${prefix}${key}.`);
        }
      });
    };
    extractMessages(errors);
    return messages;
  }, [errors]);

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    setShowSuccess(false);
    await onSubmit(data);
    if (showSuccessMessage) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    if (resetOnSubmit) {
      reset();
    }
  };

  return (
    <FormProvider {...form}>
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit, onError)}
        className={cn(formVariants({ layout }), className)}
        noValidate
        {...props}
      >
        <fieldset disabled={disableOnSubmit && isSubmitting} className="contents">
          {/* Validation summary */}
          {showValidationSummary && errorMessages.length > 0 && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <div className="flex items-center gap-2 text-destructive font-medium mb-2">
                <AlertCircle className="h-4 w-4" />
                <span>Please fix the following errors:</span>
              </div>
              <ul className="list-disc list-inside text-sm text-destructive/80 space-y-1">
                {errorMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Success message */}
          {showSuccess && (
            <div className="rounded-lg border border-success/50 bg-success/10 p-4">
              <div className="flex items-center gap-2 text-success font-medium">
                <CheckCircle className="h-4 w-4" />
                <span>{successMessage}</span>
              </div>
            </div>
          )}

          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}

export const Form = React.forwardRef(FormComponent) as <T extends FieldValues>(
  props: FormProps<T> & { ref?: React.ForwardedRef<HTMLFormElement> },
) => React.ReactElement;

(Form as React.FC).displayName = 'Form';

/**
 * FormField - Wrapper for form field with label, error, and hint
 */
const formFieldVariants = cva('', {
  variants: {
    layout: {
      vertical: 'flex flex-col gap-1.5',
      horizontal: 'flex items-start gap-4',
    },
  },
  defaultVariants: {
    layout: 'vertical',
  },
});

export interface FormFieldProps<T extends FieldValues>
  extends VariantProps<typeof formFieldVariants> {
  /** Field name */
  name: Path<T>;
  /** Field label */
  label?: string;
  /** Hint text */
  hint?: string;
  /** Whether field is required */
  required?: boolean;
  /** Custom error message */
  error?: string;
  /** Children (input element) */
  children: React.ReactElement;
  /** Additional class name */
  className?: string;
  /** Label width for horizontal layout */
  labelWidth?: string;
}

export function FormField<T extends FieldValues>({
  name,
  label,
  hint,
  required,
  error: customError,
  layout,
  labelWidth = '120px',
  children,
  className,
}: FormFieldProps<T>) {
  const { formState } = useFormContext<T>();
  const fieldError = formState.errors[name];
  const error = customError || (fieldError?.message as string | undefined);
  const hasError = !!error;

  return (
    <div className={cn(formFieldVariants({ layout }), className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            'text-sm font-medium',
            layout === 'horizontal' && 'pt-2',
            hasError && 'text-destructive',
          )}
          style={layout === 'horizontal' ? { minWidth: labelWidth } : undefined}
        >
          {label}
          {required && <span className="text-destructive ml-0.5">*</span>}
        </label>
      )}
      <div className="flex-1 space-y-1">
        {React.cloneElement(children, {
          id: name,
          'aria-invalid': hasError,
          'aria-describedby': hasError ? `${name}-error` : hint ? `${name}-hint` : undefined,
          className: cn(
            children.props.className,
            hasError && 'border-destructive focus-visible:ring-destructive',
          ),
        })}
        {hint && !hasError && (
          <p id={`${name}-hint`} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}
        {hasError && (
          <p id={`${name}-error`} className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

FormField.displayName = 'FormField';

/**
 * ControlledField - For controlled inputs with validation
 */
export interface ControlledFieldProps<T extends FieldValues> {
  name: Path<T>;
  rules?: RegisterOptions;
  defaultValue?: T[Path<T>];
  children: (field: {
    value: T[Path<T>];
    onChange: (value: T[Path<T>]) => void;
    onBlur: () => void;
    error?: string;
    hasError: boolean;
    ref: React.Ref<unknown>;
  }) => React.ReactElement;
}

export function ControlledField<T extends FieldValues>({
  name,
  rules,
  defaultValue,
  children,
}: ControlledFieldProps<T>) {
  const { control } = useFormContext<T>();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return children({
    value: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
    ref: field.ref,
    error: error?.message,
    hasError: !!error,
  });
}

ControlledField.displayName = 'ControlledField';

/**
 * FormActions - Container for form action buttons
 */
export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alignment */
  align?: 'left' | 'center' | 'right' | 'between';
}

export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(
  ({ align = 'right', className, children, ...props }, ref) => {
    const alignClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-3 pt-4', alignClasses[align], className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FormActions.displayName = 'FormActions';

export { formVariants, formFieldVariants };
export default Form;
