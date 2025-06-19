import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  args: {
    type: 'single',
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Primary: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: (args) => (
    <Accordion {...args} type="multiple">
      <AccordionItem value="a">
        <AccordionTrigger>A</AccordionTrigger>
        <AccordionContent>A content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>B</AccordionTrigger>
        <AccordionContent>B content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
