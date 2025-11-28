/**
 * Layout Handler
 *
 * Handles: Container, Stack, HStack, VStack, Grid, Divider
 * Components for page structure and content organization
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class LayoutHandler extends BaseCategoryHandler {
  readonly category = 'layout' as const;

  generateBaseClasses(schema: ComponentSchema): string {
    const name = schema.name.toLowerCase();

    const baseClassMap: Record<string, string[]> = {
      container: ['w-full', 'mx-auto', 'px-4'],
      stack: ['flex', 'flex-col'],
      hstack: ['flex', 'flex-row', 'items-center'],
      vstack: ['flex', 'flex-col'],
      grid: ['grid'],
      divider: ['shrink-0', 'bg-border'],
      spacer: ['flex-grow'],
      box: [''],
      center: ['flex', 'items-center', 'justify-center'],
    };

    return (baseClassMap[name] || []).join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const name = schema.name.toLowerCase();

    // Size variants for Container
    if (schema.variants.size && name === 'container') {
      result.size = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
      };
    }

    // Gap/spacing variants
    if (schema.variants.gap) {
      result.gap = {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      };
    }

    // Alignment variants
    if (schema.variants.align) {
      if (name === 'stack' || name === 'vstack') {
        result.align = {
          start: 'items-start',
          center: 'items-center',
          end: 'items-end',
          stretch: 'items-stretch',
        };
      } else if (name === 'hstack') {
        result.align = {
          start: 'items-start',
          center: 'items-center',
          end: 'items-end',
          baseline: 'items-baseline',
          stretch: 'items-stretch',
        };
      }
    }

    // Justify variants
    if (schema.variants.justify) {
      result.justify = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      };
    }

    // Wrap variants
    if (schema.variants.wrap) {
      result.wrap = {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
      };
    }

    // Grid columns
    if (schema.variants.cols) {
      result.cols = {
        '1': 'grid-cols-1',
        '2': 'grid-cols-2',
        '3': 'grid-cols-3',
        '4': 'grid-cols-4',
        '5': 'grid-cols-5',
        '6': 'grid-cols-6',
        '12': 'grid-cols-12',
      };
    }

    // Divider orientation
    if (schema.variants.orientation) {
      result.orientation = {
        horizontal: 'h-px w-full',
        vertical: 'h-full w-px',
      };
    }

    // Padding variants
    if (schema.variants.padding) {
      result.padding = {
        none: 'p-0',
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      };
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const name = schema.name.toLowerCase();
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Divider is self-closing style (no children)
    if (name === 'divider') {
      return `
      <${elementConfig.tag}
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      />
      `.trim();
    }

    // Spacer is just an empty growing div
    if (name === 'spacer') {
      return `
      <${elementConfig.tag}
        ref={ref}
        aria-hidden="true"
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      />
      `.trim();
    }

    // Default: container with children
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
}

export const layoutHandler = new LayoutHandler();
