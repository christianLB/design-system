import React from 'react';
import Breadcrumb, { BreadcrumbItem } from '../../components/Breadcrumb';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function BreadcrumbDemo() {
  const basicItems = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'Electronics', href: '#' },
    { name: 'Phones', href: '#', current: true },
  ];

  const withIcons: Array<BreadcrumbItem & { icon: string }> = [
    { name: 'Home', href: '#', icon: '🏠' },
    { name: 'Documents', href: '#', icon: '📄' },
    { name: 'Projects', href: '#', icon: '📂' },
    { name: 'Design System', href: '#', icon: '🎨' },
  ];

  const customSeparator = [
    { name: 'Dashboard', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Account', href: '#', current: true },
  ];

  return (
    <ComponentShowcase
      title="Breadcrumb"
      description="A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy."
    >
      <ComponentVariant title="Basic Usage">
        <Breadcrumb items={basicItems} />
      </ComponentVariant>

      <ComponentVariant title="With Icons">
        <div className="space-y-2">
          <nav aria-label="Breadcrumb with icons">
            <ol className="flex items-center space-x-2">
              {withIcons.map((item, index) => (
                <li key={index} className="flex items-center">
                  <a 
                    href={item.href} 
                    className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                  {index < withIcons.length - 1 && (
                    <span className="mx-2 text-gray-400">&gt;</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="text-sm text-muted-foreground mt-2">
            Note: This shows an alternative implementation with icons
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Custom Separator">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {customSeparator.map((item, index) => (
              <li key={index} className="flex items-center">
                <a 
                  href={item.href} 
                  className={`${item.current ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
                {index < customSeparator.length - 1 && (
                  <span className="mx-2 text-gray-400">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
