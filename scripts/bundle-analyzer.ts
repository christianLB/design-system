#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { gzipSync } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

interface BundleAnalysis {
  timestamp: Date;
  bundles: {
    esm: BundleInfo;
    cjs: BundleInfo;
    css: BundleInfo;
  };
  dependencies: DependencyAnalysis[];
  treeshaking: {
    unusedExports: string[];
    sideEffects: string[];
  };
  recommendations: string[];
}

interface BundleInfo {
  exists: boolean;
  size: number;
  gzipSize: number;
  brotliSize?: number;
  modules?: ModuleInfo[];
}

interface ModuleInfo {
  name: string;
  size: number;
  percentage: number;
}

interface DependencyAnalysis {
  name: string;
  size: number;
  gzipSize: number;
  usage: 'heavy' | 'moderate' | 'light';
}

async function analyzeBundles(): Promise<void> {
  console.log('📊 Bundle Size Analyzer\n');
  console.log('📅 Date:', new Date().toLocaleString());
  console.log('📁 Project:', rootDir);
  console.log('═'.repeat(60) + '\n');

  // Build the project first
  console.log('🔨 Building project...');
  try {
    execSync('pnpm build', { stdio: 'inherit' });
    console.log('   ✅ Build completed\n');
  } catch (error) {
    console.error('   ❌ Build failed. Please fix build errors first.\n');
    process.exit(1);
  }

  const analysis: BundleAnalysis = {
    timestamp: new Date(),
    bundles: {
      esm: await analyzeBundle('dist/index.es.js'),
      cjs: await analyzeBundle('dist/index.cjs.js'),
      css: await analyzeBundle('dist/design-system.css'),
    },
    dependencies: [],
    treeshaking: {
      unusedExports: [],
      sideEffects: [],
    },
    recommendations: [],
  };

  // Analyze dependencies impact
  console.log('📦 Analyzing dependencies...');
  analysis.dependencies = await analyzeDependencies();

  // Check for treeshaking opportunities
  console.log('\n🌳 Checking tree-shaking...');
  await analyzeTreeshaking(analysis);

  // Generate recommendations
  generateRecommendations(analysis);

  // Display report
  displayReport(analysis);

  // Save detailed report
  const reportPath = path.join(rootDir, 'bundle-analysis.json');
  await fs.writeJson(reportPath, analysis, { spaces: 2 });
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);
}

async function analyzeBundle(filePath: string): Promise<BundleInfo> {
  const fullPath = path.join(rootDir, filePath);

  if (!(await fs.pathExists(fullPath))) {
    return { exists: false, size: 0, gzipSize: 0 };
  }

  const content = await fs.readFile(fullPath);
  const gzipped = gzipSync(content);

  const info: BundleInfo = {
    exists: true,
    size: content.length,
    gzipSize: gzipped.length,
  };

  // For JavaScript files, try to analyze modules
  if (filePath.endsWith('.js')) {
    info.modules = await analyzeModules(content.toString());
  }

  return info;
}

