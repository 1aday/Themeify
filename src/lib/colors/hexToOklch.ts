import { oklch, formatHex, hsl } from 'culori';

/**
 * Converts HEX color to OKLCH format
 * Returns the raw OKLCH values as a string for CSS
 */
export function hexToOklch(hex: string): string {
  try {
    const color = oklch(hex);
    if (!color) return '0% 0 0'; // fallback for invalid colors
    
    // Return the OKLCH values in the format expected by CSS
    // L is 0-1, C is 0-0.37, H is 0-360
    const l = color.l || 0;
    const c = Math.min(color.c || 0, 0.37); // Clamp chroma for stability
    const h = color.h !== undefined ? color.h : 0;
    
    return `${l} ${c} ${h}`;
  } catch (error) {
    console.warn(`Failed to convert hex ${hex} to OKLCH:`, error);
    return '0 0 0'; // fallback
  }
}

/**
 * Converts OKLCH string back to HEX
 */
export function oklchToHex(oklchString: string): string {
  try {
    // Parse "L C H" format (L is 0-1, C is 0-0.37, H is 0-360)
    const [l, c, h] = oklchString.split(' ').map(Number);
    const color = oklch(`oklch(${l} ${c} ${h})`);
    if (!color) return '#000000'; // fallback if color is undefined
    return formatHex(color);
  } catch (error) {
    console.warn(`Failed to convert OKLCH ${oklchString} to hex:`, error);
    return '#000000'; // fallback
  }
}

/**
 * Converts OKLCH to HSL format for CSS variables
 * This provides better browser compatibility than OKLCH
 */
export function oklchToHsl(oklchString: string): string {
  try {
    // Parse "L C H" format (L is 0-1, C is 0-0.37, H is 0-360)
    const [l, c, h] = oklchString.split(' ').map(Number);
    const color = oklch(`oklch(${l} ${c} ${h})`);
    if (!color) return '0deg 0% 0%'; // fallback if color is undefined
    
    // Convert to HSL using the hsl function from culori
    const hslColor = hsl(color);
    if (!hslColor) return '0deg 0% 0%';
    
    return `${Math.round(hslColor.h || 0)}deg ${Math.round((hslColor.s || 0) * 100)}% ${Math.round((hslColor.l || 0) * 100)}%`;
  } catch (error) {
    console.warn(`Failed to convert OKLCH ${oklchString} to HSL:`, error);
    return '0deg 0% 0%'; // fallback
  }
}

/**
 * Validates if a string is a valid HEX color
 */
export function isValidHex(hex: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(hex);
}
