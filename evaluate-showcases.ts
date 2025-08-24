import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

interface StyleIssue {
  showcase: string;
  element: string;
  issue: string;
  severity: 'critical' | 'major' | 'minor';
  suggestion: string;
}

class ShowcaseEvaluator {
  private browser: Browser | null = null;
  private issues: StyleIssue[] = [];
  
  private showcases = [
    { name: 'futuristic-finance', title: 'Futuristic Finance Dashboard' },
    { name: 'cyberpunk-hacker', title: 'Cyberpunk Hacker Terminal' },
    { name: 'alien-bio-monitor', title: 'Alien Bio-Monitor' },
    { name: 'mirtha-luxury-portfolio', title: 'Mirtha Luxury Portfolio' },
    { name: 'light-corporate-dashboard', title: 'Light Corporate Dashboard' },
    { name: 'dark-developer-portal', title: 'Dark Developer Portal' }
  ];

  async initialize() {
    this.browser = await chromium.launch({ headless: true });
    
    // Create screenshots directory
    const screenshotsDir = path.join(process.cwd(), 'showcase-screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }
  }

  async evaluateShowcase(page: Page, showcase: string) {
    console.log(`\n📸 Evaluating ${showcase}...`);
    
    // Visual checks
    await this.checkContrast(page, showcase);
    await this.checkSpacing(page, showcase);
    await this.checkTypography(page, showcase);
    await this.checkAlignment(page, showcase);
    await this.checkColors(page, showcase);
    await this.checkResponsiveness(page, showcase);
    await this.checkInteractiveElements(page, showcase);
  }

  async checkContrast(page: Page, showcase: string) {
    // Check text contrast ratios
    const elements = await page.$$eval('*', (elements) => {
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;
        const fontSize = style.fontSize;
        return {
          tag: el.tagName,
          class: el.className,
          bg,
          color,
          fontSize,
          text: el.textContent?.slice(0, 50)
        };
      }).filter(el => el.color !== 'rgba(0, 0, 0, 0)' && el.bg !== 'rgba(0, 0, 0, 0)');
    });

