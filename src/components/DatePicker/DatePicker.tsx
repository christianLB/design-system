import React, { useState, useEffect, forwardRef } from 'react';


export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: Date;
  onDateChange: (date: Date) => void; // Renamed from onChange to avoid conflicts with HTMLAttributes
  initialDate?: Date; // Renamed from defaultValue to avoid conflicts with HTMLAttributes
  className?: string;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onDateChange, initialDate, className, ...props }, ref) => {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate || new Date());
    const [currentDate, setCurrentDate] = useState<Date>(initialDate || new Date());

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
      onDateChange(newDate);
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
      days.push(<div key={`empty-${i}`} className="datepicker-day datepicker-day--empty"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isSelected = selectedDate.toDateString() === fullDate.toDateString();
      const isToday = new Date().toDateString() === fullDate.toDateString();
      
      days.push(
        <div
          key={i}
          className={`datepicker-day ${isSelected ? 'datepicker-day--selected' : ''} ${isToday ? 'datepicker-day--today' : ''}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return (
      <div 
        ref={ref} data-testid="datepicker"
        className={`datepicker ${className || ''}`}
        {...props}
      >
        <div className="flex justify-between items-center mb-4">
          <button 
            type="button"
            onClick={handlePrevYear} 
            className="datepicker-nav-button"
            aria-label="Previous year"
          >
            «
          </button>
          <button 
            type="button"
            onClick={handlePrevMonth} 
            className="datepicker-nav-button"
            aria-label="Previous month"
          >
            ‹
          </button>
          <h2 className="text-base font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            type="button"
            onClick={handleNextMonth} 
            className="datepicker-nav-button"
            aria-label="Next month"
          >
            ›
          </button>
          <button 
            type="button"
            onClick={handleNextYear} 
            className="datepicker-nav-button"
            aria-label="Next year"
          >
            »
          </button>
        </div>
        <div className="datepicker-grid">
          <div className="datepicker-day-label">Su</div>
          <div className="datepicker-day-label">Mo</div>
          <div className="datepicker-day-label">Tu</div>
          <div className="datepicker-day-label">We</div>
          <div className="datepicker-day-label">Th</div>
          <div className="datepicker-day-label">Fr</div>
          <div className="datepicker-day-label">Sa</div>
          {days}
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };