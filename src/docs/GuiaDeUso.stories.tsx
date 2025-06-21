import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Docs/Guia de uso',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: () => (
        <>
          <h1>Guía de uso del Design System</h1>
          <p>Esta guía resume cómo contribuir con nuevas historias y buenas prácticas.</p>
          <h2>Cómo contribuir</h2>
          <ol>
            <li>Agrega tu componente en <code>src/components</code> con sus pruebas.</li>
            <li>Crea su historia bajo la misma carpeta.</li>
            <li>Asegúrate de exportar un <code>meta</code> con <code>title</code> y <code>component</code>.</li>
          </ol>
          <h2>Criterios de accesibilidad</h2>
          <ul>
            <li>Usa atributos ARIA cuando corresponda.</li>
            <li>Verifica la navegación por teclado.</li>
            <li>Asegura contraste suficiente en modo claro y oscuro.</li>
          </ul>
          <h2>Convenciones de nomenclatura</h2>
          <ul>
            <li>Componentes en <em>PascalCase</em>.</li>
            <li>Archivos de historia terminan en <code>.stories.tsx</code> o <code>.stories.mdx</code>.</li>
          </ul>
          <h2>Ejemplo de estructura ideal</h2>
          <pre>
            <code>{`import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Inputs/Button',
  component: Button,
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { children: 'Enviar' },
};`}</code>
          </pre>
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj;
export const Page: Story = {};
Page.parameters = { docsOnly: true };
