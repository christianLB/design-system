import { generateColorScale, generateSemanticColors } from '../utils/colorScale';

/**
 * Base color definitions for generating scales
 */
export const baseColors = {
  // Primary colors
  blue: '#2563eb',
  indigo: '#4f46e5',
  purple: '#7c3aed',
  pink: '#db2777',

  // Secondary colors
  green: '#059669',
  teal: '#0d9488',
  cyan: '#0891b2',
  orange: '#ea580c',
  red: '#dc2626',

  // Neutral colors
  gray: '#64748b',
  slate: '#475569',
  zinc: '#52525b',
  neutral: '#525252',
  stone: '#57534e',

  // Cyberpunk colors
  matrixGreen: '#39ff14',
  doomRed: '#ff0000',
  evangelionPurple: '#6a0dad',
  swordfishCyan: '#00ffff',
  techOrange: '#ff6600',
  cyberYellow: '#ffff00',
  hotPink: '#ff1493',
  voidBlack: '#000000',

  // Alien biomechanical colors
  steelOrganic: '#708090',
  pulsingLife: '#e56e47',
  adrenaline: '#d4552f',
  ancientBlood: '#6b7280',
  primordialVoid: '#0d1117',
} as const;

/**
 * Generated color scales (50-950) from base colors
 */
export const colorScales = {
  blue: generateColorScale(baseColors.blue),
  indigo: generateColorScale(baseColors.indigo),
  purple: generateColorScale(baseColors.purple),
  pink: generateColorScale(baseColors.pink),
  green: generateColorScale(baseColors.green),
  teal: generateColorScale(baseColors.teal),
  cyan: generateColorScale(baseColors.cyan),
  orange: generateColorScale(baseColors.orange),
  red: generateColorScale(baseColors.red),
  gray: generateColorScale(baseColors.gray),
  slate: generateColorScale(baseColors.slate),
  zinc: generateColorScale(baseColors.zinc),
  neutral: generateColorScale(baseColors.neutral),
  stone: generateColorScale(baseColors.stone),

  // Cyberpunk color scales
  matrixGreen: generateColorScale(baseColors.matrixGreen),
  doomRed: generateColorScale(baseColors.doomRed),
  evangelionPurple: generateColorScale(baseColors.evangelionPurple),
  swordfishCyan: generateColorScale(baseColors.swordfishCyan),
  techOrange: generateColorScale(baseColors.techOrange),
  cyberYellow: generateColorScale(baseColors.cyberYellow),
  hotPink: generateColorScale(baseColors.hotPink),
  voidBlack: generateColorScale(baseColors.voidBlack),

  // Alien biomechanical color scales
  steelOrganic: generateColorScale(baseColors.steelOrganic),
  pulsingLife: generateColorScale(baseColors.pulsingLife),
  adrenaline: generateColorScale(baseColors.adrenaline),
  ancientBlood: generateColorScale(baseColors.ancientBlood),
  primordialVoid: generateColorScale(baseColors.primordialVoid),
} as const;

/**
 * Semantic color token definitions
 */
export interface SemanticColorTokens {
  // Primary colors
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    DEFAULT: string;
    foreground: string;
    background: string;
    border: string;
    muted: string;
    accent: string;
  };

  // Secondary colors
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    DEFAULT: string;
    foreground: string;
    background: string;
    border: string;
    muted: string;
    accent: string;
  };

  // Destructive/Error colors
  destructive: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    DEFAULT: string;
    foreground: string;
    background: string;
    border: string;
    muted: string;
    accent: string;
  };

  // Success colors
  success: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    DEFAULT: string;
    foreground: string;
    background: string;
    border: string;
    muted: string;
    accent: string;
  };

  // Warning colors
  warning: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
    DEFAULT: string;
    foreground: string;
    background: string;
    border: string;
    muted: string;
    accent: string;
  };

  // Surface colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;

  // Border colors
  border: string;
  input: string;
  ring: string;

  // Text colors
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
}

/**
 * Generate semantic color tokens from base colors
 */
