/**
 * Base Handler
 *
 * Abstract base class for category handlers with shared functionality
 */

import type {
  CategoryHandler,
  ComponentCategory,
  ComponentSchema,
  ElementConfig,
  GenerationContext,
  SlotDefinition,
} from '../core/types';
import {
  ELEMENT_CONFIGS,
  getElementConfigByTag,
  getDefaultConfigForCategory,
} from '../core/element-configs';

export abstract class BaseCategoryHandler implements CategoryHandler {
  abstract readonly category: ComponentCategory;

  /**
   * Get element configuration from schema or category default
   */
  getElementConfig(schema: ComponentSchema): ElementConfig {
    // Check if schema explicitly specifies element
    if (schema.element?.tag) {
      return getElementConfigByTag(schema.element.tag, schema.element.inputType);
    }

    // Check slots.root.element or slots.input.element for the element type
    if (schema.slots?.root?.element) {
      return getElementConfigByTag(schema.slots.root.element);
    }
    if (schema.slots?.input?.element) {
      return getElementConfigByTag(schema.slots.input.element);
    }

    // Fall back to category default
    return getDefaultConfigForCategory(this.category);
  }

  /**
   * Generate base Tailwind classes - override in subclasses
   */
  abstract generateBaseClasses(schema: ComponentSchema): string;

  /**
   * Generate variant class mappings for CVA - override in subclasses
   */
  abstract generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>>;

  /**
   * Generate component body JSX - override in subclasses
   */
  abstract generateComponentBody(context: GenerationContext): string;

  /**
   * Get list of conflicting HTML attributes that need to be omitted
   */
  protected getOmittedAttributes(schema: ComponentSchema, elementConfig: ElementConfig): string[] {
    const omitted = ['ref'];

    // 'size' variant conflicts with HTML size attribute on input/select
    if (schema.variants.size && ['input', 'select', 'textarea'].includes(elementConfig.tag)) {
      omitted.push('size');
    }

    // 'content' prop conflicts with HTMLAttributes.content
    if (schema.slots?.content || schema.props?.content) {
      omitted.push('content');
    }

    return omitted;
  }

  /**
   * Generate type definitions for props interface
   */
  generatePropsInterface(context: GenerationContext): string {
    const { schema, elementConfig, slots } = context;
    const { name, variants, props } = schema;

    // Collect all prop names to avoid duplicates
    const definedProps = new Set<string>();

    // Variant prop types
    const variantTypes = Object.entries(variants)
      .map(([key, config]) => {
        definedProps.add(key);
        const values = config.values.map((v) => `'${v}'`).join(' | ');
        return `  ${key}?: ${values};`;
      })
      .join('\n');

    // Custom prop types from schema (skip if already defined as variant)
    const customProps = props
      ? Object.entries(props)
          .filter(([key]) => !definedProps.has(key))
          .map(([key, config]) => {
            definedProps.add(key);
            const optional = config.required ? '' : '?';
            const type = config.type.replace(/\bReactNode\b/g, 'React.ReactNode');
            return `  ${key}${optional}: ${type};`;
          })
          .join('\n')
      : '';

    // Slot prop types (for inline slots like icons) - skip if already defined
    const slotProps = slots
      .filter((s) => s.name !== 'root' && s.name !== 'input' && !definedProps.has(s.name))
      .map((slot) => `  ${slot.name}?: React.ReactNode;`)
      .join('\n');

    // Build omit list
    const omitted = this.getOmittedAttributes(schema, elementConfig);
    const omitString = omitted.map((o) => `'${o}'`).join(' | ');

    return `
export interface ${name}Props
  extends Omit<React.${elementConfig.attributesType}, ${omitString}>,
    VariantProps<typeof ${name.toLowerCase()}Variants> {
${variantTypes}
${customProps}
${slotProps}
  className?: string;
  children?: React.ReactNode;
}`.trim();
  }

  /**
   * Generate default variants object for CVA
   */
  generateDefaultVariants(schema: ComponentSchema): string {
    return Object.entries(schema.variants)
      .map(([key, config]) => `      ${key}: '${config.default}'`)
      .join(',\n');
  }

  /**
   * Generate props destructure list
   */
  generatePropsDestructure(context: GenerationContext): string {
    const { schema, slots } = context;
    const { variants, props } = schema;

    const parts: string[] = [
      ...Object.keys(variants),
      ...(props ? Object.keys(props) : []),
      ...slots.filter((s) => s.name !== 'root' && s.name !== 'input').map((s) => s.name),
      'className',
      'children',
    ];

    return parts.join(', ');
  }

  /**
   * Generate FormField wrapper - override in input handler
   */
  generateFieldWrapper?(context: GenerationContext): string;

  /**
   * Generate additional exports - override if needed
   */
  generateAdditionalExports?(context: GenerationContext): string;
}
