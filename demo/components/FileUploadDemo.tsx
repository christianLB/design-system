import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function FileUploadDemo() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  return (
    <ComponentShowcase title="File Upload" description="A component for uploading files with drag and drop support.">
      <ComponentVariant title="Basic File Upload">
        <FileUpload files={files} onFileChange={handleFileChange} />
      </ComponentVariant>
    </ComponentShowcase>
  );
}
