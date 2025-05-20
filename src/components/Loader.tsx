/**
 * Componente Loader.
 * @component
 * @example
 * import { Loader } from "@/components/Loader"
 *
 * function App() {
 *   return <Loader />
 * }
 */
import React from 'react';
import { cn } from '../utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the loader
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color of the loader
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
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
  success: 'border-t-green-500',
  danger: 'border-t-red-500',
  warning: 'border-t-yellow-500',
  info: 'border-t-blue-500',
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
export function Loader({
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  center = false,
  className,
  ...props
}: LoaderProps) {
  return (
    <div 
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
          'animate-spin rounded-full border-gray-300',
          sizeClasses[size],
          variantClasses[variant]
        )}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

/**
 * A page loader that can be used for full-page loading states.
 * @component
 * @example
 * <PageLoader />
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <Loader size="xl" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
