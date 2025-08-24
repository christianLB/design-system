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
import { RadioGroup } from '../components/RadioGroup/RadioGroup';

// Bio reading component
function BioReading({ label, value, unit, status, pulse = false }: any) {
  const getStatusColor = () => {
    switch(status) {
      case 'optimal': return 'text-alien-biolume-green';
      case 'warning': return 'text-alien-toxic-yellow';
      case 'critical': return 'text-alien-warning-red';
      default: return 'text-alien-neural-pink';
    }
  };
  
  return (
    <div className="p-3 bg-alien-membrane-purple/20 rounded-lg border border-alien-biolume-green/30">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs opacity-70">{label}</span>
        <Badge variant="alien-neural" size="sm" className={pulse ? 'animate-pulse' : ''}>
          {status}
        </Badge>
      </div>
      <div className={`text-2xl font-bold ${getStatusColor()}`}>
        {value}
        <span className="text-sm ml-1 opacity-70">{unit}</span>
      </div>
    </div>
  );
}

// DNA sequence visualization
function DNASequence({ sequence, mutations = [] }: any) {
  return (
    <div className="font-mono text-xs">
      <div className="flex flex-wrap gap-1">
        {sequence.split('').map((base: string, i: number) => (
          <span
            key={i}
            className={`
              px-1 py-0.5 rounded
              ${mutations.includes(i) 
                ? 'bg-alien-warning-red text-alien-void-black' 
                : 'bg-alien-neural-pink/20 text-alien-biolume-green'}
            `}
          >
            {base}
          </span>
        ))}
      </div>
    </div>
  );
}

// Organism card component
function OrganismCard({ id, species, status, compatibility, readings }: any) {
  return (
    <Card variant="alien-membrane" className="border-alien-biolume-green/50" organicPulse>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-bold text-alien-neural-pink">Specimen #{id}</p>
            <p className="text-xs opacity-70">{species}</p>
          </div>
          <Badge 
            variant={status === 'STABLE' ? 'alien-biolume' : 'alien-toxic'} 
            size="sm"
          >
            {status}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Neural Activity</span>
            <span className="text-alien-biolume-green">{readings.neural}%</span>
          </div>
          <Progress value={readings.neural} variant="alien-neural" size="sm" />
          
          <div className="flex justify-between text-xs">
            <span>Bio Compatibility</span>
            <span className="text-alien-toxic-yellow">{compatibility}%</span>
          </div>
          <Progress value={compatibility} variant="alien-toxic" size="sm" />
        </div>
      </CardContent>
    </Card>
  );
}

