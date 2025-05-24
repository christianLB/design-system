/**
 * Script to fix issues in migrated components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Components with import issues to fix
const componentsToFix = [
  {
    component: 'ConfirmDialog',
    file: 'ConfirmDialog.tsx',
    replacements: [
      { from: 'from "./Dialog"', to: 'from "../Dialog/Dialog"' },
      { from: 'from "./Button"', to: 'from "../Button/Button"' },
      { from: 'from "../hooks/useConfirm"', to: 'from "../../hooks/useConfirm"' }
    ]
  },
  {
    component: 'ThemeToggle',
    file: 'ThemeToggle.tsx',
    replacements: [
      { from: 'from "../contexts/ThemeContext"', to: 'from "../../contexts/ThemeContext"' }
    ]
  }
];

// Tests with missing props to fix
const testsToFix = [
  {
    component: 'Carousel',
    file: '__tests__/Carousel.test.tsx',
    testRender: '<Carousel items={[<div key="1">Item 1</div>, <div key="2">Item 2</div>]} itemsToShow={1} />'
  },
  {
    component: 'DatePicker',
    file: '__tests__/DatePicker.test.tsx',
    testRender: '<DatePicker onDateChange={() => {}} />'
  },
  {
    component: 'FileUpload',
    file: '__tests__/FileUpload.test.tsx',
    testRender: '<FileUpload files={[]} onFileChange={() => {}} />'
  },
  {
    component: 'Label',
    file: '__tests__/Label.test.tsx',
    testRender: '<Label>Test Label</Label>'
  },
  {
    component: 'MultiSelect',
    file: '__tests__/MultiSelect.test.tsx',
    testRender: '<MultiSelect options={[{ label: "Option 1", value: "1" }]} onChange={() => {}} />'
  },
  {
    component: 'RadioGroup',
    file: '__tests__/RadioGroup.test.tsx',
    testRender: '<RadioGroup items={[{ label: "Option 1", value: "1" }]} name="test" />'
  }
];

// Add data-testid to components for testing
const componentsToAddTestId = [
  {
    component: 'Carousel',
    file: 'Carousel.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="carousel"'
  },
  {
    component: 'ConfirmDialog',
    file: 'ConfirmDialog.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="confirmdialog"'
  },
  {
    component: 'DatePicker',
    file: 'DatePicker.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="datepicker"'
  },
  {
    component: 'FileUpload',
    file: 'FileUpload.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="fileupload"'
  },
  {
    component: 'Label',
    file: 'Label.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="label"'
  },
  {
    component: 'Loader',
    file: 'Loader.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="loader"'
  },
  {
    component: 'MultiSelect',
    file: 'MultiSelect.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="multiselect"'
  },
  {
    component: 'RadioGroup',
    file: 'RadioGroup.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="radiogroup"'
  },
  {
    component: 'Select',
    file: 'Select.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="select"'
  },
  {
    component: 'Textarea',
    file: 'Textarea.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="textarea"'
  },
  {
    component: 'ThemeToggle',
    file: 'ThemeToggle.tsx',
    location: 'ref={ref}',
    addition: ' data-testid="themetoggle"'
  }
];

// Fix for Select component index.ts
const selectIndexFix = `export { Select } from './Select';
// Explicitly export SelectProps
export type { SelectProps } from './Select';`;

// Function to fix component import issues
const fixComponentImports = (componentData) => {
  const { component, file, replacements } = componentData;
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  replacements.forEach(({ from, to }) => {
    if (content.includes(from)) {
      content = content.replace(from, to);
      modified = true;
      console.log(`  Fixed import in ${component}/${file}: ${from} -> ${to}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  
  return false;
};

// Function to fix test files with missing props
const fixTestFiles = (testData) => {
  const { component, file, testRender } = testData;
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Test file not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Replace the basic render with the correct props
  content = content.replace(
    /<${component} \/>/g,
    testRender
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`  Fixed test render in ${component}/${file}`);
  return true;
};

// Function to add data-testid to components
const addTestId = (componentData) => {
  const { component, file, location, addition } = componentData;
  const filePath = path.join(COMPONENTS_DIR, component, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Component file not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes(location) && !content.includes(`data-testid="${component.toLowerCase()}"`)) {
    content = content.replace(location, `${location}${addition}`);
    fs.writeFileSync(filePath, content);
    console.log(`  Added data-testid to ${component}/${file}`);
    return true;
  }
  
  return false;
};

// Function to fix Select component index.ts
const fixSelectIndex = () => {
  const filePath = path.join(COMPONENTS_DIR, 'Select', 'index.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log(`Select index file not found: ${filePath}`);
    return false;
  }
  
  fs.writeFileSync(filePath, selectIndexFix);
  console.log(`  Fixed Select/index.ts to explicitly export SelectProps`);
  return true;
};

// Main function
const fixMigratedComponents = () => {
  console.log('Fixing issues in migrated components...\n');
  
  // Fix component imports
  console.log('Fixing component imports:');
  componentsToFix.forEach(componentData => {
    fixComponentImports(componentData);
  });
  
  // Fix test files
  console.log('\nFixing test files with missing props:');
  testsToFix.forEach(testData => {
    fixTestFiles(testData);
  });
  
  // Add data-testid attributes
  console.log('\nAdding data-testid attributes to components:');
  componentsToAddTestId.forEach(componentData => {
    addTestId(componentData);
  });
  
  // Fix Select index.ts
  console.log('\nFixing Select component index.ts:');
  fixSelectIndex();
  
  console.log('\nAll fixes applied. Please run build and tests to verify.');
};

// Run the script
fixMigratedComponents();
