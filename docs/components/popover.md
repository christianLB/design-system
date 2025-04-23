# Popover Component

## Overview

The `Popover` component is used to display a floating panel of content that is related to some element on the page. It provides a way to show additional information or actions in a contextually relevant manner, without cluttering the main view.

## Subcomponents

-   **`Popover`**: The main wrapper component that provides context for the popover and its subcomponents.
-   **`PopoverTrigger`**: The button or interactive element that, when clicked, toggles the visibility of the popover content. It can wrap any element, such as a `Button`.
-   **`PopoverContent`**: The main container for the popover's content, including headers, body, and footers. It is rendered adjacent to the trigger.
-   **`PopoverClose`**: A button or interactive element to close the popover. It can wrap any element, such as a `Button`.

## Features

-   **Modality:** Overlays content and requires user interaction.
-   **Accessibility:** Built with Radix UI, ensuring keyboard navigation and screen reader support.
-   **Customizable Content:** Highly flexible layout with custom content within the `PopoverContent`.
-   **Themed**: The component is designed to work with the theme variables.
-   **Overlay**: The component has an overlay.

## Dependencies

-   **`@radix-ui/react-popover`**: The core library for the popover component.
-   **`lucide-react`**: For the close icon.
-   **`lib/utils`**: For the `cn` utility function to merge class names.

## Usage

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
