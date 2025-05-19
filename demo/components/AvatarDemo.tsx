import React from 'react';
import Avatar from '../../components/Avatar';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function AvatarDemo() {
  return (
    <ComponentShowcase 
      title="Avatar" 
      description="An image element with a fallback for representing the user."
    >
      <ComponentVariant title="Sizes">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar size="small" src="https://github.com/shadcn.png" alt="User" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Avatar size="medium" src="https://github.com/shadcn.png" alt="User" />
            <span className="text-xs text-muted-foreground">Medium</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Avatar size="large" src="https://github.com/shadcn.png" alt="User" />
            <span className="text-xs text-muted-foreground">Large</span>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Shapes">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center space-y-2">
            <Avatar 
              size="medium" 
              src="https://github.com/shadcn.png" 
              alt="User" 
              shape="circle" 
            />
            <span className="text-xs text-muted-foreground">Circle</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Avatar 
              size="medium" 
              src="https://github.com/shadcn.png" 
              alt="User" 
              shape="square" 
            />
            <span className="text-xs text-muted-foreground">Square</span>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Fallback">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar size="medium" alt="John Doe" />
              <span className="text-xs text-muted-foreground">With Name</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Avatar size="medium" />
              <span className="text-xs text-muted-foreground">No Name</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            When no image is provided, the avatar shows the first letter of the alt text or a generic icon.
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Grouped Avatars">
        <div className="space-y-4">
          <div className="flex -space-x-2">
            <Avatar size="medium" src="https://github.com/shadcn.png" alt="User 1" />
            <Avatar size="medium" src="https://github.com/vercel.png" alt="User 2" />
            <Avatar size="medium" src="https://github.com/tailwindlabs.png" alt="User 3" />
            <Avatar size="medium" alt="+2" className="bg-gray-100 border border-gray-200" />
          </div>
          <p className="text-sm text-muted-foreground">
            Group avatars together by using negative margin on the x-axis.
          </p>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
