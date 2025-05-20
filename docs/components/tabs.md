# Tabs Component

## Overview

The `Tabs` component allows users to switch between different views or content sections within the same context. Tabs are ideal for organizing related content and improving navigation without leaving the page.

## Features
- **Multiple Tabs**: Switch between different panels
- **Controlled/Uncontrolled**: Supports both usage patterns
- **Keyboard Navigation**: Arrow keys to move, Enter/Space to select
- **Customizable Labels**: Text, icons, or custom nodes
- **Disabled Tabs**: Prevent interaction with certain tabs
- **Responsive**: Adapts to screen size
- **Accessible**: ARIA roles and keyboard support

## Usage

### Basic Usage
```jsx
<Tabs>
  <Tab label="Profile">Profile content</Tab>
  <Tab label="Settings">Settings content</Tab>
</Tabs>
```

### Controlled Tabs
```jsx
const [active, setActive] = useState(0);
<Tabs value={active} onChange={setActive}>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
</Tabs>
```

### With Icons
```jsx
<Tabs>
  <Tab label={<><UserIcon /> User</>}>User panel</Tab>
  <Tab label={<><SettingsIcon /> Settings</>}>Settings panel</Tab>
</Tabs>
```

## Prop Table
| Prop        | Type           | Default   | Description                                |
|-------------|----------------|-----------|--------------------------------------------|
| `value`     | `number`       | —         | Controlled active tab index                 |
| `defaultValue`| `number`     | 0         | Uncontrolled initial tab index              |
| `onChange`  | `(index: number) => void`| — | Callback when tab changes                   |
| `children`  | `ReactNode`    | —         | Tab components as children                  |
| `className` | `string`       | —         | Custom class for styling                    |
| `aria-label`| `string`       | —         | Accessible label for screen readers         |

### Tab Props
| Prop        | Type           | Default   | Description                                |
|-------------|----------------|-----------|--------------------------------------------|
| `label`     | `ReactNode`    | —         | Tab label (text, icon, or node)             |
| `disabled`  | `boolean`      | false     | Disables the tab                            |
| `className` | `string`       | —         | Custom class for styling                    |

## Accessibility
- Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`
- Keyboard navigation: arrow keys to move, Enter/Space to select
- Indicates active tab with `aria-selected`
- Disabled tabs have `aria-disabled`
- Each tab controls a corresponding panel via `aria-controls`

**Example Accessible Tabs:**
```jsx
<Tabs aria-label="Profile and Settings">
  <Tab label="Profile">Profile content</Tab>
  <Tab label="Settings">Settings content</Tab>
</Tabs>
```

## Best Practices
- Use tabs for related views, not unrelated navigation
- Keep tab labels short and clear
- Always provide an accessible label
- Avoid too many tabs (prefer 2–7)
- Ensure panels are focusable and visible when active

## Troubleshooting
- If tabs are not switching, check `value`/`onChange` props
- For accessibility, ensure ARIA roles and labels are present
- If styling is off, check parent container and custom classes

## Related Components
- [Radio Group](./radio-group.md) — For single-choice selection
- [Accordion](./accordion.md) — For collapsible panels
- [Button](./button.md) — For actions
- [Card](./card.md) — For tabbed card layouts
