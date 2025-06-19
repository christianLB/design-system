import React from 'react';
import { useResponsiveValue } from '../../hooks/responsive';

export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Direction = 'row' | 'column';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  gap?: Spacing;
  responsive?: Direction[];
  align?: React.CSSProperties['alignItems'];
  wrap?: boolean;
  justify?: React.CSSProperties['justifyContent'];
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'column',
      gap = 'sm',
      responsive = [],
      align,
      wrap = false,
      justify,
      style,
      ...rest
    },
    ref,
  ) => {
    const dir = useResponsiveValue<Direction>([direction, ...responsive]);
    const styles: React.CSSProperties = {
      display: 'flex',
      flexDirection: dir,
      flexWrap: wrap ? 'wrap' : undefined,
      gap: `var(--spacing-${gap})`,
      alignItems: align,
      justifyContent: justify,
      ...style,
    };

    return <div ref={ref} style={styles} {...rest} />;
  },
);

Stack.displayName = 'Stack';

export default Stack;
