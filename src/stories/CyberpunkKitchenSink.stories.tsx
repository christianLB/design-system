import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Stack } from '../components/Stack';
import { Box } from '../components/Box';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import { Terminal } from '../components/Terminal';
import { HUD, HUDPanel, HUDMetric, HUDRadar, HUDProgressBar } from '../components/HUD';
import { HUDNotificationManager } from '../components/HUD/HUDNotification';
import { Progress } from '../components/Progress';
import { Badge } from '../components/Badge';
import { Alert } from '../components/Alert';
import { ThemeProvider } from '../theme';

const meta: Meta = {
  title: 'Themes/Cyberpunk/Kitchen Sink',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Cyberpunk Kitchen Sink - Complete Interface Demo

This story demonstrates a complete cyberpunk interface combining all available components in realistic scenarios:

## Featured Scenarios

### 🎮 Gaming Dashboard
A complete gaming interface with HUD elements, real-time stats, and combat information.

### 💻 Hacker Terminal
A realistic hacking interface with multiple terminal windows, system infiltration tools, and data mining displays.

### 🏢 Data Operations Center  
A corporate cyberpunk interface for monitoring systems, networks, and security operations.

### 🌃 Night City Interface
A futuristic city management system inspired by cyberpunk aesthetics.

## Key Features Demonstrated

- **Real-time Data Updates**: All metrics update dynamically with realistic data
- **Multi-layered Interfaces**: Complex layouts with overlapping HUD elements
- **Interactive Controls**: Live controls that affect the interface state
- **Immersive Theming**: Complete cyberpunk atmosphere with all visual effects
- **Responsive Design**: Works across all screen sizes and devices
- **Performance Optimization**: Smooth animations and efficient rendering

Each scenario represents a different use case for the cyberpunk design system, showcasing how components work together to create immersive digital experiences.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Realistic sample data generators
const generateMetrics = () => ({
  cpu: Math.floor(Math.random() * 40) + 60,
  memory: Math.floor(Math.random() * 30) + 70,
  network: Math.floor(Math.random() * 50) + 50,
  temperature: Math.floor(Math.random() * 20) + 40,
  power: Math.floor(Math.random() * 25) + 75,
});

const generateCombatData = () => ({
  health: Math.floor(Math.random() * 30) + 70,
  armor: Math.floor(Math.random() * 50) + 50,
  shields: Math.floor(Math.random() * 40) + 60,
  ammo: Math.floor(Math.random() * 200) + 100,
  energy: Math.floor(Math.random() * 30) + 70,
});

const generateNetworkNodes = () => [
  { id: '1', x: 0.2, y: -0.3, type: 'friendly' as const, label: 'Node Alpha', status: 'secure' },
  { id: '2', x: -0.5, y: 0.4, type: 'hostile' as const, label: 'Firewall', status: 'active' },
  { id: '3', x: 0.7, y: 0.1, type: 'neutral' as const, label: 'Database', status: 'scanning' },
  { id: '4', x: -0.2, y: -0.6, type: 'objective' as const, label: 'Target', status: 'breached' },
  { id: '5', x: 0.4, y: 0.5, type: 'friendly' as const, label: 'Backup', status: 'standby' },
];

const hackingCommands = [
  {
    id: '1',
    command: 'nmap -sS 192.168.1.0/24',
    output: `Starting Nmap 7.94 ( https://nmap.org )
Host 192.168.1.1 is up (0.001s latency)
Host 192.168.1.15 is up (0.002s latency)  
Host 192.168.1.100 is up (0.003s latency)
Port scan complete. 3 hosts detected.`,
    timestamp: new Date(Date.now() - 30000),
    status: 'success' as const,
  },
  {
    id: '2',
    command: 'exploit --target 192.168.1.100 --module buffer_overflow',
    output: `[*] Exploiting target 192.168.1.100...
[*] Payload delivered successfully
[*] Shell access granted
[!] Administrator privileges escalated
[+] Full system access achieved`,
    timestamp: new Date(Date.now() - 15000),
    status: 'warning' as const,
  },
  {
    id: '3',
    command: 'extract --database /var/lib/secure/users.db',
    output: `[*] Extracting database contents...
[*] Found 15,847 user records
[*] Found 3,291 encrypted credentials  
[*] Decryption in progress... 67% complete
[!] ALERT: Intrusion detection triggered`,
    timestamp: new Date(Date.now() - 5000),
    status: 'error' as const,
  },
];

const systemCommands = [
  {
    id: '1',
    command: 'system --status',
    output: `CYBERPUNK OS v3.5.0 STATUS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

System Health: OPTIMAL
Security Level: MAXIMUM  
Neural Interface: CONNECTED
Cyberware: 7 modules active

Active Processes:
├─ matrix_protocol.exe
├─ doom_combat_sys.dll
├─ ghost_stealth.bin
└─ neon_interface.js

All systems nominal.`,
    timestamp: new Date(),
    status: 'success' as const,
  },
];

// Gaming Dashboard Story
export const GamingDashboard: Story = {
  render: () => {
    const [combatData, setCombatData] = useState(generateCombatData);
    const [isInCombat, setIsInCombat] = useState(false);
    const [missionProgress, setMissionProgress] = useState(34);
    const [killCount, setKillCount] = useState(42);

    useEffect(() => {
      const interval = setInterval(() => {
        if (isInCombat) {
          setCombatData((prev) => ({
            ...prev,
            health: Math.max(10, prev.health - Math.random() * 5),
            armor: Math.max(0, prev.armor - Math.random() * 8),
            ammo: Math.max(0, prev.ammo - Math.random() * 15),
          }));
        } else {
          setCombatData(generateCombatData);
        }
        setMissionProgress((prev) => Math.min(100, prev + Math.random() * 2));
      }, 1500);

      return () => clearInterval(interval);
    }, [isInCombat]);

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* Background Effects */}
          <div className="cyber-matrix-overlay opacity-10 pointer-events-none"></div>
          <div className="cyber-scanlines opacity-20 pointer-events-none"></div>

          {/* Main HUD - Health & Status */}
          <HUD
            layout={{ position: 'top-left', padding: 15 }}
            theme={{ variant: 'matrix', glow: true, scanlines: true }}
            visible
          >
            <HUDPanel title="VITAL SIGNS" size="md" variant="matrix" showStatus status="online">
              <HUDMetric
                label="Health"
                value={combatData.health}
                type="health"
                showProgressBar
                showPercentage
                variant="matrix"
                critical={combatData.health <= 20}
                warningThreshold={40}
              />
              <HUDMetric
                label="Armor"
                value={combatData.armor}
                type="armor"
                showProgressBar
                showPercentage
                variant="matrix"
                critical={combatData.armor <= 15}
              />
              <HUDMetric
                label="Shields"
                value={combatData.shields}
                type="shields"
                showProgressBar
                showPercentage
                variant="matrix"
                warning={combatData.shields <= 30}
              />
            </HUDPanel>
          </HUD>

          {/* Combat HUD - Weapons & Ammo */}
          <HUD
            layout={{ position: 'bottom-right', padding: 15 }}
            theme={{ variant: 'doom', glow: true, pulseEffect: true }}
            visible
          >
            <HUDPanel
              title="COMBAT SYSTEMS"
              size="lg"
              variant="doom"
              showStatus
              status={isInCombat ? 'warning' : 'online'}
            >
              <div className="grid grid-cols-2 gap-4">
                <HUDMetric
                  label="Primary Ammo"
                  value={combatData.ammo}
                  maxValue={500}
                  type="ammo"
                  format="fraction"
                  showProgressBar
                  variant="doom"
                  warning={combatData.ammo <= 100}
                  critical={combatData.ammo <= 50}
                />
                <HUDMetric
                  label="Energy"
                  value={combatData.energy}
                  type="energy"
                  showProgressBar
                  showPercentage
                  variant="doom"
                />
              </div>
              <HUDProgressBar
                label="Weapon Heat"
                value={isInCombat ? 85 : 23}
                variant="doom"
                enableGradient
                animated={isInCombat}
                critical={isInCombat}
              />
            </HUDPanel>
          </HUD>

          {/* Mission HUD */}
          <HUD
            layout={{ position: 'top-right', padding: 15 }}
            theme={{ variant: 'swordfish', glow: true }}
            visible
          >
            <HUDPanel title="MISSION STATUS" size="md" variant="swordfish">
              <div className="space-y-3">
                <div className="flex justify-between text-cyan-400">
                  <span>Objective:</span>
                  <span>Secure Database</span>
                </div>
                <div className="flex justify-between text-cyan-400">
                  <span>Progress:</span>
                  <span>{Math.floor(missionProgress)}%</span>
                </div>
                <HUDProgressBar
                  value={missionProgress}
                  variant="swordfish"
                  enableGradient
                  animated
                />
                <div className="flex justify-between text-cyan-400">
                  <span>Eliminations:</span>
                  <span className="text-cyan-300">{killCount}</span>
                </div>
              </div>
            </HUDPanel>
          </HUD>

          {/* Tactical Radar */}
          <HUD
            layout={{ position: 'bottom-left', padding: 15 }}
            theme={{ variant: 'neon', glow: true }}
            visible
          >
            <HUDRadar
              contacts={generateNetworkNodes()}
              variant="neon"
              size="lg"
              mode="sweep"
              showCompass
              showContactLabels
              enablePingAnimation
              title="TACTICAL RADAR"
            />
          </HUD>

          {/* Central Game Area */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Card
              variant="cyberpunk-neon"
              cyberpunkGlow="intense"
              className="text-center min-w-[300px]"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-pink-400">CYBERPUNK COMBAT</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`text-4xl ${isInCombat ? 'text-red-400' : 'text-green-400'}`}>
                    {isInCombat ? '⚔️ COMBAT ACTIVE' : '✅ AREA SECURE'}
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant={isInCombat ? 'cyberpunk-doom' : 'cyberpunk-matrix'}
                      cyberpunkGlow="intense"
                      onClick={() => setIsInCombat(!isInCombat)}
                      className="cyber-pulse"
                    >
                      {isInCombat ? 'END COMBAT' : 'INITIATE COMBAT'}
                    </Button>
                  </div>
                  <div className="text-sm text-pink-300">
                    Real-time HUD updates • Interactive combat simulation
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status Bar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-6 bg-black/80 backdrop-blur-sm border border-green-500/30 rounded-lg px-6 py-2">
              <div className="text-green-400 text-sm">
                FPS: <span className="text-green-300">60</span>
              </div>
              <div className="text-green-400 text-sm">
                Ping: <span className="text-green-300">12ms</span>
              </div>
              <div className="text-green-400 text-sm">
                Server: <span className="text-green-300">Neo-Tokyo-01</span>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Complete gaming dashboard with real-time combat HUD, tactical radar, mission status, and interactive elements.',
      },
    },
  },
};

