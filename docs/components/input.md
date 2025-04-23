# Input Component

## Overview

The `Input` component is a fundamental form element used to collect textual or numerical data from the user. It supports various input types and states, allowing for flexible data collection and user interaction.

## Features

-   **Multiple Input Types:** Supports standard HTML input types like `text`, `email`, `password`, and `number`.
-   **Customizable Styling:** Can be styled using CSS classes.
-   **Disabled State:** Allows the input to be disabled, preventing user interaction.
-   **Error State:** Provides a visual indication when the input is invalid or in an error state.
- **Placeholder**: Allows the use of a placeholder to guide the user.
- **Label**: Allow the use of a label.

## Dependencies

-   **None:** The `Input` component is self-contained with no external dependencies, using standard HTML and CSS.
- `cn`: Function used to merge class names.

## Usage

The `Input` component can be used in various contexts, including:

-   User registration forms.
-   Login forms.
-   Search fields.
-   Data entry fields.
-   Any place where a user need to introduce data.

## Input Types

### Text

The default input type for general text.
```
tsx
<Input type="text" placeholder="Enter text here" />
```
### Email

Specifically for email addresses.
```
tsx
<Input type="email" placeholder="Enter your email" />
```
### Password

For secure password entry, where the input is masked.
```
tsx
<Input type="password" placeholder="Enter your password" />
```
### Number

For numeric input.
```
tsx
<Input type="number" placeholder="Enter a number" />
```
## States

### Disabled

Disables the input field, preventing user interaction.
```
tsx
<Input type="text" disabled placeholder="Disabled input" />
```
### Error

Indicates an invalid or error state, usually styled with a red border and text.
```
tsx
<Input type="text" className="aria-invalid:border-destructive aria-invalid:ring-destructive/20" aria-invalid placeholder="Error state" />
```
## Structure

A typical `Input` component has the following basic structure: