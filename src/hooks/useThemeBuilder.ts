/**
 * React hook for theme builder functionality
 */

import { useState, useCallback, useMemo } from 'react';
import { ThemeBuilder, createThemeBuilder } from '../theme/builder/ThemeBuilder';
import { useTheme } from '../theme/ThemeContext';
import type { 
  BuiltTheme, 
  ThemeCustomization, 
  ThemeVariant, 
  CompositionMode,
  ThemeValidationResult,
  ThemeBuilderConfig
} from '../theme/builder/types';

/**
 * Theme builder hook options
 */
export interface UseThemeBuilderOptions {
  autoApply?: boolean;
  validateOnBuild?: boolean;
  config?: Partial<ThemeBuilderConfig>;
}

/**
 * Theme builder hook result
 */
export interface UseThemeBuilderResult {
  // Builder instance
  builder: ThemeBuilder;
  
  // Current built theme
  builtTheme: BuiltTheme | null;
  
  // Validation result
  validation: ThemeValidationResult | null;
  
  // Builder state
  isBuilding: boolean;
  isValid: boolean;
  hasChanges: boolean;
  
  // Builder methods
  withColors: (colors: ThemeCustomization['colors']) => void;
  withTypography: (typography: ThemeCustomization['typography']) => void;
  withSpacing: (spacing: ThemeCustomization['spacing']) => void;
  withMotion: (motion: ThemeCustomization['motion']) => void;
  withBreakpoints: (breakpoints: ThemeCustomization['breakpoints']) => void;
  withRadius: (radius: ThemeCustomization['radius']) => void;
  withShadows: (shadows: ThemeCustomization['shadows']) => void;
  withZIndex: (zIndex: ThemeCustomization['zIndex']) => void;
  withVariant: (variant: ThemeVariant) => void;
  withCompositionMode: (mode: CompositionMode) => void;
  withCustomizations: (customizations: ThemeCustomization) => void;
  
  // Theme management
  build: () => BuiltTheme;
  validate: () => ThemeValidationResult;
  preview: () => BuiltTheme;
  apply: () => void;
  reset: () => void;
  clone: () => ThemeBuilder;
  
  // Serialization
  serialize: () => string;
  deserialize: (data: string) => void;
  
  // CSS generation
  generateCSS: () => Record<string, string>;
  
  // Utility methods
  generateColorScale: (baseColor: string) => Record<string, string>;
  generateSemanticColors: (baseColor: string) => any;
  
  // Async versions (for future extensibility - v4.0.0+)
  buildAsync?: () => Promise<BuiltTheme>;
  validateAsync?: () => Promise<ThemeValidationResult>;
  previewAsync?: () => Promise<BuiltTheme>;
  serializeAsync?: () => Promise<string>;
  generateCSSAsync?: () => Promise<Record<string, string>>;
}

/**
 * Hook for using theme builder functionality
 */
