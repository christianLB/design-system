import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    value: 40,
    maxValue: 100,
    variant: 'primary',
  },
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { variant: 'default' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Success: Story = { args: { variant: 'success', value: 80 } };
export const Warning: Story = { args: { variant: 'warning', value: 60 } };
export const Danger: Story = { args: { variant: 'danger', value: 20 } };
export const Info: Story = { args: { variant: 'info', value: 75 } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Progress value={40} variant="primary" size="sm" />
      <Progress value={60} variant="primary" size="md" />
      <Progress value={80} variant="primary" size="lg" />
    </div>
  ),
};

export const CyberpunkMatrix: Story = { 
  args: { 
    variant: 'cyberpunk-matrix', 
    value: 65,
    cyberpunkGlow: 'normal',
    scanlines: true
  } 
};
export const CyberpunkDoom: Story = { 
  args: { 
    variant: 'cyberpunk-doom', 
    value: 85,
    cyberpunkGlow: 'intense'
  } 
};
export const CyberpunkGhost: Story = { 
  args: { 
    variant: 'cyberpunk-ghost', 
    value: 45,
    cyberpunkGlow: 'normal'
  } 
};
export const CyberpunkNeon: Story = { 
  args: { 
    variant: 'cyberpunk-neon', 
    value: 75,
    cyberpunkGlow: 'intense',
    matrixRain: true
  } 
};

export const Indeterminate: Story = { args: { isIndeterminate: true } };
