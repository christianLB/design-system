import React, { useState, useEffect } from 'react';
import { spacing, tokens } from '../tokens';
import { cn } from '../utils';

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  defaultValue?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, defaultValue }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(defaultValue || new Date());
  const [currentDate, setCurrentDate] = useState<Date>(defaultValue || new Date());

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentDate(value);
    }
  }, [value]);

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange(newDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const days = [];
  const firstDay = getFirstDayOfMonth(currentDate);
  const totalDays = daysInMonth(currentDate);

  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }

  for (let i = 1; i <= totalDays; i++) {
    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const isSelected = selectedDate.toDateString() === fullDate.toDateString();
    days.push(
      <button
        type="button"
        key={i}
        onClick={() => handleDateClick(i)}
        aria-pressed={isSelected}
        className={cn(
          'flex items-center justify-center',
          'w-10 h-10',
          tokens.radius.full,
          tokens.transition.colors,
        )}
        style={{
          backgroundColor: isSelected
            ? tokens.colors.hover.primary
            : undefined,
          color: isSelected ? tokens.colors.text : undefined,
        }}
      >
        {i}
      </button>
    );
  }

  return (
    <div
      className={cn(spacing(4), tokens.radius.md, tokens.shadow.md, 'border')}
      style={{ borderColor: tokens.colors.border }}
    >
      <div className={cn('flex justify-between items-center', spacing(4, 'b'))}>
        <button
          type="button"
          onClick={handlePrevYear}
          className={cn(spacing(1, 'y'), spacing(2, 'x'), tokens.radius.md)}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
          aria-label="Previous year"
        >
          &lt;&lt;
        </button>
        <button
          type="button"
          onClick={handlePrevMonth}
          className={cn(spacing(1, 'y'), spacing(2, 'x'), tokens.radius.md)}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          type="button"
          onClick={handleNextMonth}
          className={cn(spacing(1, 'y'), spacing(2, 'x'), tokens.radius.md)}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
          aria-label="Next month"
        >
          &gt;
        </button>
        <button
          type="button"
          onClick={handleNextYear}
          className={cn(spacing(1, 'y'), spacing(2, 'x'), tokens.radius.md)}
          style={{ backgroundColor: tokens.colors.backgroundMuted }}
          aria-label="Next year"
        >
          &gt;&gt;
        </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Su</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Mo</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Tu</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">We</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Th</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Fr</div>
          <div className="w-10 h-10 flex items-center justify-center font-semibold">Sa</div>
          {days}
        </div>
      </div>
    );
  };

// DatePicker component is now exported as a named export
