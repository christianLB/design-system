#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface DependencyUpdate {
  name: string;
  current: string;
  wanted: string;
  latest: string;
  type: 'dependencies' | 'devDependencies';
  isBreaking: boolean;
}

interface UpdateReport {
  timestamp: Date;
  totalPackages: number;
  outdated: DependencyUpdate[];
  updated: string[];
  failed: string[];
  skipped: string[];
  securityIssues: {
    before: number;
    after: number;
  };
}

const SAFE_UPDATE_PATTERNS = [
  /^@types\//, // TypeScript type definitions
  /eslint/, // ESLint related packages
  /prettier/, // Prettier
  /^@testing-library/, // Testing library
];

const RISKY_PACKAGES = ['react', 'react-dom', 'typescript', 'vite', 'vitest', '@storybook'];

async function updateDependencies(): Promise<void> {
  console.log('📦 Intelligent Dependency Update System\n');
  console.log('📅 Date:', new Date().toLocaleString());
  console.log('📁 Project:', rootDir);
  console.log('═'.repeat(60) + '\n');

  const report: UpdateReport = {
    timestamp: new Date(),
    totalPackages: 0,
    outdated: [],
    updated: [],
    failed: [],
    skipped: [],
    securityIssues: {
      before: 0,
      after: 0,
    },
  };

  // 1. Check current security issues
  console.log('🔒 Checking security vulnerabilities...');
  report.securityIssues.before = await checkSecurityIssues();
  console.log(`   Found ${report.securityIssues.before} security issues\n`);

  // 2. Get outdated packages
  console.log('📋 Analyzing outdated packages...');
  const outdatedPackages = await getOutdatedPackages();
  report.totalPackages = outdatedPackages.length;
  report.outdated = outdatedPackages;

  if (outdatedPackages.length === 0) {
    console.log('   ✅ All packages are up to date!\n');
    return;
  }

  console.log(`   Found ${outdatedPackages.length} outdated packages\n`);

  // 3. Categorize updates
  const { safe, risky, breaking } = categorizeUpdates(outdatedPackages);

  console.log('📊 Update Categories:');
  console.log(`   • Safe updates: ${safe.length}`);
  console.log(`   • Risky updates: ${risky.length}`);
  console.log(`   • Breaking changes: ${breaking.length}\n`);

  // 4. Create backup
  console.log('💾 Creating backup...');
  await createBackup();
  console.log('   ✅ Backup created\n');

  // 5. Update safe packages
  if (safe.length > 0) {
    console.log('✅ Updating safe packages...');
    for (const pkg of safe) {
      const success = await updatePackage(pkg, report);
      if (success) {
        console.log(`   ✓ Updated ${pkg.name} from ${pkg.current} to ${pkg.latest}`);
        report.updated.push(pkg.name);
      } else {
        console.log(`   ✗ Failed to update ${pkg.name}`);
        report.failed.push(pkg.name);
      }
    }
    console.log();
  }

  // 6. Handle risky updates
  if (risky.length > 0) {
    console.log('⚠️  Risky updates (require manual review):');
    for (const pkg of risky) {
      console.log(`   • ${pkg.name}: ${pkg.current} → ${pkg.latest}`);
      report.skipped.push(pkg.name);
    }
    console.log();
  }

  // 7. Handle breaking changes
  if (breaking.length > 0) {
    console.log('🚨 Breaking changes (skipped):');
    for (const pkg of breaking) {
      console.log(`   • ${pkg.name}: ${pkg.current} → ${pkg.latest} (major version change)`);
      report.skipped.push(pkg.name);
    }
    console.log();
  }

  // 8. Run tests
  console.log('🧪 Running tests to verify updates...');
  const testsPass = await runTests();

  if (!testsPass) {
    console.log('   ❌ Tests failed! Rolling back updates...');
    await rollbackUpdates();
    console.log('   ✅ Rolled back to previous state\n');
    return;
  }
  console.log('   ✅ All tests passed!\n');

  // 9. Check security issues again
  console.log('🔒 Re-checking security vulnerabilities...');
  report.securityIssues.after = await checkSecurityIssues();
  console.log(
    `   Security issues: ${report.securityIssues.before} → ${report.securityIssues.after}\n`,
  );

  // 10. Fix security issues if any remain
  if (report.securityIssues.after > 0) {
    console.log('🔧 Attempting to fix security vulnerabilities...');
    try {
      execSync('pnpm audit fix', { stdio: 'inherit' });
      report.securityIssues.after = await checkSecurityIssues();
      console.log(`   ✅ Security issues after fix: ${report.securityIssues.after}\n`);
    } catch (error) {
      console.log('   ⚠️  Some security issues could not be fixed automatically\n');
    }
  }

  // Generate report
  generateUpdateReport(report);
}

