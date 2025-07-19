import React from 'react';
import clsx from 'clsx';
import theme from '../../theme/theme';

export type ContainerWidth = keyof typeof theme.breakpoints;
export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AlienVariant = 'organism' | 'chamber' | 'organ' | 'membrane' | 'cavity';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerWidth;
  centered?: boolean;
  padding?: Spacing;
  /** Alien theme variant with organic shapes */
  alienVariant?: AlienVariant;
  /** Adds atmospheric effects */
  atmospheric?: boolean;
  /** Adds vital breathing effects */
  vital?: boolean;
  /** Enables neural pathways */
  neural?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { 
      maxWidth = 'lg', 
      centered = true, 
      padding = 'md', 
      alienVariant,
      atmospheric = false,
      vital = false,
      neural = false,
      className,
      style, 
      ...rest 
    },
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

    // Build class names for alien variants
    const classes = clsx(
      // Base classes
      'container',
      // Alien variant classes
      alienVariant === 'organism' && 'atmospheric-border-organism atmospheric-depth-cavity',
      alienVariant === 'chamber' && 'atmospheric-container-chamber',
      alienVariant === 'organ' && 'atmospheric-container-organ',
      alienVariant === 'membrane' && 'atmospheric-container-vessel',
      alienVariant === 'cavity' && 'atmospheric-membrane atmospheric-border-cavity atmospheric-depth-cavity',
      // Atmospheric effects
      atmospheric && 'neural-pathways',
      vital && 'vital-element active atmospheric-breathe',
      neural && 'atmospheric-neural',
      // Interactive effects for alien variants
      alienVariant && 'atmospheric-interactive',
      // Custom class name
      className
    );

    return <div ref={ref} className={classes} style={styles} {...rest} />;
  },
);

Container.displayName = 'Container';

export default Container;
