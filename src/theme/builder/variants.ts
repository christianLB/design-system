/**
 * Theme variant system for different UI densities and accessibility needs
 */

import { colord } from 'colord';
import type { BuiltTheme, ThemeVariant } from './types';
import { generateColorScale, generateSemanticColors, isAccessible } from '../utils/colorScale';

/**
 * Variant configurations for different UI densities and accessibility needs
 */
export interface VariantConfig {
  spacing: {
    multiplier: number;
    baseUnit: string;
  };
  typography: {
    sizeMultiplier: number;
    lineHeightMultiplier: number;
    fontWeightAdjustment: number;
  };
  colors: {
    contrastMultiplier: number;
    saturationMultiplier: number;
    brightnessAdjustment: number;
  };
  motion: {
    speedMultiplier: number;
    enableAnimations: boolean;
  };
  borders: {
    widthMultiplier: number;
    radiusMultiplier: number;
  };
  shadows: {
    intensityMultiplier: number;
    blurMultiplier: number;
  };
}

/**
 * Predefined variant configurations
 */
export const variantConfigs: Record<ThemeVariant, VariantConfig> = {
  default: {
    spacing: {
      multiplier: 1,
      baseUnit: 'rem',
    },
    typography: {
      sizeMultiplier: 1,
      lineHeightMultiplier: 1,
      fontWeightAdjustment: 0,
    },
    colors: {
      contrastMultiplier: 1,
      saturationMultiplier: 1,
      brightnessAdjustment: 0,
    },
    motion: {
      speedMultiplier: 1,
      enableAnimations: true,
    },
    borders: {
      widthMultiplier: 1,
      radiusMultiplier: 1,
    },
    shadows: {
      intensityMultiplier: 1,
      blurMultiplier: 1,
    },
  },
  
  compact: {
    spacing: {
      multiplier: 0.75,
      baseUnit: 'rem',
    },
    typography: {
      sizeMultiplier: 0.875,
      lineHeightMultiplier: 0.9,
      fontWeightAdjustment: 0,
    },
    colors: {
      contrastMultiplier: 1,
      saturationMultiplier: 1,
      brightnessAdjustment: 0,
    },
    motion: {
      speedMultiplier: 1.25,
      enableAnimations: true,
    },
    borders: {
      widthMultiplier: 0.75,
      radiusMultiplier: 0.75,
    },
    shadows: {
      intensityMultiplier: 0.75,
      blurMultiplier: 0.75,
    },
  },
  
  comfortable: {
    spacing: {
      multiplier: 1.25,
      baseUnit: 'rem',
    },
    typography: {
      sizeMultiplier: 1.125,
      lineHeightMultiplier: 1.1,
      fontWeightAdjustment: 0,
    },
    colors: {
      contrastMultiplier: 1,
      saturationMultiplier: 1,
      brightnessAdjustment: 0,
    },
    motion: {
      speedMultiplier: 0.85,
      enableAnimations: true,
    },
    borders: {
      widthMultiplier: 1.25,
      radiusMultiplier: 1.25,
    },
    shadows: {
      intensityMultiplier: 1.25,
      blurMultiplier: 1.25,
    },
  },
  
  'high-contrast': {
    spacing: {
      multiplier: 1.1,
      baseUnit: 'rem',
    },
    typography: {
      sizeMultiplier: 1.05,
      lineHeightMultiplier: 1.2,
      fontWeightAdjustment: 100,
    },
    colors: {
      contrastMultiplier: 1.5,
      saturationMultiplier: 1.2,
      brightnessAdjustment: 0.1,
    },
    motion: {
      speedMultiplier: 0.75,
      enableAnimations: false,
    },
    borders: {
      widthMultiplier: 1.5,
      radiusMultiplier: 0.75,
    },
    shadows: {
      intensityMultiplier: 1.5,
      blurMultiplier: 0.5,
    },
  },
};

/**
 * Apply variant modifications to a theme
 */
