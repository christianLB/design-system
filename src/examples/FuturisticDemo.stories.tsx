import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTheme } from '@/theme/ThemeContext';
import Button from '@/components/Button/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/Card/Card';
import { Dialog, DialogTitle, DialogDescription, DialogFooter as ModalFooter } from '@/components/Dialog/Dialog';
import { Loader } from '@/components/Loader';
import { Alert } from '@/components/Alert';
import { Stack } from '@/components/Stack';
import { Box } from '@/components/Box';
import { Text } from '@/components/Text';
// Note: Using placeholder components for Input and Badge
// These should be imported from the actual component files when available

const meta: Meta = {
  title: 'Examples/Futuristic Demo',
  parameters: {
    docs: {
      description: {
        component: 'Enhanced futuristic demo showcasing the new v3.3.0 theme improvements with professional aesthetics, performance optimizations, and comprehensive component coverage.',
      },
    },
    backgrounds: {
      default: 'futuristic',
      values: [
        { name: 'futuristic', value: '#0F172A' },
        { name: 'dark', value: '#000000' },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<Record<string, never>>;

export const FuturisticDemo: Story = {
  render: () => (
    <div data-theme="futuristic" className="futuristic-wrap min-h-screen p-6">
      <div className="futuristic-bg" />
      <DemoFlow />
    </div>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <div data-theme="futuristic" className="futuristic-wrap min-h-screen p-6">
      <div className="futuristic-bg" />
      <ComponentDemo />
    </div>
  ),
};

export const ProfessionalVariant: Story = {
  render: () => (
    <div data-theme="futuristic" className="futuristic-wrap min-h-screen p-6" style={{ filter: 'contrast(0.8)' } as React.CSSProperties}>
      <div className="futuristic-bg" />
      <ProfessionalDemo />
    </div>
  ),
};

const DemoFlow = () => {
  useTheme();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
      setOpen(false);
      setStep(3);
    }, 2000);
  };

  const resetDemo = () => {
    setOpen(false);
    setLoading(false);
    setDone(false);
    setStep(1);
  };

  return (
    <Stack gap="xl" className="max-w-4xl mx-auto stagger-children">
      <Box className="text-center mb-8">
        <Text as="h1" size="lg" color="emphasis" className="mb-4 glow-effect text-2xl">
          Futuristic Interface Demo v3.3.0
        </Text>
        <Text color="muted" className="mb-6">
          Experience the enhanced futuristic theme with professional aesthetics and smooth animations
        </Text>
        <Stack direction="row" gap="sm" justify="center">
          <span className={`px-2 py-1 rounded text-xs ${
            step >= 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>Launch</span>
          <span className={`px-2 py-1 rounded text-xs ${
            step >= 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>Process</span>
          <span className={`px-2 py-1 rounded text-xs ${
            step >= 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>Complete</span>
        </Stack>
      </Box>

      <Stack direction="row" gap="lg" wrap>
        <Box className="flex-1 min-w-[300px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Launch Sequence
                {step === 1 && <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">Ready</span>}
                {step === 2 && <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Processing</span>}
                {step === 3 && <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Complete</span>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4">
                {step === 1 && "Initialize the futuristic demo sequence with enhanced visual effects."}
                {step === 2 && "Processing your request with optimized animations..."}
                {step === 3 && "Demo sequence completed successfully!"}
              </Text>
              <Stack gap="md">
                <Text size="sm" color="muted">Features demonstrated:</Text>
                <ul className="text-sm text-[var(--muted-foreground)] space-y-1 ml-4">
                  <li>• Professional glow effects</li>
                  <li>• GPU-accelerated animations</li>
                  <li>• Enhanced accessibility</li>
                  <li>• Responsive optimizations</li>
                </ul>
              </Stack>
            </CardContent>
            <CardFooter>
              <Stack direction="row" gap="md" justify="between" className="w-full">
                <Button 
                  onClick={() => setOpen(true)} 
                  glow 
                  iconStart="Rocket"
                  disabled={loading || step === 2}
                >
                  {step === 1 ? "Launch Demo" : step === 2 ? "Processing..." : "Launch Again"}
                </Button>
                {step === 3 && (
                  <Button 
                    onClick={resetDemo} 
                    variant="outline" 
                    iconStart="RotateCcw"
                  >
                    Reset
                  </Button>
                )}
              </Stack>
            </CardFooter>
          </Card>
        </Box>

        <Box className="flex-1 min-w-[300px]">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <Box className="flex justify-between items-center p-3 rounded bg-[var(--muted)] border border-[var(--border)]">
                  <Text size="sm">Theme Version</Text>
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">v3.3.0</span>
                </Box>
                <Box className="flex justify-between items-center p-3 rounded bg-[var(--muted)] border border-[var(--border)]">
                  <Text size="sm">Performance</Text>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Optimized</span>
                </Box>
                <Box className="flex justify-between items-center p-3 rounded bg-[var(--muted)] border border-[var(--border)]">
                  <Text size="sm">Accessibility</Text>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">WCAG AA</span>
                </Box>
                <Box className="flex justify-between items-center p-3 rounded bg-[var(--muted)] border border-[var(--border)]">
                  <Text size="sm">Mobile Ready</Text>
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Yes</span>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Stack>

      {done && (
        <Alert variant="success" title="Mission Accomplished" className="fade-in-up">
          <Text>The futuristic demo has completed successfully! All new v3.3.0 features are working perfectly.</Text>
        </Alert>
      )}

      <Dialog isOpen={open} onClose={() => setOpen(false)}>
        <DialogTitle>🚀 Confirm Launch Sequence</DialogTitle>
        <DialogDescription className="mb-4">
          This will demonstrate the enhanced futuristic theme with:
          <ul className="mt-2 space-y-1 text-sm">
            <li>• Professional glow animations</li>
            <li>• Optimized performance</li>
            <li>• Improved accessibility</li>
          </ul>
        </DialogDescription>
        <ModalFooter>
          <Stack direction="row" gap="md">
            <Button 
              onClick={() => setOpen(false)} 
              variant="outline"
              iconStart="X"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirm} 
              glow 
              iconStart="Check"
              disabled={loading}
            >
              {loading ? "Launching..." : "Confirm Launch"}
            </Button>
          </Stack>
        </ModalFooter>
      </Dialog>

      {loading && (
        <Box className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="p-8 text-center">
            <Loader center className="mb-4" />
            <Text size="lg" className="mb-2">Processing Launch Sequence</Text>
            <Text size="sm" color="muted">Initializing futuristic components...</Text>
          </Card>
        </Box>
      )}
    </Stack>
  );
};

const ComponentDemo = () => {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Stack gap="xl" className="max-w-6xl mx-auto stagger-children">
      <Box className="text-center">
        <Text as="h1" size="lg" color="emphasis" className="mb-4 text-2xl">
          Component Showcase
        </Text>
        <Text color="muted">
          Comprehensive demonstration of all futuristic theme components
        </Text>
      </Box>

      <Stack direction="row" gap="lg" wrap>
        {/* Buttons Section */}
        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardTitle>Enhanced Buttons</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <Stack direction="row" gap="sm" wrap>
                <Button variant="primary" glow iconStart="Zap">Primary</Button>
                <Button variant="secondary" glow iconStart="Star">Secondary</Button>
                <Button variant="success" glow iconStart="Check">Success</Button>
                <Button variant="destructive" glow iconStart="AlertTriangle">Danger</Button>
              </Stack>
              <Stack direction="row" gap="sm" wrap>
                <Button variant="outline" elevated iconEnd="ArrowRight">Outline</Button>
                <Button variant="ghost" iconStart="Settings">Ghost</Button>
                <Button variant="link" iconEnd="ExternalLink">Link</Button>
              </Stack>
              <Stack direction="row" gap="sm" wrap>
                <Button iconStart="Plus" aria-label="Add" />
                <Button iconStart="Download" aria-label="Download" variant="outline" />
                <Button iconStart="Trash" aria-label="Delete" variant="destructive" />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Inputs Section */}
        <Card className="flex-1 min-w-[300px]">
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <input 
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--background)] text-[var(--foreground)] glow-effect"
                placeholder="Enter futuristic text..."
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              />
              <input 
                className="w-full px-3 py-2 border border-green-400 rounded bg-[var(--background)] text-[var(--foreground)] success"
                placeholder="Success state"
                defaultValue="Valid input"
              />
              <input 
                className="w-full px-3 py-2 border border-red-400 rounded bg-[var(--background)] text-[var(--foreground)] error"
                placeholder="Error state"
                defaultValue="Invalid input"
              />
              <input 
                className="w-full px-3 py-2 border border-[var(--border)] rounded bg-[var(--background)] text-[var(--foreground)] opacity-50 cursor-not-allowed"
                placeholder="Disabled state"
                disabled
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* Alerts Section */}
      <Stack gap="md">
        <Alert variant="success" title="System Online">
          All futuristic components are functioning optimally.
        </Alert>
        <Alert variant="warning" title="Performance Notice">
          Heavy effects are automatically disabled on mobile devices.
        </Alert>
        <Alert variant="destructive" title="Critical Update">
          Please upgrade to v3.3.0 for enhanced features.
        </Alert>
        <Alert variant="info" title="Pro Tip">
          Use the professional variant for corporate environments.
        </Alert>
      </Stack>
    </Stack>
  );
};

const ProfessionalDemo = () => {
  return (
    <Stack gap="xl" className="max-w-4xl mx-auto stagger-children">
      <Box className="text-center">
        <Text as="h1" size="lg" color="emphasis" className="mb-4 text-2xl">
          Professional Variant
        </Text>
        <Text color="muted">
          Subtle futuristic aesthetics perfect for business applications
        </Text>
      </Box>

      <Stack direction="row" gap="lg" wrap>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Corporate Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-4">Experience the professional futuristic theme with:</Text>
            <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
              <li>• Reduced glow intensity</li>
              <li>• Conservative color palette</li>
              <li>• Optimized for productivity</li>
              <li>• Enterprise-ready aesthetics</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Stack direction="row" gap="md">
              <Button variant="primary" iconStart="BarChart">View Analytics</Button>
              <Button variant="outline" iconStart="Settings">Configure</Button>
            </Stack>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Team Collaboration</CardTitle>
          </CardHeader>
          <CardContent>
            <Stack gap="md">
              <Box className="flex items-center gap-3 p-3 rounded border border-[var(--border)]">
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Online</span>
                <Text size="sm">12 team members active</Text>
              </Box>
              <Box className="flex items-center gap-3 p-3 rounded border border-[var(--border)]">
                <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">Sync</span>
                <Text size="sm">Data synchronized</Text>
              </Box>
            </Stack>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" iconStart="Users" fullWidth>
              Manage Team
            </Button>
          </CardFooter>
        </Card>
      </Stack>
    </Stack>
  );
};
