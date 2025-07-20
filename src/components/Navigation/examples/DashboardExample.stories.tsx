import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppLayout } from '../../AppLayout/AppLayout';
import { SimpleHeader } from '../../SimpleHeader/SimpleHeader';
import { Sidebar } from '../../Sidebar/Sidebar';
import { Breadcrumb } from '../Breadcrumb';
import { NavigationTabs } from '../NavigationTabs';
import { Box } from '../../Box/Box';
import { Stack } from '../../Stack/Stack';
import { Icon } from '../../Icon/Icon';

const meta: Meta = {
  title: 'Core Components/Navigation/Examples/Corporate Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Sample Dashboard Content
const DashboardContent = () => {
  const [activeTab, setActiveTab] = React.useState('overview');

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics' },
    { label: 'Performance' },
  ];

  const tabItems = [
    {
      label: 'Overview',
      value: 'overview',
      icon: <Icon name="BarChart" size="sm" />,
    },
    {
      label: 'Traffic',
      value: 'traffic',
      icon: <Icon name="TrendingUp" size="sm" />,
      badge: 'Live',
    },
    {
      label: 'Conversions',
      value: 'conversions',
      icon: <Icon name="Target" size="sm" />,
    },
    {
      label: 'Revenue',
      value: 'revenue',
      icon: <Icon name="DollarSign" size="sm" />,
    },
  ];

  const getContentForTab = () => {
    const style = {
      padding: '2rem',
      backgroundColor: 'var(--muted)',
      borderRadius: '0.5rem',
      margin: '1rem 0',
      minHeight: '400px',
    };

    switch (activeTab) {
      case 'traffic':
        return (
          <div style={style}>
            <h2>Traffic Analytics</h2>
            <p>Real-time website traffic data and user behavior analysis.</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h3>Page Views</h3>
                <p style={{ fontSize: '2rem', margin: 0, color: 'var(--success)' }}>24,567</p>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h3>Unique Visitors</h3>
                <p style={{ fontSize: '2rem', margin: 0, color: 'var(--primary)' }}>8,123</p>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h3>Bounce Rate</h3>
                <p style={{ fontSize: '2rem', margin: 0, color: 'var(--destructive)' }}>32.1%</p>
              </div>
            </div>
          </div>
        );
      case 'conversions':
        return (
          <div style={style}>
            <h2>Conversion Funnel</h2>
            <p>Track user journey and conversion optimization metrics.</p>
            <div style={{ marginTop: '2rem' }}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Landing Page → Signup: 15.3%</h4>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--muted)',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '15.3%',
                      height: '100%',
                      backgroundColor: 'var(--success)',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Signup → Trial: 68.7%</h4>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--muted)',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '68.7%',
                      height: '100%',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Trial → Purchase: 23.8%</h4>
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: 'var(--muted)',
                    borderRadius: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '23.8%',
                      height: '100%',
                      backgroundColor: 'var(--accent)',
                      borderRadius: '4px',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'revenue':
        return (
          <div style={style}>
            <h2>Revenue Analytics</h2>
            <p>Financial performance and revenue tracking dashboard.</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h3>Monthly Revenue</h3>
                <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: 'var(--success)' }}>
                  $45,231
                </p>
                <p style={{ color: 'var(--success)', fontSize: '0.875rem' }}>
                  ↑ 12.3% from last month
                </p>
              </div>
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h3>Average Order Value</h3>
                <p style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: 'var(--primary)' }}>
                  $156
                </p>
                <p style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>
                  ↑ 5.7% from last month
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={style}>
            <h2>Analytics Overview</h2>
            <p>Comprehensive view of your website performance and key metrics.</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Total Users</h4>
                <p style={{ fontSize: '2rem', margin: 0 }}>12,847</p>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Sessions</h4>
                <p style={{ fontSize: '2rem', margin: 0 }}>18,293</p>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Conversion Rate</h4>
                <p style={{ fontSize: '2rem', margin: 0 }}>3.2%</p>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--background)',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--border)',
                }}
              >
                <h4>Revenue</h4>
                <p style={{ fontSize: '2rem', margin: 0 }}>$45,231</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Box>
      {/* Breadcrumb Navigation */}
      <Box style={{ marginBottom: '1rem' }}>
        <Breadcrumb items={breadcrumbItems} variant="default" showHome={true} />
      </Box>

      {/* Page Header */}
      <Box style={{ marginBottom: '2rem' }}>
        <Stack direction="row" align="center" justify="between">
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Analytics Dashboard</h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              Monitor your website performance and user engagement
            </p>
          </div>
          <button
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Export Report
          </button>
        </Stack>
      </Box>

      {/* Navigation Tabs */}
      <NavigationTabs
        items={tabItems}
        value={activeTab}
        onChange={setActiveTab}
        variant="underline"
        size="md"
      />

      {/* Tab Content */}
      {getContentForTab()}
    </Box>
  );
};

