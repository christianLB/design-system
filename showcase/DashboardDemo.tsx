/**
 * Dashboard Demo - BMAD Platform Control Center
 *
 * Replica of dashboard-v3 using the new Foundry-based design system
 * to demonstrate it's ready to replace the current production dashboard.
 */

import React, { useState } from 'react';
import {
  Activity,
  Server,
  Database,
  Bot,
  CreditCard,
  Brain,
  Search,
  Rocket,
  Heart,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Wallet,
  Building2,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  ListTodo,
  Filter,
  Tag,
  Circle,
  ChevronRight,
  DollarSign,
  Landmark,
  Link2,
  AlertOctagon,
} from 'lucide-react';
import { Button } from '../src/components/Button/Button';
import { Input } from '../src/components/Input/Input';
import { Card } from '../src/components/Card/Card';
import { Animate, AnimateGroup } from '../src/components/Animate';
import { cn } from '../src/utils/cn';

// Types
type ServiceStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

interface ServiceHealth {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  responseTime: number;
  lastChecked: Date;
  version?: string;
  uptime?: string;
  error?: string;
}

// Mock data simulating real services
const mockServices: ServiceHealth[] = [
  {
    id: 'comm',
    name: 'comm-service',
    description: 'Telegram Bot & Communications',
    status: 'healthy',
    responseTime: 45,
    lastChecked: new Date(),
    version: '2.1.0',
    uptime: '99.9%',
  },
  {
    id: 'finance',
    name: 'finance-service',
    description: 'Firefly III Integration',
    status: 'healthy',
    responseTime: 120,
    lastChecked: new Date(),
    version: '1.5.2',
    uptime: '99.5%',
  },
  {
    id: 'memory',
    name: 'memory-service',
    description: 'Knowledge Base & Search',
    status: 'healthy',
    responseTime: 89,
    lastChecked: new Date(),
    version: '1.2.0',
    uptime: '99.8%',
  },
  {
    id: 'bank',
    name: 'bank-sync-service',
    description: 'GoCardless Banking Sync',
    status: 'degraded',
    responseTime: 1500,
    lastChecked: new Date(),
    version: '1.0.3',
    uptime: '98.2%',
  },
  {
    id: 'ai',
    name: 'ai-service',
    description: 'LLM & AI Integrations',
    status: 'healthy',
    responseTime: 230,
    lastChecked: new Date(),
    version: '2.0.1',
    uptime: '99.7%',
  },
  {
    id: 'trading',
    name: 'trading-service',
    description: 'Crypto & Stock Trading',
    status: 'down',
    responseTime: 0,
    lastChecked: new Date(),
    error: 'Connection refused',
  },
];

// Status Badge Component
const StatusBadge: React.FC<{ status: ServiceStatus }> = ({ status }) => {
  const styles = {
    healthy: 'bg-green-500/20 text-green-400 border-green-500/30',
    degraded: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    down: 'bg-red-500/20 text-red-400 border-red-500/30',
    unknown: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <span
      className={cn(
        'px-2 py-0.5 text-xs font-medium rounded-full border uppercase',
        styles[status],
      )}
    >
      {status}
    </span>
  );
};

