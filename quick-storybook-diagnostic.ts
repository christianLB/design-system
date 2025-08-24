import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function quickDiagnostic() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('🔍 Quick Storybook Diagnostic\n');
  
  // Navigate to Storybook
  await page.goto('http://localhost:38511/');
  await page.waitForTimeout(3000);
  
  // Create screenshots directory
  const screenshotDir = './storybook-diagnostics';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Take initial screenshot
  await page.screenshot({ path: path.join(screenshotDir, 'initial-view.png'), fullPage: true });
  
  // Check for Tailwind CSS
  const tailwindCheck = await page.evaluate(() => {
    // Check for Tailwind in stylesheets
    const stylesheets = Array.from(document.styleSheets);
    let tailwindFound = false;
    let tailwindClasses: string[] = [];
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          const text = rule.cssText;
          if (text.includes('--tw-') || text.includes('tailwind')) {
            tailwindFound = true;
          }
        });
      } catch (e) {
        // Cross-origin stylesheets may throw
      }
    });
    
    // Check for Tailwind classes in DOM
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const classes = Array.from(el.classList);
      classes.forEach(cls => {
        if (cls.match(/^(p-|m-|w-|h-|text-|bg-|border-|flex|grid|block|inline)/)) {
          tailwindClasses.push(cls);
        }
      });
    });
    
    // Check computed styles on body
    const bodyStyles = getComputedStyle(document.body);
    
    return {
      tailwindInStylesheets: tailwindFound,
      tailwindClassesInDOM: [...new Set(tailwindClasses)].slice(0, 20),
      bodyBackground: bodyStyles.backgroundColor,
      bodyColor: bodyStyles.color,
      bodyFont: bodyStyles.fontFamily,
      cssVariables: (() => {
        const vars: Record<string, string> = {};
        const computed = getComputedStyle(document.documentElement);
        for (let i = 0; i < computed.length; i++) {
          const prop = computed[i];
          if (prop.startsWith('--')) {
            vars[prop] = computed.getPropertyValue(prop);
          }
        }
        return vars;
      })()
    };
  });
  
  console.log('Tailwind CSS in stylesheets:', tailwindCheck.tailwindInStylesheets ? '✅' : '❌');
  console.log('Tailwind classes in DOM:', tailwindCheck.tailwindClassesInDOM.length > 0 ? '✅' : '❌');
  console.log('Sample classes found:', tailwindCheck.tailwindClassesInDOM.join(', '));
  console.log('\nBody styles:');
  console.log('  Background:', tailwindCheck.bodyBackground);
  console.log('  Color:', tailwindCheck.bodyColor);
  console.log('  Font:', tailwindCheck.bodyFont);
  console.log('\nCSS Variables:', Object.keys(tailwindCheck.cssVariables).length);
  
  // Navigate to a specific story
  const firstStoryLink = await page.$('[data-nodetype="story"] a, [data-item-id]');
  if (firstStoryLink) {
    await firstStoryLink.click();
    await page.waitForTimeout(2000);
    
    // Check iframe content
    const frame = page.frame({ url: /iframe\.html/ });
    if (frame) {
      const iframeCheck = await frame.evaluate(() => {
        const root = document.querySelector('#storybook-root') || document.body;
        const elements = root.querySelectorAll('*');
        
        const classes: string[] = [];
        elements.forEach(el => {
          classes.push(...Array.from(el.classList));
        });
        
        // Get first component's computed styles
        const firstComponent = root.querySelector('div, button, input, [class*="component"]');
        const styles = firstComponent ? {
          padding: getComputedStyle(firstComponent).padding,
          margin: getComputedStyle(firstComponent).margin,
          background: getComputedStyle(firstComponent).backgroundColor,
          color: getComputedStyle(firstComponent).color,
          border: getComputedStyle(firstComponent).border
        } : null;
        
        return {
          totalElements: elements.length,
          uniqueClasses: [...new Set(classes)],
          computedStyles: styles,
          innerHTML: root.innerHTML.substring(0, 500)
        };
      });
      
      console.log('\n📦 Component iframe analysis:');
      console.log('  Total elements:', iframeCheck.totalElements);
      console.log('  Unique classes:', iframeCheck.uniqueClasses.length);
      console.log('  Sample classes:', iframeCheck.uniqueClasses.slice(0, 10).join(', '));
      console.log('  Component styles:', iframeCheck.computedStyles);
      
      await page.screenshot({ path: path.join(screenshotDir, 'first-component.png'), fullPage: true });
    }
  }
  
  // Check for CSS files loaded
  const cssFiles = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    return links.map(link => link.getAttribute('href'));
  });
  
  console.log('\n📄 CSS files loaded:');
  cssFiles.forEach(file => console.log('  -', file));
  
  // Save full diagnostic
  const fullReport = {
    timestamp: new Date().toISOString(),
    tailwindCheck,
    cssFiles,
    screenshotsPath: screenshotDir
  };
  
  fs.writeFileSync(
    path.join(screenshotDir, 'quick-diagnostic.json'),
    JSON.stringify(fullReport, null, 2)
  );
  
  console.log(`\n✅ Diagnostic complete. Results saved to ${screenshotDir}/`);
  
  await browser.close();
}

quickDiagnostic().catch(console.error);