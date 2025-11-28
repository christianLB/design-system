/**
 * Core Types for Foundry Component Generator
 *
 * @generated DO NOT EDIT
 */

// Component categories as defined in schema
export type ComponentCategory =
  | 'action'
  | 'input'
  | 'surface'
  | 'display'
  | 'feedback'
  | 'layout'
  | 'navigation'
  | 'overlay';

// HTML element configuration
export interface ElementConfig {
  /** Primary HTML tag (e.g., 'button', 'input', 'div') */
  tag: string;
  /** React HTML attributes type (e.g., 'ButtonHTMLAttributes<HTMLButtonElement>') */
  attributesType: string;
  /** React ref type (e.g., 'HTMLButtonElement') */
  refType: string;
  /** Whether element is void/self-closing (like <input />) */
  isVoid: boolean;
  /** Default ARIA role if applicable */
  defaultRole?: string;
}

// Slot definition from schema
export interface SlotDefinition {
  name: string;
  description: string;
  element: string;
  optional: boolean;
}

// Variant configuration from schema
export interface VariantConfig {
  description: string;
  values: string[];
  default: string;
}

// Props configuration from schema
export interface PropConfig {
  type: string;
  default?: unknown;
  description: string;
  required?: boolean;
}

// Component schema structure
export interface ComponentSchema {
  $schema?: string;
  name: string;
  description: string;
  category: ComponentCategory;
  element?: {
    tag?: string;
    inputType?: string;
  };
  formField?: {
    enabled?: boolean;
    name?: string;
  };
  primitive?: {
    package: string;
    component: string;
    usage?: string;
  };
  variants: Record<string, VariantConfig>;
  slots?: Record<
    string,
    {
      description: string;
      element: string;
      optional?: boolean;
    }
  >;
  states?: Record<
    string,
    {
      description?: string;
      attribute?: string;
      prop?: string;
    }
  >;
  props?: Record<string, PropConfig>;
  tokens?: {
    base?: Record<string, string>;
    size?: Record<string, Record<string, string>>;
    intent?: Record<string, Record<string, string | Record<string, string>>>;
    variant?: Record<string, Record<string, string>>;
    state?: Record<string, Record<string, string>>;
  };
  accessibility?: Record<string, string>;
  examples?: Array<{
    name: string;
    props: Record<string, unknown>;
    children?: unknown;
  }>;
}

// Generation context passed to handlers
export interface GenerationContext {
  schema: ComponentSchema;
  category: ComponentCategory;
  elementConfig: ElementConfig;
  slots: SlotDefinition[];
  outputDir: string;
}

// Handler interface - the core contract for category handlers
export interface CategoryHandler {
  readonly category: ComponentCategory;

  /** Get element configuration for this component */
  getElementConfig(schema: ComponentSchema): ElementConfig;

  /** Generate base CSS classes for this category */
  generateBaseClasses(schema: ComponentSchema): string;

  /** Generate variant class mappings (for CVA) */
  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>>;

  /** Generate component body/JSX */
  generateComponentBody(context: GenerationContext): string;

  /** Generate FormField wrapper component (optional, for input category) */
  generateFieldWrapper?(context: GenerationContext): string;

  /** Generate additional exports like compound components (optional) */
  generateAdditionalExports?(context: GenerationContext): string;
}

// Helper to extract slots from schema
export function extractSlots(schema: ComponentSchema): SlotDefinition[] {
  if (!schema.slots) return [];

  return Object.entries(schema.slots).map(([name, config]) => ({
    name,
    description: config.description,
    element: config.element,
    optional: config.optional ?? false,
  }));
}

// Helper to convert to camelCase
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// Helper to convert to PascalCase
export function toPascalCase(str: string): string {
  const camel = toCamelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}
