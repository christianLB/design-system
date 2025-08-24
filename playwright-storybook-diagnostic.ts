import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface ComponentInfo {
  name: string;
  path: string;
  hasStyles: boolean;
  tailwindClasses: string[];
  computedStyles: Record<string, any>;
  cssVariables: Record<string, string>;
}

interface ThemeDiagnostic {
  theme: string;
  components: ComponentInfo[];
  globalStyles: Record<string, any>;
  tailwindLoaded: boolean;
  screenshot: string;
}

async function diagnoseStorybook() {
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page: Page = await context.newPage();
  
  // Create screenshots directory
  const screenshotDir = './storybook-diagnostics';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const themes = ['light', 'dark', 'futuristic', 'cyberpunk', 'alien', 'mirtha'];
  const diagnostics: ThemeDiagnostic[] = [];

  console.log('🔍 Starting Storybook Styling Diagnostics...\n');

  // Navigate to Storybook
  await page.goto('http://localhost:42881/');
  await page.waitForTimeout(3000);

  // Get list of all stories
  const stories = await page.evaluate(() => {
    const storyLinks = Array.from(document.querySelectorAll('[data-nodetype="story"] a, [data-item-id]'));
    return storyLinks.map(link => ({
      name: link.textContent?.trim() || '',
      id: link.getAttribute('data-item-id') || link.getAttribute('href') || ''
    })).filter(s => s.id && s.name);
  });

  console.log(`Found ${stories.length} stories to analyze\n`);

  for (const theme of themes) {
    console.log(`\n🎨 Analyzing theme: ${theme}`);
    console.log('=' .repeat(50));

    const themeComponents: ComponentInfo[] = [];

    // Switch theme using toolbar
    await page.click('[title="Theme"]');
    await page.waitForTimeout(500);
    await page.click(`text="${theme.charAt(0).toUpperCase() + theme.slice(1)}"`);
    await page.waitForTimeout(1000);

    // Take overview screenshot
    const overviewScreenshot = path.join(screenshotDir, `${theme}-overview.png`);
    await page.screenshot({ path: overviewScreenshot, fullPage: true });

    // Check if Tailwind is loaded
    const tailwindLoaded = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets);
      return styles.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          return rules.some(rule => rule.cssText?.includes('--tw-') || rule.cssText?.includes('tailwind'));
        } catch {
          return false;
        }
      });
    });

    console.log(`  Tailwind CSS loaded: ${tailwindLoaded ? '✅' : '❌'}`);

    // Get global CSS variables
    const globalStyles = await page.evaluate(() => {
      const computed = getComputedStyle(document.documentElement);
      const cssVars: Record<string, string> = {};
      
      // Get CSS variables
      for (let i = 0; i < computed.length; i++) {
        const prop = computed[i];
        if (prop.startsWith('--')) {
          cssVars[prop] = computed.getPropertyValue(prop);
        }
      }
      
      return {
        cssVariables: cssVars,
        bodyBackground: getComputedStyle(document.body).backgroundColor,
        bodyColor: getComputedStyle(document.body).color,
        fontFamily: getComputedStyle(document.body).fontFamily
      };
    });

    console.log(`  CSS Variables found: ${Object.keys(globalStyles.cssVariables).length}`);
    console.log(`  Body styles: bg=${globalStyles.bodyBackground}, color=${globalStyles.bodyColor}`);

    // Analyze first 5 components for detailed diagnostics
    const componentsToAnalyze = stories.slice(0, 5);
    
    for (const story of componentsToAnalyze) {
      try {
        // Navigate to story
        const storyUrl = `http://localhost:42881/?path=/story/${story.id}`;
        await page.goto(storyUrl);
        await page.waitForTimeout(2000);

        // Switch to iframe to access story content
        const frame = page.frame({ url: /iframe\.html/ });
        if (!frame) {
          console.log(`  ⚠️  Could not access iframe for ${story.name}`);
          continue;
        }

        // Analyze component styling
        const componentInfo = await frame.evaluate(() => {
          const root = document.querySelector('#storybook-root') || document.body;
          const elements = root.querySelectorAll('*');
          
          const tailwindClasses: Set<string> = new Set();
          const hasVisibleElements = elements.length > 0;
          
          // Collect Tailwind classes
          elements.forEach(el => {
            const classes = Array.from(el.classList);
            classes.forEach(cls => {
              if (cls.includes('-') || cls.match(/^(p|m|w|h|text|bg|border|flex|grid)/)) {
                tailwindClasses.add(cls);
              }
            });
          });

          // Get computed styles of first visible element
          const firstElement = root.querySelector('div, button, input, [class*="component"]');
          const computedStyles = firstElement ? {
            display: getComputedStyle(firstElement).display,
            padding: getComputedStyle(firstElement).padding,
            margin: getComputedStyle(firstElement).margin,
            backgroundColor: getComputedStyle(firstElement).backgroundColor,
            color: getComputedStyle(firstElement).color,
            border: getComputedStyle(firstElement).border,
            width: getComputedStyle(firstElement).width,
            height: getComputedStyle(firstElement).height
          } : {};

          // Get CSS variables in use
          const cssVars: Record<string, string> = {};
          const computed = getComputedStyle(document.documentElement);
          ['--primary', '--secondary', '--background', '--foreground', '--border'].forEach(varName => {
            const value = computed.getPropertyValue(varName);
            if (value) cssVars[varName] = value;
          });

          return {
            hasStyles: hasVisibleElements && tailwindClasses.size > 0,
            tailwindClasses: Array.from(tailwindClasses),
            computedStyles,
            cssVariables: cssVars
          };
        });

        // Take component screenshot
        const componentScreenshot = path.join(screenshotDir, `${theme}-${story.name.replace(/[^a-z0-9]/gi, '-')}.png`);
        await page.screenshot({ path: componentScreenshot });

        const info: ComponentInfo = {
          name: story.name,
          path: story.id,
          ...componentInfo
        };

        themeComponents.push(info);

        console.log(`  📸 ${story.name}:`);
        console.log(`     - Has styles: ${info.hasStyles ? '✅' : '❌'}`);
        console.log(`     - Tailwind classes found: ${info.tailwindClasses.length}`);
        console.log(`     - CSS variables: ${Object.keys(info.cssVariables).length}`);
        if (info.tailwindClasses.length > 0) {
          console.log(`     - Sample classes: ${info.tailwindClasses.slice(0, 5).join(', ')}`);
        }

      } catch (error) {
        console.log(`  ❌ Error analyzing ${story.name}: ${error}`);
      }
    }

    diagnostics.push({
      theme,
      components: themeComponents,
      globalStyles,
      tailwindLoaded,
      screenshot: overviewScreenshot
    });
  }

  // Generate diagnostic report
  const report = {
    timestamp: new Date().toISOString(),
    storybookUrl: 'http://localhost:42881/',
    totalStories: stories.length,
    themeDiagnostics: diagnostics,
    summary: {
      workingThemes: diagnostics.filter(d => d.tailwindLoaded && d.components.some(c => c.hasStyles)).map(d => d.theme),
      brokenThemes: diagnostics.filter(d => !d.tailwindLoaded || !d.components.some(c => c.hasStyles)).map(d => d.theme),
      tailwindStatus: diagnostics.map(d => ({ theme: d.theme, loaded: d.tailwindLoaded })),
      componentStatus: diagnostics.map(d => ({
        theme: d.theme,
        styledComponents: d.components.filter(c => c.hasStyles).length,
        unstyledComponents: d.components.filter(c => !c.hasStyles).length
      }))
    }
  };

  // Save diagnostic report
  fs.writeFileSync(
    path.join(screenshotDir, 'diagnostic-report.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n\n📊 DIAGNOSTIC SUMMARY');
  console.log('=' .repeat(50));
  console.log(`✅ Working themes: ${report.summary.workingThemes.join(', ') || 'None'}`);
  console.log(`❌ Broken themes: ${report.summary.brokenThemes.join(', ') || 'None'}`);
  console.log('\nTailwind CSS Status:');
  report.summary.tailwindStatus.forEach(status => {
    console.log(`  ${status.theme}: ${status.loaded ? '✅ Loaded' : '❌ Not loaded'}`);
  });
  console.log('\nComponent Styling Status:');
  report.summary.componentStatus.forEach(status => {
    console.log(`  ${status.theme}: ${status.styledComponents}/${status.styledComponents + status.unstyledComponents} components styled`);
  });

  console.log(`\n📁 Screenshots and report saved to: ${screenshotDir}/`);
  
  await browser.close();
}

// Run diagnostics
diagnoseStorybook().catch(console.error);