// Hacker Terminal Story
export const HackerTerminal: Story = {
  render: () => {
    const [metrics, setMetrics] = useState(generateMetrics);
    const [intrusion, setIntrusion] = useState(45);
    const [isHacking, setIsHacking] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setMetrics(generateMetrics);
        if (isHacking) {
          setIntrusion((prev) => Math.min(100, prev + Math.random() * 8));
        }
      }, 2000);

      return () => clearInterval(interval);
    }, [isHacking]);

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white relative">
          {/* Matrix Background */}
          <div className="cyber-matrix-overlay opacity-15 pointer-events-none"></div>

          {/* Header */}
          <div className="border-b border-green-500/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-green-400 cyber-text-glow">
                  NEURAL INFILTRATION SYSTEM
                </h1>
                <p className="text-green-300">Advanced Penetration Testing Platform v3.5.0</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="cyberpunk-matrix" glow>
                  STEALTH MODE
                </Badge>
                <div className="text-xs text-green-400">
                  <div>
                    STATUS: <span className="text-green-300">CONNECTED</span>
                  </div>
                  <div>
                    SECURITY: <span className="text-red-400">BYPASSED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-100px)]">
            {/* Main Terminal */}
            <div className="lg:col-span-2 space-y-4">
              <Terminal
                variant="matrix"
                title="PRIMARY INFILTRATION TERMINAL"
                height="400px"
                enableScanlines
                enableMatrixRain
                initialCommands={hackingCommands}
                enableTypewriter
                prompt="root@target:~# "
              />

              <Terminal
                variant="doom"
                title="SECURITY BYPASS CONSOLE"
                height="300px"
                enableScanlines
                prompt="BREACH> "
                initialCommands={[
                  {
                    id: '1',
                    command: 'firewall --disable --force',
                    output: `[WARNING] Attempting to disable corporate firewall...
[!] Authentication required
[*] Bypassing with zero-day exploit...
[+] Firewall disabled successfully
[!] SECURITY ALERT: Unauthorized access detected`,
                    timestamp: new Date(),
                    status: 'warning' as const,
                  },
                ]}
              />
            </div>

            {/* Side Panel - System Status */}
            <div className="space-y-4">
              {/* Target System Metrics */}
              <Card variant="cyberpunk-matrix" cyberpunkGlow="normal" scanlines>
                <CardHeader>
                  <CardTitle>TARGET SYSTEM</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>CPU Load:</span>
                      <span className="text-green-400">{metrics.cpu}%</span>
                    </div>
                    <Progress value={metrics.cpu} className="cyber-glow h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Memory Usage:</span>
                      <span className="text-green-400">{metrics.memory}%</span>
                    </div>
                    <Progress value={metrics.memory} className="cyber-glow h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Network Activity:</span>
                      <span className="text-green-400">{metrics.network}%</span>
                    </div>
                    <Progress value={metrics.network} className="cyber-glow h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Intrusion Progress */}
              <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
                <CardHeader>
                  <CardTitle>INFILTRATION STATUS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Progress:</span>
                      <span className="text-red-400">{Math.floor(intrusion)}%</span>
                    </div>
                    <Progress value={intrusion} className="cyber-glow-red h-3" />

                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span>Root Access:</span>
                        <span className={intrusion > 60 ? 'text-red-400' : 'text-gray-500'}>
                          {intrusion > 60 ? 'GRANTED' : 'PENDING'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admin Privileges:</span>
                        <span className={intrusion > 80 ? 'text-red-400' : 'text-gray-500'}>
                          {intrusion > 80 ? 'ESCALATED' : 'LIMITED'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database Access:</span>
                        <span className={intrusion > 90 ? 'text-red-400' : 'text-gray-500'}>
                          {intrusion > 90 ? 'COMPLETE' : 'RESTRICTED'}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant={isHacking ? 'cyberpunk-doom' : 'cyberpunk-matrix'}
                      cyberpunkGlow="intense"
                      fullWidth
                      onClick={() => setIsHacking(!isHacking)}
                      className="cyber-pulse"
                    >
                      {isHacking ? 'ABORT HACK' : 'INITIATE HACK'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Network Map */}
              <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                <CardHeader>
                  <CardTitle>NETWORK TOPOLOGY</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative h-32">
                    <div className="absolute inset-0 border border-gray-500/30 rounded">
                      <div className="grid grid-cols-3 grid-rows-3 h-full">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`border border-gray-600/20 flex items-center justify-center text-xs ${
                              [0, 4, 8].includes(i)
                                ? 'bg-green-500/20 text-green-400'
                                : [1, 5].includes(i)
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-gray-500/10 text-gray-500'
                            }`}
                          >
                            {[0, 4, 8].includes(i) ? '●' : [1, 5].includes(i) ? '⚠' : '○'}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">●</span>
                      <span>Compromised Nodes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-400">⚠</span>
                      <span>Secured Nodes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">○</span>
                      <span>Unknown Nodes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Alert variant="cyberpunk-doom" glow>
                <div className="text-red-400">
                  <strong>SECURITY ALERT</strong>
                  <p className="text-sm mt-1">
                    Intrusion detection system triggered. Recommend immediate data extraction.
                  </p>
                </div>
              </Alert>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Complete hacker interface with multiple terminals, system monitoring, network topology, and real-time intrusion progress.',
      },
    },
  },
};

