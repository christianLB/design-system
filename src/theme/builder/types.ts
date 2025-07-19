/**
 * Type definitions for the Theme Builder system
 */

import type { ThemeTokens } from '../theme.light';
import type { SemanticColorTokens } from '../tokens/colors';
import type { AnimationTokens } from '../tokens/animation';
import type { ThemePlugin } from '../plugins/types';

/**
 * Theme variant types for different UI densities and accessibility needs
 */
export type ThemeVariant = 'default' | 'compact' | 'comfortable' | 'high-contrast' | 'custom';

/**
 * Theme composition modes
 */
export type CompositionMode = 'merge' | 'override' | 'extend';

/**
 * Color customization options
 */
export interface ColorCustomization {
  primary?: string;
  secondary?: string;
  destructive?: string;
  success?: string;
  warning?: string;
  background?: string;
  foreground?: string;
  surface?: {
    background?: string;
    foreground?: string;
    card?: string;
    cardForeground?: string;
    popover?: string;
    popoverForeground?: string;
  };
  border?: {
    default?: string;
    input?: string;
    ring?: string;
  };
  muted?: {
    background?: string;
    foreground?: string;
  };
  accent?: {
    background?: string;
    foreground?: string;
  };
}

/**
 * Typography customization options
 */
export interface TypographyCustomization {
  fontFamily?: string;
  fontSize?: {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    '2xl'?: string;
  };
  fontWeight?: {
    light?: number;
    normal?: number;
    medium?: number;
    semibold?: number;
    bold?: number;
  };
  lineHeight?: {
    tight?: number;
    snug?: number;
    normal?: number;
    relaxed?: number;
    loose?: number;
  };
  letterSpacing?: {
    tight?: string;
    normal?: string;
    wide?: string;
  };
}

/**
 * Spacing customization options
 */
export interface SpacingCustomization {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  '3xl'?: string;
  '4xl'?: string;
  '5xl'?: string;
  '6xl'?: string;
}

/**
 * Motion customization options
 */
export interface MotionCustomization {
  duration?: {
    instant?: string;
    fast?: string;
    normal?: string;
    slow?: string;
    slower?: string;
    slowest?: string;
  };
  easing?: {
    linear?: string;
    ease?: string;
    easeIn?: string;
    easeOut?: string;
    easeInOut?: string;
    sharp?: string;
    bounce?: string;
    elastic?: string;
    back?: string;
    [key: string]: string | undefined;
  };
  keyframes?: {
    [key: string]: Record<string, any>;
  };
  config?: {
    delays?: {
      none?: string;
      short?: string;
      medium?: string;
      long?: string;
    };
    iterations?: {
      once?: number;
      twice?: number;
      infinite?: number;
    };
  };
}

/**
 * Breakpoint customization options
 */
export interface BreakpointCustomization {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}

/**
 * Border radius customization options
 */
export interface RadiusCustomization {
  none?: string;
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  '3xl'?: string;
  full?: string;
}

/**
 * Shadow customization options
 */
export interface ShadowCustomization {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  inner?: string;
  none?: string;
}

/**
 * Z-index customization options
 */
export interface ZIndexCustomization {
  hide?: number;
  auto?: number;
  base?: number;
  docked?: number;
  dropdown?: number;
  sticky?: number;
  banner?: number;
  overlay?: number;
  modal?: number;
  popover?: number;
  skipLink?: number;
  toast?: number;
  tooltip?: number;
}

/**
 * Animation customization options
 */
export interface AnimationCustomization {
  tokens?: Partial<AnimationTokens>;
  presets?: {
    [key: string]: {
      keyframes: Record<string, any>;
      duration: string;
      easing: string;
    };
  };
  plugins?: ThemePlugin[];
}

/**
 * Complete theme customization options
 */
export interface ThemeCustomization {
  colors?: ColorCustomization;
  typography?: TypographyCustomization;
  spacing?: SpacingCustomization;
  motion?: MotionCustomization;
  animations?: AnimationCustomization;
  breakpoints?: BreakpointCustomization;
  radius?: RadiusCustomization;
  shadows?: ShadowCustomization;
  zIndex?: ZIndexCustomization;
}

/**
 * Built theme with all tokens resolved
 */
export interface BuiltTheme extends Omit<ThemeTokens, 'radius'> {
  // Extended properties for the theme builder
  meta: {
    name: string;
    version: string;
    description?: string;
    author?: string;
    baseTheme?: string;
    variant: ThemeVariant;
    compositionMode: CompositionMode;
    customizations: ThemeCustomization;
    plugins?: string[];
    createdAt: string;
    updatedAt: string;
  };

  // Enhanced typing for colors
  colors: SemanticColorTokens;

  // Animation system integration
  animations?: AnimationTokens;

  // Additional theme tokens
  shadows?: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
  };

  // Enhanced radius with more options (overrides ThemeTokens.radius)
  radius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };

  // Enhanced z-index with more layers (overrides ThemeTokens.zIndex)
  zIndex: {
    hide: number;
    auto: number;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
  };
}

/**
 * Theme validation result
 */
export interface ThemeValidationResult {
  valid: boolean;
  errors: ThemeValidationError[];
  warnings: ThemeValidationWarning[];
}

/**
 * Theme validation error
 */
export interface ThemeValidationError {
  type: 'color' | 'typography' | 'spacing' | 'motion' | 'breakpoint' | 'general';
  property: string;
  message: string;
  suggestions?: string[];
}

/**
 * Theme validation warning
 */
export interface ThemeValidationWarning {
  type: 'accessibility' | 'performance' | 'compatibility' | 'best-practice';
  property: string;
  message: string;
  suggestions?: string[];
}

/**
 * Theme serialization format
 */
export interface SerializedTheme {
  version: string;
  theme: BuiltTheme;
  checksum: string;
  exportedAt: string;
}

/**
 * Theme builder configuration
 */
export interface ThemeBuilderConfig {
  enableValidation: boolean;
  strictMode: boolean;
  generateCSSVariables: boolean;
  accessibilityChecks: boolean;
  performanceOptimizations: boolean;
  validateContrast: boolean;
  allowUnsafeColors: boolean;
  enableAnimations: boolean;
  enablePlugins: boolean;
  pluginTimeout: number;
  compositionMode?: CompositionMode;
}

/**
 * Theme builder event types
 */
export type ThemeBuilderEvent =
  | { type: 'theme-built'; theme: BuiltTheme }
  | { type: 'validation-error'; errors: ThemeValidationError[] }
  | { type: 'validation-warning'; warnings: ThemeValidationWarning[] }
  | { type: 'composition-complete'; theme: BuiltTheme }
  | { type: 'customization-applied'; customization: ThemeCustomization };

/**
 * Theme builder event listener
 */
export type ThemeBuilderEventListener = (event: ThemeBuilderEvent) => void;

/**
 * Color conflict resolution strategy
 */
export type ColorConflictResolution = 'auto' | 'prefer-base' | 'prefer-override' | 'blend';

/**
 * Theme conflict resolution configuration
 */
export interface ConflictResolutionConfig {
  colorConflicts: ColorConflictResolution;
  preserveAccessibility: boolean;
  prioritizeUserCustomizations: boolean;
  allowPartialOverrides: boolean;
}
