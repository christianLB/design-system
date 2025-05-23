import React from 'react';

/**
 * ThemeTest component
 * 
 * This component is used to test the new standardized CSS variables
 * and verify that Tailwind utility classes work correctly with the updated preset.
 * 
 * It demonstrates both the standardized approach and the legacy approach
 * for backward compatibility testing.
 */
export const ThemeTest: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Theme Test Component</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">Standardized Variables (v2.0.0+)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-background text-foreground border border-border rounded-lg">
            Background + Foreground
          </div>
          
          <div className="p-4 bg-card text-card-foreground border border-border rounded-lg">
            Card + Card Foreground
          </div>
          
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            Primary + Primary Foreground
          </div>
          
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            Secondary + Secondary Foreground
          </div>
          
          <div className="p-4 bg-muted text-muted-foreground rounded-lg">
            Muted + Muted Foreground
          </div>
          
          <div className="p-4 bg-accent text-accent-foreground rounded-lg">
            Accent + Accent Foreground
          </div>
          
          <div className="p-4 bg-destructive text-destructive-foreground rounded-lg">
            Destructive + Destructive Foreground
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="font-medium">Opacity Modifiers</h3>
          <div className="flex space-x-2">
            <div className="p-2 bg-primary/10 rounded">10%</div>
            <div className="p-2 bg-primary/25 rounded">25%</div>
            <div className="p-2 bg-primary/50 rounded">50%</div>
            <div className="p-2 bg-primary/75 rounded">75%</div>
            <div className="p-2 bg-primary rounded">100%</div>
          </div>
        </div>
      </section>
      
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Legacy Variables (v1.x Compatibility)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--app-bg)', 
            color: 'var(--text-color)',
            border: '1px solid var(--app-border-color)'
          }}>
            app-bg + text-color (Direct CSS Variables)
          </div>
          
          <div className="p-4 rounded-lg" style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--text-inverse-color)'
          }}>
            color-primary + text-inverse-color (Direct CSS Variables)
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThemeTest;
