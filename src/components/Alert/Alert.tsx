import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';


const alertVariants = cva(
  'relative w-full rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        destructive: 'border-destructive/20 text-destructive bg-destructive/10 dark:border-destructive/30',
        success: 'border-success/20 text-success bg-success/10 dark:border-success/30',
        warning: 'border-warning/20 text-warning bg-warning/10 dark:border-warning/30',
        info: 'border-info/20 text-info bg-info/10 dark:border-info/30',
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface AlertProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /**
   * The title of the alert
   */
  title?: string;
}

/**
 * A alert component for displaying important messages.
 * @component
 * @example
 * <Alert variant="info" title="Information">This is an informational alert.</Alert>
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, children, title, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        {title && (
          <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
        )}
        <div className="text-sm">{children}</div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert, alertVariants };
