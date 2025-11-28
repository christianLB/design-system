/**
 * Action Handler
 *
 * Handles: Button, Link components
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class ActionHandler extends BaseCategoryHandler {
  readonly category = 'action' as const;

  generateBaseClasses(_schema: ComponentSchema): string {
    return [
      'inline-flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-medium',
      'rounded-md',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
    ].join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};

    // Intent variants (semantic colors)
    if (schema.variants.intent) {
      result.intent = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      };
    }

    // Size variants
    if (schema.variants.size) {
      result.size = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      };
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig, slots } = context;
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Check for icon slots
    const hasLeftIcon = slots.some(
      (s) => s.name === 'iconStart' || s.name === 'leftIcon'
    );
    const hasRightIcon = slots.some(
      (s) => s.name === 'iconEnd' || s.name === 'rightIcon'
    );

    const leftIconSlot = hasLeftIcon
      ? '{(iconStart || leftIcon) && <span className="shrink-0">{iconStart || leftIcon}</span>}'
      : '';
    const rightIconSlot = hasRightIcon
      ? '{(iconEnd || rightIcon) && <span className="shrink-0">{iconEnd || rightIcon}</span>}'
      : '';

    return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${schema.name.toLowerCase()}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        ${leftIconSlot}
        {children}
        ${rightIconSlot}
      </${elementConfig.tag}>
    `.trim();
  }
}

export const actionHandler = new ActionHandler();
