/**
 * Display Handler
 *
 * Handles: Avatar, Tooltip, Tag/Chip, Skeleton
 * Components that display information or visual indicators
 */

import type { ComponentSchema, GenerationContext } from '../core/types';
import { BaseCategoryHandler } from './base-handler';

export class DisplayHandler extends BaseCategoryHandler {
  readonly category = 'display' as const;

  generateBaseClasses(schema: ComponentSchema): string {
    const name = schema.name.toLowerCase();

    const baseClassMap: Record<string, string[]> = {
      avatar: ['relative', 'flex', 'shrink-0', 'overflow-hidden', 'rounded-full'],
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
        'animate-in',
        'fade-in-0',
        'zoom-in-95',
      ],
      tag: [
        'inline-flex',
        'items-center',
        'gap-1',
        'rounded-md',
        'border',
        'font-medium',
        'transition-colors',
      ],
      skeleton: ['animate-pulse', 'rounded-md', 'bg-muted'],
    };

    return (baseClassMap[name] || baseClassMap.tag).join(' ');
  }

  generateVariantClasses(schema: ComponentSchema): Record<string, Record<string, string>> {
    const result: Record<string, Record<string, string>> = {};
    const name = schema.name.toLowerCase();

    // Size variants
    if (schema.variants.size) {
      if (name === 'avatar') {
        result.size = {
          xs: 'h-6 w-6',
          sm: 'h-8 w-8',
          md: 'h-10 w-10',
          lg: 'h-12 w-12',
          xl: 'h-16 w-16',
        };
      } else if (name === 'tag') {
        result.size = {
          sm: 'px-1.5 py-0.5 text-xs',
          md: 'px-2 py-1 text-xs',
          lg: 'px-2.5 py-1 text-sm',
        };
      }
    }

    // Visual variants
    if (schema.variants.variant) {
      if (name === 'tag') {
        result.variant = {
          default: 'border-transparent bg-secondary text-secondary-foreground',
          outline: 'border-border bg-transparent',
          primary: 'border-transparent bg-primary text-primary-foreground',
        };
      } else if (name === 'skeleton') {
        result.variant = {
          default: 'rounded-md',
          circular: 'rounded-full',
          text: 'h-4 rounded-sm',
        };
      }
    }

    // Shape variants for avatar
    if (schema.variants.shape) {
      result.shape = {
        circle: 'rounded-full',
        square: 'rounded-md',
      };
    }

    return result;
  }

  generateComponentBody(context: GenerationContext): string {
    const { schema, elementConfig } = context;
    const name = schema.name.toLowerCase();
    const variantKeys = Object.keys(schema.variants).join(', ');

    // Avatar with image and fallback
    if (name === 'avatar') {
      return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {src ? (
          <img
            src={src}
            alt={alt || ''}
            className="aspect-square h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallbackEl = e.currentTarget.nextElementSibling;
              if (fallbackEl) (fallbackEl as HTMLElement).style.display = 'flex';
            }}
          />
        ) : null}
        <span
          className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium"
          style={{ display: src ? 'none' : 'flex' }}
        >
          {fallback || children}
        </span>
      </${elementConfig.tag}>
      `.trim();
    }

    // Tag with optional close button
    if (name === 'tag') {
      return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </${elementConfig.tag}>
      `.trim();
    }

    // Skeleton is just a div with animation
    if (name === 'skeleton') {
      return `
      <${elementConfig.tag}
        ref={ref}
        className={cn(${name}Variants({ ${variantKeys} }), className)}
        {...rest}
      />
      `.trim();
    }

    // Default: simple div wrapper
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
}

export const displayHandler = new DisplayHandler();
