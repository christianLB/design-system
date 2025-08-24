import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';

// Import ThemeProvider and themes
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { lightTheme } from './theme/theme.light';
import { darkTheme } from './theme/theme.dark';
import { futuristicTheme } from './theme/theme.futuristic';
import { cyberpunkTheme } from './theme/theme.cyberpunk';
import { alienTheme } from './theme/theme.alien';
import { mirthaTheme } from './theme/theme.mirtha';

// Import migrated components - Phase 2 & 3
import { Button } from './components/Button/Button';
import { Card, CardHeader, CardTitle, CardContent } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/Select/Select';
import { Alert } from './components/Alert/Alert';
import { Badge } from './components/Badge/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs/Tabs';

// Import P1 Priority Components
import { Checkbox } from './components/Checkbox/Checkbox';
import { RadioGroup } from './components/RadioGroup/RadioGroup';
import { Progress } from './components/Progress/Progress';
import { Tooltip } from './components/Tooltip/Tooltip';
import { Avatar } from './components/Avatar/Avatar';

const themes = {
  light: lightTheme,
  dark: darkTheme,
  futuristic: futuristicTheme,
  cyberpunk: cyberpunkTheme,
  alien: alienTheme,
  mirtha: mirthaTheme,
};

function MigratedComponentsTest() {
  const { theme, setTheme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('option1');
  const [showAlert, setShowAlert] = useState(true);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('radio1');
  const [progressValue, setProgressValue] = useState(65);
  
  const currentThemeName = theme?.meta?.name || 'light';
  
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Theme Selector */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Theme Testing - Migrated Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap mb-4">
            {Object.keys(themes).map((themeName) => (
              <Button
                key={themeName}
                onClick={() => setTheme(themeName)}
                variant={currentThemeName.toLowerCase() === themeName ? 'primary' : 'outline'}
                size="sm"
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </Button>
            ))}
          </div>
          <p className="text-muted-foreground">
            Current theme: <strong>{currentThemeName}</strong>
          </p>
        </CardContent>
      </Card>
      
      {/* Phase 2 Core Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Button Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="primary" fullWidth>Primary Button</Button>
            <Button variant="secondary" fullWidth>Secondary Button</Button>
            <Button variant="destructive" fullWidth>Destructive Button</Button>
            <Button variant="success" fullWidth>Success Button</Button>
            <Button variant="outline" fullWidth>Outline Button</Button>
            <Button variant="ghost" fullWidth>Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button disabled fullWidth>Disabled Button</Button>
          </CardContent>
        </Card>
        
        <Card variant="default" elevated>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is an elevated card with theme support.</p>
            <div className="mt-4">
              <Card variant="cyberpunk-matrix">
                <CardContent>
                  <p className="text-sm">Nested cyberpunk card</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Input Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="input1"
              label="Normal Input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something..."
            />
            <Input
              id="input2"
              label="Error Input"
              value="Invalid data"
              onChange={() => {}}
              error="This field has an error"
            />
            <Input
              id="input3"
              label="Disabled Input"
              value="Disabled"
              onChange={() => {}}
              disabled
            />
          </CardContent>
        </Card>
      </div>
      
      {/* P0 Priority Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Component</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
                <SelectItem value="option4" disabled>Disabled Option</SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-4 text-sm text-muted-foreground">
              Selected: {selectValue}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alert Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Alert variant="default" title="Default Alert">
              This is a default alert message.
            </Alert>
            <Alert variant="success" title="Success!" dismissible onClose={() => {}}>
              Operation completed successfully.
            </Alert>
            <Alert variant="warning" title="Warning">
              Please review your settings.
            </Alert>
            <Alert variant="destructive" title="Error">
              Something went wrong!
            </Alert>
            <Alert variant="info" title="Info">
              Here's some helpful information.
            </Alert>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Badge Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                <TabsTrigger value="tab4" disabled>Disabled</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <p>Content for Tab 1 with theme support</p>
              </TabsContent>
              <TabsContent value="tab2">
                <p>Content for Tab 2 with theme support</p>
              </TabsContent>
              <TabsContent value="tab3">
                <p>Content for Tab 3 with theme support</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* P1 Priority Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Checkbox & Radio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Checkbox 
                label="Checkbox option"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
              />
              <Checkbox 
                label="Disabled checkbox"
                checked={true}
                disabled
                onChange={() => {}}
              />
            </div>
            <RadioGroup
              name="radio-test"
              legend="Choose an option"
              options={[
                { label: 'Option 1', value: 'radio1' },
                { label: 'Option 2', value: 'radio2' },
                { label: 'Option 3', value: 'radio3' },
                { label: 'Disabled', value: 'radio4', disabled: true },
              ]}
              value={radioValue}
              onChange={setRadioValue}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Progress Component</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={progressValue} variant="default" size="md" />
            <Progress value={75} variant="success" size="md" />
            <Progress value={45} variant="warning" size="md" />
            <Progress value={25} variant="danger" size="md" />
            <Progress isIndeterminate variant="primary" size="md" />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
              >
                -10
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
              >
                +10
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Avatar Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center flex-wrap">
              <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="sm" />
              <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" />
              <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="lg" />
              <Avatar alt="JD" size="xl" shape="square" />
              <Avatar alt="AB" size="md" />
              <Avatar alt="XY" size="lg" shape="square" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Tooltip Component</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Tooltip content="Default tooltip">
                <Button variant="outline">Default</Button>
              </Tooltip>
              <Tooltip content="Primary tooltip" variant="primary">
                <Button variant="primary">Primary</Button>
              </Tooltip>
              <Tooltip content="Success tooltip" variant="success">
                <Button variant="success">Success</Button>
              </Tooltip>
              <Tooltip content="Warning tooltip" variant="warning">
                <Badge variant="warning">Warning</Badge>
              </Tooltip>
              <Tooltip content="Danger tooltip" variant="danger">
                <Badge variant="destructive">Danger</Badge>
              </Tooltip>
              <Tooltip content="This is a tooltip with a longer text that wraps to multiple lines" position="bottom">
                <Button variant="outline">Bottom Position</Button>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Theme Color Preview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Current Theme Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              'background', 'foreground', 'primary', 'secondary',
              'accent', 'muted', 'card', 'destructive',
              'success', 'warning', 'info', 'border'
            ].map((color) => (
              <div key={color} className="text-center">
                <div
                  className="w-full h-16 rounded-md border border-border mb-2"
                  style={{ backgroundColor: `var(--${color})` }}
                />
                <p className="text-xs text-muted-foreground">{color}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main App with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <MigratedComponentsTest />
    </ThemeProvider>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);