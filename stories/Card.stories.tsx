import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Simple utility function instead of importing cn
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

// Simple mock for Button component to avoid import errors
const Button = ({ children, variant = 'default', className = '', ...props }: { children: React.ReactNode; variant?: string; className?: string; [key: string]: any }) => (
  <button 
    className={`${className} ${variant === 'outline' ? 'border border-gray-300 bg-transparent' : 'bg-blue-500 text-white'}`} 
    {...props}
  >
    {children}
  </button>
);

// Simple mock for Input
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input className="border p-2 rounded" {...props} />;

// Mock Select components
const Select = ({ children }: { children: React.ReactNode }) => <div className="relative">{children}</div>;
const SelectTrigger = ({ children, id }: { children: React.ReactNode, id?: string }) => (
  <button id={id} className="flex justify-between items-center border rounded px-3 py-2 w-full">{children}</button>
);
const SelectValue = ({ placeholder }: { placeholder: string }) => <span>{placeholder}</span>;
const SelectContent = ({ children, position }: { children: React.ReactNode, position?: string }) => (
  <div className="bg-white border rounded mt-1 p-1 shadow-md">{children}</div>
);
const SelectItem = ({ children, value }: { children: React.ReactNode, value: string }) => (
  <div className="px-2 py-1 cursor-pointer hover:bg-gray-100 rounded">{children}</div>
);


// Simple Card component for stories
const Card = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div 
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
);

const CardDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
);

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);

const CardFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
);

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
  args: {
    className: 'w-[350px]',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description that provides more context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is some content inside the card. You can put any React node here.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Card className="w-[400px]">
      <div className="p-6">
        <h3 className="text-xl font-semibold">Create project</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Deploy your new project in one-click.
        </p>
        
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              placeholder="Name of your project"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          
          <div>
            <label htmlFor="framework" className="block text-sm font-medium mb-1">
              Framework
            </label>
            <select
              id="framework"
              className="w-full px-3 py-2 border rounded-md text-sm"
              defaultValue=""
            >
              <option value="" disabled>Select</option>
              <option value="next">Next.js</option>
              <option value="sveltekit">SvelteKit</option>
              <option value="astro">Astro</option>
              <option value="nuxt">Nuxt.js</option>
            </select>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </div>
        </div>
      </div>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework" className="text-sm font-medium leading-none">
                Framework
              </label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Card className="overflow-hidden max-w-md">
      <div className="h-48 bg-muted">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt="Card background"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Beautiful Sunset</h3>
          <p className="text-sm text-muted-foreground">By Photographer Name</p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          This is a beautiful sunset captured at the perfect moment. The colors are vibrant and the composition is
          stunning.
        </p>
        <Button variant="outline" className="w-full mt-6">
          <span className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </span>
          Save
        </Button>
      </div>
    </Card>
  ),
};


