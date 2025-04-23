import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../components/textarea";
import React from "react";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Components/Textarea",
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
    rows: 4,
  },
  render: (args) => <Textarea {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
    rows: 4,
  },
  render: (args) => <Textarea {...args} />,
};