// Status Dot Component
const StatusDot: React.FC<{ status: ServiceStatus }> = ({ status }) => {
  const colors = {
    healthy: 'bg-green-500',
    degraded: 'bg-yellow-500',
    down: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return <span className={cn('w-2.5 h-2.5 rounded-full animate-pulse', colors[status])} />;
};

// Service Icon mapping
const ServiceIcon: React.FC<{ serviceId: string; className?: string }> = ({
  serviceId,
  className,
}) => {
  const icons: Record<string, React.ReactNode> = {
    comm: <Bot className={className} />,
    finance: <CreditCard className={className} />,
    memory: <Database className={className} />,
    bank: <CreditCard className={className} />,
    ai: <Brain className={className} />,
    trading: <Activity className={className} />,
  };
  return <>{icons[serviceId] || <Server className={className} />}</>;
};

// Service Health Card Component
const ServiceHealthCard: React.FC<{ service: ServiceHealth }> = ({ service }) => {
  const borderColors = {
    healthy: 'border-green-500/30 hover:border-green-500/50',
    degraded: 'border-yellow-500/30 hover:border-yellow-500/50',
    down: 'border-red-500/30 hover:border-red-500/50',
    unknown: 'border-gray-500/30 hover:border-gray-500/50',
  };

  return (
    <div
      className={cn(
        'bg-card rounded-lg border p-4 transition-all hover:shadow-lg',
        borderColors[service.status],
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <ServiceIcon serviceId={service.id} className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{service.name}</h3>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusDot status={service.status} />
          <StatusBadge status={service.status} />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Response Time</span>
          <span
            className={cn(
              'text-sm font-medium',
              service.responseTime > 1000 ? 'text-yellow-400' : 'text-foreground',
            )}
          >
            {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Last Checked</span>
          <span className="text-sm font-medium text-foreground">
            {service.lastChecked.toLocaleTimeString()}
          </span>
        </div>
        {service.version && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Version</span>
            <span className="text-sm font-medium text-foreground">v{service.version}</span>
          </div>
        )}
        {service.uptime && (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Uptime</span>
            <span className="text-sm font-medium text-green-400">{service.uptime}</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {service.error && (
        <div className="mt-3 p-2 rounded bg-red-500/10 border border-red-500/20">
          <p className="text-xs text-red-400">{service.error}</p>
        </div>
      )}
    </div>
  );
};

// Service Health Grid Component
const ServiceHealthGrid: React.FC<{ services: ServiceHealth[]; isLoading?: boolean }> = ({
  services,
  isLoading,
}) => {
  const healthyCount = services.filter((s) => s.status === 'healthy').length;
  const degradedCount = services.filter((s) => s.status === 'degraded').length;
  const downCount = services.filter((s) => s.status === 'down').length;

  return (
    <div>
      {/* Summary Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-muted-foreground">{healthyCount} Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">{degradedCount} Degraded</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">{downCount} Down</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <RefreshCw className={cn('w-3 h-3', isLoading && 'animate-spin')} />
          Auto-refresh: 30s
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <Animate key={service.id} type="fade" delay={index * 0.05}>
            <ServiceHealthCard service={service} />
          </Animate>
        ))}
      </div>
    </div>
  );
};

// Search Interface Component
const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'keyword' | 'semantic' | 'hybrid'>('hybrid');
  const [results, setResults] = useState<
    Array<{ kind: string; title: string; score: number; snippet: string }>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setResults([
        {
          kind: 'TASK',
          title: 'Implement OAuth2 for bank-sync',
          score: 0.95,
          snippet: 'Add OAuth2 authentication flow for GoCardless integration...',
        },
        {
          kind: 'NOTE',
          title: 'Trading API Rate Limits',
          score: 0.87,
          snippet: 'Binance API has a limit of 1200 requests per minute...',
        },
        {
          kind: 'DOC',
          title: 'Service Architecture Overview',
          score: 0.82,
          snippet: 'The BMAD platform consists of microservices deployed on NAS...',
        },
      ]);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search knowledge base..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border, #e4e4e7)',
            background: 'var(--color-card, #fff)',
            color: 'var(--color-foreground, #0a0a0a)',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as typeof mode)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid var(--color-border, #e4e4e7)',
            background: 'var(--color-card, #fff)',
            color: 'var(--color-foreground, #0a0a0a)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <option value="keyword">Keyword</option>
          <option value="semantic">Semantic</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            background: '#3b82f6',
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isSearching ? 0.7 : 1,
          }}
        >
          <Search className="w-4 h-4" />
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result, i) => (
            <Animate key={i} type="slide-up" delay={i * 0.1}>
              <div className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-1.5 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded">
                    {result.kind}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Score: {result.score.toFixed(2)}
                  </span>
                </div>
                <h4 className="font-medium text-foreground">{result.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{result.snippet}</p>
              </div>
            </Animate>
          ))}
        </div>
      )}
    </div>
  );
};

// Financial Data / Bank Management Component
const FinancialData: React.FC = () => {
  const bankAccounts = [
    {
      id: 'acc1',
      iban: 'ES12 3456 7890 1234 5678 9012',
      bank: 'Santander',
      balance: 4523.45,
      currency: 'EUR',
      status: 'active',
      lastSync: '2m ago',
    },
    {
      id: 'acc2',
      iban: 'ES98 7654 3210 9876 5432 1098',
      bank: 'BBVA',
      balance: 12890.0,
      currency: 'EUR',
      status: 'active',
      lastSync: '5m ago',
    },
    {
      id: 'acc3',
      iban: 'ES45 1111 2222 3333 4444 5555',
      bank: 'CaixaBank',
      balance: 890.23,
      currency: 'EUR',
      status: 'syncing',
      lastSync: 'syncing...',
    },
  ];

  const recentTransactions = [
    {
      id: 't1',
      description: 'Amazon Prime',
      amount: -14.99,
      date: '2h ago',
      category: 'Subscriptions',
    },
    { id: 't2', description: 'Salary Deposit', amount: 3200.0, date: '1d ago', category: 'Income' },
    { id: 't3', description: 'Supermarket', amount: -87.34, date: '1d ago', category: 'Groceries' },
    {
      id: 't4',
      description: 'Electric Bill',
      amount: -123.45,
      date: '2d ago',
      category: 'Utilities',
    },
  ];

  const summaryStats = [
    { label: 'Connected Banks', value: '3', icon: Building2, color: '#3b82f6' },
    { label: 'Total Balance', value: '€18,303', icon: Wallet, color: '#22c55e' },
    { label: 'Pending Txns', value: '2', icon: ArrowUpDown, color: '#f59e0b' },
    { label: 'Stuck Txns', value: '0', icon: AlertOctagon, color: '#6b7280' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--color-card, #fff)',
              border: '1px solid var(--color-border, #e4e4e7)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ padding: '8px', borderRadius: '8px', background: `${stat.color}20` }}>
              <stat.icon style={{ width: '20px', height: '20px', color: stat.color }} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'var(--color-foreground, #0a0a0a)',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #71717a)' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bank Accounts */}
      <div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--color-foreground, #0a0a0a)',
          }}
        >
          Linked Accounts
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {bankAccounts.map((acc) => (
            <div
              key={acc.id}
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'var(--color-muted, #f4f4f5)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Landmark
                  style={{
                    width: '18px',
                    height: '18px',
                    color: 'var(--color-muted-foreground, #71717a)',
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-foreground, #0a0a0a)',
                    }}
                  >
                    {acc.bank}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-muted-foreground, #71717a)',
                      fontFamily: 'monospace',
                    }}
                  >
                    {acc.iban}
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-foreground, #0a0a0a)',
                  }}
                >
                  €{acc.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: acc.status === 'syncing' ? '#f59e0b' : '#22c55e',
                  }}
                >
                  {acc.lastSync}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--color-foreground, #0a0a0a)',
          }}
        >
          Recent Transactions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {recentTransactions.map((txn) => (
            <div
              key={txn.id}
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                background: 'var(--color-card, #fff)',
                border: '1px solid var(--color-border, #e4e4e7)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {txn.amount > 0 ? (
                  <TrendingUp style={{ width: '16px', height: '16px', color: '#22c55e' }} />
                ) : (
                  <TrendingDown style={{ width: '16px', height: '16px', color: '#ef4444' }} />
                )}
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'var(--color-foreground, #0a0a0a)',
                    }}
                  >
                    {txn.description}
                  </div>
                  <div
                    style={{ fontSize: '11px', color: 'var(--color-muted-foreground, #71717a)' }}
                  >
                    {txn.category} • {txn.date}
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: txn.amount > 0 ? '#22c55e' : '#ef4444',
                }}
              >
                {txn.amount > 0 ? '+' : ''}
                {txn.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Task Management Component
const TaskManagement: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const tasks = [
    {
      id: 'PLAT-042',
      title: 'Fix bank-sync OAuth refresh',
      status: 'in_progress',
      priority: 'high',
      project: 'bank-sync-service',
    },
    {
      id: 'PLAT-041',
      title: 'Add trading-service reconnection logic',
      status: 'ready',
      priority: 'high',
      project: 'trading-service',
    },
    {
      id: 'PLAT-040',
      title: 'Implement memory-service semantic search',
      status: 'done',
      priority: 'medium',
      project: 'memory-service',
    },
    {
      id: 'PLAT-039',
      title: 'Dashboard v3 -> Foundry migration',
      status: 'in_progress',
      priority: 'medium',
      project: 'dashboard-service',
    },
    {
      id: 'PLAT-038',
      title: 'Add comm-service rate limiting',
      status: 'backlog',
      priority: 'low',
      project: 'comm-service',
    },
  ];

  const statusColors: Record<string, string> = {
    backlog: '#6b7280',
    ready: '#3b82f6',
    in_progress: '#f59e0b',
    done: '#22c55e',
  };

  const priorityColors: Record<string, string> = {
    low: '#6b7280',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== 'all' && task.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--color-border, #e4e4e7)',
            background: 'var(--color-card, #fff)',
            color: 'var(--color-foreground, #0a0a0a)',
            fontSize: '12px',
          }}
        >
          <option value="all">All Status</option>
          <option value="backlog">Backlog</option>
          <option value="ready">Ready</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid var(--color-border, #e4e4e7)',
            background: 'var(--color-card, #fff)',
            color: 'var(--color-foreground, #0a0a0a)',
            fontSize: '12px',
          }}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: '12px',
            color: 'var(--color-muted-foreground, #71717a)',
          }}
        >
          {filteredTasks.length} tasks
        </div>
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--color-card, #fff)',
              border: '1px solid var(--color-border, #e4e4e7)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <Circle
              style={{
                width: '12px',
                height: '12px',
                fill: statusColors[task.status],
                color: statusColors[task.status],
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--color-muted, #f4f4f5)',
                    color: 'var(--color-muted-foreground, #71717a)',
                    fontFamily: 'monospace',
                  }}
                >
                  {task.id}
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: `${priorityColors[task.priority]}20`,
                    color: priorityColors[task.priority],
                    fontWeight: 500,
                    textTransform: 'uppercase',
                  }}
                >
                  {task.priority}
                </span>
              </div>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-foreground, #0a0a0a)',
                }}
              >
                {task.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--color-muted-foreground, #71717a)',
                  marginTop: '2px',
                }}
              >
                {task.project}
              </div>
            </div>
            <ChevronRight
              style={{
                width: '16px',
                height: '16px',
                color: 'var(--color-muted-foreground, #71717a)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Quick Actions Component - Using design system Button
const QuickActions: React.FC = () => {
  const [actionStatus, setActionStatus] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});

  const executeAction = (actionId: string) => {
    setActionStatus((s) => ({ ...s, [actionId]: 'loading' }));
    setTimeout(() => {
      setActionStatus((s) => ({ ...s, [actionId]: 'success' }));
      setTimeout(() => setActionStatus((s) => ({ ...s, [actionId]: 'idle' })), 2000);
    }, 1000);
  };

  type ButtonVariant = 'primary' | 'success' | 'destructive' | 'outline';
  const actions: { id: string; label: string; icon: typeof Rocket; variant: ButtonVariant }[] = [
    { id: 'deploy', label: 'Deploy Services', icon: Rocket, variant: 'primary' },
    { id: 'health', label: 'Health Check', icon: Heart, variant: 'success' },
    { id: 'stop', label: 'Emergency Stop', icon: AlertTriangle, variant: 'destructive' },
    { id: 'logs', label: 'View Logs', icon: Terminal, variant: 'outline' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => {
        const IconComponent = action.icon;
        const status = actionStatus[action.id] || 'idle';
        return (
          <div key={action.id} className="flex flex-col items-center">
            <Button
              variant={action.variant}
              size="lg"
              onClick={() => executeAction(action.id)}
              disabled={status === 'loading'}
              fullWidth
              className="!py-4"
            >
              {status === 'loading' ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  Loading...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Done!
                </>
              ) : (
                <>
                  <IconComponent className="w-5 h-5 mr-2" />
                  {action.label}
                </>
              )}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

// Main Dashboard Demo Component
export const DashboardDemo: React.FC = () => {
  const [services] = useState(mockServices);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">BMAD Platform Control Center</h1>
                <p className="text-sm text-muted-foreground">
                  Powered by Foundry Design System v4.1
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: 'var(--color-muted-foreground, #71717a)',
                  whiteSpace: 'nowrap',
                }}
              >
                <Clock className="w-4 h-4" />
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </div>
              <button
                onClick={handleRefresh}
                title="Refresh all services"
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border, #e4e4e7)',
                  background: 'transparent',
                  color: 'var(--color-foreground, #333)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                <RefreshCw
                  className={cn('w-4 h-4', isRefreshing && 'animate-spin')}
                  style={{ flexShrink: 0 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Service Health Section */}
        <Animate type="fade">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Service Health</h2>
            </div>
            <ServiceHealthGrid services={services} isLoading={isRefreshing} />
          </section>
        </Animate>

        {/* Financial Data Section */}
        <Animate type="slide-up" delay={0.1}>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Wallet className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Financial Data</h2>
            </div>
            <Card className="p-4">
              <FinancialData />
            </Card>
          </section>
        </Animate>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Knowledge Base Search */}
          <Animate type="slide-up" delay={0.15}>
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
              </div>
              <Card className="p-4">
                <SearchInterface />
              </Card>
            </section>
          </Animate>

          {/* Task Management */}
          <Animate type="slide-up" delay={0.2}>
            <section>
              <div className="flex items-center gap-2 mb-4">
                <ListTodo className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Task Management</h2>
              </div>
              <Card className="p-4">
                <TaskManagement />
              </Card>
            </section>
          </Animate>
        </div>

        {/* Quick Actions Row */}
        <Animate type="slide-up" delay={0.25}>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            </div>
            <Card className="p-4">
              <QuickActions />
            </Card>
          </section>
        </Animate>

        {/* System Stats */}
        <Animate type="slide-up" delay={0.3}>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">System Overview</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Services', value: '6', icon: Server },
                { label: 'API Calls (24h)', value: '12.4K', icon: Activity },
                { label: 'Avg Response', value: '156ms', icon: Clock },
                { label: 'Error Rate', value: '0.02%', icon: AlertTriangle },
              ].map((stat, i) => (
                <Card key={stat.label} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </Animate>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          BMAD Platform Control Center - Built with @christianlb/design-system v4.1.0 (Foundry)
        </div>
      </footer>
    </div>
  );
};

export default DashboardDemo;
