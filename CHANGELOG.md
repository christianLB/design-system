# Changelog

All notable changes to this project will be documented in this file.

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
