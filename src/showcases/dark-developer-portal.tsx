import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import '../../index.css';
import '../styles/showcase-fixes.css';

// Import ThemeProvider
import { ThemeProvider, useTheme } from '../theme/ThemeContext';

// Import all components
import { Button } from '../components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card/Card';
import { Badge } from '../components/Badge/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs/Tabs';
import { Progress } from '../components/Progress/Progress';
import { Alert } from '../components/Alert/Alert';
import { Avatar } from '../components/Avatar/Avatar';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/Select/Select';
import { Input } from '../components/Input/Input';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { RadioGroup } from '../components/RadioGroup/RadioGroup';
import { Tooltip } from '../components/Tooltip/Tooltip';

// Code block component
function CodeBlock({ language, code, title }: any) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <span className="text-sm font-mono text-gray-400">{title}</span>
          <Badge variant="secondary" size="sm">{language}</Badge>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-gray-300">{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
}

// API endpoint component
function APIEndpoint({ method, path, description, params }: any) {
  const getMethodColor = () => {
    switch(method) {
      case 'GET': return 'text-green-400';
      case 'POST': return 'text-blue-400';
      case 'PUT': return 'text-yellow-400';
      case 'DELETE': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
  
  return (
    <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:bg-gray-800 transition-colors">
      <div className="flex items-start gap-3 mb-2">
        <Badge variant="outline" className={`${getMethodColor()} font-mono`}>
          {method}
        </Badge>
        <code className="flex-1 font-mono text-sm">{path}</code>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{description}</p>
      {params && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <p className="text-xs text-muted-foreground mb-1">Parameters:</p>
          <div className="space-y-1">
            {params.map((param: any, i: number) => (
              <div key={i} className="flex gap-2 text-xs">
                <code className="text-blue-400">{param.name}</code>
                <span className="text-gray-500">({param.type})</span>
                <span className="text-gray-400">- {param.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Activity item component
function ActivityItem({ type, message, time, user }: any) {
  const getTypeIcon = () => {
    switch(type) {
      case 'commit': return '💾';
      case 'pr': return '🔀';
      case 'issue': return '🐛';
      case 'deploy': return '🚀';
      default: return '📝';
    }
  };
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
      <div className="text-xl">{getTypeIcon()}</div>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-muted-foreground">{user}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      </div>
    </div>
  );
}

function DarkDeveloperPortal() {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedVersion, setSelectedVersion] = useState('v2.0.0');
  const [terminalOutput, setTerminalOutput] = useState(['$ npm install @company/design-system']);
  
  // Force dark theme
  React.useEffect(() => {
    setTheme('dark');
  }, [setTheme]);
  
  // Simulate terminal output
  useEffect(() => {
    const outputs = [
      '✓ Package installed successfully',
      '$ npm run dev',
      'Starting development server...',
      '✓ Server running on http://localhost:3000',
    ];
    
    outputs.forEach((output, index) => {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, output]);
      }, (index + 1) * 1000);
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Developer Header */}
      <header className="bg-card border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 sm:gap-8 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">⚡</span>
                <span className="truncate">DevPortal</span>
              </h1>
              <nav className="hidden lg:flex gap-4 xl:gap-6">
                <Button variant="ghost" size="sm" className="min-h-[32px]">Documentation</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">API Reference</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Components</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Playground</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Community</Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search docs..."
                className="w-32 sm:w-48 lg:w-64 bg-gray-800 border-gray-700 min-h-[40px]"
              />
              <Tooltip content="GitHub">
                <Button variant="outline" size="sm" className="min-h-[32px]">
                  <span>🐙</span>
                </Button>
              </Tooltip>
              <Avatar alt="DV" size="md" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Quick Start Banner */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <Alert variant="info" className="bg-gray-800/50 border-blue-500/50">
            <strong>🎉 Version 2.0 Released!</strong> New components, improved performance, and TypeScript support. 
            <Button variant="link" size="sm" className="ml-2 min-h-[32px]">View changelog →</Button>
          </Alert>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Getting Started */}
          <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="install">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="install">Installation</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="config">Configuration</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                </TabsList>
                
                <TabsContent value="install" className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Choose your package manager</h3>
                    <RadioGroup
                      name="package-manager"
                      options={[
                        { label: 'npm', value: 'npm' },
                        { label: 'yarn', value: 'yarn' },
                        { label: 'pnpm', value: 'pnpm' },
                        { label: 'bun', value: 'bun' },
                      ]}
                      value="npm"
                      onChange={() => {}}
                    />
                  </div>
                  
                  <CodeBlock
                    language="bash"
                    title="Install via npm"
                    code={`npm install @company/design-system
npm install -D @company/design-system-types`}
                  />
                  
                  <CodeBlock
                    language="javascript"
                    title="Import in your app"
                    code={`import { Button, Card, Alert } from '@company/design-system'
import '@company/design-system/styles.css'

function App() {
  return (
    <Card>
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}`}
                  />
                </TabsContent>
                
                <TabsContent value="usage" className="mt-6 space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="angular">Angular</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                      <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="v2.0.0">v2.0.0</SelectItem>
                        <SelectItem value="v1.9.0">v1.9.0</SelectItem>
                        <SelectItem value="v1.8.0">v1.8.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <CodeBlock
                    language="tsx"
                    title="TypeScript Example"
                    code={`import React from 'react'
import { Button, ButtonProps } from '@company/design-system'

interface CustomButtonProps extends ButtonProps {
  icon?: React.ReactNode
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  icon, 
  children, 
  ...props 
}) => {
  return (
    <Button {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Button>
  )
}`}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Terminal */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="font-mono text-green-400">Terminal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded p-4 font-mono text-xs space-y-1 h-64 overflow-y-auto">
                {terminalOutput.map((line, i) => (
                  <div key={i} className={line.startsWith('✓') ? 'text-green-400' : 'text-gray-400'}>
                    {line}
                  </div>
                ))}
                <div className="animate-pulse">_</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* API Reference */}
        <Card className="mb-8 bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>API Reference</CardTitle>
              <Badge variant="success">REST API v2</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <APIEndpoint
                method="GET"
                path="/api/components"
                description="List all available components"
                params={[
                  { name: 'limit', type: 'number', description: 'Max items to return' },
                  { name: 'offset', type: 'number', description: 'Pagination offset' },
                ]}
              />
              <APIEndpoint
                method="POST"
                path="/api/themes"
                description="Create a custom theme"
                params={[
                  { name: 'name', type: 'string', description: 'Theme name' },
                  { name: 'colors', type: 'object', description: 'Color palette' },
                ]}
              />
              <APIEndpoint
                method="GET"
                path="/api/icons/:name"
                description="Get icon by name"
                params={[
                  { name: 'size', type: 'string', description: 'Icon size (sm|md|lg)' },
                  { name: 'color', type: 'string', description: 'Icon color' },
                ]}
              />
              <APIEndpoint
                method="PUT"
                path="/api/config"
                description="Update configuration"
                params={[
                  { name: 'config', type: 'object', description: 'Configuration object' },
                ]}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Stats */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle>Project Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Downloads</span>
                <Badge variant="success">247K/month</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Stars</span>
                <Badge variant="warning">12.3K ⭐</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Contributors</span>
                <Badge variant="info">187</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Open Issues</span>
                <Badge variant="destructive">43</Badge>
              </div>
              
              <div className="pt-4 border-t border-gray-800">
                <p className="text-sm text-muted-foreground mb-2">Bundle Size</p>
                <Progress value={28} variant="success" size="sm" />
                <p className="text-xs text-muted-foreground mt-1">28KB / 100KB (minified + gzip)</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="lg:col-span-2 bg-gray-900/50 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">View all</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <ActivityItem
                  type="commit"
                  message="feat: Add dark mode support for all components"
                  user="john.doe"
                  time="2 hours ago"
                />
                <ActivityItem
                  type="pr"
                  message="Merge PR #324: Fix button focus states"
                  user="sarah.smith"
                  time="5 hours ago"
                />
                <ActivityItem
                  type="issue"
                  message="Issue #451: Table component performance improvements"
                  user="mike.johnson"
                  time="1 day ago"
                />
                <ActivityItem
                  type="deploy"
                  message="v2.0.0 deployed to production"
                  user="deploy-bot"
                  time="2 days ago"
                />
                <ActivityItem
                  type="commit"
                  message="docs: Update migration guide for v2.0"
                  user="emily.brown"
                  time="3 days ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-2 sm:gap-3">
          <Tooltip content="Open Playground" position="left">
            <Button size="sm" variant="primary" className="rounded-full w-12 h-12 shadow-lg min-h-[48px]">
              ▶
            </Button>
          </Tooltip>
          <Tooltip content="Report Issue" position="left">
            <Button size="sm" variant="outline" className="rounded-full w-12 h-12 shadow-lg min-h-[48px]">
              🐛
            </Button>
          </Tooltip>
        </div>
      </main>
    </div>
  );
}

// App wrapper
function App() {
  return (
    <ThemeProvider>
      <DarkDeveloperPortal />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);