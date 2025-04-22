import React, { useState } from 'react';

interface TooltipProps {
  tooltipText: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ tooltipText, children }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 bg-gray-800 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap max-w-[200px]">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default Tooltip;