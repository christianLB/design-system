import React from 'react';

export interface AlertProps {
  variant: 'info' | 'success' | 'warning' | 'error';
  title: string;
  children: React.ReactNode;
}

/**
 * Componente Alert.
 * @component
 * @example
 * import { Alert, AlertProps } from "@/components/Alert"
 *
 * function App() {
 *   return <Alert />
 * }
 */
export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className={`border-l-4 p-4 mb-4 ${getVariantClasses()}`}>
      <strong className="font-bold">{title}</strong>
      <div className="mt-2">{children}</div>
    </div>
  );
};
