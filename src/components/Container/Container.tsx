import React from 'react';
import theme from '../../theme/theme';

export type ContainerWidth = keyof typeof theme.breakpoints;
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerWidth;
  centered?: boolean;
  padding?: Spacing;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { maxWidth = 'lg', centered = true, padding = 'md', style, ...rest },
    ref,
  ) => {
    const width = theme.breakpoints[maxWidth];
    const styles: React.CSSProperties = {
      maxWidth: width,
      marginLeft: centered ? 'auto' : undefined,
      marginRight: centered ? 'auto' : undefined,
      padding: padding ? `var(--spacing-${padding})` : undefined,
      ...style,
    };

    return <div ref={ref} style={styles} {...rest} />;
  },
);

Container.displayName = 'Container';

export default Container;
