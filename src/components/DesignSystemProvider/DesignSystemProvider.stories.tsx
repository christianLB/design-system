import type { Meta, StoryObj } from '@storybook/react';
import DesignSystemProvider from './index';

const meta: Meta<typeof DesignSystemProvider> = {
  title: 'Components/DesignSystemProvider',
  component: DesignSystemProvider,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof DesignSystemProvider>;

export const Default: Story = {
  args: {
    children: 'Content'
  }
};

