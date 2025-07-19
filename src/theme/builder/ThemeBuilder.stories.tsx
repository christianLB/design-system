import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Container } from '../../components/Container';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Stack } from '../../components/Stack';
import { ThemeProvider } from '../ThemeContext';
import { createThemeBuilder, quickTheme } from './ThemeBuilder';
import { useThemeBuilder } from '../../hooks/useThemeBuilder';

const meta: Meta = {
  title: 'Theme/Theme Builder',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Theme Builder Demo Component
 */
function ThemeBuilderDemo() {
  const [currentPreset, setCurrentPreset] = useState<'light' | 'dark' | 'futuristic' | 'high-contrast'>('light');
  
  const {
    build,
    apply,
    withColors,
    withVariant,
    withSpacing,
    validation,
    isValid,
    hasChanges,
  } = useThemeBuilder(currentPreset, { autoApply: true, validateOnBuild: true });

  const handleCustomColors = () => {
    withColors({
      primary: '#9333ea', // Purple
      secondary: '#059669', // Green
      destructive: '#dc2626', // Red
    });
    build();
  };

  const handleVariantChange = (variant: 'default' | 'compact' | 'comfortable' | 'high-contrast') => {
    withVariant(variant);
    build();
  };

  const handleSpacingChange = () => {
    withSpacing({
      sm: '0.75rem',
      md: '1.5rem',
      lg: '2.25rem',
      xl: '3rem',
    });
    build();
  };

  const presets = [
    { key: 'light', label: 'Light' },
    { key: 'dark', label: 'Dark' },
    { key: 'futuristic', label: 'Futuristic' },
    { key: 'high-contrast', label: 'High Contrast' },
  ] as const;

  const variants = [
    { key: 'default', label: 'Default' },
    { key: 'compact', label: 'Compact' },
    { key: 'comfortable', label: 'Comfortable' },
    { key: 'high-contrast', label: 'High Contrast' },
  ] as const;

  return (
    <Container maxWidth="6xl" className="p-8">
      <Stack spacing="xl">
        <div>
          <Heading level={1} className="mb-4">
            Theme Builder System
          </Heading>
          <Text variant="body" className="text-gray-600 dark:text-gray-300">
            Explore the powerful theme builder system with composition, variants, and real-time customization.
          </Text>
        </div>

        {/* Controls */}
        <Card className="p-6">
          <Stack spacing="lg">
            <div>
              <Heading level={3} className="mb-4">Theme Controls</Heading>
              
              {/* Base Theme Preset */}
              <div className="mb-6">
                <Text variant="body" className="font-medium mb-3">Base Theme:</Text>
                <div className="flex gap-2 flex-wrap">
                  {presets.map((preset) => (
                    <Button
                      key={preset.key}
                      variant={currentPreset === preset.key ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setCurrentPreset(preset.key)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div className="mb-6">
                <Text variant="body" className="font-medium mb-3">Variants:</Text>
                <div className="flex gap-2 flex-wrap">
                  {variants.map((variant) => (
                    <Button
                      key={variant.key}
                      variant="outline"
                      size="sm"
                      onClick={() => handleVariantChange(variant.key)}
                    >
                      {variant.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Actions */}
              <div className="mb-6">
                <Text variant="body" className="font-medium mb-3">Customizations:</Text>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCustomColors}
                  >
                    Custom Colors
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSpacingChange}
                  >
                    Larger Spacing
                  </Button>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 text-sm">
                <div className={`px-3 py-1 rounded-full ${isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isValid ? '✓ Valid' : '⚠ Has Issues'}
                </div>
                {hasChanges && (
                  <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    Has Changes
                  </div>
                )}
              </div>
            </div>
          </Stack>
        </Card>

        {/* Validation Results */}
        {validation && !validation.valid && (
          <Card className="p-6 border-red-200 bg-red-50">
            <Heading level={4} className="text-red-800 mb-3">
              Validation Issues
            </Heading>
            <div className="space-y-2">
              {validation.errors.map((error, index) => (
                <div key={index} className="text-sm text-red-700">
                  <strong>{error.property}:</strong> {error.message}
                </div>
              ))}
              {validation.warnings.map((warning, index) => (
                <div key={index} className="text-sm text-orange-700">
                  <strong>{warning.property}:</strong> {warning.message}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Preview Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Stack spacing="md">
              <Heading level={3}>Primary Elements</Heading>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </Stack>
          </Card>

          <Card className="p-6">
            <Stack spacing="md">
              <Heading level={3}>Text Hierarchy</Heading>
              <Heading level={4}>Heading Level 4</Heading>
              <Text variant="body">Body text with regular weight and standard size.</Text>
              <Text variant="caption" className="text-gray-600 dark:text-gray-400">
                Caption text that's smaller and muted.
              </Text>
            </Stack>
          </Card>

          <Card className="p-6">
            <Stack spacing="md">
              <Heading level={3}>Status Colors</Heading>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-green-100 text-green-800 rounded">Success State</div>
                <div className="px-3 py-2 bg-red-100 text-red-800 rounded">Error State</div>
                <div className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded">Warning State</div>
                <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded">Info State</div>
              </div>
            </Stack>
          </Card>
        </div>

        {/* Theme Information */}
        <Card className="p-6">
          <Heading level={3} className="mb-4">Theme Information</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Text variant="body" className="font-medium mb-2">Features:</Text>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                <li>• Fluent API for theme composition</li>
                <li>• Theme inheritance and merging</li>
                <li>• Variant system (compact, comfortable, high-contrast)</li>
                <li>• Real-time validation with accessibility checks</li>
                <li>• CSS variable generation</li>
                <li>• Serialization support</li>
              </ul>
            </div>
            <div>
              <Text variant="body" className="font-medium mb-2">Theme Builder API:</Text>
              <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`new ThemeBuilder()
  .extends('light')
  .withColors({ primary: '#9333ea' })
  .withVariant('comfortable')
  .build()`}
              </pre>
            </div>
          </div>
        </Card>
      </Stack>
    </Container>
  );
}

/**
 * Interactive Theme Builder Story
 */
export const Interactive: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeBuilderDemo />
    </ThemeProvider>
  ),
};

/**
 * Quick Theme Examples
 */
function QuickThemeExamples() {
  const examples = [
    {
      name: 'Corporate Theme',
      description: 'Professional blue theme with comfortable spacing',
      builder: createThemeBuilder()
        .extends('light')
        .withColors({ primary: '#2563eb', secondary: '#475569' })
        .withVariant('comfortable'),
    },
    {
      name: 'Creative Theme',
      description: 'Vibrant purple theme with compact layout',
      builder: createThemeBuilder()
        .extends('dark')
        .withColors({ primary: '#9333ea', secondary: '#059669' })
        .withVariant('compact'),
    },
    {
      name: 'Accessible Theme',
      description: 'High contrast theme for accessibility',
      builder: quickTheme('high-contrast'),
    },
  ];

  return (
    <Container maxWidth="6xl" className="p-8">
      <Stack spacing="xl">
        <div>
          <Heading level={1} className="mb-4">
            Quick Theme Examples
          </Heading>
          <Text variant="body" className="text-gray-600 dark:text-gray-300">
            Pre-configured theme examples showing different use cases.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card key={index} className="p-6">
              <Stack spacing="md">
                <div>
                  <Heading level={4} className="mb-2">{example.name}</Heading>
                  <Text variant="caption" className="text-gray-600 dark:text-gray-400">
                    {example.description}
                  </Text>
                </div>
                
                <div className="space-y-3">
                  <Button variant="primary" size="sm" className="w-full">
                    Primary Action
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full">
                    Secondary Action
                  </Button>
                  <div className="h-4 bg-primary-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </Stack>
            </Card>
          ))}
        </div>
      </Stack>
    </Container>
  );
}

export const QuickThemes: Story = {
  render: () => (
    <ThemeProvider>
      <QuickThemeExamples />
    </ThemeProvider>
  ),
};