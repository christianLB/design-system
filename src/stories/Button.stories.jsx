import React from 'react';

// A simple Button component for testing
const Button = ({ primary, label, onClick }) => {
  const mode = primary ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800';
  
  return (
    <button
      className={`font-bold py-2 px-4 rounded ${mode}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// Story metadata
export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

// Story variations
export const Primary = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary = {
  args: {
    primary: false,
    label: 'Secondary Button',
  },
};
