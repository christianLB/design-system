import React from 'react';
import Accordion from '../../components/Accordion';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function AccordionDemo() {
  const faqItems = [
    {
      title: 'What is the purpose of this design system?',
      content: (
        <div className="space-y-2">
          <p>This design system provides a collection of reusable components and design tokens to ensure consistency across applications.</p>
          <p>It includes pre-built UI components that follow accessibility best practices and can be easily customized to match your brand.</p>
        </div>
      ),
    },
    {
      title: 'How do I install and use these components?',
      content: (
        <div className="space-y-2">
          <p>To use the components in your project:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Install the package using your preferred package manager (npm, yarn, or pnpm)</li>
            <li>Import the components you need in your project</li>
            <li>Use them in your React components</li>
          </ol>
          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm mt-2">
            {`import { Button } from 'your-package-name';

function MyComponent() {
  return <Button>Click me</Button>;
}`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Are these components accessible?',
      content: (
        <div className="space-y-2">
          <p>Yes, all components are built with accessibility in mind. They follow WAI-ARIA design patterns and include proper keyboard navigation, focus management, and ARIA attributes.</p>
          <p>We recommend testing with screen readers and keyboard navigation to ensure the best experience for all users.</p>
        </div>
      ),
    },
    {
      title: 'Can I customize the styling?',
      content: (
        <div className="space-y-2">
          <p>Absolutely! The components are built to be customizable. You can:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Override default styles using CSS classes</li>
            <li>Use the theme configuration to customize design tokens</li>
            <li>Extend components with your own styles</li>
          </ul>
          <p className="pt-2">Check the documentation for specific theming and styling options.</p>
        </div>
      ),
    },
  ];

  const collapsibleItems = [
    {
      title: 'Click to expand',
      content: 'This is the content that will be shown when expanded. You can put any React component or text here.'
    },
    {
      title: 'Another item',
      content: (
        <div className="space-y-2">
          <p>You can include multiple paragraphs, lists, or other components inside the accordion.</p>
          <ul className="list-disc pl-5">
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Disabled item',
      content: 'This item is disabled and cannot be expanded.',
      disabled: true
    }
  ];

  return (
    <ComponentShowcase
      title="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    >
      <ComponentVariant title="FAQ Example">
        <Accordion items={faqItems} />
      </ComponentVariant>

      <ComponentVariant title="Collapsible Sections">
        <Accordion items={collapsibleItems} />
      </ComponentVariant>
    </ComponentShowcase>
  );
}
