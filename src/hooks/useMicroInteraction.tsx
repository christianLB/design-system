import { useReducedMotion } from 'framer-motion';

export type MicroInteractionType =
  | 'button'
  | 'card'
  | 'table-row'
  | 'input'
  | 'nav-item';

export interface MicroInteractionProps {
  whileHover?: object;
  whileTap?: object;
  whileFocus?: object;
  initial?: object;
  animate?: object;
  transition?: object;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useMicroInteraction(_type?: MicroInteractionType): MicroInteractionProps {
  const reduce = useReducedMotion();

  const hover = reduce ? {} : { scale: 1.02, filter: 'drop-shadow(0 0 4px var(--ring))' };
  const tap = reduce ? {} : { scale: 0.98, boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' };
  const focus = reduce ? {} : { boxShadow: '0 0 0 2px var(--ring)', outlineOffset: '2px' };
  const initial = reduce ? {} : { opacity: 0, y: 8 };
  const animate = reduce ? {} : { opacity: 1, y: 0 };

  return {
    whileHover: hover,
    whileTap: tap,
    whileFocus: focus,
    initial,
    animate,
    transition: { duration: 0.2, ease: 'easeInOut' },
  };
}

export default useMicroInteraction;
