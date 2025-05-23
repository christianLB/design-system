/**
 * Design System - Recommended Safelist Configuration
 * 
 * This file provides a recommended safelist configuration for consuming applications
 * to ensure all design system components render correctly with Tailwind's JIT compiler.
 * 
 * Usage in consuming application:
 * 
 * ```js
 * // tailwind.config.js
 * const { safelist } = require('@k2600x/design-system/src/compatibility/safelist');
 * 
 * module.exports = {
 *   presets: [
 *     require('@k2600x/design-system/tailwind.preset.js')
 *   ],
 *   safelist,
 *   // rest of your config
 * }
 * ```
 */

/**
 * Generate all combinations of utility classes for theme colors
 * @param {string[]} utilities - Utility prefixes (e.g., 'bg', 'text', 'border')
 * @param {string[]} colors - Color names (e.g., 'primary', 'secondary')
 * @param {boolean} includeOpacity - Whether to include opacity variants
 * @returns {string[]} - Array of class names
 */
function generateColorUtilities(utilities, colors, includeOpacity = false) {
  const opacityValues = ['10', '20', '30', '40', '50', '60', '70', '80', '90'];
  
  return utilities.flatMap(utility => 
    colors.flatMap(color => [
      `${utility}-${color}`,
      `${utility}-${color}-foreground`,
      // Add opacity variants if requested and utility supports it
      ...(includeOpacity && ['bg', 'text', 'border'].includes(utility) 
        ? opacityValues.map(opacity => `${utility}-${color}/${opacity}`)
        : []
      )
    ])
  );
}

// Core theme colors
const themeColors = [
  'background', 'foreground', 'primary', 'secondary',
  'accent', 'muted', 'card', 'popover', 'destructive'
];

// Core utilities that use colors
const colorUtilities = [
  'bg', 'text', 'border', 'ring',
  'outline', 'divide', 'placeholder'
];

// Utilities that support opacity variants
const opacityUtilities = ['bg', 'text', 'border'];

// Generate the safelist
const safelist = [
  // Theme colors with utilities
  ...generateColorUtilities(colorUtilities, themeColors, true),
  
  // Border radius
  'rounded-lg', 'rounded-md', 'rounded-sm',
  
  // Common interactive states
  'hover:bg-primary/90', 'hover:bg-secondary/90',
  'hover:bg-destructive/90', 'hover:bg-accent/90',
  'hover:opacity-90', 'hover:opacity-80',
  'focus:ring-2', 'focus:ring-offset-2',
  'active:scale-95', 'disabled:opacity-50',
  
  // Common layout utilities
  'flex', 'items-center', 'justify-center', 'justify-between',
  'gap-1', 'gap-2', 'gap-3', 'gap-4',
  'p-1', 'p-2', 'p-3', 'p-4', 'px-4', 'py-2',
  'w-full', 'h-full', 'min-w-0', 'min-h-0',
  
  // Common typography
  'font-medium', 'font-semibold', 'font-bold',
  'text-sm', 'text-base', 'text-lg', 'text-xl',
  
  // Component-specific patterns
  {
    pattern: /^(btn|card|input|badge|table|dialog)-/,
  }
];

module.exports = {
  safelist,
  generateColorUtilities
};
