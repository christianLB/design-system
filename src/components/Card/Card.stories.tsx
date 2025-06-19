import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

export const WithClass: Story = {
  render: (args) => (
    <Card {...args} className="border">
      <CardContent>Simple card</CardContent>
    </Card>
  ),
};
