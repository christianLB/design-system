import * as React from 'react';
import { cn } from '../../utils';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav 
        ref={ref} 
        aria-label="Breadcrumb" 
        className={cn(className)} 
        {...props}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <a 
                href={item.href} 
                className={cn(
                  "text-primary hover:text-primary/80",
                  "transition-colors font-medium text-sm"
                )}
              >
                {item.name}
              </a>
              {index < items.length - 1 && (
                <span className="mx-2 text-muted-foreground">&gt;</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
