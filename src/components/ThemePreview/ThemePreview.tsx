/**
 * ThemePreview Component
 *
 * Displays a preview of theme colors and styles
 * Useful for theme selection and composition.
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { Theme } from '../../theme/ThemeContext';

const themePreviewVariants = cva('rounded-lg border overflow-hidden', {
  variants: {
    size: {
      sm: 'w-32',
      md: 'w-48',
      lg: 'w-64',
      full: 'w-full',
    },
    interactive: {
      true: 'cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2',
      false: '',
    },
    selected: {
      true: 'ring-2 ring-primary ring-offset-2',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    interactive: false,
    selected: false,
  },
});

export interface ThemePreviewColors {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}

export interface ThemePreviewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof themePreviewVariants> {
  /** Theme name */
  name: string;
  /** Theme description */
  description?: string;
  /** Theme colors to preview */
  colors: ThemePreviewColors;
  /** Click handler */
  onClick?: (name: string) => void;
  /** Show color swatches */
  showSwatches?: boolean;
  /** Show theme name */
  showName?: boolean;
}

export const ThemePreview = React.forwardRef<HTMLDivElement, ThemePreviewProps>(
  (
    {
      name,
      description,
      colors,
      size,
      interactive,
      selected,
      onClick,
      showSwatches = true,
      showName = true,
      className,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (interactive && onClick) {
        onClick(name);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactive && onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick(name);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(themePreviewVariants({ size, interactive, selected }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-pressed={interactive ? (selected ?? undefined) : undefined}
        aria-label={interactive ? `Select ${name} theme` : undefined}
        {...props}
      >
        {/* Preview area */}
        <div
          className="p-3"
          style={{
            backgroundColor: colors.background,
            color: colors.foreground,
          }}
        >
          {/* Mock content */}
          <div className="space-y-2">
            {/* Header bar */}
            <div
              className="h-2 w-3/4 rounded"
              style={{ backgroundColor: colors.foreground, opacity: 0.8 }}
            />
            {/* Subheader */}
            <div className="h-1.5 w-1/2 rounded" style={{ backgroundColor: colors.muted }} />

            {/* Button row */}
            <div className="flex gap-1.5 pt-1">
              <div
                className="h-4 w-12 rounded"
                style={{
                  backgroundColor: colors.primary,
                }}
              />
              <div
                className="h-4 w-10 rounded"
                style={{
                  backgroundColor: colors.secondary,
                }}
              />
            </div>

            {/* Text lines */}
            <div className="space-y-1 pt-1">
              <div className="h-1 w-full rounded" style={{ backgroundColor: colors.muted }} />
              <div className="h-1 w-4/5 rounded" style={{ backgroundColor: colors.muted }} />
            </div>
          </div>
        </div>

        {/* Color swatches */}
        {showSwatches && (
          <div className="flex h-3">
            <div className="flex-1" style={{ backgroundColor: colors.primary }} />
            <div className="flex-1" style={{ backgroundColor: colors.secondary }} />
            <div className="flex-1" style={{ backgroundColor: colors.accent }} />
            <div className="flex-1" style={{ backgroundColor: colors.muted }} />
          </div>
        )}

        {/* Theme name */}
        {showName && (
          <div
            className="px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: colors.background,
              color: colors.foreground,
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            {name}
            {description && (
              <p className="text-xs font-normal" style={{ color: colors.muted }}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);

ThemePreview.displayName = 'ThemePreview';

export { themePreviewVariants };
export default ThemePreview;
