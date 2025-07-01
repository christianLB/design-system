const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, '..', 'src', 'components');

function getComponentDirs() {
  return fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function findStories(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.stories.tsx') || f.endsWith('.stories.mdx'));
}

function checkStorybookFiles() {
  const missing = [];
  const empty = [];

  for (const component of getComponentDirs()) {
    const componentDir = path.join(componentsDir, component);
    const stories = findStories(componentDir);
    if (stories.length === 0) {
      missing.push(component);
      continue;
    }
    for (const file of stories) {
      const filePath = path.join(componentDir, file);
      const { size } = fs.statSync(filePath);
      if (size === 0) {
        empty.push(filePath);
      }
    }
  }

  return { missing, empty };
}

function getChangedComponents(baseRef = 'origin/main') {
  let diff = '';
  try {
    // Only attempt diff if repository has the base ref
    execSync(`git rev-parse --verify ${baseRef}`, { stdio: 'ignore' });
    diff = execSync(`git diff --name-only ${baseRef}...HEAD`, {
      encoding: 'utf8',
    });
  } catch (e) {
    return [];
  }
  const changedFiles = diff.split(/\n/).filter(Boolean);
  const components = new Set();
  changedFiles.forEach((file) => {
    if (file.startsWith('src/components/')) {
      const parts = file.split('/');
      if (parts.length >= 3) {
        const component = parts[2];
        // Skip main index.ts file and files that already include stories
        if (!file.includes('.stories.') && component !== 'index.ts') {
          components.add(component);
        }
      }
    }
  });
  const changedStories = new Set();
  changedFiles.forEach((file) => {
    if (file.startsWith('src/components/')) {
      const parts = file.split('/');
      if (parts.length >= 3 && file.includes('.stories.')) {
        changedStories.add(parts[2]);
      }
    }
  });

  const missingStoryChange = [];
  components.forEach((comp) => {
    if (!changedStories.has(comp)) {
      missingStoryChange.push(comp);
    }
  });

  return missingStoryChange;
}

function main() {
  const { missing, empty } = checkStorybookFiles();
  const baseRef = process.env.GITHUB_BASE_REF
    ? `origin/${process.env.GITHUB_BASE_REF}`
    : 'origin/main';
  const diffIssues = getChangedComponents(baseRef);

  let hasError = false;

  if (missing.length) {
    console.error('Components missing stories:', missing.join(', '));
    hasError = true;
  }
  if (empty.length) {
    console.error('Story files are empty:', empty.join(', '));
    hasError = true;
  }
  if (diffIssues.length) {
    console.error('Components changed without story updates:', diffIssues.join(', '));
    hasError = true;
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('Storybook check passed');
  }
}

main();
