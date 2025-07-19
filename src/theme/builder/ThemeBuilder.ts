/**
 * Main ThemeBuilder class for creating and composing themes with fluent API
 */

// Simple event emitter for browser compatibility
class SimpleEventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  addListener(event: string, listener: Function): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
    return this;
  }

  removeListener(event: string, listener: Function): this {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
    return this;
  }

  emit(event: string, data?: any): boolean {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
      return true;
    }
    return false;
  }

  on(event: string, listener: Function): this {
    return this.addListener(event, listener);
  }

  off(event: string, listener: Function): this {
    return this.removeListener(event, listener);
  }
}
import { colord } from 'colord';
import type { ThemeTokens } from '../theme.light';
import type { SemanticColorTokens } from '../tokens/colors';
import type {
  BuiltTheme,
  ThemeCustomization,
  ThemeVariant,
  CompositionMode,
  ThemeBuilderConfig,
  ThemeBuilderEvent,
  ThemeBuilderEventListener,
  ThemeValidationResult,
  ConflictResolutionConfig,
  SerializedTheme,
  AnimationCustomization,
} from './types';
import {
  AnimationTokens,
  animationTokens,
  animationKeyframeTokens,
  animationConfigTokens,
} from '../tokens/animation';
import { AnimationBuilder, createAnimation } from '../animation/AnimationBuilder';
import { PluginManager, createPluginManager } from '../plugins/PluginManager';
import { ThemePlugin, PluginUtils } from '../plugins/types';
import { composeThemes, applyCustomizations, defaultConflictResolutionConfig } from './composition';
import { applyVariant, variantConfigs } from './variants';
import { validateTheme, defaultValidationConfig } from './validation';
import { generateColorScale, generateSemanticColors } from '../utils/colorScale';
import { lightTheme } from '../theme.light';
import { darkTheme } from '../theme.dark';
import { futuristicTheme } from '../theme.futuristic';
import { cyberpunkTheme } from '../theme.cyberpunk';
import { alienTheme } from '../theme.alien';

/**
 * Default theme builder configuration
 */
export const defaultThemeBuilderConfig: ThemeBuilderConfig = {
  enableValidation: true,
  strictMode: false,
  generateCSSVariables: true,
  accessibilityChecks: true,
  performanceOptimizations: true,
  validateContrast: true,
  allowUnsafeColors: false,
  enableAnimations: true,
  enablePlugins: true,
  pluginTimeout: 5000,
};

/**
 * Theme builder class with fluent API
 */
export class ThemeBuilder extends SimpleEventEmitter {
  private baseTheme: BuiltTheme;
  private customizations: ThemeCustomization = {};
  private variant: ThemeVariant = 'default';
  private compositionMode: CompositionMode = 'merge';
  private config: ThemeBuilderConfig;
  private conflictResolution: ConflictResolutionConfig;
  private builtTheme: BuiltTheme | null = null;
  private validationResult: ThemeValidationResult | null = null;
  private animationBuilder: AnimationBuilder | null = null;
  private pluginManager: PluginManager | null = null;

  // Missing properties identified by validation
  private name: string = 'Custom Theme';
  private plugins: ThemePlugin[] = [];
  private currentVariant: ThemeVariant = 'default';
  private registeredPlugins: ThemePlugin[] = [];
  private colorOverrides?: any;
  private animationOverrides?: any;

  constructor(config: Partial<ThemeBuilderConfig> = {}) {
    super();
    this.config = { ...defaultThemeBuilderConfig, ...config };
    this.conflictResolution = defaultConflictResolutionConfig;

    // Initialize with light theme as default
    this.baseTheme = this.createDefaultTheme(lightTheme);

    // Sync variant properties
    this.currentVariant = this.variant;

    // Initialize animation system if enabled
    if (this.config.enableAnimations) {
      this.animationBuilder = createAnimation(animationTokens);
    }

    // Initialize plugin system if enabled
    if (this.config.enablePlugins) {
      this.pluginManager = createPluginManager({
        maxExecutionTime: this.config.pluginTimeout,
        enabledByDefault: true,
        autoInitialize: true,
      });
    }
  }

  /**
   * Create a new theme builder instance
   */
  static create(config?: Partial<ThemeBuilderConfig>): ThemeBuilder {
    return new ThemeBuilder(config);
  }

