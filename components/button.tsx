import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"
import { tokens } from "../tokens"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
    tokens.transition.DEFAULT,
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
    "outline-none",
    tokens.colors.focus.ring,
    tokens.colors.focus.ringOffset,
    tokens.colors.focus.ringWidth
  ),
  {
    variants: {
      variant: {
        default: cn(
          tokens.colors.background,
          tokens.colors.text,
          tokens.colors.hover.primary,
          "hover:text-primary-foreground"
        ),
        destructive: cn(
          tokens.colors.backgroundDestructive,
          "text-destructive-foreground",
          tokens.colors.hover.destructive,
          tokens.colors.focus.ringDestructive
        ),
        outline: cn(
          "border",
          tokens.colors.borderInput,
          tokens.colors.background,
          "hover:bg-accent hover:text-accent-foreground"
        ),
        secondary: cn(
          "bg-secondary text-secondary-foreground",
          tokens.colors.hover.secondary
        ),
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: cn("h-8", tokens.radius.md, "gap-1.5 px-3 has-[>svg]:px-2.5"),
        lg: cn(tokens.radius.md, "h-10 px-6 has-[>svg]:px-4"),
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  },
);

/**
 * Botón reutilizable con múltiples variantes y tamaños.
 * @component
 * @example
 * import { Button } from "@/components/button"
 *
 * function App() {
 *   return <Button>Haz clic</Button>
 * }
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {'default'|'destructive'|'outline'|'secondary'|'ghost'|'link'} [props.variant='outline'] - Variante del botón
 * @param {'default'|'sm'|'lg'|'icon'} [props.size='default'] - Tamaño del botón
 * @param {boolean} [props.asChild=false] - Si es true, renderiza el contenido como hijo
 * @param {React.ReactNode} props.children - Contenido del botón
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const ariaPressed = variant === "link" ? true : undefined;

  return (
    <Comp
      type="button"
      data-slot="button"
      aria-pressed={ariaPressed}
      className={cn(
        buttonVariants({ variant, size, className }),
        'shrink-0' // Ensure button doesn't shrink in flex containers
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };




