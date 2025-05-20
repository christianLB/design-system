# Accordion Component

## Overview

The `Accordion` component displays collapsible content sections, allowing users to expand or collapse each section to reveal or hide content. It is ideal for organizing large amounts of information in a compact, accessible, and user-friendly way.

## Features
- **Collapsible Sections**: Expand/collapse content panels individually
- **Single or Multiple Open**: Support for single-open (radio) or multi-open (checkbox) behavior
- **Keyboard Navigation**: Fully keyboard accessible
- **Dynamic Content**: Render any React node in each section
- **Customizable Styling**: Theming and custom classes supported
- **ARIA Roles**: Accessible by screen readers

## Dependencies
- **React**: Built with React
- **@radix-ui/react-accordion**: For accessibility and keyboard navigation (if used)

## Usage

### Basic Accordion

```tsx
import { Accordion } from "@/components/accordion";

const items = [
  { title: "Section 1", content: "Content for section 1." },
  { title: "Section 2", content: "Content for section 2." },
  { title: "Section 3", content: "Content for section 3." },
];

function BasicAccordion() {
  return <Accordion items={items} />;
}
```

### Accordion with Custom Content

```tsx
const items = [
  {
    title: "FAQ 1",
    content: (
      <div>
        <p>This is a detailed answer with <strong>rich content</strong>.</p>
        <ul>
          <li>Point A</li>
          <li>Point B</li>
        </ul>
      </div>
    ),
  },
  // ...more items
];
```

### Controlled Accordion (Open State Controlled by Parent)

```tsx
import { useState } from "react";

function ControlledAccordion() {
  const [openIndexes, setOpenIndexes] = useState([0]);
  return (
    <Accordion
      items={items}
      openIndexes={openIndexes}
      onOpenChange={setOpenIndexes}
      multiple
    />
  );
}
```

### Single-Open (Radio) Accordion

```tsx
<Accordion items={items} multiple={false} />
```

### Accordion with Icons

```tsx
<Accordion
  items={items}
  renderIcon={open => open ? <ChevronDown /> : <ChevronRight />}
/>
```

## Prop Table

| Prop         | Type                           | Default   | Description                                      |
|--------------|--------------------------------|-----------|--------------------------------------------------|
| `items`      | `{ title: ReactNode, content: ReactNode }[]` | —         | Sections to display                              |
| `multiple`   | `boolean`                      | `false`   | Allow multiple sections to be open at once        |
| `openIndexes`| `number[]`                     | —         | Controlled open section indexes                  |
| `onOpenChange`| `(indexes: number[]) => void`  | —         | Callback when open sections change               |
| `renderIcon` | `(open: boolean) => ReactNode` | —         | Custom icon for section headers                  |
| `className`  | `string`                       | —         | Custom class for the root accordion              |

## Accessibility

- Uses appropriate ARIA roles: `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`
- Keyboard navigation: `Tab` to move between headers, `Enter`/`Space` to toggle
- Focus indicators on headers
- Screen reader friendly: Announce open/closed state and section titles

**Example Accessible Header:**
```tsx
<button aria-expanded={open} aria-controls={`section-${i}`} id={`header-${i}`}>Section</button>
```

## Best Practices
- Use for FAQs, settings, or content organization—not for navigation
- Keep section titles short and descriptive
- Avoid nesting accordions deeply
- Ensure all content is keyboard accessible
- Provide visible focus indicators
- Use controlled mode for advanced state management

## Troubleshooting
- If sections do not open/close, check `items` prop and unique keys
- For accessibility issues, verify ARIA attributes and keyboard navigation
- If animations are choppy, check for heavy content or unnecessary re-renders

## Related Components
- [Tabs](./tabs.md) — For switching between content panels
- [Dialog](./dialog.md) — For modal content
- [Popover](./popover.md) — For floating contextual panels
- [Card](./card.md) — For grouped content