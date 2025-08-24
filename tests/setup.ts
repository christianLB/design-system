import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
// Register jest-axe matcher with Vitest's expect explicitly
// For Jest-style tests using expect(...).toHaveNoViolations(), Vitest runs on Chai under the hood.
// Provide a Chai assertion shim so existing tests continue to work without refactors.
import { Assertion } from 'chai';

Assertion.addMethod('toHaveNoViolations', function (this: Chai.AssertionStatic) {
  const results = (this as any)._obj as { violations?: unknown[] };
  const count = Array.isArray(results?.violations) ? results.violations.length : 0;
  this.assert(
    count === 0,
    `expected axe results to have no violations, but found ${count}`,
    'expected axe results to have violations (negated)'
  );
});

// Runs a cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
