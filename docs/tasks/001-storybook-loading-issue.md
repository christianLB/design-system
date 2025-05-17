# [BUG] Storybook no muestra contenido - Solo se ve spinner de carga

## Descripción del Problema
Storybook no está mostrando ningún componente. En su lugar, solo se muestra un spinner de carga centralizado sin llegar a cargar el contenido.

## Pasos para Reproducir
1. Ejecutar `npm run storybook` o `yarn storybook`
2. Abrir Storybook en el navegador
3. Navegar a cualquier historia

## Comportamiento Esperado
- Deberían mostrarse los componentes en el área de vista previa
- La navegación entre historias debería funcionar correctamente

## Comportamiento Actual
- Solo se muestra un spinner de carga centralizado
- No se carga ningún componente
- La interfaz de Storybook no responde

## Posibles Causas
- Problemas con las dependencias de Storybook
- Errores en la configuración de webpack/babel
- Errores de tiempo de ejecución que impiden la carga
- Problemas con los presets de Storybook

## Ambiente
- Versión de Storybook: [Completar con versión]
- Node.js: [Completar versión]
- Navegador: [Especificar navegador y versión]
- Sistema Operativo: [Especificar SO y versión]

## Archivos Relevantes
- `.storybook/main.js`
- `package.json`
- Cualquier archivo de configuración de webpack/babel

## Solución Propuesta
1. Revisar la consola del navegador en busca de errores
2. Verificar que todas las dependencias estén correctamente instaladas
3. Revisar los logs del servidor de Storybook
4. Probar con una instalación limpia de node_modules

---

## Causa Raíz y Solución Aplicada (2025-05-17)

### Causa Raíz
El error principal que impedía la carga de componentes en Storybook (mostrando solo un spinner de carga) era:

```
[postcss] Cannot read properties of undefined (reading 'fontSize')
```

Esto fue causado porque el archivo `tailwind.config.js` hacía referencia a propiedades dentro de `tokens.typography` (como `fontSize`, `lineHeight`, `fontFamily`), pero el archivo `tokens.ts` no exportaba una propiedad `typography` ni sus subpropiedades. Esto provocaba que PostCSS/Tailwind lanzara un error durante el build del iframe de Storybook, resultando en una pantalla en blanco o spinner.

### Solución
Se añadió un objeto `typography` mínimo al archivo `tokens.ts` con las siguientes propiedades:
- `fontSize`
- `lineHeight`
- `fontFamily`

Esto resolvió el error de PostCSS y permitió que Storybook cargara correctamente las historias y el área de previsualización.

**Ejemplo de la solución aplicada en `tokens.ts`:**
```ts
export const tokens = {
  typography: {
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    lineHeight: {
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
    },
  },
  // ...otros tokens
}
```

**Después de este cambio, Storybook volvió a funcionar correctamente y se pudo visualizar la historia de "Sanity/Check" sin errores en la consola.**

---

## Prioridad
Alta - Bloquea el desarrollo y revisión de componentes

## Asignado a
[Por asignar]

## Estado
🟢 Resuelto

El problema de Storybook fue resuelto exitosamente tras corregir los tokens de tipografía requeridos por Tailwind en el archivo `tokens.ts`. Todas las historias de componentes se visualizan correctamente y no hay errores en consola.
