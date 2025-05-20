# Project Structure

This document describes the standard directory and file structure of the design system project.

## Overview

```
design-system/
├── src/                           # Source code
│   ├── components/               # Reusable UI components (1 component per folder)
│   │   ├── Accordion/           # Accordion component
│   │   │   ├── index.ts         # Public API (exports)
│   │   │   ├── Accordion.tsx    # Component implementation
│   │   │   ├── types.ts         # Type definitions
│   │   │   └── styles.ts        # Component styles
│   │   ├── Button/              # Button component
│   │   │   ├── index.ts
│   │   │   ├── Button.tsx
│   │   │   ├── types.ts
│   │   │   └── styles.ts
│   │   └── ...
│   │
│   ├── hooks/                   # Custom hooks
│   ├── utils/                   # Utility functions
│   ├── providers/               # Context providers
│   └── index.ts                 # Main entry point
│
├── dist/                      # Build output (generated)
│   ├── esm/                    # ES Modules
│   └── cjs/                    # CommonJS
│
├── demo/                     # Demo application
│   ├── pages/                 # Demo pages for components
│   │   ├── button/           # Button demo
│   │   ├── card/             # Card demo
│   │   └── table/            # Table demo
│   ├── public/               # Static assets
│   ├── styles/               # Global styles
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # Document template
│   └── index.tsx             # Home page
│
├── docs/                    # Documentation
│   ├── tasks/                # Task tracking
│   └── guides/               # Usage guides
│
├── tests/                     # Test files
│   ├── unit/                   # Unit tests
│   └── integration/            # Integration tests
│
├── .github/                   # GitHub configurations
│   └── workflows/              # CI/CD workflows
│
├── public/                    # Static assets
├── scripts/                    # Build and utility scripts
├── .eslintrc                   # ESLint config
├── .prettierrc                 # Prettier config
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── package.json                # Project manifest

## Structure Details

### `/src/components`
Each component should follow this structure:
```
ComponentName/
  ├── index.ts         # Public API (exports)
  ├── ComponentName.tsx  # Main component
  ├── types.ts          # TypeScript types
  ├── styles.ts         # Component styles
  └── __tests__/        # Component tests
     └── ComponentName.test.tsx
```

### `/demo`
The demo application showcases components in an interactive way:
- `/pages` - Demo pages for each component
- `/public` - Static assets
- `/styles` - Global styles and theming
- `_app.tsx` - App wrapper with providers
- `_document.tsx` - Custom document for Next.js

### `/docs`
- `tasks/` - Task tracking and management
- `guides/` - Usage guides and documentation

### Configuration Files
- `.eslintrc` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `package.json` - Project manifest and dependencies
```

## Development Workflow

### Adding a New Component
1. Create a new directory in `/src/components`
2. Follow the component structure outlined above
3. Add demo page in `/demo/pages`
4. Update documentation in `/docs/guides`

### Building the Project
```bash
# Install dependencies
pnpm install

# Start development server for demo
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test
```

## Code Conventions

### Component Development
- Use TypeScript for all components
- Follow the component structure exactly
- Write tests for all components
- Document props and usage examples in JSDoc
- Use CSS Modules for component styling

### Demo Application
- Each component should have a dedicated demo page
- Show all variants and states
- Include interactive examples
- Document usage patterns

### Project Standards
- Components are located in `/src/components`
- Use Tailwind CSS for styling
- TypeScript is required for all code
- Follow React naming conventions (PascalCase for components)
- Use functional components with TypeScript interfaces
- Prefer named exports over default exports
- Document all public APIs with JSDoc
