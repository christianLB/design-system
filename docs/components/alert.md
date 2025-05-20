# Alert Component

## Overview

The `Alert` component is used to display important feedback messages to the user. It supports multiple variants (info, success, warning, error) and can include a title, description, actions, and an optional close button. Alerts are accessible, customizable, and suitable for both inline and global notifications.

## Features
- **Variants**: `info`, `success`, `warning`, `error` for different message types
- **Title & Description**: Optional title and rich content
- **Closeable**: Optional close button for dismissible alerts
- **Custom Actions**: Support for buttons/links inside the alert
- **Accessible**: Uses ARIA roles and keyboard navigation
- **Themed**: Supports custom styles and theming

## Usage

### Basic Alerts
```jsx
<Alert variant="info" title="Did you know?">
  This is an informational alert.
</Alert>

<Alert variant="success" title="Success!">
  Your action has been completed successfully.
</Alert>

<Alert variant="warning" title="Warning!">
  Be careful, this might cause issues.
</Alert>

<Alert variant="error" title="Error!">
  Something went wrong. Please try again.
</Alert>
```

### Dismissible Alert
```jsx
<Alert variant="info" title="Heads up!" onClose={() => setShow(false)}>
  This alert can be dismissed by the user.
</Alert>
```

### Alert with Actions
```jsx
<Alert variant="success" title="Saved!">
  <p>Your changes have been saved.</p>
  <Button variant="link" size="sm">Undo</Button>
</Alert>
```

## Prop Table
| Prop       | Type        | Default | Description                                                        |
|------------|-------------|---------|--------------------------------------------------------------------|
| `variant`  | `string`    | `info`  | The type of alert: "info", "success", "warning", or "error"        |
| `title`    | `string`    | —       | The title of the alert                                             |
| `children` | `ReactNode` | —       | The content to be displayed inside the alert                       |
| `onClose`  | `() => void`| —       | Callback fired when the close button is clicked (if present)       |
| `closeLabel`| `string`   | `"Close"`| Accessible label for the close button                              |

## Accessibility
- Uses `role="alert"` for assertive announcements
- Title is rendered as a heading for screen readers
- Close button is keyboard accessible and labeled
- Supports ARIA attributes for custom actions inside alerts

**Example Accessible Alert:**
```jsx
<Alert role="alert" title="Error!" closeLabel="Dismiss alert">
  Something went wrong.
</Alert>
```

## Best Practices
- Use alerts for important, actionable, or time-sensitive messages
- Prefer concise, clear language in titles and descriptions
- Place alerts near related content or at the top of the page
- Use the correct variant for the message type
- Make dismissible only when appropriate
- Ensure all actions are accessible by keyboard

## Troubleshooting
- If the alert does not appear, check the `variant` and `title` props
- If the close button does not work, ensure `onClose` is provided
- For accessibility issues, check ARIA roles and close button labeling

## Related Components
- [Badge](./badge.md) — For status indicators
- [Dialog](./dialog.md) — For modal feedback
- [Tooltip](./tooltip.md) — For contextual hints
- [Button](./button.md) — For alert actions