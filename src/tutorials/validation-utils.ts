import { ValidationResult } from './types';

/**
 * Utility functions for validating user code in tutorials
 */

export function validateComponentUsage(
  userCode: string,
  componentName: string,
  requiredProps?: string[],
): ValidationResult {
  // Remove whitespace for easier validation
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();

  // Check if component is used
  if (
    !normalizedCode.includes(`<${componentName}`) &&
    !normalizedCode.includes(`<${componentName}/>`)
  ) {
    return {
      isValid: false,
      message: `Your code should include the ${componentName} component`,
      hints: [`Try using <${componentName} />`],
    };
  }

  // Check required props
  if (requiredProps) {
    const missingProps = requiredProps.filter((prop) => !normalizedCode.includes(prop));

    if (missingProps.length > 0) {
      return {
        isValid: false,
        message: `Missing required props: ${missingProps.join(', ')}`,
        hints: missingProps.map((prop) => `Add ${prop} to your ${componentName}`),
      };
    }
  }

  return {
    isValid: true,
    message: 'Great job! Your code is correct.',
  };
}

export function validatePropValue(
  userCode: string,
  propName: string,
  expectedValue: string,
): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();

  // Check for both quote styles
  const patterns = [
    `${propName}="${expectedValue}"`,
    `${propName}='${expectedValue}'`,
    `${propName}={${expectedValue}}`,
    `${propName}={\`${expectedValue}\`}`,
  ];

  const hasCorrectProp = patterns.some((pattern) => normalizedCode.includes(pattern));

  if (!hasCorrectProp) {
    return {
      isValid: false,
      message: `The ${propName} prop should have the value "${expectedValue}"`,
      hints: [`Try setting ${propName}="${expectedValue}"`],
    };
  }

  return {
    isValid: true,
    message: 'Perfect! The prop value is correct.',
  };
}

export function validateMultipleComponents(
  userCode: string,
  components: string[],
): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
  const missingComponents = components.filter(
    (comp) => !normalizedCode.includes(`<${comp}`) && !normalizedCode.includes(`<${comp}/>`),
  );

  if (missingComponents.length > 0) {
    return {
      isValid: false,
      message: `Missing components: ${missingComponents.join(', ')}`,
      hints: missingComponents.map((comp) => `Add a <${comp} /> component`),
    };
  }

  return {
    isValid: true,
    message: 'Excellent! All required components are present.',
  };
}

export function validateEventHandler(userCode: string, eventName: string): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();

  if (!normalizedCode.includes(eventName)) {
    return {
      isValid: false,
      message: `Your component should handle the ${eventName} event`,
      hints: [`Add ${eventName}={handleClick} or similar`],
    };
  }

  return {
    isValid: true,
    message: 'Nice work! The event handler is properly connected.',
  };
}

export function validateImports(userCode: string, requiredImports: string[]): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
  const missingImports = requiredImports.filter((imp) => !normalizedCode.includes(imp));

  if (missingImports.length > 0) {
    return {
      isValid: false,
      message: `Missing imports: ${missingImports.join(', ')}`,
      hints: missingImports.map((imp) => `Import ${imp} from the design system`),
    };
  }

  return {
    isValid: true,
    message: 'All necessary imports are in place!',
  };
}

export function validateThemeUsage(userCode: string): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();

  const themePatterns = ['useTheme', 'ThemeProvider', 'theme.', 'currentTheme'];

  const hasTheme = themePatterns.some((pattern) => normalizedCode.includes(pattern));

  if (!hasTheme) {
    return {
      isValid: false,
      message: 'Your code should use the theme system',
      hints: ['Import and use the useTheme hook', 'Or wrap your component with ThemeProvider'],
    };
  }

  return {
    isValid: true,
    message: "Great! You're using the theme system correctly.",
  };
}

export function validateAccessibility(
  userCode: string,
  requiredAttributes: string[],
): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
  const missingAttributes = requiredAttributes.filter((attr) => !normalizedCode.includes(attr));

  if (missingAttributes.length > 0) {
    return {
      isValid: false,
      message: `Missing accessibility attributes: ${missingAttributes.join(', ')}`,
      hints: [
        'Remember to make your components accessible',
        ...missingAttributes.map((attr) => `Add ${attr} attribute`),
      ],
    };
  }

  return {
    isValid: true,
    message: 'Excellent! Your component is accessible.',
  };
}

export function validateCodeStructure(
  userCode: string,
  requiredPatterns: string[],
): ValidationResult {
  const normalizedCode = userCode.replace(/\s+/g, ' ').trim();
  const missingPatterns = requiredPatterns.filter((pattern) => !normalizedCode.includes(pattern));

  if (missingPatterns.length > 0) {
    return {
      isValid: false,
      message: 'Your code structure needs some adjustments',
      hints: requiredPatterns
        .map((pattern, index) =>
          missingPatterns.includes(pattern) ? `Step ${index + 1} is incomplete` : null,
        )
        .filter(Boolean) as string[],
    };
  }

  return {
    isValid: true,
    message: 'Perfect! Your code structure is correct.',
  };
}
