import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from '../../components/FileUpload';
import { useState } from 'react';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<FileList | null>(null);

    const handleFileChange = (newFiles: FileList | null) => {
      setFiles(newFiles);
      console.log('Files changed:', newFiles);
    };

    return (
      <div>
        <FileUpload files={files} onFileChange={handleFileChange} />
        {files && files.length > 0 && (
          <ul>
            {Array.from(files).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  },
};