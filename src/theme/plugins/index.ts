/**
 * Plugin System Exports
 * Central exports for the plugin system
 */

// Plugin types
export * from './types';

// Plugin manager
export * from './PluginManager';
export { PluginManager, createPluginManager } from './PluginManager';

// Built-in plugins
export * from './accessibility';
export { 
  createAccessibilityPlugin, 
  accessibilityPlugin 
} from './accessibility';

export * from './motion';
export { 
  createMotionPlugin, 
  motionPlugin 
} from './motion';

export * from './performance';
export { 
  createPerformancePlugin, 
  performancePlugin 
} from './performance';

// Cyberpunk plugins
export * from './cyberpunk-glow';
export { 
  createCyberpunkGlowPlugin, 
  cyberpunkGlowPlugin 
} from './cyberpunk-glow';

export * from './cyberpunk-scanline';
export { 
  createCyberpunkScanlinePlugin, 
  cyberpunkScanlinePlugin 
} from './cyberpunk-scanline';

export * from './cyberpunk-matrix';
export { 
  createCyberpunkMatrixPlugin, 
  cyberpunkMatrixPlugin,
  generateMatrixCharacters
} from './cyberpunk-matrix';

export * from './cyberpunk-registry';
export { 
  CyberpunkPluginRegistry,
  defaultCyberpunkRegistry,
  getCyberpunkPlugins,
  createCyberpunkRegistry
} from './cyberpunk-registry';

// Alien plugins
export * from './alien-atmospheric';
export { 
  createAlienAtmosphericPlugin, 
  alienAtmosphericPlugin 
} from './alien-atmospheric';

export * from './alien-neural';
export { 
  createAlienNeuralPlugin, 
  alienNeuralPlugin 
} from './alien-neural';

export * from './alien-biomechanical';
export { 
  createAlienBiomechanicalPlugin, 
  alienBiomechanicalPlugin 
} from './alien-biomechanical';

export * from './alien-vital';
export { 
  createAlienVitalPlugin, 
  alienVitalPlugin 
} from './alien-vital';

export * from './alien-registry';
export { 
  AlienPluginRegistry,
  defaultAlienRegistry,
  getAlienPlugins,
  createAlienRegistry,
  createAlienEffectRegistry
} from './alien-registry';

// Plugin utilities
export { PluginUtils } from './types';

// Re-export key types
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
  UtilityPlugin,
  IntegrationPlugin,
  EnhancementPlugin
} from './types';