# Guía de Implementación: Tema Atmosférico Biomecánico

## 📋 Resumen del Proyecto

Este documento describe la implementación completa del tema "Atmosférico Biomecánico" en el design system `christianLB/design-system`. El tema está inspirado en la estética de H.R. Giger, enfocándose en crear una experiencia inmersiva que evoca la sensación de habitar dentro de una estructura viviente.

## 🎯 Objetivos

1. **Integrar** el nuevo tema manteniendo la arquitectura existente
2. **Preservar** la compatibilidad con componentes actuales
3. **Añadir** efectos atmosféricos sin comprometer el rendimiento
4. **Documentar** el tema en Storybook con ejemplos interactivos

## 📁 Estructura de Archivos a Crear/Modificar

```
design-system/
├── lib/
│   ├── tokens/
│   │   ├── atmospheric.ts           # ← NUEVO: Tokens del tema atmosférico
│   │   ├── index.ts                 # ← MODIFICAR: Exportar nuevo tema
│   │   └── themes.ts                # ← MODIFICAR: Añadir tema a lista
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx           # ← MODIFICAR: Soporte para variantes atmosféricas
│   │   │   └── Button.stories.tsx   # ← MODIFICAR: Historias del tema
│   │   └── Card/
│   │       ├── Card.tsx             # ← NUEVO: Componente Card atmosférico
│   │       └── Card.stories.tsx     # ← NUEVO: Historias de Card
│   └── styles/
│       ├── atmospheric.css          # ← NUEVO: Estilos y animaciones
│       └── index.css                # ← MODIFICAR: Importar nuevos estilos
├── docs/
│   └── atmospheric-theme.md         # ← NUEVO: Documentación del tema
└── .storybook/
    └── preview.ts                   # ← MODIFICAR: Añadir tema a selector
```

## 🎨 1. Tokens del Tema Atmosférico

### Archivo: `lib/tokens/atmospheric.ts`

