import * as React from "react"
import { cn } from "../utils"
import { tokens } from "../tokens"

/**
 * Campo de entrada de texto.
 * @component
 * @example
 * import { Input } from "@/components/input"
 *
 * function App() {
 *   return <Input placeholder="Escribe algo..." />
 * }
 * 
 * @param {Object} props - Las propiedades del componente
 * @param {string} [props.className] - Clases CSS adicionales
 * @param {string} [props.type='text'] - Tipo de entrada
 * @param {string} [props.placeholder] - Texto de marcador de posición
 * @param {boolean} [props.disabled] - Si el campo está deshabilitado
 * @param {string} [props.value] - Valor controlado
 * @param {function} [props.onChange] - Manejador de cambio
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex w-full min-w-0",
        tokens.radius.DEFAULT,
        "border bg-transparent",
        tokens.colors.borderInput,
        "px-3 py-1 text-base md:text-sm",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground",
        "selection:bg-primary selection:text-primary-foreground",
        tokens.transition.DEFAULT,
        tokens.colors.focus.ring,
        tokens.colors.focus.ringOffset,
        tokens.colors.focus.ringWidth,
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
