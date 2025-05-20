# Breadcrumb Component

## Overview

The `Breadcrumb` component displays the current page's location within a navigational hierarchy. It helps users understand their position and easily navigate back to previous pages. Breadcrumbs are accessible, customizable, and responsive.

## Features
- **Hierarchical Display**: Shows navigation path
- **Dynamic Items**: Accepts an array of objects for flexible paths
- **Navigable Links**: Each item is a clickable link
- **Custom Separator**: Supports custom character or icon between items
- **Responsive**: Adapts to various screen sizes
- **Accessible**: ARIA roles, keyboard navigation, and semantic markup

## Usage

### Basic Breadcrumb
```jsx
<Breadcrumb items={[
  { name: 'Home', href: '/' },
  { name: 'Library', href: '/library' },
  { name: 'Data', href: '/library/data' }
]} />
```

### Custom Separator
```jsx
<Breadcrumb
  items={[
    { name: 'Home', href: '/' },
    { name: 'Profile', href: '/profile' }
  ]}
  separator={<ChevronRightIcon />}
/>
```

### With Last Item as Current Page
```jsx
<Breadcrumb
  items={[
    { name: 'Home', href: '/' },
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile', current: true }
  ]}
/>
```

## Prop Table
| Prop        | Type                | Default | Description                                                      |
|-------------|---------------------|---------|------------------------------------------------------------------|
| `items`     | `Array<{ name: string, href: string, current?: boolean }>` | —       | Breadcrumb items (name, href, optional current flag)              |
| `separator` | `string \| ReactNode`| `'>'`   | Separator character or icon                                      |
| `className` | `string`            | —       | Custom class for styling                                         |

## Accessibility
- Uses `nav` with `aria-label="Breadcrumb"`
- Uses `ol`/`li` for semantic structure
- Last item has `aria-current="page"`
- Links are keyboard accessible
- Separator is hidden from screen readers

**Example Accessible Breadcrumb:**
```jsx
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li aria-current="page">Profile</li>
  </ol>
</nav>
```

## Best Practices
- Use breadcrumbs for deep navigation, not for top-level pages
- Show the full path from the homepage/root
- Use clear, concise names for each item
- Mark the current page with `aria-current="page"`
- Hide separators from screen readers

## Troubleshooting
- If links are not working, check the `href` values
- For accessibility, ensure correct ARIA roles and semantic markup
- Adjust separator for visual clarity on all backgrounds

## Related Components
- [Tabs](./tabs.md) — For horizontal navigation
- [Card](./card.md) — For embedding breadcrumbs in headers
- [Button](./button.md) — For navigation actions
- [Tooltip](./tooltip.md) — For extra info on breadcrumb items