import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../components/input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input",
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: "text",
    placeholder: "Enter text here",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email here",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password here",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number here",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    type: "text",
    placeholder: "Error input",
    "aria-invalid": true,
  },
};