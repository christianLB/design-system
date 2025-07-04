/**
 * Theme composition utilities for merging, extending, and inheriting themes
 */

import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

extend([mixPlugin]);
import type { ThemeTokens } from '../theme.light';
import type { SemanticColorTokens } from '../tokens/colors';
import type { 
  BuiltTheme, 
  ThemeCustomization, 
  CompositionMode, 
  ConflictResolutionConfig,
  ColorConflictResolution 
} from './types';
import { generateColorScale, generateSemanticColors, isAccessible } from '../utils/colorScale';

/**
 * Default conflict resolution configuration
 */
export const defaultConflictResolutionConfig: ConflictResolutionConfig = {
  colorConflicts: 'auto',
  preserveAccessibility: true,
  prioritizeUserCustomizations: true,
  allowPartialOverrides: true,
};

/**
 * Deep merge utility for theme objects
 */
function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];
      
      if (sourceValue !== undefined) {
        if (isObject(sourceValue) && isObject(targetValue)) {
          (result as any)[key] = deepMerge(targetValue, sourceValue);
        } else {
          (result as any)[key] = sourceValue;
        }
      }
    }
  }
  
  return result;
}

/**
 * Check if value is an object
 */
function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Compose two themes based on the specified composition mode
 */
export function composeThemes(
  baseTheme: BuiltTheme,
  overlayTheme: Partial<BuiltTheme>,
  mode: CompositionMode = 'merge',
  config: ConflictResolutionConfig = defaultConflictResolutionConfig
): BuiltTheme {
  switch (mode) {
    case 'merge':
      return mergeThemes(baseTheme, overlayTheme, config);
    case 'override':
      return overrideTheme(baseTheme, overlayTheme, config);
    case 'extend':
      return extendTheme(baseTheme, overlayTheme, config);
    default:
      throw new Error(`Unknown composition mode: ${mode}`);
  }
}

/**
 * Merge themes with intelligent conflict resolution
 */
export function mergeThemes(
  baseTheme: BuiltTheme,
  overlayTheme: Partial<BuiltTheme>,
  config: ConflictResolutionConfig = defaultConflictResolutionConfig
): BuiltTheme {
  // Start with base theme
  const result = JSON.parse(JSON.stringify(baseTheme)) as BuiltTheme;
  
  // Handle colors with special conflict resolution
  if (overlayTheme.colors) {
    result.colors = resolveColorConflicts(
      result.colors,
      overlayTheme.colors,
      config.colorConflicts,
      config.preserveAccessibility
    );
  }
  
  // Merge other properties
  const otherProps = { ...overlayTheme };
  delete otherProps.colors;
  
  // Deep merge remaining properties
  Object.assign(result, deepMerge(result, otherProps));
  
  // Update metadata
  result.meta = {
    ...result.meta,
    compositionMode: 'merge',
    updatedAt: new Date().toISOString(),
  };
  
  return result;
}

/**
 * Override theme properties completely
 */
export function overrideTheme(
  baseTheme: BuiltTheme,
  overlayTheme: Partial<BuiltTheme>,
  config: ConflictResolutionConfig = defaultConflictResolutionConfig
): BuiltTheme {
  const result = { ...baseTheme };
  
  // Override properties completely
  Object.keys(overlayTheme).forEach(key => {
    if (key !== 'meta' && overlayTheme[key as keyof BuiltTheme] !== undefined) {
      (result as any)[key] = overlayTheme[key as keyof BuiltTheme];
    }
  });
  
  // Handle accessibility preservation if needed
  if (config.preserveAccessibility && overlayTheme.colors) {
    result.colors = ensureAccessibleColors(result.colors);
  }
  
  // Update metadata
  result.meta = {
    ...result.meta,
    compositionMode: 'override',
    updatedAt: new Date().toISOString(),
  };
  
  return result;
}

/**
 * Extend theme with new properties while preserving existing ones
 */
