import React, { useState, useEffect } from 'react';
import { Loader, PageLoader } from '../../components/Loader';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function LoaderDemo() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    if (showPageLoader) {
      const timer = setTimeout(() => {
        setShowPageLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showPageLoader]);

  return (
    <ComponentShowcase 
      title="Loader" 
      description="A collection of loading indicators to show the status of ongoing user actions."
    >
      <ComponentVariant title="Sizes">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <Loader size="sm" />
            <span className="text-xs text-muted-foreground">Small</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader size="md" />
            <span className="text-xs text-muted-foreground">Medium (default)</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader size="lg" />
            <span className="text-xs text-muted-foreground">Large</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader size="xl" />
            <span className="text-xs text-muted-foreground">X-Large</span>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Variants">
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="primary" />
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="secondary" />
            <span className="text-xs text-muted-foreground">Secondary</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="success" />
            <span className="text-xs text-muted-foreground">Success</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="danger" />
            <span className="text-xs text-muted-foreground">Danger</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="warning" />
            <span className="text-xs text-muted-foreground">Warning</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Loader variant="info" />
            <span className="text-xs text-muted-foreground">Info</span>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Text">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Loader size="sm" />
            <span className="text-sm">Loading data...</span>
          </div>
          <div className="flex items-center space-x-2">
            <Loader size="md" variant="success" />
            <span className="text-sm">Processing your request...</span>
          </div>
          <div className="flex items-center space-x-2">
            <Loader size="lg" variant="warning" />
            <span className="text-sm">This may take a few moments...</span>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="In a Button">
        <div className="space-x-4">
          <Button 
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size="sm" className="mr-2" />
                Processing...
              </>
            ) : 'Submit'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader size="sm" variant="primary" className="mr-2" />
                Saving...
              </>
            ) : 'Save Changes'}
          </Button>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Full Width">
        <div className="space-y-4">
          <div className="p-4 border rounded-md">
            <Loader fullWidth />
          </div>
          <p className="text-sm text-muted-foreground">
            The loader will take up the full width of its container.
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Page Loader">
        <div className="space-y-4">
          <Button 
            variant="outline" 
            onClick={() => setShowPageLoader(true)}
          >
            Show Page Loader
          </Button>
          <p className="text-sm text-muted-foreground">
            Click the button to see the page loader in action. It will automatically hide after 2 seconds.
          </p>
        </div>
      </ComponentVariant>

      {showPageLoader && <PageLoader />}
    </ComponentShowcase>
  );
}
