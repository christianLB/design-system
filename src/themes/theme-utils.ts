import { Theme } from './base.theme';

/**
 * Utility functions for theme manipulation and CSS variable generation
 */

/**
 * Generate CSS variables string from theme
 */
export function themeToCSSVariables(theme: Theme): string {
  const variables: string[] = [];

  // Color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    variables.push(`  --color-${key}: ${value};`);
  });

  // Typography variables
  variables.push(`  --font-family: ${theme.typography.fontFamily};`);
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    variables.push(`  --font-size-${key}: ${value};`);
  });

  // Spacing variables
  Object.entries(theme.spacing).forEach(([key, value]) => {
    variables.push(`  --spacing-${key}: ${value};`);
  });

  // Border radius variables
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    variables.push(`  --border-radius-${key}: ${value};`);
  });

  return `:root {\n${variables.join('\n')}\n}`;
}

/**
 * Merge two themes with deep merging
 */
export function mergeThemes(baseTheme: Theme, overrideTheme: Partial<Theme>): Theme {
  return {
    name: overrideTheme.name || baseTheme.name,
    colors: { ...baseTheme.colors, ...overrideTheme.colors },
    typography: {
      fontFamily: overrideTheme.typography?.fontFamily || baseTheme.typography.fontFamily,
      fontSize: { ...baseTheme.typography.fontSize, ...overrideTheme.typography?.fontSize },
    },
    spacing: { ...baseTheme.spacing, ...overrideTheme.spacing },
    borderRadius: { ...baseTheme.borderRadius, ...overrideTheme.borderRadius },
  };
}

/**
 * Validate theme structure
 */
export function validateTheme(theme: any): theme is Theme {
  const requiredKeys = ['name', 'colors', 'typography', 'spacing', 'borderRadius'];
  const requiredColorKeys = [
    'primary',
    'secondary',
    'background',
    'surface',
    'text',
    'textSecondary',
    'error',
    'warning',
    'success',
    'info',
  ];
  const requiredTypographyKeys = ['fontFamily', 'fontSize'];
  const requiredFontSizeKeys = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'];
  const requiredSpacingKeys = ['xs', 'sm', 'md', 'lg', 'xl'];
  const requiredBorderRadiusKeys = ['none', 'sm', 'base', 'md', 'lg', 'full'];

  // Check main structure
  if (!requiredKeys.every((key) => key in theme)) {
    return false;
  }

  // Check colors
  if (!requiredColorKeys.every((key) => key in theme.colors)) {
    return false;
  }

  // Check typography
  if (!requiredTypographyKeys.every((key) => key in theme.typography)) {
    return false;
  }

  if (!requiredFontSizeKeys.every((key) => key in theme.typography.fontSize)) {
    return false;
  }

  // Check spacing
  if (!requiredSpacingKeys.every((key) => key in theme.spacing)) {
    return false;
  }

  // Check border radius
  if (!requiredBorderRadiusKeys.every((key) => key in theme.borderRadius)) {
    return false;
  }

  return true;
}

/**
 * Create a dark variant of a theme
 */
export function createDarkVariant(theme: Theme): Theme {
  return {
    ...theme,
    name: `${theme.name}-dark`,
    colors: {
      ...theme.colors,
      background: '#1f2937',
      surface: '#374151',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
    },
  };
}

/**
 * Create a light variant of a theme
 */
export function createLightVariant(theme: Theme): Theme {
  return {
    ...theme,
    name: `${theme.name}-light`,
    colors: {
      ...theme.colors,
      background: '#ffffff',
      surface: '#f3f4f6',
      text: '#111827',
      textSecondary: '#6b7280',
    },
  };
}

/**
 * Get contrast ratio between two colors (simplified version)
 */
export function getContrastRatio(color1: string, color2: string): number {
  // This is a simplified version - in a real implementation,
  // you would use a proper color contrast calculation
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');

  const r1 = parseInt(hex1.substr(0, 2), 16);
  const g1 = parseInt(hex1.substr(2, 2), 16);
  const b1 = parseInt(hex1.substr(4, 2), 16);

  const r2 = parseInt(hex2.substr(0, 2), 16);
  const g2 = parseInt(hex2.substr(2, 2), 16);
  const b2 = parseInt(hex2.substr(4, 2), 16);

  const brightness1 = (r1 * 299 + g1 * 587 + b1 * 114) / 1000;
  const brightness2 = (r2 * 299 + g2 * 587 + b2 * 114) / 1000;

  return Math.abs(brightness1 - brightness2) / 255;
}

/**
 * Check if theme meets accessibility contrast requirements
 */
export function validateThemeAccessibility(theme: Theme): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const minContrast = 0.5; // Simplified threshold

  // Check text on background
  if (getContrastRatio(theme.colors.text, theme.colors.background) < minContrast) {
    issues.push('Text on background contrast is too low');
  }

  // Check secondary text on background
  if (getContrastRatio(theme.colors.textSecondary, theme.colors.background) < minContrast) {
    issues.push('Secondary text on background contrast is too low');
  }

  // Check primary on background
  if (getContrastRatio(theme.colors.primary, theme.colors.background) < minContrast) {
    issues.push('Primary color on background contrast is too low');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}
