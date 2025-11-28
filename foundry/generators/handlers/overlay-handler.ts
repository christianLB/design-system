/**
 * Overlay Handler
 *
 * Handles: Modal, Drawer, Popover, Tooltip
 * Components that render above page content
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class OverlayHandler extends BaseCategoryHandler {
  readonly category = 'overlay' as const;

  generateBaseClasses(schema: ComponentSchema): string {
    const name = schema.name.toLowerCase();

    const baseClassMap: Record<string, string[]> = {
      modal: ['fixed', 'inset-0', 'z-50', 'flex', 'items-center', 'justify-center'],
      modalcontent: [
        'relative',
        'bg-background',
        'rounded-lg',
        'shadow-lg',
        'border',
        'max-h-[90vh]',
        'overflow-auto',
      ],
      drawer: [
        'fixed',
        'z-50',
        'bg-background',
        'shadow-lg',
        'border',
        'transition-transform',
        'duration-300',
        'ease-in-out',
      ],
      popover: [
        'z-50',
        'rounded-md',
        'border',
        'bg-popover',
        'p-4',
        'text-popover-foreground',
        'shadow-md',
        'outline-none',
      ],
      tooltip: [
        'z-50',
        'overflow-hidden',
        'rounded-md',
        'border',
        'bg-popover',
        'px-3',
        'py-1.5',
        'text-sm',
        'text-popover-foreground',
        'shadow-md',
      ],
      backdrop: ['fixed', 'inset-0', 'z-40', 'bg-black/50', 'backdrop-blur-sm'],
    };

    return (baseClassMap[name] || baseClassMap.modal).join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const name = schema.name.toLowerCase();

    // Size variants for Modal and Drawer
    if (schema.variants.size) {
      if (name === 'modal' || name === 'modalcontent') {
        result.size = {
          sm: 'max-w-sm',
          md: 'max-w-md',
          lg: 'max-w-lg',
          xl: 'max-w-xl',
          full: 'max-w-full mx-4',
        };
      } else if (name === 'drawer') {
        // For drawer, size affects width/height depending on position
        result.size = {
          sm: 'max-w-xs',
          md: 'max-w-sm',
          lg: 'max-w-md',
          xl: 'max-w-lg',
          full: 'max-w-full',
        };
      }
    }

    // Position variants for Drawer
    if (schema.variants.position) {
      result.position = {
        left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
        right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
        top: 'inset-x-0 top-0 w-full border-b',
        bottom: 'inset-x-0 bottom-0 w-full border-t',
      };
    }

    // Side variants for Popover/Tooltip
    if (schema.variants.side) {
      result.side = {
        top: '',
        right: '',
        bottom: '',
        left: '',
      };
    }

    // Animation variants
    if (schema.variants.animation) {
      result.animation = {
        none: '',
        fade: 'animate-in fade-in-0',
        scale: 'animate-in fade-in-0 zoom-in-95',
        slide: 'animate-in slide-in-from-bottom-2',
      };
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const name = schema.name.toLowerCase();
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Modal with backdrop
    if (name === 'modal') {
      return `
      <>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            <${elementConfig.tag}
              ref={ref}
              role="dialog"
              aria-modal="true"
              className={cn(${name}Variants({ ${variantKeys} }), className)}
              {...rest}
            >
              {children}
            </${elementConfig.tag}>
          </>
        )}
      </>
      `.trim();
    }

    // Drawer with position-based transforms
    if (name === 'drawer') {
      return `
      <>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            <${elementConfig.tag}
              ref={ref}
              role="dialog"
              aria-modal="true"
              className={cn(${name}Variants({ ${variantKeys} }), className)}
              {...rest}
            >
              {children}
            </${elementConfig.tag}>
          </>
        )}
      </>
      `.trim();
    }

    // Tooltip with simple rendering (positioning handled externally or via Radix)
    if (name === 'tooltip') {
      return `
      <${elementConfig.tag}
        ref={ref}
        role="tooltip"
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {content || children}
      </${elementConfig.tag}>
      `.trim();
    }

    // Default popover
    return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
      </${elementConfig.tag}>
    `.trim();
  }

  /**
   * Generate compound sub-components for Modal
   */
  generateAdditionalExports(context: GenerationContext): string {
    const { schema } = context;
    const name = schema.name;
    const exports: string[] = [];

    if (name.toLowerCase() === 'modal') {
      exports.push(`
export const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6 pb-0', className)}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

export const ModalBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6', className)}
    {...props}
  />
));
ModalBody.displayName = 'ModalBody';

export const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-2 p-6 pt-0', className)}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

export const ModalClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
      'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:pointer-events-none',
      className
    )}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span className="sr-only">Close</span>
  </button>
));
ModalClose.displayName = 'ModalClose';
`);
    }

    if (name.toLowerCase() === 'drawer') {
      exports.push(`
export const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-4 border-b', className)}
    {...props}
  />
));
DrawerHeader.displayName = 'DrawerHeader';

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex-1 overflow-auto p-4', className)}
    {...props}
  />
));
DrawerBody.displayName = 'DrawerBody';

export const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center justify-end gap-2 p-4 border-t', className)}
    {...props}
  />
));
DrawerFooter.displayName = 'DrawerFooter';

export const DrawerClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
      'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      className
    )}
    {...props}
  >
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span className="sr-only">Close</span>
  </button>
));
DrawerClose.displayName = 'DrawerClose';
`);
    }

    return exports.join('\n');
  }
}

export const overlayHandler = new OverlayHandler();
