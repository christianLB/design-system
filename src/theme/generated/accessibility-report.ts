/**
 * Accessibility Report
 * Generated automatically from color token validation
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

export const accessibilityReport = [
  {
    "theme": "light",
    "validation": {
      "valid": false,
      "issues": [
        "primary: foreground/background combination fails WCAG AA",
        "secondary: foreground/background combination fails WCAG AA",
        "destructive: foreground/background combination fails WCAG AA",
        "success: foreground/background combination fails WCAG AA",
        "warning: foreground/background combination fails WCAG AA"
      ],
      "recommendations": [
        "primary: Current ratio 1.07, needs 4.5+",
        "secondary: Current ratio 1.31, needs 4.5+",
        "destructive: Current ratio 1.09, needs 4.5+",
        "success: Current ratio 1.40, needs 4.5+",
        "warning: Current ratio 1.13, needs 4.5+"
      ]
    },
    "details": {
      "primaryContrast": false,
      "secondaryContrast": false,
      "backgroundContrast": true,
      "destructiveContrast": false,
      "successContrast": false,
      "warningContrast": false
    }
  },
  {
    "theme": "dark",
    "validation": {
      "valid": false,
      "issues": [
        "secondary: foreground/background combination fails WCAG AA",
        "destructive: foreground/background combination fails WCAG AA",
        "warning: foreground/background combination fails WCAG AA"
      ],
      "recommendations": [
        "secondary: Current ratio 3.28, needs 4.5+",
        "destructive: Current ratio 2.92, needs 4.5+",
        "warning: Current ratio 3.18, needs 4.5+"
      ]
    },
    "details": {
      "primaryContrast": true,
      "secondaryContrast": false,
      "backgroundContrast": true,
      "destructiveContrast": false,
      "successContrast": true,
      "warningContrast": false
    }
  },
  {
    "theme": "futuristic",
    "validation": {
      "valid": false,
      "issues": [
        "primary: foreground/background combination fails WCAG AA",
        "secondary: foreground/background combination fails WCAG AA",
        "destructive: foreground/background combination fails WCAG AA",
        "warning: foreground/background combination fails WCAG AA"
      ],
      "recommendations": [
        "primary: Current ratio 4.20, needs 4.5+",
        "secondary: Current ratio 4.38, needs 4.5+",
        "destructive: Current ratio 2.92, needs 4.5+",
        "warning: Current ratio 3.18, needs 4.5+"
      ]
    },
    "details": {
      "primaryContrast": false,
      "secondaryContrast": false,
      "backgroundContrast": true,
      "destructiveContrast": false,
      "successContrast": true,
      "warningContrast": false
    }
  }
];

export const accessibilitySummary = {
  totalThemes: 3,
  validThemes: 0,
  issues: 12,
  recommendations: 12,
};

export function printAccessibilityReport(): void {
  console.log('\n=== Accessibility Report ===');
  console.log(`Total themes: \${accessibilitySummary.totalThemes}`);
  console.log(`Valid themes: \${accessibilitySummary.validThemes}`);
  console.log(`Total issues: \${accessibilitySummary.issues}`);
  console.log(`Total recommendations: \${accessibilitySummary.recommendations}`);
  
  accessibilityReport.forEach(report => {
    console.log(`\n--- \${report.theme.toUpperCase()} Theme ---`);
    console.log(`Valid: \${report.validation.valid}`);
    
    if (report.validation.issues.length > 0) {
      console.log('Issues:');
      report.validation.issues.forEach(issue => console.log(`  - \${issue}`));
    }
    
    if (report.validation.recommendations.length > 0) {
      console.log('Recommendations:');
      report.validation.recommendations.forEach(rec => console.log(`  - \${rec}`));
    }
  });
}
