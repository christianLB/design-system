# Badge Component

## Overview

The `Badge` component is a small, visually distinct element for displaying status, categories, tags, or counts. It supports multiple variants and sizes, is accessible, and fits seamlessly into lists, cards, buttons, and more.

## Features
- **Variants**: `primary`, `secondary`, `success`, `error`, `warning`, `info`
- **Sizes**: `small`, `medium`, `large`
- **Custom Content**: Any string or React node as children
- **Rounded Corners**: Consistent pill/rounded appearance
- **Accessible**: ARIA roles and labeling support
- **Themed**: Customizable with Tailwind CSS or your theme

## Usage

### Basic Badges
```jsx
<Badge>Default</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning" size="large">Warning</Badge>
<Badge variant="info" size="small">Info</Badge>
```

### Badge as Status Indicator
```jsx
<UserAvatar>
  <Badge variant="success" size="small" aria-label="Online" />
</UserAvatar>
```

### Badge with Count
```jsx
<Button>
  Notifications <Badge variant="primary">4</Badge>
</Button>
```

### Badge with Custom Content
```jsx
<Badge variant="secondary"><Icon /> New</Badge>
```

## Prop Table
| Prop       | Type        | Default   | Description                                                        |
|------------|-------------|-----------|--------------------------------------------------------------------|
| `variant`  | `string`    | `primary` | Visual style: "primary", "secondary", "success", "error", "warning", "info" |
| `size`     | `string`    | `medium`  | Size: "small", "medium", "large"                                  |
| `children` | `ReactNode` | —         | Content to display inside the badge                                |
| `className`| `string`    | —         | Custom class for styling                                           |
| `aria-label`| `string`   | —         | Accessible label for screen readers                                |

## Accessibility
- Use `aria-label` for badges that are not self-descriptive (e.g., status dots)
- Ensure color contrast meets WCAG guidelines
- Use as a supplement to text, not as the only indicator of state
- Keyboard and screen reader accessible

**Example Accessible Badge:**
```jsx
<Badge variant="success" aria-label="Online" />
```

## Best Practices
- Use badges for concise, at-a-glance information (statuses, counts, tags)
- Pair badges with text or icons for clarity
- Avoid using only color to convey meaning
- Use appropriate size for context (small for icons, medium/large for text)
- Test badge contrast on all backgrounds

## Troubleshooting
- If badge is not visible, check variant and background contrast
- For accessibility issues, ensure `aria-label` is set and colors are distinguishable
- If badge is misaligned, adjust parent layout or use `className` for spacing

## Related Components
- [Alert](./alert.md) — For larger, actionable feedback
- [Button](./button.md) — For badges as notification dots
- [Card](./card.md) — For badges as category or status indicators
- [Tooltip](./tooltip.md) — For additional info on badge hover