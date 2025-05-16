"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
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
function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
