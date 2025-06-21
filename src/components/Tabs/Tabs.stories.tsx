import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  args: { defaultValue: 'tab1' },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Primary: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  ),
};

export const SecondDefault: Story = {
  args: { defaultValue: 'tab2' },
};
