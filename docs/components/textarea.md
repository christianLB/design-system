# Textarea Component

## Overview

The `Textarea` component is a multi-line text input field that allows users to enter and edit text over multiple lines. It's a fundamental component for collecting longer-form text input in forms or other interactive elements.

## Features

-   **Multi-line Input:** Supports input of text over multiple lines.
-   **Customizable Size:** The height and width of the `Textarea` can be adjusted using CSS.
-   **Disabled State:** Can be disabled to prevent user input.
-   **Placeholder Text:** Supports placeholder text to guide the user.
- **Controlled or Uncontrolled**: The component can be used in both ways.
- **Themed**: The component is designed to work with the theme variables.

## Dependencies

-   **React:** The component is built using React.
-   **None:** The component does not have external dependencies.

## Usage

The `Textarea` component can be used in various contexts, including:

-   Comment sections.
-   Feedback forms.
-   Content creation forms.
-   Anywhere multi-line text input is needed.

### Default

The basic usage of the `Textarea` component without any special props.
```
tsx
import { Textarea } from "../components/textarea";

function MyComponent() {
  return <Textarea />;
}
```
### Disabled

The `disabled` prop is used to make the `Textarea` non-interactive.
```
tsx
import { Textarea } from "../components/textarea";

function MyComponent() {
  return <Textarea disabled />;
}
```
### Placeholder

The `placeholder` prop is used to display text that hints at the expected input when the `Textarea` is empty.
```
tsx
import { Textarea } from "../components/textarea";

function MyComponent() {
  return <Textarea placeholder="Enter your text here" />;
}
```
## Structure

A typical `Textarea` component has the following basic structure: