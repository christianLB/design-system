import React from 'react';
import clsx from 'clsx';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

/** A basic skeleton placeholder for loading states. */
export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, style, className, ...props }, ref) => {
    const inlineStyle = { width, height, ...style } as React.CSSProperties;
    return (
      <div
        ref={ref}
        className={clsx(
          'animate-pulse rounded-[var(--radius)] bg-[var(--muted)] skeleton-glow',
          className,
        )}
        style={inlineStyle}
        aria-hidden="true"
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
