import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Tabs';
import Card from '../../components/Card';
import { Button } from '../../components/Button';
import { ComponentShowcase, ComponentVariant } from './ComponentShowcase';

export function TabsDemo() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <ComponentShowcase 
      title="Tabs" 
      description="A set of layered sections of content—known as tab panels—that are displayed one at a time."
    >
      <ComponentVariant title="Default Tabs">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-4">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Account</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Make changes to your account here. Click save when you're done.
                </p>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name"
                      className="w-full p-2 border rounded mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full p-2 border rounded mt-1 text-sm"
                    />
                  </div>
                  <div className="pt-2">
                    <Button>Save changes</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="mt-4">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Password</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Change your password here. After saving, you'll be logged out.
                </p>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Current password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded mt-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">New password</label>
                    <input 
                      type="password" 
                      className="w-full p-2 border rounded mt-1 text-sm"
                    />
                  </div>
                  <div className="pt-2">
                    <Button>Update password</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </ComponentVariant>

      <ComponentVariant title="With Icons">
        <Tabs defaultValue="profile" className="w-[500px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-4">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Update your profile information.
                </p>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-4">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust your application settings.
                </p>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="billing" className="mt-4">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Billing</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription and billing information.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </ComponentVariant>

      <ComponentVariant title="Controlled Tabs">
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="p-4 border rounded">
            {activeTab === 'overview' && (
              <div>
                <h3 className="font-medium mb-2">Overview</h3>
                <p className="text-sm text-muted-foreground">
                  This is the overview content. You can programmatically control which tab is active.
                </p>
              </div>
            )}
            {activeTab === 'analytics' && (
              <div>
                <h3 className="font-medium mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  View your analytics data here.
                </p>
              </div>
            )}
            {activeTab === 'reports' && (
              <div>
                <h3 className="font-medium mb-2">Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Generate and view reports.
                </p>
              </div>
            )}
            {activeTab === 'notifications' && (
              <div>
                <h3 className="font-medium mb-2">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your notification settings.
                </p>
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveTab('overview')}
              disabled={activeTab === 'overview'}
            >
              Go to Overview
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setActiveTab('analytics')}
              disabled={activeTab === 'analytics'}
            >
              View Analytics
            </Button>
          </div>
        </div>
      </ComponentVariant>
    </ComponentShowcase>
  );
}