async function analyzeModules(content: string): Promise<ModuleInfo[]> {
  const modules: ModuleInfo[] = [];

  // Simple heuristic: look for common patterns
  const patterns = [
    { name: 'React', pattern: /from\s+['"]react['"]|require\(['"]react['"]\)/g },
    { name: 'React DOM', pattern: /from\s+['"]react-dom['"]|require\(['"]react-dom['"]\)/g },
    {
      name: 'Framer Motion',
      pattern: /from\s+['"]framer-motion['"]|require\(['"]framer-motion['"]\)/g,
    },
    { name: 'Radix UI', pattern: /@radix-ui/g },
    { name: 'Class Variance Authority', pattern: /class-variance-authority/g },
    { name: 'Tailwind Merge', pattern: /tailwind-merge/g },
  ];

  const totalSize = content.length;

  for (const { name, pattern } of patterns) {
    const matches = content.match(pattern);
    if (matches) {
      // Rough estimation based on pattern frequency
      const estimatedSize = matches.length * 1000; // Very rough estimate
      modules.push({
        name,
        size: estimatedSize,
        percentage: (estimatedSize / totalSize) * 100,
      });
    }
  }

  return modules.sort((a, b) => b.size - a.size);
}

async function analyzeDependencies(): Promise<DependencyAnalysis[]> {
  const packageJson = await fs.readJson(path.join(rootDir, 'package.json'));
  const dependencies = packageJson.dependencies || {};
  const analysis: DependencyAnalysis[] = [];

  // Known heavy dependencies
  const heavyDeps = ['framer-motion', '@tanstack/react-table', 'react-select'];
  const moderateDeps = ['@radix-ui', 'lucide-react', 'zustand'];

  for (const [name, version] of Object.entries(dependencies)) {
    let usage: 'heavy' | 'moderate' | 'light' = 'light';
    let estimatedSize = 10000; // 10KB default

    if (heavyDeps.some((dep) => name.includes(dep))) {
      usage = 'heavy';
      estimatedSize = 100000; // 100KB
    } else if (moderateDeps.some((dep) => name.includes(dep))) {
      usage = 'moderate';
      estimatedSize = 50000; // 50KB
    }

    analysis.push({
      name,
      size: estimatedSize,
      gzipSize: Math.round(estimatedSize * 0.3),
      usage,
    });
  }

  return analysis.sort((a, b) => b.size - a.size);
}

async function analyzeTreeshaking(analysis: BundleAnalysis): Promise<void> {
  // Check for unused exports by analyzing the source
  const srcDir = path.join(rootDir, 'src');
  const indexPath = path.join(srcDir, 'index.ts');

  if (await fs.pathExists(indexPath)) {
    const indexContent = await fs.readFile(indexPath, 'utf-8');

    // Check if we're re-exporting everything
    if (indexContent.includes('export *')) {
      analysis.treeshaking.sideEffects.push('Using "export *" prevents optimal tree-shaking');
    }
  }

  // Check package.json for sideEffects field
  const packageJson = await fs.readJson(path.join(rootDir, 'package.json'));
  if (!packageJson.sideEffects || packageJson.sideEffects === true) {
    analysis.treeshaking.sideEffects.push('package.json missing "sideEffects: false" declaration');
  }

  console.log(`   Found ${analysis.treeshaking.sideEffects.length} tree-shaking issues`);
}

function generateRecommendations(analysis: BundleAnalysis): void {
  const { bundles, dependencies, treeshaking } = analysis;

  // Size recommendations
  const totalSize = bundles.esm.gzipSize + bundles.cjs.gzipSize;
  if (totalSize > 100 * 1024) {
    // 100KB
    analysis.recommendations.push(
      'Consider code splitting - total bundle size exceeds 100KB gzipped',
    );
  }

  // Heavy dependencies
  const heavyDeps = dependencies.filter((d) => d.usage === 'heavy');
  if (heavyDeps.length > 0) {
    analysis.recommendations.push(
      `Consider lighter alternatives for: ${heavyDeps.map((d) => d.name).join(', ')}`,
    );
  }

  // Tree-shaking
  if (treeshaking.sideEffects.length > 0) {
    analysis.recommendations.push('Fix tree-shaking issues to reduce bundle size');
  }

  // CSS optimization
  if (bundles.css.size > 50 * 1024) {
    // 50KB
    analysis.recommendations.push('CSS file is large - consider using PurgeCSS or similar');
  }

  // Module format
  if (!bundles.esm.exists) {
    analysis.recommendations.push('Add ESM build for better tree-shaking in modern bundlers');
  }

  // Compression
  analysis.recommendations.push(
    'Enable Brotli compression on your server for ~15% better compression than gzip',
  );
}

function displayReport(analysis: BundleAnalysis): void {
  console.log('\n' + '═'.repeat(60));
  console.log('📊 BUNDLE ANALYSIS REPORT');
  console.log('═'.repeat(60) + '\n');

  // Bundle sizes
  console.log('📦 Bundle Sizes:');

  const bundles = [
    { name: 'ESM Bundle', info: analysis.bundles.esm },
    { name: 'CJS Bundle', info: analysis.bundles.cjs },
    { name: 'CSS Bundle', info: analysis.bundles.css },
  ];

  for (const { name, info } of bundles) {
    if (info.exists) {
      console.log(`\n   ${name}:`);
      console.log(`   • Raw: ${formatSize(info.size)}`);
      console.log(
        `   • Gzipped: ${formatSize(info.gzipSize)} (${Math.round((info.gzipSize / info.size) * 100)}% of original)`,
      );
    }
  }

  // Total size
  const totalRaw = Object.values(analysis.bundles).reduce((sum, b) => sum + b.size, 0);
  const totalGzip = Object.values(analysis.bundles).reduce((sum, b) => sum + b.gzipSize, 0);

  console.log(`\n   Total:`);
  console.log(`   • Raw: ${formatSize(totalRaw)}`);
  console.log(`   • Gzipped: ${formatSize(totalGzip)}`);

  // Top dependencies
  console.log('\n\n🏋️ Heaviest Dependencies:');
  const topDeps = analysis.dependencies.slice(0, 5);

  for (const dep of topDeps) {
    const badge = dep.usage === 'heavy' ? '🔴' : dep.usage === 'moderate' ? '🟡' : '🟢';
    console.log(`   ${badge} ${dep.name}: ${formatSize(dep.gzipSize)} gzipped`);
  }

  // Tree-shaking issues
  if (analysis.treeshaking.sideEffects.length > 0) {
    console.log('\n\n🌳 Tree-shaking Issues:');
    analysis.treeshaking.sideEffects.forEach((issue) => {
      console.log(`   • ${issue}`);
    });
  }

  // Recommendations
  if (analysis.recommendations.length > 0) {
    console.log('\n\n💡 Recommendations:');
    analysis.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }

  // Size limits check
  console.log('\n\n📏 Size Limit Check:');
  try {
    execSync('pnpm size', { stdio: 'inherit' });
  } catch (error) {
    console.log('   ⚠️  Size limits exceeded');
  }

  console.log('\n✨ Analysis completed at:', new Date().toLocaleTimeString());
  console.log('═'.repeat(60));
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  analyzeBundles().catch((error) => {
    console.error('❌ Bundle analysis failed:', error);
    process.exit(1);
  });
}
