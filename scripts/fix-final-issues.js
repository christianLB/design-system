/**
 * Script to fix the final remaining issues in migrated components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Fix for MultiSelect test
const multiSelectTestFix = {
  component: 'MultiSelect',
  file: '__tests__/MultiSelect.test.tsx',
  content: `import React from 'react';
import { render, screen } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';

describe('MultiSelect Component', () => {
  // Using the correct type for options that includes id
  const options = [{ id: '1', label: "Option 1", value: "1" }];
  
  it('renders correctly', () => {
    render(<MultiSelect options={options} onChange={() => {}} data-testid="multiselect" />);
    expect(screen.getByTestId('multiselect')).toBeInTheDocument();
  });
  
  // Add more tests as needed
});`
};

// Fix for ThemeToggle ThemeContext import
const themeToggleImportFix = {
  component: 'ThemeToggle',
  file: 'ThemeToggle.tsx',
  // Check for this import path and create a fallback ThemeContext if needed
  importCheck: 'from "../../contexts/ThemeContext"',
  // Create a simple ThemeContext if it doesn't exist
  createThemeContext: true,
  themeContextDir: path.join(__dirname, '..', 'src', 'contexts'),
  themeContextFile: 'ThemeContext.tsx',
  themeContextContent: `import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'system' 
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;`
};

// Fix for Select component
const selectComponentFix = {
  component: 'Select',
  file: 'Select.tsx',
  // Add proper export for SelectProps to Select.tsx
  propExportCheck: 'export interface SelectProps',
  // If the interface is found but not exported, add export
  nonExportedPattern: /interface\s+SelectProps/,
  // If SelectProps interface doesn't exist, add this at the top of the file
  propExport: `export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  className?: string;
  label?: string;
  error?: string;
}`,
  // Fix the index.ts file
  indexFile: 'index.ts',
  indexContent: `export { Select } from './Select';
export type { SelectProps } from './Select';`
};

// Function to fix MultiSelect test
const fixMultiSelectTest = () => {
  const { component, file, content } = multiSelectTestFix;
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  fs.writeFileSync(filePath, content);
  console.log(`  Fixed ${component}/${file} with correct option type`);
  return true;
};

// Function to fix ThemeToggle import and create ThemeContext if needed
const fixThemeToggleImport = () => {
  const { 
    component, file, importCheck, createThemeContext,
    themeContextDir, themeContextFile, themeContextContent
  } = themeToggleImportFix;
  
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ThemeToggle component file not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if the correct import path is already there
  if (content.includes(importCheck)) {
    // The import path is correct, but the file might not exist
    if (createThemeContext) {
      // Create ThemeContext file if it doesn't exist
      if (!fs.existsSync(themeContextDir)) {
        fs.mkdirSync(themeContextDir, { recursive: true });
        console.log(`  Created contexts directory: ${themeContextDir}`);
      }
      
      const themeContextPath = path.join(themeContextDir, themeContextFile);
      
      if (!fs.existsSync(themeContextPath)) {
        fs.writeFileSync(themeContextPath, themeContextContent);
        console.log(`  Created ThemeContext file: ${themeContextPath}`);
      } else {
        console.log(`  ThemeContext file already exists: ${themeContextPath}`);
      }
    }
  } else {
    // The import path is incorrect, fix it
    const fixedContent = content.replace(
      /from ["'].*?\/ThemeContext["']/,
      importCheck
    );
    
    fs.writeFileSync(filePath, fixedContent);
    console.log(`  Fixed ThemeContext import in ${component}/${file}`);
    
    // Create ThemeContext file if needed
    if (createThemeContext) {
      if (!fs.existsSync(themeContextDir)) {
        fs.mkdirSync(themeContextDir, { recursive: true });
        console.log(`  Created contexts directory: ${themeContextDir}`);
      }
      
      const themeContextPath = path.join(themeContextDir, themeContextFile);
      
      if (!fs.existsSync(themeContextPath)) {
        fs.writeFileSync(themeContextPath, themeContextContent);
        console.log(`  Created ThemeContext file: ${themeContextPath}`);
      } else {
        console.log(`  ThemeContext file already exists: ${themeContextPath}`);
      }
    }
  }
  
  return true;
};

// Function to fix Select component props export
const fixSelectProps = () => {
  const { 
    component, file, propExportCheck, nonExportedPattern, 
    propExport, indexFile, indexContent 
  } = selectComponentFix;
  
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  Select component file not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Check if SelectProps is already exported
  if (content.includes(propExportCheck)) {
    console.log(`  SelectProps is already exported in ${component}/${file}`);
  } else if (nonExportedPattern.test(content)) {
    // SelectProps exists but is not exported, add export
    content = content.replace(
      nonExportedPattern,
      'export interface SelectProps'
    );
    modified = true;
    console.log(`  Added export to SelectProps interface in ${component}/${file}`);
  } else {
    // SelectProps doesn't exist, add it at the top after imports
    const importEndIndex = content.indexOf('const Select');
    if (importEndIndex !== -1) {
      content = 
        content.substring(0, importEndIndex) + 
        propExport + '\n\n' + 
        content.substring(importEndIndex);
      modified = true;
      console.log(`  Added SelectProps interface to ${component}/${file}`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content);
  }
  
  // Fix the index.ts file
  const indexPath = path.join(COMPONENTS_DIR, component, indexFile);
  fs.writeFileSync(indexPath, indexContent);
  console.log(`  Updated ${component}/${indexFile} with proper type exports`);
  
  return true;
};

// Main function
const fixFinalIssues = () => {
  console.log('Fixing final issues in migrated components...\n');
  
  // Fix MultiSelect test
  console.log('Fixing MultiSelect test:');
  fixMultiSelectTest();
  
  // Fix ThemeToggle import
  console.log('\nFixing ThemeToggle import and creating ThemeContext if needed:');
  fixThemeToggleImport();
  
  // Fix Select component props export
  console.log('\nFixing Select component props export:');
  fixSelectProps();
  
  console.log('\nAll final fixes applied. Please run build and tests to verify.');
};

// Run the script
fixFinalIssues();
