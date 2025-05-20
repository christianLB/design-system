# FileUpload Component

## Overview

The `FileUpload` component enables users to select and upload files. It supports drag-and-drop, multiple file selection, progress display, and accessibility. Ideal for forms, profile images, and document uploads.

## Features
- **Single/Multiple Files**: Select one or many files
- **Drag-and-Drop**: Drop zone for quick upload
- **File Type Restriction**: Accept only certain types/extensions
- **Progress Indicator**: Show upload progress
- **Preview**: Show thumbnails or file info
- **Remove/Replace**: Remove or change files before upload
- **Accessible**: Keyboard, ARIA, and screen reader support

## Usage

### Basic Usage
```jsx
<FileUpload onChange={files => setFiles(files)} />
```

### Multiple Files
```jsx
<FileUpload multiple onChange={setFiles} />
```

### File Type Restriction
```jsx
<FileUpload accept="image/*,.pdf" />
```

### With Preview
```jsx
<FileUpload onChange={setFiles} renderPreview={file => <img src={URL.createObjectURL(file)} alt={file.name} />} />
```

## Prop Table
| Prop          | Type                | Default   | Description                                 |
|---------------|---------------------|-----------|---------------------------------------------|
| `multiple`    | `boolean`           | false     | Allow multiple file selection               |
| `accept`      | `string`            | —         | Accepted file types/extensions              |
| `onChange`    | `(files: File[]) => void` | —   | Callback when files are selected            |
| `renderPreview`| `(file: File) => ReactNode` | — | Custom preview renderer                     |
| `disabled`    | `boolean`           | false     | Disable file selection                      |
| `className`   | `string`            | —         | Custom class for styling                    |
| `aria-label`  | `string`            | —         | Accessible label for screen readers         |

## Accessibility
- Uses `role="button"` for drop zone
- Keyboard: Enter/Space to open file picker
- ARIA attributes for drop zone and file list
- Descriptive labels for all controls

**Example Accessible FileUpload:**
```jsx
<FileUpload aria-label="Upload your resume" />
```

## Best Practices
- Restrict file types to prevent errors
- Show upload progress and previews
- Provide clear instructions and labels
- Allow removing/replacing files before upload
- Test drag-and-drop and keyboard accessibility

## Troubleshooting
- If files can't be selected, check `accept` and `disabled` props
- For accessibility, ensure ARIA attributes and labels are present
- If preview isn't working, check `renderPreview` logic

## Related Components
- [Button](./button.md) — For upload triggers
- [Form](./form.md) — For grouping fields
- [Card](./card.md) — For file previews
- [Tooltip](./tooltip.md) — For upload help/info
