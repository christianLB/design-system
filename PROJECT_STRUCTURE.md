# Project Structure

This document describes the directory and file structure of the design system project.

## Overview

```
design-system/
├── .storybook/           # Storybook configuration
├── components/           # Reusable UI components
│   ├── Accordion.tsx     # Accordion component
│   ├── Alert.tsx         # Alert component
│   ├── Avatar.tsx        # Avatar component
│   ├── Badge.tsx         # Badge component
│   ├── Breadcrumb.tsx    # Breadcrumb component
│   ├── Button.tsx        # Button component
│   ├── Card.tsx          # Card component
│   ├── Carousel.tsx      # Carousel component
│   ├── Checkbox.tsx      # Checkbox component
│   ├── ConfirmDialog.tsx # Confirmation dialog component
│   ├── DatePicker.tsx    # Date picker component
│   ├── Dialog.tsx        # Dialog component
│   ├── FileUpload.tsx    # File upload component
│   ├── Input.tsx         # Input component
│   ├── Loader.tsx        # Loading indicator
│   ├── MultiSelect.tsx   # Multi-select component
│   ├── Pagination.tsx    # Pagination component
│   ├── Popover.tsx       # Popover component
│   ├── ProgressBar.tsx   # Progress bar component
│   ├── RadioGroup.tsx    # Radio group component
│   ├── Select.tsx        # Select dropdown component
│   ├── Switch.tsx        # Toggle switch component
│   ├── Table.tsx         # Table component
│   ├── Tabs.tsx          # Tabs component
│   ├── Textarea.tsx      # Textarea component
│   ├── ThemeToggle.tsx   # Theme toggle component
│   ├── Tooltip.tsx       # Tooltip component
│   └── index.ts          # Component exports
├── docs/                 # Project documentation
│   ├── tasks/            # Task tracking
│   └── ...               # Other documentation
├── lib/                  # Shared utilities and tokens
│   ├── tokens.ts         # Design tokens
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── stories/              # Storybook stories
│   └── ...
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── PROJECT_STRUCTURE.md  # This file
├── README.md
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Structure Details

### `/components`
Contiene todos los componentes de UI reutilizables. Cada componente debe tener su propio directorio con:
- `ComponentName.tsx`: El componente React
- `ComponentName.css`: Estilos del componente (opcional)
- `index.ts`: Exportación del componente

### `/docs`
Documentación del proyecto, incluyendo:
- Guías de estilo
- Patrones de diseño
- Tareas pendientes
- Decisiones de arquitectura

### `/.storybook`
Configuración de Storybook, incluyendo:
- `main.ts`: Configuración principal
- `preview.tsx`: Configuración de vista previa
- `manager.tsx`: Configuración de la interfaz de usuario (opcional)

### `/public`
Archivos estáticos como imágenes, fuentes y otros recursos.

### `/stories`
Historias de Storybook que muestran los diferentes estados de los componentes.

## Convenciones

- No usamos un directorio `src/`
- Los componentes van directamente en `/components`
- Cada componente debe tener su propio directorio
- Los nombres de archivos de componentes usan PascalCase
- Los estilos usan CSS vanilla por defecto
- La documentación va en `/docs`
