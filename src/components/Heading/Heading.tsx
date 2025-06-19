import React from 'react';

export type HeadingSize = 1 | 2 | 3 | 4 | 5 | 6;
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: HeadingSize;
  children: React.ReactNode;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Component = 'h2',
      size = 2,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = ['heading', `heading--${size}`, className || '']
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export { Heading };
