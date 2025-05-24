import * as React from 'react';
import { cn } from '../../utils';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the loader
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color variant of the loader
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'destructive' | 'warning' | 'info';
  /**
   * Whether the loader should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Whether the loader should be centered in its container
   * @default false
   */
  center?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
};

const variantClasses = {
  primary: 'border-t-primary',
  secondary: 'border-t-secondary',
  success: 'border-t-success',
  destructive: 'border-t-destructive',
  warning: 'border-t-warning',
  info: 'border-t-info',
};

/**
 * A loading spinner component that can be used to indicate loading states.
 * @component
 * @example
 * // Basic usage
 * <Loader />
 * 
 * // With custom size and variant
 * <Loader size="lg" variant="success" />
 * 
 * // Centered in container
 * <div className="relative h-32">
 *   <Loader center />
 * </div>
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>((
  {
    size = 'md',
    variant = 'primary',
    fullWidth = false,
    center = false,
    className,
    ...props
  }, 
  ref
) => {
  return (
    <div 
      ref={ref} data-testid="loader"
      className={cn(
        'inline-block',
        {
          'w-full flex justify-center': fullWidth,
          'mx-auto': center,
        },
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <div 
        className={cn(
          'animate-spin rounded-full border-border',
          sizeClasses[size],
          variantClasses[variant]
        )}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
});

Loader.displayName = 'Loader';

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Text to display under the loader
   * @default 'Loading...' 
   */
  text?: string;
}

/**
 * A page loader that can be used for full-page loading states.
 * @component
 * @example
 * <PageLoader />
 * 
 * // With custom text
 * <PageLoader text="Processing your request..." />
 */
const PageLoader = React.forwardRef<HTMLDivElement, PageLoaderProps>((
  { className, text = "Loading...", ...props },
  ref
) => {
  return (
    <div 
      ref={ref}
      className={cn(
        "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50",
        className
      )}
      role="status"
      aria-label={text}
      {...props}
    >
      <div className="text-center">
        <Loader size="xl" />
        <p className="mt-4 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";

export { Loader, PageLoader };
