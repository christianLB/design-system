# Progress Bar Component

## Overview

The `ProgressBar` component visually represents the progress of a task or operation. It provides immediate feedback to users on ongoing processes such as uploads, downloads, form completion, or loading states. Supports labels, custom colors, indeterminate states, and accessibility features.

## Features
- **Visual Progress**: Horizontal bar fills to indicate completion
- **Percentage Label**: Optionally displays numeric percentage
- **Indeterminate State**: Shows animated bar for unknown durations
- **Customizable**: Colors, height, labels, and styles
- **Accessible**: ARIA roles, screen reader support, keyboard focus

## Usage

### Basic Usage
```jsx
<ProgressBar value={60} />
```

### With Label
```jsx
<ProgressBar value={80} label="Uploading..." />
```

### Indeterminate State
```jsx
<ProgressBar indeterminate />
```

### Custom Color and Height
```jsx
<ProgressBar value={40} color="green" height={8} />
```

## Prop Table
| Prop           | Type                | Default   | Description                                 |
|----------------|---------------------|-----------|---------------------------------------------|
| `value`        | `number`            | —         | Progress percentage (0-100)                 |
| `label`        | `string`            | —         | Optional label or description               |
| `indeterminate`| `boolean`           | false     | Show animated bar for unknown progress      |
| `color`        | `string`            | 'primary' | Bar color (theme or hex)                    |
| `height`       | `number`            | 4         | Height of the bar in pixels                 |
| `className`    | `string`            | —         | Custom class for styling                    |
| `aria-label`   | `string`            | —         | Accessible label for screen readers         |

## Accessibility
- Uses `role="progressbar"` and `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Label or `aria-label` describes the progress context
- Indeterminate state uses `aria-busy="true"`
- Fully keyboard and screen reader accessible

**Example Accessible ProgressBar:**
```jsx
<ProgressBar value={70} aria-label="File upload progress" />
```

## Best Practices
- Use for long-running or multi-step tasks
- Provide a label for context
- Use indeterminate only when duration is unknown
- Ensure color contrast for accessibility
- Announce completion with a status message

## Troubleshooting
- If bar does not update, check `value` prop and re-renders
- For accessibility, ensure ARIA attributes and labels are present
- If styling is off, check custom classes and parent container

## Related Components
- [FileUpload](./fileupload.md) — For upload progress
- [Button](./button.md) — For actions
- [Card](./card.md) — For progress in cards
- [Alert](./alert.md) — For completion or error feedback