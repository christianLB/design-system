# Card Component

## Overview

The `Card` component is a flexible, accessible container for grouping related content and actions. Cards are commonly used to present information in a visually distinct, easily scannable format. They can contain text, images, actions, media, and even other components, and are ideal for dashboards, product listings, feature highlights, and more.

Cards follow best practices for accessibility and design, supporting keyboard navigation, semantic HTML, and theming. They are highly composable, supporting headers, footers, media, and custom layouts.

## Features

- **Multiple Variants**: Default, muted, destructive, and outline styles for different contexts
- **Composable Layouts**: Header, title, content, footer, and media sections
- **Actionable**: Supports buttons, links, and interactive elements
- **Accessibility**: Semantic HTML, ARIA roles, and keyboard navigation
- **Responsive**: Adapts to all device sizes and layouts
- **Theming**: Customizable via CSS variables and dark mode support
- **Customizable**: Add custom classes, inline styles, and slot content
- **Performance**: Lightweight, no unnecessary dependencies
- **Integrates with Grid**: Works seamlessly in grid and masonry layouts

## Installation

```bash
# If using the component directly
npm install class-variance-authority clsx tailwind-merge
```

## Usage

### Basic Usage

```tsx
import { Card } from "@/components/card";

function MyComponent() {
  return (
    <Card>
      <h3>Card Title</h3>
      <p>This is the card content. You can put any React node here.</p>
    </Card>
  );
}
```

### With Header, Content, and Footer

```tsx
<Card>
  <Card.Header>
    <h3>Card Title</h3>
    <p className="text-sm text-muted-foreground">Optional subtitle</p>
  </Card.Header>
  <Card.Content>
    <p>Main card content goes here. This can be any React node.</p>
  </Card.Content>
  <Card.Footer className="flex justify-between">
    <span className="text-sm text-muted-foreground">Last updated: 2 hours ago</span>
    <Button size="sm">Action</Button>
  </Card.Footer>
</Card>
```

### Variants

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card variant="default">
    <Card.Header>Default Card</Card.Header>
    <Card.Content>Default style with subtle shadow</Card.Content>
  </Card>
  <Card variant="muted">
    <Card.Header>Muted Card</Card.Header>
    <Card.Content>Subtle background for less emphasis</Card.Content>
  </Card>
  <Card variant="destructive">
    <Card.Header>Destructive Card</Card.Header>
    <Card.Content>For error states or destructive actions</Card.Content>
  </Card>
  <Card variant="outline">
    <Card.Header>Outline Card</Card.Header>
    <Card.Content>Subtle border with no shadow</Card.Content>
  </Card>
</div>
```

### Card with Media and Actions

```tsx
<Card className="max-w-sm">
  <Card.Header>
    <img 
      src="/placeholder.svg" 
      alt="Placeholder" 
      className="w-full h-48 object-cover rounded-t-lg -mx-4 -mt-4 mb-4"
    />
    <h3>Featured Post</h3>
  </Card.Header>
  <Card.Content>
    <p>This card includes a header image and some sample content.</p>
  </Card.Content>
  <Card.Footer className="justify-end">
    <Button variant="ghost" size="sm">Read more</Button>
  </Card.Footer>
</Card>
```

### Selectable Card

```tsx
import { useState } from 'react';

function SelectableCard() {
  const [selected, setSelected] = useState(false);
  return (
    <Card
      tabIndex={0}
      aria-pressed={selected}
      className={`cursor-pointer transition-all duration-200 border-2 ${selected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-transparent'}`}
      onClick={() => setSelected((s) => !s)}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSelected((s) => !s); }}
    >
      <Card.Header>
        <h3>Select Me!</h3>
      </Card.Header>
      <Card.Content>
        <p>This card can be selected by click or keyboard.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {selected ? 'Selected' : 'Not selected'}
        </p>
      </Card.Content>
    </Card>
  );
}
```

### Interactive Card (with hover effect)

```tsx
import { useState } from 'react';

function InteractiveCard() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card 
      className={`transition-all duration-200 ${isHovered ? 'shadow-lg scale-[1.03]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Header>
        <h3>Interactive Card</h3>
      </Card.Header>
      <Card.Content>
        <p>Hover over this card to see the elevation change.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Current state: {isHovered ? 'Hovered' : 'Idle'}
        </p>
      </Card.Content>
    </Card>
  );
}
```

### Cards in a Responsive Grid

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {[1,2,3,4,5,6].map(i => (
    <Card key={i}>
      <Card.Header>
        <h3>Card {i}</h3>
      </Card.Header>
      <Card.Content>
        <p>This is card number {i}.</p>
      </Card.Content>
    </Card>
  ))}
</div>
```


## Props

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'muted' \| 'destructive' \| 'outline'` | `'default'` | The visual style variant of the card |
| `className` | `string` | - | Additional CSS class names |
| `children` | `ReactNode` | - | The content of the card |

### Card.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS class names |
| `children` | `ReactNode` | - | The content of the header |

### Card.Content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS class names |
| `children` | `ReactNode` | - | The main content of the card |

### Card.Footer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | - | Additional CSS class names |
| `children` | `ReactNode` | - | The content of the footer |

## Styling

The Card component uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --card-bg: #ffffff;
  --card-foreground: #1f2937;
  --card-border: #e5e7eb;
  --card-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --card-radius: 0.5rem;
  --card-padding: 1.5rem;
  
  /* Variants */
  --card-muted-bg: #f9fafb;
  --card-destructive-bg: #fef2f2;
  --card-destructive-foreground: #991b1b;
  --card-outline-border: #3b82f6;
}

