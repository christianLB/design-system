# Alien Theme Usage Guide

## Overview

The Alien Theme is inspired by H.R. Giger's biomechanical aesthetic and creates an immersive experience that evokes the sensation of inhabiting a living structure. This guide provides a quick reference for using the alien theme components.

## Quick Start

### Apply Theme Globally
```tsx
<div className="theme-atmospheric">
  {/* All content gets alien theme styling */}
  <YourApp />
</div>
```

### Use Alien Components
```tsx
import { Card, Container, Button } from '@k2600x/design-system';

// Alien Card variants
<Card variant="alien-chamber" atmospheric vital>
  <CardContent>Living interface</CardContent>
</Card>

// Alien Container variants  
<Container alienVariant="organism" atmospheric neural>
  <YourContent />
</Container>

// Alien Button variants
<Button variant="membrane" atmospheric>
  Membrane Interface
</Button>
```

## Theme Structure

### Colors
The alien theme uses a biomechanical color palette:

- **Primary Colors**: Steel organic tones (`#708090` base)
- **Secondary Colors**: Pulsing life tones (`#e56e47` base) 
- **Background**: Primordial void (`#0d1117`)
- **Text**: Light organic tone (`#f6f7f8`)
- **Accents**: Vital glow effects

### Typography
- **Font Family**: Inter with system fallbacks
- **Organic Scale**: whisper, pulse, breath, heartbeat, circulation, respiration, consciousness

### Spacing
Biomechanical spacing scale:
- `synapse`: 0.125rem
- `membrane`: 0.25rem  
- `vessel`: 0.5rem
- `organ`: 1rem
- `cavity`: 1.5rem
- `chamber`: 2rem

### Border Radius
Asymmetric organic shapes:
- `cell`: 0.125rem
- `vessel`: 0.25rem 0.5rem
- `organ`: 0.375rem 0.75rem 0.25rem 0.625rem
- `cavity`: 0.5rem 1rem 0.375rem 0.875rem

## Advanced Features

### Alien Effects
The `alienEffects` export provides additional biomechanical styling options:

```typescript
import { alienEffects } from '@k2600x/design-system';

// Biomechanical shadows
const shadows = alienEffects.shadows.membrane;

// Organic gradients  
const gradient = alienEffects.gradients.vessel;

// Vital glow effects
const glow = alienEffects.vital.glow.md;

// Neural pathway effects
const neural = alienEffects.neural.pathways.horizontal;
```

### Animation Support
Built-in organic animations:
- `breathe`: 4s breathing effect
- `circulation`: 8s flow animation
- `neural`: 2s synaptic pulse
- `pulse`: 3s vital pulse

## Color Palette

### Primary (Steel Organic)
- 50: `#fafbfc` (Bone white)
- 500: `#708090` (Steel organic base)
- 950: `#1a1d20` (Internal void)

### Accent (Vital Elements)  
- 50: `#fef8f3` (Vital glow)
- 500: `#e56e47` (Pulsing life base)
- 950: `#3d1509` (Dried blood)

### Semantic Colors
- Background: `#0d1117` (Primordial void)
- Surface Cavity: `#1f2328`
- Surface Organ: `#323740` 
- Surface Tissue: `#454a52`
- Border: `#6b7280` (Ancient blood)
- Text: `#f6f7f8`
- Text Vital: `#e56e47`

## Component Reference

### Card Variants
- `alien-chamber`: Deep organ chamber with complex gradients
- `alien-organ`: Biomechanical organ with conic patterns  
- `alien-membrane`: Protective vessel-like membrane
- `alien-cavity`: Internal cavity with deep atmospheric effects

### Container Variants
- `organism`: Circular organic shape with deep shadows
- `chamber`: Deep organ chamber with atmospheric gradients
- `organ`: Biomechanical organ with conic gradients
- `membrane`: Protective vessel-like membrane
- `cavity`: Internal cavity with membrane effects

### Effect Props
- `atmospheric`: Enables neural pathways and circulation effects
- `vital`: Adds breathing animations and vital signs
- `neural`: Enables synaptic activity animations

### CSS Classes
Quick reference for commonly used classes:
- `atmospheric-breathe`: Breathing animation
- `atmospheric-text-vital`: Vital orange color
- `atmospheric-text-ghost`: Muted gray color
- `neural-pathways`: Neural pathway overlay
- `vital-element active`: Active vital state

## Integration Example

```tsx
import React from 'react';
import { Card, Container, Button } from '@k2600x/design-system';

function App() {
  return (
    <div className="theme-atmospheric">
      <Container alienVariant="organism" atmospheric vital>
        <Card variant="alien-chamber" atmospheric vital>
          <CardHeader>
            <CardTitle className="atmospheric-text-vital">
              Living Interface
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Experience the biomechanical aesthetic</p>
            <Button variant="vessel" vital atmospheric>
              Interact
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
```

## Accessibility

The alien theme maintains WCAG contrast requirements while preserving the atmospheric aesthetic. The biomechanical color palette ensures readable text contrast against dark organic backgrounds.