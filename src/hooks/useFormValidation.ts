/**
 * useFormValidation Hook
 *
 * Integration hook for react-hook-form with built-in validation
 * utilities and error handling.
 */

import { useMemo, useCallback } from 'react';
import {
  useForm,
  type UseFormProps,
  type UseFormReturn,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type FieldErrors,
} from 'react-hook-form';

// Common validation patterns
export const validationPatterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
  decimal: /^\d+(\.\d+)?$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^\d{2}:\d{2}(:\d{2})?$/,
  creditCard:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  postalCodeUS: /^\d{5}(-\d{4})?$/,
  postalCodeUK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Common validation rules factory
export const createValidationRules = {
  required: (message = 'This field is required'): RegisterOptions => ({
    required: message,
  }),

  minLength: (min: number, message?: string): RegisterOptions => ({
    minLength: {
      value: min,
      message: message || `Must be at least ${min} characters`,
    },
  }),

  maxLength: (max: number, message?: string): RegisterOptions => ({
    maxLength: {
      value: max,
      message: message || `Must be at most ${max} characters`,
    },
  }),

  min: (min: number, message?: string): RegisterOptions => ({
    min: {
      value: min,
      message: message || `Must be at least ${min}`,
    },
  }),

  max: (max: number, message?: string): RegisterOptions => ({
    max: {
      value: max,
      message: message || `Must be at most ${max}`,
    },
  }),

  pattern: (pattern: RegExp, message: string): RegisterOptions => ({
    pattern: {
      value: pattern,
      message,
    },
  }),

  email: (message = 'Invalid email address'): RegisterOptions => ({
    pattern: {
      value: validationPatterns.email,
      message,
    },
  }),

  url: (message = 'Invalid URL'): RegisterOptions => ({
    pattern: {
      value: validationPatterns.url,
      message,
    },
  }),

  phone: (message = 'Invalid phone number'): RegisterOptions => ({
    pattern: {
      value: validationPatterns.phone,
      message,
    },
  }),

  numeric: (message = 'Must be a number'): RegisterOptions => ({
    pattern: {
      value: validationPatterns.numeric,
      message,
    },
  }),

  custom: <T>(
    validate: (value: T) => boolean | string | Promise<boolean | string>,
  ): RegisterOptions => ({
    validate,
  }),

  match: <TFieldValues extends FieldValues>(
    fieldName: Path<TFieldValues>,
    message = 'Fields must match',
  ): RegisterOptions => ({
    validate: (value: unknown, formValues: TFieldValues) =>
      value === formValues[fieldName] || message,
  }),
};

// Combine multiple rules
export function combineRules(...rules: RegisterOptions[]): RegisterOptions {
  return rules.reduce((acc, rule) => {
    // Merge validate functions
    if (rule.validate) {
      const existingValidate = acc.validate;
      if (typeof existingValidate === 'function' && typeof rule.validate === 'function') {
        const newValidate = rule.validate;
        acc.validate = async (value, formValues) => {
          const existingResult = await existingValidate(value, formValues);
          if (existingResult !== true) return existingResult;
          return newValidate(value, formValues);
        };
      } else if (typeof existingValidate === 'object' && typeof rule.validate === 'object') {
        acc.validate = { ...existingValidate, ...rule.validate };
      } else {
        acc.validate = rule.validate;
      }
    }
    return { ...acc, ...rule };
  }, {} as RegisterOptions);
}

export interface FormFieldState {
  error?: string;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
}

export interface UseFormValidationOptions<T extends FieldValues> extends UseFormProps<T> {
  /** Show errors only after submission attempt */
  showErrorsOnSubmit?: boolean;
  /** Auto-focus first error field */
  focusFirstError?: boolean;
  /** Debounce validation in ms */
  validationDebounce?: number;
}