```typescript
export const atmosphericTokens = {
  colors: {
    // Primarios - Estructura Interna
    primary: {
      50: '#fafbfc', // Hueso blanqueado
      100: '#f2f4f6', // Cartílago pálido
      200: '#e3e7eb', // Piel interior
      300: '#cbd3db', // Tejido conectivo
      400: '#9ba8b7', // Vena profunda
      500: '#708090', // Acero orgánico (base)
      600: '#5d6b7a', // Músculo dormido
      700: '#4a5560', // Órgano interno
      800: '#3c4349', // Cavidad torácica
      900: '#2c3034', // Médula ósea
      950: '#1a1d20', // Vacío interno
    },

    // Neutros - Habitáculo Viviente
    neutral: {
      50: '#fbfcfc', // Superficie externa
      100: '#f6f7f8', // Epidermis
      200: '#eaebec', // Dermis
      300: '#d8dbde', // Tejido subcutáneo
      400: '#a8aeb5', // Fluido intersticial
      500: '#6b7280', // Sangre antigua (base)
      600: '#565d67', // Vena colapsada
      700: '#454a52', // Órgano en reposo
      800: '#323740', // Cavidad abdominal
      900: '#1f2328', // Útero mecánico
      950: '#0d1117', // Vacío primordial
    },

    // Acentos - Elementos Vitales
    accent: {
      50: '#fef8f3', // Resplandor vital
      100: '#fdeee3', // Calor corporal
      200: '#fad8c0', // Circulación activa
      300: '#f6bb93', // Pulso arterial
      400: '#f19066', // Latido cardíaco
      500: '#e56e47', // Vida pulsante (base)
      600: '#d4552f', // Adrenalina
      700: '#b13f26', // Sangre oxigenada
      800: '#8f3520', // Hierro en sangre
      900: '#752d1b', // Coágulo
      950: '#3d1509', // Sangre seca
    },

    // Sistema Semántico
    background: '#0d1117',
    'surface-cavity': '#1f2328',
    'surface-organ': '#323740',
    'surface-tissue': '#454a52',
    'surface-membrane': '#565d67',
    border: '#6b7280',
    'border-vessel': '#a8aeb5',
    'border-bone': '#d8dbde',
    text: '#f6f7f8',
    'text-muted': '#a8aeb5',
    'text-vital': '#e56e47',
    'text-ghost': '#6b7280',
  },

  typography: {
    fontFamily: {
      sans: ['Inter', '-apple-system', 'system-ui'],
      mono: ['SF Mono', 'Consolas', 'Liberation Mono'],
      organic: ['Crimson Text', 'Georgia', 'serif'],
      neural: ['Space Mono', 'Courier New', 'monospace'],
    },
    fontSize: {
      whisper: '0.625rem', // Susurro neural
      pulse: '0.75rem', // Pulso vital
      breath: '0.875rem', // Respiración
      heartbeat: '1rem', // Latido base
      circulation: '1.125rem', // Circulación
      respiration: '1.25rem', // Respiración profunda
      consciousness: '1.5rem', // Consciencia
      awakening: '1.875rem', // Despertar
      transcendence: '2.25rem', // Trascendencia
    },
    lineHeight: {
      compressed: '1.2',
      natural: '1.5',
      expanded: '1.8',
    },
  },

  spacing: {
    synapse: '0.125rem', // Espacio sináptico
    membrane: '0.25rem', // Grosor de membrana
    vessel: '0.5rem', // Ancho vascular
    organ: '1rem', // Separación orgánica
    cavity: '1.5rem', // Espacio de cavidad
    chamber: '2rem', // Cámara corporal
    system: '3rem', // Sistema completo
    organism: '4rem', // Organismo entero
  },

  borderRadius: {
    cell: '0.125rem',
    vessel: '0.25rem 0.5rem',
    organ: '0.375rem 0.75rem 0.25rem 0.625rem',
    cavity: '0.5rem 1rem 0.375rem 0.875rem',
    organism: '50%',
  },

  shadows: {
    membrane:
      '0 1px 3px rgba(13, 17, 23, 0.8), inset 0 1px 0 rgba(246, 247, 248, 0.03)',
    organ:
      '0 4px 12px rgba(13, 17, 23, 0.9), inset 0 1px 0 rgba(246, 247, 248, 0.05)',
    cavity:
      '0 8px 24px rgba(13, 17, 23, 0.95), inset 0 2px 4px rgba(13, 17, 23, 0.8)',
    vessel:
      '0 2px 8px rgba(229, 110, 71, 0.1), inset 0 1px 2px rgba(13, 17, 23, 0.6)',
    pulse: '0 0 20px rgba(229, 110, 71, 0.2), 0 0 40px rgba(229, 110, 71, 0.1)',
    neural:
      'inset 0 2px 8px rgba(13, 17, 23, 0.9), 0 1px 0 rgba(246, 247, 248, 0.02)',
  },

  gradients: {
    membrane:
      'linear-gradient(135deg, rgba(50, 55, 64, 0.8) 0%, rgba(31, 35, 40, 0.9) 50%, rgba(13, 17, 23, 1) 100%)',
    vessel:
      'radial-gradient(ellipse at center, rgba(69, 74, 82, 0.6) 0%, rgba(50, 55, 64, 0.8) 40%, rgba(31, 35, 40, 0.95) 100%)',
    organ:
      'conic-gradient(from 45deg, rgba(31, 35, 40, 1) 0deg, rgba(50, 55, 64, 0.9) 120deg, rgba(69, 74, 82, 0.7) 240deg, rgba(31, 35, 40, 1) 360deg)',
    circulation:
      'linear-gradient(90deg, transparent 0%, rgba(229, 110, 71, 0.1) 30%, rgba(229, 110, 71, 0.2) 50%, rgba(229, 110, 71, 0.1) 70%, transparent 100%)',
    neural:
      'radial-gradient(circle at 30% 70%, rgba(107, 114, 128, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(168, 174, 181, 0.05) 0%, transparent 50%)',
  },

  animations: {
    breathe: 'breathe 4s ease-in-out infinite',
    circulation: 'flow 8s linear infinite',
    neural: 'synaptic 2s ease-in-out infinite alternate',
    pulse: 'pulse 3s ease-in-out infinite',
  },
};

export type AtmosphericTokens = typeof atmosphericTokens;
```

## 🎬 2. Animaciones CSS

### Archivo: `lib/styles/atmospheric.css`

