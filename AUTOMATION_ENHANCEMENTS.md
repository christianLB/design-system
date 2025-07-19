# 🤖 Claude Code - Guía de Evolución del Design System

## 📋 Contexto del Proyecto

**Repositorio:** https://github.com/christianlb/design-system  
**Stack Actual:** React + TypeScript + CSS + Tailwind v4 + Storybook + pnpm

## 🎯 Objetivo Principal

Transformar este design system en un proyecto completamente automatizado que Claude Code pueda:

1. Mantener autónomamente
2. Crear nuevos componentes y temas
3. Publicar releases automáticamente
4. Auto-documentar y enseñar su uso

## 📦 Fase 1: Configuración Base (CRÍTICO - Hacer Primero)

### 1.1 Instalar Dependencias Esenciales

```bash
# Ejecutar en la raíz del proyecto
pnpm add -D \
  eslint \
  prettier \
  eslint-config-prettier \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  husky \
  lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  jsdom \
  @playwright/test \
  tsup \
  size-limit \
  @size-limit/preset-small-lib
```

### 1.2 Crear Archivos de Configuración

**Crear `.eslintrc.json`:**

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

**Crear `.prettierrc`:**

```json
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

**Crear `.commitlintrc.json`:**

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

**Crear `.nvmrc`:**

```
18.19.0
```

### 1.3 Configurar Husky

```bash
# Ejecutar estos comandos
pnpm husky install
pnpm husky add .husky/pre-commit "pnpm lint-staged"
pnpm husky add .husky/commit-msg "pnpm commitlint --edit $1"
```

**Añadir a `package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": "prettier --write"
  }
}
```

## 🧪 Fase 2: Testing Completo

### 2.1 Configurar Vitest

**Crear `vitest.config.ts`:**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: ['node_modules/', 'src/test/', '**/*.stories.tsx'],
      threshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Crear `src/test/setup.ts`:**

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### 2.2 Crear Test Template para Componentes

**Crear `templates/component.test.template.tsx`:**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test Content</ComponentName>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<ComponentName onClick={handleClick}>Click me</ComponentName>);
    await user.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ComponentName className="custom-class">Test</ComponentName>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

## 🚀 Fase 3: CI/CD Completo

### 3.1 Crear GitHub Actions Workflows

**Crear `.github/workflows/ci.yml`:**

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '18.x'
  PNPM_VERSION: 8

jobs:
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm type-check
      - run: pnpm format:check

  test:
    name: Tests
    runs-on: ubuntu-latest
    needs: quality
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:coverage
      - uses: codecov/codecov-action@v3

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [quality, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm size
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

**Crear `.github/workflows/release.yml`:**

```yaml
name: Release

on:
  push:
    branches: [main]

permissions:
  contents: write
  issues: write
  pull-requests: write

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          persist-credentials: false
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: '18.x'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: pnpm semantic-release
```

### 3.2 Configurar Semantic Release

**Crear `.releaserc.json`:**

```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    [
      "@semantic-release/github",
      {
        "assets": [
          {
            "path": "dist/**/*",
            "label": "Distribution files"
          }
        ]
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

## 🏗️ Fase 4: Build System Optimizado

### 4.1 Configurar tsup

**Crear `tsup.config.ts`:**

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ['react', 'react-dom'],
  globalName: 'ChristianLBDesignSystem',
});
```

### 4.2 Actualizar package.json

```json
{
  "name": "@christianlb/design-system",
  "version": "0.1.0",
  "description": "A comprehensive design system built with React, TypeScript, and CSS",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "tsup",
    "build:watch": "tsup --watch",
    "build-storybook": "storybook build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "type-check": "tsc --noEmit",
    "size": "size-limit",
    "prepare": "husky install",
    "semantic-release": "semantic-release"
  },
  "size-limit": [
    {
      "path": "dist/index.js",
      "limit": "50 KB"
    }
  ]
}
```

## 🎨 Fase 5: Sistema de Temas Automatizado

### 5.1 Estructura de Temas

**Crear `src/themes/base.theme.ts`:**

```typescript
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    full: string;
  };
}

export const baseTheme: Theme = {
  name: 'base',
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    surface: '#f3f4f6',
    text: '#111827',
    textSecondary: '#6b7280',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    full: '9999px',
  },
};
```

### 5.2 Generador de Temas con IA

**Crear `scripts/generate-theme.ts`:**

```typescript
import { Theme, baseTheme } from '../src/themes/base.theme';
import fs from 'fs-extra';
import path from 'path';

interface ThemeGeneratorOptions {
  name: string;
  description: string;
  baseColors?: {
    primary?: string;
    secondary?: string;
  };
  mood?: 'light' | 'dark' | 'colorful' | 'minimal';
}

