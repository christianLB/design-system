#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { Project } from 'ts-morph';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface AccessibilityReport {
  timestamp: Date;
  components: ComponentAccessibility[];
  summary: {
    totalComponents: number;
    compliant: number;
    warnings: number;
    errors: number;
    coverage: number;
  };
  commonIssues: IssueCategory[];
  recommendations: string[];
}

interface ComponentAccessibility {
  name: string;
  path: string;
  status: 'pass' | 'warning' | 'fail';
  issues: AccessibilityIssue[];
  features: string[];
  score: number;
}

interface AccessibilityIssue {
  type: 'error' | 'warning';
  rule: string;
  message: string;
  line?: number;
  suggestion?: string;
}

interface IssueCategory {
  category: string;
  count: number;
  components: string[];
}

const A11Y_RULES = {
  // ARIA rules
  ARIA_LABEL: /aria-label/,
  ARIA_LABELLEDBY: /aria-labelledby/,
  ARIA_DESCRIBEDBY: /aria-describedby/,
  ARIA_ROLE: /role=/,
  ARIA_HIDDEN: /aria-hidden/,
  ARIA_LIVE: /aria-live/,
  ARIA_EXPANDED: /aria-expanded/,
  ARIA_SELECTED: /aria-selected/,
  ARIA_CHECKED: /aria-checked/,
  ARIA_DISABLED: /aria-disabled/,

  // Semantic HTML
  BUTTON_TYPE: /<button[^>]*type=/,
  ALT_TEXT: /<img[^>]*alt=/,
  LABEL_FOR: /<label[^>]*for=/,

  // Keyboard navigation
  TAB_INDEX: /tabIndex/,
  ON_KEY_DOWN: /onKeyDown/,
  ON_KEY_UP: /onKeyUp/,
  ON_KEY_PRESS: /onKeyPress/,

  // Focus management
  FOCUS_VISIBLE: /focus-visible|:focus-visible/,
  FOCUS_TRAP: /FocusTrap|useFocusTrap/,

  // Color contrast (needs manual check)
  COLOR_CONTRAST: /color:|background-color:|bg-/,
};

async function checkAccessibility(): Promise<void> {
  console.log('♿ Accessibility Compliance Checker\n');
  console.log('📅 Date:', new Date().toLocaleString());
  console.log('📁 Project:', rootDir);
  console.log('═'.repeat(60) + '\n');

  const report: AccessibilityReport = {
    timestamp: new Date(),
    components: [],
    summary: {
      totalComponents: 0,
      compliant: 0,
      warnings: 0,
      errors: 0,
      coverage: 0,
    },
    commonIssues: [],
    recommendations: [],
  };

  // 1. Find all components
  console.log('🔍 Finding components...');
  const components = await findComponents();
  report.summary.totalComponents = components.length;
  console.log(`   Found ${components.length} components\n`);

  // 2. Check each component
  console.log('♿ Checking accessibility...');
  for (const component of components) {
    const result = await checkComponent(component);
    report.components.push(result);

    // Update summary
    if (result.status === 'pass') report.summary.compliant++;
    else if (result.status === 'warning') report.summary.warnings++;
    else report.summary.errors++;

    // Show progress
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`   ${icon} ${component.name}`);
  }

  // 3. Build Storybook for automated tests
  console.log('\n🔨 Building Storybook for automated testing...');
  try {
    const storybookExists = await fs.pathExists(path.join(rootDir, 'storybook-static'));
    if (!storybookExists) {
      execSync('pnpm build-storybook', { stdio: 'inherit' });
    }
    console.log('   ✅ Storybook ready\n');
  } catch (error) {
    console.log('   ⚠️  Could not build Storybook for automated testing\n');
  }

  // 4. Run Storybook accessibility tests
  console.log('🧪 Running automated accessibility tests...');
  try {
    execSync('pnpm test-storybook', { stdio: 'pipe' });
    console.log('   ✅ Automated tests passed\n');
  } catch (error) {
    console.log('   ⚠️  Some automated tests failed\n');
  }

  // 5. Calculate coverage
  report.summary.coverage = Math.round(
    (report.summary.compliant / report.summary.totalComponents) * 100,
  );

  // 6. Analyze common issues
  analyzeCommonIssues(report);

  // 7. Generate recommendations
  generateAccessibilityRecommendations(report);

  // 8. Display report
  displayAccessibilityReport(report);

  // 9. Save detailed report
  const reportPath = path.join(rootDir, 'accessibility-report.json');
  await fs.writeJson(reportPath, report, { spaces: 2 });
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

async function findComponents(): Promise<Array<{ name: string; path: string }>> {
  const componentsDir = path.join(rootDir, 'src', 'components');
  const components: Array<{ name: string; path: string }> = [];

  async function scan(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await scan(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.tsx') &&
        !entry.name.includes('.stories.') &&
        !entry.name.includes('.test.') &&
        entry.name !== 'index.tsx'
      ) {
        components.push({
          name: path.basename(entry.name, '.tsx'),
          path: fullPath,
        });
      }
    }
  }

  await scan(componentsDir);
  return components;
}

