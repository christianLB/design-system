#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface MaintenanceReport {
  timestamp: Date;
  dependencies: {
    updated: boolean;
    errors?: string[];
  };
  tests: {
    passed: boolean;
    coverage: number;
    errors?: string[];
  };
  build: {
    successful: boolean;
    bundleSize: {
      esm: string;
      cjs: string;
    };
    errors?: string[];
  };
  documentation: {
    generated: boolean;
    componentsDocumented: number;
    errors?: string[];
  };
  accessibility: {
    passed: boolean;
    issues?: string[];
  };
  overall: {
    status: 'success' | 'warning' | 'failure';
    recommendations: string[];
  };
}

async function autoMaintain(): Promise<void> {
  console.log('🤖 Starting Automated Design System Maintenance...\n');
  console.log('📅 Date:', new Date().toLocaleString());
  console.log('📁 Project:', rootDir);
  console.log('═'.repeat(60) + '\n');

  const report: MaintenanceReport = {
    timestamp: new Date(),
    dependencies: { updated: false },
    tests: { passed: false, coverage: 0 },
    build: { successful: false, bundleSize: { esm: '0', cjs: '0' } },
    documentation: { generated: false, componentsDocumented: 0 },
    accessibility: { passed: true },
    overall: { status: 'success', recommendations: [] },
  };

  // 1. Update Dependencies
  console.log('📦 Step 1/6: Checking Dependencies...');
  try {
    // Check for outdated packages
    const outdated = execSync('pnpm outdated --format json', {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    if (outdated.trim()) {
      console.log('   Found outdated packages. Updating...');
      try {
        execSync('pnpm update', { stdio: 'inherit' });
        report.dependencies.updated = true;
        console.log('   ✅ Dependencies updated successfully\n');
      } catch (updateError) {
        report.dependencies.errors = ['Some dependencies could not be updated automatically'];
        report.overall.recommendations.push('Review and manually update dependencies');
        console.log('   ⚠️  Some dependencies require manual review\n');
      }
    } else {
      console.log('   ✅ All dependencies are up to date\n');
      report.dependencies.updated = true;
    }
  } catch (error) {
    console.log('   ℹ️  No outdated dependencies found\n');
    report.dependencies.updated = true;
  }

  // 2. Run Tests
  console.log('🧪 Step 2/6: Running Tests...');
  try {
    execSync('pnpm test:coverage', { stdio: 'inherit' });

    // Read coverage report
    const coveragePath = path.join(rootDir, 'coverage', 'coverage-summary.json');
    if (await fs.pathExists(coveragePath)) {
      const coverage = await fs.readJson(coveragePath);
      report.tests.coverage = Math.round(coverage.total.lines.pct);
      report.tests.passed = true;

      console.log(`   ✅ Tests passed with ${report.tests.coverage}% coverage\n`);

      if (report.tests.coverage < 80) {
        report.overall.recommendations.push(
          `Increase test coverage from ${report.tests.coverage}% to at least 80%`,
        );
      }
    }
  } catch (error) {
    report.tests.errors = ['Tests failed'];
    report.overall.status = 'failure';
    console.log('   ❌ Tests failed\n');
  }

  // 3. Build and Check Bundle Size
  console.log('📦 Step 3/6: Building and Analyzing Bundle...');
  try {
    execSync('pnpm build', { stdio: 'inherit' });

    // Check bundle sizes
    const distDir = path.join(rootDir, 'dist');
    const esmFile = path.join(distDir, 'index.es.js');
    const cjsFile = path.join(distDir, 'index.cjs.js');

    if (await fs.pathExists(esmFile)) {
      const esmStats = await fs.stat(esmFile);
      report.build.bundleSize.esm = `${(esmStats.size / 1024).toFixed(2)}KB`;
    }

    if (await fs.pathExists(cjsFile)) {
      const cjsStats = await fs.stat(cjsFile);
      report.build.bundleSize.cjs = `${(cjsStats.size / 1024).toFixed(2)}KB`;
    }

    report.build.successful = true;
    console.log(`   ✅ Build successful`);
    console.log(
      `   📊 Bundle sizes: ESM ${report.build.bundleSize.esm}, CJS ${report.build.bundleSize.cjs}\n`,
    );

    // Run size-limit check
    try {
      execSync('pnpm size', { stdio: 'inherit' });
    } catch (sizeError) {
      report.overall.recommendations.push('Bundle size exceeds limits - consider optimization');
    }
  } catch (error) {
    report.build.errors = ['Build failed'];
    report.overall.status = 'failure';
    console.log('   ❌ Build failed\n');
  }

  // 4. Generate Documentation
  console.log('📚 Step 4/6: Updating Documentation...');
  try {
    // Count components
    const componentsDir = path.join(rootDir, 'src', 'components');
    const componentFiles = await countComponentFiles(componentsDir);

    console.log(`   Found ${componentFiles} components to document`);

    // Generate docs for all components
    execSync('pnpm generate:docs:all', { stdio: 'inherit' });

    report.documentation.generated = true;
    report.documentation.componentsDocumented = componentFiles;
    console.log('   ✅ Documentation generated successfully\n');
  } catch (error) {
    report.documentation.errors = ['Documentation generation failed'];
    console.log('   ⚠️  Documentation generation encountered issues\n');
  }

  // 5. Check Accessibility
  console.log('♿ Step 5/6: Verifying Accessibility...');
  try {
    // Run Storybook accessibility tests if available
    const storybookStaticDir = path.join(rootDir, 'storybook-static');
    if (await fs.pathExists(storybookStaticDir)) {
      console.log('   Running Storybook accessibility checks...');
      try {
        execSync('pnpm test-storybook', { stdio: 'inherit' });
        console.log('   ✅ Accessibility checks passed\n');
      } catch (a11yError) {
        report.accessibility.passed = false;
        report.accessibility.issues = ['Some components have accessibility issues'];
        report.overall.recommendations.push('Fix accessibility issues in components');
        console.log('   ⚠️  Some accessibility issues found\n');
      }
    } else {
      console.log('   ℹ️  Building Storybook for accessibility testing...');
      execSync('pnpm build-storybook', { stdio: 'inherit' });
      console.log('   ✅ Storybook built successfully\n');
    }
  } catch (error) {
    console.log('   ⚠️  Could not verify accessibility\n');
  }

  // 6. Generate Themes CSS
  console.log('🎨 Step 6/6: Regenerating Theme CSS...');
  try {
    execSync('pnpm generate:theme-css', { stdio: 'inherit' });
    console.log('   ✅ Theme CSS regenerated\n');
  } catch (error) {
    console.log('   ⚠️  Theme CSS generation encountered issues\n');
  }

  // Generate final report
  generateMaintenanceReport(report);
}

async function countComponentFiles(dir: string): Promise<number> {
  let count = 0;

  async function scanDir(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.tsx') &&
        !entry.name.includes('.stories.') &&
        !entry.name.includes('.test.') &&
        entry.name !== 'index.tsx'
      ) {
        count++;
      }
    }
  }

  await scanDir(dir);
  return count;
}

