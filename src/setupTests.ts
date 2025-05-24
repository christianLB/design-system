// src/setupTests.ts
// Setup file for Vitest tests
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Import and extend Vitest's expect method
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

// Clean up after each test to avoid memory leaks
afterEach(() => {
  cleanup();
});
