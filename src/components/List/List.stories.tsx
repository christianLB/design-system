import type { Meta, StoryObj } from '@storybook/react';
import { List, type ListItem } from './List';
import { Mail, Star, User, Settings, Bell } from 'lucide-react';

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof List>;

const sampleItems: ListItem[] = [
  {
    id: '1',
    title: 'John Doe',
    description: 'Software Engineer',
    icon: <User className="h-4 w-4" />,
  },
  {
    id: '2',
    title: 'Jane Smith',
    description: 'Product Manager',
    icon: <User className="h-4 w-4" />,
  },
  { id: '3', title: 'Bob Johnson', description: 'Designer', icon: <User className="h-4 w-4" /> },
  {
    id: '4',
    title: 'Alice Brown',
    description: 'DevOps Engineer',
    icon: <User className="h-4 w-4" />,
  },
];

const menuItems: ListItem[] = [
  {
    id: '1',
    title: 'Inbox',
    description: '12 unread messages',
    icon: <Mail className="h-4 w-4" />,
    meta: '12',
  },
  {
    id: '2',
    title: 'Starred',
    description: 'Important items',
    icon: <Star className="h-4 w-4" />,
    meta: '5',
  },
  {
    id: '3',
    title: 'Notifications',
    description: 'Recent alerts',
    icon: <Bell className="h-4 w-4" />,
    meta: '3',
  },
  {
    id: '4',
    title: 'Settings',
    description: 'App preferences',
    icon: <Settings className="h-4 w-4" />,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
  },
};

export const Card: Story = {
  args: {
    items: sampleItems,
    variant: 'card',
  },
};

export const WithMeta: Story = {
  args: {
    items: menuItems,
    showChevron: true,
  },
};

export const SingleSelect: Story = {
  args: {
    items: sampleItems,
    selectionMode: 'single',
    selected: ['1'],
  },
};

export const MultiSelect: Story = {
  args: {
    items: sampleItems,
    selectionMode: 'multiple',
    selected: ['1', '3'],
  },
};

export const Small: Story = {
  args: {
    items: sampleItems,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    items: sampleItems,
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
    skeletonCount: 4,
  },
};

export const Empty: Story = {
  args: {
    items: [],
    emptyState: <div className="py-8 text-center text-muted-foreground">No items found</div>,
  },
};
