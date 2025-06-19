import React from 'react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Displayed when no data is available.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, action, icon, className, ...props }, ref) => {
    return (
      <div ref={ref} className={`empty-state ${className || ''}`} {...props}>
        {icon && <div className="empty-state-icon">{icon}</div>}
        <h3 className="empty-state-title">{title}</h3>
        {description && (
          <p className="empty-state-description">{description}</p>
        )}
        {action && <div className="empty-state-action">{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
