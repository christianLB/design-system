import React from 'react';
import { useResponsiveValue } from '../../hooks/responsive';

export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: Spacing;
  responsive?: number[];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyItems'];
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    { columns = 1, gap = 'sm', responsive = [], align, justify, style, ...rest },
    ref,
  ) => {
    const cols = useResponsiveValue<number>([columns, ...responsive]);
    const styles: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: `var(--spacing-${gap})`,
      alignItems: align,
      justifyItems: justify,
      ...style,
    };

    return <div ref={ref} style={styles} {...rest} />;
  },
);

Grid.displayName = 'Grid';

export default Grid;
