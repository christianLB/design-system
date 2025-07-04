/**
 * Accessibility Plugin
 * Provides comprehensive accessibility enhancements for themes
 */

import {
  AccessibilityPlugin,
  PluginContext,
  PluginResult,
  PluginConfig,
} from './types';
import { colord, extend } from 'colord';
import a11y from 'colord/plugins/a11y';

// Register the a11y plugin
extend([a11y]);
import type { BuiltTheme } from '../builder/types';

/**
 * Accessibility plugin configuration
 */
export interface AccessibilityPluginConfig extends PluginConfig {
  // Contrast checking
  contrastChecker?: {
    enabled?: boolean;
    level?: 'AA' | 'AAA';
    largeTextSize?: number;
    autoFix?: boolean;
    reportOnly?: boolean;
  };
  
  // Color blindness support
  colorBlindnessSupport?: {
    enabled?: boolean;
    types?: ('protanopia' | 'deuteranopia' | 'tritanopia')[];
    addPatterns?: boolean;
    addIcons?: boolean;
    simulationMode?: boolean;
  };
  
  // Screen reader optimization
  screenReaderOptimization?: {
    enabled?: boolean;
    addAriaLabels?: boolean;
    improveSemantics?: boolean;
    addSkipLinks?: boolean;
    enhanceFocus?: boolean;
  };
  
  // Keyboard navigation
  keyboardNavigation?: {
    enabled?: boolean;
    enhanceFocusRings?: boolean;
    addFocusTraps?: boolean;
    improveTabOrder?: boolean;
    addKeyboardShortcuts?: boolean;
  };
  
  // Reduced motion
  reducedMotion?: {
    enabled?: boolean;
    autoDetect?: boolean;
    fallbackDuration?: string;
    simplifyAnimations?: boolean;
    disableParallax?: boolean;
  };
  
  // High contrast
  highContrast?: {
    enabled?: boolean;
    autoDetect?: boolean;
    contrastRatio?: number;
    forcedColors?: boolean;
    customPalette?: Record<string, string>;
  };
}

/**
 * WCAG contrast ratio requirements
 */
const WCAG_CONTRAST_RATIOS = {
  AA: {
    normal: 4.5,
    large: 3,
  },
  AAA: {
    normal: 7,
    large: 4.5,
  },
};

/**
 * Default accessibility plugin configuration
 */
const defaultAccessibilityConfig: AccessibilityPluginConfig = {
  contrastChecker: {
    enabled: true,
    level: 'AA',
    largeTextSize: 18,
    autoFix: false,
    reportOnly: true,
  },
  colorBlindnessSupport: {
    enabled: true,
    types: ['protanopia', 'deuteranopia', 'tritanopia'],
    addPatterns: true,
    addIcons: true,
    simulationMode: false,
  },
  screenReaderOptimization: {
    enabled: true,
    addAriaLabels: true,
    improveSemantics: true,
    addSkipLinks: true,
    enhanceFocus: true,
  },
  keyboardNavigation: {
    enabled: true,
    enhanceFocusRings: true,
    addFocusTraps: false,
    improveTabOrder: false,
    addKeyboardShortcuts: false,
  },
  reducedMotion: {
    enabled: true,
    autoDetect: true,
    fallbackDuration: '0.01ms',
    simplifyAnimations: true,
    disableParallax: true,
  },
  highContrast: {
    enabled: true,
    autoDetect: true,
    contrastRatio: 4.5,
    forcedColors: false,
    customPalette: {},
  },
};

/**
 * Accessibility utilities
 */
class AccessibilityUtils {
  /**
   * Calculate contrast ratio between two colors
   */
  static getContrastRatio(foreground: string, background: string): number {
    const fg = colord(foreground);
    const bg = colord(background);
    return fg.contrast(bg);
  }

