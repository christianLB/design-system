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

  // Dark Theme Specific Colors
  colorPrimary: '#60a5fa',        
  colorSecondary: '#a78bfa',      
  
  appBg: '#0f172a',              
  appContentBg: '#1e293b',        
  appBorderColor: '#334155',      
  
  textColor: '#f8fafc',          
  textInverseColor: '#1e293b',    
  textMutedColor: '#94a3b8',      
  
  barTextColor: '#94a3b8',        
  barSelectedColor: '#60a5fa',    
  barBg: '#1e293b',              
  
  inputBg: '#1e293b',            
  inputBorder: '#334155',        
  inputTextColor: '#f8fafc',      

  // Ensure all properties from Theme interface are present, even if inheriting non-color ones
  brandTitle: lightTheme.brandTitle,
  brandUrl: lightTheme.brandUrl,
  brandImage: lightTheme.brandImage,
  brandTarget: lightTheme.brandTarget,
  appBorderRadius: lightTheme.appBorderRadius,
  fontBase: lightTheme.fontBase,
  fontCode: lightTheme.fontCode,
  inputBorderRadius: lightTheme.inputBorderRadius,
};
