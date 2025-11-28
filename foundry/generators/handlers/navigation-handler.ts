/**
 * Navigation Handler
 *
 * Handles: Link, Breadcrumb, Tabs, NavItem
 * Components for navigation and wayfinding
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class NavigationHandler extends BaseCategoryHandler {
  readonly category = 'navigation' as const;

  generateBaseClasses(schema: ComponentSchema): string {
    const name = schema.name.toLowerCase();

    const baseClassMap: Record<string, string[]> = {
      link: [
        'inline-flex',
        'items-center',
        'underline-offset-4',
        'transition-colors',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',
      ],
      breadcrumb: [
        'flex',
        'flex-wrap',
        'items-center',
        'gap-1.5',
        'break-words',
        'text-sm',
        'text-muted-foreground',
      ],
      tabs: [
        'inline-flex',
        'h-10',
        'items-center',
        'justify-center',
        'rounded-md',
        'bg-muted',
        'p-1',
        'text-muted-foreground',
      ],
      tabitem: [
        'inline-flex',
        'items-center',
        'justify-center',
        'whitespace-nowrap',
        'rounded-sm',
        'px-3',
        'py-1.5',
        'text-sm',
        'font-medium',
        'ring-offset-background',
        'transition-all',
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2',
        'disabled:pointer-events-none',
        'disabled:opacity-50',
      ],
    };

    return (baseClassMap[name] || baseClassMap.link).join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const name = schema.name.toLowerCase();

    // Visual variants
    if (schema.variants.variant) {
      if (name === 'link') {
        result.variant = {
          default: 'text-primary hover:underline',
          muted: 'text-muted-foreground hover:text-foreground',
          nav: 'text-foreground/60 hover:text-foreground',
          destructive: 'text-destructive hover:underline',
        };
      } else if (name === 'tabitem') {
        result.variant = {
          default:
            'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          underline:
            'border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-foreground',
        };
      }
    }

    // Size variants
    if (schema.variants.size) {
      if (name === 'link') {
        result.size = {
          sm: 'text-sm',
          md: 'text-base',
          lg: 'text-lg',
        };
      } else if (name === 'tabs') {
        result.size = {
          sm: 'h-8',
          md: 'h-10',
          lg: 'h-12',
        };
      } else if (name === 'breadcrumb') {
        result.size = {
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-base',
        };
      }
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const name = schema.name.toLowerCase();
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Link with external indicator
    if (name === 'link') {
      return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
        {external && (
          <svg
            className="ml-1 h-3 w-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </${elementConfig.tag}>
      `.trim();
    }

    // TabItem with active state
    if (name === 'tabitem') {
      return `
      <${elementConfig.tag}
        ref={ref}
        role="tab"
        aria-selected={active}
        data-state={active ? 'active' : 'inactive'}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
      </${elementConfig.tag}>
      `.trim();
    }

    // Breadcrumb is a nav with list
    if (name === 'breadcrumb') {
      return `
      <nav ref={ref} aria-label="breadcrumb" {...rest}>
        <ol className={cn(${name}Variants({ ${variantKeys} }), className)}>
          {children}
        </ol>
      </nav>
      `.trim();
    }

    // Default tabs/list container
    return `
      <${elementConfig.tag}
        ref={ref}
        role={role || 'tablist'}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
      </${elementConfig.tag}>
    `.trim();
  }

  /**
   * Generate compound sub-components for Breadcrumb
   */
  generateAdditionalExports(context: GenerationContext): string {
    const { schema } = context;
    const name = schema.name;
    const exports: string[] = [];

    if (name.toLowerCase() === 'breadcrumb') {
      exports.push(`
export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn('transition-colors hover:text-foreground', className)}
    {...props}
  />
));
BreadcrumbLink.displayName = 'BreadcrumbLink';

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children || (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-4 w-4">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </span>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';
`);
    }

    return exports.join('\n');
  }
}

export const navigationHandler = new NavigationHandler();
