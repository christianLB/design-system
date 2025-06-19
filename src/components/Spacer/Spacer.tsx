import React from 'react';

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpacerProps {
  size?: SpacerSize;
}

export const Spacer = ({ size = 'md' }: SpacerProps) => (
  <div className="spacer" style={{ height: `var(--spacing-${size})` }} data-testid="spacer" />
);
