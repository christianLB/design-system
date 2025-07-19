import React from 'react';
import { Button } from '../../components/Button';

/**
 * Example usage of Button component
 * Generated automatically by Claude Code Documentation System
 */

export const Example1 = () => (
  <div>
    <h3>Example 1</h3>
    <Button />
  </div>
);

export const Example2 = () => (
  <div>
    <h3>Example 2</h3>
    <Button ref="value" variant="value" />
  </div>
);

export const Example3 = () => (
  <div>
    <h3>Example 3</h3>
    <Button>Content goes here</Button>
  </div>
);

export const AllExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Example1 />
    <Example2 />
    <Example3 />
  </div>
);
