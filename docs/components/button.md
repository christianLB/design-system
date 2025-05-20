# Button Component

## Overview

The Button component is a versatile and interactive element that triggers actions or events when clicked. It supports multiple variants, sizes, and states to accommodate various use cases across the application.

## Features

- **Multiple Variants**: Default, destructive, outline, secondary, ghost, and link styles
- **Sizes**: Small, default, large, and icon-only options
- **Accessibility**: Fully accessible with proper ARIA attributes and keyboard navigation
- **Icon Support**: Easy integration with icons from any icon library
- **Loading State**: Built-in loading state with spinner
- **Full Width**: Option to span the full width of its container
- **Theming**: Customizable theming through CSS variables
- **Polymorphic**: Can be rendered as any HTML element or React component

## Installation

```bash
# If using the component library directly
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

## Usage

### Basic Usage

```tsx
import { Button } from "@/components/button";

function MyComponent() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}
```

### Variants

```tsx
function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Sizes

```tsx
function ButtonSizes() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Icon name="settings" />
      </Button>
    </div>
  );
}
```

### With Icons

```tsx
import { Settings, Download, Plus } from "lucide-react";

function ButtonWithIcons() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### Loading State

```tsx
function LoadingButton() {
  const [isLoading, setIsLoading] = React.useState(false);
  
  return (
    <Button 
      onClick={() => {
        setIsLoading(true);
        // Simulate async operation
        setTimeout(() => setIsLoading(false), 2000);
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}
```

### Full Width

```tsx
<Button className="w-full">Full Width Button</Button>
```

### As Child (Polymorphic)

```tsx
import { Button } from "@/components/button";
import { Link } from "react-router-dom";

function ButtonAsLink() {
  return (
    <Button asChild>
      <Link to="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | The visual style variant of the button |
| `size` | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `asChild` | `boolean` | `false` | Render as the child component (useful for Next.js Link, react-router, etc.) |
| `className` | `string` | - | Additional CSS class names |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | The type of the button |
| `isLoading` | `boolean` | `false` | Shows a loading spinner and disables the button |
| `leftIcon` | `ReactNode` | - | Icon to display on the left side of the button text |
| `rightIcon` | `ReactNode` | - | Icon to display on the right side of the button text |

## Styling

The Button component uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --button-primary: 222.2 47.4% 11.2%;
  --button-primary-foreground: 210 40% 98%;
  --button-primary-hover: 222.2 47.4% 15%;
  
  --button-secondary: 210 40% 96.1%;
  --button-secondary-foreground: 222.2 47.4% 11.2%;
  --button-secondary-hover: 210 40% 90%;
  
  --button-destructive: 0 84.2% 60.2%;
  --button-destructive-foreground: 210 40% 98%;
  --button-destructive-hover: 0 84.2% 55%;
  
  --button-outline: 214.3 31.8% 91.4%;
  --button-outline-foreground: 222.2 47.4% 11.2%;
  --button-outline-hover: 210 40% 96.1%;
  
  --button-ghost-foreground: 240 4% 46%;
  --button-ghost-hover: 240 5% 96%;
  
  --button-link-foreground: 240 5.9% 10%;
  --button-link-underline: 240 5.9% 10%;
  
  --button-focus-ring: 0 0 0 3px rgba(66, 153, 225, 0.5);
  --button-border-radius: 0.375rem;
  --button-font-weight: 500;
  --button-transition: all 0.2s ease-in-out;
}

/* Dark mode overrides */
.dark {
  --button-primary: 210 40% 96.1%;
  --button-primary-foreground: 222.2 47.4% 11.2%;
  --button-primary-hover: 210 40% 90%;
  
  --button-secondary: 240 3.7% 15.9%;
  --button-secondary-foreground: 210 40% 98%;
  --button-secondary-hover: 240 3.7% 20%;
  
  --button-outline: 240 3.7% 15.9%;
  --button-outline-foreground: 210 40% 98%;
  --button-outline-hover: 240 3.7% 20%;
  
  --button-ghost-foreground: 240 5% 84%;
  --button-ghost-hover: 240 3.7% 15.9%;
  
  --button-link-foreground: 240 5% 96%;
  --button-link-underline: 240 5% 96%;
}
```

## Accessibility

The Button component follows WAI-ARIA design patterns and includes:

- Proper ARIA attributes based on button state
- Keyboard navigation (Tab, Space, Enter)
- Focus management with visible focus states
- Screen reader support
- Proper role="button" for non-button elements
- Disabled state handling

## Best Practices

### When to Use

- Triggering actions (submit, cancel, delete)
- Opening modals or dialogs
- Toggling UI states
- Navigation (when combined with `asChild` and a link component)

### When Not to Use

- For navigation without an action (use a Link component instead)
- For toggling UI that doesn't trigger an action (consider a Toggle component)
- For destructive actions without proper confirmation

### Implementation Tips

1. **Icons**: Always provide text alongside icons for better accessibility
2. **Loading States**: Use the `isLoading` prop for async actions
3. **Destructive Actions**: Use the `destructive` variant for destructive actions
4. **Keyboard Navigation**: Ensure buttons are reachable via keyboard
5. **Focus States**: Don't remove focus outlines without providing an alternative
6. **Button vs Link**: Use `<a>` for navigation and `<button>` for actions
7. **Form Buttons**: Always specify `type="submit"` or `type="button"`

## Migration Guide

### From v1 to v2

- The `color` prop has been replaced with `variant`
- The `primary` variant is now the `default` variant
- The `text` variant has been renamed to `ghost`
- Icons are now passed as children instead of using `icon` prop
- The `loading` prop has been renamed to `isLoading`

### From v2 to v3

- Added support for CSS variables for theming
- Improved dark mode support
- Better TypeScript types
- More consistent prop naming

## Related Components

- [Icon Button](./icon-button.md) - Icon-only button for compact UIs
- [Button Group](./button-group.md) - Group related buttons together
- [Dropdown Menu](./dropdown-menu.md) - For buttons that trigger a dropdown
- [Tooltip](./tooltip.md) - For additional information on hover
