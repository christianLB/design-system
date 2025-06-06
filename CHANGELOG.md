# Changelog

All notable changes to this project will be documented in this file.

## [1.7.3] - 2025-06-06

### Fixed
- Use `npm install` instead of `npm ci` in the publish workflow.
- Updated package version to 1.7.3.

## [1.7.2] - 2025-06-06

### Added
- Re-exported `cn` from `src/utils` so it can be imported from the package root.
- Updated package version to 1.7.2.

## [1.7.0] - 2025-05-22

### Changed
- Refactored Tailwind CSS integration to use v4.x with the `@tailwindcss/vite` plugin.
- Adopted CSS-first theming: theme (colors, fonts, shadows, radii) defined in `src/styles/index.css` using the `@theme` block.
- Moved dark mode CSS variable overrides to global scope in `src/styles/index.css` (outside the `@theme` block).
- Removed `theme.extend.colors` and `theme.extend.fontFamily` from `tailwind.config.js` as these are now sourced from CSS variables defined in `@theme`.
- Removed `src/styles/tokens.css` as its content is now consolidated into `src/styles/index.css`.
- Updated package version to 1.7.0.

### Fixed
- Resolved issues with Tailwind CSS utility classes and custom theme variables not being generated or applied correctly.
- Ensured design system styles and theming (including dark mode) work as expected when consumed by other applications.

## [1.6.0] - 2025-05-22

### Added
- Comprehensive theming documentation in `THEMING.md`
- Added `ThemeProvider` and `useTheme` exports to the main package
- Improved TypeScript support for theme-related types
- Enhanced documentation with usage examples and best practices

### Changed
- Updated package version to 1.6.0
- Improved theme context exports for better tree-shaking
- Enhanced type safety for theme-related components

### Fixed
- Fixed TypeScript type definitions for theme context
- Ensured proper tree-shaking for theme-related code
- Improved documentation for theme customization

## [1.5.0] - 2025-05-22

### Added
- New `ThemeContext` for global theme management
- New `useTheme` hook for accessing and updating the theme
- Enhanced `DesignSystemProvider` with theme support
- Improved dark mode support with better theming system

### Changed
- Updated `ThemeToggle` to use the new theme context
- Improved theme persistence using localStorage
- Enhanced CSS theming with better selector support
- Added support for both class-based and data-attribute theming

### Fixed
- Fixed dark mode theming issues across components
- Improved theme consistency throughout the application
- Fixed theme persistence between page reloads


## [1.4.10] - 2025-05-22

### Fixed
- Fixed DatePicker export to use named exports for consistency
- Added missing DatePickerProps type export

## [1.4.9] - 2025-05-22

### Changed
- Updated component exports to use named exports for better tree-shaking and TypeScript support
  - Affected components:
    - Accordion
    - Alert
    - Avatar
    - Breadcrumb (and BreadcrumbItem)
    - Carousel
    - FileUpload
- Improved type exports for all updated components

### Fixed
- Ensured backward compatibility with existing imports through index.ts
- Fixed TypeScript type definitions for component props
