import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  icon?: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, HTMLMotionProps<'div'> & AlertProps>(
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
      <motion.div
        ref={ref}
        role="alert"
        className={`alert ${variantClass} ${className || ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
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
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
