import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from './Button';

test.describe('Button Component', () => {
  test('renders with text', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);
    await expect(component).toContainText('Click me');
  });

  test('handles click events', async ({ mount }) => {
    let clicked = false;
    const component = await mount(
      <Button onClick={() => (clicked = true)}>Click me</Button>
    );
    
    await component.click();
    expect(clicked).toBe(true);
  });

  test('applies variant styles', async ({ mount }) => {
    const component = await mount(<Button variant="destructive">Delete</Button>);
    await expect(component).toHaveClass(/destructive/);
  });

  test('respects disabled state', async ({ mount }) => {
    const component = await mount(<Button disabled>Disabled</Button>);
    await expect(component).toBeDisabled();
  });

  test('renders different sizes', async ({ mount }) => {
    const small = await mount(<Button size="sm">Small</Button>);
    const medium = await mount(<Button size="md">Medium</Button>);
    const large = await mount(<Button size="lg">Large</Button>);
    
    await expect(small).toHaveClass(/sm/);
    await expect(medium).toHaveClass(/md/);
    await expect(large).toHaveClass(/lg/);
  });

  test('visual regression - all variants', async ({ mount, page }) => {
    await mount(
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '20px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    );
    
    await expect(page).toHaveScreenshot('button-variants.png');
  });

  test('accessibility', async ({ mount, page }) => {
    await mount(<Button>Accessible Button</Button>);
    
    const accessibilityReport = await page.accessibility.snapshot();
    expect(accessibilityReport?.children).toBeDefined();
  });
});