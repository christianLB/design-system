import React, { useState, useCallback, useRef, forwardRef } from 'react';


export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  files: File[];
  onFileChange: (files: File[]) => void;
  className?: string;
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ files, onFileChange, className, ...props }, ref) => {
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
      <div 
        ref={ref} data-testid="fileupload" 
        className={`fileupload ${className || ''}`}
        {...props}
      >
        <div
          className="fileupload-dropzone"
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
          />
          <p className="fileupload-dropzone-text">
            Drag and drop files here or click to select files
          </p>
        </div>
        {selectedFiles.length > 0 && (
          <div className="fileupload-list">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="fileupload-item"
              >
                <span className="fileupload-item-name">{file.name}</span>
                <button
                  type="button"
                  className="fileupload-item-delete"
                  onClick={() => handleDeleteFile(file)}
                  aria-label={`Delete ${file.name}`}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export { FileUpload };