export async function generateTheme(options: ThemeGeneratorOptions): Promise<Theme> {
  // Claude Code puede expandir esta función para generar temas inteligentemente
  const newTheme: Theme = {
    ...baseTheme,
    name: options.name,
    colors: {
      ...baseTheme.colors,
      ...options.baseColors,
    },
  };

  // Guardar el tema
  const themePath = path.join(__dirname, `../src/themes/${options.name}.theme.ts`);
  const themeContent = `
import { Theme } from './base.theme';

export const ${options.name}Theme: Theme = ${JSON.stringify(newTheme, null, 2)};
`;

  await fs.writeFile(themePath, themeContent);

  // Actualizar el índice de temas
  await updateThemeIndex(options.name);

  return newTheme;
}

async function updateThemeIndex(themeName: string) {
  const indexPath = path.join(__dirname, '../src/themes/index.ts');
  const exportLine = `export * from './${themeName}.theme';\n`;

  await fs.appendFile(indexPath, exportLine);
}
```

## 🤖 Fase 6: Auto-Documentación con IA

### 6.1 Generador de Documentación

**Crear `scripts/generate-docs-ai.ts`:**

```typescript
import { Project } from 'ts-morph';
import fs from 'fs-extra';
import path from 'path';

interface ComponentAnalysis {
  name: string;
  description: string;
  props: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  examples: string[];
  bestPractices: string[];
  accessibility: string[];
}

export async function analyzeAndDocumentComponent(
  componentPath: string,
): Promise<ComponentAnalysis> {
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
  });

  const sourceFile = project.getSourceFile(componentPath);
  if (!sourceFile) throw new Error('Component not found');

  // Análisis del componente
  const analysis: ComponentAnalysis = {
    name: extractComponentName(sourceFile),
    description: await generateDescription(sourceFile),
    props: extractProps(sourceFile),
    examples: await generateExamples(sourceFile),
    bestPractices: await generateBestPractices(sourceFile),
    accessibility: await analyzeAccessibility(sourceFile),
  };

  // Generar documentación
  await generateMarkdownDoc(analysis);
  await generateStorybookStory(analysis);

  return analysis;
}

async function generateDescription(sourceFile: any): Promise<string> {
  // Claude Code puede analizar el componente y generar una descripción inteligente
  const componentCode = sourceFile.getText();

  // Prompt para Claude Code
  return `
    Analiza este componente y genera una descripción clara y concisa:
    - Qué hace el componente
    - Cuándo usarlo
    - Casos de uso principales
    
    Código: ${componentCode}
  `;
}

async function generateExamples(sourceFile: any): Promise<string[]> {
  // Claude Code genera ejemplos de uso automáticamente
  return [
    '// Ejemplo básico',
    '<Component />',
    '',
    '// Ejemplo con props',
    '<Component variant="primary" size="large" />',
    '',
    '// Ejemplo avanzado',
    '<Component onAction={handleAction}>Content</Component>',
  ];
}

async function generateBestPractices(sourceFile: any): Promise<string[]> {
  // Claude Code analiza y sugiere mejores prácticas
  return ['Usa el componente para...', 'Evita usar el componente cuando...', 'Combina bien con...'];
}

async function analyzeAccessibility(sourceFile: any): Promise<string[]> {
  // Claude Code analiza accesibilidad
  return [
    'El componente soporta navegación por teclado',
    'Incluye roles ARIA apropiados',
    'Compatible con lectores de pantalla',
  ];
}
```

## 📚 Fase 7: Sistema de Aprendizaje

### 7.1 Tutorial Interactivo

**Crear `src/tutorials/interactive-tutorial.tsx`:**

```typescript
import React, { useState } from 'react';
import { Button } from '../components/Button';

interface TutorialStep {
  title: string;
  content: string;
  code: string;
  task: string;
  validation: (userCode: string) => boolean;
}

export const InteractiveTutorial: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState('');

  const steps: TutorialStep[] = [
    {
      title: 'Crear tu primer componente',
      content: 'Vamos a crear un botón básico usando nuestro design system',
      code: '<Button variant="primary">Click me</Button>',
      task: 'Crea un botón con variante "secondary"',
      validation: (code) => code.includes('variant="secondary"'),
    },
    // Más pasos...
  ];

  const handleNext = () => {
    if (steps[currentStep].validation(userCode)) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="tutorial-container">
      <h2>{steps[currentStep].title}</h2>
      <p>{steps[currentStep].content}</p>
      <pre>{steps[currentStep].code}</pre>
      <div className="task">
        <h3>Tu turno:</h3>
        <p>{steps[currentStep].task}</p>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
        <Button onClick={handleNext}>Siguiente</Button>
      </div>
    </div>
  );
};
```

## 🔧 Fase 8: Scripts de Mantenimiento Automático

### 8.1 Script de Auto-Mantenimiento

**Crear `scripts/auto-maintain.ts`:**

```typescript
#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';

