import * as React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      children,
      title,
      description,
      variant = 'default',
      icon,
      dismissible = false,
      onClose,
      ...props
    },
    ref
  ) => {
    const variantClass = `alert-${variant}`;

    return (
      <div
        ref={ref}
        role="alert"
        className={`alert ${variantClass} ${className || ''}`}
        {...props}
      >
        {icon && <span className="alert-icon">{icon}</span>}
        <div className="alert-content">
          {title && <h5 className="alert-title">{title}</h5>}
          {description || children ? (
            <div className="alert-description">{description ?? children}</div>
          ) : null}
        </div>
        {dismissible && (
          <button
            className="alert-close"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
