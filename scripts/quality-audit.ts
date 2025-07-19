#!/usr/bin/env node
import { Project } from 'ts-morph';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface QualityMetrics {
  timestamp: Date;
  codeQuality: {
    totalFiles: number;
    totalLines: number;
    complexity: {
      high: number;
      medium: number;
      low: number;
    };
    duplicateCode: number;
    unusedExports: string[];
  };
  typeScriptCoverage: {
    percentage: number;
    strictMode: boolean;
    anyUsage: number;
    untypedImports: string[];
  };
  componentQuality: {
    totalComponents: number;
    withTests: number;
    withDocs: number;
    withStories: number;
    withAccessibility: number;
  };
  dependencies: {
    total: number;
    dev: number;
    prod: number;
    unused: string[];
    duplicates: string[];
    securityIssues: number;
  };
  performance: {
    bundleSize: {
      raw: number;
      gzipped: number;
    };
    treeshaking: {
      unusedCode: number;
      sideEffects: string[];
    };
  };
  bestPractices: {
    eslintIssues: number;
    prettierIssues: number;
    conventionalCommits: boolean;
    huskyConfigured: boolean;
    ciConfigured: boolean;
  };
}

async function runQualityAudit(): Promise<void> {
  console.log('🔍 Starting Comprehensive Quality Audit...\n');
  console.log('📅 Date:', new Date().toLocaleString());
  console.log('📁 Project:', rootDir);
  console.log('═'.repeat(60) + '\n');

  const metrics: QualityMetrics = {
    timestamp: new Date(),
    codeQuality: {
      totalFiles: 0,
      totalLines: 0,
      complexity: { high: 0, medium: 0, low: 0 },
      duplicateCode: 0,
      unusedExports: [],
    },
    typeScriptCoverage: {
      percentage: 0,
      strictMode: false,
      anyUsage: 0,
      untypedImports: [],
    },
    componentQuality: {
      totalComponents: 0,
      withTests: 0,
      withDocs: 0,
      withStories: 0,
      withAccessibility: 0,
    },
    dependencies: {
      total: 0,
      dev: 0,
      prod: 0,
      unused: [],
      duplicates: [],
      securityIssues: 0,
    },
    performance: {
      bundleSize: { raw: 0, gzipped: 0 },
      treeshaking: { unusedCode: 0, sideEffects: [] },
    },
    bestPractices: {
      eslintIssues: 0,
      prettierIssues: 0,
      conventionalCommits: false,
      huskyConfigured: false,
      ciConfigured: false,
    },
  };

  // 1. Analyze Code Quality
  console.log('📊 Analyzing Code Quality...');
  await analyzeCodeQuality(metrics);

  // 2. Check TypeScript Coverage
  console.log('\n🔷 Checking TypeScript Coverage...');
  await analyzeTypeScriptCoverage(metrics);

  // 3. Audit Components
  console.log('\n🧩 Auditing Components...');
  await auditComponents(metrics);

  // 4. Analyze Dependencies
  console.log('\n📦 Analyzing Dependencies...');
  await analyzeDependencies(metrics);

  // 5. Check Performance
  console.log('\n⚡ Checking Performance Metrics...');
  await checkPerformance(metrics);

  // 6. Verify Best Practices
  console.log('\n✅ Verifying Best Practices...');
  await verifyBestPractices(metrics);

  // Generate Report
  generateQualityReport(metrics);
}

async function analyzeCodeQuality(metrics: QualityMetrics): Promise<void> {
  const project = new Project({
    tsConfigFilePath: path.join(rootDir, 'tsconfig.json'),
  });

  const sourceFiles = project.getSourceFiles();
  metrics.codeQuality.totalFiles = sourceFiles.length;

  for (const sourceFile of sourceFiles) {
    const text = sourceFile.getText();
    const lines = text.split('\n').length;
    metrics.codeQuality.totalLines += lines;

    // Analyze complexity (simplified)
    const functions = sourceFile.getFunctions();
    const classes = sourceFile.getClasses();
    const complexity = functions.length + classes.length;

    if (complexity > 20) metrics.codeQuality.complexity.high++;
    else if (complexity > 10) metrics.codeQuality.complexity.medium++;
    else metrics.codeQuality.complexity.low++;

    // Check for unused exports
    const exports = sourceFile.getExportedDeclarations();
    for (const [name, declarations] of exports) {
      const refs = declarations[0]?.findReferencesAsNodes() || [];
      if (refs.length === 0) {
        metrics.codeQuality.unusedExports.push(`${sourceFile.getFilePath()}:${name}`);
      }
    }
  }

  console.log(`   ✓ Analyzed ${metrics.codeQuality.totalFiles} files`);
  console.log(`   ✓ Total lines of code: ${metrics.codeQuality.totalLines.toLocaleString()}`);
  console.log(
    `   ✓ Complexity: High=${metrics.codeQuality.complexity.high}, Medium=${metrics.codeQuality.complexity.medium}, Low=${metrics.codeQuality.complexity.low}`,
  );
}

