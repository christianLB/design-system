/**
 * Animate Component
 *
 * Declarative animation component that wraps children with
 * various entrance/exit animations using Framer Motion.
 */

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
  type TargetAndTransition,
} from 'framer-motion';
import { cn } from '../../utils/cn';

export type AnimateType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'scale-up'
  | 'scale-down'
  | 'rotate'
  | 'flip'
  | 'bounce'
  | 'shake'
  | 'pulse'
  | 'none';

export interface AnimateProps {
  /** Child element to animate */
  children: React.ReactNode;
  /** Animation type */
  type?: AnimateType;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation delay in seconds */
  delay?: number;
  /** Whether the element is visible */
  show?: boolean;
  /** Trigger animation on hover */
  onHover?: AnimateType;
  /** Trigger animation on tap/click */
  onTap?: AnimateType;
  /** Custom variants */
  variants?: Variants;
  /** Custom transition */
  transition?: Transition;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** Additional class names */
  className?: string;
}

const animationVariants: Record<AnimateType, Variants> = {
  none: {
    hidden: {},
    visible: {},
    exit: {},
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  'slide-down': {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
  'scale-down': {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  },
  rotate: {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 180 },
  },
  flip: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
  },
  bounce: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  shake: {
    hidden: { x: 0 },
    visible: { x: [0, -10, 10, -10, 10, -5, 5, 0] },
    exit: { x: 0 },
  },
  pulse: {
    hidden: { scale: 1 },
    visible: { scale: [1, 1.05, 1] },
    exit: { scale: 1 },
  },
};

const hoverVariants: Record<AnimateType, TargetAndTransition> = {
  none: {},
  fade: { opacity: 0.8 },
  'slide-up': { y: -4 },
  'slide-down': { y: 4 },
  'slide-left': { x: -4 },
  'slide-right': { x: 4 },
  scale: { scale: 1.05 },
  'scale-up': { scale: 1.1 },
  'scale-down': { scale: 0.95 },
  rotate: { rotate: 5 },
  flip: { rotateY: 10 },
  bounce: { y: -8 },
  shake: { x: [0, -2, 2, -2, 2, 0] },
  pulse: { scale: 1.05 },
};

const tapVariants: Record<AnimateType, TargetAndTransition> = {
  none: {},
  fade: { opacity: 0.6 },
  'slide-up': { y: 2 },
  'slide-down': { y: -2 },
  'slide-left': { x: 2 },
  'slide-right': { x: -2 },
  scale: { scale: 0.95 },
  'scale-up': { scale: 0.9 },
  'scale-down': { scale: 1.05 },
  rotate: { rotate: -5 },
  flip: { rotateY: -10 },
  bounce: { y: 4 },
  shake: { x: 0 },
  pulse: { scale: 0.95 },
};

export const Animate: React.FC<AnimateProps> = ({
  children,
  type = 'fade',
  duration = 0.3,
  delay = 0,
  show = true,
  onHover,
  onTap,
  variants: customVariants,
  transition: customTransition,
  onAnimationComplete,
  className,
}) => {
  const variants = customVariants || animationVariants[type];

  const transition: Transition = customTransition || {
    duration,
    delay,
    ease: [0.4, 0, 0.2, 1],
    ...(type === 'bounce' && { type: 'spring', stiffness: 400, damping: 10 }),
  };

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="animate-content"
          className={cn(className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={transition}
          whileHover={onHover ? hoverVariants[onHover] : undefined}
          whileTap={onTap ? tapVariants[onTap] : undefined}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Animate.displayName = 'Animate';

/**
 * AnimateGroup - Stagger animations for a group of children
 */
export interface AnimateGroupProps {
  children: React.ReactNode;
  type?: AnimateType;
  stagger?: number;
  duration?: number;
  delay?: number;
  show?: boolean;
  className?: string;
}

export const AnimateGroup: React.FC<AnimateGroupProps> = ({
  children,
  type = 'fade',
  stagger = 0.1,
  duration = 0.3,
  delay = 0,
  show = true,
  className,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
    exit: { opacity: 0 },
  };

  const childVariants = animationVariants[type];

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="animate-group"
          className={className}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {React.Children.map(children, (child, index) =>
            React.isValidElement(child) ? (
              <motion.div key={index} variants={childVariants} transition={{ duration }}>
                {child}
              </motion.div>
            ) : (
              child
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

AnimateGroup.displayName = 'AnimateGroup';

export { animationVariants, hoverVariants, tapVariants };
export default Animate;
