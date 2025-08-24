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
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Tooltip } from '../components/Tooltip/Tooltip';

// KPI Card component
function KPICard({ title, value, change, target, icon, color = 'primary' }: any) {
  const isPositive = change >= 0;
  const progress = target ? (value / target) * 100 : 0;
  
  return (
    <Card elevated>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
          </div>
          <div className="text-3xl opacity-20">{icon}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant={isPositive ? 'success' : 'destructive'} size="sm">
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last quarter</span>
          </div>
          
          {target && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Target: {target}</span>
                <span>{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} variant={color as any} size="sm" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Team member component
function TeamMember({ name, role, avatar, status, tasks }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar src={avatar} alt={name} size="md" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={status === 'available' ? 'success' : 'warning'} size="sm">
          {status}
        </Badge>
        <span className="text-sm text-muted-foreground">{tasks} tasks</span>
      </div>
    </div>
  );
}

// Project row component
function ProjectRow({ name, client, progress, deadline, team, status }: any) {
  const getStatusVariant = () => {
    switch(status) {
      case 'On Track': return 'success';
      case 'At Risk': return 'warning';
      case 'Delayed': return 'destructive';
      default: return 'secondary';
    }
  };
  
  return (
    <tr className="border-b hover:bg-accent/50 transition-colors">
      <td className="py-3 px-4">
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{client}</p>
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="w-32">
          <Progress value={progress} variant="primary" size="sm" />
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">{deadline}</td>
      <td className="py-3 px-4">
        <div className="flex -space-x-2">
          {team.slice(0, 3).map((member: string, i: number) => (
            <Avatar key={i} alt={member} size="sm" className="border-2 border-background" />
          ))}
          {team.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
              +{team.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge variant={getStatusVariant() as any} size="sm">{status}</Badge>
      </td>
    </tr>
  );
}

function LightCorporateDashboard() {
  const { setTheme } = useTheme();
  const [department, setDepartment] = useState('all');
  const [quarter, setQuarter] = useState('Q4-2024');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Force light theme
  React.useEffect(() => {
    setTheme('light');
  }, [setTheme]);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Professional Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 sm:gap-8 min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold truncate">Corporate Dashboard</h1>
              <nav className="hidden lg:flex gap-4 xl:gap-6">
                <Button variant="ghost" size="sm" className="min-h-[32px]">Overview</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Projects</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Teams</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Reports</Button>
                <Button variant="ghost" size="sm" className="min-h-[32px]">Settings</Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-32 sm:w-48 lg:w-64 min-h-[40px]"
              />
              <Button variant="outline" size="sm" className="min-h-[32px]">
                <span className="mr-1 sm:mr-2">🔔</span>
                <Badge variant="destructive" size="sm" className="ml-1">3</Badge>
              </Button>
              <Avatar src="https://i.pravatar.cc/150?img=12" alt="User" size="md" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Filters Bar */}
      <div className="bg-accent/30 border-b">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-32 sm:w-40 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={quarter} onValueChange={setQuarter}>
                <SelectTrigger className="w-24 sm:w-32 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q4-2024">Q4 2024</SelectItem>
                  <SelectItem value="Q3-2024">Q3 2024</SelectItem>
                  <SelectItem value="Q2-2024">Q2 2024</SelectItem>
                  <SelectItem value="Q1-2024">Q1 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="min-h-[32px] text-xs sm:text-sm">Export Report</Button>
              <Button variant="primary" size="sm" className="min-h-[32px] text-xs sm:text-sm">New Project</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Alert */}
        <Alert variant="info" className="mb-4 sm:mb-6 mx-2 sm:mx-0" dismissible>
          <strong>Good morning!</strong> You have 3 meetings scheduled today and 2 project deadlines this week.
        </Alert>
        
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <KPICard
            title="Revenue"
            value="$12.4M"
            change={8.3}
            target={15000000}
            icon="💰"
            color="success"
          />
          <KPICard
            title="Active Projects"
            value="47"
            change={-5.2}
            target={50}
            icon="📊"
            color="primary"
          />
          <KPICard
            title="Team Efficiency"
            value="87%"
            change={12.1}
            target={95}
            icon="⚡"
            color="warning"
          />
          <KPICard
            title="Client Satisfaction"
            value="4.8/5"
            change={6.7}
            target={5}
            icon="⭐"
            color="info"
          />
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Projects Table */}
          <Card className="lg:col-span-2" elevated>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Active Projects</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 px-4 font-medium text-sm text-muted-foreground">Project</th>
                      <th className="pb-3 px-4 font-medium text-sm text-muted-foreground">Progress</th>
                      <th className="pb-3 px-4 font-medium text-sm text-muted-foreground">Deadline</th>
                      <th className="pb-3 px-4 font-medium text-sm text-muted-foreground">Team</th>
                      <th className="pb-3 px-4 font-medium text-sm text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ProjectRow
                      name="Website Redesign"
                      client="Acme Corp"
                      progress={75}
                      deadline="Dec 15, 2024"
                      team={['John', 'Sarah', 'Mike', 'Lisa']}
                      status="On Track"
                    />
                    <ProjectRow
                      name="Mobile App v2.0"
                      client="TechStart Inc"
                      progress={45}
                      deadline="Jan 10, 2025"
                      team={['David', 'Emma', 'James']}
                      status="At Risk"
                    />
                    <ProjectRow
                      name="API Integration"
                      client="DataFlow Systems"
                      progress={90}
                      deadline="Nov 30, 2024"
                      team={['Alex', 'Maria']}
                      status="On Track"
                    />
                    <ProjectRow
                      name="Cloud Migration"
                      client="Global Finance"
                      progress={30}
                      deadline="Feb 28, 2025"
                      team={['Robert', 'Jennifer', 'William', 'Jessica', 'Thomas']}
                      status="Delayed"
                    />
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Team Overview */}
          <Card elevated>
            <CardHeader>
              <CardTitle>Team Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <TeamMember
                  name="Sarah Johnson"
                  role="Project Manager"
                  avatar="https://i.pravatar.cc/150?img=1"
                  status="available"
                  tasks={8}
                />
                <TeamMember
                  name="Michael Chen"
                  role="Lead Developer"
                  avatar="https://i.pravatar.cc/150?img=3"
                  status="busy"
                  tasks={12}
                />
                <TeamMember
                  name="Emily Davis"
                  role="UX Designer"
                  avatar="https://i.pravatar.cc/150?img=5"
                  status="available"
                  tasks={5}
                />
                <TeamMember
                  name="James Wilson"
                  role="Backend Engineer"
                  avatar="https://i.pravatar.cc/150?img=7"
                  status="busy"
                  tasks={10}
                />
                <TeamMember
                  name="Lisa Anderson"
                  role="QA Engineer"
                  avatar="https://i.pravatar.cc/150?img=9"
                  status="available"
                  tasks={6}
                />
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Members</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-semibold text-green-600">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On Leave</span>
                    <span className="font-semibold text-orange-600">3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Analytics Section */}
        <Card elevated>
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="productivity">
              <TabsList>
                <TabsTrigger value="productivity">Productivity</TabsTrigger>
                <TabsTrigger value="budget">Budget</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
              </TabsList>
              
              <TabsContent value="productivity" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">By Department</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Engineering</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} variant="success" size="sm" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Marketing</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} variant="primary" size="sm" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Sales</span>
                          <span>78%</span>
                        </div>
                        <Progress value={78} variant="warning" size="sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Task Completion</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>On Time</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} variant="success" size="sm" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Delayed</span>
                          <span>22%</span>
                        </div>
                        <Progress value={22} variant="warning" size="sm" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overdue</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} variant="destructive" size="sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Checkbox label="Review Q4 reports" checked={false} onChange={() => {}} />
                      <Checkbox label="Approve budget allocation" checked={false} onChange={() => {}} />
                      <Checkbox label="Schedule team meeting" checked={true} onChange={() => {}} />
                      <Checkbox label="Update project timeline" checked={false} onChange={() => {}} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

// App wrapper
function App() {
  return (
    <ThemeProvider>
      <LightCorporateDashboard />
    </ThemeProvider>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);