import React from 'react';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'bold';
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'p',
      size = 'md',
      weight = 'normal',
      align = 'left',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      'text',
      `text--${size}`,
      `text-weight--${weight}`,
      `text-align--${align}`,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component ref={ref} className={classes} {...props}>
        {children}
      </Component>
    );
  },
);

Text.displayName = 'Text';

export { Text };
export type { TextProps };