  /**
   * Check if contrast ratio meets WCAG requirements
   */
  static meetsContrast(
    foreground: string, 
    background: string, 
    level: 'AA' | 'AAA' = 'AA',
    isLargeText: boolean = false
  ): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    const required = WCAG_CONTRAST_RATIOS[level][isLargeText ? 'large' : 'normal'];
    return ratio >= required;
  }

  /**
   * Find the closest color that meets contrast requirements
   */
  static findAccessibleColor(
    foreground: string, 
    background: string, 
    level: 'AA' | 'AAA' = 'AA',
    isLargeText: boolean = false
  ): string {
    const required = WCAG_CONTRAST_RATIOS[level][isLargeText ? 'large' : 'normal'];
    const fg = colord(foreground);
    const bg = colord(background);
    
    if (fg.contrast(bg) >= required) {
      return foreground;
    }

    // Try adjusting lightness
    let adjustedColor = fg;
    const bgLuminance = bg.luminance();
    
    // If background is light, make foreground darker
    // If background is dark, make foreground lighter
    if (bgLuminance > 0.5) {
      // Dark foreground on light background
      let lightness = adjustedColor.toHsl().l;
      while (lightness > 0 && adjustedColor.contrast(bg) < required) {
        lightness -= 5;
        adjustedColor = colord({ h: adjustedColor.toHsl().h, s: adjustedColor.toHsl().s, l: lightness });
      }
    } else {
      // Light foreground on dark background
      let lightness = adjustedColor.toHsl().l;
      while (lightness < 100 && adjustedColor.contrast(bg) < required) {
        lightness += 5;
        adjustedColor = colord({ h: adjustedColor.toHsl().h, s: adjustedColor.toHsl().s, l: lightness });
      }
    }

    return adjustedColor.toHex();
  }

  /**
   * Generate color blind friendly palette
   */
  static generateColorBlindFriendlyPalette(baseColors: string[]): Record<string, string> {
    // Use colors that are distinguishable for common color blindness types
    const colorBlindSafeColors = [
      '#1f77b4', // Blue
      '#ff7f0e', // Orange
      '#2ca02c', // Green
      '#d62728', // Red
      '#9467bd', // Purple
      '#8c564b', // Brown
      '#e377c2', // Pink
      '#7f7f7f', // Gray
      '#bcbd22', // Olive
      '#17becf', // Cyan
    ];

    const palette: Record<string, string> = {};
    
    baseColors.forEach((color, index) => {
      if (index < colorBlindSafeColors.length) {
        palette[color] = colorBlindSafeColors[index];
      }
    });

    return palette;
  }

  /**
   * Add texture patterns for color blind users
   */
  static generateTexturePatterns(): Record<string, string> {
    return {
      primary: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
          <rect width="2" height="2" fill="currentColor" opacity="0.3"/>
          <rect x="2" y="2" width="2" height="2" fill="currentColor" opacity="0.3"/>
        </svg>
      `)}")`,
      secondary: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3"/>
        </svg>
      `)}")`,
      success: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 2L2 0L4 2L2 4Z" fill="currentColor" opacity="0.3"/>
        </svg>
      `)}")`,
      warning: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L4 0L4 4L0 4Z" fill="currentColor" opacity="0.3"/>
        </svg>
      `)}")`,
      destructive: `url("data:image/svg+xml,${encodeURIComponent(`
        <svg width="4" height="4" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L4 4M4 0L0 4" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>
        </svg>
      `)}")`,
    };
  }

  /**
   * Detect browser accessibility preferences
   */
  static detectAccessibilityPreferences() {
    if (typeof window === 'undefined') {
      return {
        reducedMotion: false,
        highContrast: false,
        forcedColors: false,
      };
    }

    return {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      highContrast: window.matchMedia('(prefers-contrast: high)').matches,
      forcedColors: window.matchMedia('(forced-colors: active)').matches,
    };
  }
}

/**
 * Create accessibility plugin
 */
