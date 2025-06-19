import * as React from 'react';


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
  ariaLabel?: string;
  decorative?: boolean;
}





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
    ariaLabel = 'Loading',
    decorative = false,
    className,
    ...props
  },
  ref
) => {
  const ariaProps = decorative
    ? { 'aria-hidden': true }
    : { role: 'status', 'aria-label': ariaLabel };

  return (
    <div
      ref={ref}
      data-testid="loader"
      className={`loader-container ${fullWidth ? 'loader-container--full-width' : ''} ${center ? 'loader-container--center' : ''} ${className || ''}`}
      {...ariaProps}
      {...props}
    >
      <div 
        className={`loader loader--${size} loader--${variant}`}
      >
        {/* The sr-only text was removed as aria-label on the container is sufficient */}
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
      className={`page-loader ${className || ''}`}
      role="status"
      aria-label={text}
      {...props}
    >
      <div className="text-center">
        <Loader size="xl" />
        <p className="page-loader-text">{text}</p>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";

export { Loader, PageLoader };
