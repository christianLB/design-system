import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';

/**
 * Available card visual variants
 */
export type CardVariant = 'default' | 'muted' | 'destructive' | 'outline';

const cardVariants = cva(
  'rounded-lg overflow-hidden', 
  {
    variants: {
      variant: {
        default: [
          'border',
          'border-border',
          'bg-background',
          'shadow-md'
        ],
        muted: [
          'border',
          'border-border',
          'bg-muted/50'
        ],
        destructive: [
          'border',
          'border-destructive/20',
          'bg-destructive/5',
          'text-destructive'
        ],
        outline: [
          'border',
          'border-border',
          'bg-transparent',
          'shadow-none'
        ]
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cardVariants> {
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
    variant,
    className,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-border bg-background">
            {typeof title === 'string' ? (
              <h3 className="text-lg font-medium text-foreground">{title}</h3>
            ) : (
              header
            )}
          </div>
        )}
        <div className="p-6 bg-background">
          {!header && title && (
            <h3 className="text-lg font-medium mb-4 text-foreground">{title}</h3>
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
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 border-b border-border', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight text-foreground', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p 
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref}
    className={cn('p-6 pt-0 bg-background', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0 border-t border-border mt-auto', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card };
export type { CardProps };