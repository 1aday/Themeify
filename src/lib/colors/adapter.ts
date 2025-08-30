import { hexToOklch, oklchToHsl } from './hexToOklch';
import { ALL_TOKENS, isColorToken } from './tokens';

/**
 * LLM Response Schema (HEX format as specified in system_prompt.txt)
 */
export interface LLMThemeResponse {
  text: string;
  theme: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

/**
 * Internal Theme Schema (OKLCH format for rendering)
 */
export interface InternalTheme {
  id: string;
  name: string;
  notes?: string;
  version: 1;
  fonts: {
    sans: string;
    serif: string;
    mono: string;
  };
  radius: string;
  letterSpacing: string;
  light: {
    vars: Record<string, string>; // "--token": OKLCH tuple OR raw string for non-colors
  };
  dark: {
    vars: Record<string, string>;
  };
}

/**
 * Converts LLM HEX response to internal OKLCH format
 * Builds computed --box-shadow from shadow tokens
 */
export function adaptLLMResponse(
  llmResponse: LLMThemeResponse,
  themeName: string = 'Generated Theme'
): InternalTheme {
  console.log('Adapting LLM response:', llmResponse);
  
  const { theme, text } = llmResponse;
  
  // Extract fonts and other non-color tokens from light mode
  const fonts = {
    sans: theme.light['font-sans'] || 'Inter, ui-sans-serif, system-ui',
    serif: theme.light['font-serif'] || 'Lora, ui-serif',
    mono: theme.light['font-mono'] || '"Fira Code", ui-monospace'
  };
  
  const radius = theme.light.radius || '0.625rem';
  const letterSpacing = theme.light['letter-spacing'] || '0px';
  
  console.log('Extracted fonts:', fonts);
  console.log('Extracted radius:', radius);
  console.log('Extracted letter spacing:', letterSpacing);
  
  // Convert color tokens to HSL, keep non-color tokens as strings
  const convertMode = (mode: Record<string, string>) => {
    const vars: Record<string, string> = {};
    
    console.log('Converting mode with tokens:', Object.keys(mode));
    
    // Process ALL tokens from the AI response, not just predefined ones
    Object.entries(mode).forEach(([token, value]) => {
      if (value) {
        // Check if this is clearly a non-color token
        const isNonColor = token.startsWith('font-') || 
                          token === 'radius' || 
                          token === 'letter-spacing' ||
                          token.startsWith('shadow-');
        
        if (!isNonColor && value.startsWith('#')) {
          // Convert HEX colors to OKLCH and store directly
          const oklchValue = hexToOklch(value);
          console.log(`Converting ${token}: ${value} -> oklch(${oklchValue})`);
          vars[`--${token}`] = `oklch(${oklchValue})`;
        } else if (!isNonColor) {
          // Keep non-color tokens as strings
          console.log(`Keeping ${token}: ${value}`);
          vars[`--${token}`] = value;
        } else {
          // Keep non-color tokens as strings
          console.log(`Keeping ${token}: ${value}`);
          vars[`--${token}`] = value;
        }
      } else {
        console.log(`Empty value for token: ${token}`);
      }
    });
    
    // Build computed --box-shadow from shadow tokens
    if (mode['shadow-color'] && mode['shadow-blur']) {
      const shadowColor = hexToOklch(mode['shadow-color']);
      const offsetX = mode['shadow-offset-x'] || '0px';
      const offsetY = mode['shadow-offset-y'] || '0px';
      const blur = mode['shadow-blur'] || '0px';
      const spread = mode['shadow-spread'] || '0px';
      const opacity = mode['shadow-opacity'] || '0.1';
      
      vars['--box-shadow'] = `${offsetX} ${offsetY} ${blur} ${spread} oklch(${shadowColor}) / ${opacity}`;
      console.log('Built box-shadow:', vars['--box-shadow']);
    }
    
    console.log('Mode vars:', vars);
    return { vars };
  };
  
  const result = {
    id: crypto.randomUUID(),
    name: themeName,
    notes: text,
    version: 1 as const,
    fonts,
    radius,
    letterSpacing,
    light: convertMode(theme.light),
    dark: convertMode(theme.dark)
  };
  
  console.log('Final adapted theme:', result);
  return result;
}

/**
 * Converts internal OKLCH theme back to LLM HEX format
 * Useful for roundtrip operations and sharing
 */
export function adaptToLLMFormat(theme: InternalTheme): LLMThemeResponse {
  const convertMode = (mode: { vars: Record<string, string> }) => {
    const result: Record<string, string> = {};
    
    Object.entries(mode.vars).forEach(([key, value]) => {
      const token = key.replace('--', '');
      
      if (isColorToken(token)) {
        // Convert OKLCH back to HEX for LLM format
        // This is a simplified conversion - in practice you'd use oklchToHex
        result[token] = value; // For now, keep as OKLCH
      } else {
        // Keep non-color tokens as strings
        result[token] = value;
      }
    });
    
    return result;
  };
  
  return {
    text: theme.notes || '',
    theme: {
      light: convertMode(theme.light),
      dark: convertMode(theme.dark)
    }
  };
}

/**
 * Creates a default theme with neutral colors
 */
export function createDefaultTheme(): InternalTheme {
  return {
    id: crypto.randomUUID(),
    name: 'Default Theme',
    version: 1,
    fonts: {
      sans: 'Inter, ui-sans-serif, system-ui',
      serif: 'Lora, ui-serif',
      mono: '"Fira Code", ui-monospace'
    },
    radius: '0.625rem',
    letterSpacing: '0px',
    light: {
      vars: {
        '--background': 'oklch(0.98 0 0)',
        '--foreground': 'oklch(0.12 0.02 255)',
        '--card': 'oklch(1 0 0)',
        '--card-foreground': 'oklch(0.12 0.02 255)',
        '--popover': 'oklch(1 0 0)',
        '--popover-foreground': 'oklch(0.12 0.02 255)',
        '--primary': 'oklch(0.205 0 0)',
        '--primary-foreground': 'oklch(0.985 0 0)',
        '--secondary': 'oklch(0.97 0 0)',
        '--secondary-foreground': 'oklch(0.205 0 0)',
        '--muted': 'oklch(0.97 0 0)',
        '--muted-foreground': 'oklch(0.556 0 0)',
        '--accent': 'oklch(0.97 0 0)',
        '--accent-foreground': 'oklch(0.205 0 0)',
        '--destructive': 'oklch(0.577 0.245 27.325)',
        '--destructive-foreground': 'oklch(0.985 0 0)',
        '--border': 'oklch(0.922 0 0)',
        '--input': 'oklch(0.922 0 0)',
        '--ring': 'oklch(0.708 0 0)',
        '--sidebar': 'oklch(0.97 0 0)',
        '--sidebar-foreground': 'oklch(0.12 0.02 255)',
        '--sidebar-primary': 'oklch(0.205 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.985 0 0)',
        '--sidebar-accent': 'oklch(0.95 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.12 0.02 255)',
        '--sidebar-border': 'oklch(0.9 0 0)',
        '--sidebar-ring': 'oklch(0.708 0 0)',
        '--chart-1': 'oklch(0.205 0 0)',
        '--chart-2': 'oklch(0.4 0 0)',
        '--chart-3': 'oklch(0.6 0 0)',
        '--chart-4': 'oklch(0.8 0 0)',
        '--chart-5': 'oklch(0.9 0 0)',
        '--shadow-color': 'oklch(0.12 0.02 255)',
        '--shadow-opacity': '0.1',
        '--shadow-blur': '10px',
        '--shadow-spread': '-3px',
        '--shadow-offset-x': '0px',
        '--shadow-offset-y': '4px',
        '--radius': '0.625rem',
        '--font-sans': 'Inter, ui-sans-serif, system-ui',
        '--font-serif': 'Lora, ui-serif',
        '--font-mono': '"Fira Code", ui-monospace',
        '--letter-spacing': '0px'
      }
    },
    dark: {
      vars: {
        '--background': 'oklch(0.145 0 0)',
        '--foreground': 'oklch(0.985 0 0)',
        '--card': 'oklch(0.205 0 0)',
        '--card-foreground': 'oklch(0.985 0 0)',
        '--popover': 'oklch(0.205 0 0)',
        '--popover-foreground': 'oklch(0.985 0 0)',
        '--primary': 'oklch(0.922 0 0)',
        '--primary-foreground': 'oklch(0.205 0 0)',
        '--secondary': 'oklch(0.269 0 0)',
        '--secondary-foreground': 'oklch(0.985 0 0)',
        '--muted': 'oklch(0.269 0 0)',
        '--muted-foreground': 'oklch(0.708 0 0)',
        '--accent': 'oklch(0.269 0 0)',
        '--accent-foreground': 'oklch(0.985 0 0)',
        '--destructive': 'oklch(0.704 0.191 22.216)',
        '--destructive-foreground': 'oklch(0.205 0 0)',
        '--border': 'oklch(1 0 0 / 0.1)',
        '--input': 'oklch(1 0 0 / 0.15)',
        '--ring': 'oklch(0.556 0 0)',
        '--sidebar': 'oklch(0.269 0 0)',
        '--sidebar-foreground': 'oklch(0.985 0 0)',
        '--sidebar-primary': 'oklch(0.985 0 0)',
        '--sidebar-primary-foreground': 'oklch(0.205 0 0)',
        '--sidebar-accent': 'oklch(0.3 0 0)',
        '--sidebar-accent-foreground': 'oklch(0.985 0 0)',
        '--sidebar-border': 'oklch(0.35 0 0)',
        '--sidebar-ring': 'oklch(0.556 0 0)',
        '--chart-1': 'oklch(0.985 0 0)',
        '--chart-2': 'oklch(0.8 0 0)',
        '--chart-3': 'oklch(0.6 0 0)',
        '--chart-4': 'oklch(0.4 0 0)',
        '--chart-5': 'oklch(0.2 0 0)',
        '--shadow-color': 'oklch(0 0 0)',
        '--shadow-opacity': '0.5',
        '--shadow-blur': '15px',
        '--shadow-spread': '-5px',
        '--shadow-offset-x': '0px',
        '--shadow-offset-y': '5px',
        '--radius': '0.625rem',
        '--font-sans': 'Inter, ui-sans-serif, system-ui',
        '--font-serif': 'Lora, ui-serif',
        '--font-mono': '"Fira Code", ui-monospace',
        '--letter-spacing': '0px'
      }
    }
  };
}
