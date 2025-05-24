import React, { useState, useCallback, useRef, forwardRef } from 'react';
import { cn } from '../../utils';
import { Trash2 } from 'lucide-react';

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
        className={cn("space-y-4", className)}
        {...props}
      >
        <div
          className={cn(
            "border-2 border-dashed rounded-md cursor-pointer",
            "border-border hover:border-primary/50 transition-colors",
            "p-6 flex flex-col items-center justify-center",
            "bg-muted/50 hover:bg-muted transition-colors"
          )}
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
          <p className="text-muted-foreground text-center">
            Drag and drop files here or click to select files
          </p>
        </div>
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-2 rounded-md",
                  "bg-card text-card-foreground border border-border"
                )}
              >
                <span className="text-sm font-medium truncate flex-1 mr-2">{file.name}</span>
                <button
                  type="button"
                  className={cn(
                    "p-1 rounded-md flex items-center justify-center",
                    "bg-destructive hover:bg-destructive/90 transition-colors",
                    "text-destructive-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  )}
                  onClick={() => handleDeleteFile(file)}
                  aria-label={`Delete ${file.name}`}
                >
                  <Trash2 className="h-4 w-4" />
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