async function checkComponent(component: {
  name: string;
  path: string;
}): Promise<ComponentAccessibility> {
  const content = await fs.readFile(component.path, 'utf-8');
  const lines = content.split('\n');

  const result: ComponentAccessibility = {
    name: component.name,
    path: component.path,
    status: 'pass',
    issues: [],
    features: [],
    score: 100,
  };

  // Check for accessibility features
  const features = checkAccessibilityFeatures(content);
  result.features = features;

  // Check for common issues
  const issues = await detectAccessibilityIssues(content, lines);
  result.issues = issues;

  // Calculate score
  result.score = calculateAccessibilityScore(features, issues);

  // Determine status
  const errorCount = issues.filter((i) => i.type === 'error').length;
  const warningCount = issues.filter((i) => i.type === 'warning').length;

  if (errorCount > 0) {
    result.status = 'fail';
  } else if (warningCount > 0) {
    result.status = 'warning';
  } else {
    result.status = 'pass';
  }

  return result;
}

function checkAccessibilityFeatures(content: string): string[] {
  const features: string[] = [];

  // ARIA support
  if (A11Y_RULES.ARIA_LABEL.test(content)) features.push('ARIA labels');
  if (A11Y_RULES.ARIA_ROLE.test(content)) features.push('ARIA roles');
  if (A11Y_RULES.ARIA_LIVE.test(content)) features.push('Live regions');
  if (A11Y_RULES.ARIA_EXPANDED.test(content)) features.push('Expandable state');

  // Keyboard support
  if (A11Y_RULES.ON_KEY_DOWN.test(content)) features.push('Keyboard navigation');
  if (A11Y_RULES.TAB_INDEX.test(content)) features.push('Tab order management');
  if (A11Y_RULES.FOCUS_TRAP.test(content)) features.push('Focus trap');

  // Semantic HTML
  if (/<button/.test(content)) features.push('Semantic buttons');
  if (/<nav/.test(content)) features.push('Semantic navigation');
  if (/<main/.test(content)) features.push('Semantic landmarks');
  if (/<label/.test(content)) features.push('Form labels');

  // Focus indicators
  if (A11Y_RULES.FOCUS_VISIBLE.test(content)) features.push('Focus indicators');

  return features;
}

async function detectAccessibilityIssues(
  content: string,
  lines: string[],
): Promise<AccessibilityIssue[]> {
  const issues: AccessibilityIssue[] = [];

  // Check for interactive elements without keyboard support
  if (content.includes('onClick') && !content.includes('onKey')) {
    issues.push({
      type: 'warning',
      rule: 'keyboard-support',
      message: 'Interactive element may lack keyboard support',
      suggestion: 'Add onKeyDown or onKeyPress handlers for keyboard users',
    });
  }

  // Check for images without alt text
  const imgMatches = content.match(/<img[^>]*>/g) || [];
  for (const img of imgMatches) {
    if (!img.includes('alt=')) {
      const lineNum = findLineNumber(lines, img);
      issues.push({
        type: 'error',
        rule: 'img-alt',
        message: 'Image missing alt attribute',
        line: lineNum,
        suggestion: 'Add descriptive alt text or alt="" for decorative images',
      });
    }
  }

  // Check for form inputs without labels
  const inputMatches = content.match(/<input[^>]*>/g) || [];
  for (const input of inputMatches) {
    if (!content.includes(`for=`) && !input.includes('aria-label')) {
      issues.push({
        type: 'error',
        rule: 'input-label',
        message: 'Form input may lack accessible label',
        suggestion: 'Add a <label> element or aria-label attribute',
      });
    }
  }

  // Check for buttons without accessible text
  if (content.includes('<button>') && content.includes('</button>')) {
    const buttonPattern = /<button[^>]*>[\s]*<\/button>/g;
    if (buttonPattern.test(content)) {
      issues.push({
        type: 'error',
        rule: 'button-text',
        message: 'Button lacks accessible text content',
        suggestion: 'Add text content or aria-label to buttons',
      });
    }
  }

  // Check for color contrast issues (simplified check)
  if (content.includes('text-gray-400') || content.includes('text-gray-300')) {
    issues.push({
      type: 'warning',
      rule: 'color-contrast',
      message: 'Light gray text may have insufficient contrast',
      suggestion: 'Verify color contrast meets WCAG AA standards (4.5:1)',
    });
  }

  // Check for missing focus indicators
  if (content.includes('focus:outline-none') && !content.includes('focus:ring')) {
    issues.push({
      type: 'error',
      rule: 'focus-visible',
      message: 'Focus indicators removed without replacement',
      suggestion: 'Provide visible focus indicators using focus:ring or custom styles',
    });
  }

  return issues;
}

function findLineNumber(lines: string[], searchText: string): number {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchText)) {
      return i + 1;
    }
  }
  return 0;
}

function calculateAccessibilityScore(features: string[], issues: AccessibilityIssue[]): number {
  let score = 100;

  // Deduct points for issues
  for (const issue of issues) {
    if (issue.type === 'error') {
      score -= 10;
    } else if (issue.type === 'warning') {
      score -= 5;
    }
  }

  // Bonus points for good features
  if (features.includes('ARIA labels')) score += 2;
  if (features.includes('Keyboard navigation')) score += 3;
  if (features.includes('Focus indicators')) score += 2;
  if (features.includes('Semantic HTML')) score += 2;

  return Math.max(0, Math.min(100, score));
}

