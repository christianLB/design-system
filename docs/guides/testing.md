# Testing Guide for @k2600x/design-system

This guide outlines our testing approach, tools, and best practices for the design system. We follow Test-Driven Development (TDD) principles to ensure high-quality, maintainable components.

## Our Testing Philosophy

We use Test-Driven Development (TDD) following the "Red-Green-Refactor" cycle:

1. **RED**: Write failing tests that define the expected behavior
2. **GREEN**: Write the minimum code needed to make tests pass
3. **REFACTOR**: Clean up the implementation while keeping tests green

## Testing Structure

Our testing strategy consists of multiple layers:

### 1. Component Tests

These focus on individual components in isolation, testing:
- Rendering and appearance
- Props handling
- Event handling
- Accessibility
- State changes

**Location**: `src/components/ComponentName/__tests__/ComponentName.test.tsx`

### 2. Integration Tests

These verify that components work correctly together and with our utilities.

**Location**: `tests/integration/`

### 3. Package-Level Tests

These ensure our package can be safely consumed by applications:
- Export validation
- Build verification
- CSS generation
- Consumer compatibility

**Location**: `tests/integration/`

## Testing Tools

- **Test Runner**: Vitest
- **Component Testing**: React Testing Library
- **DOM Assertions**: @testing-library/jest-dom
- **Test Environment**: jsdom

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific tests
npm test -- src/components/Button/__tests__/Button.test.tsx
```

## Writing Tests for Components

### Test Structure

We follow the Arrange-Act-Assert (AAA) pattern:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  it('renders correctly with default props', () => {
    // Arrange: Set up test data and conditions
    const { container } = render(<ComponentName />);
    
    // Act: Perform the action to test
    const element = container.querySelector('element-selector');
    
    // Assert: Check if the results are as expected
    expect(element).not.toBeNull();
    expect(element?.textContent).toBe('Expected Text');
  });
});
```

### Testing Variants and Props

For components with variants or props, test each significant combination:

```tsx
it('applies the primary variant correctly', () => {
  const { container } = render(<Button variant="primary">Click Me</Button>);
  const button = container.querySelector('button');
  
  expect(button?.className).toContain('bg-primary');
});
```

### Testing Interactions

Use React Testing Library's utilities to test interactions:

```tsx
it('calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  fireEvent.click(screen.getByText('Click Me'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Testing Accessibility

Test for basic accessibility requirements:

```tsx
it('has the correct ARIA attributes', () => {
  render(<Button aria-label="Action Button">Click Me</Button>);
  
  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Action Button');
});
```

## TDD Workflow in Our Project

1. **Pre-commit Hooks**: Tests run automatically on staged files before commits
2. **CI Integration**: All tests run on pull requests and pushes to main
3. **Coverage Tracking**: We aim for high test coverage for critical components

## When to Write Tests

- **New Components**: Always write tests before implementing
- **Bug Fixes**: First write a failing test that reproduces the bug
- **Feature Additions**: Add tests for new features before implementing them
- **Refactoring**: Ensure existing tests pass after refactoring

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Keep Tests Simple**: Each test should verify one specific aspect
3. **Use Descriptive Test Names**: Clear descriptions make debugging easier
4. **Avoid Test Interdependence**: Tests should be able to run independently
5. **Mock Dependencies**: Use mocks for external dependencies
6. **Don't Test Third-Party Code**: Focus on testing your own code
7. **Maintain Tests**: Update tests when requirements change

## FAQ

**Q: How much test coverage should we aim for?**
A: We aim for 80%+ coverage for critical components, focusing on behavior rather than hitting an arbitrary number.

**Q: Should we test styling?**
A: Test that style-related classes are applied correctly, but avoid testing the actual CSS effects.

**Q: How detailed should component tests be?**
A: Test all meaningful props, variants, and user interactions, but don't test obvious React behavior.

---

This document is a living guide. As our testing practices evolve, we'll update it accordingly.
