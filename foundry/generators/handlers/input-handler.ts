/**
 * Input Handler
 *
 * Handles: Input, Textarea, Select, Checkbox, Radio, Switch
 * Generates both standalone components and FormField-wrapped versions
 */

import type { ComponentSchema, GenerationContext, ElementConfig } from '../core/types';
import { BaseCategoryHandler } from './base-handler';
import { getElementConfigByTag } from '../core/element-configs';

export class InputHandler extends BaseCategoryHandler {
  readonly category = 'input' as const;

  /**
   * Override to detect element type from schema
   */
  getElementConfig(schema: ComponentSchema): ElementConfig {
    // Explicit element tag in schema
    if (schema.element?.tag) {
      return getElementConfigByTag(schema.element.tag, schema.element.inputType);
    }

    // Check slots for element type
    if (schema.slots?.input?.element) {
      const el = schema.slots.input.element;
      if (el === 'textarea') return getElementConfigByTag('textarea');
      if (el === 'select') return getElementConfigByTag('select');
    }

    // Default to input
    return getElementConfigByTag('input');
  }

  generateBaseClasses(schema: ComponentSchema): string {
    const config = this.getElementConfig(schema);
    const inputType = schema.element?.inputType;

    // Checkbox/Radio have different base classes
    if (inputType === 'checkbox' || inputType === 'radio') {
      return [
        'peer',
        'shrink-0',
        'border',
        'border-input',
        'bg-background',
        'text-primary',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2',
        'disabled:cursor-not-allowed',
        'disabled:opacity-50',
        inputType === 'radio' ? 'rounded-full' : 'rounded',
      ].join(' ');
    }

    // Standard input/textarea/select classes
    return [
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'text-foreground',
      'transition-colors',
      'placeholder:text-muted-foreground',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'aria-invalid:border-destructive',
      'aria-invalid:ring-destructive',
    ].join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const inputType = schema.element?.inputType;

    // Size variants
    if (schema.variants.size) {
      if (inputType === 'checkbox' || inputType === 'radio') {
        result.size = {
          sm: 'h-3.5 w-3.5',
          md: 'h-4 w-4',
          lg: 'h-5 w-5',
        };
      } else {
        result.size = {
          sm: 'h-8 px-3 text-sm',
          md: 'h-10 px-4 text-sm',
          lg: 'h-12 px-5 text-base',
        };
      }
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig, slots } = context;
    const variantKeys = Object.keys(schema.variants).join(', ');
    const inputType = schema.element?.inputType;

    // Check for adornments
    const hasStartAdornment = slots.some(
      (s) => s.name === 'startAdornment' || s.name === 'startIcon'
    );
    const hasEndAdornment = slots.some(
      (s) => s.name === 'endAdornment' || s.name === 'endIcon'
    );

    // Void elements (input)
    if (elementConfig.isVoid) {
      // With adornments: wrap in div
      if (hasStartAdornment || hasEndAdornment) {
        return this.generateWithAdornmentWrapper(context, variantKeys);
      }

      // Simple input
      const typeAttr = inputType ? `type="${inputType}"` : '';
      return `
      <${elementConfig.tag}
        ref={ref}
        ${typeAttr}
        className={cn(${schema.name.toLowerCase()}Variants({ ${variantKeys} }), className)}
        {...rest}
      />
      `.trim();
    }

    // Non-void elements (textarea, select)
    return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${schema.name.toLowerCase()}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
      </${elementConfig.tag}>
    `.trim();
  }

  /**
   * Generate input with start/end adornment wrapper
   */
  private generateWithAdornmentWrapper(
    context: GenerationContext,
    variantKeys: string
  ): string {
    const { schema, elementConfig } = context;
    const inputType = schema.element?.inputType;
    const typeAttr = inputType ? `type="${inputType}"` : '';

    return `
      <div className="relative flex items-center">
        {startAdornment && (
          <span className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            {startAdornment}
          </span>
        )}
        <${elementConfig.tag}
          ref={ref}
          ${typeAttr}
          className={cn(
            ${schema.name.toLowerCase()}Variants({ ${variantKeys} }),
            startAdornment && 'pl-10',
            endAdornment && 'pr-10',
            className
          )}
          {...rest}
        />
        {endAdornment && (
          <span className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
            {endAdornment}
          </span>
        )}
      </div>
    `.trim();
  }

  /**
   * Generate FormField-wrapped version for forms
   */
  generateFieldWrapper(context: GenerationContext): string {
    const { schema, elementConfig } = context;

    // Skip for checkbox/radio - they have different composition patterns
    const inputType = schema.element?.inputType;
    if (inputType === 'checkbox' || inputType === 'radio') {
      return this.generateCheckboxFieldWrapper(context);
    }

    return `
/**
 * ${schema.name}Field
 *
 * FormField-wrapped version with label, description, error support.
 * Ready for react-hook-form integration.
 */
export interface ${schema.name}FieldProps
  extends Omit<${schema.name}Props, 'id'> {
  /** Field name - required for form handling */
  name: string;
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** ID override (defaults to name) */
  id?: string;
}

export const ${schema.name}Field = React.forwardRef<${elementConfig.refType}, ${schema.name}FieldProps>(
  ({ name, label, description, error, required, id, className, ...props }, ref) => {
    const fieldId = id || name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={fieldId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        <${schema.name}
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={description ? \`\${fieldId}-description\` : undefined}
          className={className}
          {...props}
        />
        {description && !error && (
          <p id={\`\${fieldId}-description\`} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

${schema.name}Field.displayName = '${schema.name}Field';
`.trim();
  }

  /**
   * Generate CheckboxField/RadioField with inline label pattern
   */
  private generateCheckboxFieldWrapper(context: GenerationContext): string {
    const { schema, elementConfig } = context;

    return `
/**
 * ${schema.name}Field
 *
 * Checkbox/Radio with inline label support.
 * Ready for react-hook-form integration.
 */
export interface ${schema.name}FieldProps
  extends Omit<${schema.name}Props, 'id'> {
  /** Field name - required for form handling */
  name: string;
  /** Inline label */
  label?: string;
  /** Additional description */
  description?: string;
  /** Error message */
  error?: string;
  /** ID override (defaults to name) */
  id?: string;
}

export const ${schema.name}Field = React.forwardRef<${elementConfig.refType}, ${schema.name}FieldProps>(
  ({ name, label, description, error, id, className, ...props }, ref) => {
    const fieldId = id || name;

    return (
      <div className="flex items-start space-x-3">
        <${schema.name}
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={!!error}
          className={className}
          {...props}
        />
        <div className="space-y-1 leading-none">
          {label && (
            <label
              htmlFor={fieldId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

${schema.name}Field.displayName = '${schema.name}Field';
`.trim();
  }
}

export const inputHandler = new InputHandler();
