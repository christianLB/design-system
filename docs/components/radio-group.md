# Radio Group Component

## Overview

The `Radio Group` component lets users select one option from a set. It supports custom labels, keyboard navigation, accessibility, and theming. Ideal for forms, surveys, and settings.

## Features
- **Single Selection**: Only one option can be selected
- **Configurable Options**: Array of `{ value, label }` objects
- **Custom Labels**: Supports text, icons, or complex nodes
- **Keyboard Navigation**: Arrow keys move selection
- **Accessible**: ARIA roles, screen reader support
- **Customizable**: Theming and custom classes

## Usage

### Basic Usage
```jsx
<RadioGroup
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' }
  ]}
  onChange={value => setValue(value)}
/>
```

### Controlled Radio Group
```jsx
const [selected, setSelected] = useState('a');
<RadioGroup
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

### Custom Label Content
```jsx
<RadioGroup
  options={[
    { value: 'dog', label: <><DogIcon /> Dog</> },
    { value: 'cat', label: <><CatIcon /> Cat</> }
  ]}
  onChange={setValue}
/>
```

## Prop Table
| Prop        | Type                                               | Default | Description                                 |
|-------------|----------------------------------------------------|---------|---------------------------------------------|
| `options`   | `Array<{ value: string \| number, label: ReactNode }>` | —       | Array of options                            |
| `onChange`  | `(value: string \| number) => void`                | —       | Callback when selection changes             |
| `value`     | `string \| number`                                 | —       | Controlled selected value                   |
| `defaultValue`| `string \| number`                               | —       | Uncontrolled initial value                  |
| `name`      | `string`                                           | —       | Name for grouping radios (HTML name attr)   |
| `className` | `string`                                           | —       | Custom class for styling                    |
| `disabled`  | `boolean`                                          | false   | Disables all radio options                  |
| `aria-label`| `string`                                           | —       | ARIA label for accessibility                |

## Accessibility
- Uses `role="radiogroup"` and `role="radio"` for items
- Keyboard navigation: arrow keys to move, space/enter to select
- Each radio is focusable and labeled
- Use `aria-checked`, `aria-label`, and `aria-labelledby` as needed

**Example Accessible Radio Group:**
```jsx
<fieldset>
  <legend>Choose a fruit</legend>
  <RadioGroup
    options={[
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' }
    ]}
    aria-label="Fruit selection"
  />
</fieldset>
```

## Best Practices
- Use for mutually exclusive choices
- Always provide clear labels
- Group related radios in a `fieldset` with a `legend`
- Use controlled mode for form validation
- Ensure visible and accessible focus state

## Troubleshooting
- If radios are not selectable, check `value`/`onChange` props
- For accessibility, ensure ARIA roles and labels are present
- Check that each option's value is unique

## Related Components
- [Switch](./switch.md) — For binary on/off
- [Tabs](./tabs.md) — For switching between views
- [Select](./select.md) — For dropdown single selection
- [Form](./form.md) — For grouping input fields