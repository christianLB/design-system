import * as React from 'react';
import clsx from 'clsx';
import { Card, CardContent } from '../Card/Card';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { StatusBadge } from '../StatusBadge';

export type MetricStatus = 'success' | 'warning' | 'error' | 'neutral';
export type MetricTrend = 'up' | 'down' | 'stable';

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  status?: MetricStatus;
  trend?: MetricTrend;
  showGlow?: boolean;
  className?: string;
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ 
    title,
    value,
    change,
    changeLabel = 'vs last period',
    icon,
    status = 'neutral',
    trend,
    showGlow = false,
    className,
    ...props 
  }, ref) => {
    
    const formatValue = (val: string | number) => {
      if (typeof val === 'number') {
        return val.toLocaleString();
      }
      return val;
    };

    const getTrendIcon = () => {
      if (!trend || trend === 'stable') return 'Minus';
      return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
    };

    const getTrendColor = () => {
      if (!change) return 'var(--muted-foreground)';
      return change > 0 ? 'var(--success)' : 'var(--destructive)';
    };

    const getStatusLabel = () => {
      switch (status) {
        case 'success': return 'GOOD';
        case 'warning': return 'WARNING';
        case 'error': return 'ERROR';
        default: return 'NORMAL';
      }
    };

    return (
      <div ref={ref} {...props}>
        <Card
          className={clsx(
            'transition-all duration-200',
            showGlow && status === 'success' && 'glow-effect',
            'hover:scale-[1.02]',
            className
          )}
        >
        <CardContent style={{ padding: 'var(--spacing-lg)' }}>
          <Stack gap="md">
            {/* Header with icon and status */}
            <Stack direction="row" align="center" justify="between">
              {icon && (
                <Icon 
                  name={icon as any} // eslint-disable-line @typescript-eslint/no-explicit-any 
                  size="lg" 
                  style={{
                    color: status === 'success' ? 'var(--success)' : 
                           status === 'warning' ? 'var(--warning)' : 
                           status === 'error' ? 'var(--destructive)' : 
                           'var(--primary)'
                  }}
                />
              )}
              <StatusBadge variant={status} size="sm">
                {getStatusLabel()}
              </StatusBadge>
            </Stack>
            
            {/* Metric content */}
            <Stack gap="xs">
              <Text color="subtle" size="sm">{title}</Text>
              <Heading as="h3" size={3} className="glow-text">
                {formatValue(value)}
              </Heading>
              
              {/* Change indicator */}
              {change !== undefined && (
                <Stack direction="row" align="center" gap="sm">
                  <Icon 
                    name={getTrendIcon() as any} // eslint-disable-line @typescript-eslint/no-explicit-any 
                    size="sm" 
                    style={{ color: getTrendColor() }}
                  />
                  <Text 
                    size="sm"
                    style={{ 
                      color: getTrendColor(),
                      fontWeight: '500'
                    }}
                  >
                    {change > 0 ? '+' : ''}{change}%
                  </Text>
                  <Text color="subtle" size="xs">{changeLabel}</Text>
                </Stack>
              )}
            </Stack>
          </Stack>
        </CardContent>
        </Card>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export { MetricCard };
export default MetricCard;