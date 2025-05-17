import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// A component with no dependencies or complex styling
const MinimalTest = () => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h1>Minimal Test Component</h1>
      <p>This is a simple component to test Storybook loading</p>
    </div>
  );
};

const meta = {
  title: 'Test/MinimalTest',
  component: MinimalTest,
} satisfies Meta<typeof MinimalTest>;

export default meta;
type Story = StoryObj<typeof MinimalTest>;

export const Default: Story = {};
