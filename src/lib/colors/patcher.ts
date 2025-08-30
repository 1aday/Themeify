import { InternalTheme } from './adapter';
import { TOKEN_GROUPS, isTokenInGroup } from './tokens';

/**
 * Intent parsing for theme patching
 * Determines which tokens should be modified based on user request
 */
export interface Intent {
  modes: 'light' | 'dark' | 'both';
  allowShadows: boolean;
  allowFonts: boolean;
  allowTokens: (key: string) => boolean;
}

/**
 * Parses user intent from a prompt
 * Lightweight rule-based parsing as specified in the PRD
 */
export function parseIntent(prompt: string): Intent {
  const lowerPrompt = prompt.toLowerCase();
  
  // Mode detection
  let modes: 'light' | 'dark' | 'both' = 'both';
  if (lowerPrompt.includes('light mode') || lowerPrompt.includes('light only')) {
    modes = 'light';
  } else if (lowerPrompt.includes('dark mode') || lowerPrompt.includes('dark only')) {
    modes = 'dark';
  }
  
  // Shadow permission
  const allowShadows = lowerPrompt.includes('shadow') || 
                      lowerPrompt.includes('shadow') ||
                      lowerPrompt.includes('depth');
  
  // Font permission
  const allowFonts = lowerPrompt.includes('font') || 
                    lowerPrompt.includes('typography') ||
                    lowerPrompt.includes('text style');
  
  // Token permission function
  const allowTokens = (key: string): boolean => {
    // If prompt mentions specific colors, only allow those
    if (lowerPrompt.includes('blue') && !isTokenInGroup(key, 'brand')) return false;
    if (lowerPrompt.includes('red') && !isTokenInGroup(key, 'brand')) return false;
    if (lowerPrompt.includes('green') && !isTokenInGroup(key, 'brand')) return false;
    
    // If prompt mentions background changes, allow surface tokens
    if (lowerPrompt.includes('background') && isTokenInGroup(key, 'surfaces')) return true;
    if (lowerPrompt.includes('background') && !isTokenInGroup(key, 'surfaces')) return false;
    
    // If prompt mentions brand changes, allow brand tokens
    if (lowerPrompt.includes('brand') && isTokenInGroup(key, 'brand')) return true;
    if (lowerPrompt.includes('brand') && !isTokenInGroup(key, 'brand')) return false;
    
    // If prompt mentions primary/secondary/accent specifically
    if (lowerPrompt.includes('primary') && key.includes('primary')) return true;
    if (lowerPrompt.includes('secondary') && key.includes('secondary')) return true;
    if (lowerPrompt.includes('accent') && key.includes('accent')) return true;
    
    // Default: allow all tokens unless explicitly restricted
    return true;
  };
  
  return {
    modes,
    allowShadows,
    allowFonts,
    allowTokens
  };
}

/**
 * Patches a theme based on intent and LLM response
 * Only applies tokens allowed by the user's intent
 */
export function patchTheme(
  baseTheme: InternalTheme,
  llmResponse: Record<string, unknown>,
  intent: Intent
): InternalTheme {
  // Type assertion for the theme structure
  const theme = llmResponse.theme as {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  const patchedTheme = { ...baseTheme };
  
  // Apply light mode changes if allowed
  if (intent.modes === 'light' || intent.modes === 'both') {
    patchedTheme.light.vars = { ...baseTheme.light.vars };
    
    Object.entries(theme.light).forEach(([token, value]) => {
      if (intent.allowTokens(token)) {
        if (token.startsWith('shadow-') && !intent.allowShadows) return;
        if (token.startsWith('font-') && !intent.allowFonts) return;
        
        patchedTheme.light.vars[`--${token}`] = value;
      }
    });
  }
  
  // Apply dark mode changes if allowed
  if (intent.modes === 'dark' || intent.modes === 'both') {
    patchedTheme.dark.vars = { ...baseTheme.dark.vars };
    
    Object.entries(theme.dark).forEach(([token, value]) => {
      if (intent.allowTokens(token)) {
        if (token.startsWith('shadow-') && !intent.allowShadows) return;
        if (token.startsWith('font-') && !intent.allowFonts) return;
        
        patchedTheme.dark.vars[`--${token}`] = value;
      }
    });
  }
  
  // Update fonts if allowed
  if (intent.allowFonts) {
    if (theme.light['font-sans']) {
      patchedTheme.fonts.sans = theme.light['font-sans'];
    }
    if (theme.light['font-serif']) {
      patchedTheme.fonts.serif = theme.light['font-serif'];
    }
    if (theme.light['font-mono']) {
      patchedTheme.fonts.mono = theme.light['font-mono'];
    }
  }
  
  // Update radius and letter-spacing if allowed
  if (theme.light.radius) {
    patchedTheme.radius = theme.light.radius;
  }
  if (theme.light['letter-spacing']) {
    patchedTheme.letterSpacing = theme.light['letter-spacing'];
  }
  
  return patchedTheme;
}

/**
 * Creates a patch prompt for the LLM
 * Includes @[base_theme] tag with current theme data
 */
export function createPatchPrompt(
  userPrompt: string,
  baseTheme: InternalTheme
): string {
  const baseThemeData = {
    light: Object.fromEntries(
      Object.entries(baseTheme.light.vars).map(([key, value]) => [
        key.replace('--', ''),
        value
      ])
    ),
    dark: Object.fromEntries(
      Object.entries(baseTheme.dark.vars).map(([key, value]) => [
        key.replace('--', ''),
        value
      ])
    )
  };
  
  return `${userPrompt}

@[base_theme]
${JSON.stringify(baseThemeData, null, 2)}`;
}