function AlienBioMonitor() {
  const { setTheme } = useTheme();
  const [selectedOrganism, setSelectedOrganism] = useState('specimen-1');
  const [scanActive, setScanActive] = useState(false);
  const [neuralPulse, setNeuralPulse] = useState(0);
  const [alertLevel, setAlertLevel] = useState('stable');
  
  // Force alien theme
  React.useEffect(() => {
    setTheme('alien');
  }, [setTheme]);
  
  // Simulate neural pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralPulse(prev => {
        const next = prev + (Math.random() * 10 - 5);
        return Math.max(0, Math.min(100, next));
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  // Simulate periodic scans
  useEffect(() => {
    const interval = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen bg-alien-void-black text-alien-pure-white overflow-x-hidden">
      {/* Organic overlay effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none alien-organic-overlay" />
      
      {/* Header */}
      <header className="border-b border-alien-biolume-green/30 bg-alien-deep-space/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <h1 className="text-sm sm:text-xl font-bold text-alien-biolume-green truncate">
                XENOMORPH BIO-MONITOR v9.7.2
              </h1>
              <Badge 
                variant="alien-biolume" 
                className={`${scanActive ? 'animate-pulse' : ''} shrink-0`}
                organicPulse
              >
                {scanActive ? 'SCANNING' : 'MONITORING'}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 text-xs font-mono shrink-0">
              <span className="text-alien-neural-pink hidden sm:inline">HIVE CONNECTION:</span>
              <span className="text-alien-biolume-green">ACTIVE</span>
              <span className="animate-pulse">⬢</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Alert Bar */}
      {alertLevel !== 'stable' && (
        <Alert 
          variant="alien-toxic" 
          className="rounded-none border-x-0"
          dismissible
          onClose={() => setAlertLevel('stable')}
        >
          <strong>CONTAMINATION ALERT:</strong> Foreign genetic material detected in Sector 7. Quarantine protocols engaged.
        </Alert>
      )}
      
      {/* Main Grid */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Primary Monitoring Panel */}
          <Card variant="alien-vessel" className="lg:col-span-2" organicPulse bioGlow="intense">
            <CardHeader>
              <CardTitle className="font-mono text-alien-biolume-green">
                PRIMARY SPECIMEN VITALS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
                <BioReading 
                  label="Core Temperature"
                  value="42.7"
                  unit="°C"
                  status="optimal"
                  pulse
                />
                <BioReading 
                  label="Acid pH Level"
                  value="0.8"
                  unit="pH"
                  status="warning"
                />
                <BioReading 
                  label="Neural Activity"
                  value={neuralPulse.toFixed(1)}
                  unit="%"
                  status={neuralPulse > 80 ? 'critical' : 'optimal'}
                />
                <BioReading 
                  label="Biomass"
                  value="127.3"
                  unit="kg"
                  status="optimal"
                />
                <BioReading 
                  label="Regeneration"
                  value="94"
                  unit="%"
                  status="optimal"
                />
                <BioReading 
                  label="Toxin Levels"
                  value="HIGH"
                  unit=""
                  status="warning"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-2 text-alien-neural-pink">Genetic Sequence Analysis</p>
                  <DNASequence 
                    sequence="ATCGGATCCGTAGCTAGCGATCGGATCCGTAGCTAGCGATCGGATCCGTAGCT"
                    mutations={[5, 12, 23, 34, 45]}
                  />
                </div>
                
                <div>
                  <p className="text-sm mb-2 text-alien-neural-pink">Mutation Detection</p>
                  <Alert variant="alien-toxic" className="text-xs">
                    5 mutations detected in current genome sequence. Adaptive evolution rate: 2.3x baseline.
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Control Panel */}
          <Card variant="alien-neural" bioGlow="subtle">
            <CardHeader>
              <CardTitle className="font-mono text-alien-neural-pink">CONTROL INTERFACE</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs block mb-2">Select Organism</label>
                <Select value={selectedOrganism} onValueChange={setSelectedOrganism}>
                  <SelectTrigger className="bg-alien-deep-space border-alien-biolume-green/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="specimen-1">Xenomorph Alpha</SelectItem>
                    <SelectItem value="specimen-2">Hybrid Beta-7</SelectItem>
                    <SelectItem value="specimen-3">Queen Embryo</SelectItem>
                    <SelectItem value="specimen-4">Drone Worker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs block mb-2">Containment Protocol</label>
                <RadioGroup
                  name="containment"
                  options={[
                    { label: 'Level 1 - Observation', value: 'level1' },
                    { label: 'Level 2 - Restricted', value: 'level2' },
                    { label: 'Level 3 - Quarantine', value: 'level3' },
                    { label: 'Level 4 - Termination', value: 'level4' },
                  ]}
                  value="level2"
                  onChange={() => {}}
                />
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="alien-biolume" 
                  fullWidth 
                  size="sm"
                  onClick={() => setScanActive(true)}
                  className="min-h-[40px]"
                >
                  INITIATE BIO-SCAN
                </Button>
                <Button 
                  variant="alien-toxic" 
                  fullWidth 
                  size="sm"
                  onClick={() => setAlertLevel('warning')}
                  className="min-h-[40px]"
                >
                  INJECT NEUROTOXIN
                </Button>
                <Button 
                  variant="alien-neural" 
                  fullWidth 
                  size="sm"
                  className="min-h-[40px]"
                >
                  NEURAL INTERFACE
                </Button>
                <Button 
                  variant="alien-vessel" 
                  fullWidth 
                  size="sm"
                  disabled
                  className="min-h-[40px]"
                >
                  RELEASE (LOCKED)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Specimen Grid */}
        <Card variant="alien-membrane" className="mt-6" organicPulse>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="font-mono text-alien-pure-white">SPECIMEN COLLECTIVE</CardTitle>
              <div className="flex gap-2">
                <Badge variant="alien-biolume" size="sm">24 ACTIVE</Badge>
                <Badge variant="alien-toxic" size="sm">3 DORMANT</Badge>
                <Badge variant="alien-vessel" size="sm">1 EVOLVING</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">ACTIVE</TabsTrigger>
                <TabsTrigger value="dormant">DORMANT</TabsTrigger>
                <TabsTrigger value="evolution">EVOLUTION</TabsTrigger>
                <TabsTrigger value="terminated">TERMINATED</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  <OrganismCard
                    id="XA-001"
                    species="Xenomorph Alpha"
                    status="STABLE"
                    compatibility={87}
                    readings={{ neural: 92, biomass: 127 }}
                  />
                  <OrganismCard
                    id="HB-007"
                    species="Hybrid Beta"
                    status="EVOLVING"
                    compatibility={65}
                    readings={{ neural: 78, biomass: 98 }}
                  />
                  <OrganismCard
                    id="QE-003"
                    species="Queen Embryo"
                    status="GROWING"
                    compatibility={94}
                    readings={{ neural: 45, biomass: 23 }}
                  />
                  <OrganismCard
                    id="DW-019"
                    species="Drone Worker"
                    status="STABLE"
                    compatibility={72}
                    readings={{ neural: 61, biomass: 85 }}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="evolution" className="mt-4">
                <div className="bg-alien-membrane-purple/20 rounded-lg p-6 border border-alien-neural-pink/30">
                  <h3 className="text-alien-neural-pink font-bold mb-4">EVOLUTIONARY MATRIX</h3>
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="opacity-70 mb-1">Generation</p>
                      <p className="text-2xl font-bold text-alien-biolume-green">47</p>
                    </div>
                    <div>
                      <p className="opacity-70 mb-1">Mutation Rate</p>
                      <p className="text-2xl font-bold text-alien-toxic-yellow">2.3x</p>
                    </div>
                    <div>
                      <p className="opacity-70 mb-1">Survival Rate</p>
                      <p className="text-2xl font-bold text-alien-warning-red">68%</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Acid Resistance</span>
                      <span>+12%</span>
                    </div>
                    <Progress value={78} variant="alien-toxic" size="sm" />
                    
                    <div className="flex justify-between text-xs">
                      <span>Neural Capacity</span>
                      <span>+23%</span>
                    </div>
                    <Progress value={89} variant="alien-neural" size="sm" />
                    
                    <div className="flex justify-between text-xs">
                      <span>Regeneration Speed</span>
                      <span>+18%</span>
                    </div>
                    <Progress value={94} variant="alien-biolume" size="sm" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Bottom Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-alien-deep-space/95 border-t border-alien-biolume-green/30 p-2 pb-safe">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between text-xs font-mono flex-wrap sm:flex-nowrap gap-2">
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                <span className="text-alien-biolume-green">SPECIMENS: 28</span>
                <span className="text-alien-neural-pink hidden sm:inline">HIVE TEMP: 37.2°C</span>
                <span className="text-alien-toxic-yellow">CONTAINMENT: SECURE</span>
              </div>
              <div className="flex gap-2 sm:gap-4 items-center shrink-0">
                <span className="hidden sm:inline">CYCLE: 2,847</span>
                <span className="text-alien-warning-red animate-pulse">⬢ LIVE MONITORING</span>
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
      <AlienBioMonitor />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);