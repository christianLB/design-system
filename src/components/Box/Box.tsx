import React from 'react';

export type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  p?: Spacing;
  m?: Spacing;
  bg?: string;
  w?: string;
  h?: string;
  display?: React.CSSProperties['display'];
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ p, m, bg, w, h, display, style, ...rest }, ref) => {
    const styles: React.CSSProperties = {
      padding: p ? `var(--spacing-${p})` : undefined,
      margin: m ? `var(--spacing-${m})` : undefined,
      backgroundColor: bg ? `var(--${bg})` : undefined,
      width: w,
      height: h,
      display,
      ...style,
    };

    return <div ref={ref} style={styles} {...rest} />;
  },
);

Box.displayName = 'Box';

export default Box;
