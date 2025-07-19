import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
import { Button } from '../Button/Button';

// Basic SVG icons for sun, moon and star
const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
  </svg>
);

const CyberpunkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Matrix-style grid */}
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="3" y="15" width="6" height="6" rx="1" />
    <rect x="15" y="15" width="6" height="6" rx="1" />
    {/* Central connection */}
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    {/* Connection lines */}
    <line x1="9" y1="6" x2="12" y2="10" />
    <line x1="15" y1="6" x2="12" y2="10" />
    <line x1="9" y1="18" x2="12" y2="14" />
    <line x1="15" y1="18" x2="12" y2="14" />
  </svg>
);

const AlienIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Alien head outline */}
    <ellipse cx="12" cy="10" rx="6" ry="8" />
    {/* Large alien eyes */}
    <ellipse cx="9" cy="9" rx="1.5" ry="2" fill="currentColor" />
    <ellipse cx="15" cy="9" rx="1.5" ry="2" fill="currentColor" />
    {/* Small mouth */}
    <line x1="12" y1="13" x2="12" y2="14" />
    {/* Tentacle-like extensions */}
    <path d="M6 16 Q4 18 5 20" />
    <path d="M18 16 Q20 18 19 20" />
    <path d="M8 17 Q6 19 7 21" />
    <path d="M16 17 Q18 19 17 21" />
  </svg>
);

export const DarkThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Define the theme rotation order
  const themeOrder = ['light', 'dark', 'futuristic', 'cyberpunk', 'alien'] as const;
  
  const toggleTheme = () => {
    console.log('Current theme:', theme);
    console.log('Theme type:', typeof theme);
    
    // Find current theme index and get next theme
    const currentIndex = themeOrder.findIndex(t => t === theme);
    console.log('Current index:', currentIndex);
    
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const nextTheme = themeOrder[nextIndex];
    
    console.log('Next index:', nextIndex);
    console.log('Next theme:', nextTheme);
    console.log('Theme order:', themeOrder);
    
    setTheme(nextTheme);
  };

  // Get the icon and label for current theme
  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return { icon: <MoonIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch to Dark' };
      case 'dark':
        return { icon: <StarIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch to Futuristic' };
      case 'futuristic':
        return { icon: <CyberpunkIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch to Cyberpunk' };
      case 'cyberpunk':
        return { icon: <AlienIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch to Alien' };
      case 'alien':
        return { icon: <SunIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch to Light' };
      default:
        return { icon: <SunIcon className="h-[1.2rem] w-[1.2rem]" />, label: 'Switch Theme' };
    }
  };

  const { icon, label } = getThemeInfo();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="sm"
      aria-label={label}
      title={`Current: ${theme} | ${label}`}
    >
      {icon}
    </Button>
  );
};

// Export with better name that reflects full functionality
export const ThemeRotator = DarkThemeToggle;
