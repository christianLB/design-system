import { lightTheme, ThemeTokens } from './theme.light';
import { darkTheme } from './theme.dark';
import { 
  futuristicTheme, 
  futuristicThemeProfessional, 
  futuristicThemeHighContrast 
} from './theme.futuristic';
import { 
  futuristicConfig, 
  defaultFuturisticConfig,
  type FuturisticConfig 
} from './theme.futuristic.config';
import { cyberpunkTheme, type CyberpunkTheme } from './theme.cyberpunk';
import { alienTheme, type AlienTheme } from './theme.alien';

export type DesignTokens = ThemeTokens;
export type { FuturisticConfig, CyberpunkTheme, AlienTheme };

export { 
  lightTheme, 
  darkTheme, 
  futuristicTheme,
  futuristicThemeProfessional,
  futuristicThemeHighContrast,
  futuristicConfig,
  defaultFuturisticConfig,
  cyberpunkTheme,
  alienTheme
};

export const theme = lightTheme;
export default theme;
