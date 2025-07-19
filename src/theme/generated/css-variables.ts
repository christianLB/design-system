/**
 * CSS Variable Type Definitions
 * Generated automatically from TypeScript theme tokens
 * DO NOT EDIT MANUALLY - This file is auto-generated
 */

export interface CSSVariables {
  '--primary-50': string;
  '--primary-100': string;
  '--primary-200': string;
  '--primary-300': string;
  '--primary-400': string;
  '--primary-500': string;
  '--primary-600': string;
  '--primary-700': string;
  '--primary-800': string;
  '--primary-900': string;
  '--primary-950': string;
  '--primary-default': string;
  '--primary-foreground': string;
  '--primary-background': string;
  '--primary-border': string;
  '--primary-muted': string;
  '--primary-accent': string;
  '--secondary-50': string;
  '--secondary-100': string;
  '--secondary-200': string;
  '--secondary-300': string;
  '--secondary-400': string;
  '--secondary-500': string;
  '--secondary-600': string;
  '--secondary-700': string;
  '--secondary-800': string;
  '--secondary-900': string;
  '--secondary-950': string;
  '--secondary-default': string;
  '--secondary-foreground': string;
  '--secondary-background': string;
  '--secondary-border': string;
  '--secondary-muted': string;
  '--secondary-accent': string;
  '--destructive-50': string;
  '--destructive-100': string;
  '--destructive-200': string;
  '--destructive-300': string;
  '--destructive-400': string;
  '--destructive-500': string;
  '--destructive-600': string;
  '--destructive-700': string;
  '--destructive-800': string;
  '--destructive-900': string;
  '--destructive-950': string;
  '--destructive-default': string;
  '--destructive-foreground': string;
  '--destructive-background': string;
  '--destructive-border': string;
  '--destructive-muted': string;
  '--destructive-accent': string;
  '--success-50': string;
  '--success-100': string;
  '--success-200': string;
  '--success-300': string;
  '--success-400': string;
  '--success-500': string;
  '--success-600': string;
  '--success-700': string;
  '--success-800': string;
  '--success-900': string;
  '--success-950': string;
  '--success-default': string;
  '--success-foreground': string;
  '--success-background': string;
  '--success-border': string;
  '--success-muted': string;
  '--success-accent': string;
  '--warning-50': string;
  '--warning-100': string;
  '--warning-200': string;
  '--warning-300': string;
  '--warning-400': string;
  '--warning-500': string;
  '--warning-600': string;
  '--warning-700': string;
  '--warning-800': string;
  '--warning-900': string;
  '--warning-950': string;
  '--warning-default': string;
  '--warning-foreground': string;
  '--warning-background': string;
  '--warning-border': string;
  '--warning-muted': string;
  '--warning-accent': string;
  '--background': string;
  '--foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  '--border': string;
  '--input': string;
  '--ring': string;
  '--muted': string;
  '--muted-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
}

export type CSSVariableName = keyof CSSVariables;

export const cssVariableNames: CSSVariableName[] = [
  '--primary-50',
  '--primary-100',
  '--primary-200',
  '--primary-300',
  '--primary-400',
  '--primary-500',
  '--primary-600',
  '--primary-700',
  '--primary-800',
  '--primary-900',
  '--primary-950',
  '--primary-default',
  '--primary-foreground',
  '--primary-background',
  '--primary-border',
  '--primary-muted',
  '--primary-accent',
  '--secondary-50',
  '--secondary-100',
  '--secondary-200',
  '--secondary-300',
  '--secondary-400',
  '--secondary-500',
  '--secondary-600',
  '--secondary-700',
  '--secondary-800',
  '--secondary-900',
  '--secondary-950',
  '--secondary-default',
  '--secondary-foreground',
  '--secondary-background',
  '--secondary-border',
  '--secondary-muted',
  '--secondary-accent',
  '--destructive-50',
  '--destructive-100',
  '--destructive-200',
  '--destructive-300',
  '--destructive-400',
  '--destructive-500',
  '--destructive-600',
  '--destructive-700',
  '--destructive-800',
  '--destructive-900',
  '--destructive-950',
  '--destructive-default',
  '--destructive-foreground',
  '--destructive-background',
  '--destructive-border',
  '--destructive-muted',
  '--destructive-accent',
  '--success-50',
  '--success-100',
  '--success-200',
  '--success-300',
  '--success-400',
  '--success-500',
  '--success-600',
  '--success-700',
  '--success-800',
  '--success-900',
  '--success-950',
  '--success-default',
  '--success-foreground',
  '--success-background',
  '--success-border',
  '--success-muted',
  '--success-accent',
  '--warning-50',
  '--warning-100',
  '--warning-200',
  '--warning-300',
  '--warning-400',
  '--warning-500',
  '--warning-600',
  '--warning-700',
  '--warning-800',
  '--warning-900',
  '--warning-950',
  '--warning-default',
  '--warning-foreground',
  '--warning-background',
  '--warning-border',
  '--warning-muted',
  '--warning-accent',
  '--background',
  '--foreground',
  '--card',
  '--card-foreground',
  '--popover',
  '--popover-foreground',
  '--border',
  '--input',
  '--ring',
  '--muted',
  '--muted-foreground',
  '--accent',
  '--accent-foreground',
];

/**
 * Get a CSS variable value
 */
export function getCSSVariable(name: CSSVariableName): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

/**
 * Set a CSS variable value
 */
export function setCSSVariable(name: CSSVariableName, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

/**
 * Remove a CSS variable
 */
export function removeCSSVariable(name: CSSVariableName): void {
  document.documentElement.style.removeProperty(name);
}
