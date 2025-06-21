import { lightTheme, ThemeTokens } from './theme.light';
import { darkTheme } from './theme.dark';
import { futuristicTheme } from './theme.futuristic';

export type DesignTokens = ThemeTokens;

export { lightTheme, darkTheme, futuristicTheme };
export const theme = lightTheme;
export default theme;