export const CorporateDashboard: Story = {
  render: () => (
    <AppLayout
      variant="dashboard"
      headerBehavior="static"
      enableVerticalScroll={true}
      contentPadding="lg"
      header={
        <SimpleHeader
          left={<div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>📊 AnalyticsPro</div>}
          navigation={[
            { label: 'Dashboard', href: '#dashboard', active: true },
            { label: 'Analytics', href: '#analytics' },
            { label: 'Reports', href: '#reports' },
            { label: 'Users', href: '#users' },
          ]}
          right={
            <Stack direction="row" align="center" gap="sm">
              <button
                style={{
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <Icon name="Bell" size="sm" />
              </button>
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
            </Stack>
          }
        />
      }
      sidebar={
        <Sidebar
          variant="navigation"
          width="16rem"
          items={[
            {
              label: 'Dashboard',
              href: '#dashboard',
              icon: <Icon name="Home" size="sm" />,
              active: true,
            },
            {
              label: 'Analytics',
              href: '#analytics',
              icon: <Icon name="BarChart" size="sm" />,
              items: [
                { label: 'Overview', href: '#analytics/overview' },
                { label: 'Traffic', href: '#analytics/traffic' },
                { label: 'Conversions', href: '#analytics/conversions' },
              ],
            },
            {
              label: 'Reports',
              href: '#reports',
              icon: <Icon name="FileText" size="sm" />,
              badge: '3',
            },
            {
              label: 'Users',
              href: '#users',
              icon: <Icon name="Users" size="sm" />,
            },
            {
              label: 'Settings',
              href: '#settings',
              icon: <Icon name="Settings" size="sm" />,
            },
          ]}
          showToggleButton={true}
          toggleButtonPosition="top"
        />
      }
    >
      <DashboardContent />
    </AppLayout>
  ),
};

export const CompactDashboard: Story = {
  render: () => (
    <AppLayout
      variant="dashboard"
      headerBehavior="static"
      enableVerticalScroll={true}
      contentPadding="md"
      header={
        <SimpleHeader
          left={<div style={{ fontWeight: 'bold' }}>📊 Analytics</div>}
          navigation={[
            { label: 'Dashboard', href: '#dashboard', active: true },
            { label: 'Analytics', href: '#analytics' },
            { label: 'Reports', href: '#reports' },
          ]}
        />
      }
      sidebar={
        <Sidebar
          variant="mini"
          width="12rem"
          collapsedWidth="3rem"
          defaultCollapsed={true}
          items={[
            { label: 'Dashboard', href: '#dashboard', icon: '📊', active: true },
            { label: 'Users', href: '#users', icon: '👥' },
            { label: 'Reports', href: '#reports', icon: '📋', badge: '5' },
            { label: 'Settings', href: '#settings', icon: '⚙️' },
          ]}
        />
      }
    >
      <DashboardContent />
    </AppLayout>
  ),
};
