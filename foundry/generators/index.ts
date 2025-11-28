#!/usr/bin/env tsx
/**
 * Foundry Generator - Main Entry Point
 *
 * Orchestrates all generation tasks:
 * - Tokens → CSS variables, TypeScript, Tailwind preset
 * - Schemas → React components
 *
 * Usage: pnpm foundry:generate
 */

import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GENERATORS_DIR = __dirname;

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║      🏭 FOUNDRY - Design System          ║');
  console.log('║         Generator Pipeline               ║');
  console.log('╚══════════════════════════════════════════╝\n');

  const startTime = Date.now();

  try {
    // Step 1: Generate tokens
    console.log('━━━ Step 1/2: Generating Tokens ━━━\n');
    execSync(`tsx ${path.join(GENERATORS_DIR, 'generate-tokens.ts')}`, {
      stdio: 'inherit',
      cwd: path.join(GENERATORS_DIR, '../..'),
    });

    console.log('\n━━━ Step 2/2: Generating Components ━━━\n');
    // Step 2: Generate components
    execSync(`tsx ${path.join(GENERATORS_DIR, 'generate-components.ts')}`, {
      stdio: 'inherit',
      cwd: path.join(GENERATORS_DIR, '../..'),
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║         ✨ Generation Complete!          ║');
    console.log(`║         Time: ${duration}s                      ║`);
    console.log('╚══════════════════════════════════════════╝');

    console.log('\nGenerated outputs:');
    console.log('  📁 src/tokens-generated/');
    console.log('     ├── tokens.css');
    console.log('     ├── tokens.ts');
    console.log('     └── tailwind.preset.cjs');
    console.log('  📁 src/components-generated/');
    console.log('     └── [Component]/');

  } catch (error) {
    console.error('\n❌ Generation failed!');
    console.error(error);
    process.exit(1);
  }
}

main();