export function extendTheme(
  baseTheme: BuiltTheme,
  overlayTheme: Partial<BuiltTheme>,
  config: ConflictResolutionConfig = defaultConflictResolutionConfig
): BuiltTheme {
  const result = JSON.parse(JSON.stringify(baseTheme)) as BuiltTheme;
  
  // Extend colors intelligently
  if (overlayTheme.colors) {
    result.colors = extendColors(result.colors, overlayTheme.colors, config);
  }
  
  // Extend other properties
  const otherProps = { ...overlayTheme };
  delete otherProps.colors;
  
  // Only add new properties, don't override existing ones
  Object.keys(otherProps).forEach(key => {
    if (key !== 'meta') {
      const overlayValue = otherProps[key as keyof typeof otherProps];
      if (overlayValue !== undefined) {
        if (isObject(overlayValue) && isObject(result[key as keyof BuiltTheme])) {
          (result as any)[key] = extendObject(
            result[key as keyof BuiltTheme] as Record<string, any>,
            overlayValue as Record<string, any>
          );
        } else if (result[key as keyof BuiltTheme] === undefined) {
          (result as any)[key] = overlayValue;
        }
      }
    }
  });
  
  // Update metadata
  result.meta = {
    ...result.meta,
    compositionMode: 'extend',
    updatedAt: new Date().toISOString(),
  };
  
  return result;
}

/**
 * Extend object with new properties only
 */
function extendObject(
  target: Record<string, any>,
  source: Record<string, any>
): Record<string, any> {
  const result = { ...target };
  
  Object.keys(source).forEach(key => {
    if (result[key] === undefined) {
      result[key] = source[key];
    } else if (isObject(result[key]) && isObject(source[key])) {
      result[key] = extendObject(result[key], source[key]);
    }
  });
  
  return result;
}

/**
 * Resolve color conflicts with intelligent strategies
 */
function resolveColorConflicts(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  strategy: ColorConflictResolution,
  preserveAccessibility: boolean
): SemanticColorTokens {
  let result = { ...baseColors };
  
  switch (strategy) {
    case 'auto':
      result = autoResolveColorConflicts(result, overlayColors, preserveAccessibility);
      break;
    case 'prefer-base':
      result = preferBaseColors(result, overlayColors, preserveAccessibility);
      break;
    case 'prefer-override':
      result = preferOverrideColors(result, overlayColors, preserveAccessibility);
      break;
    case 'blend':
      result = blendColors(result, overlayColors, preserveAccessibility);
      break;
  }
  
  return preserveAccessibility ? ensureAccessibleColors(result) : result;
}

/**
 * Auto-resolve color conflicts using intelligent heuristics
 */
function autoResolveColorConflicts(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  preserveAccessibility: boolean
): SemanticColorTokens {
  const result = { ...baseColors };
  
  // Analyze color relationships and apply overlay colors smartly
  Object.keys(overlayColors).forEach(colorKey => {
    const overlayColor = overlayColors[colorKey as keyof SemanticColorTokens];
    
    if (overlayColor && typeof overlayColor === 'object') {
      // For semantic color groups, regenerate the full scale from the DEFAULT color
      if ('DEFAULT' in overlayColor && overlayColor.DEFAULT) {
        const newColorScale = generateColorScale(overlayColor.DEFAULT);
        const newSemanticColors = generateSemanticColors(overlayColor.DEFAULT);
        
        (result as any)[colorKey] = {
          ...newColorScale,
          ...newSemanticColors,
          ...overlayColor, // Apply any specific overrides (includes DEFAULT)
        };
      } else {
        // Merge object properties
        const currentColor = result[colorKey as keyof SemanticColorTokens];
        if (typeof currentColor === 'object' && currentColor !== null) {
          (result as any)[colorKey] = {
            ...currentColor,
            ...overlayColor,
          };
        } else {
          (result as any)[colorKey] = overlayColor;
        }
      }
    } else if (overlayColor && typeof overlayColor === 'string') {
      // Direct color value
      (result as any)[colorKey] = overlayColor;
    }
  });
  
  return result;
}

/**
 * Prefer base colors, only use overlay for missing values
 */
