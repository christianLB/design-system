# Tooltip Component

## Overview

The Tooltip component displays a floating text label when users hover over, focus on, or tap an element. It's built with accessibility in mind and supports rich content, multiple positioning options, and customizable styling.

## Features

- **Multiple Positions**: Display tooltips on top, right, bottom, or left of the trigger element
- **Rich Content**: Supports any React node as content, not just text
- **Accessibility**: Follows WAI-ARIA design patterns for tooltips
- **Customizable**: Control appearance with CSS variables and class overrides
- **Controlled/Uncontrolled**: Can be controlled or uncontrolled
- **Delay**: Configurable show/hide delay
- **Theming**: Consistent theming with the rest of the design system
- **Responsive**: Works across all screen sizes

## Installation

```bash
npm install @radix-ui/react-tooltip
```

## Usage

### Basic Usage

```tsx
import { Tooltip } from "@/components/tooltip";

function MyComponent() {
  return (
    <Tooltip content="This is a tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

### Positions

```tsx
<div className="flex flex-wrap gap-4 p-8">
  <Tooltip content="Top tooltip" position="top">
    <button>Top</button>
  </Tooltip>
  
  <Tooltip content="Right tooltip" position="right">
    <button>Right</button>
  </Tooltip>
  
  <Tooltip content="Bottom tooltip" position="bottom">
    <button>Bottom</button>
  </Tooltip>
  
  <Tooltip content="Left tooltip" position="left">
    <button>Left</button>
  </Tooltip>
</div>
```

### Variants

```tsx
<div className="flex flex-wrap gap-4">
  <Tooltip content="Default tooltip" variant="default">
    <button>Default</button>
  </Tooltip>
  
  <Tooltip content="Primary tooltip" variant="primary">
    <button>Primary</button>
  </Tooltip>
  
  <Tooltip content="Success tooltip" variant="success">
    <button>Success</button>
  </Tooltip>
  
  <Tooltip content="Warning tooltip" variant="warning">
    <button>Warning</button>
  </Tooltip>
  
  <Tooltip content="Danger tooltip" variant="danger">
    <button>Danger</button>
  </Tooltip>
</div>
```

### With Delay

```tsx
<Tooltip 
  content="This tooltip appears after 500ms" 
  delay={500}
>
  <button>Hover me (500ms delay)</button>
</Tooltip>
```

### Controlled Tooltip

```tsx
function ControlledTooltipExample() {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button onClick={() => setIsOpen(true)}>Show Tooltip</button>
        <button onClick={() => setIsOpen(false)}>Hide Tooltip</button>
      </div>
      
      <Tooltip 
        content="This is a controlled tooltip"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <button>Hover or use buttons above</button>
      </Tooltip>
    </div>
  );
}
```

### With Rich Content

```tsx
import { Info, ExternalLink } from 'lucide-react';

function RichTooltip() {
  return (
    <Tooltip 
      content={
        <div className="space-y-2 w-[240px]">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Documentation</h4>
            <Info className="w-4 h-4" />
          </div>
          <p className="text-sm text-muted-foreground">
            Learn more about our design system and how to use these components effectively.
          </p>
          <a 
            href="https://example.com/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View Documentation
            <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        </div>
      }
    >
      <button className="flex items-center gap-1">
        <Info className="w-4 h-4" />
        <span>Help & Documentation</span>
      </button>
    </Tooltip>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | The trigger element |
| `content` | `ReactNode` | - | The content to show in the tooltip |
| `position` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | The position of the tooltip relative to the trigger |
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | The visual style variant |
| `delay` | `number` | `0` | Delay in milliseconds before showing/hiding the tooltip |
| `isOpen` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when the open state changes |
| `className` | `string` | - | Additional CSS class for the tooltip content |
| `showArrow` | `boolean` | `true` | Whether to show the arrow pointing to the trigger |
| `maxWidth` | `string \| number` | `'240px'` | Maximum width of the tooltip |

## Styling

The Tooltip component uses CSS variables for theming. You can override these variables to customize the appearance:

```css
:root {
  --tooltip-bg: #1f2937;
  --tooltip-text: #ffffff;
  --tooltip-padding: 0.5rem 0.75rem;
  --tooltip-border-radius: 0.375rem;
  --tooltip-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tooltip-arrow-size: 8px;
  --tooltip-z-index: 50;
  
  /* Variants */
  --tooltip-primary-bg: #3b82f6;
  --tooltip-success-bg: #10b981;
  --tooltip-warning-bg: #f59e0b;
  --tooltip-danger-bg: #ef4444;
}
```

## Accessibility

The Tooltip component follows WAI-ARIA design patterns and includes:

- Proper ARIA attributes
- Keyboard navigation
- Screen reader support
- Focus management
- Dismiss on Escape key
- Dismiss on clicking outside

## Best Practices

- Keep tooltip text concise and helpful
- Don't put interactive content in tooltips (use Popover instead)
- Use appropriate positioning to avoid tooltips being cut off
- Ensure sufficient color contrast for readability
- Test with keyboard navigation and screen readers
- Consider mobile touch interactions
- Don't rely solely on hover for important information (also support focus and touch)