```css
/* Animaciones Atmosféricas - Tema Biomecánico */

@keyframes breathe {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.005);
  }
}

@keyframes flow {
  0% {
    transform: translateX(-100%) scaleX(0.5);
    opacity: 0;
  }
  50% {
    transform: translateX(0%) scaleX(1);
    opacity: 0.8;
  }
  100% {
    transform: translateX(100%) scaleX(0.5);
    opacity: 0;
  }
}

@keyframes synaptic {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(229, 110, 71, 0.2);
  }
  50% {
    box-shadow:
      0 0 20px rgba(229, 110, 71, 0.4),
      0 0 30px rgba(229, 110, 71, 0.2);
  }
}

/* Clases Utilitarias Atmosféricas */

.atmospheric-breathe {
  animation: breathe 4s ease-in-out infinite;
}

.atmospheric-flow {
  animation: flow 8s linear infinite;
}

.atmospheric-neural {
  animation: synaptic 2s ease-in-out infinite alternate;
}

.atmospheric-pulse {
  animation: pulse 3s ease-in-out infinite;
}

/* Gradientes Atmosféricos */

.atmospheric-membrane {
  background: linear-gradient(
    135deg,
    rgba(50, 55, 64, 0.8) 0%,
    rgba(31, 35, 40, 0.9) 50%,
    rgba(13, 17, 23, 1) 100%
  );
}

.atmospheric-vessel {
  background: radial-gradient(
    ellipse at center,
    rgba(69, 74, 82, 0.6) 0%,
    rgba(50, 55, 64, 0.8) 40%,
    rgba(31, 35, 40, 0.95) 100%
  );
}

.atmospheric-organ {
  background: conic-gradient(
    from 45deg,
    rgba(31, 35, 40, 1) 0deg,
    rgba(50, 55, 64, 0.9) 120deg,
    rgba(69, 74, 82, 0.7) 240deg,
    rgba(31, 35, 40, 1) 360deg
  );
}

/* Bordes Orgánicos */

.atmospheric-border-cell {
  border-radius: 0.125rem;
}

.atmospheric-border-vessel {
  border-radius: 0.25rem 0.5rem;
}

.atmospheric-border-organ {
  border-radius: 0.375rem 0.75rem 0.25rem 0.625rem;
}

.atmospheric-border-cavity {
  border-radius: 0.5rem 1rem 0.375rem 0.875rem;
}

/* Efectos de Profundidad */

.atmospheric-depth-membrane {
  box-shadow:
    0 1px 3px rgba(13, 17, 23, 0.8),
    inset 0 1px 0 rgba(246, 247, 248, 0.03);
}

.atmospheric-depth-organ {
  box-shadow:
    0 4px 12px rgba(13, 17, 23, 0.9),
    inset 0 1px 0 rgba(246, 247, 248, 0.05);
}

.atmospheric-depth-cavity {
  box-shadow:
    0 8px 24px rgba(13, 17, 23, 0.95),
    inset 0 2px 4px rgba(13, 17, 23, 0.8);
}

/* Tema Base */

.theme-atmospheric {
  background: #0d1117;
  color: #f6f7f8;
  font-family:
    'Inter',
    -apple-system,
    system-ui,
    sans-serif;
}

.theme-atmospheric * {
  transition: all 0.2s ease;
}

/* Estados Vitales */

.vital-element {
  position: relative;
}

.vital-element::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(229, 110, 71, 0.05) 30%,
    rgba(229, 110, 71, 0.1) 50%,
    rgba(229, 110, 71, 0.05) 70%,
    transparent 100%
  );
  opacity: 0;
  animation: flow 6s ease-in-out infinite;
  pointer-events: none;
  border-radius: inherit;
}

.vital-element.active::before {
  opacity: 1;
}

/* Efectos de Hover Atmosféricos */

.atmospheric-interactive:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow:
    0 8px 25px rgba(13, 17, 23, 0.9),
    0 0 15px rgba(229, 110, 71, 0.1);
}

.atmospheric-interactive:active {
  transform: translateY(0) scale(0.99);
}

/* Neural Pathways - Efectos decorativos */

.neural-pathways {
  position: relative;
  overflow: hidden;
}

.neural-pathways::after {
  content: '';
  position: absolute;
  top: 20%;
  left: 10%;
  width: 30%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(107, 114, 128, 0.3),
    transparent
  );
  animation: flow 12s linear infinite;
}

.neural-pathways::before {
  content: '';
  position: absolute;
  bottom: 30%;
  right: 15%;
  width: 1px;
  height: 25%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(107, 114, 128, 0.2),
    transparent
  );
  animation: flow 15s linear infinite reverse;
}
```

## 🧩 3. Modificaciones de Componentes

### Archivo: `lib/components/Button/Button.tsx`

