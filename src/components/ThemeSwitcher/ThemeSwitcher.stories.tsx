import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ThemeProvider } from '../../theme/ThemeContext';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Advanced Theming/ThemeSwitcher',
  component: ThemeSwitcher,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-8 bg-background">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithLabels: Story = {
  args: {
    showLabels: true,
  },
};

export const WithSystem: Story = {
  args: {
    showSystem: true,
  },
};

export const NoTooltip: Story = {
  args: {
    showTooltip: false,
  },
};
