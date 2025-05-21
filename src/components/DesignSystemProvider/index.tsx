import React, { ReactNode } from 'react';

interface DesignSystemProviderProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  theme = 'light',
}) => {
  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
};

export default DesignSystemProvider;
