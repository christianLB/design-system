import React from 'react';
import { Card } from '../../components/Card';

/**
 * Example usage of Card component
 * Generated automatically by Claude Code Documentation System
 */

export const Example1 = () => (
  <div>
    <h3>Example 1</h3>
    <Card />
  </div>
);

export const Example2 = () => (
  <div>
    <h3>Example 2</h3>
    <Card ref="value" variant="value" />
  </div>
);

export const AllExamples = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Example1 />
    <Example2 />
  </div>
);