function generateSemanticTokens(
  primaryColor: string,
  secondaryColor: string,
  destructiveColor: string,
  successColor: string,
  warningColor: string,
): SemanticColorTokens {
  const primaryScale = generateColorScale(primaryColor);
  const primarySemantic = generateSemanticColors(primaryColor);

  const secondaryScale = generateColorScale(secondaryColor);
  const secondarySemantic = generateSemanticColors(secondaryColor);

  const destructiveScale = generateColorScale(destructiveColor);
  const destructiveSemantic = generateSemanticColors(destructiveColor);

  const successScale = generateColorScale(successColor);
  const successSemantic = generateSemanticColors(successColor);

  const warningScale = generateColorScale(warningColor);
  const warningSemantic = generateSemanticColors(warningColor);

  return {
    primary: {
      50: primaryScale['50'],
      100: primaryScale['100'],
      200: primaryScale['200'],
      300: primaryScale['300'],
      400: primaryScale['400'],
      500: primaryScale['500'],
      600: primaryScale['600'],
      700: primaryScale['700'],
      800: primaryScale['800'],
      900: primaryScale['900'],
      950: primaryScale['950'],
      DEFAULT: primaryColor,
      foreground: primarySemantic.foreground,
      background: primarySemantic.background,
      border: primarySemantic.border,
      muted: primarySemantic.muted,
      accent: primarySemantic.accent,
    },
    secondary: {
      50: secondaryScale['50'],
      100: secondaryScale['100'],
      200: secondaryScale['200'],
      300: secondaryScale['300'],
      400: secondaryScale['400'],
      500: secondaryScale['500'],
      600: secondaryScale['600'],
      700: secondaryScale['700'],
      800: secondaryScale['800'],
      900: secondaryScale['900'],
      950: secondaryScale['950'],
      DEFAULT: secondaryColor,
      foreground: secondarySemantic.foreground,
      background: secondarySemantic.background,
      border: secondarySemantic.border,
      muted: secondarySemantic.muted,
      accent: secondarySemantic.accent,
    },
    destructive: {
      50: destructiveScale['50'],
      100: destructiveScale['100'],
      200: destructiveScale['200'],
      300: destructiveScale['300'],
      400: destructiveScale['400'],
      500: destructiveScale['500'],
      600: destructiveScale['600'],
      700: destructiveScale['700'],
      800: destructiveScale['800'],
      900: destructiveScale['900'],
      950: destructiveScale['950'],
      DEFAULT: destructiveColor,
      foreground: destructiveSemantic.foreground,
      background: destructiveSemantic.background,
      border: destructiveSemantic.border,
      muted: destructiveSemantic.muted,
      accent: destructiveSemantic.accent,
    },
    success: {
      50: successScale['50'],
      100: successScale['100'],
      200: successScale['200'],
      300: successScale['300'],
      400: successScale['400'],
      500: successScale['500'],
      600: successScale['600'],
      700: successScale['700'],
      800: successScale['800'],
      900: successScale['900'],
      950: successScale['950'],
      DEFAULT: successColor,
      foreground: successSemantic.foreground,
      background: successSemantic.background,
      border: successSemantic.border,
      muted: successSemantic.muted,
      accent: successSemantic.accent,
    },
    warning: {
      50: warningScale['50'],
      100: warningScale['100'],
      200: warningScale['200'],
      300: warningScale['300'],
      400: warningScale['400'],
      500: warningScale['500'],
      600: warningScale['600'],
      700: warningScale['700'],
      800: warningScale['800'],
      900: warningScale['900'],
      950: warningScale['950'],
      DEFAULT: warningColor,
      foreground: warningSemantic.foreground,
      background: warningSemantic.background,
      border: warningSemantic.border,
      muted: warningSemantic.muted,
      accent: warningSemantic.accent,
    },
    background: '#ffffff',
    foreground: '#0a0a0a',
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    popover: '#ffffff',
    popoverForeground: '#0a0a0a',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: primaryColor,
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    accent: '#f4f4f5',
    accentForeground: '#0a0a0a',
  };
}

/**
 * Light theme color tokens
 */
export const lightColorTokens = generateSemanticTokens(
  baseColors.blue, // primary
  baseColors.slate, // secondary
  baseColors.red, // destructive
  baseColors.green, // success
  baseColors.orange, // warning
);

/**
 * Dark theme color tokens
 */
