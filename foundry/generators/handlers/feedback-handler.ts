/**
 * Feedback Handler
 *
 * Handles: Alert, Badge, Toast, Progress
 * Components that communicate status or provide feedback to users
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class FeedbackHandler extends BaseCategoryHandler {
  readonly category = 'feedback' as const;

  generateBaseClasses(schema: ComponentSchema): string {
    const name = schema.name.toLowerCase();

    // Different base classes depending on component type
    const baseClassMap: Record<string, string[]> = {
      alert: [
        'relative',
        'w-full',
        'rounded-lg',
        'border',
        'p-4',
        '[&>svg~*]:pl-7',
        '[&>svg]:absolute',
        '[&>svg]:left-4',
        '[&>svg]:top-4',
        '[&>svg]:text-foreground',
      ],
      badge: [
        'inline-flex',
        'items-center',
        'rounded-full',
        'border',
        'font-semibold',
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2',
      ],
      toast: [
        'group',
        'pointer-events-auto',
        'relative',
        'flex',
        'w-full',
        'items-center',
        'justify-between',
        'space-x-4',
        'overflow-hidden',
        'rounded-md',
        'border',
        'p-6',
        'pr-8',
        'shadow-lg',
        'transition-all',
      ],
      progress: ['relative', 'w-full', 'overflow-hidden', 'rounded-full', 'bg-secondary'],
    };

    return (baseClassMap[name] || baseClassMap.alert).join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const name = schema.name.toLowerCase();

    // Intent/status variants
    if (schema.variants.intent || schema.variants.variant) {
      if (name === 'alert') {
        result.intent = {
          default: 'bg-background text-foreground',
          info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100 [&>svg]:text-blue-600',
          success:
            'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100 [&>svg]:text-green-600',
          warning:
            'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100 [&>svg]:text-yellow-600',
          error:
            'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100 [&>svg]:text-red-600',
        };
      } else if (name === 'badge') {
        result.variant = {
          default: 'border-transparent bg-primary text-primary-foreground',
          secondary: 'border-transparent bg-secondary text-secondary-foreground',
          outline: 'text-foreground',
          success: 'border-transparent bg-green-500 text-white',
          warning: 'border-transparent bg-yellow-500 text-white',
          error: 'border-transparent bg-red-500 text-white',
        };
      } else if (name === 'toast') {
        result.variant = {
          default: 'border bg-background text-foreground',
          success:
            'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
          error:
            'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
          warning:
            'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
        };
      }
    }

    // Size variants
    if (schema.variants.size) {
      if (name === 'badge') {
        result.size = {
          sm: 'px-2 py-0.5 text-xs',
          md: 'px-2.5 py-0.5 text-xs',
          lg: 'px-3 py-1 text-sm',
        };
      } else if (name === 'progress') {
        result.size = {
          sm: 'h-1',
          md: 'h-2',
          lg: 'h-4',
        };
      }
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const name = schema.name.toLowerCase();
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Progress has special rendering with indicator
    if (name === 'progress') {
      return `
      <${elementConfig.tag}
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        <div
          className="h-full w-full flex-1 bg-primary transition-all"
          style={{ transform: \`translateX(-\${100 - ((value ?? 0) / (max ?? 100)) * 100}%)\` }}
        />
      </${elementConfig.tag}>
      `.trim();
    }

    // Alert with icon slot
    if (name === 'alert') {
      return `
      <${elementConfig.tag}
        ref={ref}
        role="alert"
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {icon}
        {children}
      </${elementConfig.tag}>
      `.trim();
    }

    // Default: simple container
    return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
      </${elementConfig.tag}>
    `.trim();
  }

  /**
   * Generate compound sub-components for Alert
   */
  generateAdditionalExports(context: GenerationContext): string {
    const { schema } = context;
    const name = schema.name;
    const exports: string[] = [];

    if (name.toLowerCase() === 'alert') {
      exports.push(`
export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
`);
    }

    return exports.join('\n');
  }
}

export const feedbackHandler = new FeedbackHandler();
