import React, { useState } from 'react';
import { RadioGroup } from '../../components/RadioGroup';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

type ThemePreference = 'light' | 'dark' | 'system';
type NotificationPreference = 'all' | 'mentions' | 'none';
type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

export function RadioGroupDemo() {
  const [selectedTheme, setSelectedTheme] = useState<ThemePreference>('system');
  const [notificationPref, setNotificationPref] = useState<NotificationPreference>('mentions');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('pro');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger'>('primary');
  const [selectedOrientation, setSelectedOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { 
      value: 'system', 
      label: 'System',
      description: 'Automatically switch between light and dark based on your system settings.' 
    },
  ];

  const notificationOptions = [
    { 
      value: 'all', 
      label: 'All notifications',
      description: 'Receive all notifications including mentions, replies, and updates.'
    },
    { 
      value: 'mentions', 
      label: 'Mentions only',
      description: 'Only receive notifications when you\'re mentioned or directly messaged.'
    },
    { 
      value: 'none', 
      label: 'No notifications',
      description: 'Mute all notifications. You can still check them manually.'
    },
  ];

  const planOptions = [
    { 
      value: 'free', 
      label: 'Free',
      description: 'Basic features for getting started. Perfect for individuals.'
    },
    { 
      value: 'pro', 
      label: 'Pro',
      description: 'Advanced features for power users. Includes analytics and priority support.'
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise',
      description: 'Custom solutions for large teams with advanced security and support.',
      disabled: true
    },
  ];

  const sizeOptions = [
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium (default)' },
    { value: 'lg', label: 'Large' },
  ];

  const variantOptions = [
    { value: 'default', label: 'Default' },
    { value: 'primary', label: 'Primary' },
    { value: 'success', label: 'Success' },
    { value: 'warning', label: 'Warning' },
    { value: 'danger', label: 'Danger' },
  ];

  const orientationOptions = [
    { value: 'vertical', label: 'Vertical (default)' },
    { value: 'horizontal', label: 'Horizontal' },
  ];

  return (
    <ComponentShowcase 
      title="Radio Group" 
      description="A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time."
    >
      <ComponentVariant title="Basic Usage">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Theme Preference</h3>
            <RadioGroup
              items={themeOptions}
              value={selectedTheme}
              onChange={setSelectedTheme as (value: string) => void}
              variant={selectedVariant}
              size={selectedSize}
              orientation={selectedOrientation}
            />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Notification Preferences</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Choose how you want to be notified about updates.
            </p>
            <RadioGroup
              items={notificationOptions}
              value={notificationPref}
              onChange={setNotificationPref as (value: string) => void}
              variant={selectedVariant}
              size={selectedSize}
              orientation={selectedOrientation}
            />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Subscription Plan</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Select your preferred subscription plan. <span className="text-amber-600">(Enterprise coming soon)</span>
            </p>
            <RadioGroup
              items={planOptions}
              value={selectedPlan}
              onChange={setSelectedPlan as (value: string) => void}
              variant={selectedVariant}
              size={selectedSize}
              orientation={selectedOrientation}
            />
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Sizes">
        <div className="space-y-6">
          {sizeOptions.map((size) => (
            <div key={size.value}>
              <h3 className="text-sm font-medium mb-2">{size.label}</h3>
              <RadioGroup
                items={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
                value="option1"
                size={size.value as 'sm' | 'md' | 'lg'}
                variant={selectedVariant}
                orientation={selectedOrientation}
              />
            </div>
          ))}
        </div>
      </ComponentVariant>

      <ComponentVariant title="Variants">
        <div className="space-y-6">
          {variantOptions.map((variant) => (
            <div key={variant.value}>
              <h3 className="text-sm font-medium mb-2">{variant.label}</h3>
              <RadioGroup
                items={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                ]}
                value="option1"
                variant={variant.value as any}
                size={selectedSize}
                orientation={selectedOrientation}
              />
            </div>
          ))}
        </div>
      </ComponentVariant>

      <ComponentVariant title="Orientation">
        <div className="space-y-6">
          {orientationOptions.map((orientation) => (
            <div key={orientation.value}>
              <h3 className="text-sm font-medium mb-2">{orientation.label}</h3>
              <RadioGroup
                items={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                value="option1"
                orientation={orientation.value as 'vertical' | 'horizontal'}
                variant={selectedVariant}
                size={selectedSize}
              />
            </div>
          ))}
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Error State">
        <div className="space-y-4">
          <RadioGroup
            label="Agreement"
            items={[
              { value: 'agree', label: 'I agree to the terms and conditions' },
              { value: 'disagree', label: 'I do not agree' },
            ]}
            variant={selectedVariant}
            size={selectedSize}
            orientation={selectedOrientation}
            error="You must agree to the terms and conditions to continue."
          />
          
          <p className="text-sm text-muted-foreground">
            The RadioGroup can display an error message when validation fails.
          </p>
        </div>
      </ComponentVariant>

      <ComponentVariant title="Customization">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Customize Appearance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Size</h4>
                <RadioGroup
                  items={sizeOptions}
                  value={selectedSize}
                  onChange={setSelectedSize as (value: string) => void}
                  variant="primary"
                  size="sm"
                  orientation="vertical"
                />
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Variant</h4>
                <RadioGroup
                  items={variantOptions}
                  value={selectedVariant}
                  onChange={setSelectedVariant as (value: string) => void}
                  variant="primary"
                  size="sm"
                  orientation="vertical"
                />
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Orientation</h4>
                <RadioGroup
                  items={orientationOptions}
                  value={selectedOrientation}
                  onChange={setSelectedOrientation as (value: string) => void}
                  variant="primary"
                  size="sm"
                  orientation="vertical"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <RadioGroup
              label="Select an option"
              description="This is a preview of your current settings."
              items={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3 (disabled)', disabled: true },
              ]}
              value="option1"
              variant={selectedVariant}
              size={selectedSize}
              orientation={selectedOrientation}
            />
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
