/**
 * Animation System Exports
 * Central exports for the animation system
 */

// Animation tokens
export * from '../tokens/animation';

// Animation builder
export * from './AnimationBuilder';
export { AnimationBuilder, createAnimation, quickAnimations } from './AnimationBuilder';

// Animation presets
export * from './presets';
export { 
  animationPresets, 
  createAnimationPresets, 
  getPresetsByCategory, 
  getPreset, 
  getPresetsByUseCase,
  createCustomPreset,
  presetCollections
} from './presets';

// Re-export types
export type {
  AnimationProperty,
  CSSInJSAnimation,
  AnimationStep,
  AnimationChain,
  PerformanceOptions,
  MotionOptions
} from './AnimationBuilder';

export type {
  AnimationPreset,
  PresetCategory,
  PresetConfig,
  PresetCollections
} from './presets';