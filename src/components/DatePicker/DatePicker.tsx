import React, { useState, useEffect, forwardRef } from 'react';
import { cn } from '../../utils';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
    }

    for (let i = 1; i <= totalDays; i++) {
      const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const isSelected = selectedDate.toDateString() === fullDate.toDateString();
      const isToday = new Date().toDateString() === fullDate.toDateString();
      
      days.push(
        <div
          key={i}
          className={cn(
            "w-10 h-10 flex items-center justify-center cursor-pointer rounded-full transition-colors",
            isSelected ? 
              "bg-primary text-primary-foreground" : 
              cn(
                "hover:bg-muted",
                isToday && "border border-primary/50 text-primary"
              )
          )}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return (
      <div 
        ref={ref} data-testid="datepicker"
        className={cn(
          "p-4 border rounded-md",
          "border-border bg-card text-card-foreground shadow-sm",
          className
        )}
        {...props}
      >
        <div className="flex justify-between items-center mb-4">
          <button 
            type="button"
            onClick={handlePrevYear} 
            className={cn(
              "p-1 rounded-md",
              "hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Previous year"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button 
            type="button"
            onClick={handlePrevMonth} 
            className={cn(
              "p-1 rounded-md",
              "hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h2 className="text-base font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            type="button"
            onClick={handleNextMonth} 
            className={cn(
              "p-1 rounded-md",
              "hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button 
            type="button"
            onClick={handleNextYear} 
            className={cn(
              "p-1 rounded-md",
              "hover:bg-muted transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            )}
            aria-label="Next year"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Su</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Mo</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Tu</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">We</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Th</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Fr</div>
          <div className="w-10 h-10 flex items-center justify-center font-medium text-muted-foreground text-xs">Sa</div>
          {days}
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };