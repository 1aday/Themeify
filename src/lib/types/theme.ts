/**
 * Theme response schema that exactly matches the system_prompt.txt specification
 * This is the source of truth for the JSON structure that OpenAI must return
 */

export interface ThemeResponse {
  text: string;
  theme: {
    light: LightTheme;
    dark: DarkTheme;
  };
}

export interface LightTheme {
  // Surfaces
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  
  // Brand colors
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  accent: string;
  'accent-foreground': string;
  
  // UI elements
  muted: string;
  'muted-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  
  // Chart colors
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
  
  // Sidebar
  sidebar: string;
  'sidebar-foreground': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
  'sidebar-accent': string;
  'sidebar-accent-foreground': string;
  'sidebar-border': string;
  'sidebar-ring': string;
  
  // Typography
  'font-sans': string;
  'font-serif': string;
  'font-mono': string;
  
  // Layout
  radius: string;
  'letter-spacing': string;
  
  // Shadows
  'shadow-color': string;
  'shadow-opacity': string;
  'shadow-blur': string;
  'shadow-spread': string;
  'shadow-offset-x': string;
  'shadow-offset-y': string;
}

export interface DarkTheme extends LightTheme {}

// Validation function to ensure the response matches the schema
export function validateThemeResponse(response: unknown): response is ThemeResponse {
  if (!response || typeof response !== 'object') return false;
  
  const obj = response as Record<string, unknown>;
  if (!obj.theme || typeof obj.theme !== 'object') return false;
  if (!obj.text || typeof obj.text !== 'string') return false;
  
  const theme = obj.theme as Record<string, unknown>;
  if (!theme.light || !theme.dark) return false;
  
  // Check that all required properties exist in both light and dark themes
  const requiredProperties = [
    'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
    'primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'accent', 'accent-foreground',
    'muted', 'muted-foreground', 'destructive', 'destructive-foreground', 'border', 'input', 'ring',
    'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
    'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
    'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',
    'font-sans', 'font-serif', 'font-mono', 'radius', 'letter-spacing',
    'shadow-color', 'shadow-opacity', 'shadow-blur', 'shadow-spread', 'shadow-offset-x', 'shadow-offset-y'
  ];
  
  for (const prop of requiredProperties) {
    if (!(prop in (theme.light as Record<string, unknown>)) || !(prop in (theme.dark as Record<string, unknown>))) return false;
    if (typeof (theme.light as Record<string, unknown>)[prop] !== 'string') return false;
    if (typeof (theme.dark as Record<string, unknown>)[prop] !== 'string') return false;
  }
  
  return true;
}
