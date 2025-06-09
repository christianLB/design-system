# Design System

A comprehensive design system built with React, TypeScript, and CSS. This system provides a consistent set of UI components to help you build beautiful, accessible, and maintainable user interfaces.

## 🚀 Características

- 🎨 **Componentes Reutilizables** - Biblioteca de componentes UI consistentes
- 🖥️ **Responsive** - Componentes que funcionan en todos los tamaños de pantalla
- 🎭 **Temas** - Soporte para múltiples temas
- 🧩 **Componible** - Componentes flexibles y personalizables
- 📱 **Accesible** - Construido siguiendo las mejores prácticas de accesibilidad

## 📁 Estructura del Proyecto

```
design-system/
├── components/           # Componentes de UI reutilizables
│   ├── Button/          
│   │   ├── Button.tsx    # Componente Button
│   │   └── Button.css    # Estilos del componente Button
│   └── ...              # Otros componentes
├── docs/                # Documentación del proyecto
│   ├── tasks/           # Tareas y seguimiento
│   └── ...              # Otra documentación
├── public/              # Archivos estáticos
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── README.md
```

Para más detalles sobre la estructura, consulta [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).

## 🛠 Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd design-system
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```


## 🧩 Componentes

### Componentes Disponibles

- **Button** - Botón versátil para diversas acciones
- *Más componentes serán agregados...*

## 📚 Documentación

Para más información sobre cómo usar los componentes, consulta la documentación en el directorio `/docs`.

## 🧪 Desarrollo

Para desarrollar nuevos componentes o modificar los existentes:

1. Crea un nuevo directorio en `/components`
2. Desarrolla el componente siguiendo las convenciones
3. Añade ejemplos de uso en la documentación
4. Documenta el componente en `/docs`

## Storybook

Para visualizar los componentes de forma aislada utiliza Storybook:

```bash
pnpm storybook
```

Para generar una versión estática de la documentación:

```bash
pnpm build-storybook
```

Para ejecutar tests automáticos sobre las historias y detectar errores en los componentes, asegúrate de tener un navegador disponible para Playwright. Puedes instalar Chromium con apt o descargar los navegadores de Playwright:

```bash
pnpm exec playwright install
```

Si ya tienes Chromium instalado en el sistema, exporta la ruta antes de ejecutar los tests:

```bash
export CHROMIUM_PATH=$(which chromium-browser)
```

Luego ejecuta:

```bash
pnpm test-storybook
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, lee las pautas de contribución antes de enviar un pull request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

Design tokens are the smallest, most basic design elements that define the visual style of your application. They include:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Transitions

```tsx
import { tokens } from './lib/tokens';

// Using tokens in your components
function MyComponent() {
  return (
    <div className={tokens.colors.background}>
      <h1 className={tokens.typography.heading1}>Hello World</h1>
      <p className={tokens.typography.body}>
        This is some text with consistent styling.
      </p>
    </div>
  );
}
```

### Customizing the Theme

To customize the theme, you can override the default tokens in your Tailwind configuration:

```js
// tailwind.config.js
const { tokens } = require('./lib/tokens');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
      // ... other theme extensions
    },
  },
};
```

### Migration Guide

If you're upgrading from a previous version, please see our [Migration Guide](./MIGRATION_GUIDE.md) for instructions on updating your components to use the new design tokens system.

## Getting Started

### Installation

To use this design system in your project, install it via npm or yarn.
```
bash
npm install my-design-system
```
or
```
bash
yarn add my-design-system
```
### Usage

Import the components you need from the package:
```
typescript
import { Button, Input } from 'my-design-system';

function MyComponent() {
  return (
    <div>
      <Button>Click me</Button>
      <Input />
    </div>
  );
}

```
## Contributing

Contributions are welcome! Please read our contributing guidelines for more information.

## License

This project is licensed under the MIT License.
