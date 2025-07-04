import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

export const WithClass: Story = {
  render: (args) => (
    <Card {...args} className="border">
      <CardContent>Simple card</CardContent>
    </Card>
  ),
};

export const AnimatedEntry: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>Animated card</CardContent>
    </Card>
  ),
};

// Cyberpunk Variants
export const CyberpunkMatrix: Story = {
  render: (args) => (
    <Card {...args} variant="cyberpunk-matrix">
      <CardHeader>
        <CardTitle>Matrix Protocol</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Access the digital reality through the Matrix interface.</p>
        <p>Status: <span className="text-green-400">ONLINE</span></p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-green-300">Last sync: 2024-10-24 14:30:00</p>
      </CardFooter>
    </Card>
  ),
};

export const CyberpunkDoom: Story = {
  render: (args) => (
    <Card {...args} variant="cyberpunk-doom">
      <CardHeader>
        <CardTitle>DOOM Protocol</CardTitle>
      </CardHeader>
      <CardContent>
        <p>High-intensity combat systems activated.</p>
        <p>Armor: <span className="text-red-400">67%</span></p>
        <p>Ammunition: <span className="text-red-400">234/500</span></p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-red-300">Threat level: EXTREME</p>
      </CardFooter>
    </Card>
  ),
};

export const CyberpunkGhost: Story = {
  render: (args) => (
    <Card {...args} variant="cyberpunk-ghost">
      <CardHeader>
        <CardTitle>Ghost Protocol</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Stealth systems engaged. Operating in shadow mode.</p>
        <p>Visibility: <span className="text-gray-400">12%</span></p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-300">Stealth mode: ACTIVE</p>
      </CardFooter>
    </Card>
  ),
};

export const CyberpunkNeon: Story = {
  render: (args) => (
    <Card {...args} variant="cyberpunk-neon">
      <CardHeader>
        <CardTitle>Neon Protocol</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to Night City. Neural interface online.</p>
        <p>Cyberware: <span className="text-pink-400">89%</span></p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-pink-300">Jack-in status: CONNECTED</p>
      </CardFooter>
    </Card>
  ),
};

// Cyberpunk Cards with Effects
export const CyberpunkWithEffects: Story = {
  render: (args) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card {...args} variant="cyberpunk-matrix" cyberpunkGlow="intense" scanlines>
        <CardHeader>
          <CardTitle>Matrix Glow + Scanlines</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Intense glow effect with retro CRT scanlines.</p>
          <p>Visual enhancement: <span className="text-green-400">MAXIMUM</span></p>
        </CardContent>
      </Card>
      
      <Card {...args} variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
        <CardHeader>
          <CardTitle>DOOM Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Elevated surface with normal glow intensity.</p>
          <p>Combat readiness: <span className="text-red-400">ACTIVE</span></p>
        </CardContent>
      </Card>
      
      <Card {...args} variant="cyberpunk-ghost" matrixRain>
        <CardHeader>
          <CardTitle>Ghost Matrix Rain</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Digital rain effect overlaying ghost protocol.</p>
          <p>Stealth level: <span className="text-gray-400">PHANTOM</span></p>
        </CardContent>
      </Card>
      
      <Card {...args} variant="cyberpunk-neon" cyberpunkGlow="subtle" scanlines elevated>
        <CardHeader>
          <CardTitle>Neon Complete</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Full cyberpunk effects stack activated.</p>
          <p>Neural load: <span className="text-pink-400">OPTIMAL</span></p>
        </CardContent>
      </Card>
    </div>
  ),
};

// All Cyberpunk Card Variants Showcase
export const CyberpunkShowcase: Story = {
  render: (args) => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-green-400">Cyberpunk Card Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Green digital aesthetic</p>
              <p>Status: <span className="text-green-400">ONLINE</span></p>
            </CardContent>
          </Card>
          
          <Card variant="cyberpunk-doom" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>DOOM</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Red combat interface</p>
              <p>Mode: <span className="text-red-400">COMBAT</span></p>
            </CardContent>
          </Card>
          
          <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Ghost</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stealth gray theme</p>
              <p>Status: <span className="text-gray-400">HIDDEN</span></p>
            </CardContent>
          </Card>
          
          <Card variant="cyberpunk-neon" cyberpunkGlow="normal">
            <CardHeader>
              <CardTitle>Neon</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Pink cyber aesthetic</p>
              <p>Jack-in: <span className="text-pink-400">ACTIVE</span></p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Interactive Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="cyberpunk-matrix" cyberpunkGlow="intense" scanlines matrixRain>
            <CardHeader>
              <CardTitle>Ultimate Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <p>All Matrix effects combined:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Intense glow</li>
                <li>CRT scanlines</li>
                <li>Digital rain overlay</li>
                <li>Interactive hover states</li>
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-green-300">Hover to see effects</p>
            </CardFooter>
          </Card>
          
          <Card variant="cyberpunk-doom" cyberpunkGlow="intense" scanlines elevated>
            <CardHeader>
              <CardTitle>Ultimate DOOM</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Full DOOM experience:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Intense red glow</li>
                <li>Elevated surface</li>
                <li>Combat scanlines</li>
                <li>Aggressive hover states</li>
              </ul>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-red-300">Combat ready</p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Content Showcase</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card variant="cyberpunk-matrix" cyberpunkGlow="normal" scanlines>
            <CardHeader>
              <CardTitle>System Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>CPU Usage</span>
                  <span className="text-green-400">73%</span>
                </div>
                <div className="flex justify-between">
                  <span>Memory</span>
                  <span className="text-green-400">8.2GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Network</span>
                  <span className="text-green-400">1.2Gb/s</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
            <CardHeader>
              <CardTitle>Combat Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Health</span>
                  <span className="text-red-400">85/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Armor</span>
                  <span className="text-red-400">67/100</span>
                </div>
                <div className="flex justify-between">
                  <span>Ammo</span>
                  <span className="text-red-400">234/500</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card variant="cyberpunk-neon" cyberpunkGlow="normal" scanlines>
            <CardHeader>
              <CardTitle>Neural Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Bandwidth</span>
                  <span className="text-pink-400">89%</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency</span>
                  <span className="text-pink-400">12ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Stability</span>
                  <span className="text-pink-400">OPTIMAL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'A comprehensive showcase of all cyberpunk card variants, effects, and real-world usage examples.'
      }
    }
  }
};
