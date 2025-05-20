import React, { useState, useCallback, useRef } from 'react';

interface FileUploadProps {
  files: File[];
  onFileChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onFileChange }) => {
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
        className="border-2 border-dashed border-gray-300 p-6 rounded-md cursor-pointer"
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
        <p className="text-gray-500 text-center">
          Drag and drop files here or click to select files
        </p>
      </div>
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
            >
              <span className="text-sm">{file.name}</span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDeleteFile(file)}
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

export default FileUpload;