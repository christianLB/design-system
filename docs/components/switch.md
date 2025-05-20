# Switch Component

## Overview

The `Switch` component is a binary toggle used to represent on/off states. It’s commonly used for settings, preferences, and feature toggles. Switches are accessible, customizable, and support controlled/uncontrolled usage.

## Features
- **Binary State**: On/off (checked/unchecked)
- **Controlled/Uncontrolled**: Supports both usage patterns
- **Custom Labels**: Optional labels for on/off states
- **Disabled State**: Prevents user interaction
- **Keyboard Accessible**: Focusable and togglable with keyboard
- **Customizable**: Theming and custom classes

## Usage

### Basic Usage
```jsx
<Switch />
```

### Controlled Switch
```jsx
const [on, setOn] = useState(false);
<Switch checked={on} onChange={setOn} />
```

### With Labels
```jsx
<Switch checked={enabled} onChange={setEnabled} label="Enable notifications" />
```

### Disabled State
```jsx
<Switch disabled />
```

## Prop Table
| Prop        | Type           | Default   | Description                                |
|-------------|----------------|-----------|--------------------------------------------|
| `checked`   | `boolean`      | —         | Controlled checked state                   |
| `defaultChecked`| `boolean`  | false     | Uncontrolled initial checked state         |
| `onChange`  | `(checked: boolean) => void`| —    | Callback when state changes                |
| `label`     | `string`       | —         | Optional label for the switch              |
| `disabled`  | `boolean`      | false     | Disables the switch                        |
| `className` | `string`       | —         | Custom class for styling                   |
| `aria-label`| `string`       | —         | Accessible label for screen readers        |

## Accessibility
- Uses `role="switch"` and `aria-checked`
- Focusable with Tab, togglable with Space/Enter
- Label is associated for screen readers
- Use `aria-label` if no visible label is present

**Example Accessible Switch:**
```jsx
<Switch aria-label="Enable dark mode" />
```

## Best Practices
- Use for binary on/off states
- Always provide a visible label or `aria-label`
- Use controlled mode for form validation
- Provide clear visual feedback for state
- Disable only when necessary

## Troubleshooting
- If not toggling, check `checked`/`onChange` props
- For accessibility, ensure label or `aria-label` is present
- If styling is off, check parent container and custom classes

## Related Components
- [Radio Group](./radio-group.md) — For single-choice selection
- [Checkbox](./checkbox.md) — For multi-choice toggles
- [Button](./button.md) — For actions
- [Form](./form.md) — For grouping fields
