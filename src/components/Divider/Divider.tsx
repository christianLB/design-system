import * as React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        data-orientation={orientation}
        className={`divider ${className ?? ''}`.trim()}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export { Divider };