```typescript
import React from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'membrane' | 'vessel' | 'neural' | 'primary' | 'secondary';
  size?: 'whisper' | 'pulse' | 'breath' | 'heartbeat';
  vital?: boolean;
  atmospheric?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'membrane',
    size = 'heartbeat',
    vital = false,
    atmospheric = false,
    children,
    ...props
  }, ref) => {

    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      atmospheric && 'atmospheric-interactive neural-pathways'
    );

    const variants = {
      membrane: cn(
        'atmospheric-membrane atmospheric-border-vessel atmospheric-depth-membrane',
        'border border-neutral-600/60 text-neutral-100',
        'hover:border-neutral-500/70 hover:text-white',
        vital && 'atmospheric-breathe vital-element active'
      ),
      vessel: cn(
        'bg-gradient-to-r from-orange-600/80 to-orange-700/90',
        'atmospheric-border-organ atmospheric-depth-organ',
        'border border-orange-500/60 text-white',
        'hover:border-orange-400/70 hover:shadow-orange-500/20',
        vital && 'atmospheric-pulse vital-element active'
      ),
      neural: cn(
        'atmospheric-vessel atmospheric-border-cell atmospheric-depth-membrane',
        'border border-neutral-600/40 text-neutral-300',
        'hover:border-neutral-500/60 hover:text-neutral-100',
        vital && 'atmospheric-neural'
      ),
      // Mantener variantes existentes para compatibilidad
      primary: 'bg-primary-600 text-white hover:bg-primary-700',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700'
    };

    const sizes = {
      whisper: 'h-7 px-2 text-xs',
      pulse: 'h-8 px-3 text-sm',
      breath: 'h-9 px-4 text-sm',
      heartbeat: 'h-10 px-6 text-base'
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Archivo: `lib/components/Card/Card.tsx` (NUEVO)

```typescript
import React from 'react';
import { cn } from '../../utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'chamber' | 'organ' | 'membrane' | 'cavity';
  vital?: boolean;
  neural?: boolean;
  atmospheric?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'chamber',
    vital = false,
    neural = false,
    atmospheric = false,
    children,
    ...props
  }, ref) => {

    const baseClasses = cn(
      'relative overflow-hidden p-6',
      'border transition-all duration-300',
      atmospheric && 'neural-pathways',
      vital && 'vital-element active',
      neural && 'atmospheric-neural'
    );

    const variants = {
      chamber: cn(
        'atmospheric-membrane atmospheric-border-cavity atmospheric-depth-cavity',
        'border-neutral-700/50 backdrop-blur-sm',
        vital && 'atmospheric-breathe'
      ),
      organ: cn(
        'atmospheric-organ atmospheric-border-organ atmospheric-depth-organ',
        'border-neutral-600/40',
        vital && 'atmospheric-pulse'
      ),
      membrane: cn(
        'atmospheric-vessel atmospheric-border-vessel atmospheric-depth-membrane',
        'border-neutral-600/60',
        vital && 'atmospheric-breathe'
      ),
      cavity: cn(
        'bg-gradient-to-br from-neutral-800/40 via-neutral-900/60 to-neutral-950/80',
        'atmospheric-border-cavity atmospheric-depth-cavity',
        'border-neutral-700/30',
        vital && 'atmospheric-neural'
      )
    };

    return (
      <div
        className={cn(baseClasses, variants[variant], className)}
        ref={ref}
        {...props}
      >
        {/* Membrane effect overlay */}
        {atmospheric && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 20% 30%, rgba(229, 110, 71, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(107, 114, 128, 0.03) 0%, transparent 50%)'
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
```

## 📚 4. Configuración de Storybook

### Archivo: `.storybook/preview.ts` (MODIFICAR)

```typescript
import type { Preview } from '@storybook/react';
import '../lib/styles/index.css';
import '../lib/styles/atmospheric.css'; // ← AÑADIR

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'futuristic', title: 'Futuristic' },
          { value: 'atmospheric', title: 'Atmospheric' }, // ← AÑADIR
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;

      // Aplicar clase de tema
      const themeClasses = {
        light: 'theme-light',
        dark: 'theme-dark',
        futuristic: 'theme-futuristic',
        atmospheric: 'theme-atmospheric' // ← AÑADIR
      };

      return (
        <div className={`min-h-screen p-4 ${themeClasses[theme] || 'theme-light'}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
```

### Archivo: `lib/components/Button/Button.stories.tsx` (MODIFICAR)

```typescript
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
      control: 'select',
      options: ['membrane', 'vessel', 'neural', 'primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['whisper', 'pulse', 'breath', 'heartbeat'],
    },
    vital: {
      control: 'boolean',
    },
    atmospheric: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historias existentes...
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// Nuevas historias atmosféricas
export const Membrane: Story = {
  args: {
    children: 'Membrane Interface',
    variant: 'membrane',
    atmospheric: true,
  },
};

export const Vessel: Story = {
  args: {
    children: 'Vital Function',
    variant: 'vessel',
    vital: true,
    atmospheric: true,
  },
};

export const Neural: Story = {
  args: {
    children: 'Neural Network',
    variant: 'neural',
    atmospheric: true,
  },
};

export const AtmosphericShowcase: Story = {
  render: () => (
    <div className="space-y-4 p-8 theme-atmospheric">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button variant="membrane" atmospheric>
          Membrane
        </Button>
        <Button variant="vessel" vital atmospheric>
          Vital Vessel
        </Button>
        <Button variant="neural" atmospheric>
          Neural Path
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-6">
        <Button variant="membrane" size="whisper" atmospheric>
          Whisper
        </Button>
        <Button variant="vessel" size="pulse" vital atmospheric>
          Pulse
        </Button>
        <Button variant="neural" size="breath" atmospheric>
          Breath
        </Button>
        <Button variant="membrane" size="heartbeat" atmospheric>
          Heartbeat
        </Button>
      </div>
    </div>
  ),
};
```

## 🛠️ 5. Configuración de Tailwind CSS v4

### Archivo: `tailwind.config.js` (MODIFICAR)

```javascript
import { atmosphericTokens } from './lib/tokens/atmospheric';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./lib/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores atmosféricos
        atmospheric: {
          primary: atmosphericTokens.colors.primary,
          neutral: atmosphericTokens.colors.neutral,
          accent: atmosphericTokens.colors.accent,
        },
        // Alias semánticos
        'surface-cavity': atmosphericTokens.colors['surface-cavity'],
        'surface-organ': atmosphericTokens.colors['surface-organ'],
        'surface-tissue': atmosphericTokens.colors['surface-tissue'],
        'text-vital': atmosphericTokens.colors['text-vital'],
        'text-ghost': atmosphericTokens.colors['text-ghost'],
      },
      fontFamily: {
        organic: atmosphericTokens.typography.fontFamily.organic,
        neural: atmosphericTokens.typography.fontFamily.neural,
      },
      fontSize: {
        whisper: atmosphericTokens.typography.fontSize.whisper,
        pulse: atmosphericTokens.typography.fontSize.pulse,
        breath: atmosphericTokens.typography.fontSize.breath,
        heartbeat: atmosphericTokens.typography.fontSize.heartbeat,
        circulation: atmosphericTokens.typography.fontSize.circulation,
        respiration: atmosphericTokens.typography.fontSize.respiration,
        consciousness: atmosphericTokens.typography.fontSize.consciousness,
        awakening: atmosphericTokens.typography.fontSize.awakening,
        transcendence: atmosphericTokens.typography.fontSize.transcendence,
      },
      spacing: {
        synapse: atmosphericTokens.spacing.synapse,
        membrane: atmosphericTokens.spacing.membrane,
        vessel: atmosphericTokens.spacing.vessel,
        organ: atmosphericTokens.spacing.organ,
        cavity: atmosphericTokens.spacing.cavity,
        chamber: atmosphericTokens.spacing.chamber,
        system: atmosphericTokens.spacing.system,
        organism: atmosphericTokens.spacing.organism,
      },
      borderRadius: {
        cell: atmosphericTokens.borderRadius.cell,
        vessel: atmosphericTokens.borderRadius.vessel,
        organ: atmosphericTokens.borderRadius.organ,
        cavity: atmosphericTokens.borderRadius.cavity,
        organism: atmosphericTokens.borderRadius.organism,
      },
      boxShadow: {
        membrane: atmosphericTokens.shadows.membrane,
        organ: atmosphericTokens.shadows.organ,
        cavity: atmosphericTokens.shadows.cavity,
        vessel: atmosphericTokens.shadows.vessel,
        pulse: atmosphericTokens.shadows.pulse,
        neural: atmosphericTokens.shadows.neural,
      },
      animation: {
        breathe: atmosphericTokens.animations.breathe,
        circulation: atmosphericTokens.animations.circulation,
        neural: atmosphericTokens.animations.neural,
        pulse: atmosphericTokens.animations.pulse,
      },
    },
  },
  plugins: [],
};
```

## 📖 6. Documentación

### Archivo: `docs/atmospheric-theme.md` (NUEVO)

```markdown
# Tema Atmosférico Biomecánico

## Visión General

El tema Atmosférico crea una experiencia inmersiva que evoca la sensación de habitar dentro de una estructura viviente, inspirado en la estética biomecánica de H.R. Giger.

## Características Principales

### 🫁
```