  /**
   * Start with a base theme
   */
  extends(
    baseTheme: ThemeTokens | BuiltTheme | 'light' | 'dark' | 'futuristic' | 'cyberpunk' | 'alien',
  ): ThemeBuilder {
    if (typeof baseTheme === 'string') {
      switch (baseTheme) {
        case 'light':
          this.baseTheme = this.createDefaultTheme(lightTheme);
          break;
        case 'dark':
          this.baseTheme = this.createDefaultTheme(darkTheme);
          break;
        case 'futuristic':
          this.baseTheme = this.createDefaultTheme(futuristicTheme);
          break;
        case 'cyberpunk':
          this.baseTheme = this.createDefaultTheme(cyberpunkTheme);
          break;
        case 'alien':
          this.baseTheme = this.createDefaultTheme(alienTheme);
          break;
        default:
          throw new Error(`Unknown base theme: ${baseTheme}`);
      }
    } else if (this.isBuiltTheme(baseTheme)) {
      this.baseTheme = JSON.parse(JSON.stringify(baseTheme));
    } else {
      this.baseTheme = this.createDefaultTheme(baseTheme);
    }

    return this;
  }

  /**
   * Apply color customizations
   */
  withColors(colors: ThemeCustomization['colors']): ThemeBuilder {
    this.customizations.colors = {
      ...this.customizations.colors,
      ...colors,
    };
    return this;
  }

  /**
   * Apply typography customizations
   */
  withTypography(typography: ThemeCustomization['typography']): ThemeBuilder {
    this.customizations.typography = {
      ...this.customizations.typography,
      ...typography,
    };
    return this;
  }

  /**
   * Apply spacing customizations
   */
  withSpacing(spacing: ThemeCustomization['spacing']): ThemeBuilder {
    this.customizations.spacing = {
      ...this.customizations.spacing,
      ...spacing,
    };
    return this;
  }

  /**
   * Apply motion customizations
   */
  withMotion(motion: ThemeCustomization['motion']): ThemeBuilder {
    this.customizations.motion = {
      ...this.customizations.motion,
      ...motion,
    };
    return this;
  }

  /**
   * Apply animation customizations
   */
  withAnimations(animations: AnimationCustomization): ThemeBuilder {
    this.customizations.animations = {
      ...this.customizations.animations,
      ...animations,
    };

    // Update animation builder with new tokens
    if (this.animationBuilder && animations.tokens) {
      this.animationBuilder = createAnimation({
        ...animationTokens,
        ...animations.tokens,
      });
    }

    // Register animation plugins
    if (this.pluginManager && animations.plugins) {
      animations.plugins.forEach((plugin) => {
        this.registerPlugin(plugin);
      });
    }

    return this;
  }

  /**
   * Register a plugin
   */
  async registerPlugin(plugin: ThemePlugin): Promise<ThemeBuilder> {
    if (!this.pluginManager) {
      console.warn('Plugin system is disabled. Enable it in ThemeBuilder config.');
      return this;
    }

    try {
      await this.pluginManager.register(plugin);
      this.registeredPlugins.push(plugin);

      // Emit plugin registered event
      this.emit('plugin-registered', { type: 'plugin-registered', plugin });
    } catch (error) {
      console.error('Failed to register plugin:', error);
    }

    return this;
  }

  /**
   * Unregister a plugin
   */
  async unregisterPlugin(pluginName: string): Promise<ThemeBuilder> {
    if (!this.pluginManager) {
      return this;
    }

    try {
      await this.pluginManager.unregister(pluginName);
      this.registeredPlugins = this.registeredPlugins.filter((p) => p.name !== pluginName);

      // Emit plugin unregistered event
      this.emit('plugin-unregistered', { type: 'plugin-unregistered', pluginName });
    } catch (error) {
      console.error('Failed to unregister plugin:', error);
    }

    return this;
  }

  /**
   * Get animation builder
   */
  getAnimationBuilder(): AnimationBuilder | null {
    return this.animationBuilder;
  }

  /**
   * Get plugin manager
   */
  getPluginManager(): PluginManager | null {
    return this.pluginManager;
  }

