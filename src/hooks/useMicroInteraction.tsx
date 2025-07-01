import {
  useReducedMotion,
  type MotionProps,
} from 'framer-motion';

export type MicroInteractionType =
  | 'button'
  | 'card'
  | 'table-row'
  | 'input'
  | 'nav-item';

export interface MicroInteractionProps
  extends Pick<
    MotionProps,
    'whileHover' | 'whileTap' | 'whileFocus' | 'initial' | 'animate' | 'transition'
  > {}

export function useMicroInteraction(type: MicroInteractionType = 'button'): MotionProps {
  const reduce = useReducedMotion();

  if (reduce) {
    return {
      transition: { duration: 0.01 },
    } as MotionProps;
  }

  // Ultra-fast and subtle configurations per component type
  const configs = {
    button: {
      hover: { scale: 1.005, y: -0.5 },
      tap: { scale: 0.995, y: 0 },
      focus: { boxShadow: '0 0 0 2px var(--ring)', outlineOffset: '2px' },
      transition: { duration: 0.08, ease: 'easeOut' },
    },
    card: {
      hover: { scale: 1.002, y: -1 },
      tap: { scale: 0.998, y: 0 },
      focus: { boxShadow: '0 0 0 2px var(--ring)', outlineOffset: '2px' },
      transition: { duration: 0.1, ease: 'easeOut' },
    },
    'table-row': {
      hover: { backgroundColor: 'var(--muted)' },
      tap: { backgroundColor: 'var(--accent)' },
      focus: { boxShadow: '0 0 0 1px var(--ring)' },
      transition: { duration: 0.1, ease: 'easeOut' },
    },
    input: {
      hover: { borderColor: 'var(--ring)' },
      tap: { scale: 1.005 },
      focus: { 
        borderColor: 'var(--ring)', 
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.12)' 
      },
      transition: { duration: 0.1, ease: 'easeOut' },
    },
    'nav-item': {
      hover: { backgroundColor: 'var(--muted)', x: 2 },
      tap: { backgroundColor: 'var(--accent)', x: 1 },
      focus: { boxShadow: '0 0 0 2px var(--ring)' },
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  };

  const config = configs[type];
  const initial = type === 'card' ? { opacity: 0, y: 4 } : {};
  const animate = type === 'card' ? { opacity: 1, y: 0 } : {};

  return {
    whileHover: config.hover,
    whileTap: config.tap,
    whileFocus: config.focus,
    initial,
    animate,
    transition: config.transition,
  } as MotionProps;
}

export default useMicroInteraction;
