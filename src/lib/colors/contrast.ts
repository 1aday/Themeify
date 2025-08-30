/**
 * WCAG 2.1 contrast ratio calculation
 * Uses sRGB color space as specified in the PRD
 */

/**
 * Converts sRGB value to linear RGB
 */
function sRGBToLinear(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Converts linear RGB to luminance
 */
function linearToLuminance(r: number, g: number, b: number): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Converts HEX color to sRGB values (0-1)
 */
function hexToSRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

/**
 * Calculates relative luminance of a color
 */
export function getLuminance(hex: string): number {
  const [r, g, b] = hexToSRGB(hex);
  const linearR = sRGBToLinear(r);
  const linearG = sRGBToLinear(g);
  const linearB = sRGBToLinear(b);
  return linearToLuminance(linearR, linearG, linearB);
}

/**
 * Calculates contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if a contrast ratio meets WCAG AA standards
 * @param ratio - The contrast ratio to check
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns Object with pass status and required ratio
 */
export function checkWCAGAA(ratio: number, isLargeText: boolean = false) {
  const requiredRatio = isLargeText ? 3.0 : 4.5;
  return {
    passes: ratio >= requiredRatio,
    requiredRatio,
    actualRatio: ratio,
    level: isLargeText ? 'AA Large' : 'AA Normal'
  };
}

/**
 * Auto-fixes contrast by adjusting foreground lightness
 * Only modifies the foreground color to maintain design intent
 */
export function autoFixContrast(
  backgroundHex: string, 
  foregroundHex: string,
  isLargeText: boolean = false
): string {
  const requiredRatio = isLargeText ? 3.0 : 4.5;
  let currentRatio = getContrastRatio(backgroundHex, foregroundHex);
  
  if (currentRatio >= requiredRatio) {
    return foregroundHex; // Already passes
  }
  
  // Convert to HSL for easier lightness manipulation
  const hexToHSL = (hex: string) => {
    const [r, g, b] = hexToSRGB(hex);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return [h * 360, s * 100, l * 100];
  };
  
  const hslToHex = (h: number, s: number, l: number): string => {
    l = Math.max(0, Math.min(100, l));
    s = Math.max(0, Math.min(100, s));
    
    const c = (1 - Math.abs(2 * l / 100 - 1)) * s / 100;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l / 100 - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  };
  
  const [h, s, l] = hexToHSL(foregroundHex);
  let newL = l;
  let attempts = 0;
  const maxAttempts = 20;
  
  // Try adjusting lightness until we get a passing ratio
  while (currentRatio < requiredRatio && attempts < maxAttempts) {
    // If background is light, make foreground darker; if dark, make lighter
    const bgLuminance = getLuminance(backgroundHex);
    if (bgLuminance > 0.5) {
      newL = Math.max(0, newL - 5); // Darker
    } else {
      newL = Math.min(100, newL + 5); // Lighter
    }
    
    const newForeground = hslToHex(h, s, newL);
    currentRatio = getContrastRatio(backgroundHex, newForeground);
    attempts++;
  }
  
  return hslToHex(h, s, newL);
}