export function createAccessibilityPlugin(
  config: AccessibilityPluginConfig = {}
): AccessibilityPlugin {
  const mergedConfig = { ...defaultAccessibilityConfig, ...config };

  return {
    name: 'accessibility',
    version: '1.0.0',
    description: 'Comprehensive accessibility enhancements for themes',
    category: 'accessibility',
    priority: 'high',
    tags: ['accessibility', 'wcag', 'a11y', 'contrast', 'color-blind'],
    defaultConfig: mergedConfig,
    
    features: {
      contrastChecker: mergedConfig.contrastChecker?.enabled,
      colorBlindnessSupport: mergedConfig.colorBlindnessSupport?.enabled,
      screenReaderOptimization: mergedConfig.screenReaderOptimization?.enabled,
      keyboardNavigation: mergedConfig.keyboardNavigation?.enabled,
      reducedMotion: mergedConfig.reducedMotion?.enabled,
      highContrast: mergedConfig.highContrast?.enabled,
    },

    hooks: {
      afterThemeBuild: async (context: PluginContext, config: AccessibilityPluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };
        const { theme } = context;
        const modifications: any = { theme: {}, cssVariables: {} };
        const warnings: string[] = [];

        try {
          // Contrast checking
          if (finalConfig.contrastChecker?.enabled) {
            const contrastResults = checkContrast(theme, finalConfig.contrastChecker);
            warnings.push(...contrastResults.warnings);
            
            if (finalConfig.contrastChecker.autoFix && contrastResults.fixes) {
              Object.assign(modifications.theme, contrastResults.fixes);
            }
          }

          // Color blindness support
          if (finalConfig.colorBlindnessSupport?.enabled) {
            const colorBlindSupport = addColorBlindnessSupport(theme, finalConfig.colorBlindnessSupport);
            Object.assign(modifications.cssVariables, colorBlindSupport.cssVariables);
            Object.assign(modifications.theme, colorBlindSupport.theme);
          }

          // Reduced motion support
          if (finalConfig.reducedMotion?.enabled) {
            const reducedMotionCSS = addReducedMotionSupport(finalConfig.reducedMotion);
            Object.assign(modifications.cssVariables, reducedMotionCSS);
          }

          // High contrast support
          if (finalConfig.highContrast?.enabled) {
            const highContrastSupport = addHighContrastSupport(theme, finalConfig.highContrast);
            Object.assign(modifications.cssVariables, highContrastSupport);
          }

          // Enhanced focus rings
          if (finalConfig.keyboardNavigation?.enhanceFocusRings) {
            const focusEnhancements = addFocusEnhancements();
            Object.assign(modifications.cssVariables, focusEnhancements);
          }

          return {
            success: true,
            warnings,
            modifications,
          };
        } catch (error) {
          return {
            success: false,
            error: error as Error,
          };
        }
      },

      onThemeChange: async (context: PluginContext, config: AccessibilityPluginConfig = {}): Promise<PluginResult> => {
        const finalConfig = { ...mergedConfig, ...config };
        
        // Update accessibility preferences based on user settings
        if (finalConfig.reducedMotion?.autoDetect || finalConfig.highContrast?.autoDetect) {
          const preferences = AccessibilityUtils.detectAccessibilityPreferences();
          
          return {
            success: true,
            data: { preferences },
          };
        }

        return { success: true };
      },
    },

    init: async (config: AccessibilityPluginConfig = {}) => {
      // Add accessibility event listeners
      if (typeof window !== 'undefined') {
        // Listen for reduced motion preference changes
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionQuery.addEventListener('change', (e) => {
          document.documentElement.style.setProperty(
            '--accessibility-reduced-motion', 
            e.matches ? '1' : '0'
          );
        });

        // Listen for high contrast preference changes
        const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
        highContrastQuery.addEventListener('change', (e) => {
          document.documentElement.style.setProperty(
            '--accessibility-high-contrast', 
            e.matches ? '1' : '0'
          );
        });

        // Set initial values
        document.documentElement.style.setProperty(
          '--accessibility-reduced-motion', 
          reducedMotionQuery.matches ? '1' : '0'
        );
        document.documentElement.style.setProperty(
          '--accessibility-high-contrast', 
          highContrastQuery.matches ? '1' : '0'
        );
      }
    },
  };
}

/**
 * Check color contrast in theme
 */
