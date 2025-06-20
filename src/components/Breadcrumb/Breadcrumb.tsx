import * as React from 'react';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  renderItem?: (item: BreadcrumbItem, isLast: boolean) => React.ReactNode;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, separator = '>', renderItem, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={`breadcrumb ${className || ''}`}
        {...props}
      >
        <ol className="breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="breadcrumb-item">
                {renderItem ? (
                  renderItem(item, isLast)
                ) : (
                  <a href={item.href} className="breadcrumb-link">
                    {item.name}
                  </a>
                )}
                {!isLast && (
                  <span className="breadcrumb-separator">{separator}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