export function applyVariant(
  baseTheme: BuiltTheme,
  variant: ThemeVariant,
  customConfig?: Partial<VariantConfig>
): BuiltTheme {
  const config = customConfig 
    ? mergeVariantConfig(variantConfigs[variant], customConfig)
    : variantConfigs[variant];
  
  const result = JSON.parse(JSON.stringify(baseTheme)) as BuiltTheme;
  
  // Apply spacing modifications
  result.spacing = applySpacingVariant(result.spacing, config.spacing);
  
  // Apply typography modifications
  result.typography = applyTypographyVariant(result.typography, config.typography);
  
  // Apply color modifications
  result.colors = applyColorVariant(result.colors, config.colors);
  
  // Apply motion modifications
  result.motion = applyMotionVariant(result.motion, config.motion);
  
  // Apply radius modifications
  result.radius = applyRadiusVariant(result.radius, config.borders);
  
  // Apply shadow modifications
  if (result.shadows) {
    result.shadows = applyShadowVariant(result.shadows, config.shadows);
  }
  
  // Apply z-index modifications for high-contrast (ensure proper layering)
  if (variant === 'high-contrast') {
    result.zIndex = applyHighContrastZIndex(result.zIndex);
  }
  
  // Update metadata
  result.meta = {
    ...result.meta,
    variant,
    updatedAt: new Date().toISOString(),
  };
  
  return result;
}

/**
 * Merge variant configurations
 */
function mergeVariantConfig(
  base: VariantConfig,
  custom: Partial<VariantConfig>
): VariantConfig {
  return {
    spacing: { ...base.spacing, ...custom.spacing },
    typography: { ...base.typography, ...custom.typography },
    colors: { ...base.colors, ...custom.colors },
    motion: { ...base.motion, ...custom.motion },
    borders: { ...base.borders, ...custom.borders },
    shadows: { ...base.shadows, ...custom.shadows },
  };
}

/**
 * Apply spacing variant modifications
 */
function applySpacingVariant(
  spacing: any,
  config: VariantConfig['spacing']
): any {
  const result = { ...spacing };
  
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (typeof value === 'string' && value.includes('rem')) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        result[key] = `${numericValue * config.multiplier}${config.baseUnit}`;
      }
    }
  });
  
  return result;
}

/**
 * Apply typography variant modifications
 */
function applyTypographyVariant(
  typography: any,
  config: VariantConfig['typography']
): any {
  const result = { ...typography };
  
  // Apply font size modifications
  if (result.fontSize) {
    Object.keys(result.fontSize).forEach(key => {
      const value = result.fontSize[key];
      if (typeof value === 'string' && value.includes('rem')) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          result.fontSize[key] = `${numericValue * config.sizeMultiplier}rem`;
        }
      }
    });
  }
  
  // Apply font weight modifications
  if (result.fontWeight) {
    Object.keys(result.fontWeight).forEach(key => {
      const value = result.fontWeight[key];
      if (typeof value === 'number') {
        result.fontWeight[key] = Math.min(900, Math.max(100, value + config.fontWeightAdjustment));
      }
    });
  }
  
  // Apply line height modifications
  if (result.lineHeight) {
    Object.keys(result.lineHeight).forEach(key => {
      const value = result.lineHeight[key];
      if (typeof value === 'number') {
        result.lineHeight[key] = value * config.lineHeightMultiplier;
      }
    });
  }
  
  return result;
}

/**
 * Apply color variant modifications
 */
function applyColorVariant(
  colors: any,
  config: VariantConfig['colors']
): any {
  let result = { ...colors };
  
  // Apply contrast and saturation modifications
  if (config.contrastMultiplier !== 1 || config.saturationMultiplier !== 1) {
    const colorGroups = ['primary', 'secondary', 'destructive', 'success', 'warning'];
    
    colorGroups.forEach(group => {
      if (result[group] && typeof result[group] === 'object') {
        result[group] = adjustColorGroup(result[group], config);
      }
    });
    
    // Adjust surface colors
    const surfaceColors = ['background', 'foreground', 'card', 'cardForeground', 'popover', 'popoverForeground'];
    
    surfaceColors.forEach(colorName => {
      if (result[colorName] && typeof result[colorName] === 'string') {
        result[colorName] = adjustSingleColor(result[colorName], config);
      }
    });
  }
  
  // Ensure high contrast accessibility
  if (config.contrastMultiplier > 1.2) {
    result = ensureHighContrastAccessibility(result);
  }
  
  return result;
}

/**
 * Adjust a color group (primary, secondary, etc.)
 */