export const darkColorTokens: SemanticColorTokens = {
  primary: {
    50: colorScales.blue['50'],
    100: colorScales.blue['100'],
    200: colorScales.blue['200'],
    300: colorScales.blue['300'],
    400: colorScales.blue['400'],
    500: colorScales.blue['500'],
    600: colorScales.blue['600'],
    700: colorScales.blue['700'],
    800: colorScales.blue['800'],
    900: colorScales.blue['900'],
    950: colorScales.blue['950'],
    DEFAULT: baseColors.blue,
    foreground: '#ffffff',
    background: '#1e293b',
    border: generateSemanticColors(baseColors.blue).border,
    muted: generateSemanticColors(baseColors.blue).muted,
    accent: generateSemanticColors(baseColors.blue).accent,
  },
  secondary: {
    50: colorScales.slate['50'],
    100: colorScales.slate['100'],
    200: colorScales.slate['200'],
    300: colorScales.slate['300'],
    400: colorScales.slate['400'],
    500: colorScales.slate['500'],
    600: colorScales.slate['600'],
    700: colorScales.slate['700'],
    800: colorScales.slate['800'],
    900: colorScales.slate['900'],
    950: colorScales.slate['950'],
    DEFAULT: baseColors.slate,
    foreground: '#ffffff',
    background: '#334155',
    border: generateSemanticColors(baseColors.slate).border,
    muted: generateSemanticColors(baseColors.slate).muted,
    accent: generateSemanticColors(baseColors.slate).accent,
  },
  destructive: {
    50: colorScales.red['50'],
    100: colorScales.red['100'],
    200: colorScales.red['200'],
    300: colorScales.red['300'],
    400: colorScales.red['400'],
    500: colorScales.red['500'],
    600: colorScales.red['600'],
    700: colorScales.red['700'],
    800: colorScales.red['800'],
    900: colorScales.red['900'],
    950: colorScales.red['950'],
    DEFAULT: baseColors.red,
    foreground: '#ffffff',
    background: '#7f1d1d',
    border: generateSemanticColors(baseColors.red).border,
    muted: generateSemanticColors(baseColors.red).muted,
    accent: generateSemanticColors(baseColors.red).accent,
  },
  success: {
    50: colorScales.green['50'],
    100: colorScales.green['100'],
    200: colorScales.green['200'],
    300: colorScales.green['300'],
    400: colorScales.green['400'],
    500: colorScales.green['500'],
    600: colorScales.green['600'],
    700: colorScales.green['700'],
    800: colorScales.green['800'],
    900: colorScales.green['900'],
    950: colorScales.green['950'],
    DEFAULT: baseColors.green,
    foreground: '#ffffff',
    background: '#064e3b',
    border: generateSemanticColors(baseColors.green).border,
    muted: generateSemanticColors(baseColors.green).muted,
    accent: generateSemanticColors(baseColors.green).accent,
  },
  warning: {
    50: colorScales.orange['50'],
    100: colorScales.orange['100'],
    200: colorScales.orange['200'],
    300: colorScales.orange['300'],
    400: colorScales.orange['400'],
    500: colorScales.orange['500'],
    600: colorScales.orange['600'],
    700: colorScales.orange['700'],
    800: colorScales.orange['800'],
    900: colorScales.orange['900'],
    950: colorScales.orange['950'],
    DEFAULT: baseColors.orange,
    foreground: '#ffffff',
    background: '#7c2d12',
    border: generateSemanticColors(baseColors.orange).border,
    muted: generateSemanticColors(baseColors.orange).muted,
    accent: generateSemanticColors(baseColors.orange).accent,
  },
  background: '#0a0a0a',
  foreground: '#fafafa',
  card: '#0a0a0a',
  cardForeground: '#fafafa',
  popover: '#0a0a0a',
  popoverForeground: '#fafafa',
  border: '#27272a',
  input: '#27272a',
  ring: baseColors.blue,
  muted: '#262626',
  mutedForeground: '#a1a1aa',
  accent: '#27272a',
  accentForeground: '#fafafa',
};

/**
 * Futuristic theme color tokens
 */
