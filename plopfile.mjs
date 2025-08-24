export default function (plop) {
  // Component generator
  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (e.g., "MyComponent"):',
        validate: (value) => {
          if (!value) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z]*$/.test(value)) {
            return 'Component name must be PascalCase';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Component description:',
        default: 'A reusable component',
      },
      {
        type: 'list',
        name: 'category',
        message: 'Component category:',
        choices: ['Layout', 'Form', 'Display', 'Navigation', 'Feedback', 'Utility'],
      },
      {
        type: 'confirm',
        name: 'hasProps',
        message: 'Will this component have props?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'hasForwardRef',
        message: 'Should this component use forwardRef?',
        default: false,
      },
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select features to include:',
        choices: [
          { name: 'Unit tests', value: 'tests', checked: true },
          { name: 'Storybook stories', value: 'stories', checked: true },
          { name: 'Playwright tests', value: 'playwright', checked: false },
          { name: 'CSS module', value: 'css', checked: false },
        ],
      },
    ],
    actions: (data) => {
      const actions = [];
      const componentPath = 'src/components/{{name}}';

      // Main component file
      actions.push({
        type: 'add',
        path: `${componentPath}/{{name}}.tsx`,
        templateFile: 'templates/plop/component.tsx.hbs',
      });

      // Index file
      actions.push({
        type: 'add',
        path: `${componentPath}/index.ts`,
        templateFile: 'templates/plop/index.ts.hbs',
      });

      // Conditional files based on features
      if (data.features.includes('tests')) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.test.tsx`,
          templateFile: 'templates/plop/component.test.tsx.hbs',
        });
      }

      if (data.features.includes('stories')) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.stories.tsx`,
          templateFile: 'templates/plop/component.stories.tsx.hbs',
        });
      }

      if (data.features.includes('playwright')) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.pw.tsx`,
          templateFile: 'templates/plop/component.pw.tsx.hbs',
        });
      }

      if (data.features.includes('css')) {
        actions.push({
          type: 'add',
          path: `${componentPath}/{{name}}.module.css`,
          templateFile: 'templates/plop/component.module.css.hbs',
        });
      }

      // Update component index
      actions.push({
        type: 'append',
        path: 'src/components/index.ts',
        pattern: /(?=\n*$)/,
        template: "export * from './{{name}}';\n",
      });

      return actions;
    },
  });

  // Hook generator
  plop.setGenerator('hook', {
    description: 'Create a new React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: (value) => {
          if (!value) return 'Hook name is required';
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'Hook name must be camelCase';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Hook description:',
        default: 'A custom React hook',
      },
      {
        type: 'confirm',
        name: 'hasTests',
        message: 'Include tests?',
        default: true,
      },
    ],
    actions: (data) => {
      const actions = [];
      const hookPath = 'src/hooks';

      // Main hook file
      actions.push({
        type: 'add',
        path: `${hookPath}/use{{pascalCase name}}.ts`,
        templateFile: 'templates/plop/hook.ts.hbs',
      });

      // Test file
      if (data.hasTests) {
        actions.push({
          type: 'add',
          path: `${hookPath}/use{{pascalCase name}}.test.ts`,
          templateFile: 'templates/plop/hook.test.ts.hbs',
        });
      }

      // Update hooks index
      actions.push({
        type: 'append',
        path: `${hookPath}/index.ts`,
        pattern: /(?=\n*$)/,
        template: "export * from './use{{pascalCase name}}';\n",
      });

      return actions;
    },
  });

  // Utility generator
  plop.setGenerator('util', {
    description: 'Create a new utility function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Utility name:',
        validate: (value) => {
          if (!value) return 'Utility name is required';
          if (!/^[a-z][a-zA-Z]*$/.test(value)) {
            return 'Utility name must be camelCase';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Utility description:',
        default: 'A utility function',
      },
      {
        type: 'list',
        name: 'category',
        message: 'Utility category:',
        choices: ['string', 'number', 'array', 'object', 'dom', 'date', 'misc'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}.ts',
        templateFile: 'templates/plop/util.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/utils/{{camelCase name}}.test.ts',
        templateFile: 'templates/plop/util.test.ts.hbs',
      },
    ],
  });

  // Helper functions
  plop.setHelper('eq', (a, b) => a === b);
  plop.setHelper('includes', (arr, val) => arr && arr.includes(val));
}