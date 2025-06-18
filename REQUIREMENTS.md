# Requirements

This design system is distributed as a library of React components. The package expects the following peer dependencies to be present in your project:

- **react** >= 17.0.0
- **react-dom** >= 17.0.0

The components themselves make use of several supporting libraries which will be installed automatically when you install this package:

- @radix-ui/react-checkbox
- @radix-ui/react-dialog
- @radix-ui/react-popover
- @radix-ui/react-select
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @tanstack/react-table
- @types/react-select
- class-variance-authority
- clsx
- lucide-react
- react-select
- tailwind-merge
- tailwindcss-animate
- zustand

Ensure your project uses a version of React compatible with these dependencies (React 17 or newer).  The library's styles also rely on Tailwind CSS v4.

## Installing Peer Dependencies

If your project does not already include React and Tailwind CSS, install them along with this package:

```bash
pnpm add react react-dom tailwindcss@^4 autoprefixer postcss
```

After installing Tailwind, initialize its configuration if you haven't already:

```bash
npx tailwindcss init
```

The design system ships with a `tailwind.preset.js` file. Extend your project's `tailwind.config.js` to use it:

```js
// tailwind.config.js
module.exports = {
  presets: [require('@k2600x/design-system/tailwind.preset.js')],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
};
```

With these dependencies installed and Tailwind configured, you can import components directly from the design system and use them in your application.
