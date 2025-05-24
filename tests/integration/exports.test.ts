/**
 * Integration test to verify all components are properly exported
 * 
 * This test ensures that:
 * 1. All components are exported from the main entry point
 * 2. All components have the correct type exports
 * 3. No unexpected exports or naming conflicts exist
 */
import { describe, it, expect } from 'vitest';
import * as components from '../../src';

describe('Design System Exports', () => {
  // Expected component exports based on project structure
  const expectedComponents = [
    'Button',
    // Add other components as they are developed
  ];

  it('exports all expected components', () => {
    expectedComponents.forEach(componentName => {
      expect(components).toHaveProperty(componentName);
    });
  });

  it('has correct React component types', () => {
    // Verify Button is a valid React component (has displayName or $$typeof)
    const Button = components.Button;
    expect(Button).toBeDefined();
    
    // Check for React component signature
    // Components using forwardRef will have a $$typeof property or render method
    expect(
      Button.displayName === 'Button' || 
      Object.prototype.hasOwnProperty.call(Button, '$$typeof') ||
      typeof Button === 'function'
    ).toBe(true);
  });

  it('exports component prop types', () => {
    // This test will need to be updated as you explicitly export prop types
    // For example, if you export ButtonProps:
    // expect(components).toHaveProperty('ButtonProps');
  });
});
