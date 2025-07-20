export * from './types';
export * from './validation-utils';
export * from './InteractiveTutorial';
export * from './useTutorial';

// Export all available tutorials
import { basicComponentsTutorial } from './basic-components-tutorial';
export { basicComponentsTutorial };

// Tutorial registry for easy access
export const tutorials = {
  basicComponents: basicComponentsTutorial,
  // Add more tutorials here as they are created
};
