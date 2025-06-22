# Auditoría de Elementos Nativos en Componentes

Este documento identifica qué componentes del design system contienen implementaciones directas de elementos HTML nativos (por ejemplo, `div`, `button`, `input`, etc.).

Para mantener la consistencia y reutilización del design system, se recomienda refactorizar estos componentes para que utilicen otros componentes del propio sistema (p. ej. `Card`, `Button`, `Input`) como bloques de construcción en lugar de elementos nativos.

A continuación se listan los componentes revisados y las referencias de código donde se utilizan elementos nativos.

## Componentes

- **Accordion** – Uso de `div` y `h3` para estructura y encabezados.
  - Ejemplo: `Accordion.tsx` líneas 25-63.
- **Alert** – Contiene un `div` para el contenedor principal y `h5` para el título.
  - Ejemplo: `Alert.tsx` líneas 46-56.
- **Avatar** – Implementa `div` y `img` para mostrar el avatar o inicial.
  - Ejemplo: `Avatar.tsx` líneas 74-95.
- **Badge** – Renderiza el contenido dentro de un `div`.
  - Ejemplo: `Badge.tsx` líneas 41-47.
- **Breadcrumb** – Utiliza `nav`, `ol`, `li` y `a` directamente.
  - Ejemplo: `Breadcrumb.tsx` líneas 17-39.
- **Carousel** – Compuesto por múltiples `div` y `button` para la navegación.
  - Ejemplo: `Carousel.tsx` líneas 38-104.
- **ConfirmDialog** – Envuelve el `Dialog` en un `div` contenedor.
  - Ejemplo: `ConfirmDialog.tsx` líneas 56-78.
- **DatePicker** – Varias secciones con `div`, `button` y encabezados.
  - Ejemplo: `DatePicker.tsx` líneas 96-159.
- **DesignSystemProvider** – Usa un `div` para envolver los hijos.
  - Ejemplo: `DesignSystemProvider/index.tsx` líneas 16-21.
- **FileUpload** – Maneja la zona de carga y la lista de archivos con `div` y `button`.
  - Ejemplo: `FileUpload.tsx` líneas 69-120.
- **Input** – Componente basado en la etiqueta `input` nativa.
  - Ejemplo: `Input.tsx` líneas 42-60.
- **Label** – Etiqueta HTML `label` utilizada directamente.
  - Ejemplo: `Label.tsx` líneas 41-54.
- **Loader** – Estructura con `div` para animación y envoltorio.
  - Ejemplo: `Loader.tsx` líneas 70-134.
- **MultiSelect** – Envuelve el select en un `div` contenedor.
  - Ejemplo: `MultiSelect.tsx` líneas 104-126.
- **Pagination** – Botones y contenedor principal con `div` y `button`.
  - Ejemplo: `Pagination.tsx` líneas 80-143.
- **ProgressBar** – Utiliza `div` para la barra y las etiquetas.
  - Ejemplo: `ProgressBar.tsx` líneas 108-151.
- **RadioGroup** – Construido con `div`, `input` y `label`.
  - Ejemplo: `RadioGroup.tsx` líneas 131-185.
- **Table** – Componente de tabla usando `div`, `table`, `thead`, `tbody`.
  - Ejemplo: `Table.tsx` líneas 143-213.
- **Textarea** – Basado en la etiqueta `textarea` nativa.
  - Ejemplo: `Textarea.tsx` líneas 12-28.
- **ThemeToggle** – Componente de `button` con iconos SVG.
  - Ejemplo: `ThemeToggle.tsx` líneas 20-46.
- **Tooltip** – Usa `div` para contenedor y contenido flotante.
  - Ejemplo: `Tooltip.tsx` líneas 126-170.

Estos componentes deberían refactorizarse para apoyarse en componentes ya existentes del design system (por ejemplo, usar `Card` para secciones de contenido, `Button` para acciones, o crear un componente `Box`/`Flex` para la estructura) en lugar de utilizar directamente elementos HTML.

## Estrategia de Mejora y Refactorización

Para reducir la dependencia de elementos nativos y mejorar la consistencia se propone:

1. **Introducir primitivas de layout** como `Box`, `Flex`, `Grid` o `Stack`. Estas servirán de contenedores genéricos con soporte para espaciado, alineación y variantes, evitando el uso directo de `div` en todos los componentes.
2. **Crear wrappers para controles de formulario** (`TextInput`, `Select`, `Checkbox`, etc.) que integren los estilos y accesibilidad comunes. Otros componentes deberán apoyarse en estos wrappers en lugar de etiquetas nativas.
3. **Aprovechar los tokens de diseño** para colores, tamaños y tipografía. Los componentes refactorizados deben consumir estos tokens y permitir personalización mediante variantes.
4. **Migración gradual**: al refactorizar, sustituir poco a poco las etiquetas nativas por los nuevos componentes del sistema. Mantener compatibilidad hasta completar la migración.
5. **Documentar ejemplos y casos de uso** en Storybook para cada componente refactorizado, asegurando consistencia y facilitando la adopción.

## Componentes Faltantes en el Design System

Aunque contamos con una base sólida de componentes, se identifican varios bloques aún no implementados que ayudarían a evitar el uso de HTML nativo y mejorar la coherencia general:

- `Box` / `Flex` / `Grid` / `Stack` – Contenedores de layout reutilizables.
- `Text` y `Heading` – Tipografía con estilos unificados.
- `Link` – Enlace estilizado y accesible.
- `List` (ordenada y desordenada) – Estructura de listas con variantes.
- `Menu` o `Dropdown` – Para acciones agrupadas.
- `Breadcrumb` ya existe, pero podría beneficiarse de un componente `Crumb`.
- Cualquier otro contenedor genérico (p.ej. `Section` o `Container`) para layout de páginas.

Implementar estos componentes permitiría que futuros desarrollos se basen enteramente en piezas del design system, aumentando la cohesión y facilitando el mantenimiento.
