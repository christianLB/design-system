import React, { useState, useEffect } from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  const startLoading = (indeterminate = false) => {
    setIsIndeterminate(indeterminate);
    setIsLoading(true);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading && !isIndeterminate) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          if (newProgress >= 100) {
            setIsLoading(false);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 500);
    } else if (isLoading && isIndeterminate) {
      // For indeterminate, just clear after 3 seconds
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, isIndeterminate]);

  return (
    <ComponentShowcase 
      title="Progress Bar" 
      description="A progress bar component that displays the progress of a task."
    >
      <ComponentVariant title="Basic">
        <div className="space-y-4">
          <ProgressBar value={25} variant="primary" />
          <ProgressBar value={50} variant="primary" />
          <ProgressBar value={75} variant="primary" />
          <ProgressBar value={100} variant="primary" />
        </div>
      </ComponentVariant>

      <ComponentVariant title="Sizes">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Small</p>
            <ProgressBar value={35} size="sm" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Medium (default)</p>
            <ProgressBar value={50} size="md" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Large</p>
            <ProgressBar value={65} size="lg" />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Variants">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Default</p>
            <ProgressBar value={30} variant="default" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary</p>
            <ProgressBar value={45} variant="primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Success</p>
            <ProgressBar value={60} variant="success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Warning</p>
            <ProgressBar value={75} variant="warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Danger</p>
            <ProgressBar value={90} variant="danger" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Info</p>
            <ProgressBar value={100} variant="info" />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Without Label">
        <div className="space-y-4">
          <ProgressBar value={25} showLabel={false} />
          <ProgressBar value={50} showLabel={false} variant="success" />
          <ProgressBar value={75} showLabel={false} variant="warning" />
        </div>
      </ComponentVariant>

      <ComponentVariant title="Custom Label Format">
        <div className="space-y-4">
          <ProgressBar 
            value={75} 
            labelFormat={(val) => `Uploaded: ${Math.round(val)}%`} 
          />
          <ProgressBar 
            value={125} 
            maxValue={200}
            labelFormat={(val) => `${val} of 200 MB`} 
          />
          <ProgressBar 
            value={3} 
            maxValue={5}
            labelFormat={(val) => `Step ${Math.round(val)} of 5`} 
          />
        </div>
      </ComponentVariant>

      <ComponentVariant title="Indeterminate">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Indeterminate state (unknown duration)</p>
            <ProgressBar isIndeterminate />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground mb-2">With custom message</p>
              <div className="relative">
                <ProgressBar 
                  value={0}
                  isIndeterminate 
                  labelFormat={() => "Processing files..."} 
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Button 
              variant="outline" 
              onClick={() => startLoading(true)}
              disabled={isLoading}
            >
              {isLoading && isIndeterminate ? 'Processing...' : 'Start Process'}
            </Button>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Interactive Example">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">File Upload Progress</span>
              <span className="text-sm text-muted-foreground">
                {isLoading ? 'In Progress...' : progress === 100 ? 'Completed!' : 'Ready'}
              </span>
            </div>
            <ProgressBar 
              value={progress} 
              variant={progress === 100 ? 'success' : 'primary'}
            />
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={() => startLoading()}
              disabled={isLoading && !isIndeterminate}
            >
              {isLoading && !isIndeterminate ? 'Uploading...' : 'Start Upload'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => startLoading(true)}
              disabled={isLoading && isIndeterminate}
            >
              {isLoading && isIndeterminate ? 'Processing...' : 'Start Process'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setProgress(0);
                setIsLoading(false);
              }}
            >
              Reset
            </Button>
          </div>
          
          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Try both buttons to see different loading behaviors. The first shows determinate progress, 
              while the second shows an indeterminate state for processes with unknown duration.
            </p>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