// Data Operations Center Story
export const DataOperationsCenter: Story = {
  render: () => {
    const [systemMetrics, setSystemMetrics] = useState(generateMetrics);
    const [alerts, setAlerts] = useState([
      {
        id: 1,
        type: 'warning',
        message: 'Unusual network traffic detected on subnet 192.168.1.0/24',
        time: '14:23:45',
      },
      {
        id: 2,
        type: 'error',
        message: 'Database connection timeout on server DB-PROD-03',
        time: '14:22:12',
      },
      {
        id: 3,
        type: 'info',
        message: 'Backup completed successfully for all critical systems',
        time: '14:20:00',
      },
    ]);

    useEffect(() => {
      const interval = setInterval(() => {
        setSystemMetrics(generateMetrics);
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white">
          {/* Header */}
          <div className="border-b border-cyan-500/30 p-4 bg-gradient-to-r from-black to-cyan-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-cyan-400 cyber-text-glow">
                  CORPORATE DATA OPERATIONS CENTER
                </h1>
                <p className="text-cyan-300">
                  Real-time Infrastructure Monitoring • Security Operations • Data Analytics
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right text-sm">
                  <div className="text-cyan-400">
                    THREAT LEVEL: <span className="text-yellow-400">ELEVATED</span>
                  </div>
                  <div className="text-cyan-400">
                    SYSTEMS: <span className="text-green-400">OPERATIONAL</span>
                  </div>
                </div>
                <div className="text-cyan-400 text-xl">🏢</div>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Main Dashboard */}
            <div className="xl:col-span-3 space-y-6">
              {/* System Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card variant="cyberpunk-matrix" cyberpunkGlow="normal" scanlines>
                  <CardContent className="text-center">
                    <div className="text-2xl text-green-400 mb-2">{systemMetrics.cpu}%</div>
                    <div className="text-sm text-green-300">CPU Load</div>
                    <Progress value={systemMetrics.cpu} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-neon" cyberpunkGlow="normal" scanlines>
                  <CardContent className="text-center">
                    <div className="text-2xl text-pink-400 mb-2">{systemMetrics.memory}%</div>
                    <div className="text-sm text-pink-300">Memory Usage</div>
                    <Progress value={systemMetrics.memory} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
                  <CardContent className="text-center">
                    <div className="text-2xl text-red-400 mb-2">{systemMetrics.temperature}°C</div>
                    <div className="text-sm text-red-300">Temperature</div>
                    <Progress value={(systemMetrics.temperature / 80) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>

                <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
                  <CardContent className="text-center">
                    <div className="text-2xl text-gray-400 mb-2">{systemMetrics.power}%</div>
                    <div className="text-sm text-gray-300">Power Efficiency</div>
                    <Progress value={systemMetrics.power} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              </div>

              {/* Network Traffic Visualization */}
              <Card variant="cyberpunk-matrix" cyberpunkGlow="subtle" className="h-64">
                <CardHeader>
                  <CardTitle>Network Traffic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 relative border border-green-500/30 rounded bg-black/50 overflow-hidden">
                    <div className="cyber-scanlines opacity-30"></div>
                    <div className="absolute inset-0 flex items-end justify-around p-4">
                      {Array.from({ length: 20 }).map((_, i) => {
                        const height = Math.random() * 80 + 10;
                        return (
                          <div
                            key={i}
                            className="bg-green-400/60 w-2"
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute top-2 left-2 text-xs text-green-400">
                      Real-time packet analysis • 1.2GB/s throughput
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Connections Table */}
              <Card variant="cyberpunk-ghost" cyberpunkGlow="subtle">
                <CardHeader>
                  <CardTitle>Active Network Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left py-2 text-gray-300">Source IP</th>
                          <th className="text-left py-2 text-gray-300">Destination</th>
                          <th className="text-left py-2 text-gray-300">Protocol</th>
                          <th className="text-left py-2 text-gray-300">Status</th>
                          <th className="text-left py-2 text-gray-300">Bandwidth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            src: '192.168.1.100',
                            dst: 'corporate.db.local:5432',
                            proto: 'TCP',
                            status: 'ESTABLISHED',
                            bw: '2.3 MB/s',
                          },
                          {
                            src: '10.0.0.45',
                            dst: 'api.payment.com:443',
                            proto: 'HTTPS',
                            status: 'ESTABLISHED',
                            bw: '1.1 MB/s',
                          },
                          {
                            src: '172.16.0.23',
                            dst: 'backup.storage.net:22',
                            proto: 'SSH',
                            status: 'ESTABLISHED',
                            bw: '0.8 MB/s',
                          },
                          {
                            src: '192.168.1.200',
                            dst: 'unknown.external.ip:80',
                            proto: 'HTTP',
                            status: 'SUSPICIOUS',
                            bw: '5.2 MB/s',
                          },
                        ].map((conn, i) => (
                          <tr key={i} className="border-b border-gray-700/50">
                            <td className="py-2 text-cyan-400 font-mono">{conn.src}</td>
                            <td className="py-2 text-gray-300 font-mono">{conn.dst}</td>
                            <td className="py-2">
                              <Badge
                                variant={
                                  conn.proto === 'HTTPS' ? 'cyberpunk-matrix' : 'cyberpunk-ghost'
                                }
                              >
                                {conn.proto}
                              </Badge>
                            </td>
                            <td className="py-2">
                              <span
                                className={
                                  conn.status === 'ESTABLISHED'
                                    ? 'text-green-400'
                                    : conn.status === 'SUSPICIOUS'
                                      ? 'text-red-400'
                                      : 'text-yellow-400'
                                }
                              >
                                {conn.status}
                              </span>
                            </td>
                            <td className="py-2 text-cyan-300 font-mono">{conn.bw}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* System Status */}
              <Card variant="cyberpunk-neon" cyberpunkGlow="normal" elevated>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Web Servers', status: 'online', count: '12/12' },
                      { name: 'Database Cluster', status: 'degraded', count: '7/8' },
                      { name: 'Load Balancers', status: 'online', count: '4/4' },
                      { name: 'Cache Servers', status: 'online', count: '6/6' },
                      { name: 'Message Queues', status: 'warning', count: '3/4' },
                    ].map((service, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm">{service.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{service.count}</span>
                          <div
                            className={`w-2 h-2 rounded-full ${
                              service.status === 'online'
                                ? 'bg-green-400'
                                : service.status === 'warning'
                                  ? 'bg-yellow-400'
                                  : 'bg-red-400'
                            } cyber-pulse`}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Alerts */}
              <Card variant="cyberpunk-doom" cyberpunkGlow="normal">
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="border-l-2 border-red-500/50 pl-3 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              alert.type === 'error'
                                ? 'bg-red-500/20 text-red-400'
                                : alert.type === 'warning'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-cyan-500/20 text-cyan-400'
                            }`}
                          >
                            {alert.type.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">{alert.time}</span>
                        </div>
                        <p className="text-sm text-gray-300">{alert.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card variant="cyberpunk-matrix" cyberpunkGlow="normal">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="cyberpunk-matrix" cyberpunkGlow="subtle" size="sm" fullWidth>
                      Run System Scan
                    </Button>
                    <Button variant="cyberpunk-doom" cyberpunkGlow="subtle" size="sm" fullWidth>
                      Emergency Lockdown
                    </Button>
                    <Button variant="cyberpunk-ghost" cyberpunkGlow="subtle" size="sm" fullWidth>
                      Generate Report
                    </Button>
                    <Button variant="cyberpunk-neon" cyberpunkGlow="subtle" size="sm" fullWidth>
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Terminal Access */}
              <div className="h-48">
                <Terminal
                  variant="matrix"
                  title="ADMIN CONSOLE"
                  height="100%"
                  enableScanlines
                  prompt="admin@datacenter:~$ "
                  initialCommands={systemCommands}
                  enableInput={false}
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Corporate data operations center with comprehensive system monitoring, network analysis, security alerts, and administrative controls.',
      },
    },
  },
};

// Night City Interface Story
export const NightCityInterface: Story = {
  render: () => {
    const [cityMetrics, setCityMetrics] = useState({
      population: 12847392,
      trafficFlow: 87,
      powerGrid: 94,
      security: 73,
      netrunners: 234,
      corporateActivity: 156,
    });

    useEffect(() => {
      const interval = setInterval(() => {
        setCityMetrics((prev) => ({
          ...prev,
          trafficFlow: Math.floor(Math.random() * 30) + 70,
          powerGrid: Math.floor(Math.random() * 20) + 80,
          security: Math.floor(Math.random() * 40) + 60,
          netrunners: Math.floor(Math.random() * 100) + 200,
          corporateActivity: Math.floor(Math.random() * 80) + 120,
        }));
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <ThemeProvider>
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
          {/* Neon City Background */}
          <div className="cyber-matrix-overlay opacity-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-pink-900/20"></div>

          {/* Header */}
          <div className="relative z-10 border-b border-pink-500/30 p-6 bg-gradient-to-r from-black via-purple-900/30 to-black">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  NIGHT CITY MANAGEMENT SYSTEM
                </h1>
                <p className="text-pink-300 text-lg">
                  Cyberpunk 2077 Inspired City Operations • Neural Network Monitoring
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl text-pink-400 mb-2">🌃</div>
                <div className="text-sm text-pink-300">
                  <div>
                    Time: <span className="text-pink-400">23:47:32</span>
                  </div>
                  <div>
                    Sector: <span className="text-pink-400">City Center</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 p-6">
            {/* Top Row - City Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
              <Card variant="cyberpunk-neon" cyberpunkGlow="intense" className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-pink-400">Population Density</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-pink-400 mb-2">
                    {cityMetrics.population.toLocaleString()}
                  </div>
                  <div className="text-sm text-pink-300">Active Neural Implants</div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      Corporate: <span className="text-cyan-400">34%</span>
                    </div>
                    <div>
                      Street: <span className="text-yellow-400">45%</span>
                    </div>
                    <div>
                      Nomad: <span className="text-green-400">12%</span>
                    </div>
                    <div>
                      Unknown: <span className="text-red-400">9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="cyberpunk-matrix" cyberpunkGlow="normal" scanlines>
                <CardContent className="text-center">
                  <div className="text-2xl text-green-400 mb-2">{cityMetrics.trafficFlow}%</div>
                  <div className="text-sm text-green-300">Traffic Flow</div>
                  <Progress value={cityMetrics.trafficFlow} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
                <CardContent className="text-center">
                  <div className="text-2xl text-red-400 mb-2">{cityMetrics.security}%</div>
                  <div className="text-sm text-red-300">Security Level</div>
                  <Progress value={cityMetrics.security} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
                <CardContent className="text-center">
                  <div className="text-2xl text-gray-400 mb-2">{cityMetrics.powerGrid}%</div>
                  <div className="text-sm text-gray-300">Power Grid</div>
                  <Progress value={cityMetrics.powerGrid} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card variant="cyberpunk-neon" cyberpunkGlow="normal" scanlines>
                <CardContent className="text-center">
                  <div className="text-2xl text-pink-400 mb-2">{cityMetrics.netrunners}</div>
                  <div className="text-sm text-pink-300">Active Runners</div>
                  <div className="text-xs text-pink-400 mt-1">↑ +12 online</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Central District Map */}
              <div className="xl:col-span-2">
                <Card variant="cyberpunk-neon" cyberpunkGlow="intense" className="h-96">
                  <CardHeader>
                    <CardTitle>City District Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 border border-pink-500/30 rounded bg-black/50 overflow-hidden">
                      <div className="cyber-scanlines opacity-20"></div>

                      {/* Simulated City Map */}
                      <div className="absolute inset-0 p-4">
                        <div className="grid grid-cols-4 grid-rows-4 h-full gap-1">
                          {Array.from({ length: 16 }).map((_, i) => {
                            const districts = [
                              'Corporate Plaza',
                              'Japantown',
                              'Little China',
                              'City Center',
                              'Westbrook',
                              'Heywood',
                              'Santo Domingo',
                              'Pacifica',
                              'Watson',
                              'Kabuki',
                              'Arroyo',
                              'Glen',
                              'Charter Hill',
                              'Corpo Plaza',
                              'Wellsprings',
                              'Rancho Coronado',
                            ];
                            const colors = [
                              'bg-cyan-500/40',
                              'bg-pink-500/40',
                              'bg-yellow-500/40',
                              'bg-purple-500/40',
                              'bg-green-500/40',
                              'bg-red-500/40',
                              'bg-blue-500/40',
                              'bg-orange-500/40',
                            ];

                            return (
                              <div
                                key={i}
                                className={`${colors[i % 8]} border border-white/20 rounded flex items-center justify-center text-xs text-center p-1 cursor-pointer hover:border-white/50 transition-all`}
                                title={districts[i]}
                              >
                                <div className="text-white/80">{districts[i].split(' ')[0]}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Active Incidents Overlay */}
                      <div className="absolute top-4 right-4 space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 bg-red-400 rounded-full cyber-pulse"></div>
                          <span className="text-red-400">Gang Activity</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full cyber-pulse"></div>
                          <span className="text-yellow-400">Corporate Raid</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full cyber-pulse"></div>
                          <span className="text-cyan-400">Netrunner Activity</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-pink-400 font-semibold">CORPO</div>
                        <div className="text-pink-300">12 Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">STREET</div>
                        <div className="text-yellow-300">28 Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-cyan-400 font-semibold">NET</div>
                        <div className="text-cyan-300">7 Active</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Side Panel */}
              <div className="space-y-4">
                {/* Corporate Activity */}
                <Card variant="cyberpunk-doom" cyberpunkGlow="normal" elevated>
                  <CardHeader>
                    <CardTitle>Corporate Surveillance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { corp: 'Arasaka', activity: 93, threat: 'HIGH' },
                        { corp: 'Militech', activity: 76, threat: 'MED' },
                        { corp: 'NetWatch', activity: 84, threat: 'HIGH' },
                        { corp: 'Trauma Team', activity: 45, threat: 'LOW' },
                      ].map((corp, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold">{corp.corp}</div>
                            <div className="text-xs text-gray-400">Activity: {corp.activity}%</div>
                          </div>
                          <Badge
                            variant={
                              corp.threat === 'HIGH'
                                ? 'cyberpunk-doom'
                                : corp.threat === 'MED'
                                  ? 'cyberpunk-neon'
                                  : 'cyberpunk-matrix'
                            }
                            glow
                          >
                            {corp.threat}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Street Cred Terminal */}
                <div className="h-48">
                  <Terminal
                    variant="neon"
                    title="STREET TERMINAL"
                    height="100%"
                    enableScanlines
                    prompt="choom@street:~$ "
                    initialCommands={[
                      {
                        id: '1',
                        command: 'street-cred --check',
                        output: `Current Street Cred: ★★★★☆ (87/100)
        
Recent Activity:
• Completed gig for Dex DeShawn (+5 cred)
• Avoided corpo surveillance (+2 cred)  
• Tagged MaxTac vehicle (-3 cred)

Next Level: Need 13 more points
Reputation: "Reliable Solo"`,
                        timestamp: new Date(),
                        status: 'success' as const,
                      },
                    ]}
                    enableInput={false}
                  />
                </div>

                {/* Quick Actions */}
                <Card variant="cyberpunk-ghost" cyberpunkGlow="normal">
                  <CardHeader>
                    <CardTitle>Emergency Protocols</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button
                        variant="cyberpunk-doom"
                        cyberpunkGlow="intense"
                        size="sm"
                        fullWidth
                        className="cyber-pulse"
                      >
                        🚨 LOCKDOWN CITY
                      </Button>
                      <Button variant="cyberpunk-neon" cyberpunkGlow="normal" size="sm" fullWidth>
                        📡 NETWATCH ALERT
                      </Button>
                      <Button variant="cyberpunk-matrix" cyberpunkGlow="normal" size="sm" fullWidth>
                        💾 BACKUP DATA
                      </Button>
                      <Button variant="cyberpunk-ghost" cyberpunkGlow="subtle" size="sm" fullWidth>
                        👁️ STEALTH MODE
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-6 flex items-center justify-between bg-black/60 backdrop-blur-sm border border-pink-500/30 rounded-lg p-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="text-pink-400">
                  <span className="text-pink-300">System Status:</span> OPTIMAL
                </div>
                <div className="text-cyan-400">
                  <span className="text-cyan-300">Net Traffic:</span> 847.2 TB/s
                </div>
                <div className="text-yellow-400">
                  <span className="text-yellow-300">Active Gigs:</span> 23
                </div>
              </div>
              <div className="text-pink-400 text-sm">
                Wake the f*ck up, samurai. We've got a city to monitor.
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Night City management interface inspired by Cyberpunk 2077, featuring district monitoring, corporate surveillance, street activities, and futuristic city operations.',
      },
    },
  },
};
