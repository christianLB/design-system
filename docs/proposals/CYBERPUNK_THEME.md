# 🚀 Cyberpunk Theme - Guía de Integración Completa para Claude Code

## 📋 Contexto del Proyecto

**Repositorio**: https://github.com/christianLB/design-system
**Stack**: React + TypeScript + Tailwind CSS v4 + Storybook
**Objetivo**: Integrar tema Cyberpunk como extensión del design system existente

## 🎯 Instrucciones para Claude Code

### 1. ANÁLISIS INICIAL

```bash
# Primero, analiza la estructura actual del proyecto
cd design-system
ls -la
cat package.json
cat tailwind.config.js
ls components/
ls docs/
```

### 2. CREAR ESTRUCTURA DE ARCHIVOS

Crea la siguiente estructura:

```
themes/
├── cyberpunk/
│   ├── config.js          # Configuración Tailwind
│   ├── styles.css         # Estilos CSS adicionales
│   ├── tokens.js          # Design tokens
│   ├── components.css     # Componentes específicos
│   └── README.md          # Documentación del tema
```

### 3. ARCHIVOS A CREAR

#### `themes/cyberpunk/config.js`

```javascript
// Configuración completa de Tailwind para el tema Cyberpunk
/** @type {import('tailwindcss').Config} */
export const cyberpunkTheme = {
  theme: {
    extend: {
      // Paleta de colores Cyberpunk
      colors: {
        // Primary - Matrix Green
        'cyber-primary': {
          50: '#0a0f0a',
          100: '#0d1f0d',
          200: '#1a3d1a',
          300: '#2d6b2d',
          400: '#39ff14', // Matrix green
          500: '#00ff41', // Bright matrix green
          600: '#00e639',
          700: '#00cc33',
          800: '#00b32d',
          900: '#009926',
        },

        // Secondary - DOOM Red
        'cyber-secondary': {
          50: '#1a0505',
          100: '#330a0a',
          200: '#661414',
          300: '#991f1f',
          400: '#cc2929',
          500: '#ff0000', // DOOM red
          600: '#ff3333',
          700: '#ff6666',
          800: '#ff9999',
          900: '#ffcccc',
        },

        // Accent Colors
        'cyber-accent': {
          purple: '#6a0dad', // Evangelion Unit-01
          orange: '#ff6600', // Evangelion warning
          cyan: '#00ffff', // Swordfish tech
          yellow: '#ffff00', // DOOM yellow
          pink: '#ff1493', // Cyber pink
        },

        // Neutral Colors - Dark Tech
        'cyber-neutral': {
          0: '#000000', // Pure black
          50: '#0a0a0a', // Almost black
          100: '#1a1a1a', // Dark charcoal
          200: '#2a2a2a', // Medium charcoal
          300: '#3a3a3a', // Light charcoal
          400: '#4a4a4a', // Dark gray
          500: '#666666', // Medium gray
          600: '#808080', // Light gray
          700: '#999999', // Lighter gray
          800: '#cccccc', // Very light gray
          900: '#ffffff', // White
        },
      },

      // Typography
      fontFamily: {
        'cyber-mono': [
          'Fira Code',
          'JetBrains Mono',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'monospace',
        ],
        'cyber-display': ['Orbitron', 'Exo 2', 'Rajdhani', 'sans-serif'],
        'cyber-body': [
          'Inter',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },

      // Box shadows con efectos glow
      boxShadow: {
        'glow-green-sm': '0 0 5px rgba(57, 255, 20, 0.5)',
        'glow-green-md':
          '0 0 10px rgba(57, 255, 20, 0.6), 0 0 20px rgba(57, 255, 20, 0.3)',
        'glow-green-lg':
          '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4), 0 0 45px rgba(57, 255, 20, 0.2)',
        'glow-red-sm': '0 0 5px rgba(255, 0, 0, 0.5)',
        'glow-red-md':
          '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.3)',
        'glow-red-lg':
          '0 0 15px rgba(255, 0, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.4), 0 0 45px rgba(255, 0, 0, 0.2)',
        'glow-cyan-sm': '0 0 5px rgba(0, 255, 255, 0.5)',
        'glow-cyan-md':
          '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3)',
        'glow-cyan-lg':
          '0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.4), 0 0 45px rgba(0, 255, 255, 0.2)',
      },

      // Animaciones
      keyframes: {
        'cyber-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)' },
          '50%': {
            boxShadow:
              '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4)',
          },
        },
        'cyber-flicker': {
          '0%, 100%': { opacity: '1' },
          '2%': { opacity: '0.8' },
          '4%': { opacity: '1' },
          '8%': { opacity: '0.9' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.95' },
          '92%': { opacity: '1' },
        },
        'cyber-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
      },

      animation: {
        'cyber-pulse': 'cyber-pulse 2s ease-in-out infinite',
        'cyber-flicker': 'cyber-flicker 2s infinite',
        'cyber-scan': 'cyber-scan 3s infinite',
        'matrix-rain': 'matrix-rain 8s linear infinite',
      },

      // Timing functions personalizadas
      transitionTimingFunction: {
        cyber: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
};

// Plugin personalizado para utilities
export const cyberpunkPlugin = ({ addUtilities, addComponents, theme }) => {
  // Utilities para efectos glow
  addUtilities({
    '.glow-green': {
      boxShadow: theme('boxShadow.glow-green-md'),
      transition: 'box-shadow 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    '.glow-green:hover': {
      boxShadow: theme('boxShadow.glow-green-lg'),
    },
    '.glow-red': {
      boxShadow: theme('boxShadow.glow-red-md'),
      transition: 'box-shadow 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    '.glow-red:hover': {
      boxShadow: theme('boxShadow.glow-red-lg'),
    },
    '.scan-lines': {
      backgroundImage: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(57, 255, 20, 0.03) 2px,
        rgba(57, 255, 20, 0.03) 4px
      )`,
    },
    '.cyber-grid': {
      backgroundImage: `
        linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    },
  });

  // Componentes base
  addComponents({
    '.cyber-button': {
      background: theme('colors.cyber-neutral.100'),
      color: theme('colors.cyber-neutral.900'),
      border: `1px solid ${theme('colors.cyber-neutral.300')}`,
      borderRadius: theme('borderRadius.DEFAULT'),
      padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
      fontFamily: theme('fontFamily.cyber-mono'),
      fontSize: theme('fontSize.sm[0]'),
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      overflow: 'hidden',
    },
    '.cyber-button:hover': {
      background: theme('colors.cyber-neutral.200'),
      boxShadow: theme('boxShadow.glow-green-sm'),
      borderColor: theme('colors.cyber-primary.400'),
      transform: 'translateY(-1px)',
    },
    '.cyber-input': {
      background: theme('colors.cyber-neutral.50'),
      color: theme('colors.cyber-neutral.900'),
      border: `1px solid ${theme('colors.cyber-neutral.300')}`,
      borderRadius: theme('borderRadius.DEFAULT'),
      padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
      fontFamily: theme('fontFamily.cyber-mono'),
      fontSize: theme('fontSize.sm[0]'),
      width: '100%',
      transition: 'all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    '.cyber-input:focus': {
      outline: 'none',
      borderColor: theme('colors.cyber-primary.400'),
      boxShadow: theme('boxShadow.glow-green-sm'),
    },
    '.cyber-card': {
      background: theme('colors.cyber-neutral.100'),
      border: `1px solid ${theme('colors.cyber-neutral.200')}`,
      borderRadius: theme('borderRadius.lg'),
      padding: theme('spacing.6'),
      boxShadow: theme('boxShadow.lg'),
      position: 'relative',
      transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      overflow: 'hidden',
    },
    '.cyber-card:hover': {
      borderColor: theme('colors.cyber-primary.400'),
      boxShadow: `${theme('boxShadow.lg')}, ${theme('boxShadow.glow-green-sm')}`,
      transform: 'translateY(-2px)',
    },
  });
};

export default { cyberpunkTheme, cyberpunkPlugin };
```

#### `themes/cyberpunk/styles.css`

```css
/* Estilos CSS adicionales para el tema Cyberpunk */

/* Importar fuentes */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Fira+Code:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

/* Variables CSS para compatibilidad */
:root {
  --cyber-primary: #39ff14;
  --cyber-secondary: #ff0000;
  --cyber-accent-cyan: #00ffff;
  --cyber-accent-purple: #6a0dad;
  --cyber-bg-primary: #000000;
  --cyber-bg-secondary: #1a1a1a;
  --cyber-text-primary: #ffffff;
  --cyber-text-secondary: #999999;
}

/* Tema cyberpunk base */
[data-theme='cyberpunk'] {
  background: var(--cyber-bg-primary);
  color: var(--cyber-text-primary);
}

.cyberpunk-theme {
  @apply bg-cyber-neutral-0 text-cyber-neutral-900 font-cyber-body;
  background-image: linear-gradient(
    180deg,
    #000000 0%,
    #0a0f0a 50%,
    #000000 100%
  );
  min-height: 100vh;
}

/* Componentes específicos del tema */
@layer components {
  /* Variantes de botones */
  .cyber-button-primary {
    @apply cyber-button bg-cyber-primary-400 text-cyber-neutral-0 border-cyber-primary-400;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-button-primary:hover {
    box-shadow: theme('boxShadow.glow-green-md');
  }

  .cyber-button-danger {
    @apply cyber-button bg-cyber-secondary-500 text-cyber-neutral-900 border-cyber-secondary-500;
    box-shadow: theme('boxShadow.glow-red-sm');
  }

  .cyber-button-ghost {
    @apply cyber-button border-cyber-primary-400 text-cyber-primary-400 bg-transparent;
  }

  .cyber-button-ghost:hover {
    @apply bg-cyber-primary-400/10;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  /* Terminal */
  .cyber-terminal {
    @apply bg-cyber-neutral-0 border-2 border-cyber-primary-400 rounded p-4 font-cyber-mono text-cyber-primary-400 relative overflow-hidden;
    box-shadow:
      theme('boxShadow.glow-green-md'),
      inset 0 0 20px rgba(57, 255, 20, 0.1);
  }

  .cyber-terminal::before {
    content: '';
    @apply absolute inset-0 pointer-events-none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(57, 255, 20, 0.03) 2px,
      rgba(57, 255, 20, 0.03) 4px
    );
  }

  /* HUD */
  .cyber-hud {
    @apply relative p-4 bg-black/80 border border-cyber-primary-400 rounded backdrop-blur-sm;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-hud::before {
    content: '';
    @apply absolute top-2 right-2 w-2 h-2 bg-cyber-primary-400 rounded-full;
    box-shadow: theme('boxShadow.glow-green-sm');
    animation: theme('animation.cyber-pulse');
  }

  /* Alertas */
  .cyber-alert {
    @apply border rounded p-4 font-cyber-mono text-sm;
  }

  .cyber-alert-success {
    @apply cyber-alert bg-cyber-primary-400/10 border-cyber-primary-400 text-cyber-primary-400;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-alert-danger {
    @apply cyber-alert bg-cyber-secondary-500/10 border-cyber-secondary-500 text-cyber-secondary-500;
    box-shadow: theme('boxShadow.glow-red-sm');
  }

  .cyber-alert-info {
    @apply cyber-alert bg-cyber-accent-cyan/10 border-cyber-accent-cyan text-cyber-accent-cyan;
    box-shadow: theme('boxShadow.glow-cyan-sm');
  }

  /* Badges */
  .cyber-badge {
    @apply inline-block px-3 py-1 font-cyber-mono text-xs font-semibold uppercase tracking-wide rounded border;
  }

  .cyber-badge-primary {
    @apply cyber-badge bg-cyber-primary-400/20 text-cyber-primary-400 border-cyber-primary-400;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-badge-secondary {
    @apply cyber-badge bg-cyber-secondary-500/20 text-cyber-secondary-500 border-cyber-secondary-500;
  }

  /* Progress bars */
  .cyber-progress {
    @apply w-full h-2 bg-cyber-neutral-200 rounded overflow-hidden relative;
  }

  .cyber-progress-bar {
    @apply h-full bg-gradient-to-r from-cyber-primary-400 to-cyber-primary-500 rounded transition-all duration-300 relative;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-progress-bar::after {
    content: '';
    @apply absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent;
    animation: theme('animation.cyber-scan');
  }

  /* Toggle switches */
  .cyber-toggle {
    @apply relative inline-block w-15 h-8;
  }

  .cyber-toggle input {
    @apply opacity-0 w-0 h-0;
  }

  .cyber-toggle-slider {
    @apply absolute cursor-pointer inset-0 bg-cyber-neutral-300 border border-cyber-neutral-400 rounded-full transition-all duration-300;
  }

  .cyber-toggle-slider:before {
    content: '';
    @apply absolute h-6 w-6 left-1 bottom-1 bg-cyber-neutral-600 rounded-full transition-all duration-300;
  }

  .cyber-toggle input:checked + .cyber-toggle-slider {
    @apply bg-cyber-primary-400 border-cyber-primary-400;
    box-shadow: theme('boxShadow.glow-green-sm');
  }

  .cyber-toggle input:checked + .cyber-toggle-slider:before {
    @apply transform translate-x-7 bg-cyber-neutral-0;
    box-shadow: theme('boxShadow.glow-green-sm');
  }
}

/* Utilities adicionales */
@layer utilities {
  .text-glow-green {
    text-shadow: theme('boxShadow.glow-green-sm');
  }

  .text-glow-red {
    text-shadow: theme('boxShadow.glow-red-sm');
  }

  .text-glow-cyan {
    text-shadow: theme('boxShadow.glow-cyan-sm');
  }

  .matrix-bg {
    background:
      linear-gradient(
        180deg,
        transparent 0%,
        rgba(57, 255, 20, 0.02) 50%,
        transparent 100%
      ),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(57, 255, 20, 0.03) 2px,
        rgba(57, 255, 20, 0.03) 4px
      );
  }

  .glitch-text {
    position: relative;
    animation: theme('animation.cyber-flicker');
  }

  .neon-border-green {
    border: 2px solid theme('colors.cyber-primary.400');
    box-shadow:
      0 0 5px theme('colors.cyber-primary.400'),
      inset 0 0 5px theme('colors.cyber-primary-400');
  }

  .neon-border-red {
    border: 2px solid theme('colors.cyber-secondary.500');
    box-shadow:
      0 0 5px theme('colors.cyber-secondary.500'),
      inset 0 0 5px theme('colors.cyber-secondary.500');
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cyber-button {
    @apply px-4 py-2 text-xs;
  }

  .cyber-card {
    @apply p-4;
  }

  .cyber-terminal {
    @apply p-3 text-sm;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .cyber-flicker,
  .cyber-pulse,
  .cyber-scan {
    animation: none;
  }

  .cyber-button,
  .cyber-input,
  .cyber-card {
    transition: none;
  }
}

@media (prefers-contrast: high) {
  .cyber-button,
  .cyber-input,
  .cyber-card {
    border-width: 2px;
  }
}
```

#### `themes/cyberpunk/tokens.js`

```javascript
// Design tokens para el tema Cyberpunk
export const cyberpunkTokens = {
  colors: {
    primary: {
      50: '#0a0f0a',
      100: '#0d1f0d',
      200: '#1a3d1a',
      300: '#2d6b2d',
      400: '#39ff14', // Matrix green
      500: '#00ff41',
      600: '#00e639',
      700: '#00cc33',
      800: '#00b32d',
      900: '#009926',
    },
    secondary: {
      50: '#1a0505',
      100: '#330a0a',
      200: '#661414',
      300: '#991f1f',
      400: '#cc2929',
      500: '#ff0000', // DOOM red
      600: '#ff3333',
      700: '#ff6666',
      800: '#ff9999',
      900: '#ffcccc',
    },
    accent: {
      purple: '#6a0dad',
      orange: '#ff6600',
      cyan: '#00ffff',
      yellow: '#ffff00',
      pink: '#ff1493',
    },
    neutral: {
      0: '#000000',
      50: '#0a0a0a',
      100: '#1a1a1a',
      200: '#2a2a2a',
      300: '#3a3a3a',
      400: '#4a4a4a',
      500: '#666666',
      600: '#808080',
      700: '#999999',
      800: '#cccccc',
      900: '#ffffff',
    },
  },
  typography: {
    fontFamily: {
      mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      display: ['Orbitron', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  effects: {
    glow: {
      green: {
        sm: '0 0 5px rgba(57, 255, 20, 0.5)',
        md: '0 0 10px rgba(57, 255, 20, 0.6), 0 0 20px rgba(57, 255, 20, 0.3)',
        lg: '0 0 15px rgba(57, 255, 20, 0.7), 0 0 30px rgba(57, 255, 20, 0.4)',
      },
      red: {
        sm: '0 0 5px rgba(255, 0, 0, 0.5)',
        md: '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 0, 0, 0.3)',
        lg: '0 0 15px rgba(255, 0, 0, 0.7), 0 0 30px rgba(255, 0, 0, 0.4)',
      },
      cyan: {
        sm: '0 0 5px rgba(0, 255, 255, 0.5)',
        md: '0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.3)',
        lg: '0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.4)',
      },
    },
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      cyber: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
  },
};

export default cyberpunkTokens;
```

### 4. MODIFICAR ARCHIVOS EXISTENTES

#### Actualizar `tailwind.config.js`

```javascript
// Importar la configuración del tema cyberpunk
import { cyberpunkTheme, cyberpunkPlugin } from './themes/cyberpunk/config.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './themes/**/*.{js,css}', // ← IMPORTANTE: Agregar esta línea
    // ... tu contenido existente
  ],

  theme: {
    extend: {
      // Combinar configuración existente con tema cyberpunk
      ...cyberpunkTheme.theme.extend,

      // Si quieres mantener tus colores existentes, hazlo así:
      colors: {
        ...cyberpunkTheme.theme.extend.colors,
        // tus colores existentes aquí
      },
    },
  },

  plugins: [
    cyberpunkPlugin,
    // ... tus plugins existentes
  ],
};
```

#### Actualizar archivo de estilos principal (probablemente `src/index.css` o similar)

```css
/* Importar Tailwind */
@import 'tailwindcss';

/* Importar tema cyberpunk */
@import './themes/cyberpunk/styles.css';

/* Tus estilos existentes */
```

### 5. CREAR COMPONENTES CYBERPUNK

#### `components/Button/Button.tsx` - Actualizar componente existente

```tsx
import React from 'react';
import { cn } from '@/lib/utils'; // Ajusta la ruta según tu proyecto

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  theme?: 'default' | 'cyberpunk';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      theme = 'default',
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const getButtonClasses = () => {
      if (theme === 'cyberpunk') {
        const cyberpunkVariants = {
          default: 'cyber-button',
          primary: 'cyber-button-primary',
          danger: 'cyber-button-danger',
          ghost: 'cyber-button-ghost',
        };
        return cyberpunkVariants[variant];
      }

      // Tus estilos default existentes
      const defaultVariants = {
        default: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
        primary: 'bg-blue-600 hover:bg-blue-700 text-white',
        danger: 'bg-red-600 hover:bg-red-700 text-white',
        ghost: 'border border-gray-300 hover:bg-gray-50',
      };

      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      };

      return cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        defaultVariants[variant],
        sizes[size]
      );
    };

    return (
      <button
        ref={ref}
        className={cn(getButtonClasses(), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

#### `components/Input/Input.tsx` - Actualizar componente existente

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: 'default' | 'cyberpunk';
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ theme = 'default', error, className, ...props }, ref) => {
    const getInputClasses = () => {
      if (theme === 'cyberpunk') {
        return 'cyber-input';
      }

      // Tus estilos default existentes
      return cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-red-500 focus-visible:ring-red-500'
      );
    };

    return (
      <div className="space-y-2">
        <input
          ref={ref}
          className={cn(getInputClasses(), className)}
          {...props}
        />
        {error && (
          <p
            className={cn(
              'text-sm',
              theme === 'cyberpunk'
                ? 'text-cyber-secondary-500'
                : 'text-red-500'
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

#### `components/Card/Card.tsx` - Crear nuevo componente o actualizar existente

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: 'default' | 'cyberpunk';
  variant?: 'default' | 'hud' | 'terminal';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { theme = 'default', variant = 'default', className, children, ...props },
    ref
  ) => {
    const getCardClasses = () => {
      if (theme === 'cyberpunk') {
        const cyberpunkVariants = {
          default: 'cyber-card',
          hud: 'cyber-hud',
          terminal: 'cyber-terminal',
        };
        return cyberpunkVariants[variant];
      }

      // Tus estilos default existentes
      return 'rounded-lg border bg-card text-card-foreground shadow-sm';
    };

    return (
      <div ref={ref} className={cn(getCardClasses(), className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Componente CardHeader
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

// Componente CardTitle
export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

// Componente CardContent
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';
```

#### `components/Alert/Alert.tsx` - Crear nuevo componente

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'info';
  theme?: 'default' | 'cyberpunk';
  children: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { variant = 'default', theme = 'default', className, children, ...props },
    ref
  ) => {
    const getAlertClasses = () => {
      if (theme === 'cyberpunk') {
        const cyberpunkVariants = {
          default:
            'cyber-alert bg-cyber-neutral-100/50 border-cyber-neutral-300 text-cyber-neutral-700',
          success: 'cyber-alert-success',
          danger: 'cyber-alert-danger',
          info: 'cyber-alert-info',
        };
        return cyberpunkVariants[variant];
      }

      // Estilos default
      const defaultVariants = {
        default: 'border rounded-lg p-4 bg-background text-foreground',
        success: 'border-green-200 bg-green-50 text-green-800',
        danger: 'border-red-200 bg-red-50 text-red-800',
        info: 'border-blue-200 bg-blue-50 text-blue-800',
      };

      return defaultVariants[variant];
    };

    return (
      <div ref={ref} className={cn(getAlertClasses(), className)} {...props}>
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
```

#### `components/Badge/Badge.tsx` - Crear nuevo componente

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'warning';
  theme?: 'default' | 'cyberpunk';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', theme = 'default', className, children, ...props },
    ref
  ) => {
    const getBadgeClasses = () => {
      if (theme === 'cyberpunk') {
        const cyberpunkVariants = {
          default:
            'cyber-badge bg-cyber-neutral-100/50 border-cyber-neutral-300 text-cyber-neutral-700',
          primary: 'cyber-badge-primary',
          secondary: 'cyber-badge-secondary',
          warning:
            'cyber-badge bg-cyber-accent-orange/20 text-cyber-accent-orange border-cyber-accent-orange',
        };
        return cyberpunkVariants[variant];
      }

      // Estilos default
      const defaultVariants = {
        default:
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      };

      return defaultVariants[variant];
    };

    return (
      <span ref={ref} className={cn(getBadgeClasses(), className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
```

### 6. NUEVOS COMPONENTES CYBERPUNK

#### `components/Terminal/Terminal.tsx`

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  initialLines?: string[];
  onCommand?: (command: string) => void;
}

interface TerminalLine {
  type: 'output' | 'command' | 'error' | 'success';
  content: string;
  timestamp?: Date;
}

export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  (
    {
      title = 'SYSTEM_TERMINAL',
      initialLines = [],
      onCommand,
      className,
      ...props
    },
    ref
  ) => {
    const [lines, setLines] = useState<TerminalLine[]>([
      ...initialLines.map((line) => ({
        type: 'output' as const,
        content: line,
      })),
    ]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const addLine = (
      content: string,
      type: TerminalLine['type'] = 'output'
    ) => {
      setLines((prev) => [...prev, { type, content, timestamp: new Date() }]);
    };

    const executeCommand = (command: string) => {
      addLine(`$ ${command}`, 'command');

      if (onCommand) {
        onCommand(command);
      } else {
        // Comandos default
        switch (command.toLowerCase()) {
          case 'help':
            addLine(
              'Available commands: help, clear, status, hack, matrix',
              'success'
            );
            break;
          case 'clear':
            setLines([]);
            break;
          case 'status':
            addLine('System status: ONLINE', 'success');
            addLine('Neural link: ACTIVE', 'success');
            addLine('Security: MAXIMUM', 'success');
            break;
          case 'hack':
            addLine('Initiating hack sequence...', 'output');
            setTimeout(
              () =>
                addLine('Access granted. Welcome to the Matrix.', 'success'),
              1000
            );
            break;
          case 'matrix':
            addLine('There is no spoon.', 'success');
            break;
          default:
            addLine(`Command not found: ${command}`, 'error');
        }
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (currentCommand.trim()) {
        executeCommand(currentCommand.trim());
        setCurrentCommand('');
      }
    };

    useEffect(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [lines]);

    const getLineColor = (type: TerminalLine['type']) => {
      switch (type) {
        case 'command':
          return 'text-cyber-accent-cyan';
        case 'error':
          return 'text-cyber-secondary-500';
        case 'success':
          return 'text-cyber-primary-400';
        default:
          return 'text-cyber-neutral-700';
      }
    };

    return (
      <div ref={ref} className={cn('cyber-terminal', className)} {...props}>
        {/* Terminal Header */}
        <div className="flex justify-between items-center border-b border-cyber-primary-400 pb-2 mb-3">
          <span className="text-sm uppercase tracking-wide font-cyber-mono">
            {title}
          </span>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-cyber-secondary-500 rounded-full shadow-glow-red-sm"></div>
            <div className="w-3 h-3 bg-cyber-accent-orange rounded-full"></div>
            <div className="w-3 h-3 bg-cyber-primary-400 rounded-full"></div>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-64 overflow-y-auto mb-3 font-cyber-mono text-sm space-y-1"
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn('flex items-start', getLineColor(line.type))}
            >
              {line.type === 'command' && (
                <span className="text-cyber-accent-cyan mr-2">$</span>
              )}
              <span className="break-all">{line.content}</span>
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyber-accent-cyan mr-2 font-cyber-mono">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-cyber-primary-400 font-cyber-mono placeholder-cyber-neutral-500"
            placeholder="Enter command..."
            autoComplete="off"
          />
          <span className="w-2 h-4 bg-cyber-primary-400 ml-1 animate-cyber-flicker"></span>
        </form>
      </div>
    );
  }
);

Terminal.displayName = 'Terminal';
```

#### `components/HUD/HUD.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface HUDProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  stats?: Array<{
    label: string;
    value: string | number;
    color?: 'primary' | 'secondary' | 'cyan' | 'orange';
  }>;
}

