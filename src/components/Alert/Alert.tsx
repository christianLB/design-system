import * as React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, title, variant = 'default', ...props }, ref) => {
    const variantClass = `alert-${variant}`;

    return (
      <div
        ref={ref}
        role="alert"
        className={`alert ${variantClass} ${className || ''}`}
        {...props}
      >
        {title && <h5 className="alert-title">{title}</h5>}
        <div className="alert-description">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
