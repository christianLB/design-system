import React, { useEffect } from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  variant?: 'info' | 'success' | 'error' | 'warning';
  duration?: number;
  onClose?: () => void;
}

/**
 * Simple toast notification component.
 */
export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      message,
      variant = 'info',
      duration = 3000,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    useEffect(() => {
      if (!duration) return;
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={`toast toast-${variant} ${className || ''}`}
        {...props}
      >
        {message}
      </div>
    );
  }
);

Toast.displayName = 'Toast';
