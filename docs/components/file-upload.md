# File Upload Component

## Description

The File Upload component is designed to provide users with a user-friendly way to upload files. It supports both drag-and-drop functionality and traditional file selection methods. It maintains a list of the selected files and allows users to remove files from the selection before the actual upload process.

## Features

-   **Drag and Drop:** Users can drag and drop files into a designated area to add them to the upload queue.
-   **File Selection:** Users can select files from their local system using a file picker dialog.
-   **File List Display:** Displays a list of the files currently selected for upload.
-   **File Removal:** Users can remove individual files from the selected list.
-   **External File List:** The component receives an external list of files, allowing for integration with other parts of an application.
-   **Event Emission:** Emits events when files are added or removed, enabling other parts of the application to respond to these changes.
- **Multiple files**: the user can select one or multiple files

## Dependencies

-   **React:** The component is built for use within a React application.
-   **JavaScript/TypeScript:** The component will be written in TypeScript, allowing for better code maintainability and type safety.
- **No third party libraries**: the component will not depend on external libraries
-   **External File List:** The component expects an array of file objects to be passed to it.
- **onChange event**: The component will emit this event when a new file is added or removed. It will send the new files array as an argument.

## Usage

1.  **Import:** Import the `FileUpload` component into your React application.
2.  **Render:** Render the component in your desired location, passing the required props.
3.  **Handle Events:** Listen for the `onChange` event to handle file additions and removals.

## Props

-   **files:** An array of file objects that represent the current list of selected files. This prop is used to keep the component and the parent component in sync.
-   **onChange:** A callback function that is called when a new file is added or removed. This function is passed the new list of files.

## Event

-   **onChange:** This event is emitted when:
    -   A new file is added to the list.
    -   A file is removed from the list.

## Future Enhancements

-   **File Preview:** Display previews for image files.
-   **Progress Indication:** Show the upload progress for each file.
-   **File Validation:** Validate file types and sizes before upload.
-   **Error Handling:** Display error messages for failed uploads or invalid file selections.