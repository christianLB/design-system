/**
 * Theme validation utilities for comprehensive theme validation
 */

import { colord } from 'colord';
import type { 
  BuiltTheme, 
  ThemeValidationResult, 
  ThemeValidationError, 
  ThemeValidationWarning 
} from './types';
import { isAccessible, getContrastRatio } from '../utils/colorScale';

/**
 * Validation configuration
 */
export interface ValidationConfig {
  enableColorValidation: boolean;
  enableTypographyValidation: boolean;
  enableSpacingValidation: boolean;
  enableMotionValidation: boolean;
  enableAccessibilityValidation: boolean;
  enablePerformanceValidation: boolean;
  strictMode: boolean;
  wcagLevel: 'AA' | 'AAA';
  customRules?: ValidationRule[];
}

/**
 * Custom validation rule
 */
export interface ValidationRule {
  name: string;
  description: string;
  type: 'error' | 'warning';
  validator: (theme: BuiltTheme) => boolean;
  message: string;
  suggestions?: string[];
}

/**
 * Default validation configuration
 */
export const defaultValidationConfig: ValidationConfig = {
  enableColorValidation: true,
  enableTypographyValidation: true,
  enableSpacingValidation: true,
  enableMotionValidation: true,
  enableAccessibilityValidation: true,
  enablePerformanceValidation: true,
  strictMode: false,
  wcagLevel: 'AA',
};

/**
 * Validate a complete theme
 */
