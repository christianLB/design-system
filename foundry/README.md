# Foundry - Design System Generator

This is the **source of truth** for the design system. Components, styles, and documentation are **generated** from the data here.

## Architecture

```
foundry/
├── tokens/           # Design tokens (JSON)
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── radius.json
│   ├── shadows.json
│   └── themes/       # Theme-specific overrides
│       ├── light.json
│       ├── dark.json
│       ├── cyberpunk.json
│       └── alien.json
│
├── schemas/          # Component contracts (JSON)
│   ├── button.schema.json
│   ├── input.schema.json
│   └── ...
│
├── templates/        # Code generation templates
│   ├── component.tsx.hbs
│   ├── story.mdx.hbs
│   └── test.spec.tsx.hbs
│
└── generators/       # Build scripts
    ├── generate-components.ts
    ├── generate-tokens.ts
    └── generate-docs.ts
```

## Workflow

### For Humans
1. Edit tokens in `tokens/*.json`
2. Edit component contracts in `schemas/*.json`
3. Run `pnpm foundry:generate`
4. Commit the generated output

### For AI Agents
Same workflow, but constrained to:
- **ONLY** modify files in `foundry/tokens/` and `foundry/schemas/`
- **NEVER** touch generated files directly
- **ALWAYS** run `pnpm foundry:generate` after changes

## Commands

```bash
# Generate everything
pnpm foundry:generate

# Generate specific parts
pnpm foundry:tokens      # CSS variables from tokens
pnpm foundry:components  # React components from schemas
pnpm foundry:docs        # Documentation from schemas

# Validate schemas
pnpm foundry:validate
```

## Adding a New Component

1. Create schema: `foundry/schemas/newcomponent.schema.json`
2. Run: `pnpm foundry:generate`
3. Component appears in `src/components/NewComponent/`

## Adding a Variant

1. Edit the schema, add variant to `variants` object
2. Add token values if needed in `tokens/`
3. Run: `pnpm foundry:generate`

## Design Principles

- **Tokens are primitive** - Colors, spacing, typography as raw values
- **Schemas are contracts** - Define what a component can do
- **Templates are recipes** - How to turn schemas into code
- **Generated code is immutable** - Never edit directly