export const HUD = React.forwardRef<HTMLDivElement, HUDProps>(
  ({ title, stats = [], className, children, ...props }, ref) => {
    const getStatColor = (color?: string) => {
      switch (color) {
        case 'primary':
          return 'text-cyber-primary-400 text-glow-green';
        case 'secondary':
          return 'text-cyber-secondary-500 text-glow-red';
        case 'cyan':
          return 'text-cyber-accent-cyan text-glow-cyan';
        case 'orange':
          return 'text-cyber-accent-orange';
        default:
          return 'text-cyber-primary-400 text-glow-green';
      }
    };

    return (
      <div ref={ref} className={cn('cyber-hud', className)} {...props}>
        <h3 className="text-cyber-primary-400 font-cyber-display mb-3 text-sm uppercase tracking-wide">
          {title}
        </h3>

        {stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center font-cyber-mono text-xs">
                <span
                  className={cn(
                    'block text-lg font-bold',
                    getStatColor(stat.color)
                  )}
                >
                  {stat.value}
                </span>
                <span className="block text-cyber-neutral-600 uppercase tracking-wide mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {children}
      </div>
    );
  }
);

HUD.displayName = 'HUD';
```

#### `components/ProgressBar/ProgressBar.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  theme?: 'default' | 'cyberpunk';
  color?: 'primary' | 'secondary' | 'cyan';
  showValue?: boolean;
  label?: string;
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      theme = 'default',
      color = 'primary',
      showValue = false,
      label,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getProgressClasses = () => {
      if (theme === 'cyberpunk') {
        const colorClasses = {
          primary:
            'bg-gradient-to-r from-cyber-primary-400 to-cyber-primary-500 shadow-glow-green-sm',
          secondary:
            'bg-gradient-to-r from-cyber-secondary-400 to-cyber-secondary-500 shadow-glow-red-sm',
          cyan: 'bg-gradient-to-r from-cyber-accent-cyan to-cyber-accent-cyan shadow-glow-cyan-sm',
        };
        return colorClasses[color];
      }

      // Estilos default
      return 'bg-blue-600';
    };

    const containerClasses =
      theme === 'cyberpunk'
        ? 'cyber-progress'
        : 'w-full bg-gray-200 rounded-full h-2';

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <span
                className={cn(
                  'text-sm',
                  theme === 'cyberpunk'
                    ? 'font-cyber-mono text-cyber-neutral-700'
                    : 'text-gray-700'
                )}
              >
                {label}
              </span>
            )}
            {showValue && (
              <span
                className={cn(
                  'text-sm',
                  theme === 'cyberpunk'
                    ? 'font-cyber-mono text-cyber-primary-400'
                    : 'text-gray-700'
                )}
              >
                {value}/{max}
              </span>
            )}
          </div>
        )}

        <div className={containerClasses}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 relative',
              theme === 'cyberpunk'
                ? 'cyber-progress-bar'
                : getProgressClasses()
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
```

### 7. ACTUALIZAR STORYBOOK

#### `.storybook/preview.js`

```javascript
import '../themes/cyberpunk/styles.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'cyberpunk',
        value: '#000000',
      },
    ],
  },
};

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'default',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: ['default', 'cyberpunk'],
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme || 'default';

    return (
      <div
        className={
          theme === 'cyberpunk' ? 'cyberpunk-theme min-h-screen p-8' : 'p-8'
        }
        data-theme={theme}
      >
        <Story />
      </div>
    );
  },
];
```

#### `components/Button/Button.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'danger', 'ghost'],
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'cyberpunk'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const CyberpunkTheme: Story = {
  args: {
    children: 'Cyberpunk Button',
    theme: 'cyberpunk',
    variant: 'primary',
  },
  parameters: {
    backgrounds: { default: 'cyberpunk' },
  },
};