export function validateTheme(
  theme: BuiltTheme,
  config: ValidationConfig = defaultValidationConfig
): ThemeValidationResult {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Color validation
  if (config.enableColorValidation) {
    const colorResults = validateColors(theme, config);
    errors.push(...colorResults.errors);
    warnings.push(...colorResults.warnings);
  }
  
  // Typography validation
  if (config.enableTypographyValidation) {
    const typographyResults = validateTypography(theme, config);
    errors.push(...typographyResults.errors);
    warnings.push(...typographyResults.warnings);
  }
  
  // Spacing validation
  if (config.enableSpacingValidation) {
    const spacingResults = validateSpacing(theme, config);
    errors.push(...spacingResults.errors);
    warnings.push(...spacingResults.warnings);
  }
  
  // Motion validation
  if (config.enableMotionValidation) {
    const motionResults = validateMotion(theme, config);
    errors.push(...motionResults.errors);
    warnings.push(...motionResults.warnings);
  }
  
  // Accessibility validation
  if (config.enableAccessibilityValidation) {
    const accessibilityResults = validateAccessibility(theme, config);
    errors.push(...accessibilityResults.errors);
    warnings.push(...accessibilityResults.warnings);
  }
  
  // Performance validation
  if (config.enablePerformanceValidation) {
    const performanceResults = validatePerformance(theme, config);
    errors.push(...performanceResults.errors);
    warnings.push(...performanceResults.warnings);
  }
  
  // Custom rules validation
  if (config.customRules) {
    const customResults = validateCustomRules(theme, config.customRules);
    errors.push(...customResults.errors);
    warnings.push(...customResults.warnings);
  }
  
  // General structure validation
  const structureResults = validateStructure(theme, config);
  errors.push(...structureResults.errors);
  warnings.push(...structureResults.warnings);
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate theme colors
 */
function validateColors(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate color format
  const colorProperties = getAllColorProperties(theme.colors);
  
  colorProperties.forEach(({ property, value }) => {
    if (!isValidColor(value)) {
      errors.push({
        type: 'color',
        property,
        message: `Invalid color format: ${value}`,
        suggestions: ['Use hex, rgb, or hsl format', 'Ensure color values are valid'],
      });
    }
  });
  
  // Validate semantic color completeness
  const requiredSemanticColors = ['primary', 'secondary', 'destructive', 'success', 'warning'];
  
  requiredSemanticColors.forEach(colorName => {
    if (!theme.colors[colorName as keyof typeof theme.colors]) {
      errors.push({
        type: 'color',
        property: `colors.${colorName}`,
        message: `Missing required semantic color: ${colorName}`,
        suggestions: ['Add the missing semantic color', 'Use theme builder to generate color scales'],
      });
    }
  });
  
  // Validate color contrast
  const contrastResults = validateColorContrast(theme.colors, config.wcagLevel);
  errors.push(...contrastResults.errors);
  warnings.push(...contrastResults.warnings);
  
  // Validate color harmony
  const harmonyResults = validateColorHarmony(theme.colors);
  warnings.push(...harmonyResults);
  
  return { errors, warnings };
}

/**
 * Validate typography
 */
function validateTypography(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate font family
  if (!theme.typography.fontFamily) {
    errors.push({
      type: 'typography',
      property: 'typography.fontFamily',
      message: 'Font family is required',
      suggestions: ['Add a font family', 'Use system fonts for better performance'],
    });
  }
  
  // Validate font sizes
  if (!theme.typography.fontSize) {
    errors.push({
      type: 'typography',
      property: 'typography.fontSize',
      message: 'Font sizes are required',
      suggestions: ['Add font size definitions', 'Use relative units (rem, em)'],
    });
  } else {
    const fontSizes = Object.values(theme.typography.fontSize);
    const invalidSizes = fontSizes.filter(size => !isValidSize(size));
    
    if (invalidSizes.length > 0) {
      errors.push({
        type: 'typography',
        property: 'typography.fontSize',
        message: `Invalid font size values: ${invalidSizes.join(', ')}`,
        suggestions: ['Use valid CSS size units', 'Consider using rem for scalability'],
      });
    }
  }
  
  // Validate font size scale
  if (theme.typography.fontSize) {
    const sizeScale = validateFontSizeScale(theme.typography.fontSize);
    warnings.push(...sizeScale);
  }
  
  return { errors, warnings };
}

/**
 * Validate spacing
 */
function validateSpacing(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate spacing values
  const spacingValues = Object.values(theme.spacing);
  const invalidSpacing = spacingValues.filter(value => !isValidSize(value));
  
  if (invalidSpacing.length > 0) {
    errors.push({
      type: 'spacing',
      property: 'spacing',
      message: `Invalid spacing values: ${invalidSpacing.join(', ')}`,
      suggestions: ['Use valid CSS size units', 'Consider using rem for consistency'],
    });
  }
  
  // Validate spacing scale consistency
  const scaleWarnings = validateSpacingScale(theme.spacing);
  warnings.push(...scaleWarnings);
  
  return { errors, warnings };
}

/**
 * Validate motion
 */
function validateMotion(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate duration values
  if (theme.motion.duration) {
    const durations = Object.values(theme.motion.duration);
    const invalidDurations = durations.filter(duration => !isValidDuration(duration));
    
    if (invalidDurations.length > 0) {
      errors.push({
        type: 'motion',
        property: 'motion.duration',
        message: `Invalid duration values: ${invalidDurations.join(', ')}`,
        suggestions: ['Use valid CSS time units (ms, s)', 'Consider animation performance'],
      });
    }
  }
  
  // Validate easing functions
  if (theme.motion.easing) {
    const easingValues = Object.values(theme.motion.easing);
    const invalidEasing = easingValues.filter(easing => !isValidEasing(easing));
    
    if (invalidEasing.length > 0) {
      errors.push({
        type: 'motion',
        property: 'motion.easing',
        message: `Invalid easing values: ${invalidEasing.join(', ')}`,
        suggestions: ['Use valid CSS easing functions', 'Consider cubic-bezier for custom easing'],
      });
    }
  }
  
  // Performance warnings for motion
  if (theme.motion.duration) {
    const longDurations = Object.entries(theme.motion.duration)
      .filter(([_, duration]) => {
        const ms = parseFloat(duration);
        return ms > 1000; // More than 1 second
      });
    
    if (longDurations.length > 0) {
      warnings.push({
        type: 'performance',
        property: 'motion.duration',
        message: 'Long animation durations may impact user experience',
        suggestions: ['Consider shorter durations', 'Provide option to disable animations'],
      });
    }
  }
  
  return { errors, warnings };
}

/**
 * Validate accessibility
 */
function validateAccessibility(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate color contrast for accessibility
  const contrastResults = validateColorContrast(theme.colors, config.wcagLevel);
  
  // Convert contrast errors to accessibility errors
  contrastResults.errors.forEach(error => {
    errors.push({
      type: 'color',
      property: error.property,
      message: error.message,
      suggestions: [
        ...error.suggestions || [],
        'Use higher contrast colors',
        'Consider high-contrast theme variant',
      ],
    });
  });
  
  // High contrast variant check
  if (theme.meta.variant !== 'high-contrast') {
    const lowContrastPairs = findLowContrastPairs(theme.colors, config.wcagLevel);
    
    if (lowContrastPairs.length > 0) {
      warnings.push({
        type: 'accessibility',
        property: 'colors',
        message: 'Consider providing a high-contrast theme variant',
        suggestions: ['Add high-contrast variant', 'Improve default color contrast'],
      });
    }
  }
  
  // Motion accessibility
  if (theme.motion.duration && theme.meta.variant !== 'high-contrast') {
    const hasAnimations = Object.values(theme.motion.duration).some(duration => {
      const ms = parseFloat(duration);
      return ms > 0;
    });
    
    if (hasAnimations) {
      warnings.push({
        type: 'accessibility',
        property: 'motion',
        message: 'Consider respecting prefers-reduced-motion',
        suggestions: ['Add motion-safe variant', 'Provide option to disable animations'],
      });
    }
  }
  
  return { errors, warnings };
}

/**
 * Validate performance
 */
function validatePerformance(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Check for overly complex shadows
  if (theme.shadows) {
    const complexShadows = Object.entries(theme.shadows)
      .filter(([_, shadow]) => isComplexShadow(shadow));
    
    if (complexShadows.length > 0) {
      warnings.push({
        type: 'performance',
        property: 'shadows',
        message: 'Complex shadows may impact rendering performance',
        suggestions: ['Simplify shadow definitions', 'Consider using fewer shadow layers'],
      });
    }
  }
  
  // Check for excessive color definitions
  const colorCount = countColorDefinitions(theme.colors);
  if (colorCount > 200) {
    warnings.push({
      type: 'performance',
      property: 'colors',
      message: 'Large number of color definitions may impact bundle size',
      suggestions: ['Consolidate similar colors', 'Use color generation functions'],
    });
  }
  
  return { errors, warnings };
}

/**
 * Validate custom rules
 */
function validateCustomRules(
  theme: BuiltTheme,
  rules: ValidationRule[]
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  rules.forEach(rule => {
    try {
      const isValid = rule.validator(theme);
      
      if (!isValid) {
        if (rule.type === 'error') {
          errors.push({
            type: 'general',
            property: rule.name,
            message: rule.message,
            suggestions: rule.suggestions,
          });
        } else {
          warnings.push({
            type: 'best-practice',
            property: rule.name,
            message: rule.message,
            suggestions: rule.suggestions,
          });
        }
      }
    } catch (error) {
      errors.push({
        type: 'general',
        property: rule.name,
        message: `Custom rule validation failed: ${error}`,
        suggestions: ['Check custom rule implementation'],
      });
    }
  });
  
  return { errors, warnings };
}

/**
 * Validate theme structure
 */
function validateStructure(
  theme: BuiltTheme,
  config: ValidationConfig
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Validate required top-level properties
  const requiredProps = ['colors', 'typography', 'spacing', 'motion', 'breakpoints'];
  
  requiredProps.forEach(prop => {
    if (!theme[prop as keyof BuiltTheme]) {
      errors.push({
        type: 'general',
        property: prop,
        message: `Missing required theme property: ${prop}`,
        suggestions: ['Add the missing property', 'Use theme builder to generate complete theme'],
      });
    }
  });
  
  // Validate metadata
  if (!theme.meta) {
    errors.push({
      type: 'general',
      property: 'meta',
      message: 'Theme metadata is required',
      suggestions: ['Add theme metadata', 'Use theme builder to generate metadata'],
    });
  } else {
    if (!theme.meta.name) {
      warnings.push({
        type: 'best-practice',
        property: 'meta.name',
        message: 'Theme should have a name',
        suggestions: ['Add a descriptive theme name'],
      });
    }
    
    if (!theme.meta.version) {
      warnings.push({
        type: 'best-practice',
        property: 'meta.version',
        message: 'Theme should have a version',
        suggestions: ['Add semantic version (e.g., 1.0.0)'],
      });
    }
  }
  
  return { errors, warnings };
}

/**
 * Helper functions
 */

function getAllColorProperties(colors: any): { property: string; value: string }[] {
  const properties: { property: string; value: string }[] = [];
  
  function collectColors(obj: any, prefix: string = 'colors') {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const propertyPath = `${prefix}.${key}`;
      
      if (typeof value === 'string') {
        properties.push({ property: propertyPath, value });
      } else if (typeof value === 'object' && value !== null) {
        collectColors(value, propertyPath);
      }
    });
  }
  
  collectColors(colors);
  return properties;
}