export function useThemeBuilder(
  initialBaseTheme: 'light' | 'dark' | 'futuristic' = 'light',
  options: UseThemeBuilderOptions = {}
): UseThemeBuilderResult {
  const { 
    autoApply = false, 
    validateOnBuild = true, 
    config = {} 
  } = options;
  
  const themeContext = useTheme();
  
  // Builder state
  const [builder, setBuilder] = useState(() => 
    createThemeBuilder(config).extends(initialBaseTheme)
  );
  const [builtTheme, setBuiltTheme] = useState<BuiltTheme | null>(null);
  const [validation, setValidation] = useState<ThemeValidationResult | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Computed values
  const isValid = useMemo(() => {
    return validation ? validation.valid : true;
  }, [validation]);
  
  // Builder methods
  const withColors = useCallback((colors: ThemeCustomization['colors']) => {
    setBuilder(prev => prev.clone().withColors(colors));
    setHasChanges(true);
  }, []);
  
  const withTypography = useCallback((typography: ThemeCustomization['typography']) => {
    setBuilder(prev => prev.clone().withTypography(typography));
    setHasChanges(true);
  }, []);
  
  const withSpacing = useCallback((spacing: ThemeCustomization['spacing']) => {
    setBuilder(prev => prev.clone().withSpacing(spacing));
    setHasChanges(true);
  }, []);
  
  const withMotion = useCallback((motion: ThemeCustomization['motion']) => {
    setBuilder(prev => prev.clone().withMotion(motion));
    setHasChanges(true);
  }, []);
  
  const withBreakpoints = useCallback((breakpoints: ThemeCustomization['breakpoints']) => {
    setBuilder(prev => prev.clone().withBreakpoints(breakpoints));
    setHasChanges(true);
  }, []);
  
  const withRadius = useCallback((radius: ThemeCustomization['radius']) => {
    setBuilder(prev => prev.clone().withRadius(radius));
    setHasChanges(true);
  }, []);
  
  const withShadows = useCallback((shadows: ThemeCustomization['shadows']) => {
    setBuilder(prev => prev.clone().withShadows(shadows));
    setHasChanges(true);
  }, []);
  
  const withZIndex = useCallback((zIndex: ThemeCustomization['zIndex']) => {
    setBuilder(prev => prev.clone().withZIndex(zIndex));
    setHasChanges(true);
  }, []);
  
  const withVariant = useCallback((variant: ThemeVariant) => {
    setBuilder(prev => prev.clone().withVariant(variant));
    setHasChanges(true);
  }, []);
  
  const withCompositionMode = useCallback((mode: CompositionMode) => {
    setBuilder(prev => prev.clone().withCompositionMode(mode));
    setHasChanges(true);
  }, []);
  
  const withCustomizations = useCallback((customizations: ThemeCustomization) => {
    setBuilder(prev => prev.clone().withCustomizations(customizations));
    setHasChanges(true);
  }, []);
  
  // Theme management methods
  const build = useCallback(async () => {
    setIsBuilding(true);
    
    try {
      const theme = await builder.build();
      setBuiltTheme(theme);
      
      if (validateOnBuild) {
        const validationResult = await builder.validate(theme);
        setValidation(validationResult);
      }
      
      if (autoApply) {
        themeContext.setCustomTheme(theme);
      }
      
      setHasChanges(false);
      return theme;
    } finally {
      setIsBuilding(false);
    }
  }, [builder, validateOnBuild, autoApply, themeContext]);

  // Synchronous wrapper for build (for backwards compatibility)
  const buildSync = useCallback(() => {
    return builder.buildSync();
  }, [builder]);
  
  // Synchronous wrappers for other methods
  const previewSync = useCallback(() => {
    return builder.buildSync(); // Use buildSync as preview fallback
  }, [builder]);
  
  const validateSync = useCallback(() => {
    // Simple validation without async plugins
    const theme = builtTheme || builder.buildSync();
    return { valid: true, errors: [], warnings: [] };
  }, [builder, builtTheme]);
  
  const serializeSync = useCallback(() => {
    const theme = builtTheme || builder.buildSync();
    const serialized = builder.serialize(theme);
    return JSON.stringify(serialized);
  }, [builder, builtTheme]);
  
  const generateCSSSync = useCallback(() => {
    const theme = builtTheme || builder.buildSync();
    return builder.generateCSSVariables(theme);
  }, [builder, builtTheme]);
  
  const validate = useCallback(async () => {
    const validationResult = await builder.validate(builtTheme || undefined);
    setValidation(validationResult);
    return validationResult;
  }, [builder, builtTheme]);
  
  const preview = useCallback(() => {
    return builder.preview();
  }, [builder]);
  
  const apply = useCallback(async () => {
    if (builtTheme) {
      themeContext.setCustomTheme(builtTheme);
    } else {
      const theme = await build();
      themeContext.setCustomTheme(theme);
    }
  }, [builtTheme, themeContext, build]);
  
  const reset = useCallback(() => {
    setBuilder(createThemeBuilder(config).extends(initialBaseTheme));
    setBuiltTheme(null);
    setValidation(null);
    setHasChanges(false);
  }, [config, initialBaseTheme]);
  
  const clone = useCallback(() => {
    return builder.clone();
  }, [builder]);
  
  // Serialization methods
  const serialize = useCallback(async () => {
    const theme = builtTheme || await builder.build();
    const serialized = builder.serialize(theme);
    return JSON.stringify(serialized);
  }, [builder, builtTheme]);
  
  const deserialize = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      const newBuilder = ThemeBuilder.deserialize(parsed);
      setBuilder(newBuilder);
      setBuiltTheme(parsed.theme);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to deserialize theme data:', error);
      throw error;
    }
  }, []);
  
  // CSS generation
  const generateCSS = useCallback(async () => {
    const theme = builtTheme || await builder.preview();
    return builder.generateCSSVariables(theme);
  }, [builder, builtTheme]);
  
  // Utility methods
  const generateColorScale = useCallback((baseColor: string) => {
    return builder.generateColorScale(baseColor);
  }, [builder]);
  
  const generateSemanticColors = useCallback((baseColor: string) => {
    return builder.generateSemanticColors(baseColor);
  }, [builder]);
  
  return {
    // Builder instance
    builder,
    
    // Current state
    builtTheme,
    validation,
    isBuilding,
    isValid,
    hasChanges,
    
    // Builder methods
    withColors,
    withTypography,
    withSpacing,
    withMotion,
    withBreakpoints,
    withRadius,
    withShadows,
    withZIndex,
    withVariant,
    withCompositionMode,
    withCustomizations,
    
    // Theme management (sync - for current compatibility)
    build: buildSync,  // Use sync version for current interface
    validate: validateSync,
    preview: previewSync,
    apply,
    reset,
    clone,
    
    // Async theme management (for future extensibility)
    buildAsync: build,
    validateAsync: validate,
    previewAsync: preview,
    
    // Serialization (sync for compatibility)
    serialize: serializeSync,
    deserialize,
    
    // CSS generation (sync for compatibility)  
    generateCSS: generateCSSSync,
    
    // Async versions (for future extensibility)
    serializeAsync: serialize,
    generateCSSAsync: generateCSS,
    
    // Utility methods
    generateColorScale,
    generateSemanticColors,
  };
}

