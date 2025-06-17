import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const combinedClassName = ['btn', className].filter(Boolean).join(' ');
    return (
      <button className={combinedClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