export const futuristicColorTokens: SemanticColorTokens = {
  primary: {
    50: colorScales.indigo['50'],
    100: colorScales.indigo['100'],
    200: colorScales.indigo['200'],
    300: colorScales.indigo['300'],
    400: colorScales.indigo['400'],
    500: colorScales.indigo['500'],
    600: colorScales.indigo['600'],
    700: colorScales.indigo['700'],
    800: colorScales.indigo['800'],
    900: colorScales.indigo['900'],
    950: colorScales.indigo['950'],
    DEFAULT: baseColors.indigo,
    foreground: '#ffffff',
    background: '#1e1b4b',
    border: generateSemanticColors(baseColors.indigo).border,
    muted: generateSemanticColors(baseColors.indigo).muted,
    accent: generateSemanticColors(baseColors.indigo).accent,
  },
  secondary: {
    50: colorScales.teal['50'],
    100: colorScales.teal['100'],
    200: colorScales.teal['200'],
    300: colorScales.teal['300'],
    400: colorScales.teal['400'],
    500: colorScales.teal['500'],
    600: colorScales.teal['600'],
    700: colorScales.teal['700'],
    800: colorScales.teal['800'],
    900: colorScales.teal['900'],
    950: colorScales.teal['950'],
    DEFAULT: baseColors.teal,
    foreground: '#ffffff',
    background: '#134e4a',
    border: generateSemanticColors(baseColors.teal).border,
    muted: generateSemanticColors(baseColors.teal).muted,
    accent: generateSemanticColors(baseColors.teal).accent,
  },
  destructive: {
    50: colorScales.red['50'],
    100: colorScales.red['100'],
    200: colorScales.red['200'],
    300: colorScales.red['300'],
    400: colorScales.red['400'],
    500: colorScales.red['500'],
    600: colorScales.red['600'],
    700: colorScales.red['700'],
    800: colorScales.red['800'],
    900: colorScales.red['900'],
    950: colorScales.red['950'],
    DEFAULT: baseColors.red,
    foreground: '#ffffff',
    background: '#7f1d1d',
    border: generateSemanticColors(baseColors.red).border,
    muted: generateSemanticColors(baseColors.red).muted,
    accent: generateSemanticColors(baseColors.red).accent,
  },
  success: {
    50: colorScales.green['50'],
    100: colorScales.green['100'],
    200: colorScales.green['200'],
    300: colorScales.green['300'],
    400: colorScales.green['400'],
    500: colorScales.green['500'],
    600: colorScales.green['600'],
    700: colorScales.green['700'],
    800: colorScales.green['800'],
    900: colorScales.green['900'],
    950: colorScales.green['950'],
    DEFAULT: baseColors.green,
    foreground: '#ffffff',
    background: '#064e3b',
    border: generateSemanticColors(baseColors.green).border,
    muted: generateSemanticColors(baseColors.green).muted,
    accent: generateSemanticColors(baseColors.green).accent,
  },
  warning: {
    50: colorScales.orange['50'],
    100: colorScales.orange['100'],
    200: colorScales.orange['200'],
    300: colorScales.orange['300'],
    400: colorScales.orange['400'],
    500: colorScales.orange['500'],
    600: colorScales.orange['600'],
    700: colorScales.orange['700'],
    800: colorScales.orange['800'],
    900: colorScales.orange['900'],
    950: colorScales.orange['950'],
    DEFAULT: baseColors.orange,
    foreground: '#ffffff',
    background: '#7c2d12',
    border: generateSemanticColors(baseColors.orange).border,
    muted: generateSemanticColors(baseColors.orange).muted,
    accent: generateSemanticColors(baseColors.orange).accent,
  },
  background: '#0f172a',
  foreground: '#f8fafc',
  card: '#1e293b',
  cardForeground: '#f8fafc',
  popover: '#1e293b',
  popoverForeground: '#f8fafc',
  border: '#334155',
  input: '#334155',
  ring: baseColors.indigo,
  muted: '#1e293b',
  mutedForeground: '#94a3b8',
  accent: '#1e293b',
  accentForeground: '#f8fafc',
};

/**
 * Cyberpunk theme color tokens
 */
