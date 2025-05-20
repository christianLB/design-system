# Textarea Component

## Overview

The `Textarea` component is a multi-line input field for collecting longer-form text. It supports controlled/uncontrolled usage, custom sizing, accessibility, and theming. Ideal for comments, feedback, and content creation.

## Features
- **Multi-line Input**: For paragraphs or long-form text
- **Resizable**: User can resize (optional)
- **Custom Size**: Width/height via props or CSS
- **Disabled State**: Prevent user input
- **Placeholder**: Guide user with hint text
- **Controlled/Uncontrolled**: Works with or without state
- **Themed**: Integrates with design system
- **Accessible**: Proper labeling, ARIA, and keyboard navigation

## Usage

### Basic Usage
```tsx
<Textarea />
```

### Controlled Textarea
```tsx
const [value, setValue] = useState("");
<Textarea value={value} onChange={e => setValue(e.target.value)} />
```

### Disabled
```tsx
<Textarea disabled />
```

### With Placeholder
```tsx
<Textarea placeholder="Enter your text here" />
```

### Custom Height/Width
```tsx
<Textarea style={{ minHeight: 120, width: 400 }} />
```

### With Label (Accessible)
```tsx
<label htmlFor="message">Message</label>
<Textarea id="message" aria-label="Message" />
```

## Prop Table
| Prop         | Type           | Default   | Description                                        |
|--------------|----------------|-----------|----------------------------------------------------|
| `value`      | `string`       | —         | Controlled value                                   |
| `defaultValue`| `string`      | —         | Uncontrolled initial value                         |
| `onChange`   | `(e) => void`  | —         | Change handler                                     |
| `placeholder`| `string`       | —         | Placeholder text                                   |
| `disabled`   | `boolean`      | `false`   | Disables input                                     |
| `rows`       | `number`       | —         | Number of visible text lines                       |
| `cols`       | `number`       | —         | Number of visible character columns                |
| `style`      | `object`       | —         | Inline styles for size, etc.                       |
| `className`  | `string`       | —         | Custom class for styling                           |
| `id`         | `string`       | —         | Element id (useful for label association)          |
| `aria-label` | `string`       | —         | Accessible label                                   |

## Accessibility
- Always pair with a `<label>` or use `aria-label`
- Keyboard accessible and focusable
- Sufficient color contrast for text and placeholder
- Use `aria-invalid` for validation errors
- Supports screen readers

**Example Accessible Textarea:**
```tsx
<label htmlFor="desc">Description</label>
<Textarea id="desc" aria-label="Description" />
```

## Best Practices
- Use for multi-line input, not short text
- Pair with a clear label for accessibility
- Provide helpful placeholder text
- Use controlled mode for validation
- Disable only when necessary
- Avoid fixed heights that hide overflow

## Troubleshooting
- If not editable, check `disabled` and value props
- For accessibility, ensure a label or `aria-label` is present
- If resizing is broken, check CSS or parent container

## Related Components
- [Input](./input.md) — For single-line text
- [Form](./form.md) — For grouping fields
- [Card](./card.md) — For embedding textareas in layouts
- [Button](./button.md) — For submit/reset actions