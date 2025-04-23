# Dialog Component
## Overview


The `Dialog` component is a versatile modal component used to display information or collect input from the user in a focused, overlayed view. It is built using Radix UI primitives, ensuring accessibility and a robust foundation.

## Subcomponents

The `Dialog` component is composed of several subcomponents:

-   **`Dialog`**: The main wrapper component that provides context for the dialog and its subcomponents.
-   **`DialogTrigger`**: The button or interactive element that, when clicked, opens the dialog. It can wrap any element, such as a `Button`.
-   **`DialogPortal`**: A component that renders its children outside of the main DOM tree, typically at the end of the `body`. It's used to ensure the dialog overlays everything else on the page.
-   **`DialogOverlay`**: The backdrop that covers the rest of the page when the dialog is open, providing a visual focus on the dialog content.
-   **`DialogContent`**: The main container for the dialog's content, including headers, body, and footers. It is rendered inside `DialogPortal`.
-   **`DialogHeader`**: An optional container used to group the `DialogTitle` and `DialogDescription` subcomponents, providing a semantic grouping for the dialog's header content.
-   **`DialogFooter`**: An optional container used to group action buttons or other elements placed in the footer of the dialog.
-   **`DialogTitle`**: The heading or title of the dialog, clearly indicating the dialog's purpose. It's typically placed inside `DialogHeader`.
-   **`DialogDescription`**: A more detailed explanation or description of the dialog's content or purpose. It's usually placed inside `DialogHeader`.
-   **`DialogClose`**: A button or interactive element to close the dialog. It can wrap any element, such as a `Button`.

## Features

-   **Modality:** Overlays content and requires user interaction.
-   **Accessibility:** Built with Radix UI, ensuring keyboard navigation and screen reader support.
-   **Customizable Content:** Highly flexible layout with `DialogHeader`, `DialogFooter`, etc.
-   **Themed**: The component is designed to work with the theme variables.
-   **Overlay**: The component has an overlay.
- **Close**: The dialog has a close button.

## Dependencies

-   **`@radix-ui/react-dialog`**: The core library for the dialog component.
-   **`lucide-react`**: For the close icon.
-   **`lib/utils`**: For the `cn` utility function to merge class names.

## Usage
### Basic Usage

### Basic Usage

This example shows the basic structure of a `Dialog` with a trigger and content.
```
tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose
} from "../components/dialog";
import { Button } from "../components/button";

function MyComponent() {
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
### Dialog with Title and Description

This example demonstrates a `Dialog` with a title and description for more informative modals.
```
tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "../components/dialog";
import { Button } from "../components/button";

function MyComponent() {
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
        <p>This is the content of the dialog</p>
        </DialogHeader>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}




        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
```
### Dialog with Footer

This example shows a `Dialog` with a footer containing action buttons.