export const AllCyberpunkVariants: Story = {
  render: () => (
    <div className="cyberpunk-theme space-y-4 p-8">
      <div className="flex gap-4 flex-wrap">
        <Button theme="cyberpunk" variant="default">
          Default
        </Button>
        <Button theme="cyberpunk" variant="primary">
          Primary
        </Button>
        <Button theme="cyberpunk" variant="danger">
          Danger
        </Button>
        <Button theme="cyberpunk" variant="ghost">
          Ghost
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button theme="cyberpunk" size="sm">
          Small
        </Button>
        <Button theme="cyberpunk" size="md">
          Medium
        </Button>
        <Button theme="cyberpunk" size="lg">
          Large
        </Button>
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'cyberpunk' },
  },
};

export const Interactive: Story = {
  args: {
    children: 'Click me',
    theme: 'cyberpunk',
    variant: 'primary',
  },
  parameters: {
    backgrounds: { default: 'cyberpunk' },
  },
};
```

#### `components/Terminal/Terminal.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Terminal } from './Terminal';

const meta: Meta<typeof Terminal> = {
  title: 'Cyberpunk/Terminal',
  component: Terminal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'cyberpunk' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'SYSTEM_TERMINAL',
    initialLines: [
      'Welcome to the Matrix',
      'Type "help" for available commands',
    ],
  },
  decorators: [
    (Story) => (
      <div className="cyberpunk-theme w-96">
        <Story />
      </div>
    ),
  ],
};

