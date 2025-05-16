import * as React from "react"

import { cn } from "../lib/utils"

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
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
