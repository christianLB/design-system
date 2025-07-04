/**
 * Animation Presets
 * Common animation configurations for different UI contexts
 */

import { AnimationBuilder, createAnimation, CSSInJSAnimation } from './AnimationBuilder';
import { AnimationTokens, animationTokens } from '../tokens/animation';

/**
 * Animation preset category types
 */
export type PresetCategory = 
  | 'entrance' 
  | 'exit' 
  | 'interaction' 
  | 'feedback' 
  | 'loading' 
  | 'transition';

/**
 * Animation preset interface
 */
export interface AnimationPreset {
  name: string;
  category: PresetCategory;
  description: string;
  builder: AnimationBuilder;
  cssInJS: CSSInJSAnimation;
  duration: string;
  easing: string;
  useCase: string[];
}

/**
 * Preset configuration interface
 */
export interface PresetConfig {
  respectReducedMotion?: boolean;
  optimizePerformance?: boolean;
  customTokens?: Partial<AnimationTokens>;
}

/**
 * Create animation presets with configuration
 */
export function createAnimationPresets(config: PresetConfig = {}): Record<string, AnimationPreset> {
  const tokens = config.customTokens ? { ...animationTokens, ...config.customTokens } : animationTokens;
  
  const baseConfig = {
    respectReducedMotion: config.respectReducedMotion ?? true,
    optimizePerformance: config.optimizePerformance ?? true,
  };

  const createPreset = (
    name: string,
    category: PresetCategory,
    description: string,
    builder: AnimationBuilder,
    useCase: string[]
  ): AnimationPreset => {
    if (baseConfig.respectReducedMotion) {
      builder.motion({ respectReducedMotion: true });
    }
    
    if (baseConfig.optimizePerformance) {
      builder.optimize({ useWillChange: true, useGPUAcceleration: true });
    }

    return {
      name,
      category,
      description,
      builder: builder.clone(),
      cssInJS: builder.toCSSInJS(),
      duration: builder['currentAnimation'].duration || tokens.duration.normal,
      easing: builder['currentAnimation'].timingFunction || tokens.easing.ease,
      useCase,
    };
  };

  return {
    // ENTRANCE ANIMATIONS
    fadeIn: createPreset(
      'fadeIn',
      'entrance',
      'Gentle fade in animation for modal overlays and content reveals',
      createAnimation(tokens).fadeIn('normal', 'easeOut'),
      ['modals', 'tooltips', 'content reveal', 'page transitions']
    ),

    slideInUp: createPreset(
      'slideInUp',
      'entrance',
      'Slide in from bottom for mobile sheets and notifications',
      createAnimation(tokens).slideIn('up', 'normal').easing('easeOut'),
      ['bottom sheets', 'notifications', 'mobile drawers', 'toast messages']
    ),

    slideInDown: createPreset(
      'slideInDown',
      'entrance',
      'Slide in from top for dropdowns and navigation menus',
      createAnimation(tokens).slideIn('down', 'fast').easing('easeOut'),
      ['dropdowns', 'navigation menus', 'top notifications', 'header overlays']
    ),

    slideInLeft: createPreset(
      'slideInLeft',
      'entrance',
      'Slide in from left for sidebar and drawer navigation',
      createAnimation(tokens).slideIn('left', 'normal').easing('easeOut'),
      ['sidebars', 'drawer navigation', 'panel reveals', 'card transitions']
    ),

    slideInRight: createPreset(
      'slideInRight',
      'entrance',
      'Slide in from right for contextual panels and details',
      createAnimation(tokens).slideIn('right', 'normal').easing('easeOut'),
      ['detail panels', 'contextual menus', 'right sidebars', 'form sections']
    ),

    scaleIn: createPreset(
      'scaleIn',
      'entrance',
      'Scale up animation for buttons and interactive elements',
      createAnimation(tokens).scale('in', 'fast').easing('bounce'),
      ['buttons', 'interactive elements', 'focus states', 'popup elements']
    ),

    bounceIn: createPreset(
      'bounceIn',
      'entrance',
      'Playful bounce animation for success states and celebrations',
      createAnimation(tokens).bounce('slow').iterations(1),
      ['success messages', 'celebration states', 'achievement badges', 'completion feedback']
    ),

    // EXIT ANIMATIONS
    fadeOut: createPreset(
      'fadeOut',
      'exit',
      'Gentle fade out for closing modals and hiding content',
      createAnimation(tokens).fadeOut('fast', 'easeIn'),
      ['modal close', 'content hiding', 'toast dismissal', 'overlay removal']
    ),

    slideOutUp: createPreset(
      'slideOutUp',
      'exit',
      'Slide out to top for dismissing notifications',
      createAnimation(tokens).slideOut('up', 'fast').easing('easeIn'),
      ['notification dismissal', 'top panel close', 'header collapse']
    ),

    slideOutDown: createPreset(
      'slideOutDown',
      'exit',
      'Slide out to bottom for closing mobile sheets',
      createAnimation(tokens).slideOut('down', 'normal').easing('easeIn'),
      ['bottom sheet close', 'mobile drawer close', 'panel dismissal']
    ),

    slideOutLeft: createPreset(
      'slideOutLeft',
      'exit',
      'Slide out to left for hiding sidebars',
      createAnimation(tokens).slideOut('left', 'normal').easing('easeIn'),
      ['sidebar close', 'drawer close', 'left panel hide']
    ),

    slideOutRight: createPreset(
      'slideOutRight',
      'exit',
      'Slide out to right for closing detail panels',
      createAnimation(tokens).slideOut('right', 'normal').easing('easeIn'),
      ['detail panel close', 'right sidebar close', 'contextual panel hide']
    ),

    scaleOut: createPreset(
      'scaleOut',
      'exit',
      'Scale down animation for removing elements',
      createAnimation(tokens).scale('out', 'fast').easing('easeIn'),
      ['element removal', 'delete actions', 'collapse states', 'minimize effects']
    ),

    // INTERACTION ANIMATIONS
    buttonPress: createPreset(
      'buttonPress',
      'interaction',
      'Subtle press animation for button interactions',
      createAnimation(tokens)
        .keyframe('buttonPress', {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        })
        .duration('fast')
        .easing('easeOut'),
      ['button click', 'tap feedback', 'press interactions', 'touch responses']
    ),

    hover: createPreset(
      'hover',
      'interaction',
      'Gentle hover animation for interactive elements',
      createAnimation(tokens)
        .keyframe('hover', {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-2px) scale(1.02)' }
        })
        .duration('fast')
        .easing('easeOut'),
      ['card hover', 'button hover', 'link hover', 'interactive feedback']
    ),

    focus: createPreset(
      'focus',
      'interaction',
      'Accessibility-friendly focus animation with ring effect',
      createAnimation(tokens)
        .keyframe('focus', {
          '0%': { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.4)' },
          '100%': { boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.4)' }
        })
        .duration('fast')
        .easing('easeOut'),
      ['focus states', 'keyboard navigation', 'accessibility', 'form inputs']
    ),

    // FEEDBACK ANIMATIONS
    shake: createPreset(
      'shake',
      'feedback',
      'Error shake animation for invalid inputs and actions',
      createAnimation(tokens).shake('fast'),
      ['error states', 'invalid input', 'form validation', 'rejection feedback']
    ),

    pulse: createPreset(
      'pulse',
      'feedback',
      'Attention-grabbing pulse animation for notifications',
      createAnimation(tokens).pulse('slow').iterations('infinite'),
      ['notification badges', 'attention states', 'pending actions', 'live indicators']
    ),

    glow: createPreset(
      'glow',
      'feedback',
      'Glowing animation for highlighting important elements',
      createAnimation(tokens)
        .useKeyframes('glow')
        .duration('slower')
        .iterations('infinite')
        .easing('easeInOut'),
      ['highlights', 'featured elements', 'special states', 'premium indicators']
    ),

    heartbeat: createPreset(
      'heartbeat',
      'feedback',
      'Heartbeat animation for live data and activity indicators',
      createAnimation(tokens)
        .useKeyframes('heartbeat')
        .duration('slower')
        .iterations('infinite')
        .easing('ease'),
      ['live data', 'activity indicators', 'status updates', 'real-time feedback']
    ),

    // LOADING ANIMATIONS
    spin: createPreset(
      'spin',
      'loading',
      'Continuous rotation for loading spinners',
      createAnimation(tokens)
        .keyframe('spin', {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        })
        .duration('slower')
        .iterations('infinite')
        .easing('linear'),
      ['loading spinners', 'progress indicators', 'refresh actions', 'async operations']
    ),

    float: createPreset(
      'float',
      'loading',
      'Gentle floating animation for loading states',
      createAnimation(tokens)
        .useKeyframes('float')
        .duration('slower')
        .iterations('infinite')
        .easing('easeInOut'),
      ['loading states', 'floating elements', 'waiting indicators', 'idle animations']
    ),

    dots: createPreset(
      'dots',
      'loading',
      'Three dots loading animation for text loading states',
      createAnimation(tokens)
        .keyframe('dots', {
          '0%, 20%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        })
        .duration('slower')
        .iterations('infinite')
        .easing('ease'),
      ['text loading', 'typing indicators', 'processing states', 'thinking animations']
    ),

    // TRANSITION ANIMATIONS
    smoothTransition: createPreset(
      'smoothTransition',
      'transition',
      'Smooth transition for general property changes',
      createAnimation(tokens)
        .keyframe('smoothTransition', {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '50%': { opacity: '0.5', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        })
        .duration('normal')
        .easing('easeInOut'),
      ['state changes', 'content updates', 'theme switching', 'property transitions']
    ),

    morphTransition: createPreset(
      'morphTransition',
      'transition',
      'Morphing transition for shape and size changes',
      createAnimation(tokens)
        .keyframe('morphTransition', {
          '0%': { borderRadius: '0%', transform: 'scale(1)' },
          '50%': { borderRadius: '50%', transform: 'scale(1.1)' },
          '100%': { borderRadius: '0%', transform: 'scale(1)' }
        })
        .duration('normal')
        .easing('easeInOut'),
      ['shape changes', 'size transitions', 'morphing elements', 'dynamic layouts']
    ),

    colorTransition: createPreset(
      'colorTransition',
      'transition',
      'Smooth color transition for theme changes and states',
      createAnimation(tokens)
        .keyframe('colorTransition', {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' }
        })
        .duration('slow')
        .easing('easeInOut'),
      ['theme changes', 'color shifts', 'mood transitions', 'brand animations']
    ),
  };
}

/**
 * Default animation presets
 */
export const animationPresets = createAnimationPresets();

/**
 * Get presets by category
 */
export function getPresetsByCategory(category: PresetCategory): AnimationPreset[] {
  return Object.values(animationPresets).filter(preset => preset.category === category);
}

/**
 * Get preset by name
 */
export function getPreset(name: string): AnimationPreset | undefined {
  return animationPresets[name];
}

/**
 * Get presets by use case
 */
export function getPresetsByUseCase(useCase: string): AnimationPreset[] {
  return Object.values(animationPresets).filter(preset => 
    preset.useCase.some(uc => uc.toLowerCase().includes(useCase.toLowerCase()))
  );
}

/**
 * Create custom preset
 */
export function createCustomPreset(
  name: string,
  category: PresetCategory,
  description: string,
  builder: AnimationBuilder,
  useCase: string[]
): AnimationPreset {
  return {
    name,
    category,
    description,
    builder: builder.clone(),
    cssInJS: builder.toCSSInJS(),
    duration: builder['currentAnimation'].duration || animationTokens.duration.normal,
    easing: builder['currentAnimation'].timingFunction || animationTokens.easing.ease,
    useCase,
  };
}

/**
 * Preset collections for common scenarios
 */
export const presetCollections = {
  modal: {
    open: animationPresets.fadeIn,
    close: animationPresets.fadeOut,
  },
  
  drawer: {
    openLeft: animationPresets.slideInLeft,
    closeLeft: animationPresets.slideOutLeft,
    openRight: animationPresets.slideInRight,
    closeRight: animationPresets.slideOutRight,
  },
  
  bottomSheet: {
    open: animationPresets.slideInUp,
    close: animationPresets.slideOutDown,
  },
  
  dropdown: {
    open: animationPresets.slideInDown,
    close: animationPresets.fadeOut,
  },
  
  button: {
    hover: animationPresets.hover,
    press: animationPresets.buttonPress,
    focus: animationPresets.focus,
  },
  
  feedback: {
    success: animationPresets.bounceIn,
    error: animationPresets.shake,
    loading: animationPresets.spin,
    attention: animationPresets.pulse,
  },
  
  transition: {
    smooth: animationPresets.smoothTransition,
    morph: animationPresets.morphTransition,
    color: animationPresets.colorTransition,
  },
} as const;

export type PresetCollections = typeof presetCollections;