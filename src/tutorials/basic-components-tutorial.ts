import { Tutorial, TutorialStep } from './types';
import {
  validateComponentUsage,
  validatePropValue,
  validateMultipleComponents,
  validateEventHandler,
  validateImports,
} from './validation-utils';

const steps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Design System Tutorial!',
    content:
      "In this tutorial, you'll learn how to use the components in our design system effectively.",
    instructions: "Let's start by importing and using a simple Button component.",
    code: `import { Button } from '@christianlb/design-system';

function MyComponent() {
  return (
    <Button>Click me</Button>
  );
}`,
    task: 'Import the Button component and create a simple button with the text "Hello World"',
    hints: [
      'Remember to import Button from the design system',
      'Use the Button component with children text',
    ],
    validation: (userCode) => {
      const importCheck = validateImports(userCode, ['Button']);
      if (!importCheck.isValid) return importCheck;

      const componentCheck = validateComponentUsage(userCode, 'Button');
      if (!componentCheck.isValid) return componentCheck;

      if (!userCode.includes('Hello World')) {
        return {
          isValid: false,
          message: 'Your button should display "Hello World"',
          hints: ['Put "Hello World" between the Button tags'],
        };
      }

      return { isValid: true, message: "Great start! You've created your first button." };
    },
    solution: `import { Button } from '@christianlb/design-system';

function MyComponent() {
  return (
    <Button>Hello World</Button>
  );
}`,
    nextStepId: 'button-variants',
  },

  {
    id: 'button-variants',
    title: 'Button Variants',
    content: 'Buttons come in different variants for different purposes.',
    instructions:
      'Our Button component supports multiple variants: primary, secondary, outline, and ghost.',
    code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`,
    task: 'Create a Button with variant="secondary" and text "Save Changes"',
    hints: ['Add the variant prop to your Button', 'The variant value should be "secondary"'],
    validation: (userCode) => {
      const componentCheck = validateComponentUsage(userCode, 'Button');
      if (!componentCheck.isValid) return componentCheck;

      const variantCheck = validatePropValue(userCode, 'variant', 'secondary');
      if (!variantCheck.isValid) return variantCheck;

      if (!userCode.includes('Save Changes')) {
        return {
          isValid: false,
          message: 'Your button should display "Save Changes"',
          hints: ['Check the button text'],
        };
      }

      return { isValid: true, message: "Perfect! You've mastered button variants." };
    },
    solution: `<Button variant="secondary">Save Changes</Button>`,
    nextStepId: 'button-sizes',
  },

  {
    id: 'button-sizes',
    title: 'Button Sizes',
    content: 'Buttons can be sized to fit different contexts.',
    instructions:
      'Use the size prop to control button dimensions. Available sizes: small, medium, large.',
    code: `<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`,
    task: 'Create a large primary button with the text "Get Started"',
    hints: ['Combine both variant and size props', 'Use size="large" and variant="primary"'],
    validation: (userCode) => {
      const componentCheck = validateComponentUsage(userCode, 'Button');
      if (!componentCheck.isValid) return componentCheck;

      const sizeCheck = validatePropValue(userCode, 'size', 'large');
      if (!sizeCheck.isValid) return sizeCheck;

      const variantCheck = validatePropValue(userCode, 'variant', 'primary');
      if (!variantCheck.isValid) return variantCheck;

      if (!userCode.includes('Get Started')) {
        return {
          isValid: false,
          message: 'Your button should display "Get Started"',
          hints: ['Check the button text'],
        };
      }

      return { isValid: true, message: 'Excellent! You can now style buttons perfectly.' };
    },
    solution: `<Button variant="primary" size="large">Get Started</Button>`,
    nextStepId: 'button-events',
  },

  {
    id: 'button-events',
    title: 'Handling Button Clicks',
    content: 'Buttons need to respond to user interactions.',
    instructions: 'Add onClick handlers to make your buttons interactive.',
    code: `function MyComponent() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  
  return (
    <Button onClick={handleClick}>
      Click me
    </Button>
  );
}`,
    task: 'Create a button that logs "Hello from tutorial!" when clicked',
    hints: [
      'Define a handleClick function',
      'Use console.log inside the function',
      'Connect it with onClick prop',
    ],
    validation: (userCode) => {
      const componentCheck = validateComponentUsage(userCode, 'Button');
      if (!componentCheck.isValid) return componentCheck;

      const eventCheck = validateEventHandler(userCode, 'onClick');
      if (!eventCheck.isValid) return eventCheck;

      if (!userCode.includes('Hello from tutorial!')) {
        return {
          isValid: false,
          message: 'Your console.log should output "Hello from tutorial!"',
          hints: ['Check the console.log message'],
        };
      }

      return { isValid: true, message: 'Great! Your buttons are now interactive.' };
    },
    solution: `function MyComponent() {
  const handleClick = () => {
    console.log('Hello from tutorial!');
  };
  
  return (
    <Button onClick={handleClick}>
      Click me
    </Button>
  );
}`,
    nextStepId: 'card-basics',
  },

  {
    id: 'card-basics',
    title: 'Working with Cards',
    content: 'Cards are containers for grouping related content.',
    instructions:
      'The Card component provides a styled container with consistent spacing and borders.',
    code: `import { Card } from '@christianlb/design-system';

