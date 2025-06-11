/* eslint react/prop-types: 0 */
import * as React from "react";
import { cn } from '../../utils';

/**
 * A multi-line text input component.
 * @component
 * @example
 * <Textarea placeholder="Type your message here." />
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md",
        "border border-border bg-background text-foreground",
        "px-3 py-2 text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/30",
        "resize-vertical",
        className
      )}
      ref={ref} data-testid="textarea"
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
