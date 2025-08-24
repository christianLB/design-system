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

// Import components to test
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Alert } from './components/Alert/Alert';
import { Badge } from './components/Badge/Badge';
import { Input } from './components/Input/Input';
import { Checkbox } from './components/Checkbox/Checkbox';
import { RadioGroup } from './components/RadioGroup/RadioGroup';
import { Select } from './components/Select/Select';
import { Tabs } from './components/Tabs/Tabs';
import { Modal } from './components/Modal/Modal';
import { Tooltip } from './components/Tooltip/Tooltip';
import { Progress } from './components/Progress/Progress';
import { Spinner } from './components/Spinner/Spinner';
import { Avatar } from './components/Avatar/Avatar';
import { MetricCard } from './components/MetricCard/MetricCard';

const themes = {
  light: lightTheme,
  dark: darkTheme,
  futuristic: futuristicTheme,
  cyberpunk: cyberpunkTheme,
  alien: alienTheme,
  mirtha: mirthaTheme,
};

function ThemeTestApp() {
  const { theme, setTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(50);
  const [selectedTab, setSelectedTab] = useState('tab1');

  const currentThemeName = theme?.meta?.name || 'light';

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Theme Selector */}
      <div className="mb-8 p-4 border border-border rounded-lg bg-card">
        <h1 className="text-3xl font-bold mb-4">Theme Testing Dashboard</h1>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(themes).map((themeName) => (
            <button
              key={themeName}
              onClick={() => setTheme(themeName)}
              className={`px-4 py-2 rounded-md border transition-all ${
                currentThemeName.toLowerCase() === themeName
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-secondary-foreground border-border hover:bg-accent'
              }`}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
            </button>
          ))}
        </div>
        <p className="mt-4 text-muted-foreground">
          Current theme: <strong>{currentThemeName}</strong>
        </p>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buttons Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Buttons</h2>
          <div className="space-y-2">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </Card>

        {/* Alerts Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Alerts</h2>
          <div className="space-y-2">
            <Alert variant="default">Default alert message</Alert>
            <Alert variant="success">Success alert message</Alert>
            <Alert variant="warning">Warning alert message</Alert>
            <Alert variant="error">Error alert message</Alert>
          </div>
        </Card>

        {/* Badges Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>

        {/* Form Controls */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Form Controls</h2>
          <div className="space-y-4">
            <Input placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <div className="flex items-center gap-2">
              <Checkbox id="check1" />
              <label htmlFor="check1">Checkbox option</label>
            </div>
            <Select>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </Select>
          </div>
        </Card>

        {/* Progress & Loading */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progress & Loading</h2>
          <div className="space-y-4">
            <Progress value={progress} max={100} />
            <div className="flex gap-2">
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                className="px-3 py-1 bg-secondary rounded"
              >
                -10
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                className="px-3 py-1 bg-secondary rounded"
              >
                +10
              </button>
            </div>
            <div className="flex justify-center">
              <Spinner size="lg" />
            </div>
          </div>
        </Card>

        {/* Avatars */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Avatars</h2>
          <div className="flex gap-4 items-center">
            <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="sm" />
            <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" />
            <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="lg" />
            <Avatar alt="JD" size="md" />
          </div>
        </Card>

        {/* Tabs */}
        <Card className="p-6 col-span-full">
          <h2 className="text-xl font-semibold mb-4">Tabs</h2>
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            tabs={[
              { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
              { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
              { id: 'tab3', label: 'Tab 3', content: <div>Content for Tab 3</div> },
            ]}
          />
        </Card>

        {/* Metric Cards */}
        <Card className="p-6 col-span-full">
          <h2 className="text-xl font-semibold mb-4">Metric Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard
              title="Total Users"
              value="1,234"
              change={12.5}
              trend="up"
              icon="👤"
            />
            <MetricCard
              title="Revenue"
              value="$45,678"
              change={-3.2}
              trend="down"
              icon="💰"
            />
            <MetricCard
              title="Active Sessions"
              value="892"
              change={8.7}
              trend="up"
              icon="📊"
            />
          </div>
        </Card>

        {/* Interactive Elements */}
        <Card className="p-6 col-span-full">
          <h2 className="text-xl font-semibold mb-4">Interactive Elements</h2>
          <div className="flex gap-4 items-center">
            <Tooltip content="This is a tooltip">
              <Button variant="outline">Hover for Tooltip</Button>
            </Tooltip>
            <Button onClick={() => setShowModal(true)}>Open Modal</Button>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
      >
        <p>This is a modal dialog to test theming.</p>
        <div className="mt-4 flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Confirm
          </Button>
        </div>
      </Modal>

      {/* Color Palette Display */}
      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Current Theme Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'background',
            'foreground',
            'primary',
            'secondary',
            'accent',
            'muted',
            'card',
            'destructive',
            'border',
          ].map((color) => (
            <div key={color} className="text-center">
              <div
                className={`w-full h-16 rounded-md border border-border bg-${color}`}
                style={{
                  backgroundColor: `var(--${color})`,
                }}
              />
              <p className="mt-1 text-sm text-muted-foreground">{color}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Main App with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <ThemeTestApp />
    </ThemeProvider>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);