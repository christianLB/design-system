import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveTutorial } from './InteractiveTutorial';
import { basicComponentsTutorial } from './basic-components-tutorial';

const meta: Meta<typeof InteractiveTutorial> = {
  title: 'Tutorials/Interactive Tutorial',
  component: InteractiveTutorial,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An interactive tutorial system that teaches users how to use the design system components with real-time code validation and achievements.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicComponents: Story = {
  args: {
    tutorial: basicComponentsTutorial,
    onComplete: () => {
      console.log('Tutorial completed!');
      alert("🎉 Congratulations! You've completed the tutorial!");
    },
  },
};

export const WithCustomTutorial: Story = {
  args: {
    tutorial: {
      id: 'custom-tutorial',
      title: 'Custom Tutorial',
      description: 'A custom tutorial example',
      difficulty: 'intermediate',
      estimatedTime: 10,
      tags: ['custom', 'example'],
      steps: [
        {
          id: 'step1',
          title: 'Welcome to Custom Tutorial',
          content: 'This is a custom tutorial to demonstrate the flexibility of the system.',
          instructions: 'Follow the instructions to complete each step.',
          code: '// Your code goes here',
          task: 'Write a simple console.log statement',
          validation: (code) => ({
            isValid: code.includes('console.log'),
            message: code.includes('console.log')
              ? 'Great! You wrote a console.log statement.'
              : 'Your code should include console.log',
            hints: ['Try: console.log("Hello World")'],
          }),
          solution: 'console.log("Hello World");',
          nextStepId: 'complete',
        },
        {
          id: 'complete',
          title: 'Tutorial Complete!',
          content: "You've completed this custom tutorial.",
          instructions: 'Well done!',
          code: '',
          task: 'Click complete to finish',
          validation: () => ({
            isValid: true,
            message: 'Tutorial completed!',
          }),
        },
      ],
      achievements: [
        {
          id: 'custom-complete',
          title: 'Custom Champion',
          description: 'Completed the custom tutorial',
          icon: '🏆',
          unlockedAt: new Date(),
        },
      ],
    },
  },
};

// Story demonstrating the tutorial in different states
export const InProgress: Story = {
  args: {
    tutorial: basicComponentsTutorial,
  },
  decorators: [
    (Story) => {
      // Simulate some progress
      const progressKey = `tutorial_progress_${basicComponentsTutorial.id}`;
      const mockProgress = {
        currentStepId: 'button-sizes',
        completedSteps: ['welcome', 'button-variants'],
        startedAt: new Date().toISOString(),
        achievements: [
          {
            id: 'first-button',
            title: 'Button Master',
            description: 'Created your first button component',
            icon: '🔘',
            unlockedAt: new Date().toISOString(),
          },
        ],
      };
      localStorage.setItem(progressKey, JSON.stringify(mockProgress));

      return <Story />;
    },
  ],
};

// Story showing the completion screen
export const Completed: Story = {
  args: {
    tutorial: basicComponentsTutorial,
  },
  decorators: [
    (Story) => {
      // Simulate completed tutorial
      const progressKey = `tutorial_progress_${basicComponentsTutorial.id}`;
      const mockProgress = {
        currentStepId: 'complete',
        completedSteps: basicComponentsTutorial.steps.map((s) => s.id),
        startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        completedAt: new Date().toISOString(),
        achievements: basicComponentsTutorial.achievements.map((a) => ({
          ...a,
          unlockedAt: new Date().toISOString(),
        })),
      };
      localStorage.setItem(progressKey, JSON.stringify(mockProgress));

      return <Story />;
    },
  ],
};
