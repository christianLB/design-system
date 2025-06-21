import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Docs/Identidad Visual',
  parameters: {
    viewMode: 'docs',
    docs: {
      page: () => (
        <>
          <h1>Identidad visual</h1>
          <p>El tema futurista utiliza una paleta vibrante y tipografías modernas.</p>
          <ul>
            <li>Primary: #7F5AF0</li>
            <li>Accent: #2CB67D</li>
            <li>Background: #0F0F1A</li>
            <li>Surface: #1F1F2B</li>
            <li>Texto: #FFFFFFCC</li>
          </ul>
          <p>
            Los encabezados emplean fuentes como Geist o Satoshi mientras que el
            cuerpo utiliza Inter o IBM Plex Sans.
          </p>
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj;
export const Page: Story = {};
Page.parameters = { docsOnly: true };
