import type { Meta, StoryObj } from '@storybook/react';
import { Tree, type TreeNode } from './Tree';

const meta: Meta<typeof Tree> = {
  title: 'Data Display/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tree>;

const fileSystemNodes: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Card.tsx', label: 'Card.tsx' },
          { id: 'Input.tsx', label: 'Input.tsx' },
        ],
      },
      {
        id: 'hooks',
        label: 'hooks',
        children: [
          { id: 'useTheme.ts', label: 'useTheme.ts' },
          { id: 'useAnimation.ts', label: 'useAnimation.ts' },
        ],
      },
      { id: 'index.ts', label: 'index.ts' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'favicon.ico', label: 'favicon.ico' },
      { id: 'robots.txt', label: 'robots.txt' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'README.md', label: 'README.md' },
];

const categoryNodes: TreeNode[] = [
  {
    id: 'electronics',
    label: 'Electronics',
    children: [
      {
        id: 'phones',
        label: 'Phones',
        children: [
          { id: 'iphone', label: 'iPhone 15 Pro' },
          { id: 'pixel', label: 'Google Pixel 8' },
          { id: 'samsung', label: 'Samsung Galaxy S24' },
        ],
      },
      {
        id: 'laptops',
        label: 'Laptops',
        children: [
          { id: 'macbook', label: 'MacBook Pro' },
          { id: 'thinkpad', label: 'ThinkPad X1' },
        ],
      },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing',
    children: [
      { id: 'shirts', label: 'Shirts' },
      { id: 'pants', label: 'Pants' },
      { id: 'shoes', label: 'Shoes' },
    ],
  },
];

export const Default: Story = {
  args: {
    nodes: fileSystemNodes,
  },
};

export const Bordered: Story = {
  args: {
    nodes: fileSystemNodes,
    variant: 'bordered',
  },
};

export const WithLines: Story = {
  args: {
    nodes: fileSystemNodes,
    showLines: true,
  },
};

export const NoIcons: Story = {
  args: {
    nodes: categoryNodes,
    showIcons: false,
  },
};

export const SingleSelect: Story = {
  args: {
    nodes: fileSystemNodes,
    selectionMode: 'single',
    selected: ['Button.tsx'],
  },
};

export const MultiSelect: Story = {
  args: {
    nodes: fileSystemNodes,
    selectionMode: 'multiple',
    selected: ['Button.tsx', 'Card.tsx'],
  },
};

export const AllExpanded: Story = {
  args: {
    nodes: fileSystemNodes,
    defaultExpanded: 'all',
  },
};

export const ExpanderAtEnd: Story = {
  args: {
    nodes: categoryNodes,
    expanderPosition: 'end',
    defaultExpanded: 'all',
  },
};

export const Small: Story = {
  args: {
    nodes: fileSystemNodes,
    size: 'sm',
    defaultExpanded: 'all',
  },
};

export const Large: Story = {
  args: {
    nodes: fileSystemNodes,
    size: 'lg',
    defaultExpanded: 'all',
  },
};
