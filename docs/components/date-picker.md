# Date Picker Component

## Description

The Date Picker component is an interactive UI element that allows users to select a date or a range of dates from a calendar interface. It provides an intuitive way to choose dates without requiring manual text input, thus reducing errors and improving usability.

## Features

-   **Calendar View:** Displays a visual calendar for easy date selection.
-   **Date Selection:** Allows users to select a single date or a range of dates.
-   **Month/Year Navigation:** Provides controls for navigating between different months and years.
-   **Controlled Component:** Receives the currently selected date (or range) as a prop, allowing external control.
-   **Event Emission:** Emits an event when a new date (or range) is selected, notifying the parent component of changes.
-   **Default Value:** Supports setting a default date value when the component is first rendered.
- **Range selection:** Allow the user to select a range of dates, with a start date and an end date.
- **Clear selection:** Allow the user to clear the current selection.

## Dependencies

-   **React:** The component is built using React and will require React as a dependency in the project where it is used.
-   **Date library (Optional):** A date manipulation library (e.g., `date-fns`, `moment.js`) may be useful for advanced date handling or formatting. However, the component should be functional with native JavaScript Date objects.

## Usage

The Date Picker component is used in forms or any other context where date input is required. It enhances user experience by providing a visual and interactive calendar interface.

## Props

-   `selectedDate`: (Date | \[Date, Date] | null) The currently selected date or a range.
-   `defaultDate`: (Date) The default date to be shown when the component is first rendered.
-   `onDateChange`: ((date: Date | \[Date, Date] | null) => void) A callback function triggered when a new date (or range) is selected.
- `range`: (boolean) Indicates if the user can select a range of dates or only one. By default is false.

## Events

-   `onDateChange`: This event is emitted when the user selects a new date or range of dates. The callback function will receive the new selected date or range.

## Example