async function autoMaintain() {
  console.log('🤖 Iniciando mantenimiento automático del Design System...\n');

  // 1. Actualizar dependencias
  console.log('📦 Actualizando dependencias...');
  try {
    execSync('pnpm update --interactive --latest', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Algunas dependencias requieren revisión manual');
  }

  // 2. Ejecutar tests
  console.log('\n🧪 Ejecutando tests...');
  execSync('pnpm test', { stdio: 'inherit' });

  // 3. Verificar cobertura
  console.log('\n📊 Verificando cobertura de tests...');
  const coverage = JSON.parse(await fs.readFile('./coverage/coverage-summary.json', 'utf-8'));

  if (coverage.total.lines.pct < 80) {
    console.log('⚠️  La cobertura está por debajo del 80%. Generando tests...');
    execSync('pnpm generate:tests', { stdio: 'inherit' });
  }

  // 4. Analizar y optimizar bundle
  console.log('\n📊 Analizando tamaño del bundle...');
  execSync('pnpm size', { stdio: 'inherit' });

  // 5. Generar documentación
  console.log('\n📚 Actualizando documentación...');
  execSync('pnpm generate:docs', { stdio: 'inherit' });

  // 6. Verificar accesibilidad
  console.log('\n♿ Verificando accesibilidad...');
  execSync('pnpm test:accessibility', { stdio: 'inherit' });

  console.log('\n✅ Mantenimiento completado!');
}

autoMaintain().catch(console.error);
```

## 🚦 Fase 9: Comandos Finales para Claude Code

### Comandos Esenciales para Ejecutar

```bash
# 1. Configuración inicial (ejecutar una vez)
pnpm install
pnpm prepare
pnpm build

# 2. Desarrollo diario
pnpm dev                    # Iniciar Storybook
pnpm test:watch            # Tests en modo watch
pnpm lint:fix              # Arreglar problemas de código

# 3. Antes de cada commit
pnpm test                  # Ejecutar todos los tests
pnpm lint                  # Verificar calidad
pnpm build                 # Verificar que compila

# 4. Para crear nuevos componentes
pnpm generate:component    # Usar el generador interactivo

# 5. Para publicar una nueva versión
# Los commits deben seguir el formato:
# feat: nueva característica
# fix: corrección de bug
# docs: cambios en documentación
# style: cambios de estilo
# refactor: refactorización
# test: agregar tests
# chore: tareas de mantenimiento

# La publicación es automática al hacer push a main
```

## 📝 Instrucciones Específicas para Claude Code

### Al crear un nuevo componente:

1. Usa SIEMPRE el generador: `pnpm generate:component`
2. Incluye tests con al menos 80% de cobertura
3. Documenta todas las props con JSDoc
4. Crea al menos 3 ejemplos en Storybook
5. Verifica accesibilidad con el addon de a11y

### Al modificar componentes existentes:

1. Ejecuta tests antes de cambiar: `pnpm test`
2. Actualiza tests si cambias la API
3. Actualiza documentación si es necesario
4. Mantén retrocompatibilidad cuando sea posible

### Al crear un nuevo tema:

1. Usa el script: `pnpm generate:theme`
2. Basate en `baseTheme` como punto de partida
3. Documenta la paleta de colores
4. Crea una demo en Storybook

### Para mantenimiento regular:

1. Ejecuta `pnpm auto-maintain` semanalmente
2. Revisa el reporte de dependencias outdated
3. Actualiza CHANGELOG.md manualmente si es necesario
4. Verifica que todos los workflows de CI pasen

## 🎯 Objetivos de Calidad

- **Coverage de tests:** Mínimo 80%
- **Bundle size:** Máximo 50KB
- **Lighthouse score:** Mínimo 95/100
- **TypeScript coverage:** 100%
- **Documentación:** 100% de componentes documentados

## 🤝 Colaboración con Humanos

Cuando un humano solicite cambios:

1. Pregunta por el caso de uso específico
2. Sugiere la mejor aproximación según el design system
3. Implementa siguiendo los estándares establecidos
4. Documenta cualquier decisión de diseño importante
5. Crea un PR con descripción detallada

---

**Nota Final:** Este design system está optimizado para ser mantenido por IA. Todos los procesos están automatizados y las decisiones siguen patrones predecibles. Claude Code puede mantener, expandir y mejorar este sistema de forma autónoma siguiendo estas guías.
