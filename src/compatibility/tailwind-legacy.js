/**
 * Design System - Legacy Tailwind Compatibility
 * 
 * This file provides backward compatibility for applications still using
 * the legacy variable names from v1.x. It maps legacy variable names to
 * their new standardized equivalents.
 * 
 * Usage in consuming application:
 * 
 * ```js
 * // tailwind.config.js
 * module.exports = {
 *   presets: [
 *     require('@k2600x/design-system/tailwind.preset.js'),
 *     require('@k2600x/design-system/src/compatibility/tailwind-legacy.js'),
 *   ],
 *   // rest of your config
 * }
 * ```
 * 
 * @deprecated This compatibility layer will be removed in v3.0.0
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Legacy color mappings (v1.x compatibility)
        'app-bg': 'var(--app-bg)',
        'app-content-bg': 'var(--app-content-bg)',
        'app-border-color': 'var(--app-border-color)',
        'text-color': 'var(--text-color)',
        'text-inverse-color': 'var(--text-inverse-color)',
        'text-muted-color': 'var(--text-muted-color)',
        'color-primary': 'var(--color-primary)',
        'color-secondary': 'var(--color-secondary)',
        'color-accent': 'var(--color-accent)',
        'color-destructive': 'var(--color-destructive)',
        'input-bg': 'var(--input-bg)',
        'input-border': 'var(--input-border)',
        'input-text-color': 'var(--input-text-color)',
        
        // Legacy variant mappings
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--text-inverse-color)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--text-inverse-color)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--app-content-bg)',
          foreground: 'var(--text-muted-color)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--accent-foreground)',
        },
      },
    }
  }
};
