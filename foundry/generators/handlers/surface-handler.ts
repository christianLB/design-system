/**
 * Surface Handler
 *
 * Handles: Card, Panel, Modal (with compound components)
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class SurfaceHandler extends BaseCategoryHandler {
  readonly category = 'surface' as const;

  generateBaseClasses(_schema: ComponentSchema): string {
    return [
      'rounded-lg',
      'border',
      'bg-card',
      'text-card-foreground',
      'overflow-hidden',
    ].join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};

    // Visual variants
    if (schema.variants.variant) {
      result.variant = {
        elevated: 'shadow-md border-transparent',
        outlined: 'shadow-none border-border',
        filled: 'shadow-none bg-muted border-transparent',
        ghost: 'shadow-none bg-transparent border-transparent',
      };
    }

    // Padding variants
    if (schema.variants.padding) {
      result.padding = {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      };
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const variantKeys = Object.keys(schema.variants).join(', ');

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
   * Generate compound sub-components for slots (Header, Title, Content, Footer)
   */
  generateAdditionalExports(context: GenerationContext): string {
    const { schema, slots } = context;
    const exports: string[] = [];

    // Slot configurations for compound components
    const slotConfigs: Record<string, { classes: string; tag: string; refType: string }> = {
      header: {
        classes: 'flex flex-col space-y-1.5 p-6',
        tag: 'div',
        refType: 'HTMLDivElement',
      },
      title: {
        classes: 'text-lg font-semibold leading-none tracking-tight',
        tag: 'h3',
        refType: 'HTMLHeadingElement',
      },
      description: {
        classes: 'text-sm text-muted-foreground',
        tag: 'p',
        refType: 'HTMLParagraphElement',
      },
      content: {
        classes: 'p-6 pt-0',
        tag: 'div',
        refType: 'HTMLDivElement',
      },
      footer: {
        classes: 'flex items-center p-6 pt-0',
        tag: 'div',
        refType: 'HTMLDivElement',
      },
    };

    for (const slot of slots) {
      if (slot.name === 'root') continue;

      const config = slotConfigs[slot.name];
      if (!config) continue;

      const componentName = `${schema.name}${slot.name.charAt(0).toUpperCase() + slot.name.slice(1)}`;

      exports.push(`
export const ${componentName} = React.forwardRef<
  ${config.refType},
  React.HTMLAttributes<${config.refType}>
>(({ className, ...props }, ref) => (
  <${config.tag}
    ref={ref}
    className={cn('${config.classes}', className)}
    {...props}
  />
));
${componentName}.displayName = '${componentName}';
`);
    }

    return exports.join('\n');
  }
}

export const surfaceHandler = new SurfaceHandler();