function preferBaseColors(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  preserveAccessibility: boolean
): SemanticColorTokens {
  const result = { ...baseColors };
  
  // Only add overlay colors for missing keys
  Object.keys(overlayColors).forEach(colorKey => {
    if (result[colorKey as keyof SemanticColorTokens] === undefined) {
      (result as any)[colorKey] = overlayColors[colorKey as keyof SemanticColorTokens];
    }
  });
  
  return result;
}

/**
 * Prefer overlay colors over base colors
 */
function preferOverrideColors(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  preserveAccessibility: boolean
): SemanticColorTokens {
  return deepMerge(baseColors, overlayColors);
}

/**
 * Blend colors by mixing them together
 */
function blendColors(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  preserveAccessibility: boolean
): SemanticColorTokens {
  const result = { ...baseColors };
  
  Object.keys(overlayColors).forEach(colorKey => {
    const overlayColor = overlayColors[colorKey as keyof SemanticColorTokens];
    const baseColor = result[colorKey as keyof SemanticColorTokens];
    
    if (overlayColor && baseColor) {
      if (typeof overlayColor === 'string' && typeof baseColor === 'string') {
        // Blend two color strings
        try {
          const blendedColor = colord(baseColor).mix(colord(overlayColor), 0.5).toHex();
          (result as any)[colorKey] = blendedColor;
        } catch {
          // If blending fails, use overlay color
          (result as any)[colorKey] = overlayColor;
        }
      } else if (typeof overlayColor === 'object' && typeof baseColor === 'object' && overlayColor !== null && baseColor !== null) {
        // Blend color objects
        const blendedObject = { ...baseColor } as any;
        Object.keys(overlayColor).forEach(subKey => {
          const overlayValue = (overlayColor as any)[subKey];
          const baseValue = (baseColor as any)[subKey];
          
          if (typeof overlayValue === 'string' && typeof baseValue === 'string') {
            try {
              blendedObject[subKey] = colord(baseValue)
                .mix(colord(overlayValue), 0.5)
                .toHex();
            } catch {
              blendedObject[subKey] = overlayValue;
            }
          } else {
            blendedObject[subKey] = overlayValue;
          }
        });
        (result as any)[colorKey] = blendedObject;
      }
    }
  });
  
  return result;
}

/**
 * Extend colors by adding new color properties without overriding existing ones
 */
function extendColors(
  baseColors: SemanticColorTokens,
  overlayColors: Partial<SemanticColorTokens>,
  config: ConflictResolutionConfig
): SemanticColorTokens {
  const result = { ...baseColors };
  
  Object.keys(overlayColors).forEach(colorKey => {
    const overlayColor = overlayColors[colorKey as keyof SemanticColorTokens];
    const baseColor = result[colorKey as keyof SemanticColorTokens];
    
    if (overlayColor) {
      if (baseColor === undefined) {
        // Add new color
        (result as any)[colorKey] = overlayColor;
      } else if (typeof overlayColor === 'object' && typeof baseColor === 'object') {
        // Extend color object with new properties
        (result as any)[colorKey] = extendObject(baseColor, overlayColor);
      }
      // If base color exists and is a string, keep it (don't override)
    }
  });
  
  return result;
}

/**
 * Ensure all colors meet accessibility requirements
 */
function ensureAccessibleColors(colors: SemanticColorTokens): SemanticColorTokens {
  const result = { ...colors };
  
  // Check and fix contrast ratios for key color combinations
  const colorGroups = ['primary', 'secondary', 'destructive', 'success', 'warning'] as const;
  
  colorGroups.forEach(group => {
    const colorGroup = result[group];
    if (colorGroup && typeof colorGroup === 'object') {
      // Ensure foreground/background contrast
      if (colorGroup.foreground && colorGroup.background) {
        if (!isAccessible(colorGroup.foreground, colorGroup.background)) {
          // Auto-adjust foreground for better contrast
          const backgroundColor = colord(colorGroup.background);
          colorGroup.foreground = backgroundColor.isLight() ? '#000000' : '#ffffff';
        }
      }
    }
  });
  
  // Ensure general background/foreground contrast
  if (result.background && result.foreground) {
    if (!isAccessible(result.foreground, result.background)) {
      const backgroundColor = colord(result.background);
      result.foreground = backgroundColor.isLight() ? '#000000' : '#ffffff';
    }
  }
  
  return result;
}

