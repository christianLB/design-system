# Checkbox Component

## Overview

The `Checkbox` component is a standard form element that allows users to toggle between checked and unchecked states. It is built using Radix UI primitives, ensuring accessibility and robustness.

## Features

-   **Checked State:** Indicates whether the checkbox is selected or not.
-   **Disabled State:** Prevents user interaction with the checkbox.
-   **Indeterminate State:** Represents a state where neither all nor none of a set of related checkboxes are checked.
-   **Customizable Styling:** Can be styled using CSS classes.
-   **Accessibility:** Built with Radix UI, providing proper keyboard navigation and screen reader support.
- **Icon**: Uses `lucide-react` icon.

## Dependencies

-   **`@radix-ui/react-checkbox`**: The core library for the checkbox component.
-   **`lucide-react`**: For the check icon.
-   **`lib/utils`**: For the `cn` utility function to merge class names.

## Usage

The `Checkbox` component can be used in various contexts, including:

-   Forms for accepting terms and conditions.
-   Settings panels for enabling or disabling options.
-   Lists of items for selecting multiple items.

### Default

The basic unchecked state of the checkbox.
```
tsx
import { Checkbox } from "../components/checkbox";

function MyComponent() {
  return <Checkbox />;
}
```
### Checked

The checkbox in its selected state.
```
tsx
import { Checkbox } from "../components/checkbox";

function MyComponent() {
  return <Checkbox checked />;
}
```
### Disabled

The checkbox in a disabled state, preventing user interaction.
```
tsx
import { Checkbox } from "../components/checkbox";

function MyComponent() {
  return <Checkbox disabled />;
}
```
### Indeterminate

The checkbox in an indeterminate state, typically used when a subset of related checkboxes are checked. This state is styled differently from both checked and unchecked.
You can use `defaultIndeterminate` prop for an initial indeterminate state.
```
tsx
import { Checkbox } from "../components/checkbox";
import { useState } from "react";

function MyComponent() {
const [isChecked, setIsChecked] = useState(false)
const [isIndeterminate, setIsIndeterminate] = useState(true);

  return <Checkbox checked={isChecked} indeterminate={isIndeterminate}/>;
}
```
## Structure

A typical `Checkbox` component will have the following basic structure: