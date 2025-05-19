// Global type declarations for the application

declare global {
  interface Window {
    /**
     * Sets the current theme of the application
     * @param theme The theme to set ('light' or 'dark')
     */
    __setTheme: (theme: 'light' | 'dark') => void;
  }
}

// This file doesn't export anything, it just augments the global scope
export {};