function checkContrast(
  theme: BuiltTheme, 
  config: NonNullable<AccessibilityPluginConfig['contrastChecker']>
): { warnings: string[]; fixes?: any } {
  const warnings: string[] = [];
  const fixes: any = {};

  // Check primary colors
  const { colors } = theme;
  
  // Check primary color combinations
  if (!AccessibilityUtils.meetsContrast(colors.primary.foreground, colors.primary.DEFAULT, config.level)) {
    const warning = `Primary color contrast ratio is below ${config.level} standard`;
    warnings.push(warning);
    
    if (config.autoFix) {
      fixes.colors = fixes.colors || {};
      fixes.colors.primary = fixes.colors.primary || {};
      fixes.colors.primary.foreground = AccessibilityUtils.findAccessibleColor(
        colors.primary.foreground,
        colors.primary.DEFAULT,
        config.level
      );
    }
  }

  // Check background/foreground
  if (!AccessibilityUtils.meetsContrast(colors.foreground, colors.background, config.level)) {
    const warning = `Background/foreground contrast ratio is below ${config.level} standard`;
    warnings.push(warning);
    
    if (config.autoFix) {
      fixes.colors = fixes.colors || {};
      fixes.colors.foreground = AccessibilityUtils.findAccessibleColor(
        colors.foreground,
        colors.background,
        config.level
      );
    }
  }

  return { warnings, fixes: Object.keys(fixes).length > 0 ? fixes : undefined };
}

/**
 * Add color blindness support
 */
function addColorBlindnessSupport(
  theme: BuiltTheme,
  config: NonNullable<AccessibilityPluginConfig['colorBlindnessSupport']>
): { cssVariables: Record<string, string>; theme: any } {
  const cssVariables: Record<string, string> = {};
  const themeModifications: any = {};

  if (config.addPatterns) {
    const patterns = AccessibilityUtils.generateTexturePatterns();
    Object.entries(patterns).forEach(([key, pattern]) => {
      cssVariables[`--pattern-${key}`] = pattern;
    });
  }

  if (config.simulationMode) {
    // Add CSS filters for color blindness simulation
    cssVariables['--colorblind-protanopia-filter'] = 'url("#protanopia")';
    cssVariables['--colorblind-deuteranopia-filter'] = 'url("#deuteranopia")';
    cssVariables['--colorblind-tritanopia-filter'] = 'url("#tritanopia")';
  }

  return { cssVariables, theme: themeModifications };
}

/**
 * Add reduced motion support
 */
function addReducedMotionSupport(
  config: NonNullable<AccessibilityPluginConfig['reducedMotion']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  cssVariables['--motion-duration-normal'] = 'var(--accessibility-reduced-motion, 0) * 0.01ms + (1 - var(--accessibility-reduced-motion, 0)) * 300ms';
  cssVariables['--motion-duration-fast'] = 'var(--accessibility-reduced-motion, 0) * 0.01ms + (1 - var(--accessibility-reduced-motion, 0)) * 150ms';
  cssVariables['--motion-duration-slow'] = 'var(--accessibility-reduced-motion, 0) * 0.01ms + (1 - var(--accessibility-reduced-motion, 0)) * 500ms';

  if (config.fallbackDuration) {
    cssVariables['--motion-fallback-duration'] = config.fallbackDuration;
  }

  return cssVariables;
}

/**
 * Add high contrast support
 */
function addHighContrastSupport(
  theme: BuiltTheme,
  config: NonNullable<AccessibilityPluginConfig['highContrast']>
): Record<string, string> {
  const cssVariables: Record<string, string> = {};

  // High contrast color overrides
  if (config.forcedColors) {
    cssVariables['--hc-text'] = 'CanvasText';
    cssVariables['--hc-background'] = 'Canvas';
    cssVariables['--hc-button-text'] = 'ButtonText';
    cssVariables['--hc-button-background'] = 'ButtonFace';
    cssVariables['--hc-link'] = 'LinkText';
    cssVariables['--hc-border'] = 'GrayText';
  }

  // Custom high contrast palette
  if (config.customPalette) {
    Object.entries(config.customPalette).forEach(([key, value]) => {
      cssVariables[`--hc-${key}`] = value;
    });
  }

  return cssVariables;
}

/**
 * Add focus enhancements
 */
function addFocusEnhancements(): Record<string, string> {
  return {
    '--focus-ring-width': '2px',
    '--focus-ring-style': 'solid',
    '--focus-ring-color': 'var(--ring, #2563eb)',
    '--focus-ring-offset': '2px',
    '--focus-ring-shadow': '0 0 0 var(--focus-ring-offset) transparent, 0 0 0 calc(var(--focus-ring-width) + var(--focus-ring-offset)) var(--focus-ring-color)',
  };
}

/**
 * Default accessibility plugin instance
 */
export const accessibilityPlugin = createAccessibilityPlugin();

export default accessibilityPlugin;