function analyzeCommonIssues(report: AccessibilityReport): void {
  const issueMap = new Map<string, IssueCategory>();

  for (const component of report.components) {
    for (const issue of component.issues) {
      const key = issue.rule;

      if (!issueMap.has(key)) {
        issueMap.set(key, {
          category: issue.rule,
          count: 0,
          components: [],
        });
      }

      const category = issueMap.get(key)!;
      category.count++;
      if (!category.components.includes(component.name)) {
        category.components.push(component.name);
      }
    }
  }

  report.commonIssues = Array.from(issueMap.values()).sort((a, b) => b.count - a.count);
}

function generateAccessibilityRecommendations(report: AccessibilityReport): void {
  const { summary, commonIssues, components } = report;

  // Coverage recommendations
  if (summary.coverage < 80) {
    report.recommendations.push(
      `Improve accessibility coverage from ${summary.coverage}% to at least 80%`,
    );
  }

  // Common issue recommendations
  for (const issue of commonIssues) {
    if (issue.count > 3) {
      report.recommendations.push(
        `Fix "${issue.category}" issues in ${issue.count} components: ${issue.components.slice(0, 3).join(', ')}${issue.components.length > 3 ? '...' : ''}`,
      );
    }
  }

  // Missing features recommendations
  const componentsWithoutKeyboard = components.filter(
    (c) =>
      !c.features.includes('Keyboard navigation') &&
      c.issues.some((i) => i.rule === 'keyboard-support'),
  );
  if (componentsWithoutKeyboard.length > 0) {
    report.recommendations.push('Add keyboard support to interactive components');
  }

  // Focus management
  const componentsWithoutFocus = components.filter((c) => !c.features.includes('Focus indicators'));
  if (componentsWithoutFocus.length > 3) {
    report.recommendations.push('Ensure all interactive elements have visible focus indicators');
  }

  // Testing recommendations
  report.recommendations.push(
    'Run automated accessibility tests in CI/CD pipeline',
    'Perform manual testing with screen readers (NVDA, JAWS, VoiceOver)',
    'Test keyboard navigation flow through all components',
  );
}

function displayAccessibilityReport(report: AccessibilityReport): void {
  console.log('\n' + '═'.repeat(60));
  console.log('♿ ACCESSIBILITY REPORT');
  console.log('═'.repeat(60) + '\n');

  // Summary
  const { summary } = report;
  console.log('📊 Summary:');
  console.log(`   Total Components: ${summary.totalComponents}`);
  console.log(
    `   ✅ Compliant: ${summary.compliant} (${Math.round((summary.compliant / summary.totalComponents) * 100)}%)`,
  );
  console.log(
    `   ⚠️  Warnings: ${summary.warnings} (${Math.round((summary.warnings / summary.totalComponents) * 100)}%)`,
  );
  console.log(
    `   ❌ Errors: ${summary.errors} (${Math.round((summary.errors / summary.totalComponents) * 100)}%)`,
  );
  console.log(`   📈 Coverage Score: ${summary.coverage}%`);

  // Grade
  const grade =
    summary.coverage >= 90
      ? 'A'
      : summary.coverage >= 80
        ? 'B'
        : summary.coverage >= 70
          ? 'C'
          : summary.coverage >= 60
            ? 'D'
            : 'F';
  console.log(`   🎯 Grade: ${grade}`);

  // Common Issues
  if (report.commonIssues.length > 0) {
    console.log('\n\n🔍 Most Common Issues:');
    report.commonIssues.slice(0, 5).forEach((issue) => {
      console.log(
        `   • ${issue.category}: ${issue.count} occurrences in ${issue.components.length} components`,
      );
    });
  }

  // Best Performers
  const topComponents = report.components
    .filter((c) => c.status === 'pass' && c.score >= 90)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (topComponents.length > 0) {
    console.log('\n\n🌟 Top Accessible Components:');
    topComponents.forEach((comp) => {
      console.log(`   • ${comp.name} (Score: ${comp.score}, Features: ${comp.features.length})`);
    });
  }

  // Components Needing Attention
  const needsAttention = report.components.filter((c) => c.status === 'fail').slice(0, 5);

  if (needsAttention.length > 0) {
    console.log('\n\n⚠️  Components Needing Attention:');
    needsAttention.forEach((comp) => {
      console.log(
        `   • ${comp.name}: ${comp.issues.filter((i) => i.type === 'error').length} errors, ${comp.issues.filter((i) => i.type === 'warning').length} warnings`,
      );
    });
  }

  // Recommendations
  if (report.recommendations.length > 0) {
    console.log('\n\n💡 Recommendations:');
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }

  console.log('\n✨ Accessibility check completed at:', new Date().toLocaleTimeString());
  console.log('═'.repeat(60));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAccessibility().catch((error) => {
    console.error('❌ Accessibility check failed:', error);
    process.exit(1);
  });
}
