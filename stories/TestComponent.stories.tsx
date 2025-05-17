import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * A minimal test component to verify Storybook rendering
 */
const TestComponent = ({ text = 'Hello Storybook!' }: { text?: string }) => {
  return (
    <div 
      style={{
        padding: '20px',
        margin: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8',
        color: '#333',
        fontFamily: 'sans-serif'
      }}
    >
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{text}</h1>
      <p style={{ fontSize: '16px' }}>If you can see this component, Storybook is working correctly!</p>
      <button 
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          marginTop: '10px',
          cursor: 'pointer'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Click me
      </button>
    </div>
  );
};

const meta: Meta<typeof TestComponent> = {
  title: 'Test/TestComponent',
  component: TestComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text' }
  },
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    text: 'Hello Storybook!',
  },
};

export const DifferentText: Story = {
  args: {
    text: 'Storybook is working!',
  },
};
