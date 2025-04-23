import type { Meta, StoryObj } from "@storybook/react";
import Card from "../components/Card";

const meta: Meta<typeof Card> = {
  component: Card,
  title: "Components/Card",
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Default Card",
    children: "This is the default card variant.",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    title: "Muted Card",
    children: "This is the muted card variant.",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Destructive Card",
    children: "This is the destructive card variant.",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    title: "Outline Card",
    children: "This is the outline card variant.",
  },
};