import React, { useState } from 'react';
import { Switch } from '../../components/Switch';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';
import { Label } from '../../components/Label';

type NotificationPreference = 'email' | 'push' | 'sms' | 'none';

export function SwitchDemo() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<{
    email: boolean;
    push: boolean;
    sms: boolean;
  }>({
    email: true,
    push: true,
    sms: false,
  });

  const handleNotificationChange = (type: NotificationPreference) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const toggleWithLoading = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsEnabled(!isEnabled);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ComponentShowcase 
      title="Switch" 
      description="A control that allows the user to toggle between checked and not checked."
    >
      <ComponentVariant title="Basic Usage">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Switch 
              id="airplane-mode" 
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
            />
            <Label htmlFor="airplane-mode">
              {isEnabled ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
          
          <div className="p-4 border rounded-md bg-muted/20">
            <p className="text-sm text-muted-foreground mb-3">
              Current state: <span className="font-medium">{isEnabled ? 'On' : 'Off'}</span>
            </p>
            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
              {`<Switch 
  id="airplane-mode"
  checked={isEnabled}
  onCheckedChange={setIsEnabled}
/>`}
            </pre>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Form">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-normal">
                    Email notifications
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Receive email notifications
                  </p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-normal">
                    Push notifications
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Receive push notifications
                  </p>
                </div>
                <Switch 
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications" className="font-normal">
                    SMS notifications
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Receive SMS notifications
                  </p>
                </div>
                <Switch 
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={() => handleNotificationChange('sms')}
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 border rounded-md bg-muted/20">
            <h4 className="text-sm font-medium mb-2">Current Settings</h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">
                  {notifications.email ? 'Enabled' : 'Disabled'}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Push:</span>
                <span className="font-medium">
                  {notifications.push ? 'Enabled' : 'Disabled'}
                </span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">SMS:</span>
                <span className="font-medium">
                  {notifications.sms ? 'Enabled' : 'Disabled'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="States">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="default-switch">Default</Label>
              <Switch id="default-switch" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="checked-switch">Checked</Label>
              <Switch id="checked-switch" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="disabled-switch" className="text-muted-foreground">
                Disabled
              </Label>
              <Switch id="disabled-switch" disabled />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="disabled-checked-switch" className="text-muted-foreground">
                Disabled (Checked)
              </Label>
              <Switch id="disabled-checked-switch" disabled defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="loading-switch">
                {isLoading ? 'Saving...' : 'Loading State'}
              </Label>
              <div className="flex items-center gap-2">
                <Switch 
                  id="loading-switch"
                  checked={isEnabled}
                  onCheckedChange={toggleWithLoading}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </ComponentVariant>

      <ComponentVariant title="With Icons">
        <div className="space-y-6">
          <div className="p-4 border rounded-md bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="block">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
              <Switch 
                id="theme-switch" 
                className="data-[state=checked]:bg-foreground/80"
              />
            </div>
          </div>
          
          <div className="p-4 border rounded-md bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30">
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
                    className="text-blue-600 dark:text-blue-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <Label className="block">Call Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive call notifications
                  </p>
                </div>
              </div>
              <Switch 
                id="call-notifications" 
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
