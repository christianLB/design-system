# Avatar Component

## Overview

The Avatar component is used to represent a user, entity, or object visually. It typically displays an image, an icon, or initials. This component is designed to be flexible in terms of size and shape, allowing it to be used in various contexts throughout the application.

## Features

*   **Image Display:** Ability to display a user's profile picture or any other relevant image.
*   **Fallback Support:** Option to show initials or a placeholder icon when an image is not available.
*   **Shape Variety:** Support for different shapes, including:
    *   Circle (default)
    *   Square
    *   Rounded Square
*   **Size Flexibility:** Configurable to various sizes (e.g., small, medium, large, extra-large).
*   **Accessibility:** Proper ARIA attributes and keyboard navigation support.
*   **Customizable:** Easy to customize with themes and styles.
*   **Status Indicator:** Optionally show a status indicator (online, offline, busy, etc.)
* **Grouped:** Multiple Avatars can be shown together in a stacked or grouped way.

## Dependencies

*   **React:** The Avatar component is a React component and thus depends on the React library.
*   **CSS Modules/Styled Components:** For styling and theming.
* **clsx:** A utility for constructing `className` strings conditionally.
*   **Image Handling Library (Optional):** For advanced image manipulation or lazy loading, libraries like `react-lazy-load-image-component` could be used.

## Usage
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