/**
 * Apply theme customizations to a base theme
 */
export function applyCustomizations(
  baseTheme: BuiltTheme,
  customizations: ThemeCustomization
): BuiltTheme {
  const result = JSON.parse(JSON.stringify(baseTheme)) as BuiltTheme;
  
  // Apply color customizations
  if (customizations.colors) {
    result.colors = applyColorCustomizations(result.colors, customizations.colors);
  }
  
  // Apply typography customizations
  if (customizations.typography) {
    result.typography = deepMerge(result.typography, customizations.typography as any);
  }
  
  // Apply spacing customizations
  if (customizations.spacing) {
    result.spacing = deepMerge(result.spacing, customizations.spacing);
  }
  
  // Apply motion customizations
  if (customizations.motion) {
    result.motion = deepMerge(result.motion, customizations.motion as any);
  }
  
  // Apply breakpoint customizations
  if (customizations.breakpoints) {
    result.breakpoints = deepMerge(result.breakpoints, customizations.breakpoints);
  }
  
  // Apply radius customizations
  if (customizations.radius) {
    if (typeof result.radius === 'string') {
      // Convert string radius to object
      result.radius = {
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        md: result.radius,
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      };
    }
    result.radius = deepMerge(result.radius, customizations.radius);
  }
  
  // Apply shadow customizations
  if (customizations.shadows) {
    const defaultShadows = {
      xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    };
    result.shadows = deepMerge(result.shadows || defaultShadows, customizations.shadows);
  }
  
  // Apply z-index customizations
  if (customizations.zIndex) {
    result.zIndex = deepMerge(result.zIndex, customizations.zIndex);
  }
  
  // Update metadata
  result.meta = {
    ...result.meta,
    customizations: deepMerge(result.meta.customizations, customizations),
    updatedAt: new Date().toISOString(),
  };
  
  return result;
}

/**
 * Apply color customizations with intelligent color generation
 */
function applyColorCustomizations(
  baseColors: SemanticColorTokens,
  colorCustomizations: any
): SemanticColorTokens {
  const result = { ...baseColors };
  
  // Apply semantic color customizations
  const semanticColors = ['primary', 'secondary', 'destructive', 'success', 'warning'];
  
  semanticColors.forEach(colorName => {
    const customColor = colorCustomizations[colorName];
    if (customColor && typeof customColor === 'string') {
      // Generate full color scale from custom color
      const colorScale = generateColorScale(customColor);
      const semanticVariants = generateSemanticColors(customColor);
      
      (result as any)[colorName] = {
        ...colorScale,
        DEFAULT: customColor,
        ...semanticVariants,
      };
    }
  });
  
  // Apply surface color customizations
  if (colorCustomizations.surface) {
    Object.keys(colorCustomizations.surface).forEach(key => {
      const value = colorCustomizations.surface[key];
      if (value) {
        (result as any)[key] = value;
      }
    });
  }
  
  // Apply border color customizations
  if (colorCustomizations.border) {
    Object.keys(colorCustomizations.border).forEach(key => {
      const value = colorCustomizations.border[key];
      if (value) {
        (result as any)[key] = value;
      }
    });
  }
  
  // Apply muted color customizations
  if (colorCustomizations.muted) {
    Object.keys(colorCustomizations.muted).forEach(key => {
      const value = colorCustomizations.muted[key];
      if (value) {
        (result as any)[key === 'background' ? 'muted' : 'mutedForeground'] = value;
      }
    });
  }
  
  // Apply accent color customizations
  if (colorCustomizations.accent) {
    Object.keys(colorCustomizations.accent).forEach(key => {
      const value = colorCustomizations.accent[key];
      if (value) {
        (result as any)[key === 'background' ? 'accent' : 'accentForeground'] = value;
      }
    });
  }
  
  // Apply direct color properties
  ['background', 'foreground'].forEach(key => {
    if (colorCustomizations[key]) {
      (result as any)[key] = colorCustomizations[key];
    }
  });
  
  return result;
}