export const cyberpunkColorTokens: SemanticColorTokens = {
  primary: {
    50: colorScales.matrixGreen['50'],
    100: colorScales.matrixGreen['100'],
    200: colorScales.matrixGreen['200'],
    300: colorScales.matrixGreen['300'],
    400: colorScales.matrixGreen['400'],
    500: colorScales.matrixGreen['500'],
    600: colorScales.matrixGreen['600'],
    700: colorScales.matrixGreen['700'],
    800: colorScales.matrixGreen['800'],
    900: colorScales.matrixGreen['900'],
    950: colorScales.matrixGreen['950'],
    DEFAULT: baseColors.matrixGreen,
    foreground: '#000000',
    background: '#0d1f0d',
    border: baseColors.matrixGreen,
    muted: '#1a3d1a',
    accent: '#00ff41',
  },
  secondary: {
    50: colorScales.doomRed['50'],
    100: colorScales.doomRed['100'],
    200: colorScales.doomRed['200'],
    300: colorScales.doomRed['300'],
    400: colorScales.doomRed['400'],
    500: colorScales.doomRed['500'],
    600: colorScales.doomRed['600'],
    700: colorScales.doomRed['700'],
    800: colorScales.doomRed['800'],
    900: colorScales.doomRed['900'],
    950: colorScales.doomRed['950'],
    DEFAULT: baseColors.doomRed,
    foreground: '#ffffff',
    background: '#330a0a',
    border: baseColors.doomRed,
    muted: '#661414',
    accent: '#ff3333',
  },
  destructive: {
    50: colorScales.doomRed['50'],
    100: colorScales.doomRed['100'],
    200: colorScales.doomRed['200'],
    300: colorScales.doomRed['300'],
    400: colorScales.doomRed['400'],
    500: colorScales.doomRed['500'],
    600: colorScales.doomRed['600'],
    700: colorScales.doomRed['700'],
    800: colorScales.doomRed['800'],
    900: colorScales.doomRed['900'],
    950: colorScales.doomRed['950'],
    DEFAULT: baseColors.doomRed,
    foreground: '#ffffff',
    background: '#330a0a',
    border: baseColors.doomRed,
    muted: '#661414',
    accent: '#ff3333',
  },
  success: {
    50: colorScales.matrixGreen['50'],
    100: colorScales.matrixGreen['100'],
    200: colorScales.matrixGreen['200'],
    300: colorScales.matrixGreen['300'],
    400: colorScales.matrixGreen['400'],
    500: colorScales.matrixGreen['500'],
    600: colorScales.matrixGreen['600'],
    700: colorScales.matrixGreen['700'],
    800: colorScales.matrixGreen['800'],
    900: colorScales.matrixGreen['900'],
    950: colorScales.matrixGreen['950'],
    DEFAULT: baseColors.matrixGreen,
    foreground: '#000000',
    background: '#0d1f0d',
    border: baseColors.matrixGreen,
    muted: '#1a3d1a',
    accent: '#00ff41',
  },
  warning: {
    50: colorScales.techOrange['50'],
    100: colorScales.techOrange['100'],
    200: colorScales.techOrange['200'],
    300: colorScales.techOrange['300'],
    400: colorScales.techOrange['400'],
    500: colorScales.techOrange['500'],
    600: colorScales.techOrange['600'],
    700: colorScales.techOrange['700'],
    800: colorScales.techOrange['800'],
    900: colorScales.techOrange['900'],
    950: colorScales.techOrange['950'],
    DEFAULT: baseColors.techOrange,
    foreground: '#ffffff',
    background: '#662200',
    border: baseColors.techOrange,
    muted: '#994400',
    accent: '#ff8533',
  },
  // Cyberpunk-specific surface colors
  background: '#000000', // Deep void
  foreground: '#ffffff', // Pure white
  card: '#0a0a0a', // Almost black
  cardForeground: '#ffffff',
  popover: '#1a1a1a', // Dark charcoal
  popoverForeground: '#ffffff',
  border: '#3a3a3a', // Light charcoal
  input: '#2a2a2a', // Medium charcoal
  ring: baseColors.matrixGreen,
  muted: '#1a1a1a', // Dark charcoal
  mutedForeground: '#999999', // Medium gray
  accent: '#2a2a2a', // Medium charcoal
  accentForeground: '#ffffff',
};

/**
 * Alien biomechanical theme color tokens
 */
