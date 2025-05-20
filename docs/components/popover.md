# Popover Component

## Overview

The `Popover` component displays a floating panel of content anchored to a trigger element. It is ideal for showing additional information, actions, or interactive content in a contextually relevant way—without disrupting the main flow of the page. Built with Radix UI primitives, it ensures accessibility, focus management, and theming.

## Features
- **Accessible**: WAI-ARIA compliant, keyboard navigable, and screen reader friendly
- **Flexible Placement**: Position popovers above, below, left, or right of the trigger
- **Focus Management**: Traps focus within the popover and restores on close
- **Customizable Layout**: Header, content, footer, and custom sections
- **Overlay & Portal**: Renders above all content and outside the DOM tree
- **Close Controls**: Close via button, outside click, or Escape key
- **Composable**: Use subcomponents for header, footer, title, description, and actions
- **Theming**: Fully themeable with CSS variables and dark mode support

## Subcomponents
- **Popover**: Context provider and root for the popover
- **PopoverTrigger**: Element that opens the popover (usually a Button)
- **PopoverContent**: The main floating panel for your content
- **PopoverHeader**: Groups title and description (optional)
- **PopoverFooter**: Groups actions at the bottom (optional)
- **PopoverTitle**: The accessible heading for the popover
- **PopoverDescription**: Additional context for screen readers
- **PopoverClose**: Button or element to close the popover

## Dependencies
- `@radix-ui/react-popover`: Core popover primitives
- `lucide-react`: For close icons
- `lib/utils`: Utility for class name merging

## Usage

### Basic Popover

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose
} from "@/components/popover";
import { Button } from "@/components/button";

function BasicPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content here.</p>
        <PopoverClose asChild>
          <Button>Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
```

### Popover with Header and Footer

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverFooter,
  PopoverClose
} from "@/components/popover";
import { Button } from "@/components/button";

function HeaderFooterPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>This is the Popover Description</PopoverDescription>
        </PopoverHeader>
        <p>This is the content of the popover.</p>
        <PopoverFooter>
          <PopoverClose asChild>
            <Button variant="outline">Cancel</Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button>Confirm</Button>
          </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```

### Controlled Popover (Open State Controlled by Parent)

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose
} from "@/components/popover";
import { Button } from "@/components/button";
import { useState } from "react";

function ControlledPopover() {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Open Controlled Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>This popover's open state is controlled by the parent.</p>
        <PopoverClose asChild>
          <Button>Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
```

### Popover Placement Example

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button>Show Above</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <p>This popover appears above the trigger.</p>
  </PopoverContent>
</Popover>
```

### Popover with Form

```tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverFooter,
  PopoverClose
} from "@/components/popover";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";

function FormPopover() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Form Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("email")} placeholder="Email" className="input" />
          <PopoverFooter>
            <PopoverClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </PopoverClose>
            <Button type="submit">Submit</Button>
          </PopoverFooter>
        </form>
      </PopoverContent>
    </Popover>
  );
}
```

## Prop Tables

### Popover
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Whether the popover is open |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback for when the popover's open state changes |
| `children` | `React.ReactNode` | `undefined` | Popover content |

### PopoverTrigger
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Whether to render the trigger as a child element |
| `children` | `React.ReactNode` | `undefined` | Trigger content |

### PopoverContent
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Popover content |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Placement of the popover relative to the trigger |

### PopoverHeader
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Header content |

### PopoverFooter
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Footer content |

### PopoverTitle
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Title content |

### PopoverDescription
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Description content |

### PopoverClose
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Whether to render the close button as a child element |
| `children` | `React.ReactNode` | `undefined` | Close button content |

## Accessibility

The Popover component is WAI-ARIA compliant and supports keyboard navigation:
- Focus is trapped within the popover while open
- Can be closed with the Escape key
- Supports ARIA roles and labeling for screen readers
- Trigger and close buttons are keyboard accessible
- Use `PopoverTitle` and `PopoverDescription` for accessible labeling

## Best Practices
- Use popovers for supplementary or contextual information/actions, not for critical workflows
- Keep popover content concise and focused
- Ensure all interactive elements inside the popover are keyboard accessible
- Avoid placing large forms or scrollable content in popovers
- Test placement at different screen sizes
- Use visible focus indicators for accessibility

## Troubleshooting
- If the popover does not open/close, ensure the trigger and content are correctly wired
- For accessibility issues, check ARIA roles and keyboard navigation
- If placement is incorrect, adjust the `side` prop or check for CSS overrides

## Related Components
- [Tooltip](./tooltip.md) — For simple hover/focus info
- [Dialog](./dialog.md) — For modal dialogs
- [Dropdown](./dropdown.md) — For menu-like popovers
- [Button](./button.md) — For popover triggers

### Basic Usage

This example shows the basic structure of a `Popover` with a trigger and content.
```
tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  PopoverHeader,PopoverTitle,PopoverDescription,PopoverFooter} from "../components/popover";
import { Button } from "../components/button"; 

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover content here.</p>
        <PopoverClose asChild>
          <Button>Close</Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
```
### Popover with Header and Footer

This example shows a `Popover` with a header and a footer containing action buttons.
```
tsx
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from \"../components/popover\";
import { Button } from "../components/button";
import { PopoverHeader, PopoverFooter, PopoverTitle, PopoverDescription } from \"../components/popover\";

function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
          <Button>Open Popover</Button>
        </PopoverTrigger>

      
      <PopoverContent>
        <PopoverHeader>
          <h3>Popover Header</h3>
          <PopoverTitle>Popover Title</PopoverTitle>
          <PopoverDescription>This is the Popover Description</PopoverDescription>
        </PopoverHeader>
          <p>Popover content here.</p>
          <p>This is the content of the popover</p>
        <PopoverFooter>
            <PopoverClose asChild>
                <Button variant="outline">Cancel</Button>
            </PopoverClose>
            <PopoverClose asChild>
                <Button>Confirm</Button> 
            </PopoverClose>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
```
### Structure

This is the complete structure of the `Popover` component.
