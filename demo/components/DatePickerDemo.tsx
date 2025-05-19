import React, { useState } from 'react';
import DatePicker from '../../components/DatePicker';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function DatePickerDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | undefined>();
  const [rangeEnd, setRangeEnd] = useState<Date | undefined>();

  const handleRangeSelect = (date: Date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(undefined);
    } else if (date > rangeStart) {
      setRangeEnd(date);
    } else {
      setRangeEnd(rangeStart);
      setRangeStart(date);
    }
  };

  const isInRange = (date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    return date > rangeStart && date < rangeEnd;
  };

  const isRangeStart = (date: Date) => {
    if (!rangeStart) return false;
    return date.toDateString() === rangeStart.toDateString();
  };

  const isRangeEnd = (date: Date) => {
    if (!rangeEnd) return false;
    return date.toDateString() === rangeEnd.toDateString();
  };

  return (
    <ComponentShowcase 
      title="Date Picker" 
      description="A date picker component for selecting dates."
    >
      <ComponentVariant title="Basic Date Picker">
        <div className="space-y-4">
          <DatePicker 
            value={selectedDate} 
            onChange={setSelectedDate} 
          />
          {selectedDate && (
            <div className="text-sm text-muted-foreground">
              Selected date: {selectedDate.toLocaleDateString()}
            </div>
          )}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Default Value">
        <div className="space-y-4">
          <DatePicker 
            defaultValue={new Date(2023, 0, 1)} 
            onChange={setSelectedDate} 
          />
          <p className="text-sm text-muted-foreground">
            The date picker initializes with January 1, 2023 as the default value.
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Date Range Picker (Custom Implementation)">
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <h3 className="font-medium mb-2">Select a date range</h3>
            <DatePicker 
              value={rangeStart} 
              onChange={handleRangeSelect}
            />
            <div className="mt-4">
              {rangeStart && rangeEnd ? (
                <p className="text-sm">
                  Selected range: {rangeStart.toLocaleDateString()} to {rangeEnd.toLocaleDateString()}
                </p>
              ) : rangeStart ? (
                <p className="text-sm">
                  Select end date
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select start and end dates
                </p>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a custom implementation of a date range picker using the DatePicker component.
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Custom Styling">
        <div className="space-y-4">
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2 text-gray-800">Custom Styled Date Picker</h3>
            <DatePicker 
              value={selectedDate} 
              onChange={setSelectedDate} 
            />
          </div>
          <p className="text-sm text-muted-foreground">
            The date picker can be styled by wrapping it in a container with custom styles.
          </p>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
