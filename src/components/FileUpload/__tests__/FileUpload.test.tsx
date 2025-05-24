import React from 'react';
import { render, screen } from '@testing-library/react';
import { FileUpload } from '../FileUpload';

describe('FileUpload Component', () => {
  it('renders correctly', () => {
    render(<FileUpload files={[]} onFileChange={() => {}} data-testid="fileupload" />);
    expect(screen.getByTestId('fileupload')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});