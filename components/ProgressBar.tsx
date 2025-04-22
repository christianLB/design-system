import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 relative">
      <div
        className="bg-blue-600 h-2.5 rounded-full absolute"
        style={{ width: `${clampedValue}%` }}
      ></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs text-gray-700 dark:text-gray-300">
        {clampedValue}%
      </div>
    </div>
  );
};

export default ProgressBar;