  /**
   * Create animation with current tokens
   */
  createAnimation(): AnimationBuilder | null {
    if (!this.animationBuilder) {
      console.warn('Animation system is disabled. Enable it in ThemeBuilder config.');
      return null;
    }

    return this.animationBuilder.clone();
  }

  /**
   * Apply breakpoint customizations
   */
  withBreakpoints(breakpoints: ThemeCustomization['breakpoints']): ThemeBuilder {
    this.customizations.breakpoints = {
      ...this.customizations.breakpoints,
      ...breakpoints,
    };
    return this;
  }

  /**
   * Apply radius customizations
   */
  withRadius(radius: ThemeCustomization['radius']): ThemeBuilder {
    this.customizations.radius = {
      ...this.customizations.radius,
      ...radius,
    };
    return this;
  }

  /**
   * Apply shadow customizations
   */
  withShadows(shadows: ThemeCustomization['shadows']): ThemeBuilder {
    this.customizations.shadows = {
      ...this.customizations.shadows,
      ...shadows,
    };
    return this;
  }

  /**
   * Apply z-index customizations
   */
  withZIndex(zIndex: ThemeCustomization['zIndex']): ThemeBuilder {
    this.customizations.zIndex = {
      ...this.customizations.zIndex,
      ...zIndex,
    };
    return this;
  }

  /**
   * Apply a theme variant
   */
  withVariant(variant: ThemeVariant): ThemeBuilder {
    this.variant = variant;
    this.currentVariant = variant;
    return this;
  }

  /**
   * Set composition mode
   */
  withCompositionMode(mode: CompositionMode): ThemeBuilder {
    this.compositionMode = mode;
    return this;
  }

  /**
   * Set conflict resolution configuration
   */
  withConflictResolution(config: Partial<ConflictResolutionConfig>): ThemeBuilder {
    this.conflictResolution = { ...this.conflictResolution, ...config };
    return this;
  }

  /**
   * Apply multiple customizations at once
   */
  withCustomizations(customizations: ThemeCustomization): ThemeBuilder {
    this.customizations = {
      colors: { ...this.customizations.colors, ...customizations.colors },
      typography: { ...this.customizations.typography, ...customizations.typography },
      spacing: { ...this.customizations.spacing, ...customizations.spacing },
      motion: { ...this.customizations.motion, ...customizations.motion },
      breakpoints: { ...this.customizations.breakpoints, ...customizations.breakpoints },
      radius: { ...this.customizations.radius, ...customizations.radius },
      shadows: { ...this.customizations.shadows, ...customizations.shadows },
      zIndex: { ...this.customizations.zIndex, ...customizations.zIndex },
    };
    return this;
  }

  /**
   * Set theme metadata
   */
  withMeta(meta: Partial<BuiltTheme['meta']>): ThemeBuilder {
    if (this.builtTheme) {
      this.builtTheme.meta = { ...this.builtTheme.meta, ...meta };
    }
    return this;
  }

  /**
   * Generate color scale from a base color
   */
  generateColorScale(baseColor: string): Record<string, string> {
    return generateColorScale(baseColor);
  }

  /**
   * Generate semantic colors from a base color
   */
  generateSemanticColors(baseColor: string): ReturnType<typeof generateSemanticColors> {
    return generateSemanticColors(baseColor);
  }

  /**
   * Preview the theme without building
   */
  async preview(): Promise<BuiltTheme> {
    return await this.buildInternal(false);
  }

  /**
   * Build the final theme
   */
  async build(): Promise<BuiltTheme> {
    const theme = await this.buildInternal(true);

    // Emit theme built event
    this.emit('theme-built', { type: 'theme-built', theme });

    return theme;
  }

