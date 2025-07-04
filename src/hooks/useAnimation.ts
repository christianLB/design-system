/**
 * React Animation Hooks
 * Custom hooks for managing animations in React components
 */

import { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import { AnimationBuilder, createAnimation } from '../theme/animation/AnimationBuilder';
import { animationPresets } from '../theme/animation/presets';
import { AnimationUtils, WebAnimationUtils, CSSAnimationUtils } from '../utils/animation';

/**
 * Animation state interface
 */
interface AnimationState {
  isAnimating: boolean;
  progress: number;
  duration: number;
  startTime: number | null;
  endTime: number | null;
}

/**
 * Animation hook options
 */
interface UseAnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  autoPlay?: boolean;
  respectReducedMotion?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}

/**
 * Animation sequence step
 */
interface AnimationSequenceStep {
  keyframes: Keyframe[];
  duration: number;
  easing?: string;
  delay?: number;
}

/**
 * Main animation hook
 */
export function useAnimation(options: UseAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    progress: 0,
    duration: options.duration || 300,
    startTime: null,
    endTime: null,
  });

  const {
    duration = 300,
    easing = 'ease',
    delay = 0,
    iterations = 1,
    direction = 'normal',
    fillMode = 'both',
    autoPlay = false,
    respectReducedMotion = true,
    onStart,
    onComplete,
    onProgress,
  } = options;

  const updateProgress = useCallback(() => {
    if (animationRef.current && state.isAnimating) {
      const currentTime = animationRef.current.currentTime || 0;
      const totalDuration = animationRef.current.effect?.getTiming().duration as number || duration;
      const progress = Math.min((currentTime as number) / totalDuration, 1);
      
      setState(prev => ({ ...prev, progress }));
      onProgress?.(progress);

      if (progress < 1) {
        requestAnimationFrame(updateProgress);
      }
    }
  }, [state.isAnimating, duration, onProgress]);

  const play = useCallback(
    (keyframes: Keyframe[], customOptions?: Partial<UseAnimationOptions>) => {
      if (!elementRef.current) return;

      const finalDuration = respectReducedMotion && CSSAnimationUtils.prefersReducedMotion() 
        ? 1 
        : customOptions?.duration || duration;

      const animationOptions: KeyframeAnimationOptions = {
        duration: finalDuration,
        easing: customOptions?.easing || easing,
        delay: customOptions?.delay || delay,
        iterations: customOptions?.iterations || iterations,
        direction: customOptions?.direction || direction,
        fill: customOptions?.fillMode || fillMode,
      };

      animationRef.current = elementRef.current.animate(keyframes, animationOptions);

      setState(prev => ({
        ...prev,
        isAnimating: true,
        startTime: Date.now(),
        endTime: null,
        duration: finalDuration,
      }));

      onStart?.();
      updateProgress();

      animationRef.current.addEventListener('finish', () => {
        setState(prev => ({
          ...prev,
          isAnimating: false,
          progress: 1,
          endTime: Date.now(),
        }));
        onComplete?.();
      });

      return animationRef.current;
    },
    [
      duration,
      easing,
      delay,
      iterations,
      direction,
      fillMode,
      respectReducedMotion,
      onStart,
      onComplete,
      updateProgress,
    ]
  );

  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause();
      setState(prev => ({ ...prev, isAnimating: false }));
    }
  }, []);

  const resume = useCallback(() => {
    if (animationRef.current && animationRef.current.playState === 'paused') {
      animationRef.current.play();
      setState(prev => ({ ...prev, isAnimating: true }));
      updateProgress();
    }
  }, [updateProgress]);

  const stop = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
      setState(prev => ({
        ...prev,
        isAnimating: false,
        progress: 0,
        endTime: Date.now(),
      }));
    }
  }, []);

  const restart = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.currentTime = 0;
      animationRef.current.play();
      setState(prev => ({
        ...prev,
        isAnimating: true,
        progress: 0,
        startTime: Date.now(),
        endTime: null,
      }));
      updateProgress();
    }
  }, [updateProgress]);

  return {
    ref: elementRef,
    state,
    play,
    pause,
    resume,
    stop,
    restart,
    isAnimating: state.isAnimating,
    progress: state.progress,
  };
}

/**
 * Hook for fade animations
 */
export function useFadeAnimation(options: UseAnimationOptions = {}) {
  const animation = useAnimation(options);

  const fadeIn = useCallback((customOptions?: Partial<UseAnimationOptions>) => {
    return animation.play(
      [{ opacity: '0' }, { opacity: '1' }],
      customOptions
    );
  }, [animation]);

  const fadeOut = useCallback((customOptions?: Partial<UseAnimationOptions>) => {
    return animation.play(
      [{ opacity: '1' }, { opacity: '0' }],
      customOptions
    );
  }, [animation]);

  const fadeToggle = useCallback((visible: boolean, customOptions?: Partial<UseAnimationOptions>) => {
    return visible ? fadeIn(customOptions) : fadeOut(customOptions);
  }, [fadeIn, fadeOut]);

  return {
    ...animation,
    fadeIn,
    fadeOut,
    fadeToggle,
  };
}

