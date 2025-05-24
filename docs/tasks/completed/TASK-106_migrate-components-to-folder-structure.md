# TASK-106: Migrate Components to Standardized Folder Structure

## Description

As part of our effort to standardize the design system, we need to migrate all components to a consistent folder structure. Each component should be moved to its own directory with the following structure:

```
src/components/ComponentName/
├── ComponentName.tsx
├── index.ts
├── __tests__/
│   └── ComponentName.test.tsx
```

This task involves migrating all existing components to this structure, updating imports throughout the codebase, and adding comprehensive tests for each component.

## Current Issues/Context

The design system components currently exist in a flat structure within the `src/components/` directory. This makes the codebase harder to navigate, and tests are not consistently organized. The flat structure also makes it difficult to co-locate component-specific files.

By migrating to a directory-based structure, we will:
- Improve code organization
- Make it easier to find component-specific files
- Create a consistent location for tests
- Allow for future expansion (styles, utilities, etc.)

## Implementation Plan

1. **Phase 1: Core Components (Completed)**
   - Migrate Button and Card components
   - Create comprehensive tests

2. **Phase 2: Form Components (Completed)**
   - Migrate Input component
   - Add comprehensive tests

3. **Phase 3: Data Display Components (Completed)**
   - Migrate Table component
   - Add comprehensive tests

4. **Phase 4: Basic UI Components (Completed)**
   - Migrate Badge, Switch, and Pagination components
   - Add comprehensive tests

5. **Phase 5: Navigation Components (Pending)**
   - Migrate Breadcrumb, Tabs, etc.
   - Add comprehensive tests

6. **Phase 6: Overlay Components (Pending)**
   - Migrate Dialog, Popover, etc.
   - Add comprehensive tests

7. **Phase 7: Final Components (Completed)**
   - Migrated Accordion, Checkbox, ProgressBar, and Tooltip components
   - Added comprehensive tests for each component

8. **Phase 8: Integration Updates (Completed)**
   - Updated integration tests
   - Fixed issues in migrated components
   - Removed old component files after successful migration
   - Verified all tests pass with the new structure

## Testing Instructions

For each migrated component:

1. Ensure its tests cover:
   - Rendering
   - Props handling
   - Variants and options
   - Accessibility features
   - Event handling
   - Ref forwarding

2. Run the test suite to verify all tests pass: `npm test`

3. Verify the library builds correctly: `npm run build`

## Related Files

Components migrated:
- src/components/Button/
- src/components/Card/
- src/components/Input/
- src/components/Table/
- src/components/Badge/
- src/components/Switch/
- src/components/Pagination/
- src/components/Breadcrumb/
- src/components/Tabs/
- src/components/Avatar/
- src/components/Alert/
- src/components/Dialog/
- src/components/Popover/
- src/components/Accordion/
- src/components/Checkbox/
- src/components/ProgressBar/
- src/components/Tooltip/
- src/components/Carousel/
- src/components/ConfirmDialog/
- src/components/DatePicker/
- src/components/FileUpload/
- src/components/Label/
- src/components/Loader/
- src/components/MultiSelect/
- src/components/RadioGroup/
- src/components/Select/
- src/components/Textarea/
- src/components/ThemeToggle/

Import locations updated:
- src/components/index.ts
- src/index.ts
- src/types/index.ts

## Dependencies

- React Testing Library
- Vitest
- @testing-library/user-event

## Progress

- [x] Phase 1: Core Components
- [x] Phase 2: Form Components
- [x] Phase 3: Data Display Components
- [x] Phase 4: Basic UI Components
- [x] Phase 5: Navigation Components (Breadcrumb, Tabs)
- [x] Phase 6: Overlay Components (Dialog, Popover)
- [x] Phase 7: Final Components (Accordion, Checkbox, ProgressBar, Tooltip)
- [x] Phase 8: Integration Updates
