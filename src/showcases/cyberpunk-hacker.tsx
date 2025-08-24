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
import { Input } from '../components/Input/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/Select/Select';

// Terminal line component
function TerminalLine({ prefix = '$', children, delay = 0 }: any) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!visible) return null;
  
  return (
    <div className="font-mono text-sm">
      <span className="text-cyber-matrix-green">{prefix}</span> {children}
    </div>
  );
}

// Network node component
function NetworkNode({ ip, status, location, threat }: any) {
  return (
    <Card variant="cyberpunk-ghost" className="border-cyber-matrix-green" scanlines>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Badge variant={status === 'COMPROMISED' ? 'cyberpunk-doom' : 'cyberpunk-matrix'} size="sm">
            {status}
          </Badge>
          {threat && <Badge variant="cyberpunk-doom" size="sm">{threat}%</Badge>}
        </div>
        <p className="font-mono text-xs text-cyber-matrix-green mb-1">{ip}</p>
        <p className="text-xs text-cyber-pure-white/80">{location}</p>
      </CardContent>
    </Card>
  );
}

function CyberpunkHackerTerminal() {
  const { setTheme } = useTheme();
  const [command, setCommand] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState('mainframe');
  
  // Force cyberpunk theme
  React.useEffect(() => {
    setTheme('cyberpunk');
  }, [setTheme]);
  
  // Simulate scanning
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isScanning]);
  
  return (
    <div className="min-h-screen bg-cyber-void-black text-cyber-pure-white overflow-x-hidden">
      {/* Matrix rain effect background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none cyber-matrix-overlay" />
      
      {/* Header */}
      <header className="border-b border-cyber-matrix-green bg-cyber-dark-charcoal/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <h1 className="text-sm sm:text-xl font-bold text-cyber-matrix-green font-mono truncate">
                NEXUS_BREACH_v2.7
              </h1>
              <Badge variant="cyberpunk-matrix" className="animate-pulse shrink-0" cyberpunkGlow="intense">
                ACTIVE
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 text-xs font-mono shrink-0">
              <span className="text-cyber-matrix-green hidden sm:inline">SESSION:</span>
              <span className="text-cyber-hot-pink">0xDEADBEEF</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Terminal */}
          <Card variant="cyberpunk-matrix" className="lg:col-span-2" matrixRain scanlines>
            <CardHeader>
              <CardTitle className="font-mono text-cyber-matrix-green">
                &gt;_ TERMINAL
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="bg-cyber-void-black p-3 sm:p-4 rounded min-h-[300px] sm:min-h-[400px] font-mono text-xs sm:text-sm space-y-2 overflow-x-auto">
                <TerminalLine delay={0}>Initializing breach protocol...</TerminalLine>
                <TerminalLine delay={500}>Connecting to proxy chain...</TerminalLine>
                <TerminalLine delay={1000}>
                  <span className="text-cyber-matrix-green">[SUCCESS]</span> Proxy established via TOR network
                </TerminalLine>
                <TerminalLine delay={1500}>Running vulnerability scanner...</TerminalLine>
                <TerminalLine delay={2000}>
                  <span className="text-cyber-doom-red">[ALERT]</span> 3 critical vulnerabilities detected
                </TerminalLine>
                <TerminalLine delay={2500}>Deploying exploit framework...</TerminalLine>
                <TerminalLine prefix="root@nexus:~#" delay={3000}>
                  <span className="text-cyber-hot-pink">Access granted</span>
                </TerminalLine>
                
                <div className="mt-4 pt-4 border-t border-cyber-matrix-green/30">
                  <Input
                    id="command"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Enter command..."
                    className="bg-transparent border-cyber-matrix-green text-cyber-matrix-green placeholder:text-cyber-matrix-green/50 min-h-[40px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* System Status */}
          <Card variant="cyberpunk-doom" scanlines>
            <CardHeader>
              <CardTitle className="font-mono text-cyber-doom-red">SYSTEM STATUS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CPU USAGE</span>
                  <span>87%</span>
                </div>
                <Progress value={87} variant="cyberpunk-doom" size="sm" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>RAM USAGE</span>
                  <span>62%</span>
                </div>
                <Progress value={62} variant="cyberpunk-matrix" size="sm" />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>BANDWIDTH</span>
                  <span>94%</span>
                </div>
                <Progress value={94} variant="cyberpunk-neon" size="sm" />
              </div>
              
              <div className="pt-4 border-t border-cyber-doom-red/30">
                <p className="text-xs mb-2">FIREWALL STATUS</p>
                <Alert variant="cyberpunk-doom" className="text-xs">
                  <strong>BREACHED</strong>
                  <br />3 unauthorized connections
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Network Map */}
        <Card variant="cyberpunk-ghost" className="mt-6" scanlines cyberpunkGlow="subtle">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-mono text-cyber-pure-white">NETWORK MAP</CardTitle>
              <div className="flex gap-2">
                <Select value={selectedTarget} onValueChange={setSelectedTarget}>
                  <SelectTrigger className="w-40 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mainframe">Mainframe</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="firewall">Firewall</SelectItem>
                    <SelectItem value="backup">Backup Server</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="cyberpunk-matrix" 
                  size="sm"
                  onClick={() => setIsScanning(true)}
                  disabled={isScanning}
                  className="min-h-[32px]"
                >
                  {isScanning ? 'SCANNING...' : 'SCAN'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isScanning && (
              <div className="mb-4">
                <Progress value={scanProgress} variant="cyberpunk-matrix" size="sm" />
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <NetworkNode 
                ip="192.168.1.1"
                status="COMPROMISED"
                location="Gateway Router"
                threat="95"
              />
              <NetworkNode 
                ip="10.0.0.42"
                status="VULNERABLE"
                location="Web Server"
                threat="72"
              />
              <NetworkNode 
                ip="172.16.0.5"
                status="SECURE"
                location="Database"
              />
              <NetworkNode 
                ip="10.0.1.100"
                status="COMPROMISED"
                location="Workstation"
                threat="88"
              />
            </div>
            
            <Tabs defaultValue="exploits" className="mt-6">
              <TabsList>
                <TabsTrigger value="exploits">EXPLOITS</TabsTrigger>
                <TabsTrigger value="payloads">PAYLOADS</TabsTrigger>
                <TabsTrigger value="backdoors">BACKDOORS</TabsTrigger>
                <TabsTrigger value="logs">LOGS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="exploits" className="space-y-2 mt-4">
                {[
                  { name: 'CVE-2024-1337', type: 'RCE', success: '94%' },
                  { name: 'SQLi_BYPASS_v3', type: 'SQL', success: '87%' },
                  { name: 'XSS_PERSISTENT', type: 'XSS', success: '91%' },
                  { name: 'BUFFER_OVERFLOW', type: 'BOF', success: '76%' },
                ].map((exploit, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-cyber-dark-charcoal border border-cyber-matrix-green/30 rounded flex-wrap sm:flex-nowrap gap-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="cyberpunk-matrix" size="sm">{exploit.type}</Badge>
                      <span className="font-mono text-xs">{exploit.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-cyber-matrix-green">{exploit.success}</span>
                      <Button variant="cyberpunk-neon" size="sm" className="min-h-[32px]">DEPLOY</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Bottom Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-cyber-dark-charcoal border-t border-cyber-matrix-green p-2 pb-safe">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between text-xs font-mono flex-wrap sm:flex-nowrap gap-2">
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <span className="text-cyber-matrix-green">PACKETS: 1,337,420</span>
                <span className="text-cyber-hot-pink hidden sm:inline">ENCRYPTED: YES</span>
                <span className="text-cyber-doom-red">DETECTION: LOW</span>
              </div>
              <div className="flex gap-2 sm:gap-4 items-center">
                <span className="hidden sm:inline">UPTIME: 04:20:69</span>
                <span className="text-cyber-matrix-green animate-pulse">●</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// App wrapper
function App() {
  return (
    <ThemeProvider>
      <CyberpunkHackerTerminal />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);