/**
 * Hook for slide animations
 */
export function useSlideAnimation(options: UseAnimationOptions = {}) {
  const animation = useAnimation(options);

  const slideIn = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right' = 'up', distance: string = '100%') => {
      const transforms: Record<string, string> = {
        up: `translateY(${distance})`,
        down: `translateY(-${distance})`,
        left: `translateX(-${distance})`,
        right: `translateX(${distance})`,
      };

      return animation.play([
        { transform: transforms[direction], opacity: '0' },
        { transform: 'translate(0, 0)', opacity: '1' },
      ]);
    },
    [animation]
  );

  const slideOut = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right' = 'up', distance: string = '100%') => {
      const transforms: Record<string, string> = {
        up: `translateY(-${distance})`,
        down: `translateY(${distance})`,
        left: `translateX(-${distance})`,
        right: `translateX(${distance})`,
      };

      return animation.play([
        { transform: 'translate(0, 0)', opacity: '1' },
        { transform: transforms[direction], opacity: '0' },
      ]);
    },
    [animation]
  );

  return {
    ...animation,
    slideIn,
    slideOut,
  };
}

/**
 * Hook for scale animations
 */
export function useScaleAnimation(options: UseAnimationOptions = {}) {
  const animation = useAnimation(options);

  const scaleIn = useCallback((fromScale: number = 0, toScale: number = 1) => {
    return animation.play([
      { transform: `scale(${fromScale})`, opacity: '0' },
      { transform: `scale(${toScale})`, opacity: '1' },
    ]);
  }, [animation]);

  const scaleOut = useCallback((fromScale: number = 1, toScale: number = 0) => {
    return animation.play([
      { transform: `scale(${fromScale})`, opacity: '1' },
      { transform: `scale(${toScale})`, opacity: '0' },
    ]);
  }, [animation]);

  const pulse = useCallback((scale: number = 1.05) => {
    return animation.play(
      [
        { transform: 'scale(1)' },
        { transform: `scale(${scale})` },
        { transform: 'scale(1)' },
      ],
      { iterations: Infinity }
    );
  }, [animation]);

  return {
    ...animation,
    scaleIn,
    scaleOut,
    pulse,
  };
}

/**
 * Hook for entrance animations
 */
export function useEntranceAnimation(
  type: 'fade' | 'slide' | 'scale' | 'bounce' = 'fade',
  options: UseAnimationOptions = {}
) {
  const animation = useAnimation({ autoPlay: true, ...options });

  useEffect(() => {
    if (animation.ref.current && options.autoPlay !== false) {
      const preset = animationPresets[`${type}In`];
      if (preset) {
        const builder = preset.builder.clone();
        const cssInJS = builder.toCSSInJS();
        
        // Convert CSS-in-JS to Web Animations API keyframes
        const keyframes = Object.values(cssInJS['@keyframes'] || {})[0] as Record<string, any>;
        if (keyframes) {
          const keyframeArray = Object.entries(keyframes).map(([percentage, styles]) => ({
            offset: parseFloat(percentage) / 100,
            ...styles,
          }));
          
          animation.play(keyframeArray);
        }
      }
    }
  }, [type, animation, options.autoPlay]);

  return animation;
}

/**
 * Hook for animation sequences
 */
export function useAnimationSequence(options: UseAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSequence = useCallback(
    async (steps: AnimationSequenceStep[]) => {
      if (!elementRef.current || steps.length === 0) return;

      setIsPlaying(true);
      setCurrentStep(0);

      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        const step = steps[i];
        
        const animation = elementRef.current.animate(step.keyframes, {
          duration: step.duration,
          easing: step.easing || 'ease',
          delay: step.delay || 0,
          fill: 'both',
        });

        await new Promise<void>(resolve => {
          animation.addEventListener('finish', () => resolve());
        });
      }

      setIsPlaying(false);
      setCurrentStep(steps.length);
    },
    []
  );

  return {
    ref: elementRef,
    playSequence,
    currentStep,
    isPlaying,
  };
}

/**
 * Hook for staggered animations
 */
