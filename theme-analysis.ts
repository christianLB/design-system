#!/usr/bin/env tsx

/**
 * Theme Analysis Tool
 * Analyzes component theming support across the design system
 */

import * as fs from 'fs';
import * as path from 'path';
import { promises as fsPromises } from 'fs';

interface ThemeVariable {
  name: string;
  usageCount: number;
  components: string[];
}

interface ComponentAnalysis {
  name: string;
  path: string;
  hasThemeSupport: boolean;
  themeVariables: string[];
  hardcodedColors: string[];
  tailwindClasses: string[];
  customClasses: string[];
  responsive: boolean;
  darkModeSupport: boolean;
  accessibility: {
    hasAriaLabels: boolean;
    hasRoles: boolean;
    keyboardSupport: boolean;
  };
}

interface ThemeAnalysisReport {
  totalComponents: number;
  themedComponents: number;
  themeCoverage: number;
  themes: string[];
  cssVariables: ThemeVariable[];
  componentAnalysis: ComponentAnalysis[];
  issues: {
    hardcodedColors: Array<{component: string; colors: string[]}>;
    missingThemeSupport: string[];
    missingDarkMode: string[];
    accessibilityIssues: Array<{component: string; issues: string[]}>;
  };
  recommendations: string[];
}

class ThemeAnalyzer {
  private report: ThemeAnalysisReport = {
    totalComponents: 0,
    themedComponents: 0,
    themeCoverage: 0,
    themes: ['light', 'dark', 'futuristic', 'cyberpunk', 'alien', 'mirtha'],
    cssVariables: [],
    componentAnalysis: [],
    issues: {
      hardcodedColors: [],
      missingThemeSupport: [],
      missingDarkMode: [],
      accessibilityIssues: []
    },
    recommendations: []
  };

  private cssVariableMap = new Map<string, ThemeVariable>();

