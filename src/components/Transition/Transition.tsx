/**
 * Transition Component
 *
 * Page and layout transition component with various
 * transition effects and shared element animations.
 */

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition as MotionTransition,
} from 'framer-motion';
import { cn } from '../../utils/cn';

export type TransitionType =
  | 'fade'
  | 'slide'
  | 'slide-fade'
  | 'scale'
  | 'scale-fade'
  | 'flip'
  | 'rotate'
  | 'none';

export type TransitionDirection = 'up' | 'down' | 'left' | 'right';

export interface TransitionProps {
  /** Unique key for the transition (changing this triggers animation) */
  transitionKey: string | number;
  /** Children to render */
  children: React.ReactNode;
  /** Transition type */
  type?: TransitionType;
  /** Direction for slide transitions */
  direction?: TransitionDirection;
  /** Duration in seconds */
  duration?: number;
  /** Exit duration (defaults to duration) */
  exitDuration?: number;
  /** Delay before transition starts */
  delay?: number;
  /** Custom enter variants */
  enterVariants?: Variants;
  /** Custom exit variants */
  exitVariants?: Variants;
  /** Mode for AnimatePresence */
  mode?: 'sync' | 'wait' | 'popLayout';
  /** Callback before transition starts */
  onTransitionStart?: () => void;
  /** Callback when transition completes */
  onTransitionComplete?: () => void;
  /** Class name for wrapper */
  className?: string;
  /** Respect reduced motion */
  respectReducedMotion?: boolean;
}

const slideOffsets: Record<TransitionDirection, { x?: number | string; y?: number | string }> = {
  up: { y: '100%' },
  down: { y: '-100%' },
  left: { x: '100%' },
  right: { x: '-100%' },
};

const slideExitOffsets: Record<TransitionDirection, { x?: number | string; y?: number | string }> =
  {
    up: { y: '-100%' },
    down: { y: '100%' },
    left: { x: '-100%' },
    right: { x: '100%' },
  };

function getVariants(
  type: TransitionType,
  direction: TransitionDirection,
): { enter: Variants; exit: Variants } {
  const enterOffset = slideOffsets[direction];
  const exitOffset = slideExitOffsets[direction];

  const variants: Record<TransitionType, { enter: Variants; exit: Variants }> = {
    none: {
      enter: { initial: {}, animate: {}, exit: {} },
      exit: { initial: {}, animate: {}, exit: {} },
    },
    fade: {
      enter: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      exit: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
    },
    slide: {
      enter: {
        initial: { ...enterOffset },
        animate: { x: 0, y: 0 },
        exit: { ...exitOffset },
      },
      exit: {
        initial: { x: 0, y: 0 },
        animate: { x: 0, y: 0 },
        exit: { ...exitOffset },
      },
    },
    'slide-fade': {
      enter: {
        initial: { opacity: 0, ...enterOffset },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, ...exitOffset },
      },
      exit: {
        initial: { opacity: 1, x: 0, y: 0 },
        animate: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, ...exitOffset },
      },
    },
    scale: {
      enter: {
        initial: { scale: 0.8 },
        animate: { scale: 1 },
        exit: { scale: 0.8 },
      },
      exit: {
        initial: { scale: 1 },
        animate: { scale: 1 },
        exit: { scale: 1.2 },
      },
    },
    'scale-fade': {
      enter: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 },
      },
      exit: {
        initial: { opacity: 1, scale: 1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
      },
    },
    flip: {
      enter: {
        initial: { opacity: 0, rotateY: 90 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: -90 },
      },
      exit: {
        initial: { opacity: 1, rotateY: 0 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: 90 },
      },
    },
    rotate: {
      enter: {
        initial: { opacity: 0, rotate: -180, scale: 0.5 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0, rotate: 180, scale: 0.5 },
      },
      exit: {
        initial: { opacity: 1, rotate: 0, scale: 1 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit: { opacity: 0, rotate: -180, scale: 0.5 },
      },
    },
  };

  return variants[type];
}

export const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  (
    {
      transitionKey,
      children,
      type = 'fade',
      direction = 'right',
      duration = 0.3,
      exitDuration,
      delay = 0,
      enterVariants: customEnterVariants,
      exitVariants: customExitVariants,
      mode = 'wait',
      onTransitionStart,
      onTransitionComplete,
      className,
      respectReducedMotion = true,
    },
    ref,
  ) => {
    // Check for reduced motion preference
    const prefersReducedMotion = React.useMemo(() => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);

    const shouldAnimate = !respectReducedMotion || !prefersReducedMotion;

    const variants = getVariants(type, direction);
    const enterVars = customEnterVariants || variants.enter;

    const transition: MotionTransition = {
      duration: shouldAnimate ? duration : 0,
      delay,
      ease: [0.4, 0, 0.2, 1],
    };

    const exitTransition: MotionTransition = {
      duration: shouldAnimate ? (exitDuration ?? duration) : 0,
      ease: [0.4, 0, 0.2, 1],
    };

    return (
      <AnimatePresence mode={mode} onExitComplete={onTransitionComplete}>
        <motion.div
          key={transitionKey}
          ref={ref}
          className={cn('w-full', className)}
          variants={enterVars}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          onAnimationStart={onTransitionStart}
          style={{ perspective: type === 'flip' ? 1000 : undefined }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  },
);

Transition.displayName = 'Transition';

/**
 * PageTransition - Wrapper for page-level transitions
 */
export interface PageTransitionProps extends Omit<TransitionProps, 'transitionKey'> {
  /** Use pathname or custom key */
  pathname?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  pathname,
  children,
  type = 'slide-fade',
  direction = 'right',
  duration = 0.4,
  ...props
}) => {
  const key = pathname || 'page';

  return (
    <Transition
      transitionKey={key}
      type={type}
      direction={direction}
      duration={duration}
      className="min-h-screen"
      {...props}
    >
      {children}
    </Transition>
  );
};

PageTransition.displayName = 'PageTransition';

/**
 * LayoutTransition - For layout changes within a page
 */
export interface LayoutTransitionProps {
  children: React.ReactNode;
  layout?: boolean | 'position' | 'size';
  layoutId?: string;
  duration?: number;
  className?: string;
}

export const LayoutTransition: React.FC<LayoutTransitionProps> = ({
  children,
  layout = true,
  layoutId,
  duration = 0.3,
  className,
}) => {
  return (
    <motion.div
      layout={layout}
      layoutId={layoutId}
      className={className}
      transition={{ duration, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

LayoutTransition.displayName = 'LayoutTransition';

/**
 * SharedElement - For shared element transitions between routes
 */
export interface SharedElementProps {
  children: React.ReactNode;
  layoutId: string;
  className?: string;
}

export const SharedElement: React.FC<SharedElementProps> = ({ children, layoutId, className }) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

SharedElement.displayName = 'SharedElement';

export default Transition;
