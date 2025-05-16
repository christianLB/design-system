"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "../src/lib/utils"

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
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
