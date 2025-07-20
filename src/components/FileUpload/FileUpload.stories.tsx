import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { FileUpload } from './FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Core Components/Forms/File Upload',
  component: FileUpload,
  argTypes: { onFileChange: { action: 'changed' } },
  args: { files: [] },
};
export default meta;

type Story = StoryObj<typeof FileUpload>;

export const Primary: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return <FileUpload {...args} files={files} onFileChange={setFiles} />;
  },
};

export const WithInitialFiles: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([new File(['hi'], 'hi.txt')]);
    return <FileUpload {...args} files={files} onFileChange={setFiles} />;
  },
};