  /**
   * Build the theme synchronously (without plugins)
   */
  buildSync(): BuiltTheme {
    // Build theme synchronously following the same pattern as async build
    if (this.builtTheme) {
      return this.builtTheme;
    }

    // Start with a copy of the base theme
    let theme = JSON.parse(JSON.stringify(this.baseTheme)) as BuiltTheme;

    // Apply customizations if they exist
    if (Object.keys(this.customizations).length > 0) {
      theme = applyCustomizations(theme, this.customizations);
    }

    // Apply variant if specified (without async plugins)
    if (this.currentVariant && this.currentVariant !== 'default') {
      theme = applyVariant(theme, this.currentVariant);
    }

    // Apply composition mode if different from default
    if (this.compositionMode !== 'merge') {
      // For sync build, we'll use merge mode as fallback
      // Advanced composition modes require the full async build process
      console.warn(
        'Advanced composition modes require async build. Using merge mode for sync build.',
      );
    }

    // Update metadata
    theme.meta = {
      ...theme.meta,
      name: theme.meta?.name || 'Custom Theme',
      version: '1.0.0',
      baseTheme: this.baseTheme
        ? typeof this.baseTheme === 'string'
          ? this.baseTheme
          : this.baseTheme.meta?.name
        : undefined,
      variant: 'custom',
      compositionMode: this.config.compositionMode || 'merge',
      customizations: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store the built theme
    this.builtTheme = theme;

    return theme;
  }

  /**
   * Build and validate the theme
   */
  async buildAndValidate(): Promise<{ theme: BuiltTheme; validation: ThemeValidationResult }> {
    const theme = await this.build();
    const validation = await this.validate(theme);

    return { theme, validation };
  }

  /**
   * Validate the current theme
   */
  async validate(theme?: BuiltTheme): Promise<ThemeValidationResult> {
    const targetTheme = theme || this.builtTheme || (await this.preview());

    this.validationResult = validateTheme(targetTheme, {
      ...defaultValidationConfig,
      strictMode: this.config.strictMode,
      wcagLevel: this.config.accessibilityChecks ? 'AA' : 'AA',
    });

    // Emit validation events
    if (this.validationResult.errors.length > 0) {
      this.emit('validation-error', {
        type: 'validation-error',
        errors: this.validationResult.errors,
      });
    }

    if (this.validationResult.warnings.length > 0) {
      this.emit('validation-warning', {
        type: 'validation-warning',
        warnings: this.validationResult.warnings,
      });
    }

    return this.validationResult;
  }

  /**
   * Get the current validation result
   */
  getValidationResult(): ThemeValidationResult | null {
    return this.validationResult;
  }

  /**
   * Clone the theme builder
   */
  clone(): ThemeBuilder {
    const clone = new ThemeBuilder(this.config);
    clone.baseTheme = JSON.parse(JSON.stringify(this.baseTheme));
    clone.customizations = JSON.parse(JSON.stringify(this.customizations));
    clone.variant = this.variant;
    clone.compositionMode = this.compositionMode;
    clone.conflictResolution = { ...this.conflictResolution };
    return clone;
  }

  /**
   * Reset all customizations
   */
  reset(): ThemeBuilder {
    this.customizations = {};
    this.variant = 'default';
    this.compositionMode = 'merge';
    this.conflictResolution = defaultConflictResolutionConfig;
    this.builtTheme = null;
    this.validationResult = null;
    return this;
  }

  /**
   * Serialize the theme for saving/loading
   */
  serialize(theme?: BuiltTheme): SerializedTheme {
    const targetTheme = theme || this.builtTheme || this.buildSync();

    return {
      version: '1.0.0',
      theme: targetTheme,
      checksum: this.generateChecksum(targetTheme),
      exportedAt: new Date().toISOString(),
    };
  }

  /**
   * Deserialize a theme from saved data
   */
  static deserialize(data: SerializedTheme): ThemeBuilder {
    const builder = new ThemeBuilder();

    // Verify checksum
    const expectedChecksum = builder.generateChecksum(data.theme);
    if (data.checksum !== expectedChecksum) {
      throw new Error('Invalid theme data: checksum mismatch');
    }

    builder.baseTheme = data.theme;
    builder.builtTheme = data.theme;

    return builder;
  }

  /**
   * Generate CSS variables from the theme
   */
  generateCSSVariables(theme?: BuiltTheme): Record<string, string> {
    const targetTheme = theme || this.builtTheme || this.buildSync();

    return this.generateCSSVariablesFromTheme(targetTheme);
  }

  /**
   * Add event listener for theme builder events
   */
  addListener(event: string, listener: ThemeBuilderEventListener): this {
    return super.addListener(event, listener);
  }

  /**
   * Remove event listener
   */
  removeListener(event: string, listener: ThemeBuilderEventListener): this {
    return super.removeListener(event, listener);
  }

  /**
   * Internal build method
   */
  private buildInternal(cache: boolean): BuiltTheme | Promise<BuiltTheme> {
    if (this.plugins.length === 0) {
      // No plugins, build synchronously
      return this.buildThemeTokens();
    }

    // Has plugins, build asynchronously
    return this.buildInternalAsync(cache);
  }

  private buildThemeTokens(): BuiltTheme {
    // Build theme without plugins
    const colors = this.buildColors();
    const animations = this.buildAnimations();

    return {
      meta: {
        name: this.name,
        version: '1.0.0',
        baseTheme: this.baseTheme
          ? typeof this.baseTheme === 'string'
            ? this.baseTheme
            : this.baseTheme.meta?.name
          : undefined,
        variant: 'custom',
        compositionMode: this.config.compositionMode || 'merge',
        customizations: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        plugins: this.plugins.map((p) => p.name),
      },
      colors,
      typography: this.baseTheme?.typography || {
        fontFamily: 'system-ui',
        fontSize: { sm: '14px', md: '16px', lg: '18px' },
      },
      spacing: this.baseTheme?.spacing || {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      motion: this.baseTheme?.motion || {
        duration: { fast: '150ms', normal: '300ms', slow: '500ms' },
        easing: {
          inOut: 'ease-in-out',
          default: 'ease',
          bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
      },
      breakpoints: this.baseTheme?.breakpoints || {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      radius: this.baseTheme?.radius || '4px',
      zIndex: this.baseTheme?.zIndex || { modal: 1000, dropdown: 500, tooltip: 1200 },
      animations,
    };
  }

  private buildColors(): SemanticColorTokens {
    let colors = this.baseTheme?.colors || ({} as SemanticColorTokens);

    // Apply color overrides
    if (this.colorOverrides) {
      colors = { ...colors, ...this.colorOverrides };
    }

    return colors;
  }

  private buildAnimations(): AnimationTokens {
    const base = this.baseTheme?.animations || {
      duration: {
        instant: '75ms',
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '700ms',
        slowest: '1000ms',
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        circIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
        circOut: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        circInOut: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        quartIn: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        quartOut: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        quartInOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
        quintIn: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        quintOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
        quintInOut: 'cubic-bezier(0.86, 0, 0.07, 1)',
        expoIn: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        expoOut: 'cubic-bezier(0.19, 1, 0.22, 1)',
        expoInOut: 'cubic-bezier(1, 0, 0, 1)',
      },
      keyframes: animationKeyframeTokens,
      config: animationConfigTokens,
      motion: {
        respectsReducedMotion: true,
        reducedMotionDuration: '0.01ms',
        reducedMotionEasing: 'linear',
        fallbackDuration: '150ms',
      },
    };

    // Apply animation overrides
    if (this.animationOverrides) {
      return {
        duration: { ...base.duration, ...this.animationOverrides.duration },
        easing: { ...base.easing, ...this.animationOverrides.easing },
        keyframes: { ...base.keyframes, ...this.animationOverrides.keyframes },
        config: { ...base.config, ...this.animationOverrides.config },
        motion: { ...base.motion, ...this.animationOverrides.motion },
      };
    }

    return base;
  }

  private async buildInternalAsync(cache: boolean): Promise<BuiltTheme> {
    if (cache && this.builtTheme) {
      return this.builtTheme;
    }

    let theme = JSON.parse(JSON.stringify(this.baseTheme)) as BuiltTheme;

    // Execute beforeThemeBuild plugins
    if (this.pluginManager && this.config.enablePlugins) {
      const context = PluginUtils.createPluginContext(theme, {
        animations: this.animationBuilder ? animationTokens : undefined,
      });

      await this.pluginManager.executeHooks('beforeThemeBuild', context);
    }

    // Apply customizations
    if (Object.keys(this.customizations).length > 0) {
      theme = applyCustomizations(theme, this.customizations);

      // Emit customization applied event
      this.emit('customization-applied', {
        type: 'customization-applied',
        customization: this.customizations,
      });
    }

    // Apply variant
    if (this.variant !== 'default') {
      theme = applyVariant(theme, this.variant);
    }

    // Add animation tokens if enabled
    if (this.config.enableAnimations && this.animationBuilder) {
      theme.animations = this.customizations.animations?.tokens
        ? { ...animationTokens, ...this.customizations.animations.tokens }
        : animationTokens;
    }

    // Update metadata
    theme.meta = {
      ...theme.meta,
      variant: this.variant,
      compositionMode: this.compositionMode,
      customizations: this.customizations,
      plugins: this.registeredPlugins.map((p) => p.name),
      updatedAt: new Date().toISOString(),
    };

    // Execute afterThemeBuild plugins
    if (this.pluginManager && this.config.enablePlugins) {
      const context = PluginUtils.createPluginContext(theme, {
        animations: theme.animations,
        cssVariables: this.generateCSSVariablesFromTheme(theme),
      });

      const results = await this.pluginManager.executeHooks('afterThemeBuild', context);

      // Apply plugin modifications
      Object.values(results).forEach((result) => {
        if (result.success && result.modifications) {
          if (result.modifications.theme) {
            theme = { ...theme, ...result.modifications.theme };
          }
          if (result.modifications.animations && theme.animations) {
            theme.animations = {
              ...theme.animations,
              ...result.modifications.animations,
            } as AnimationTokens;
          }
        }
      });
    }

    // Validate if enabled
    if (this.config.enableValidation) {
      await this.validate(theme);

      // Throw error in strict mode if validation fails
      if (this.config.strictMode && this.validationResult && !this.validationResult.valid) {
        throw new Error(
          `Theme validation failed: ${this.validationResult.errors.map((e) => e.message).join(', ')}`,
        );
      }
    }

    if (cache) {
      this.builtTheme = theme;
    }

    return theme;
  }

  /**
   * Check if object is a BuiltTheme
   */
  private isBuiltTheme(obj: any): obj is BuiltTheme {
    return obj && typeof obj === 'object' && obj.meta && obj.colors;
  }

  /**
   * Create a default BuiltTheme from ThemeTokens
   */
  private createDefaultTheme(themeTokens: ThemeTokens): BuiltTheme {
    return {
      ...themeTokens,
      meta: {
        name: 'Default Theme',
        version: '1.0.0',
        description: 'Default theme generated by ThemeBuilder',
        baseTheme: 'light',
        variant: 'default',
        compositionMode: 'merge',
        customizations: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      radius:
        typeof themeTokens.radius === 'string'
          ? {
              none: '0',
              xs: '0.125rem',
              sm: '0.25rem',
              md: themeTokens.radius,
              lg: '0.75rem',
              xl: '1rem',
              '2xl': '1.5rem',
              '3xl': '2rem',
              full: '9999px',
            }
          : themeTokens.radius,
      shadows: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        none: 'none',
      },
      zIndex: {
        hide: -1,
        auto: 0,
        base: 1,
        docked: 10,
        dropdown: themeTokens.zIndex?.dropdown || 1000,
        sticky: themeTokens.zIndex?.sticky || 1100,
        banner: 1200,
        overlay: 1300,
        modal: themeTokens.zIndex?.modal || 1400,
        popover: themeTokens.zIndex?.popover || 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: themeTokens.zIndex?.tooltip || 1800,
      },
    };
  }

  /**
   * Generate CSS variables from theme
   */
  private generateCSSVariablesFromTheme(theme: BuiltTheme): Record<string, string> {
    const variables: Record<string, string> = {};

    // Generate color variables
    this.generateColorVariables(theme.colors, variables);

    // Generate typography variables
    if (theme.typography?.fontSize && typeof theme.typography.fontSize === 'object') {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        if (value && typeof value === 'string') {
          variables[`--font-size-${key}`] = value;
        }
      });
    }

    // Generate spacing variables
    if (theme.spacing && typeof theme.spacing === 'object') {
      Object.entries(theme.spacing).forEach(([key, value]) => {
        if (value != null) {
          variables[`--spacing-${key}`] = value;
        }
      });
    }

    // Generate motion variables
    if (theme.motion?.duration && typeof theme.motion.duration === 'object') {
      Object.entries(theme.motion.duration).forEach(([key, value]) => {
        if (value != null) {
          variables[`--duration-${key}`] = value;
        }
      });
    }

    if (theme.motion?.easing && typeof theme.motion.easing === 'object') {
      Object.entries(theme.motion.easing).forEach(([key, value]) => {
        if (value != null) {
          variables[`--easing-${key}`] = value;
        }
      });
    }

    // Generate animation variables
    if (theme.animations) {
      // Animation duration tokens
      if (theme.animations.duration && typeof theme.animations.duration === 'object') {
        Object.entries(theme.animations.duration).forEach(([key, value]) => {
          if (value != null) {
            variables[`--animation-duration-${key}`] = value;
          }
        });
      }

      // Animation easing tokens
      if (theme.animations.easing && typeof theme.animations.easing === 'object') {
        Object.entries(theme.animations.easing).forEach(([key, value]) => {
          if (value != null) {
            variables[`--animation-easing-${key}`] = value;
          }
        });
      }

      // Animation config tokens
      if (theme.animations.config?.delays && typeof theme.animations.config.delays === 'object') {
        Object.entries(theme.animations.config.delays).forEach(([key, value]) => {
          if (value != null) {
            variables[`--animation-delay-${key}`] = value;
          }
        });
      }

      // Motion preferences
      variables['--animation-respects-reduced-motion'] = theme.animations.motion
        .respectsReducedMotion
        ? '1'
        : '0';
      variables['--animation-reduced-motion-duration'] =
        theme.animations.motion.reducedMotionDuration;
      variables['--animation-reduced-motion-easing'] = theme.animations.motion.reducedMotionEasing;
    }

    // Generate radius variables
    if (typeof theme.radius === 'object') {
      Object.entries(theme.radius).forEach(([key, value]) => {
        variables[`--radius-${key}`] = value;
      });
    } else {
      variables['--radius'] = theme.radius;
    }

    // Generate shadow variables
    if (theme.shadows && typeof theme.shadows === 'object') {
      Object.entries(theme.shadows).forEach(([key, value]) => {
        if (value != null) {
          variables[`--shadow-${key}`] = value;
        }
      });
    }

    // Generate z-index variables
    if (theme.zIndex && typeof theme.zIndex === 'object') {
      Object.entries(theme.zIndex).forEach(([key, value]) => {
        if (value != null) {
          variables[`--z-index-${key}`] = value.toString();
        }
      });
    }

    return variables;
  }

  /**
   * Generate color CSS variables
   */
  private generateColorVariables(
    colors: SemanticColorTokens,
    variables: Record<string, string>,
  ): void {
    // Guard against undefined/null colors
    if (!colors || typeof colors !== 'object') {
      console.warn('generateColorVariables: colors is undefined or not an object', colors);
      return;
    }

    function flattenColors(obj: any, prefix: string = ''): void {
      // Additional guard for nested objects
      if (!obj || typeof obj !== 'object') {
        return;
      }

      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'string') {
          const varName = prefix ? `--${prefix}-${key}` : `--${key}`;
          variables[varName] = value;
        } else if (typeof value === 'object' && value !== null) {
          flattenColors(value, prefix ? `${prefix}-${key}` : key);
        }
      });
    }

    flattenColors(colors);
  }

  /**
   * Generate checksum for theme data
   */
  private generateChecksum(theme: BuiltTheme): string {
    const themeString = JSON.stringify(theme, Object.keys(theme).sort());
    let hash = 0;

    for (let i = 0; i < themeString.length; i++) {
      const char = themeString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return hash.toString(16);
  }
}

/**
 * Convenience function to create a new theme builder
 */
export function createThemeBuilder(config?: Partial<ThemeBuilderConfig>): ThemeBuilder {
  return new ThemeBuilder(config);
}

/**
 * Quick theme builder with common presets
 */
export function quickTheme(
  preset: 'light' | 'dark' | 'futuristic' | 'cyberpunk' | 'alien' | 'high-contrast',
): ThemeBuilder {
  const builder = new ThemeBuilder();

  switch (preset) {
    case 'light':
      return builder.extends('light');
    case 'dark':
      return builder.extends('dark');
    case 'futuristic':
      return builder.extends('futuristic');
    case 'cyberpunk':
      return builder.extends('cyberpunk');
    case 'alien':
      return builder.extends('alien');
    case 'high-contrast':
      return builder.extends('light').withVariant('high-contrast');
    default:
      return builder.extends('light');
  }
}
