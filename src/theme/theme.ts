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

export type DesignTokens = ThemeTokens;
export type { FuturisticConfig };

export { 
  lightTheme, 
  darkTheme, 
  futuristicTheme,
  futuristicThemeProfessional,
  futuristicThemeHighContrast,
  futuristicConfig,
  defaultFuturisticConfig
};

export const theme = lightTheme;
export default theme;
