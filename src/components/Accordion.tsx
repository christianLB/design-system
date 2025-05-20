import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded-md">
          <div
            className="flex items-center justify-between px-4 py-2 cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={() => toggleExpanded(index)}
          >
            <h3 className="text-lg font-medium">{item.title}</h3>
            <svg
              className={`w-4 h-4 transition-transform ${expanded === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {expanded === index && (
            <div className="p-4">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;