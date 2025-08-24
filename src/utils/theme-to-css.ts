/**
 * Utility to convert theme objects to CSS variables
 */

import { ThemeTokens as Theme } from '../theme/theme.light';

/**
 * Converts a theme object to CSS custom properties
 * @param theme - Theme object to convert
 * @returns CSS string with custom properties
 */
export function themeToCSS(theme: Theme): string {
  const cssVars: string[] = [];
  
  // Convert colors
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      // Handle nested color objects (e.g., primary.DEFAULT)
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            const varName = subKey === 'DEFAULT' 
              ? `--${key}` 
              : `--${key}-${subKey.toLowerCase()}`;
            cssVars.push(`${varName}: ${subValue};`);
          }
        });
      } else if (typeof value === 'string') {
        cssVars.push(`--${key}: ${value};`);
      }
    });
  }
  
  // Convert spacing
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([key, value]) => {
      cssVars.push(`--spacing-${key}: ${value};`);
    });
  }
  
  // Convert typography
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
        const fontValue = Array.isArray(value) ? value.join(', ') : value;
        cssVars.push(`--font-family-${key}: ${fontValue};`);
      });
    }
    
    if (theme.typography.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        cssVars.push(`--font-size-${key}: ${value};`);
      });
    }
  }
  
  // Convert border radius
  if (theme.borderRadius) {
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      const varName = key === 'DEFAULT' ? '--radius' : `--radius-${key}`;
      cssVars.push(`${varName}: ${value};`);
    });
  }
  
  // Convert shadows
  if (theme.boxShadow) {
    Object.entries(theme.boxShadow).forEach(([key, value]) => {
      cssVars.push(`--shadow-${key}: ${value};`);
    });
  }
  
  return cssVars.join('\n  ');
}

/**
 * Injects CSS variables into the document
 * @param theme - Theme object to inject
 * @param selector - CSS selector to inject into (default: ':root')
 */
export function injectThemeCSS(theme: Theme, selector: string = ':root'): void {
  const cssText = themeToCSS(theme);
  const styleId = 'theme-variables';
  
  // Remove existing theme styles
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Create new style element
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `${selector} {\n  ${cssText}\n}`;
  
  // Insert at the beginning of head to allow overrides
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Component-specific theme variables
 */
export interface ComponentThemeVars {
  [key: string]: string | undefined;
}

/**
 * Gets CSS variables for a specific component from theme
 * @param componentName - Name of the component
 * @param variant - Component variant
 * @param theme - Theme object
 * @returns Object with CSS variable definitions
 */
export function getComponentVars(
  componentName: string,
  variant: string,
  theme: Theme
): ComponentThemeVars {
  const vars: ComponentThemeVars = {};
  
  // Map component variants to theme colors
  const variantMap: Record<string, Record<string, string>> = {
    button: {
      primary: 'primary',
      secondary: 'secondary',
      destructive: 'destructive',
      outline: 'border',
      ghost: 'muted',
      success: 'success',
      link: 'primary',
    },
    badge: {
      default: 'secondary',
      primary: 'primary',
      secondary: 'secondary',
      destructive: 'destructive',
      success: 'success',
      warning: 'warning',
      error: 'destructive',
    },
    alert: {
      default: 'secondary',
      success: 'success',
      warning: 'warning',
      error: 'destructive',
      info: 'info',
    }
  };
  
  const colorKey = variantMap[componentName]?.[variant];
  
  if (colorKey && theme.colors) {
    const color = (theme.colors as any)[colorKey];
    
    if (typeof color === 'object' && color !== null && !Array.isArray(color)) {
      vars[`--${componentName}-bg`] = color.DEFAULT || color.background || color['500'];
      vars[`--${componentName}-text`] = color.foreground || '#ffffff';
      vars[`--${componentName}-border`] = color.border || color.DEFAULT || color['500'];
    } else if (typeof color === 'string') {
      vars[`--${componentName}-bg`] = color;
      vars[`--${componentName}-text`] = (theme.colors as any)[`${colorKey}Foreground`] || '#ffffff';
      vars[`--${componentName}-border`] = color;
    }
  }
  
  return vars;
}

/**
 * Merges CSS variable objects
 */
export function mergeVars(...varObjects: ComponentThemeVars[]): ComponentThemeVars {
  return Object.assign({}, ...varObjects);
}