async function getOutdatedPackages(): Promise<DependencyUpdate[]> {
  try {
    const output = execSync('pnpm outdated --format json', {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    if (!output.trim()) return [];

    const lines = output.trim().split('\n');
    const packages: DependencyUpdate[] = [];

    for (const line of lines) {
      try {
        const data = JSON.parse(line);

        // pnpm outdated JSON format
        packages.push({
          name: data.packageName,
          current: data.current,
          wanted: data.wanted,
          latest: data.latest,
          type: data.dependencyType as 'dependencies' | 'devDependencies',
          isBreaking: isBreakingChange(data.current, data.latest),
        });
      } catch (parseError) {
        // Skip invalid lines
      }
    }

    return packages;
  } catch (error) {
    // No outdated packages
    return [];
  }
}

function isBreakingChange(current: string, latest: string): boolean {
  const currentMajor = parseInt(current.split('.')[0]);
  const latestMajor = parseInt(latest.split('.')[0]);
  return latestMajor > currentMajor;
}

function categorizeUpdates(packages: DependencyUpdate[]): {
  safe: DependencyUpdate[];
  risky: DependencyUpdate[];
  breaking: DependencyUpdate[];
} {
  const safe: DependencyUpdate[] = [];
  const risky: DependencyUpdate[] = [];
  const breaking: DependencyUpdate[] = [];

  for (const pkg of packages) {
    if (pkg.isBreaking) {
      breaking.push(pkg);
    } else if (RISKY_PACKAGES.some((risky) => pkg.name.includes(risky))) {
      risky.push(pkg);
    } else if (SAFE_UPDATE_PATTERNS.some((pattern) => pattern.test(pkg.name))) {
      safe.push(pkg);
    } else {
      // Default to risky for unknown packages
      risky.push(pkg);
    }
  }

  return { safe, risky, breaking };
}

async function createBackup(): Promise<void> {
  const backupDir = path.join(rootDir, '.dependency-backup');
  await fs.ensureDir(backupDir);

  // Backup package files
  await fs.copy(path.join(rootDir, 'package.json'), path.join(backupDir, 'package.json'));
  await fs.copy(path.join(rootDir, 'pnpm-lock.yaml'), path.join(backupDir, 'pnpm-lock.yaml'));
}

async function rollbackUpdates(): Promise<void> {
  const backupDir = path.join(rootDir, '.dependency-backup');

  // Restore package files
  await fs.copy(path.join(backupDir, 'package.json'), path.join(rootDir, 'package.json'), {
    overwrite: true,
  });
  await fs.copy(path.join(backupDir, 'pnpm-lock.yaml'), path.join(rootDir, 'pnpm-lock.yaml'), {
    overwrite: true,
  });

  // Reinstall dependencies
  execSync('pnpm install', { stdio: 'inherit' });
}

async function updatePackage(pkg: DependencyUpdate, report: UpdateReport): Promise<boolean> {
  try {
    const flag = pkg.type === 'devDependencies' ? '-D' : '';
    execSync(`pnpm add ${flag} ${pkg.name}@${pkg.latest}`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    });
    return true;
  } catch (error) {
    return false;
  }
}

async function runTests(): Promise<boolean> {
  try {
    execSync('pnpm test', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

async function checkSecurityIssues(): Promise<number> {
  try {
    const output = execSync('pnpm audit --json', {
      encoding: 'utf-8',
      stdio: 'pipe',
    });

    const lines = output.trim().split('\n');
    let totalIssues = 0;

    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.type === 'auditSummary') {
          totalIssues = data.data.vulnerabilities.total || 0;
        }
      } catch (parseError) {
        // Skip invalid lines
      }
    }

    return totalIssues;
  } catch (error) {
    return 0;
  }
}

function generateUpdateReport(report: UpdateReport): void {
  console.log('═'.repeat(60));
  console.log('📊 DEPENDENCY UPDATE REPORT');
  console.log('═'.repeat(60) + '\n');

  console.log(`Total packages checked: ${report.totalPackages}`);
  console.log(`Successfully updated: ${report.updated.length}`);
  console.log(`Failed updates: ${report.failed.length}`);
  console.log(`Skipped (manual review needed): ${report.skipped.length}`);
  console.log(`Security issues: ${report.securityIssues.before} → ${report.securityIssues.after}`);

  if (report.updated.length > 0) {
    console.log('\n✅ Updated Packages:');
    report.updated.forEach((pkg) => console.log(`   • ${pkg}`));
  }

  if (report.skipped.length > 0) {
    console.log('\n⚠️  Skipped Packages (require manual review):');
    report.skipped.forEach((pkg) => console.log(`   • ${pkg}`));
  }

  if (report.failed.length > 0) {
    console.log('\n❌ Failed Updates:');
    report.failed.forEach((pkg) => console.log(`   • ${pkg}`));
  }

  // Save report
  const reportPath = path.join(rootDir, 'dependency-update-report.json');
  fs.writeJsonSync(reportPath, report, { spaces: 2 });
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);

  // Cleanup backup if everything went well
  if (report.failed.length === 0) {
    const backupDir = path.join(rootDir, '.dependency-backup');
    fs.removeSync(backupDir);
    console.log('🧹 Cleaned up backup files');
  }

  console.log('\n✨ Dependency update completed at:', new Date().toLocaleTimeString());
  console.log('═'.repeat(60));
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  updateDependencies().catch((error) => {
    console.error('❌ Dependency update failed:', error);
    process.exit(1);
  });
}
