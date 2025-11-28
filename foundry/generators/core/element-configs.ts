/**
 * Element Configurations
 *
 * Maps HTML elements to their React type definitions
 */

import type { ElementConfig, ComponentCategory } from './types';

/**
 * Element tag to configuration mapping
 */
export const ELEMENT_CONFIGS: Record<string, ElementConfig> = {
  button: {
    tag: 'button',
    attributesType: 'ButtonHTMLAttributes<HTMLButtonElement>',
    refType: 'HTMLButtonElement',
    isVoid: false,
    defaultRole: 'button',
  },
  input: {
    tag: 'input',
    attributesType: 'InputHTMLAttributes<HTMLInputElement>',
    refType: 'HTMLInputElement',
    isVoid: true,
  },
  'input:checkbox': {
    tag: 'input',
    attributesType: 'InputHTMLAttributes<HTMLInputElement>',
    refType: 'HTMLInputElement',
    isVoid: true,
  },
  'input:radio': {
    tag: 'input',
    attributesType: 'InputHTMLAttributes<HTMLInputElement>',
    refType: 'HTMLInputElement',
    isVoid: true,
  },
  textarea: {
    tag: 'textarea',
    attributesType: 'TextareaHTMLAttributes<HTMLTextAreaElement>',
    refType: 'HTMLTextAreaElement',
    isVoid: false,
  },
  select: {
    tag: 'select',
    attributesType: 'SelectHTMLAttributes<HTMLSelectElement>',
    refType: 'HTMLSelectElement',
    isVoid: false,
  },
  a: {
    tag: 'a',
    attributesType: 'AnchorHTMLAttributes<HTMLAnchorElement>',
    refType: 'HTMLAnchorElement',
    isVoid: false,
    defaultRole: 'link',
  },
  div: {
    tag: 'div',
    attributesType: 'HTMLAttributes<HTMLDivElement>',
    refType: 'HTMLDivElement',
    isVoid: false,
  },
  span: {
    tag: 'span',
    attributesType: 'HTMLAttributes<HTMLSpanElement>',
    refType: 'HTMLSpanElement',
    isVoid: false,
  },
  nav: {
    tag: 'nav',
    attributesType: 'HTMLAttributes<HTMLElement>',
    refType: 'HTMLElement',
    isVoid: false,
    defaultRole: 'navigation',
  },
  label: {
    tag: 'label',
    attributesType: 'LabelHTMLAttributes<HTMLLabelElement>',
    refType: 'HTMLLabelElement',
    isVoid: false,
  },
  article: {
    tag: 'article',
    attributesType: 'HTMLAttributes<HTMLElement>',
    refType: 'HTMLElement',
    isVoid: false,
    defaultRole: 'article',
  },
};

/**
 * Default element config per category
 */
export const CATEGORY_DEFAULTS: Record<ComponentCategory, ElementConfig> = {
  action: ELEMENT_CONFIGS.button,
  input: ELEMENT_CONFIGS.input,
  surface: ELEMENT_CONFIGS.div,
  display: ELEMENT_CONFIGS.span,
  feedback: { ...ELEMENT_CONFIGS.div, defaultRole: 'alert' },
  layout: ELEMENT_CONFIGS.div,
  navigation: ELEMENT_CONFIGS.nav,
};

/**
 * Get element config from tag name with optional input type
 */
export function getElementConfigByTag(tag: string, inputType?: string): ElementConfig {
  // Handle input types (checkbox, radio, etc.)
  if (tag === 'input' && inputType) {
    const key = `input:${inputType}`;
    if (ELEMENT_CONFIGS[key]) {
      return ELEMENT_CONFIGS[key];
    }
  }

  return ELEMENT_CONFIGS[tag] || ELEMENT_CONFIGS.div;
}

/**
 * Get default element config for a category
 */
export function getDefaultConfigForCategory(category: ComponentCategory): ElementConfig {
  return CATEGORY_DEFAULTS[category] || ELEMENT_CONFIGS.div;
}
