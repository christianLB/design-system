import * as React from 'react';
import clsx from 'clsx';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Variant of the link
   */
  variant?: 'default' | 'subtle' | 'nav' | 'emphasized';
  /**
   * Element to render as (for polymorhpic component support)
   */
  as?: React.ElementType;
  /**
   * Makes the link take the full width of its container
   */
  fullWidth?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      className,
      variant = 'default',
      fullWidth = false,
      as: Component = 'a',
      ...props
    },
    ref
  ) => {
    const classes = clsx(
      // Base styles
      'inline-flex items-center transition-colors font-medium',
      
      // Variants
      {
        // Default link style
        'text-primary hover:text-primary-emphasis hover:underline': 
          variant === 'default',
        
        // Subtle link (less prominent)
        'text-foreground-subtle hover:text-foreground hover:underline': 
          variant === 'subtle',
        
        // Navigation link
        'px-md py-sm rounded-md text-foreground hover:text-foreground-emphasis hover:bg-background-subtle': 
          variant === 'nav',
        
        // Emphasized link
        'text-primary-emphasis font-semibold hover:underline': 
          variant === 'emphasized',
        
        // Full width option
        'w-full justify-center': fullWidth,
      },
      className
    );

    return <Component className={classes} ref={ref} {...props}>{children}</Component>;
  }
);

Link.displayName = 'Link';

export { Link };