export function useStaggeredAnimation(options: UseAnimationOptions & { stagger?: number } = {}) {
  const { stagger = 100, ...animationOptions } = options;
  const elementsRef = useRef<HTMLElement[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const addElement = useCallback((element: HTMLElement | null) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  }, []);

  const playStaggered = useCallback(
    async (keyframes: Keyframe[]) => {
      if (elementsRef.current.length === 0) return;

      setIsAnimating(true);

      const animations = elementsRef.current.map((element, index) => {
        return element.animate(keyframes, {
          duration: animationOptions.duration || 300,
          easing: animationOptions.easing || 'ease',
          delay: (animationOptions.delay || 0) + (index * stagger),
          fill: animationOptions.fillMode || 'both',
        });
      });

      await Promise.all(
        animations.map(
          animation =>
            new Promise<void>(resolve => {
              animation.addEventListener('finish', () => resolve());
            })
        )
      );

      setIsAnimating(false);
    },
    [animationOptions, stagger]
  );

  const clearElements = useCallback(() => {
    elementsRef.current = [];
  }, []);

  return {
    addElement,
    playStaggered,
    clearElements,
    isAnimating,
    elementCount: elementsRef.current.length,
  };
}

/**
 * Hook for intersection-based animations
 */
export function useIntersectionAnimation(
  options: UseAnimationOptions & {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true, ...animationOptions } = options;
  const fadeAnimation = useFadeAnimation(animationOptions);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = fadeAnimation.ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          fadeAnimation.fadeIn();
          setHasTriggered(true);
        } else if (!entry.isIntersecting && !triggerOnce) {
          fadeAnimation.fadeOut();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fadeAnimation, threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    ...fadeAnimation,
    hasTriggered,
  };
}

/**
 * Hook for gesture-based animations
 */
export function useGestureAnimation(options: UseAnimationOptions = {}) {
  const animation = useAnimation(options);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handlePointerDown = useCallback((event: PointerEvent) => {
    setIsDragging(true);
    setStartPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !animation.ref.current) return;

      const deltaX = event.clientX - startPosition.x;
      const deltaY = event.clientY - startPosition.y;

      animation.ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    },
    [isDragging, startPosition, animation.ref]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    
    // Animate back to original position
    if (animation.ref.current) {
      animation.play([
        { transform: animation.ref.current.style.transform },
        { transform: 'translate(0, 0)' },
      ]);
    }
  }, [animation]);

  useEffect(() => {
    const element = animation.ref.current;
    if (!element) return;

    element.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp]);

  return {
    ...animation,
    isDragging,
  };
}

/**
 * Hook for spring animations
 */
export function useSpringAnimation(
  config: { tension?: number; friction?: number; mass?: number } = {},
  options: UseAnimationOptions = {}
) {
  const { tension = 170, friction = 26, mass = 1 } = config;
  const animation = useAnimation(options);

  const createSpringKeyframes = useCallback(
    (from: Record<string, any>, to: Record<string, any>) => {
      // Simplified spring physics calculation
      const steps = 60; // 60fps assumption
      const keyframes: Keyframe[] = [];

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const springValue = 1 - Math.exp(-tension * t / mass) * Math.cos(Math.sqrt(friction) * t);
        
        const frame: Keyframe = { offset: t };
        
        Object.keys(to).forEach(key => {
          const fromValue = parseFloat(from[key]) || 0;
          const toValue = parseFloat(to[key]) || 0;
          const currentValue = fromValue + (toValue - fromValue) * springValue;
          
          if (key === 'transform') {
            frame[key] = `translateX(${currentValue}px)`;
          } else {
            frame[key] = `${currentValue}`;
          }
        });
        
        keyframes.push(frame);
      }

      return keyframes;
    },
    [tension, friction, mass]
  );

  const spring = useCallback(
    (from: Record<string, any>, to: Record<string, any>) => {
      const keyframes = createSpringKeyframes(from, to);
      return animation.play(keyframes, { easing: 'linear' });
    },
    [animation, createSpringKeyframes]
  );

  return {
    ...animation,
    spring,
  };
}

/**
 * Hook for preset animations
 */
export function usePresetAnimation(presetName: string, options: UseAnimationOptions = {}) {
  const animation = useAnimation(options);

  const playPreset = useCallback(() => {
    const preset = animationPresets[presetName];
    if (!preset) {
      console.warn(`Animation preset "${presetName}" not found`);
      return null;
    }

    const builder = preset.builder.clone();
    const cssInJS = builder.toCSSInJS();
    
    // Convert to Web Animations API format
    const keyframes = Object.values(cssInJS['@keyframes'] || {})[0] as Record<string, any>;
    if (keyframes) {
      const keyframeArray = Object.entries(keyframes).map(([percentage, styles]) => ({
        offset: parseFloat(percentage) / 100,
        ...styles,
      }));
      
      return animation.play(keyframeArray);
    }

    return null;
  }, [presetName, animation]);

  return {
    ...animation,
    playPreset,
  };
}

export default {
  useAnimation,
  useFadeAnimation,
  useSlideAnimation,
  useScaleAnimation,
  useEntranceAnimation,
  useAnimationSequence,
  useStaggeredAnimation,
  useIntersectionAnimation,
  useGestureAnimation,
  useSpringAnimation,
  usePresetAnimation,
};