/**
 * Hook for quick theme customization
 */
export function useQuickTheme(
  preset: 'light' | 'dark' | 'futuristic' | 'high-contrast' = 'light'
): Pick<UseThemeBuilderResult, 'build' | 'apply' | 'withColors' | 'withVariant' | 'builtTheme'> {
  const { build, apply, withColors, withVariant, builtTheme } = useThemeBuilder(
    preset === 'high-contrast' ? 'light' : preset,
    { autoApply: true }
  );
  
  // Apply high-contrast variant if needed
  if (preset === 'high-contrast') {
    withVariant('high-contrast');
  }
  
  return {
    build,
    apply,
    withColors,
    withVariant,
    builtTheme,
  };
}

/**
 * Hook for theme variant switching
 */
export function useThemeVariant(): {
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
  availableVariants: ThemeVariant[];
} {
  const { variant, setVariant } = useTheme();
  
  const availableVariants: ThemeVariant[] = ['default', 'compact', 'comfortable', 'high-contrast'];
  
  return {
    variant,
    setVariant,
    availableVariants,
  };
}

/**
 * Hook for accessibility-focused theme management
 */
export function useAccessibleTheme(): {
  isHighContrast: boolean;
  enableHighContrast: () => void;
  disableHighContrast: () => void;
  prefersReducedMotion: boolean;
  respectMotionPreferences: () => void;
} {
  const { variant, setVariant } = useTheme();
  
  const isHighContrast = variant === 'high-contrast';
  
  const enableHighContrast = useCallback(() => {
    setVariant('high-contrast');
  }, [setVariant]);
  
  const disableHighContrast = useCallback(() => {
    setVariant('default');
  }, [setVariant]);
  
  // Check for user's motion preferences
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  
  const respectMotionPreferences = useCallback(() => {
    if (prefersReducedMotion && variant !== 'high-contrast') {
      setVariant('high-contrast'); // High contrast variant also reduces motion
    }
  }, [prefersReducedMotion, variant, setVariant]);
  
  return {
    isHighContrast,
    enableHighContrast,
    disableHighContrast,
    prefersReducedMotion,
    respectMotionPreferences,
  };
}