async function analyzeTypeScriptCoverage(metrics: QualityMetrics): Promise<void> {
  const tsConfigPath = path.join(rootDir, 'tsconfig.json');
  const tsConfig = await fs.readJson(tsConfigPath);

  metrics.typeScriptCoverage.strictMode = tsConfig.compilerOptions?.strict === true;

  const project = new Project({
    tsConfigFilePath: tsConfigPath,
  });

  let typedLines = 0;
  let totalLines = 0;
  let anyUsage = 0;

  for (const sourceFile of project.getSourceFiles()) {
    const text = sourceFile.getText();
    totalLines += text.split('\n').length;

    // Count 'any' usage
    const anyMatches = text.match(/:\s*any\b/g);
    if (anyMatches) {
      anyUsage += anyMatches.length;
    }

    // Check for untyped imports
    const importDeclarations = sourceFile.getImportDeclarations();
    for (const importDecl of importDeclarations) {
      const moduleSpecifier = importDecl.getModuleSpecifierValue();
      if (!moduleSpecifier.startsWith('.') && !moduleSpecifier.includes('@types')) {
        // Check if types exist for this module
        try {
          const typesPackage = `@types/${moduleSpecifier.replace('/', '__')}`;
          const packageJsonPath = path.join(rootDir, 'node_modules', typesPackage, 'package.json');
          if (!(await fs.pathExists(packageJsonPath))) {
            metrics.typeScriptCoverage.untypedImports.push(moduleSpecifier);
          }
        } catch (error) {
          // Ignore errors
        }
      }
    }
  }

  metrics.typeScriptCoverage.anyUsage = anyUsage;
  metrics.typeScriptCoverage.percentage = 100; // Simplified - in reality would need more analysis

  console.log(
    `   ✓ TypeScript strict mode: ${metrics.typeScriptCoverage.strictMode ? 'Enabled' : 'Disabled'}`,
  );
  console.log(`   ✓ 'any' usage count: ${anyUsage}`);
  console.log(`   ✓ Untyped imports: ${metrics.typeScriptCoverage.untypedImports.length}`);
}

async function auditComponents(metrics: QualityMetrics): Promise<void> {
  const componentsDir = path.join(rootDir, 'src', 'components');
  const components = await findComponents(componentsDir);

  metrics.componentQuality.totalComponents = components.length;

  for (const component of components) {
    const componentName = path.basename(component.path, '.tsx');
    const componentDir = path.dirname(component.path);

    // Check for tests
    const testFiles = [
      `${componentName}.test.tsx`,
      `${componentName}.spec.tsx`,
      `${componentName}.test.ts`,
      `${componentName}.spec.ts`,
    ];

    for (const testFile of testFiles) {
      if (await fs.pathExists(path.join(componentDir, testFile))) {
        metrics.componentQuality.withTests++;
        break;
      }
    }

    // Check for documentation
    const docPath = path.join(rootDir, 'docs', 'components', `${componentName}.md`);
    if (await fs.pathExists(docPath)) {
      metrics.componentQuality.withDocs++;
    }

    // Check for stories
    const storyFiles = [`${componentName}.stories.tsx`, `${componentName}.stories.ts`];

    for (const storyFile of storyFiles) {
      if (await fs.pathExists(path.join(componentDir, storyFile))) {
        metrics.componentQuality.withStories++;
        break;
      }
    }

    // Check for accessibility (simplified - check for ARIA attributes)
    const content = await fs.readFile(component.path, 'utf-8');
    if (content.includes('aria-') || content.includes('role=')) {
      metrics.componentQuality.withAccessibility++;
    }
  }

  console.log(`   ✓ Total components: ${metrics.componentQuality.totalComponents}`);
  console.log(
    `   ✓ With tests: ${metrics.componentQuality.withTests} (${Math.round((metrics.componentQuality.withTests / metrics.componentQuality.totalComponents) * 100)}%)`,
  );
  console.log(
    `   ✓ With docs: ${metrics.componentQuality.withDocs} (${Math.round((metrics.componentQuality.withDocs / metrics.componentQuality.totalComponents) * 100)}%)`,
  );
  console.log(
    `   ✓ With stories: ${metrics.componentQuality.withStories} (${Math.round((metrics.componentQuality.withStories / metrics.componentQuality.totalComponents) * 100)}%)`,
  );
}