function adjustColorGroup(
  colorGroup: any,
  config: VariantConfig['colors']
): any {
  const result = { ...colorGroup };
  
  // Adjust individual color values
  Object.keys(result).forEach(key => {
    if (typeof result[key] === 'string') {
      result[key] = adjustSingleColor(result[key], config);
    }
  });
  
  return result;
}

/**
 * Adjust a single color value
 */
function adjustSingleColor(
  color: string,
  config: VariantConfig['colors']
): string {
  try {
    const colorObj = colord(color);
    let adjustedColor = colorObj;
    
    // Apply saturation adjustment
    if (config.saturationMultiplier !== 1) {
      const hsl = adjustedColor.toHsl();
      adjustedColor = colord({
        h: hsl.h,
        s: Math.min(100, hsl.s * config.saturationMultiplier),
        l: hsl.l,
      });
    }
    
    // Apply brightness adjustment
    if (config.brightnessAdjustment !== 0) {
      const hsl = adjustedColor.toHsl();
      adjustedColor = colord({
        h: hsl.h,
        s: hsl.s,
        l: Math.min(100, Math.max(0, hsl.l + config.brightnessAdjustment * 100)),
      });
    }
    
    return adjustedColor.toHex();
  } catch {
    return color; // Return original if color parsing fails
  }
}

/**
 * Ensure high contrast accessibility
 */
function ensureHighContrastAccessibility(colors: any): any {
  const result = { ...colors };
  
  // Ensure strong contrast for text colors
  const textColorPairs = [
    ['foreground', 'background'],
    ['cardForeground', 'card'],
    ['popoverForeground', 'popover'],
    ['mutedForeground', 'muted'],
    ['accentForeground', 'accent'],
  ];
  
  textColorPairs.forEach(([foreground, background]) => {
    if (result[foreground] && result[background]) {
      if (!isAccessible(result[foreground], result[background], 'AAA')) {
        // Force high contrast colors
        const bgColor = colord(result[background]);
        result[foreground] = bgColor.isLight() ? '#000000' : '#ffffff';
      }
    }
  });
  
  // Ensure semantic colors have high contrast
  const semanticGroups = ['primary', 'secondary', 'destructive', 'success', 'warning'];
  
  semanticGroups.forEach(group => {
    if (result[group] && typeof result[group] === 'object') {
      const colorGroup = result[group];
      if (colorGroup.foreground && colorGroup.background) {
        if (!isAccessible(colorGroup.foreground, colorGroup.background, 'AAA')) {
          const bgColor = colord(colorGroup.background);
          colorGroup.foreground = bgColor.isLight() ? '#000000' : '#ffffff';
        }
      }
    }
  });
  
  return result;
}

/**
 * Apply motion variant modifications
 */
function applyMotionVariant(
  motion: any,
  config: VariantConfig['motion']
): any {
  const result = { ...motion };
  
  // Apply duration modifications
  if (result.duration) {
    Object.keys(result.duration).forEach(key => {
      const value = result.duration[key];
      if (typeof value === 'string' && value.includes('ms')) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          result.duration[key] = `${Math.round(numericValue / config.speedMultiplier)}ms`;
        }
      }
    });
  }
  
  // Disable animations for high-contrast/accessibility
  if (!config.enableAnimations) {
    result.duration = {
      fast: '0ms',
      normal: '0ms',
      slow: '0ms',
    };
  }
  
  return result;
}

/**
 * Apply radius variant modifications
 */
function applyRadiusVariant(
  radius: any,
  config: VariantConfig['borders']
): any {
  if (typeof radius === 'string') {
    const numericValue = parseFloat(radius);
    if (!isNaN(numericValue)) {
      return `${numericValue * config.radiusMultiplier}rem`;
    }
    return radius;
  }
  
  if (typeof radius === 'object') {
    const result = { ...radius };
    
    Object.keys(result).forEach(key => {
      const value = result[key];
      if (typeof value === 'string' && value.includes('rem')) {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          result[key] = `${numericValue * config.radiusMultiplier}rem`;
        }
      }
    });
    
    return result;
  }
  
  return radius;
}

/**
 * Apply shadow variant modifications
 */
