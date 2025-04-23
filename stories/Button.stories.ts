import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: "Click Me",
        variant: "default",
    },
};

export const Primary: Story = {
    args: {
        children: "Primary Button",
        variant: "primary",
    },
};

export const Secondary: Story = {
    args: {
        children: "Secondary Button",
        variant: "secondary",
    },
};

export const Destructive: Story = {
    args: {
        children: "Destructive Button",
        variant: "destructive",
    },
};

export const Outline: Story = {
    args: {
        children: "Outline Button",
        variant: "outline",
    },
};

export const Ghost: Story = {
    args: {
        children: "Ghost Button",
        variant: "ghost",
    },
};

export const Link: Story = {args: {children: "Link Button", variant: "link"}};