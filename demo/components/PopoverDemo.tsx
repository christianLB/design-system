import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../../components/Popover';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function PopoverDemo() {
  return (
    <ComponentShowcase 
      title="Popover" 
      description="A floating card that appears when a user interacts with an element."
    >
      <ComponentVariant title="Basic Popover">
        <div className="flex justify-center p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Popover Title</h4>
                <p className="text-sm text-muted-foreground">
                  This is a basic popover content. You can put any content here.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Custom Position">
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Top</Button>
              </PopoverTrigger>
              <PopoverContent side="top" className="w-48">
                <p className="text-sm">This popover appears on top</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Right</Button>
              </PopoverTrigger>
              <PopoverContent side="right" className="w-48">
                <p className="text-sm">This popover appears on the right</p>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Bottom</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" className="w-48">
                <p className="text-sm">This popover appears at the bottom</p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Left</Button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-48">
                <p className="text-sm">This popover appears on the left</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Form">
        <div className="flex justify-center p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Subscribe</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Subscribe to our newsletter</h4>
                  <p className="text-sm text-muted-foreground">
                    Get the latest updates and news.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="col-span-2 h-8 rounded border px-2 text-sm"
                    />
                  </div>
                  <Button className="mt-2 w-full">Subscribe</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
