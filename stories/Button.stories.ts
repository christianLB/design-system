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