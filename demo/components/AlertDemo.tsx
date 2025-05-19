import React from 'react';
import Alert from '../../components/Alert';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function AlertDemo() {
  return (
    <ComponentShowcase
      title="Alert"
      description="Displays a callout for user attention."
    >
      <ComponentVariant title="Variants">
        <div className="space-y-4 w-full">
          <Alert variant="info" title="Information">
            This is an informational alert. It provides useful information to the user.
          </Alert>
          <Alert variant="success" title="Success!">
            Your action was completed successfully. Everything is working as expected.
          </Alert>
          <Alert variant="warning" title="Warning">
            This action might have some consequences. Please review before proceeding.
          </Alert>
          <Alert variant="error" title="Error">
            Something went wrong. Please try again or contact support if the problem persists.
          </Alert>
        </div>
      </ComponentVariant>
      
      <ComponentVariant title="With Custom Content">
        <Alert variant="info" title="New Feature Available">
          <div className="space-y-2">
            <p>We've added new features to improve your experience:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dark mode support</li>
              <li>Improved performance</li>
              <li>New dashboard layout</li>
            </ul>
            <div className="mt-3 pt-2 border-t border-opacity-20 border-current">
              <button className="text-sm font-medium hover:underline">
                Learn more →
              </button>
            </div>
          </div>
        </Alert>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
