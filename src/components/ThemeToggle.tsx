// ThemeToggle.tsx
// Simple button to toggle dark/light mode, persists in localStorage
'use client';

import { useTheme } from '../contexts/ThemeContext';

/**
 * Componente ThemeToggle.
 * @component
 * @example
 * import { ThemeToggle } from "@/components/ThemeToggle"
 *
 * function App() {
 *   return <ThemeToggle />
 * }
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded px-2 py-1 border bg-card text-card-foreground hover:bg-muted transition-colors"
      onClick={toggleTheme}
      style={{ minWidth: 40 }}
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="var(--color-primary)" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="var(--color-primary)" strokeWidth="2"/></svg>
      ) : (
        // Moon icon
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" stroke="var(--color-primary)" strokeWidth="2"/></svg>
      )}
    </button>
  );
}
