# Avatar Component

## Overview

The `Avatar` component visually represents a user, entity, or object. It supports images, initials, fallback icons, status indicators, and grouping. Avatars are accessible, customizable, and suitable for lists, cards, navigation, and more.

## Features
- **Image, Initials, or Icon**: Flexible fallback logic
- **Shape**: `circle` (default), `square`, `rounded`
- **Sizes**: `small`, `medium`, `large`, `xlarge`
- **Status Indicator**: Show online, offline, busy, or idle
- **Grouped Avatars**: Stack or overlap multiple avatars
- **Handles Image Errors**: Graceful fallback to initials or icon
- **Accessible**: ARIA, alt text, keyboard navigation
- **Customizable**: Theming and class overrides

## Usage

### Basic Usage
```jsx
<Avatar src="user.jpg" alt="Jane Doe" />
<Avatar initials="JD" />
<Avatar src="user.jpg" alt="Jane Doe" shape="square" />
<Avatar src="user.jpg" alt="Jane Doe" size="large" />
```

### Avatar with Status
```jsx
<Avatar src="user.jpg" alt="Jane Doe" status="online" />
```

### Grouped Avatars
```jsx
<Avatar.Group>
  <Avatar src="user1.jpg" alt="User One" />
  <Avatar src="user2.jpg" alt="User Two" />
  <Avatar initials="AB" />
</Avatar.Group>
```

### Avatar with Custom Icon Fallback
```jsx
<Avatar icon={<UserIcon />} />
```

## Prop Table
| Prop         | Type                                                           | Default     | Description                                        |
|--------------|----------------------------------------------------------------|-------------|----------------------------------------------------|
| `src`        | `string`                                                       | —           | Image URL                                          |
| `alt`        | `string`                                                       | —           | Alt text for accessibility                         |
| `initials`   | `string`                                                       | —           | Initials to show if image fails                    |
| `icon`       | `ReactNode`                                                    | —           | Custom icon fallback                               |
| `shape`      | `'circle' \| 'square' \| 'rounded'`                           | `'circle'`  | Avatar shape                                       |
| `size`       | `'small' \| 'medium' \| 'large' \| 'xlarge'`                  | `'medium'`  | Avatar size                                        |
| `status`     | `'online' \| 'offline' \| 'busy' \| 'idle'`                   | —           | Status indicator                                   |
| `className`  | `string`                                                       | —           | Custom class for styling                           |
| `tabIndex`   | `number`                                                       | —           | Tab order for keyboard navigation                  |
| `aria-label` | `string`                                                       | —           | ARIA label for screen readers                      |

### Avatar.Group Props
| Prop         | Type        | Default | Description                                        |
|--------------|------------|---------|----------------------------------------------------|
| `children`   | `ReactNode` | —       | Avatars to display in the group                    |
| `max`        | `number`    | —       | Max number to show before overflow (+N)            |
| `stacked`    | `boolean`   | `false` | Whether to overlap avatars                         |

## Accessibility
- Use `alt` for images, or `aria-label` for initials/icons
- Keyboard navigable with `tabIndex`
- Status indicators have accessible labels
- Grouped avatars support `aria-label` for describing the group
- Handles image load failures gracefully

**Example Accessible Avatar:**
```jsx
<Avatar initials="JS" aria-label="John Smith" />
```

## Best Practices
- Always provide `alt` or `aria-label` for accessibility
- Use status indicators for real-time presence
- Group avatars for teams or participants
- Use fallback logic: image → initials → icon
- Test avatar display on all backgrounds and sizes

## Troubleshooting
- If image does not load, ensure fallback (initials or icon) is visible
- For accessibility, verify all avatars have descriptive labels
- If avatars overlap incorrectly in groups, check stacking and spacing

## Related Components
- [Badge](./badge.md) — For status dots or overlays
- [Card](./card.md) — For avatars in user cards
- [Button](./button.md) — For avatar buttons or triggers
- [Tooltip](./tooltip.md) — For showing user names on hover

```
jsx
import { Avatar } from './components';

// Basic usage with an image
<Avatar src="user-profile.jpg" alt="User Name" />

// Avatar with initials
<Avatar initials="UN" />

// Square Avatar
<Avatar src="user-profile.jpg" alt="User Name" shape="square" />

// Large Avatar
<Avatar src="user-profile.jpg" alt="User Name" size="large" />

// Avatar with status indicator
<Avatar src="user-profile.jpg" alt="User Name" status="online" />

// Grouped Avatars
<Avatar.Group>
  <Avatar src="user-profile.jpg" alt="User Name 1" />
  <Avatar src="user-profile2.jpg" alt="User Name 2" />
  <Avatar initials="UN" />
</Avatar.Group>
```
## Props

| Prop          | Type                       | Description                                                                 | Default  |
| ------------- | -------------------------- | --------------------------------------------------------------------------- | -------- |
| `src`         | `string`                   | The URL of the image to display.                                         | `null`    |
| `alt`         | `string`                   | Alternative text for the image (accessibility).                            | `null`    |
| `initials`    | `string`                   | The initials to display when an image is not available.                  | `null`    |
| `shape`       | `'circle' \| 'square' \| 'rounded'` | The shape of the avatar.                                                  | `'circle'` |
| `size`        | `'small' \| 'medium' \| 'large' \| 'xlarge'` | The size of the avatar.                                                      | `'medium'` |
| `status`      | `'online' \| 'offline' \| 'busy' \| 'idle'` | Shows a status indicator.                                                      | `null` |

## Notes

*   The component should handle image loading errors gracefully.
*   Consider adding support for custom icons in the future.
*   The Avatar.Group component should stack Avatars correctly.
* Test the responsiveness of the component.