export const alienColorTokens: SemanticColorTokens = {
  primary: {
    50: colorScales.steelOrganic['50'],
    100: colorScales.steelOrganic['100'],
    200: colorScales.steelOrganic['200'],
    300: colorScales.steelOrganic['300'],
    400: colorScales.steelOrganic['400'],
    500: colorScales.steelOrganic['500'],
    600: colorScales.steelOrganic['600'],
    700: colorScales.steelOrganic['700'],
    800: colorScales.steelOrganic['800'],
    900: colorScales.steelOrganic['900'],
    950: colorScales.steelOrganic['950'],
    DEFAULT: baseColors.steelOrganic,
    foreground: '#f6f7f8',
    background: '#1a1d20',
    border: baseColors.ancientBlood,
    muted: '#323740',
    accent: baseColors.pulsingLife,
  },
  secondary: {
    50: colorScales.pulsingLife['50'],
    100: colorScales.pulsingLife['100'],
    200: colorScales.pulsingLife['200'],
    300: colorScales.pulsingLife['300'],
    400: colorScales.pulsingLife['400'],
    500: colorScales.pulsingLife['500'],
    600: colorScales.pulsingLife['600'],
    700: colorScales.pulsingLife['700'],
    800: colorScales.pulsingLife['800'],
    900: colorScales.pulsingLife['900'],
    950: colorScales.pulsingLife['950'],
    DEFAULT: baseColors.pulsingLife,
    foreground: '#f6f7f8',
    background: '#3d1509',
    border: baseColors.pulsingLife,
    muted: '#752d1b',
    accent: '#e56e47',
  },
  destructive: {
    50: colorScales.adrenaline['50'],
    100: colorScales.adrenaline['100'],
    200: colorScales.adrenaline['200'],
    300: colorScales.adrenaline['300'],
    400: colorScales.adrenaline['400'],
    500: colorScales.adrenaline['500'],
    600: colorScales.adrenaline['600'],
    700: colorScales.adrenaline['700'],
    800: colorScales.adrenaline['800'],
    900: colorScales.adrenaline['900'],
    950: colorScales.adrenaline['950'],
    DEFAULT: baseColors.adrenaline,
    foreground: '#ffffff',
    background: '#b13f26',
    border: baseColors.adrenaline,
    muted: '#8f3520',
    accent: '#d4552f',
  },
  success: {
    50: colorScales.pulsingLife['50'],
    100: colorScales.pulsingLife['100'],
    200: colorScales.pulsingLife['200'],
    300: colorScales.pulsingLife['300'],
    400: colorScales.pulsingLife['400'],
    500: colorScales.pulsingLife['500'],
    600: colorScales.pulsingLife['600'],
    700: colorScales.pulsingLife['700'],
    800: colorScales.pulsingLife['800'],
    900: colorScales.pulsingLife['900'],
    950: colorScales.pulsingLife['950'],
    DEFAULT: baseColors.pulsingLife,
    foreground: '#f6f7f8',
    background: '#3d1509',
    border: baseColors.pulsingLife,
    muted: '#752d1b',
    accent: '#e56e47',
  },
  warning: {
    50: '#fef8f3',
    100: '#fdeee3',
    200: '#fad8c0',
    300: '#f6bb93',
    400: '#f19066',
    500: '#e56e47',
    600: '#d4552f',
    700: '#b13f26',
    800: '#8f3520',
    900: '#752d1b',
    950: '#3d1509',
    DEFAULT: '#f6bb93',
    foreground: '#ffffff',
    background: '#8f3520',
    border: '#f6bb93',
    muted: '#752d1b',
    accent: '#f19066',
  },
  // Alien biomechanical surface colors
  background: '#0d1117', // Primordial void
  foreground: '#f6f7f8', // Text
  card: '#1f2328', // Surface cavity
  cardForeground: '#f6f7f8',
  popover: '#323740', // Surface organ
  popoverForeground: '#f6f7f8',
  border: '#6b7280', // Ancient blood
  input: '#454a52', // Surface tissue
  ring: baseColors.pulsingLife,
  muted: '#565d67', // Surface membrane
  mutedForeground: '#a8aeb5', // Text muted
  accent: '#e56e47', // Pulsing life
  accentForeground: '#f6f7f8',
};

/**
 * Export all color tokens
 */
// Import Mirtha color tokens
import { mirthaColorTokens } from './mirtha-colors';

export { mirthaColorTokens };

export const colorTokens = {
  light: lightColorTokens,
  dark: darkColorTokens,
  futuristic: futuristicColorTokens,
  cyberpunk: cyberpunkColorTokens,
  alien: alienColorTokens,
  mirtha: mirthaColorTokens,
  scales: colorScales,
  base: baseColors,
} as const;

/**
 * Type exports
 */
export type ColorScales = typeof colorScales;
export type BaseColors = typeof baseColors;
export type ColorTokens = typeof colorTokens;