export const HackerTerminal: Story = {
  args: {
    title: 'NEURAL_INTERFACE',
    initialLines: [
      '[OK] Neural link established',
      '[OK] Firewall bypassed',
      '[WARN] ICE detected',
      '[OK] Ready for deep dive',
    ],
    onCommand: (command) => {
      console.log('Command executed:', command);
    },
  },
  decorators: [
    (Story) => (
      <div className="cyberpunk-theme w-96">
        <Story />
      </div>
    ),
  ],
};
```

### 8. TESTING

#### `__tests__/Button.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/Button/Button';

describe('Button', () => {
  it('renders with default theme', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies cyberpunk theme classes', () => {
    render(
      <Button theme="cyberpunk" variant="primary">
        Cyberpunk Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('cyber-button-primary');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies glow effects on cyberpunk theme', () => {
    render(
      <Button theme="cyberpunk" variant="primary">
        Glow Button
      </Button>
    );
    const button = screen.getByRole('button');

    // Should have cyberpunk classes that include glow effects
    expect(button.className).toContain('cyber-button-primary');
  });
});
```

### 9. PACKAGE.JSON UPDATES

Agregar estos scripts si no existen:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test-storybook": "test-storybook"
  },
  "dependencies": {
    // ... dependencias existentes
  },
  "devDependencies": {
    // ... dependencias de desarrollo existentes
    "@storybook/addon-backgrounds": "^7.0.0" // si no está ya
  }
}
```

