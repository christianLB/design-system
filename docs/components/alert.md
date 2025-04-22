# Alert Component

## Description

The Alert component is used to display important information to the user. It can be used to communicate various types of messages, such as informational updates, success confirmations, warnings, or error notifications.

## Features

-   **Variant:** The Alert component supports different variants to convey the nature of the message:
    -   `info`: Used for general information or updates.
    -   `success`: Used to indicate that an operation has been completed successfully.
    -   `warning`: Used to warn the user about potential issues or important information.
    -   `error`: Used to indicate that an error has occurred.
-   **Title:** An optional title to provide context to the message.
-   **Content:** The main content of the alert, which can include text, links, or other elements. This is passed as `children` to the component.
-   **Closeable:** An optional close button to dismiss the alert.

## Dependencies

-   None. The Alert component is designed to be self-contained and does not rely on any external libraries or components.

## Usage

The Alert component is highly customizable through its props:
```
jsx
<Alert variant="info" title="Did you know?">
  This is an informational alert.
</Alert>

<Alert variant="success" title="Success!">
  Your action has been completed successfully.
</Alert>

<Alert variant="warning" title="Warning!">
  Be careful, this might cause issues.
</Alert>

<Alert variant="error" title="Error!">
  Something went wrong. Please try again.
</Alert>
```
## Props

| Prop       | Type     | Description                                                       |
| ---------- | -------- | ----------------------------------------------------------------- |
| variant    | string   | The type of alert: "info", "success", "warning", or "error".      |
| title      | string   | The title of the alert.                                           |
| children   | ReactNode | The content to be displayed inside the alert.                     |