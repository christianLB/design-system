import {
  useReducedMotion,
  type MotionProps,
  type TargetAndTransition,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useMicroInteraction(_type?: MicroInteractionType): MotionProps {
  const reduce = useReducedMotion();

  const hover = (
    reduce ? {} : { scale: 1.02, filter: 'drop-shadow(0 0 4px var(--ring))' }
  ) as TargetAndTransition;
  const tap = (
    reduce ? {} : { scale: 0.98, boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }
  ) as TargetAndTransition;
  const focus = (
    reduce ? {} : { boxShadow: '0 0 0 2px var(--ring)', outlineOffset: '2px' }
  ) as TargetAndTransition;
  const initial = (reduce ? {} : { opacity: 0, y: 8 }) as TargetAndTransition;
  const animate = (reduce ? {} : { opacity: 1, y: 0 }) as TargetAndTransition;

  const props = {
    whileHover: hover,
    whileTap: tap,
    whileFocus: focus,
    initial,
    animate,
    transition: { duration: 0.2, ease: 'easeInOut' },
  } as MotionProps;

  return props;
}

export default useMicroInteraction;
