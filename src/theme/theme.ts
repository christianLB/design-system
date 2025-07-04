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

export type DesignTokens = ThemeTokens;
export type { FuturisticConfig, CyberpunkTheme };

export { 
  lightTheme, 
  darkTheme, 
  futuristicTheme,
  futuristicThemeProfessional,
  futuristicThemeHighContrast,
  futuristicConfig,
  defaultFuturisticConfig,
  cyberpunkTheme
};

export const theme = lightTheme;
export default theme;
