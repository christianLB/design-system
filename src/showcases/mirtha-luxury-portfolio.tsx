import React, { useState } from 'react';
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
import { Tooltip } from '../components/Tooltip/Tooltip';

// Luxury asset card
function LuxuryAssetCard({ category, name, value, change, image, location }: any) {
  const isPositive = change >= 0;
  return (
    <Card className="overflow-hidden" elevated>
      <div className="aspect-video bg-gradient-to-br from-mirtha-gold to-mirtha-bronze relative">
        {image && (
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
            {image}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <Badge variant="mirtha-gold" size="sm" className="mb-2">{category}</Badge>
        <h3 className="font-serif text-lg font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{value}</span>
          <Badge variant={isPositive ? 'success' : 'destructive'} size="sm">
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Portfolio metric
function PortfolioMetric({ label, value, subtext, icon }: any) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-3xl font-serif font-bold">{value}</p>
      {subtext && <p className="text-sm text-muted-foreground mt-1">{subtext}</p>}
    </div>
  );
}

// Investment opportunity
function InvestmentCard({ type, name, minimumInvestment, expectedReturn, risk }: any) {
  const getRiskColor = () => {
    switch(risk) {
      case 'Low': return 'text-mirtha-sage';
      case 'Medium': return 'text-mirtha-gold';
      case 'High': return 'text-mirtha-rosewood';
      default: return 'text-muted-foreground';
    }
  };
  
  return (
    <div className="p-4 border border-border rounded-lg hover:border-mirtha-gold transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <Badge variant="mirtha-bronze" size="sm" className="mb-2">{type}</Badge>
          <h4 className="font-serif font-bold">{name}</h4>
        </div>
        <span className={`text-sm font-semibold ${getRiskColor()}`}>{risk} Risk</span>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Minimum</span>
          <span className="font-semibold">{minimumInvestment}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expected Return</span>
          <span className="font-semibold text-mirtha-gold">{expectedReturn}</span>
        </div>
      </div>
      <Button variant="mirtha-gold" size="sm" fullWidth className="mt-3">
        View Details
      </Button>
    </div>
  );
}

function MirthaLuxuryPortfolio() {
  const { setTheme } = useTheme();
  const [currency, setCurrency] = useState('USD');
  const [timeframe, setTimeframe] = useState('YTD');
  
  // Force mirtha theme
  React.useEffect(() => {
    setTheme('mirtha');
  }, [setTheme]);
  
  return (
    <div className="min-h-screen bg-mirtha-cream text-foreground overflow-x-hidden">
      {/* Elegant Header */}
      <header className="bg-mirtha-white border-b border-mirtha-gold/20">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-3xl font-serif font-bold text-mirtha-rosewood truncate">
                Mirtha Private Wealth
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Exclusive Portfolio Management</p>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-20 sm:w-24 border-mirtha-gold/30 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                </SelectContent>
              </Select>
              
              <Avatar 
                src="https://i.pravatar.cc/150?img=8" 
                alt="Client" 
                size="lg"
                className="border-2 border-mirtha-gold"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-mirtha-gold/10 to-mirtha-bronze/10 py-8">
        <div className="container mx-auto px-6">
          <Alert variant="mirtha-sage" className="mb-6">
            <strong>Welcome back, Distinguished Client</strong>
            <br />Your portfolio has appreciated by 18.7% this quarter, outperforming market indices by 7.2%
          </Alert>
          
          {/* Portfolio Overview */}
          <Card className="bg-mirtha-white/80 backdrop-blur" elevated>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <PortfolioMetric
                  icon="💎"
                  label="Total Net Worth"
                  value="$47.8M"
                  subtext="+$6.2M YTD"
                />
                <PortfolioMetric
                  icon="🏆"
                  label="Annual Return"
                  value="24.3%"
                  subtext="Top 1% Performance"
                />
                <PortfolioMetric
                  icon="🌍"
                  label="Global Assets"
                  value="37"
                  subtext="12 Countries"
                />
                <PortfolioMetric
                  icon="⭐"
                  label="Wealth Tier"
                  value="Platinum"
                  subtext="Since 2019"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Asset Allocation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif font-bold">Asset Allocation</h2>
            <div className="flex gap-2">
              {['1M', '3M', '6M', 'YTD', '1Y', 'ALL'].map((tf) => (
                <Button
                  key={tf}
                  size="sm"
                  variant={timeframe === tf ? 'mirtha-gold' : 'ghost'}
                  onClick={() => setTimeframe(tf)}
                >
                  {tf}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card elevated>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg mb-4">Traditional Assets</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Equities</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} variant="mirtha-gold" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fixed Income</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} variant="mirtha-bronze" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Commodities</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} variant="mirtha-sage" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card elevated>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg mb-4">Alternative Investments</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Private Equity</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} variant="mirtha-rosewood" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hedge Funds</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} variant="mirtha-gold" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Venture Capital</span>
                      <span>17%</span>
                    </div>
                    <Progress value={17} variant="mirtha-bronze" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card elevated>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg mb-4">Real Assets</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Real Estate</span>
                      <span>48%</span>
                    </div>
                    <Progress value={48} variant="mirtha-sage" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Art & Collectibles</span>
                      <span>31%</span>
                    </div>
                    <Progress value={31} variant="mirtha-gold" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Precious Metals</span>
                      <span>21%</span>
                    </div>
                    <Progress value={21} variant="mirtha-bronze" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card elevated>
              <CardContent className="p-6">
                <h3 className="font-serif text-lg mb-4">Digital Assets</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cryptocurrency</span>
                      <span>8%</span>
                    </div>
                    <Progress value={8} variant="mirtha-rosewood" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>NFT Collection</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} variant="mirtha-gold" size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>DeFi Positions</span>
                      <span>7%</span>
                    </div>
                    <Progress value={7} variant="mirtha-bronze" size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Featured Assets */}
        <Card elevated className="mb-8">
          <CardHeader>
            <CardTitle className="font-serif">Premium Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="real-estate">
              <TabsList>
                <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
                <TabsTrigger value="art">Art Collection</TabsTrigger>
                <TabsTrigger value="yachts">Yachts & Aviation</TabsTrigger>
                <TabsTrigger value="wine">Wine & Spirits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="real-estate" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <LuxuryAssetCard
                    category="PENTHOUSE"
                    name="Manhattan Sky Residence"
                    value="$18.5M"
                    change={12.3}
                    location="New York, USA"
                    image="🏙️"
                  />
                  <LuxuryAssetCard
                    category="VILLA"
                    name="Villa Azure"
                    value="€15.2M"
                    change={8.7}
                    location="French Riviera"
                    image="🏖️"
                  />
                  <LuxuryAssetCard
                    category="ESTATE"
                    name="Château de Lumière"
                    value="€22.8M"
                    change={15.4}
                    location="Loire Valley, France"
                    image="🏰"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="art" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <LuxuryAssetCard
                    category="MODERN ART"
                    name="Untitled (Basquiat, 1982)"
                    value="$8.7M"
                    change={34.2}
                    location="Private Collection"
                    image="🎨"
                  />
                  <LuxuryAssetCard
                    category="SCULPTURE"
                    name="Bronze Venus (Rodin)"
                    value="$4.2M"
                    change={18.5}
                    location="On Loan - MoMA"
                    image="🗿"
                  />
                  <LuxuryAssetCard
                    category="CONTEMPORARY"
                    name="Blue Period (Hirst)"
                    value="$6.9M"
                    change={22.8}
                    location="Geneva Freeport"
                    image="💎"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Exclusive Opportunities */}
        <Card elevated>
          <CardHeader>
            <CardTitle className="font-serif">Exclusive Investment Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <InvestmentCard
                type="PRIVATE EQUITY"
                name="Silicon Valley Tech Fund IV"
                minimumInvestment="$5M"
                expectedReturn="25-35% IRR"
                risk="Medium"
              />
              <InvestmentCard
                type="REAL ESTATE"
                name="Dubai Marina Development"
                minimumInvestment="$10M"
                expectedReturn="18-22% Annual"
                risk="Low"
              />
              <InvestmentCard
                type="VENTURE CAPITAL"
                name="BioTech Innovation Fund"
                minimumInvestment="$2M"
                expectedReturn="40-60% IRR"
                risk="High"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Concierge Services */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Tooltip content="Wealth Concierge" position="left">
            <Button size="lg" variant="mirtha-gold" className="rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-lg min-h-[56px]" elevated>
              <span className="text-xl sm:text-2xl">👑</span>
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

// App wrapper
function App() {
  return (
    <ThemeProvider>
      <MirthaLuxuryPortfolio />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);