export {
  theme,
  lightTheme,
  darkTheme,
  futuristicTheme,
  cyberpunkTheme,
  alienTheme,
  mirthaTheme,
} from './theme';
export { alienEffects } from './theme.alien';
export { mirthaEffects } from './theme.mirtha';
export type { DesignTokens, AlienTheme, MirthaTheme } from './theme';
export { ThemeProvider, useTheme } from './ThemeContext';
export type { Theme } from './ThemeContext';

// Theme Builder exports
export {
  ThemeBuilder,
  createThemeBuilder,
  quickTheme,
  defaultThemeBuilderConfig,
} from './builder/ThemeBuilder';

export type {
  BuiltTheme,
  ThemeCustomization,
  AnimationCustomization,
  ThemeVariant,
  CompositionMode,
  ThemeBuilderConfig,
  ThemeBuilderEvent,
  ThemeValidationResult,
  ThemeValidationError,
  ThemeValidationWarning,
  SerializedTheme,
  ConflictResolutionConfig,
  ColorCustomization,
  TypographyCustomization,
  SpacingCustomization,
  MotionCustomization,
  BreakpointCustomization,
  RadiusCustomization,
  ShadowCustomization,
  ZIndexCustomization,
} from './builder/types';

// Theme composition utilities
export {
  composeThemes,
  mergeThemes,
  overrideTheme,
  extendTheme,
  applyCustomizations,
  defaultConflictResolutionConfig,
} from './builder/composition';

// Theme variant utilities
export {
  applyVariant,
  variantConfigs,
  getVariantClassNames,
  getVariantCSSProperties,
  isAccessibilityVariant,
  getRecommendedVariant,
} from './builder/variants';

// Theme validation utilities
export { validateTheme, defaultValidationConfig } from './builder/validation';

export type { ValidationConfig, ValidationRule } from './builder/validation';

// Enhanced color utilities
export {
  generateColorScale,
  generateSemanticColors,
  generateColorPalette,
  isAccessible,
  getContrastRatio,
  findBestForeground,
  validateColorPalette,
} from './utils/colorScale';

// Color tokens and scales
export {
  baseColors,
  colorScales,
  lightColorTokens,
  darkColorTokens,
  futuristicColorTokens,
  cyberpunkColorTokens,
  alienColorTokens,
  mirthaColorTokens,
  colorTokens,
} from './tokens/colors';

export type { SemanticColorTokens, ColorScales, BaseColors, ColorTokens } from './tokens/colors';

// Animation System exports
export * from './animation';
export {
  AnimationBuilder,
  createAnimation,
  quickAnimations,
  animationPresets,
  presetCollections,
} from './animation';

export type {
  AnimationTokens,
  AnimationDurationTokens,
  AnimationEasingTokens,
  AnimationKeyframeTokens,
  AnimationConfigTokens,
  MotionPreferences,
  AnimationProperty,
  CSSInJSAnimation,
  AnimationPreset,
  PresetCategory,
} from './animation';

// Plugin System exports
export * from './plugins';
export {
  PluginManager,
  createPluginManager,
  accessibilityPlugin,
  motionPlugin,
  performancePlugin,
  PluginUtils,
} from './plugins';

export type {
  ThemePlugin,
  PluginManagerConfig,
  PluginContext,
  PluginResult,
  PluginLifecycle,
  PluginPriority,
  PluginCategory,
  AccessibilityPlugin,
  PerformancePlugin,
  AnimationPlugin,
} from './plugins';
