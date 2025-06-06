import React, { useState, useCallback, useRef } from 'react';
import { spacing, tokens } from '../tokens';
import { cn } from '../utils';

export interface FileUploadProps {
  files: File[];
  onFileChange: (files: File[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, onFileChange }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(files);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          onFileChange(updatedFiles);
          return updatedFiles;
        });
      }
    },
    [onFileChange]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files) {
        const newFiles = Array.from(event.dataTransfer.files);
        setSelectedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles, ...newFiles];
          onFileChange(updatedFiles);
          return updatedFiles;
        });
      }
    },
    [onFileChange]
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handleDeleteFile = useCallback(
    (fileToRemove: File) => {
      setSelectedFiles((prevFiles) => {
        const updatedFiles = prevFiles.filter(
          (file) => file !== fileToRemove
        );
        onFileChange(updatedFiles);
        return updatedFiles;
      });
    },
    [onFileChange]
  );

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);
  return (
    <div className="space-y-4">
      <div
        className={cn('border-2 border-dashed cursor-pointer', spacing(6), tokens.radius.md)}
        style={{ borderColor: tokens.colors.border }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
          aria-label="Upload files"
        />
        <p className="text-center" style={{ color: tokens.colors.textMuted }}>
          Drag and drop files here or click to select files
        </p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className={cn('flex items-center justify-between', spacing(2), tokens.radius.md)}
              style={{ backgroundColor: tokens.colors.backgroundMuted }}
            >
              <span className="text-sm">{file.name}</span>
              <button
                type="button"
                className={cn(tokens.radius.sm, tokens.transition.colors, spacing(1, 'y'), spacing(2, 'x'))}
                style={{
                  backgroundColor: tokens.colors.backgroundDestructive,
                  color: tokens.colors.text,
                }}
                onClick={() => handleDeleteFile(file)}
                aria-label={`Remove ${file.name}`}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
