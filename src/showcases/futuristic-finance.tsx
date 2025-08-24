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
import { Input } from '../components/Input/Input';
import { Tooltip } from '../components/Tooltip/Tooltip';

// MetricCard component for financial metrics
function MetricCard({ title, value, change, trend, icon }: any) {
  const isPositive = change >= 0;
  return (
    <Card className="relative overflow-hidden" elevated>
      <div className="absolute top-0 right-0 p-4 text-4xl opacity-20">{icon}</div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={isPositive ? 'success' : 'destructive'} size="sm">
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </Badge>
              <span className="text-xs text-muted-foreground">{trend}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Chart component (simplified visualization)
function Chart({ data, height = 200 }: any) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((value: number, index: number) => (
        <div
          key={index}
          className="flex-1 bg-primary opacity-80 hover:opacity-100 transition-opacity rounded-t"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function FuturisticFinanceDashboard() {
  const { setTheme } = useTheme();
  const [period, setPeriod] = useState('1M');
  const [portfolio, setPortfolio] = useState('all');
  
  // Force futuristic theme
  React.useEffect(() => {
    setTheme('futuristic');
  }, [setTheme]);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                QuantumFi Dashboard
              </h1>
              <Badge variant="success" className="animate-pulse shrink-0">LIVE</Badge>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <Select value={portfolio} onValueChange={setPortfolio}>
                <SelectTrigger className="w-32 sm:w-40 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Portfolios</SelectItem>
                  <SelectItem value="crypto">Crypto</SelectItem>
                  <SelectItem value="stocks">Stocks</SelectItem>
                  <SelectItem value="forex">Forex</SelectItem>
                </SelectContent>
              </Select>
              
              <Avatar alt="JD" size="md" className="shrink-0" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Alert */}
        <Alert variant="info" className="mb-4 sm:mb-6 mx-2 sm:mx-0" dismissible>
          <strong>Market Update:</strong> Federal Reserve announces rate decision at 2:00 PM EST. Volatility expected.
        </Alert>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <MetricCard
            title="Portfolio Value"
            value="$1,247,892"
            change={12.5}
            trend="vs last month"
            icon="💼"
          />
          <MetricCard
            title="Today's P&L"
            value="+$24,531"
            change={2.8}
            trend="daily change"
            icon="📈"
          />
          <MetricCard
            title="Active Positions"
            value="47"
            change={-5.2}
            trend="vs yesterday"
            icon="📊"
          />
          <MetricCard
            title="Win Rate"
            value="68.4%"
            change={3.1}
            trend="30-day average"
            icon="🎯"
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="lg:col-span-2" elevated>
            <CardHeader>
              <div className="flex justify-between items-start flex-col sm:flex-row gap-4">
                <CardTitle>Portfolio Performance</CardTitle>
                <div className="flex gap-1 sm:gap-2 flex-wrap">
                  {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={period === p ? 'primary' : 'ghost'}
                      onClick={() => setPeriod(p)}
                      className="min-h-[32px] px-2 sm:px-3"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="overflow-x-auto">
                <Chart data={[45, 52, 48, 65, 72, 68, 82, 91, 87, 94, 102, 98]} height={250} />
              </div>
            </CardContent>
          </Card>
          
          <Card elevated>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Crypto</span>
                  <span>45%</span>
                </div>
                <Progress value={45} variant="primary" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Stocks</span>
                  <span>30%</span>
                </div>
                <Progress value={30} variant="success" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Forex</span>
                  <span>15%</span>
                </div>
                <Progress value={15} variant="warning" size="sm" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Commodities</span>
                  <span>10%</span>
                </div>
                <Progress value={10} variant="info" size="sm" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Positions Table */}
        <Card elevated>
          <CardHeader>
            <CardTitle>Active Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="long">Long</TabsTrigger>
                <TabsTrigger value="short">Short</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4 mt-4">
                  {[
                    { symbol: 'BTC/USD', type: 'LONG', entry: '67,234', current: '68,122', pnl: '+1.32%', status: 'success' },
                    { symbol: 'AAPL', type: 'LONG', entry: '178.45', current: '182.10', pnl: '+2.05%', status: 'success' },
                    { symbol: 'EUR/USD', type: 'SHORT', entry: '1.0892', current: '1.0875', pnl: '+0.16%', status: 'success' },
                    { symbol: 'TSLA', type: 'SHORT', entry: '245.30', current: '248.90', pnl: '-1.47%', status: 'destructive' },
                    { symbol: 'GOLD', type: 'LONG', entry: '2,042', current: '2,038', pnl: '-0.20%', status: 'destructive' },
                  ].map((position, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors flex-wrap sm:flex-nowrap gap-2">
                      <div className="flex items-center gap-4">
                        <Badge variant={position.type === 'LONG' ? 'success' : 'destructive'} size="sm">
                          {position.type}
                        </Badge>
                        <div>
                          <p className="font-semibold">{position.symbol}</p>
                          <p className="text-sm text-muted-foreground">Entry: ${position.entry}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                        <div className="text-right">
                          <p className="font-medium">${position.current}</p>
                          <Badge variant={position.status as any} size="sm">{position.pnl}</Badge>
                        </div>
                        <div className="flex gap-1 sm:gap-2 shrink-0">
                          <Tooltip content="Edit Position">
                            <Button size="sm" variant="ghost" className="min-h-[32px] min-w-[32px]">📝</Button>
                          </Tooltip>
                          <Tooltip content="Close Position">
                            <Button size="sm" variant="ghost" className="min-h-[32px] min-w-[32px]">✕</Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex flex-col gap-3">
          <Tooltip content="New Trade" position="left">
            <Button size="lg" className="rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg min-h-[48px]" elevated>
              +
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
      <FuturisticFinanceDashboard />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);