export interface UseFormValidationReturn<T extends FieldValues> extends UseFormReturn<T> {
  /** Get field state (error, dirty, touched) */
  getFieldState: (name: Path<T>) => FormFieldState;
  /** Check if field has error */
  hasError: (name: Path<T>) => boolean;
  /** Get error message for field */
  getErrorMessage: (name: Path<T>) => string | undefined;
  /** All error messages as array */
  errorMessages: string[];
  /** Whether form has any errors */
  hasErrors: boolean;
  /** Register with common rules */
  registerWithRules: (
    name: Path<T>,
    rules: RegisterOptions,
  ) => ReturnType<UseFormReturn<T>['register']>;
  /** Reset specific fields */
  resetFields: (names: Path<T>[]) => void;
  /** Set multiple errors at once */
  setErrors: (errors: Partial<Record<Path<T>, string>>) => void;
}

export function useFormValidation<T extends FieldValues>(
  options: UseFormValidationOptions<T> = {},
): UseFormValidationReturn<T> {
  const {
    showErrorsOnSubmit = false,
    focusFirstError = true,
    validationDebounce,
    ...formOptions
  } = options;

  const form = useForm<T>({
    mode: showErrorsOnSubmit ? 'onSubmit' : 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: focusFirstError,
    ...formOptions,
  });

  const {
    formState: { errors, dirtyFields, touchedFields, isValidating },
    register,
    setError,
    reset,
  } = form;

  const getFieldState = useCallback(
    (name: Path<T>): FormFieldState => {
      const error = errors[name];
      return {
        error: error?.message as string | undefined,
        isDirty: !!dirtyFields[name],
        isTouched: !!touchedFields[name],
        isValidating,
      };
    },
    [errors, dirtyFields, touchedFields, isValidating],
  );

  const hasError = useCallback(
    (name: Path<T>): boolean => {
      return !!errors[name];
    },
    [errors],
  );

  const getErrorMessage = useCallback(
    (name: Path<T>): string | undefined => {
      const error = errors[name];
      return error?.message as string | undefined;
    },
    [errors],
  );

  const errorMessages = useMemo((): string[] => {
    const messages: string[] = [];
    const extractMessages = (errs: FieldErrors<T>, prefix = '') => {
      Object.entries(errs).forEach(([key, value]) => {
        if (value?.message) {
          messages.push(value.message as string);
        } else if (typeof value === 'object') {
          extractMessages(value as FieldErrors<T>, `${prefix}${key}.`);
        }
      });
    };
    extractMessages(errors);
    return messages;
  }, [errors]);

  const hasErrors = errorMessages.length > 0;

  const registerWithRules = useCallback(
    (name: Path<T>, rules: RegisterOptions) => {
      return register(name, rules);
    },
    [register],
  );

  const resetFields = useCallback(
    (names: Path<T>[]) => {
      const currentValues = form.getValues();
      const resetValues: Partial<T> = {};
      names.forEach((name) => {
        resetValues[name as keyof T] = undefined as T[keyof T];
      });
      reset({ ...currentValues, ...resetValues } as T, { keepErrors: false });
    },
    [form, reset],
  );

  const setErrors = useCallback(
    (errs: Partial<Record<Path<T>, string>>) => {
      Object.entries(errs).forEach(([name, message]) => {
        if (message) {
          setError(name as Path<T>, { type: 'manual', message });
        }
      });
    },
    [setError],
  );

  return {
    ...form,
    getFieldState,
    hasError,
    getErrorMessage,
    errorMessages,
    hasErrors,
    registerWithRules,
    resetFields,
    setErrors,
  };
}

/**
 * Hook for field-level validation status
 */
export function useFieldValidation<T extends FieldValues>(form: UseFormReturn<T>, name: Path<T>) {
  const {
    formState: { errors, dirtyFields, touchedFields },
  } = form;

  const error = errors[name];
  const isDirty = !!dirtyFields[name];
  const isTouched = !!touchedFields[name];
  const hasError = !!error;
  const errorMessage = error?.message as string | undefined;

  const showError = hasError && (isTouched || isDirty);

  return {
    error,
    isDirty,
    isTouched,
    hasError,
    errorMessage,
    showError,
  };
}

export default useFormValidation;
