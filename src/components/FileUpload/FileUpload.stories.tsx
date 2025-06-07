import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {}
};