    // Analyze contrast issues
    for (const el of elements) {
      if (this.isLowContrast(el.bg, el.color)) {
        this.issues.push({
          showcase,
          element: `${el.tag}.${el.class}`,
          issue: `Low contrast between text (${el.color}) and background (${el.bg})`,
          severity: 'major',
          suggestion: 'Increase contrast ratio to meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)'
        });
      }
    }
  }

  async checkSpacing(page: Page, showcase: string) {
    const spacingIssues = await page.$$eval('[class*="Card"], [class*="Button"], [class*="Badge"]', (elements) => {
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        const padding = style.padding;
        const margin = style.margin;
        const rect = el.getBoundingClientRect();
        
        return {
          class: el.className,
          padding,
          margin,
          width: rect.width,
          height: rect.height,
          isOverflowing: el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
        };
      }).filter(el => el.isOverflowing || parseInt(el.padding) === 0);
    });

    for (const issue of spacingIssues) {
      if (issue.isOverflowing) {
        this.issues.push({
          showcase,
          element: issue.class,
          issue: 'Content overflow detected',
          severity: 'critical',
          suggestion: 'Add proper padding or adjust content width to prevent overflow'
        });
      }
    }
  }

  async checkTypography(page: Page, showcase: string) {
    const typographyData = await page.$$eval('h1, h2, h3, h4, p, span', (elements) => {
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        return {
          tag: el.tagName,
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing
        };
      });
    });

    // Check for consistency and readability
    const headingSizes = typographyData.filter(t => t.tag.startsWith('H'));
    if (headingSizes.length > 0) {
      const sizes = headingSizes.map(h => parseInt(h.fontSize));
      if (Math.min(...sizes) < 14) {
        this.issues.push({
          showcase,
          element: 'Headings',
          issue: 'Heading font sizes too small',
          severity: 'major',
          suggestion: 'Ensure all headings are at least 14px for readability'
        });
      }
    }
  }

  async checkAlignment(page: Page, showcase: string) {
    const cards = await page.$$eval('[class*="Card"]', (elements) => {
      return elements.map(el => {
        const rect = el.getBoundingClientRect();
        return {
          class: el.className,
          left: rect.left,
          top: rect.top,
          width: rect.width
        };
      });
    });

    // Check for misaligned cards in the same row
    const rows = new Map<number, typeof cards>();
    for (const card of cards) {
      const rowKey = Math.floor(card.top / 100) * 100;
      if (!rows.has(rowKey)) rows.set(rowKey, []);
      rows.get(rowKey)!.push(card);
    }

    for (const [row, cardsInRow] of rows) {
      if (cardsInRow.length > 1) {
        const lefts = cardsInRow.map(c => c.left);
        const variance = Math.max(...lefts) - Math.min(...lefts);
        if (variance > 20 && variance < 100) {
          this.issues.push({
            showcase,
            element: 'Card grid',
            issue: `Cards misaligned in row (${variance}px variance)`,
            severity: 'minor',
            suggestion: 'Ensure consistent grid spacing and alignment'
          });
        }
      }
    }
  }

  async checkColors(page: Page, showcase: string) {
    const colorData = await page.$$eval('*', (elements) => {
      const colors = new Set<string>();
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          colors.add(style.backgroundColor);
        }
        if (style.color && style.color !== 'rgba(0, 0, 0, 0)') {
          colors.add(style.color);
        }
      });
      return Array.from(colors);
    });

    // Check for too many colors (indicating inconsistency)
    if (colorData.length > 20) {
      this.issues.push({
        showcase,
        element: 'Color palette',
        issue: `Too many unique colors (${colorData.length}) - indicates inconsistent theming`,
        severity: 'major',
        suggestion: 'Consolidate colors to use CSS variables consistently'
      });
    }
  }

  async checkResponsiveness(page: Page, showcase: string) {
    // Check at different viewport sizes
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(500);
      
      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasOverflow) {
        this.issues.push({
          showcase,
          element: 'Layout',
          issue: `Horizontal overflow at ${viewport.name} (${viewport.width}px)`,
          severity: 'critical',
          suggestion: 'Add proper responsive breakpoints and overflow handling'
        });
      }
    }
  }

  async checkInteractiveElements(page: Page, showcase: string) {
    const buttons = await page.$$eval('button', (elements) => {
      return elements.map(el => {
        const style = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          text: el.textContent,
          width: rect.width,
          height: rect.height,
          cursor: style.cursor,
          hasHover: style.cursor === 'pointer'
        };
      });
    });

    for (const button of buttons) {
      if (button.height < 32) {
        this.issues.push({
          showcase,
          element: `Button: ${button.text}`,
          issue: `Button too small (${button.height}px height)`,
          severity: 'major',
          suggestion: 'Minimum button height should be 32px for accessibility'
        });
      }
      
      if (!button.hasHover) {
        this.issues.push({
          showcase,
          element: `Button: ${button.text}`,
          issue: 'Missing pointer cursor on hover',
          severity: 'minor',
          suggestion: 'Add cursor: pointer to interactive elements'
        });
      }
    }
  }

  private isLowContrast(bg: string, fg: string): boolean {
    // Simple contrast check (would need proper WCAG calculation in production)
    // This is a placeholder - real implementation would calculate actual contrast ratio
    if (bg.includes('255') && fg.includes('255')) return true;
    if (bg.includes('0') && fg.includes('0')) return true;
    return false;
  }

  async captureScreenshots() {
    if (!this.browser) return;
    
    const page = await this.browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    for (const showcase of this.showcases) {
      const url = `http://localhost:5173/${showcase.name}.html`;
      console.log(`\n📸 Capturing ${showcase.title}...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000); // Let animations settle
        
        // Full page screenshot
        await page.screenshot({
          path: `showcase-screenshots/${showcase.name}-full.png`,
          fullPage: true
        });
        
        // Above the fold screenshot
        await page.screenshot({
          path: `showcase-screenshots/${showcase.name}-viewport.png`,
          fullPage: false
        });
        
        // Mobile screenshot
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(500);
        await page.screenshot({
          path: `showcase-screenshots/${showcase.name}-mobile.png`,
          fullPage: false
        });
        
        // Reset to desktop
        await page.setViewportSize({ width: 1920, height: 1080 });
        
        // Evaluate styling
        await this.evaluateShowcase(page, showcase.name);
        
      } catch (error) {
        console.error(`Error capturing ${showcase.name}:`, error);
      }
    }
    
    await page.close();
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('SHOWCASE STYLING EVALUATION REPORT');
    console.log('='.repeat(80));
    
    // Group issues by showcase
    const byShowcase = new Map<string, StyleIssue[]>();
    for (const issue of this.issues) {
      if (!byShowcase.has(issue.showcase)) {
        byShowcase.set(issue.showcase, []);
      }
      byShowcase.get(issue.showcase)!.push(issue);
    }
    
    // Report by showcase
    for (const [showcase, issues] of byShowcase) {
      console.log(`\n\n📱 ${showcase.toUpperCase()}`);
      console.log('-'.repeat(40));
      
      const critical = issues.filter(i => i.severity === 'critical');
      const major = issues.filter(i => i.severity === 'major');
      const minor = issues.filter(i => i.severity === 'minor');
      
      if (critical.length > 0) {
        console.log('\n🔴 CRITICAL ISSUES:');
        critical.forEach(i => {
          console.log(`  • ${i.element}: ${i.issue}`);
          console.log(`    → ${i.suggestion}`);
        });
      }
      
      if (major.length > 0) {
        console.log('\n🟠 MAJOR ISSUES:');
        major.forEach(i => {
          console.log(`  • ${i.element}: ${i.issue}`);
          console.log(`    → ${i.suggestion}`);
        });
      }
      
      if (minor.length > 0) {
        console.log('\n🟡 MINOR ISSUES:');
        minor.forEach(i => {
          console.log(`  • ${i.element}: ${i.issue}`);
          console.log(`    → ${i.suggestion}`);
        });
      }
    }
    
    // Summary
    console.log('\n\n' + '='.repeat(80));
    console.log('SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Issues Found: ${this.issues.length}`);
    console.log(`  • Critical: ${this.issues.filter(i => i.severity === 'critical').length}`);
    console.log(`  • Major: ${this.issues.filter(i => i.severity === 'major').length}`);
    console.log(`  • Minor: ${this.issues.filter(i => i.severity === 'minor').length}`);
    
    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      totalIssues: this.issues.length,
      byShowcase: Object.fromEntries(byShowcase),
      issues: this.issues
    };
    
    fs.writeFileSync(
      'showcase-evaluation-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\n✅ Full report saved to showcase-evaluation-report.json');
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async run() {
    try {
      await this.initialize();
      await this.captureScreenshots();
      this.generateReport();
    } catch (error) {
      console.error('Evaluation failed:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the evaluator
const evaluator = new ShowcaseEvaluator();
evaluator.run().catch(console.error);