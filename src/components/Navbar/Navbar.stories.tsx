import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { 
  navItems,
  logoElement,
  ctaElement,
  withTheme,
  withLightBackground,
  withDarkBackground,
  withStackContainer,
  mobileViewport
} from '../Navigation/stories.utils';

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withTheme],
  argTypes: {
    layout: {
      control: 'radio',
      options: ['row', 'stack'],
      description: 'Layout direction for navigation items',
      table: {
        defaultValue: { summary: 'row' },
      },
    },
  },
  args: {
    items: navItems,
    logo: logoElement,
    cta: ctaElement,
    layout: 'row',
  },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const RowLayout: Story = {
  name: 'Layout: Row (Default)',
  decorators: [withLightBackground],
  parameters: {
    docs: {
      description: {
        story: 'Default horizontal layout for desktop navigation.'
      }
    }
  }
};

export const StackLayout: Story = {
  name: 'Layout: Stack',
  args: {
    layout: 'stack',
  },
  decorators: [withStackContainer],
};

export const OnDarkBackground: Story = {
  name: 'Dark Theme',
  args: {
    layout: 'row',
  },
  decorators: [withDarkBackground],
};

export const MobileView: Story = {
  name: 'Mobile View',
  ...mobileViewport,
  decorators: [withLightBackground],
};

export const NoLogo: Story = {
  name: 'Without Logo',
  args: {
    logo: undefined,
  },
  decorators: [withLightBackground],
};

export const NoCta: Story = {
  name: 'Without CTA',
  args: {
    cta: undefined,
  },
  decorators: [withLightBackground],
};