function isValidColor(color: string): boolean {
  try {
    colord(color);
    return true;
  } catch {
    return false;
  }
}

function isValidSize(size: string): boolean {
  return /^-?\d*\.?\d+(px|em|rem|%|vw|vh|vmin|vmax|ch|ex)$/.test(size);
}

function isValidDuration(duration: string): boolean {
  return /^\d*\.?\d+(ms|s)$/.test(duration);
}

function isValidEasing(easing: string): boolean {
  const validEasing = [
    'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out',
    'step-start', 'step-end'
  ];
  
  return validEasing.includes(easing) || /^cubic-bezier\(/.test(easing);
}

function validateColorContrast(
  colors: any,
  wcagLevel: 'AA' | 'AAA'
): { errors: ThemeValidationError[]; warnings: ThemeValidationWarning[] } {
  const errors: ThemeValidationError[] = [];
  const warnings: ThemeValidationWarning[] = [];
  
  // Test common color combinations
  const testPairs = [
    ['foreground', 'background'],
    ['cardForeground', 'card'],
    ['popoverForeground', 'popover'],
    ['mutedForeground', 'muted'],
    ['accentForeground', 'accent'],
  ];
  
  testPairs.forEach(([fg, bg]) => {
    if (colors[fg] && colors[bg]) {
      const contrast = getContrastRatio(colors[fg], colors[bg]);
      const requirement = wcagLevel === 'AAA' ? 7 : 4.5;
      
      if (contrast < requirement) {
        errors.push({
          type: 'color',
          property: `colors.${fg}`,
          message: `Insufficient contrast ratio (${contrast.toFixed(2)}, needs ${requirement})`,
          suggestions: [
            'Increase color contrast',
            'Use darker/lighter colors',
            'Consider high-contrast theme variant',
          ],
        });
      }
    }
  });
  
  return { errors, warnings };
}

function validateColorHarmony(colors: any): ThemeValidationWarning[] {
  const warnings: ThemeValidationWarning[] = [];
  
  // Check for too many similar colors
  const allColors = getAllColorProperties(colors);
  const colorValues = allColors.map(c => c.value).filter(isValidColor);
  
  if (colorValues.length > 0) {
    const uniqueHues = new Set(
      colorValues.map(color => {
        try {
          return Math.round(colord(color).toHsl().h / 10) * 10; // Group by 10-degree intervals
        } catch {
          return 0;
        }
      })
    );
    
    if (uniqueHues.size > 10) {
      warnings.push({
        type: 'best-practice',
        property: 'colors',
        message: 'Many different hues may create visual inconsistency',
        suggestions: ['Limit color palette to 3-5 main hues', 'Use color scales instead of individual colors'],
      });
    }
  }
  
  return warnings;
}

function validateFontSizeScale(fontSize: any): ThemeValidationWarning[] {
  const warnings: ThemeValidationWarning[] = [];
  
  const sizes = Object.values(fontSize)
    .map(size => parseFloat(size as string))
    .filter(size => !isNaN(size))
    .sort((a, b) => a - b);
  
  if (sizes.length > 1) {
    // Check for consistent scale ratio
    const ratios = [];
    for (let i = 1; i < sizes.length; i++) {
      ratios.push(sizes[i] / sizes[i - 1]);
    }
    
    const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
    const inconsistent = ratios.some(ratio => Math.abs(ratio - avgRatio) > 0.2);
    
    if (inconsistent) {
      warnings.push({
        type: 'best-practice',
        property: 'typography.fontSize',
        message: 'Inconsistent font size scale may affect visual hierarchy',
        suggestions: ['Use consistent scale ratio (e.g., 1.2, 1.333)', 'Consider type scale generators'],
      });
    }
  }
  
  return warnings;
}

function validateSpacingScale(spacing: any): ThemeValidationWarning[] {
  const warnings: ThemeValidationWarning[] = [];
  
  const sizes = Object.values(spacing)
    .map(size => parseFloat(size as string))
    .filter(size => !isNaN(size))
    .sort((a, b) => a - b);
  
  if (sizes.length > 1) {
    // Check for reasonable spacing progression
    const gaps = [];
    for (let i = 1; i < sizes.length; i++) {
      gaps.push(sizes[i] - sizes[i - 1]);
    }
    
    const hasNegativeGaps = gaps.some(gap => gap <= 0);
    
    if (hasNegativeGaps) {
      warnings.push({
        type: 'best-practice',
        property: 'spacing',
        message: 'Spacing scale should be progressive',
        suggestions: ['Ensure each spacing value is larger than the previous', 'Use consistent spacing increments'],
      });
    }
  }
  
  return warnings;
}

function findLowContrastPairs(colors: any, wcagLevel: 'AA' | 'AAA'): string[] {
  const lowContrastPairs: string[] = [];
  
  // This is a simplified version - in practice you'd check all relevant pairs
  const testPairs = [
    ['foreground', 'background'],
    ['cardForeground', 'card'],
    ['popoverForeground', 'popover'],
  ];
  
  testPairs.forEach(([fg, bg]) => {
    if (colors[fg] && colors[bg]) {
      const contrast = getContrastRatio(colors[fg], colors[bg]);
      const requirement = wcagLevel === 'AAA' ? 7 : 4.5;
      
      if (contrast < requirement) {
        lowContrastPairs.push(`${fg}/${bg}`);
      }
    }
  });
  
  return lowContrastPairs;
}

function isComplexShadow(shadow: string): boolean {
  if (shadow === 'none') return false;
  
  // Count shadow layers (comma-separated)
  const layers = shadow.split(',').length;
  return layers > 3;
}

function countColorDefinitions(colors: any): number {
  return getAllColorProperties(colors).length;
}