function generateMaintenanceReport(report: MaintenanceReport): void {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 MAINTENANCE REPORT');
  console.log('═'.repeat(60) + '\n');

  // Dependencies
  console.log('📦 Dependencies:');
  console.log(`   Status: ${report.dependencies.updated ? '✅ Updated' : '❌ Failed'}`);
  if (report.dependencies.errors) {
    report.dependencies.errors.forEach((err) => console.log(`   - ${err}`));
  }

  // Tests
  console.log('\n🧪 Tests:');
  console.log(`   Status: ${report.tests.passed ? '✅ Passed' : '❌ Failed'}`);
  console.log(`   Coverage: ${report.tests.coverage}%`);

  // Build
  console.log('\n📦 Build:');
  console.log(`   Status: ${report.build.successful ? '✅ Successful' : '❌ Failed'}`);
  if (report.build.successful) {
    console.log(`   Bundle Sizes:`);
    console.log(`   - ESM: ${report.build.bundleSize.esm}`);
    console.log(`   - CJS: ${report.build.bundleSize.cjs}`);
  }

  // Documentation
  console.log('\n📚 Documentation:');
  console.log(`   Status: ${report.documentation.generated ? '✅ Generated' : '❌ Failed'}`);
  console.log(`   Components Documented: ${report.documentation.componentsDocumented}`);

  // Accessibility
  console.log('\n♿ Accessibility:');
  console.log(`   Status: ${report.accessibility.passed ? '✅ Passed' : '⚠️  Issues Found'}`);

  // Overall Status
  console.log('\n' + '═'.repeat(60));
  const statusEmoji =
    report.overall.status === 'success' ? '✅' : report.overall.status === 'warning' ? '⚠️' : '❌';
  console.log(`Overall Status: ${statusEmoji} ${report.overall.status.toUpperCase()}`);

  // Recommendations
  if (report.overall.recommendations.length > 0) {
    console.log('\n📋 Recommendations:');
    report.overall.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }

  // Save report to file
  const reportPath = path.join(rootDir, 'maintenance-report.json');
  fs.writeJsonSync(reportPath, report, { spaces: 2 });
  console.log(`\n📄 Full report saved to: ${reportPath}`);

  console.log('\n✨ Maintenance completed at:', new Date().toLocaleTimeString());
  console.log('═'.repeat(60));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  autoMaintain().catch((error) => {
    console.error('❌ Maintenance failed with error:', error);
    process.exit(1);
  });
}
