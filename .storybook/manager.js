import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// Get version from global variable injected by main.ts
const version = window.__STORYBOOK_PACKAGE_VERSION__ || '3.3.2';

// Create custom theme with version in brand title
const customTheme = create({
  base: 'light',
  
  // Brand
  brandTitle: `Design System v${version}`,
  brandUrl: 'https://github.com/k2600x/design-system',
  // brandImage: './logo.png', // Add logo path if you have one
  
  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: 'JetBrains Mono, Monaco, Consolas, monospace',
  
  // Colors
  colorPrimary: '#6366F1',
  colorSecondary: '#0F766E',
  
  // UI colors
  appBg: '#FAFAFA',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E6E6E6',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#1F2937',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6B7280',
  
  // Toolbar
  barTextColor: '#4B5563',
  barSelectedColor: '#6366F1',
  barBg: '#FFFFFF',
  
  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputTextColor: '#1F2937',
  inputBorderRadius: 6,
});

// Configure Storybook with custom theme
addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});

// Add custom CSS for version display in sidebar
const addVersionToSidebar = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Add version badge to sidebar */
    [data-item-id="root"] .sidebar-item[data-nodetype="root"]:first-child::after {
      content: "v${version}";
      display: inline-block;
      margin-left: 8px;
      padding: 2px 6px;
      background: #6366F1;
      color: white;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 600;
      line-height: 1;
      vertical-align: middle;
    }
    
    /* Style for brand title with version */
    .sidebar-header .brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    /* Custom version indicator in toolbar */
    .os-content::before {
      content: "Design System v${version}";
      display: block;
      padding: 12px 16px;
      font-size: 11px;
      font-weight: 600;
      color: #6B7280;
      border-bottom: 1px solid #E5E7EB;
      background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  `;
  document.head.appendChild(style);
};

// Apply custom styling when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addVersionToSidebar);
} else {
  addVersionToSidebar();
}