<Card>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>`,
    task: 'Create a Card with a title "Welcome" and description "This is my first card"',
    hints: [
      'Import the Card component',
      'Put content inside the Card tags',
      'Use appropriate HTML tags for title and description',
    ],
    validation: (userCode) => {
      const importCheck = validateImports(userCode, ['Card']);
      if (!importCheck.isValid) return importCheck;

      const componentCheck = validateComponentUsage(userCode, 'Card');
      if (!componentCheck.isValid) return componentCheck;

      if (!userCode.includes('Welcome')) {
        return {
          isValid: false,
          message: 'Your card should have "Welcome" as the title',
          hints: ['Add a heading with "Welcome"'],
        };
      }

      if (!userCode.includes('This is my first card')) {
        return {
          isValid: false,
          message: 'Your card should have the description "This is my first card"',
          hints: ['Add a paragraph with the description'],
        };
      }

      return { isValid: true, message: "Perfect! You've created your first card component." };
    },
    solution: `import { Card } from '@christianlb/design-system';

<Card>
  <h2>Welcome</h2>
  <p>This is my first card</p>
</Card>`,
    nextStepId: 'combining-components',
  },

  {
    id: 'combining-components',
    title: 'Combining Components',
    content: 'Real UIs combine multiple components to create rich interfaces.',
    instructions: "Let's combine Cards and Buttons to create an interactive card.",
    code: `import { Card, Button } from '@christianlb/design-system';

<Card>
  <h2>Action Card</h2>
  <p>This card has an action button</p>
  <Button variant="primary">Take Action</Button>
</Card>`,
    task: 'Create a Card with title "Subscribe", description "Get our newsletter", and a primary button saying "Subscribe Now"',
    hints: [
      'Import both Card and Button',
      'Structure your content inside the Card',
      'Use variant="primary" for the button',
    ],
    validation: (userCode) => {
      const importCheck = validateImports(userCode, ['Card', 'Button']);
      if (!importCheck.isValid) return importCheck;

      const componentsCheck = validateMultipleComponents(userCode, ['Card', 'Button']);
      if (!componentsCheck.isValid) return componentsCheck;

      const variantCheck = validatePropValue(userCode, 'variant', 'primary');
      if (!variantCheck.isValid) return variantCheck;

      const contentChecks = [
        { text: 'Subscribe', message: 'card title "Subscribe"' },
        { text: 'Get our newsletter', message: 'description "Get our newsletter"' },
        { text: 'Subscribe Now', message: 'button text "Subscribe Now"' },
      ];

      for (const check of contentChecks) {
        if (!userCode.includes(check.text)) {
          return {
            isValid: false,
            message: `Missing ${check.message}`,
            hints: [`Add ${check.text} to your component`],
          };
        }
      }

      return { isValid: true, message: "Fantastic! You're combining components like a pro." };
    },
    solution: `import { Card, Button } from '@christianlb/design-system';

<Card>
  <h2>Subscribe</h2>
  <p>Get our newsletter</p>
  <Button variant="primary">Subscribe Now</Button>
</Card>`,
    nextStepId: 'complete',
  },

  {
    id: 'complete',
    title: 'Tutorial Complete!',
    content: "Congratulations! You've learned the basics of our design system.",
    instructions: "You've mastered: Buttons, Cards, Props, Events, and Component Composition.",
    code: `// You're ready to build amazing UIs!
// Check out more tutorials to learn about:
// - Forms and Inputs
// - Themes and Styling
// - Advanced Patterns
// - Accessibility`,
    task: 'Click "Complete Tutorial" to finish and earn your achievement!',
    validation: () => ({
      isValid: true,
      message: "🎉 Congratulations! You've completed the Basic Components tutorial!",
    }),
  },
];

export const basicComponentsTutorial: Tutorial = {
  id: 'basic-components',
  title: 'Basic Components',
  description:
    'Learn how to use Button and Card components, handle events, and combine components effectively.',
  difficulty: 'beginner',
  estimatedTime: 15,
  tags: ['components', 'button', 'card', 'events', 'props'],
  steps,
  achievements: [
    {
      id: 'first-button',
      title: 'Button Master',
      description: 'Created your first button component',
      icon: '🔘',
      unlockedAt: new Date(),
    },
    {
      id: 'card-creator',
      title: 'Card Creator',
      description: 'Successfully created a card component',
      icon: '🃏',
      unlockedAt: new Date(),
    },
    {
      id: 'component-composer',
      title: 'Component Composer',
      description: 'Combined multiple components together',
      icon: '🎼',
      unlockedAt: new Date(),
    },
    {
      id: 'tutorial-complete',
      title: 'Quick Learner',
      description: 'Completed the Basic Components tutorial',
      icon: '🎓',
      unlockedAt: new Date(),
    },
  ],
};