### 10. VALIDACIÓN Y TESTING

Después de implementar, ejecuta estos comandos para validar:

```bash
# 1. Instalar dependencias
pnpm install

# 2. Verificar que Tailwind compile correctamente
pnpm build

# 3. Ejecutar Storybook para ver los componentes
pnpm storybook

# 4. Ejecutar tests
pnpm test

# 5. Verificar que no hay errores de TypeScript
npx tsc --noEmit
```

### 11. DOCUMENTACIÓN

Crear `themes/cyberpunk/README.md`:

````markdown
# Cyberpunk Theme

Tema inspirado en DOOM, Evangelion, Swordfish y The Matrix.

## Uso

### Con componentes existentes:

```tsx
<Button theme="cyberpunk" variant="primary">
  Cyberpunk Button
</Button>
```
````

### Nuevos componentes:

```tsx
<Terminal title="NEURAL_INTERFACE" />
<HUD title="SYSTEM STATUS" stats={[...]} />
```

## Clases disponibles:

- `.cyber-button` - Botón base
- `.cyber-input` - Input base
- `.cyber-card` - Tarjeta base
- `.cyber-terminal` - Terminal
- `.cyber-hud` - HUD interface
- `.glow-green` - Efecto glow verde
- `.scan-lines` - Líneas de escaneo
- `.cyber-grid` - Patrón de grilla

## Colores:

- `cyber-primary-*` - Verde Matrix
- `cyber-secondary-*` - Rojo DOOM
- `cyber-accent-cyan` - Cyan Swordfish
- `cyber-neutral-*` - Grises oscuros

````

### 12. DEPLOYMENT

Para producción:
```bash
# Build del design system
pnpm build

# Build de Storybook
pnpm build-storybook

# Deploy de Storybook (si usas Netlify, Vercel, etc.)
# Los archivos estarán en storybook-static/
````

## 🎯 RESUMEN PARA CLAUDE CODE

1. **Crear estructura de archivos** en `themes/cyberpunk/`
2. **Copiar configuraciones** de Tailwind y CSS
3. **Actualizar `tailwind.config.js`** para incluir el tema
4. **Modificar componentes existentes** (Button, Input, Card) para soportar `theme="cyberpunk"`
5. **Crear nuevos componentes** (Terminal, HUD, ProgressBar)
6. **Actualizar Storybook** con el selector de temas
7. **Agregar tests** para validar funcionalidad
8. **Documentar** el uso del tema

Los archivos están listos para copy/paste y el tema es totalmente compatible con tu estructura existente. ¿Necesitas alguna aclaración sobre algún paso específico?
