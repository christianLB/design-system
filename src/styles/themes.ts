export interface Theme {
  base: string;
  brandTitle: string;
  brandUrl: string;
  brandImage: string | null;
  brandTarget: string;
  colorPrimary: string;
  colorSecondary: string;
  appBg: string;
  appContentBg: string;
  appBorderColor: string;
  appBorderRadius: number;
  fontBase: string;
  fontCode: string;
  textColor: string;
  textInverseColor: string;
  textMutedColor: string;
  barTextColor: string;
  barSelectedColor: string;
  barBg: string;
  inputBg: string;
  inputBorder: string;
  inputTextColor: string;
  inputBorderRadius: number;
}

export const lightTheme: Theme = {
  base: 'light',
  brandTitle: 'Design System',
  brandUrl: 'https://your-design-system.com',
  brandImage: null,
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#8b5cf6',
  
  // UI
  appBg: '#ffffff',
  appContentBg: '#f8fafc',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 6,
  
  // Typography
  fontBase: 'Inter, -apple-system, sans-serif',
  fontCode: 'Fira Code, monospace',
  
  // Text colors
  textColor: '#1e293b',
  textInverseColor: '#f8fafc',
  textMutedColor: '#64748b',
  
  // Toolbar default and active colors
  barTextColor: '#64748b',
  barSelectedColor: '#3b82f6',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#1e293b',
  inputBorderRadius: 4,
};

export const darkTheme: Theme = {
  ...lightTheme,
  base: 'dark',
  appBg: '#0f172a',
  appContentBg: '#1e293b',
  appBorderColor: '#334155',
  textColor: '#f8fafc',
  textMutedColor: '#94a3b8',
  barBg: '#1e293b',
  inputBg: '#1e293b',
  inputBorder: '#334155',
  inputTextColor: '#f8fafc',
};