/* Dark mode overrides */
.dark {
  --card-bg: #1f2937;
  --card-foreground: #f9fafb;
  --card-border: #374151;
  --card-muted-bg: #111827;
  --card-destructive-bg: #450a0a;
  --card-destructive-foreground: #fecaca;
  --card-outline-border: #60a5fa;
}
```

## Accessibility

The Card component is designed for accessibility and follows WAI-ARIA best practices:

- **Semantic HTML**: Uses `<section>`, `<header>`, `<footer>`, and headings for structure.
- **Keyboard Navigation**: All focusable elements inside the card are accessible via keyboard (`Tab`, `Shift+Tab`). For interactive cards, add `tabIndex={0}` and ARIA roles as needed.
- **Screen Reader Support**: Use headings (`<h2>`, `<h3>`, etc.) for card titles and ensure all actions have accessible labels.
- **Landmark Roles**: For important cards, add `role="region"` and `aria-label` for better navigation.
- **Focus Management**: If a card is interactive or focusable, provide visible focus indicators.
- **Alt Text**: All images/media in cards should have descriptive `alt` attributes.

**Example: Accessible Interactive Card**

```tsx
<Card tabIndex={0} role="button" aria-pressed={selected} aria-label="Selectable card: Feature X">
  <Card.Header>
    <h3>Feature X</h3>
  </Card.Header>
  <Card.Content>
    <p>This card can be selected by keyboard or mouse.</p>
  </Card.Content>
</Card>
```

## Best Practices

### When to Use
- Grouping related content and actions
- Displaying collections of items (e.g., products, articles)
- Dashboards and data visualizations
- Media galleries and listings
- Feature highlights and callouts

### When Not to Use
- For simple text containers (use `<div>` or `<section>` instead)
- As a replacement for modals/dialogs (use [Dialog](./dialog.md))
- For highly interactive elements needing immediate attention
- When content is too complex for a card (prefer a full page)

### Design & Implementation Tips
- **Keep Cards Focused**: Limit each card to a single topic or entity.
- **Consistent Sizing**: Use consistent dimensions in grids for visual harmony.
- **Clear Hierarchy**: Use semantic headings for titles and subtitles.
- **Accessible Actions**: Ensure all buttons/links inside cards are accessible and have visible focus.
- **Loading & Empty States**: Show skeletons or placeholders while loading content.
- **Responsive Layouts**: Test cards at various breakpoints and orientations.
- **Performance**: Lazy-load images and heavy content in cards.
- **Contrast & Readability**: Ensure sufficient contrast for text and backgrounds.
- **Touch Targets**: Make interactive areas at least 44x44px for mobile.

## Troubleshooting

### Card content overflows or is cut off
- Check for fixed heights or `overflow: hidden` on parent containers.
- Use `overflow-auto` or `overflow-y-scroll` for scrollable card content.

### Card is not focusable or accessible
- Add `tabIndex={0}` to make the card focusable.
- Use ARIA roles (`role="button"`, `aria-pressed`, etc.) for interactive cards.
- Ensure all actions have accessible labels and visible focus rings.

### Card actions are not keyboard accessible
- All buttons and links inside the card should be reachable via keyboard (`Tab`).
- For custom interactive cards, handle `onKeyDown` for `Enter` and `Space` keys.

### Card layout breaks in grid
- Use consistent padding/margins and test with various content lengths.
- Use CSS Grid or Flexbox for robust layouts.

### Card shadows or borders are missing
- Check for CSS overrides or missing CSS variables.
- Ensure the correct variant is used (`variant="outline"`, etc.).

## Related Components

- [Grid](./grid.md) — Responsive card layouts
- [Tabs](./tabs.md) — Organize multiple cards in tabs
- [Accordion](./accordion.md) — Collapsible card content
- [Dialog](./dialog.md) — Modal card-like overlays
- [Button](./button.md) — For card actions
- [Input](./input.md) — For forms inside cards
- [Select](./select.md) — For dropdowns in cards