function applyShadowVariant(
  shadows: any,
  config: VariantConfig['shadows']
): any {
  const result = { ...shadows };
  
  Object.keys(result).forEach(key => {
    const value = result[key];
    if (typeof value === 'string' && key !== 'none') {
      result[key] = adjustShadow(value, config);
    }
  });
  
  return result;
}

/**
 * Adjust shadow values
 */
function adjustShadow(
  shadow: string,
  config: VariantConfig['shadows']
): string {
  // Simple shadow adjustment - in a real implementation, you'd parse the shadow string
  // and adjust blur and opacity values
  if (config.intensityMultiplier === 0 || shadow === 'none') {
    return 'none';
  }
  
  // For high contrast, simplify shadows
  if (config.intensityMultiplier > 1 && config.blurMultiplier < 1) {
    return shadow.replace(/rgba\(([^)]+)\)/g, (match, rgba) => {
      const values = rgba.split(',').map((v: string) => v.trim());
      if (values.length === 4) {
        const opacity = parseFloat(values[3]);
        values[3] = Math.min(1, opacity * config.intensityMultiplier).toString();
        return `rgba(${values.join(', ')})`;
      }
      return match;
    });
  }
  
  return shadow;
}

/**
 * Apply high contrast z-index modifications
 */
function applyHighContrastZIndex(zIndex: any): any {
  const result = { ...zIndex };
  
  // Ensure clear layering for high contrast
  result.modal = Math.max(result.modal, 2000);
  result.popover = Math.max(result.popover, 1500);
  result.tooltip = Math.max(result.tooltip, 2500);
  
  return result;
}

/**
 * Get variant-specific CSS class names
 */
export function getVariantClassNames(variant: ThemeVariant): string[] {
  const baseClasses = [`theme-${variant}`];
  
  switch (variant) {
    case 'compact':
      return [...baseClasses, 'theme-compact', 'theme-dense'];
    case 'comfortable':
      return [...baseClasses, 'theme-comfortable', 'theme-spacious'];
    case 'high-contrast':
      return [...baseClasses, 'theme-high-contrast', 'theme-accessible'];
    default:
      return [...baseClasses, 'theme-default'];
  }
}

/**
 * Get variant-specific CSS custom properties
 */
export function getVariantCSSProperties(variant: ThemeVariant): Record<string, string> {
  const config = variantConfigs[variant];
  
  // Fallback to default config if variant is not found
  if (!config) {
    console.warn(`Variant '${variant}' not found in variantConfigs, using default`);
    const defaultConfig = variantConfigs.default;
    return {
      '--theme-variant': variant,
      '--theme-spacing-multiplier': defaultConfig.spacing.multiplier.toString(),
      '--theme-typography-size-multiplier': defaultConfig.typography.sizeMultiplier.toString(),
      '--theme-motion-speed-multiplier': defaultConfig.motion.speedMultiplier.toString(),
      '--theme-border-radius-multiplier': defaultConfig.borders.radiusMultiplier.toString(),
      '--theme-animations-enabled': defaultConfig.motion.enableAnimations ? '1' : '0',
    };
  }
  
  return {
    '--theme-variant': variant,
    '--theme-spacing-multiplier': config.spacing.multiplier.toString(),
    '--theme-typography-size-multiplier': config.typography.sizeMultiplier.toString(),
    '--theme-motion-speed-multiplier': config.motion.speedMultiplier.toString(),
    '--theme-border-radius-multiplier': config.borders.radiusMultiplier.toString(),
    '--theme-animations-enabled': config.motion.enableAnimations ? '1' : '0',
  };
}

/**
 * Check if a variant is accessibility-focused
 */
export function isAccessibilityVariant(variant: ThemeVariant): boolean {
  return variant === 'high-contrast';
}

/**
 * Get recommended variant based on user preferences
 */
export function getRecommendedVariant(preferences: {
  prefersReducedMotion?: boolean;
  prefersHighContrast?: boolean;
  prefersCompactUI?: boolean;
  prefersLargeText?: boolean;
}): ThemeVariant {
  if (preferences.prefersHighContrast) {
    return 'high-contrast';
  }
  
  if (preferences.prefersCompactUI) {
    return 'compact';
  }
  
  if (preferences.prefersLargeText) {
    return 'comfortable';
  }
  
  return 'default';
}