  private async findFiles(dir: string, pattern: RegExp, exclude: RegExp[] = []): Promise<string[]> {
    const files: string[] = [];
    
    async function walk(currentDir: string) {
      const entries = await fsPromises.readdir(currentDir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        
        // Skip if matches exclude pattern
        if (exclude.some(ex => ex.test(fullPath))) continue;
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await walk(fullPath);
        } else if (entry.isFile() && pattern.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    
    await walk(dir);
    return files;
  }

  async analyze(): Promise<ThemeAnalysisReport> {
    console.log('🔍 Starting Theme Analysis...\n');

    // Find all component files
    const componentFiles = await this.findFiles(
      'src/components',
      /\.(tsx|jsx)$/,
      [/\.test\./, /\.stories\./, /index\.ts$/]
    );

    this.report.totalComponents = componentFiles.length;
    console.log(`Found ${componentFiles.length} components to analyze\n`);

    // Analyze each component
    for (const file of componentFiles) {
      const analysis = await this.analyzeComponent(file);
      this.report.componentAnalysis.push(analysis);
      
      if (analysis.hasThemeSupport) {
        this.report.themedComponents++;
      } else {
        this.report.issues.missingThemeSupport.push(analysis.name);
      }

      if (analysis.hardcodedColors.length > 0) {
        this.report.issues.hardcodedColors.push({
          component: analysis.name,
          colors: analysis.hardcodedColors
        });
      }

      if (!analysis.darkModeSupport) {
        this.report.issues.missingDarkMode.push(analysis.name);
      }

      const accessibilityIssues = [];
      if (!analysis.accessibility.hasAriaLabels) accessibilityIssues.push('Missing ARIA labels');
      if (!analysis.accessibility.hasRoles) accessibilityIssues.push('Missing ARIA roles');
      if (!analysis.accessibility.keyboardSupport) accessibilityIssues.push('No keyboard support detected');
      
      if (accessibilityIssues.length > 0) {
        this.report.issues.accessibilityIssues.push({
          component: analysis.name,
          issues: accessibilityIssues
        });
      }
    }

    // Calculate theme coverage
    this.report.themeCoverage = Math.round((this.report.themedComponents / this.report.totalComponents) * 100);

    // Convert CSS variable map to array
    this.report.cssVariables = Array.from(this.cssVariableMap.values())
      .sort((a, b) => b.usageCount - a.usageCount);

    // Generate recommendations
    this.generateRecommendations();

    // Analyze theme files
    await this.analyzeThemeFiles();

    return this.report;
  }

  private async analyzeComponent(filePath: string): Promise<ComponentAnalysis> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const componentName = path.basename(filePath, path.extname(filePath));

    // Extract CSS variables
    const cssVarRegex = /var\(--([^)]+)\)/g;
    const cssVariables: string[] = [];
    let match;
    while ((match = cssVarRegex.exec(content)) !== null) {
      const varName = `--${match[1]}`;
      cssVariables.push(varName);
      
      // Update global CSS variable tracking
      if (!this.cssVariableMap.has(varName)) {
        this.cssVariableMap.set(varName, {
          name: varName,
          usageCount: 0,
          components: []
        });
      }
      const varData = this.cssVariableMap.get(varName)!;
      varData.usageCount++;
      if (!varData.components.includes(componentName)) {
        varData.components.push(componentName);
      }
    }

    // Check for hardcoded colors
    const hardcodedColorRegex = /#[0-9A-Fa-f]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)/g;
    const hardcodedColors = Array.from(new Set(content.match(hardcodedColorRegex) || []));

    // Extract Tailwind classes
    const classNameRegex = /className\s*=\s*["{`]([^"}``]+)["}``]/g;
    const tailwindClasses: string[] = [];
    const customClasses: string[] = [];
    
    while ((match = classNameRegex.exec(content)) !== null) {
      const classes = match[1].split(/\s+/);
      classes.forEach(cls => {
        if (cls.match(/^(bg-|text-|border-|shadow-|ring-)/)) {
          tailwindClasses.push(cls);
        } else if (cls && !cls.includes('{')) {
          customClasses.push(cls);
        }
      });
    }

    // Check for responsive design
    const responsive = /sm:|md:|lg:|xl:|2xl:/.test(content);

    // Check for dark mode support
    const darkModeSupport = /dark:|data-theme|useTheme/.test(content);

    // Check accessibility
    const accessibility = {
      hasAriaLabels: /aria-label|aria-labelledby|aria-describedby/.test(content),
      hasRoles: /role=/.test(content),
      keyboardSupport: /onKeyDown|onKeyUp|onKeyPress|tabIndex/.test(content)
    };

    return {
      name: componentName,
      path: filePath,
      hasThemeSupport: cssVariables.length > 0 || tailwindClasses.some(cls => cls.includes('primary') || cls.includes('secondary')),
      themeVariables: cssVariables,
      hardcodedColors,
      tailwindClasses: Array.from(new Set(tailwindClasses)),
      customClasses: Array.from(new Set(customClasses)),
      responsive,
      darkModeSupport,
      accessibility
    };
  }

  private async analyzeThemeFiles(): Promise<void> {
    console.log('\n📚 Analyzing theme files...');

    const themeFiles = await this.findFiles(
      'src/theme',
      /\.(ts|js|css)$/,
      [/\.test\./]
    );

    const themeCoverage: Record<string, Set<string>> = {};

    for (const file of themeFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      const fileName = path.basename(file);
      
      // Extract theme name from filename
      const themeMatch = fileName.match(/theme\.(\w+)\./);
      if (themeMatch) {
        const themeName = themeMatch[1];
        if (!themeCoverage[themeName]) {
          themeCoverage[themeName] = new Set();
        }

        // Find all CSS variables defined in this theme
        const varDefRegex = /--([^:]+):/g;
        let match;
        while ((match = varDefRegex.exec(content)) !== null) {
          themeCoverage[themeName].add(`--${match[1].trim()}`);
        }
      }
    }

    // Check CSS variable consistency across themes
    const allVars = new Set<string>();
    Object.values(themeCoverage).forEach(vars => {
      vars.forEach(v => allVars.add(v));
    });

    const inconsistentVars: string[] = [];
    allVars.forEach(varName => {
      const themesWithVar = Object.entries(themeCoverage)
        .filter(([_, vars]) => vars.has(varName))
        .map(([theme]) => theme);
      
      if (themesWithVar.length !== Object.keys(themeCoverage).length) {
        inconsistentVars.push(`${varName} (only in: ${themesWithVar.join(', ')})`);
      }
    });

    if (inconsistentVars.length > 0) {
      this.report.recommendations.push(
        `⚠️ Inconsistent CSS variables across themes: ${inconsistentVars.join(', ')}`
      );
    }

    console.log(`  Found ${Object.keys(themeCoverage).length} theme definitions`);
    console.log(`  Total unique CSS variables: ${allVars.size}`);
  }

  private generateRecommendations(): void {
    const { issues, themeCoverage, componentAnalysis } = this.report;

    if (themeCoverage < 50) {
      this.report.recommendations.push(
        '🔴 Critical: Less than 50% of components have theme support. Consider a systematic theming implementation.'
      );
    } else if (themeCoverage < 80) {
      this.report.recommendations.push(
        '🟡 Warning: Theme coverage is below 80%. Focus on adding theme support to remaining components.'
      );
    } else {
      this.report.recommendations.push(
        '🟢 Good: Theme coverage is above 80%. Continue maintaining consistency.'
      );
    }

    if (issues.hardcodedColors.length > 5) {
      this.report.recommendations.push(
        `⚠️ ${issues.hardcodedColors.length} components have hardcoded colors. Replace with CSS variables or theme tokens.`
      );
    }

    if (issues.missingDarkMode.length > 0) {
      this.report.recommendations.push(
        `🌙 ${issues.missingDarkMode.length} components lack dark mode support. Add dark: variants or data-theme handling.`
      );
    }

    if (issues.accessibilityIssues.length > 0) {
      this.report.recommendations.push(
        `♿ ${issues.accessibilityIssues.length} components have accessibility issues. Add ARIA labels and keyboard support.`
      );
    }

    // Check for responsive design
    const responsiveComponents = componentAnalysis.filter(c => c.responsive).length;
    const responsivePercentage = Math.round((responsiveComponents / this.report.totalComponents) * 100);
    if (responsivePercentage < 50) {
      this.report.recommendations.push(
        `📱 Only ${responsivePercentage}% of components have responsive design. Add responsive breakpoints.`
      );
    }

    // Check CSS variable usage
    const topVariables = this.report.cssVariables.slice(0, 5);
    if (topVariables.length > 0) {
      this.report.recommendations.push(
        `✨ Most used theme variables: ${topVariables.map(v => v.name).join(', ')}`
      );
    }
  }

  printReport(): void {
    const { 
      totalComponents, 
      themedComponents, 
      themeCoverage,
      themes,
      issues,
      recommendations,
      componentAnalysis
    } = this.report;

    console.log('\n' + '='.repeat(60));
    console.log('                THEME ANALYSIS REPORT');
    console.log('='.repeat(60));

    console.log('\n📊 OVERVIEW');
    console.log('─'.repeat(40));
    console.log(`Total Components: ${totalComponents}`);
    console.log(`Themed Components: ${themedComponents}`);
    console.log(`Theme Coverage: ${themeCoverage}%`);
    console.log(`Available Themes: ${themes.join(', ')}`);

    console.log('\n🎨 THEME SUPPORT BY COMPONENT');
    console.log('─'.repeat(40));
    componentAnalysis
      .sort((a, b) => b.themeVariables.length - a.themeVariables.length)
      .slice(0, 10)
      .forEach(comp => {
        const status = comp.hasThemeSupport ? '✅' : '❌';
        const vars = comp.themeVariables.length;
        const responsive = comp.responsive ? '📱' : '';
        const dark = comp.darkModeSupport ? '🌙' : '';
        console.log(`${status} ${comp.name}: ${vars} variables ${responsive} ${dark}`);
      });

    if (issues.missingThemeSupport.length > 0) {
      console.log('\n❌ COMPONENTS WITHOUT THEME SUPPORT');
      console.log('─'.repeat(40));
      issues.missingThemeSupport.slice(0, 10).forEach(comp => {
        console.log(`  - ${comp}`);
      });
      if (issues.missingThemeSupport.length > 10) {
        console.log(`  ... and ${issues.missingThemeSupport.length - 10} more`);
      }
    }

    if (issues.hardcodedColors.length > 0) {
      console.log('\n⚠️  HARDCODED COLORS');
      console.log('─'.repeat(40));
      issues.hardcodedColors.slice(0, 5).forEach(({ component, colors }) => {
        console.log(`  ${component}: ${colors.slice(0, 3).join(', ')}${colors.length > 3 ? '...' : ''}`);
      });
    }

    console.log('\n💡 RECOMMENDATIONS');
    console.log('─'.repeat(40));
    recommendations.forEach(rec => {
      console.log(`  ${rec}`);
    });

    console.log('\n🔝 TOP CSS VARIABLES');
    console.log('─'.repeat(40));
    this.report.cssVariables.slice(0, 10).forEach(variable => {
      console.log(`  ${variable.name}: ${variable.usageCount} uses in ${variable.components.length} components`);
    });

    // Save detailed report to file
    const reportPath = 'theme-analysis-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
}

// Run the analysis
async function main() {
  const analyzer = new ThemeAnalyzer();
  await analyzer.analyze();
  analyzer.printReport();
}

main().catch(console.error);