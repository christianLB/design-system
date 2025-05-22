import React from 'react';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <a href={item.href} className="text-blue-600 hover:text-blue-800">
              {item.name}
            </a>
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">&gt;</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};