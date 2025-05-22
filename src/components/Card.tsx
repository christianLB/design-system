import * as React from 'react';
import { cn } from '../utils';
import { tokens } from '../tokens';

/**
 * Available card visual variants
 */
export type CardVariant = 'default' | 'muted' | 'destructive' | 'outline';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 
   * Visual style variant of the card
   * @default 'default'
   */
  variant?: CardVariant;
  /** 
   * Optional header content 
   */
  header?: React.ReactNode;
  /** 
   * Optional title text 
   */
  title?: string;
  /** 
   * Optional footer content 
   */
  footer?: React.ReactNode;
  /** 
   * Card content 
   */
  children?: React.ReactNode;
}

const cardVariants: Record<CardVariant, string> = {
  default: cn(
    'border',
    'border-border',
    'bg-background',
    'shadow-md'
  ),
  muted: cn(
    'border',
    'border-border',
    'bg-muted/50'
  ),
  destructive: cn(
    'border',
    'border-destructive/20',
    'bg-destructive/5',
    'text-destructive'
  ),
  outline: cn(
    'border',
    'border-border',
    'bg-transparent',
    'shadow-none'
  )
};

/**
 * A flexible card component that can display content with different visual styles.
 * @component
 * @example
 * <Card variant="default" title="Card Title">
 *   Card content
 * </Card>
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    header,
    title,
    footer,
    children,
    variant = 'default',
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          cardVariants[variant],
          className
        )}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-border bg-background">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-medium">{title}</h3>
            ) : (
              header
            )}
          </div>
        )}
        <div className="p-6 bg-background">
          {!header && title && (
            <h3 className="text-lg font-medium mb-4">{title}</h3>
          )}
          {children}
        </div>
        {footer && (
          <div className="px-6 py-4 border-t border-border bg-muted">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Export sub-components for better composition
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);
CardDescription.displayName = 'CardDescription';

export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

export const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);
CardFooter.displayName = 'CardFooter';

export { Card };
export type { CardProps };