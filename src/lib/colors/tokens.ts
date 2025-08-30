/**
 * Theme token definitions and groupings
 * Aligned with the PRD and system_prompt.txt specifications
 */

export const TOKEN_GROUPS: Record<string, string[]> = {
  brand: ['primary', 'secondary', 'accent', 'ring'],
  surfaces: ['background', 'card', 'popover', 'muted', 'sidebar'],
  typography: ['font-sans', 'font-serif', 'font-mono'],
  contrast: ['background', 'card', 'popover', 'muted', 'primary', 'secondary', 'accent', 'destructive', 'sidebar'],
  chart: ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'],
  sidebar: ['sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground', 'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring'],
  shadows: ['shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-offset-x', 'shadow-offset-y'],
  other: ['radius', 'letter-spacing', 'border', 'input', 'destructive', 'destructive-foreground']
};

export const FOREGROUND_PAIRS = {
  background: 'foreground',
  card: 'card-foreground',
  popover: 'popover-foreground',
  primary: 'primary-foreground',
  secondary: 'secondary-foreground',
  muted: 'muted-foreground',
  accent: 'accent-foreground',
  destructive: 'destructive-foreground',
  sidebar: 'sidebar-foreground',
  'sidebar-primary': 'sidebar-primary-foreground',
  'sidebar-accent': 'sidebar-accent-foreground'
} as const;

export const ALL_TOKENS = [
  // Color pairs
  'background', 'foreground',
  'card', 'card-foreground',
  'popover', 'popover-foreground',
  'primary', 'primary-foreground',
  'secondary', 'secondary-foreground',
  'muted', 'muted-foreground',
  'accent', 'accent-foreground',
  'destructive', 'destructive-foreground',
  'border', 'input', 'ring',
  
  // Chart colors
  'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
  
  // Sidebar colors
  'sidebar', 'sidebar-foreground',
  'sidebar-primary', 'sidebar-primary-foreground',
  'sidebar-accent', 'sidebar-accent-foreground',
  'sidebar-border', 'sidebar-ring',
  
  // Typography
  'font-sans', 'font-serif', 'font-mono',
  
  // Other
  'radius', 'letter-spacing',
  
  // Shadows
  'shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-offset-x', 'shadow-offset-y'
] as const;

export type TokenName = typeof ALL_TOKENS[number];
export type TokenGroup = keyof typeof TOKEN_GROUPS;

/**
 * Checks if a token belongs to a specific group
 */
export function isTokenInGroup(token: string, group: TokenGroup): boolean {
  return TOKEN_GROUPS[group].includes(token as TokenName);
}

/**
 * Gets all tokens that have foreground pairs
 */
export function getTokensWithForeground(): string[] {
  return Object.keys(FOREGROUND_PAIRS);
}

/**
 * Gets the foreground token for a given background token
 */
export function getForegroundToken(backgroundToken: string): string | undefined {
  return FOREGROUND_PAIRS[backgroundToken as keyof typeof FOREGROUND_PAIRS];
}

/**
 * Checks if a token is a color token (has a foreground pair or is standalone)
 */
export function isColorToken(token: string): boolean {
  const hasToken = ALL_TOKENS.includes(token as TokenName);
  const isChart = token.includes('chart');
  const isRing = token.includes('ring');
  const isBorder = token.includes('border');
  const isInput = token.includes('input');
  const hasForegroundPair = !!FOREGROUND_PAIRS[token as keyof typeof FOREGROUND_PAIRS];
  const isForegroundValue = Object.values(FOREGROUND_PAIRS).some(value => value === token);
  
  return hasToken && (isChart || isRing || isBorder || isInput || hasForegroundPair || isForegroundValue);
}

/**
 * Checks if a token is a non-color token (fonts, radius, shadows, etc.)
 */
export function isNonColorToken(token: string): boolean {
  return token.startsWith('font-') || 
         token === 'radius' || 
         token === 'letter-spacing' ||
         token.startsWith('shadow-');
}
