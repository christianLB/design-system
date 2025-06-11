const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
// Use Playwright from the test package to avoid an additional dependency
const { chromium } = require('@playwright/test');

async function main() {
  // Build Storybook static site
  execSync('pnpm run build-storybook', { stdio: 'inherit' });

  const staticDir = path.resolve(__dirname, '../storybook-static');
  const storiesPath = path.join(staticDir, 'stories.json');

  if (!fs.existsSync(storiesPath)) {
    console.error('stories.json not found. Did the build succeed?');
    process.exit(1);
  }

  const storiesJson = JSON.parse(fs.readFileSync(storiesPath, 'utf8'));
  const ids = Object.keys(storiesJson.stories || {});

  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  if (process.env.CHROMIUM_PATH) {
    launchOptions.executablePath = process.env.CHROMIUM_PATH;
  }

  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage();
  let hasError = false;

  page.on('pageerror', (err) => {
    console.error('Page error:', err);
    hasError = true;
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('Console error:', msg.text());
      hasError = true;
    }
  });

  for (const id of ids) {
    const url = `file://${path.join(staticDir, 'iframe.html')}?id=${id}`;
    console.log('Checking', id);
    await page.goto(url, { waitUntil: 'load' });
  }

  await browser.close();

  if (hasError) {
    console.error('Storybook tests failed');
    process.exit(1);
  } else {
    console.log('All stories loaded without errors');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
