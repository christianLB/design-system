import React, { useState, useEffect } from 'react';

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
    days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
  }

  for (let i = 1; i <= totalDays; i++) {
    const fullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const isSelected = selectedDate.toDateString() === fullDate.toDateString();
    days.push(
      <div
        key={i}
        className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full ${
          isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
        }`}
        onClick={() => handleDateClick(i)}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevYear} className="px-2 py-1 rounded-md hover:bg-gray-200">&lt;&lt;</button>
        <button onClick={handlePrevMonth} className="px-2 py-1 rounded-md hover:bg-gray-200">&lt;</button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="px-2 py-1 rounded-md hover:bg-gray-200">&gt;</button>
        <button onClick={handleNextYear} className="px-2 py-1 rounded-md hover:bg-gray-200">&gt;&gt;</button>
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