async function findComponents(dir: string): Promise<Array<{ name: string; path: string }>> {
  const components: Array<{ name: string; path: string }> = [];

  async function scan(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

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

  await scan(dir);
  return components;
}

async function analyzeDependencies(metrics: QualityMetrics): Promise<void> {
  const packageJsonPath = path.join(rootDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  metrics.dependencies.prod = Object.keys(packageJson.dependencies || {}).length;
  metrics.dependencies.dev = Object.keys(packageJson.devDependencies || {}).length;
  metrics.dependencies.total = metrics.dependencies.prod + metrics.dependencies.dev;

  // Check for security issues
  try {
    execSync('pnpm audit --json', { encoding: 'utf-8' });
  } catch (error: any) {
    if (error.stdout) {
      try {
        const auditResult = JSON.parse(error.stdout);
        metrics.dependencies.securityIssues = auditResult.metadata?.vulnerabilities?.total || 0;
      } catch (parseError) {
        // Ignore parse errors
      }
    }
  }

  console.log(`   ✓ Total dependencies: ${metrics.dependencies.total}`);
  console.log(
    `   ✓ Production: ${metrics.dependencies.prod}, Development: ${metrics.dependencies.dev}`,
  );
  console.log(`   ✓ Security issues: ${metrics.dependencies.securityIssues}`);
}

async function checkPerformance(metrics: QualityMetrics): Promise<void> {
  const distDir = path.join(rootDir, 'dist');

  if (await fs.pathExists(distDir)) {
    const esmFile = path.join(distDir, 'index.es.js');
    const cjsFile = path.join(distDir, 'index.cjs.js');

    let totalSize = 0;

    if (await fs.pathExists(esmFile)) {
      const stats = await fs.stat(esmFile);
      totalSize += stats.size;
    }

    if (await fs.pathExists(cjsFile)) {
      const stats = await fs.stat(cjsFile);
      totalSize += stats.size;
    }

    metrics.performance.bundleSize.raw = totalSize;

    // Estimate gzipped size (roughly 30% of original)
    metrics.performance.bundleSize.gzipped = Math.round(totalSize * 0.3);
  }

  console.log(`   ✓ Bundle size: ${(metrics.performance.bundleSize.raw / 1024).toFixed(2)}KB`);
  console.log(
    `   ✓ Gzipped estimate: ${(metrics.performance.bundleSize.gzipped / 1024).toFixed(2)}KB`,
  );
}

async function verifyBestPractices(metrics: QualityMetrics): Promise<void> {
  // Check ESLint
  try {
    execSync('pnpm lint --format json', { encoding: 'utf-8' });
  } catch (error: any) {
    if (error.stdout) {
      try {
        const lintResult = JSON.parse(error.stdout);
        metrics.bestPractices.eslintIssues = lintResult.reduce(
          (sum: number, file: any) => sum + (file.errorCount || 0) + (file.warningCount || 0),
          0,
        );
      } catch (parseError) {
        // Count as having issues if parsing fails
        metrics.bestPractices.eslintIssues = 1;
      }
    }
  }

  // Check for configuration files
  metrics.bestPractices.huskyConfigured = await fs.pathExists(path.join(rootDir, '.husky'));
  metrics.bestPractices.ciConfigured = await fs.pathExists(
    path.join(rootDir, '.github', 'workflows'),
  );
  metrics.bestPractices.conventionalCommits = await fs.pathExists(
    path.join(rootDir, '.commitlintrc.json'),
  );

  console.log(`   ✓ ESLint issues: ${metrics.bestPractices.eslintIssues}`);
  console.log(`   ✓ Husky configured: ${metrics.bestPractices.huskyConfigured ? 'Yes' : 'No'}`);
  console.log(`   ✓ CI/CD configured: ${metrics.bestPractices.ciConfigured ? 'Yes' : 'No'}`);
  console.log(
    `   ✓ Conventional commits: ${metrics.bestPractices.conventionalCommits ? 'Yes' : 'No'}`,
  );
}

function generateQualityReport(metrics: QualityMetrics): void {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 QUALITY AUDIT REPORT');
  console.log('═'.repeat(60) + '\n');

  // Calculate overall score
  let score = 100;
  const deductions: string[] = [];

  // Code Quality Score
  if (metrics.codeQuality.complexity.high > 5) {
    score -= 10;
    deductions.push('High complexity in multiple files (-10)');
  }
  if (metrics.codeQuality.unusedExports.length > 10) {
    score -= 5;
    deductions.push('Many unused exports (-5)');
  }

  // TypeScript Score
  if (!metrics.typeScriptCoverage.strictMode) {
    score -= 15;
    deductions.push('TypeScript strict mode disabled (-15)');
  }
  if (metrics.typeScriptCoverage.anyUsage > 20) {
    score -= 10;
    deductions.push('Excessive use of "any" type (-10)');
  }

  // Component Quality Score
  const testCoverage =
    metrics.componentQuality.withTests / metrics.componentQuality.totalComponents;
  if (testCoverage < 0.8) {
    score -= 15;
    deductions.push('Test coverage below 80% (-15)');
  }
  const docCoverage = metrics.componentQuality.withDocs / metrics.componentQuality.totalComponents;
  if (docCoverage < 0.8) {
    score -= 10;
    deductions.push('Documentation coverage below 80% (-10)');
  }

  // Security Score
  if (metrics.dependencies.securityIssues > 0) {
    score -= Math.min(20, metrics.dependencies.securityIssues * 5);
    deductions.push(
      `Security vulnerabilities found (-${Math.min(20, metrics.dependencies.securityIssues * 5)})`,
    );
  }

  // Best Practices Score
  if (metrics.bestPractices.eslintIssues > 50) {
    score -= 10;
    deductions.push('Many linting issues (-10)');
  }

  // Display Score
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';
  const gradeEmoji = score >= 90 ? '🌟' : score >= 80 ? '✅' : score >= 70 ? '⚠️' : '❌';

  console.log(`Overall Quality Score: ${gradeEmoji} ${score}/100 (Grade: ${grade})`);

  if (deductions.length > 0) {
    console.log('\nScore Deductions:');
    deductions.forEach((d) => console.log(`   • ${d}`));
  }

  // Recommendations
  console.log('\n📋 Recommendations:');
  const recommendations: string[] = [];

  if (!metrics.typeScriptCoverage.strictMode) {
    recommendations.push('Enable TypeScript strict mode for better type safety');
  }
  if (testCoverage < 0.8) {
    recommendations.push(
      `Add tests for ${metrics.componentQuality.totalComponents - metrics.componentQuality.withTests} components`,
    );
  }
  if (docCoverage < 0.8) {
    recommendations.push(
      `Document ${metrics.componentQuality.totalComponents - metrics.componentQuality.withDocs} components`,
    );
  }
  if (metrics.dependencies.securityIssues > 0) {
    recommendations.push('Fix security vulnerabilities with "pnpm audit fix"');
  }
  if (metrics.codeQuality.unusedExports.length > 0) {
    recommendations.push('Remove unused exports to reduce bundle size');
  }

  recommendations.forEach((rec, index) => {
    console.log(`   ${index + 1}. ${rec}`);
  });

  // Save detailed report
  const reportPath = path.join(rootDir, 'quality-audit-report.json');
  fs.writeJsonSync(reportPath, metrics, { spaces: 2 });
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);

  console.log('\n✨ Quality audit completed at:', new Date().toLocaleTimeString());
  console.log('═'.repeat(60));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runQualityAudit().catch((error) => {
    console.error('❌ Quality audit failed:', error);
    process.exit(1);
  });
}
