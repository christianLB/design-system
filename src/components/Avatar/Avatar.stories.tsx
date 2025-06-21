import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
void React;
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  args: {
    alt: 'JD',
    src: 'https://via.placeholder.com/64',
    size: 'md',
    shape: 'circle',
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {};

export const Square: Story = { args: { shape: 'square' } };
