import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AppLayout } from '../../AppLayout/AppLayout';
import { Header } from '../../Header/Header';
import { Navbar } from '../../Navbar/Navbar';
import { Sidebar } from '../../Sidebar/Sidebar';
import { Breadcrumb } from '../Breadcrumb';
import { NavigationTabs } from '../NavigationTabs';
import { Box } from '../../Box/Box';
import { Stack } from '../../Stack/Stack';
import { Icon } from '../../Icon/Icon';

const meta: Meta = {
  title: 'Navigation/Examples/SaaS Application',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// Sample SaaS Content
const ProjectManagementContent = () => {
  const [activeTab, setActiveTab] = React.useState('tasks');
  
  const breadcrumbItems = [
    { label: 'Projects', href: '/projects' },
    { label: 'Website Redesign', href: '/projects/website-redesign' },
    { label: 'Sprint 3' },
  ];
  
  const tabItems = [
    { 
      label: 'Tasks', 
      value: 'tasks',
      icon: <Icon name="CheckSquare" size="sm" />,
      badge: '24'
    },
    { 
      label: 'Timeline', 
      value: 'timeline',
      icon: <Icon name="Calendar" size="sm" />
    },
    { 
      label: 'Team', 
      value: 'team',
      icon: <Icon name="Users" size="sm" />,
      badge: '8'
    },
    { 
      label: 'Files', 
      value: 'files',
      icon: <Icon name="Folder" size="sm" />
    },
    { 
      label: 'Settings', 
      value: 'settings',
      icon: <Icon name="Settings" size="sm" />
    },
  ];
  
  const getContentForTab = () => {
    const style = {
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb',
      margin: '1rem 0',
      minHeight: '500px',
    };
    
    switch (activeTab) {
      case 'timeline':
        return (
          <div style={style}>
            <h2>Project Timeline</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Track project milestones and deadlines</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderLeft: '4px solid #22c55e', borderRadius: '0.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>✅ Phase 1: Research & Planning</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Completed on March 15, 2024</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '0.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#d97706' }}>🔄 Phase 2: Design & Prototyping</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>In progress - Due April 10, 2024</p>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderLeft: '4px solid #6b7280', borderRadius: '0.25rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#4b5563' }}>⏳ Phase 3: Development</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Scheduled for April 15, 2024</p>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div style={style}>
            <h2>Team Members</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Manage project team and roles</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Sarah Johnson', role: 'Project Manager', avatar: 'SJ', color: '#3b82f6' },
                { name: 'Mike Chen', role: 'UI/UX Designer', avatar: 'MC', color: '#10b981' },
                { name: 'Alex Rivera', role: 'Frontend Developer', avatar: 'AR', color: '#8b5cf6' },
                { name: 'Emily Davis', role: 'Backend Developer', avatar: 'ED', color: '#f59e0b' },
              ].map(member => (
                <div key={member.name} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: member.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {member.avatar}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{member.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'files':
        return (
          <div style={style}>
            <h2>Project Files</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Access and manage project documents</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { name: 'Design System.fig', type: 'Figma File', size: '2.4 MB', modified: '2 hours ago' },
                { name: 'User Research Report.pdf', type: 'PDF Document', size: '1.8 MB', modified: '1 day ago' },
                { name: 'Wireframes.sketch', type: 'Sketch File', size: '3.2 MB', modified: '3 days ago' },
                { name: 'Brand Guidelines.pdf', type: 'PDF Document', size: '5.1 MB', modified: '1 week ago' },
              ].map(file => (
                <div key={file.name} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.25rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon name="File" size="sm" />
                    <div>
                      <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500' }}>{file.name}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{file.type} • {file.size}</p>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{file.modified}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div style={style}>
            <h2>Project Settings</h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Configure project preferences and permissions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3>General</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Project Name</label>
                    <input 
                      type="text" 
                      defaultValue="Website Redesign"
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem'
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                    <textarea 
                      defaultValue="Complete redesign of the company website with modern UI/UX"
                      style={{ 
                        width: '100%', 
                        padding: '0.75rem', 
                        border: '1px solid #d1d5db', 
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        minHeight: '100px',
                        resize: 'vertical'
                      }} 
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3>Permissions</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '500' }}>Public Access</p>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Allow anyone in the organization to view this project</p>
                  </div>
                  <input type="checkbox" style={{ transform: 'scale(1.2)' }} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div style={style}>
            <Stack direction="row" align="center" justify="between" style={{ marginBottom: '2rem' }}>
              <h2 style={{ margin: 0 }}>Task Board</h2>
              <button style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#3b82f6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}>
                + Add Task
              </button>
            </Stack>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>To Do (8)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['User research analysis', 'Create user personas', 'Design wireframes'].map(task => (
                    <div key={task} style={{ 
                      padding: '1rem', 
                      backgroundColor: '#ffffff', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>{task}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#e5e7eb', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Not assigned</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#f59e0b' }}>In Progress (5)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Design system creation', 'Component library'].map(task => (
                    <div key={task} style={{ 
                      padding: '1rem', 
                      backgroundColor: '#fffbeb', 
                      border: '1px solid #fbbf24', 
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500' }}>{task}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Mike Chen</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ margin: '0 0 1rem 0', color: '#10b981' }}>Done (11)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Project kickoff', 'Stakeholder interviews'].map(task => (
                    <div key={task} style={{ 
                      padding: '1rem', 
                      backgroundColor: '#f0fdf4', 
                      border: '1px solid #22c55e', 
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}>
                      <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500', textDecoration: 'line-through', opacity: 0.7 }}>{task}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Sarah Johnson</span>
                      </div>
                    </div>
                  ))}
                </div>
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
        <Breadcrumb 
          items={breadcrumbItems}
          variant="pills"
          showHome={true}
        />
      </Box>
      
      {/* Page Header */}
      <Box style={{ marginBottom: '2rem' }}>
        <Stack direction="row" align="center" justify="between">
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>
              Website Redesign Project
            </h1>
            <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
              Sprint 3 • Due April 15, 2024
            </p>
          </div>
          <Stack direction="row" align="center" gap="sm">
            <button style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: 'transparent',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              Share
            </button>
            <button style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}>
              Invite Team
            </button>
          </Stack>
        </Stack>
      </Box>
      
      {/* Navigation Tabs */}
      <NavigationTabs
        items={tabItems}
        value={activeTab}
        onChange={setActiveTab}
        variant="pills"
        size="md"
      />
      
      {/* Tab Content */}
      {getContentForTab()}
    </Box>
  );
};

export const SaaSProjectManagement: Story = {
  render: () => (
    <AppLayout
      variant="sidebar-fixed"
      headerBehavior="sticky"
      sidebarBehavior="fixed"
      enableVerticalScroll={true}
      contentPadding="xl"
      header={
        <Header variant="default" backdrop="blur" shadow>
          <Navbar
            variant="default"
            items={[
              { label: 'Dashboard', href: '#dashboard' },
              { label: 'Projects', href: '#projects', active: true },
              { label: 'Teams', href: '#teams' },
              { label: 'Reports', href: '#reports' },
            ]}
            logo={
              <Stack direction="row" align="center" gap="sm">
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  backgroundColor: '#3b82f6',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  P
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>ProjectFlow</span>
              </Stack>
            }
            cta={
              <Stack direction="row" align="center" gap="sm">
                <button style={{ 
                  padding: '0.5rem', 
                  backgroundColor: 'transparent',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <Icon name="Search" size="sm" />
                </button>
                <button style={{ 
                  padding: '0.5rem', 
                  backgroundColor: 'transparent',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}>
                  <Icon name="Bell" size="sm" />
                </button>
                <div style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  backgroundColor: '#10b981', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>
                  SJ
                </div>
              </Stack>
            }
          />
        </Header>
      }
      sidebar={
        <Sidebar
          variant="utility"
          width="18rem"
          sections={[
            {
              title: 'Workspace',
              items: [
                { 
                  label: 'Dashboard', 
                  href: '#dashboard', 
                  icon: <Icon name="Home" size="sm" />
                },
                { 
                  label: 'Projects', 
                  href: '#projects', 
                  icon: <Icon name="Folder" size="sm" />,
                  active: true,
                  items: [
                    { label: 'Website Redesign', href: '#projects/website' },
                    { label: 'Mobile App', href: '#projects/mobile' },
                    { label: 'Brand Identity', href: '#projects/brand' },
                  ]
                },
                { 
                  label: 'Calendar', 
                  href: '#calendar', 
                  icon: <Icon name="Calendar" size="sm" />
                },
              ]
            },
            {
              title: 'Teams',
              items: [
                { 
                  label: 'Design Team', 
                  href: '#teams/design', 
                  icon: <Icon name="Palette" size="sm" />,
                  badge: '4'
                },
                { 
                  label: 'Development', 
                  href: '#teams/dev', 
                  icon: <Icon name="Code" size="sm" />,
                  badge: '6'
                },
                { 
                  label: 'Marketing', 
                  href: '#teams/marketing', 
                  icon: <Icon name="Megaphone" size="sm" />,
                  badge: '3'
                },
              ]
            }
          ]}
          searchable={true}
          showToggleButton={true}
          toggleButtonPosition="bottom"
        />
      }
    >
      <ProjectManagementContent />
    </AppLayout>
  ),
};