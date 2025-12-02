import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Animate, AnimateGroup } from './Animate';
import { Button } from '../Button/Button';

const meta: Meta<typeof Animate> = {
  title: 'Animation/Animate',
  component: Animate,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Animate>;

const DemoBox = ({ children }: { children?: React.ReactNode }) => (
  <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
    {children || 'Box'}
  </div>
);

export const Fade: Story = {
  args: {
    type: 'fade',
    children: <DemoBox>Fade</DemoBox>,
  },
};

export const SlideUp: Story = {
  args: {
    type: 'slide-up',
    children: <DemoBox>Slide Up</DemoBox>,
  },
};

export const SlideDown: Story = {
  args: {
    type: 'slide-down',
    children: <DemoBox>Slide Down</DemoBox>,
  },
};

export const Scale: Story = {
  args: {
    type: 'scale',
    children: <DemoBox>Scale</DemoBox>,
  },
};

export const Bounce: Story = {
  args: {
    type: 'bounce',
    children: <DemoBox>Bounce</DemoBox>,
  },
};

export const Rotate: Story = {
  args: {
    type: 'rotate',
    children: <DemoBox>Rotate</DemoBox>,
  },
};

export const Flip: Story = {
  args: {
    type: 'flip',
    children: <DemoBox>Flip</DemoBox>,
  },
};

export const Pulse: Story = {
  args: {
    type: 'pulse',
    children: <DemoBox>Pulse</DemoBox>,
  },
};

export const WithHover: Story = {
  args: {
    type: 'fade',
    onHover: 'scale',
    children: <DemoBox>Hover me</DemoBox>,
  },
};

export const WithTap: Story = {
  args: {
    type: 'fade',
    onTap: 'scale',
    children: <DemoBox>Click me</DemoBox>,
  },
};

export const Toggle: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div className="space-y-4">
        <Button onClick={() => setShow(!show)}>Toggle ({show ? 'Visible' : 'Hidden'})</Button>
        <Animate type="scale" show={show}>
          <DemoBox>Toggle</DemoBox>
        </Animate>
      </div>
    );
  },
};

export const AllTypes: Story = {
  render: () => {
    const types = ['fade', 'slide-up', 'slide-down', 'scale', 'bounce', 'rotate'] as const;
    return (
      <div className="grid grid-cols-3 gap-4">
        {types.map((type, i) => (
          <Animate key={type} type={type} delay={i * 0.1}>
            <div className="p-4 bg-card border rounded-lg text-center">
              <span className="text-sm font-medium">{type}</span>
            </div>
          </Animate>
        ))}
      </div>
    );
  },
};

export const Staggered: Story = {
  render: () => (
    <AnimateGroup type="slide-up" stagger={0.1}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="p-4 bg-card border rounded-lg mb-2">
          Item {i}
        </div>
      ))}
    </AnimateGroup>
  ),
};
