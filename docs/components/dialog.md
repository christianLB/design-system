# Dialog Component

## Overview

The `Dialog` component is a highly accessible modal overlay for displaying important information, collecting user input, or confirming actions. It is built on Radix UI primitives and supports keyboard navigation, screen readers, focus management, and theming. Use Dialogs for critical interactions that require user attention and block interaction with the rest of the UI until dismissed.

## Features
- **Accessible**: WAI-ARIA compliant, keyboard navigable, and screen reader friendly
- **Focus Management**: Traps focus within the dialog and restores it on close
- **Modal & Non-Modal**: Supports both blocking and non-blocking dialogs
- **Customizable Layout**: Header, content, footer, and custom sections
- **Overlay & Portal**: Renders above all content and outside the DOM tree
- **Close Controls**: Close via button, overlay click, or Escape key
- **Composable**: Use subcomponents for header, footer, title, description, and actions
- **Theming**: Fully themeable with CSS variables and dark mode support

## Subcomponents
- **Dialog**: Context provider and root for the dialog
- **DialogTrigger**: Element that opens the dialog (usually a Button)
- **DialogPortal**: Renders dialog content outside the main DOM tree
- **DialogOverlay**: The backdrop overlay behind the dialog
- **DialogContent**: The main modal container for your content
- **DialogHeader**: Groups title and description
- **DialogFooter**: Groups actions at the bottom
- **DialogTitle**: The accessible heading for the dialog
- **DialogDescription**: Additional context for screen readers
- **DialogClose**: Button or element to close the dialog

## Dependencies
- `@radix-ui/react-dialog`: Core dialog primitives
- `lucide-react`: For close icons
- `lib/utils`: Utility for class name merging

## Usage
### Basic Dialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose
} from "@/components/dialog";
import { Button } from "@/components/button";

function BasicDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Dialog content here.</p>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog with Title, Description, and Footer

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/dialog";
import { Button } from "@/components/button";

function DialogWithHeaderFooter() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <p>This is the content of the dialog.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Controlled Dialog (Open State Controlled by Parent)

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/dialog";
import { Button } from "@/components/button";
import { useState } from "react";

function ControlledDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Controlled Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
          <DialogDescription>
            Parent controls open/close state.
          </DialogDescription>
        </DialogHeader>
        <p>This dialog's open state is controlled by the parent.</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Dialog with Form

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/dialog";
import { Button } from "@/components/button";
import { useForm } from "react-hook-form";

function FormDialog() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Form Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogDescription>Enter your email to subscribe.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("email")} placeholder="Email" className="input" />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Subscribe</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Destructive Confirmation Dialog

```tsx
function DestructiveDialog({ onConfirm }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your item.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Prop Tables

### Dialog

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | `false` | Whether the dialog is open |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback for when the dialog's open state changes |
| `children` | `React.ReactNode` | `undefined` | Dialog content |

### DialogTrigger

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Whether to render the trigger as a child element |
| `children` | `React.ReactNode` | `undefined` | Trigger content |

### DialogContent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Dialog content |

### DialogHeader

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Header content |

### DialogFooter

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Footer content |

### DialogTitle

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Title content |

### DialogDescription

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | `undefined` | Description content |

### DialogClose

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `asChild` | `boolean` | `false` | Whether to render the close button as a child element |
| `children` | `React.ReactNode` | `undefined` | Close button content |

## Accessibility

The Dialog component is designed to be highly accessible. It uses WAI-ARIA attributes and follows best practices for keyboard navigation and screen reader support.

## Best Practices

* Use the `Dialog` component for critical interactions that require user attention and block interaction with the rest of the UI until dismissed.
* Use the `DialogTrigger` component to open the dialog.
* Use the `DialogContent` component to render the dialog content.
* Use the `DialogHeader` component to render the dialog header.
* Use the `DialogFooter` component to render the dialog footer.
* Use the `DialogTitle` component to render the dialog title.
* Use the `DialogDescription` component to render the dialog description.
* Use the `DialogClose` component to render the close button.

## Troubleshooting

* If the dialog is not opening, check that the `open` prop is set to `true`.
* If the dialog is not closing, check that the `onOpenChange` prop is set and is updating the `open` state correctly.
* If the dialog is not rendering correctly, check that the `children` prop is set and is rendering the correct content.

## Related Components

* `Button`: Used as the trigger for the dialog.
* `Form`: Used to render forms within the dialog.
* `Input`: Used to render input fields within the dialog.