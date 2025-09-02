'use client';


import { Logo } from '@/components/ui/logo';
import { useThemeStore } from '@/state/themeStore';
import { Copy, Check } from 'lucide-react';
import React, { useState } from 'react';
import { oklchToHex } from '@/lib/colors/hexToOklch';

// Helper function to convert OKLCH to hex using the proper library function
function convertOklchToHex(oklchString: string): string {
  if (typeof window === 'undefined') return '#000000'; // SSR fallback
  
  try {
    console.log(`Converting OKLCH to hex: ${oklchString}`);
    
    // Extract the OKLCH values from the string (remove "oklch(" and ")")
    const oklchValues = oklchString.replace('oklch(', '').replace(')', '');
    console.log(`OKLCH values: ${oklchValues}`);
    
    // Use the proper oklchToHex function from the library
    const hex = oklchToHex(oklchValues);
    console.log(`OKLCH ${oklchString} converted to hex:`, hex);
    return hex;
  } catch (error) {
    console.error('Error converting OKLCH to hex:', error, 'for OKLCH:', oklchString);
    return '#000000';
  }
}

// Helper function to get hex value from CSS variable
function getHexFromCSSVar(cssVarName: string): string {
  if (typeof window === 'undefined') return '#000000'; // SSR fallback
  
  try {
    // Try to get the computed style directly from document root first
    const rootStyle = window.getComputedStyle(document.documentElement);
    const cssVarValue = rootStyle.getPropertyValue(cssVarName).trim();
    console.log(`CSS Var ${cssVarName} raw value:`, cssVarValue);
    
    // Create a temporary element to get computed styles
    const tempEl = document.createElement('div');
    tempEl.style.backgroundColor = `var(${cssVarName})`;
    tempEl.style.position = 'absolute';
    tempEl.style.visibility = 'hidden';
    tempEl.style.pointerEvents = 'none';
    tempEl.style.top = '-9999px';
    tempEl.style.left = '-9999px';
    document.body.appendChild(tempEl);
    
    const computedColor = window.getComputedStyle(tempEl).backgroundColor;
    console.log(`CSS Var ${cssVarName} computed:`, computedColor);
    document.body.removeChild(tempEl);
    
    // Handle different color formats
    if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
      console.log(`CSS Var ${cssVarName} is transparent`);
      return '#000000';
    }
    
    // Convert RGB/RGBA to Hex
    const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);
      
      const toHex = (n: number) => n.toString(16).padStart(2, '0');
      const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
      console.log(`CSS Var ${cssVarName} converted to hex:`, hex);
      return hex;
    }
    
    // If it's already a hex color, return it
    if (computedColor.startsWith('#')) {
      console.log(`CSS Var ${cssVarName} is already hex:`, computedColor);
      return computedColor.toUpperCase();
    }
    
    // Try to convert OKLCH if it's in that format
    if (computedColor.includes('oklch(')) {
      console.log(`CSS Var ${cssVarName} is OKLCH, converting:`, computedColor);
      return convertOklchToHex(computedColor);
    }
    
    console.log(`CSS Var ${cssVarName} no match found, returning black`);
    return '#000000';
  } catch (error) {
    console.error('Error getting hex from CSS var:', error, 'for var:', cssVarName);
    return '#000000';
  }
}

// Color swatch component with copy functionality
function ColorSwatch({ 
  name, 
  cssVarName, 
  className = '' 
}: { 
  name: string; 
  cssVarName: string; 
  className?: string; 
}) {
  const { currentTheme } = useThemeStore();
  const [copied, setCopied] = useState(false);
  const [hexValue, setHexValue] = useState('#000000');
  
  // Get hex value on mount and when cssVarName changes
  React.useEffect(() => {
    // Add a small delay to ensure CSS variables are applied
    const timer = setTimeout(() => {
      // Debug: Log the entire theme structure
      console.log(`ColorSwatch ${name}: Full theme data:`, currentTheme);
      console.log(`ColorSwatch ${name}: Light vars:`, currentTheme.light.vars);
      
      // Try to get the OKLCH value directly from theme data first
      const oklchValue = currentTheme.light.vars[cssVarName];
      console.log(`ColorSwatch ${name}: OKLCH value from theme for ${cssVarName}:`, oklchValue);
      
      let hex = '#000000';
      
      // If we have an OKLCH value from theme data, try to convert it directly
      if (oklchValue && oklchValue.startsWith('oklch(')) {
        hex = convertOklchToHex(oklchValue);
        console.log(`ColorSwatch ${name}: Direct OKLCH conversion result:`, hex);
      } else if (oklchValue && oklchValue.startsWith('#')) {
        // If it's already a hex value, use it directly
        hex = oklchValue.toUpperCase();
        console.log(`ColorSwatch ${name}: Already hex value:`, hex);
      } else {
        // Fall back to CSS variable method
        hex = getHexFromCSSVar(cssVarName);
        console.log(`ColorSwatch ${name}: CSS var method result:`, hex);
      }
      
      // If we still get #000000, try a different approach
      if (hex === '#000000') {
        console.log(`ColorSwatch ${name}: Trying alternative method for ${cssVarName}`);
        // Try to get the computed style directly
        const computedStyle = getComputedStyle(document.documentElement);
        const cssValue = computedStyle.getPropertyValue(cssVarName);
        console.log(`ColorSwatch ${name}: CSS computed value:`, cssValue);
        
        if (cssValue && cssValue.trim()) {
          hex = convertOklchToHex(cssValue.trim());
          console.log(`ColorSwatch ${name}: Alternative method result:`, hex);
        }
      }
      
      setHexValue(hex);
    }, 200); // Increased delay
    
    return () => clearTimeout(timer);
  }, [cssVarName, name, currentTheme.id]); // Add theme ID as dependency
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(hexValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative p-2 rounded border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm ${className}`}>
      <div className="flex items-center space-x-2">
        <div 
          className="w-8 h-8 rounded border border-border/30 shadow-sm"
          style={{ backgroundColor: `var(${cssVarName})` }}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-xs text-foreground">{name}</h4>
          <p className="text-xs text-muted-foreground font-mono">{hexValue}</p>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
          title="Copy hex value"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

// Typography Card Component with Copy Functionality
function TypographyCard({ 
  label, 
  fontName, 
  fontFamily, 
  className = '' 
}: { 
  label: string; 
  fontName: string; 
  fontFamily: string; 
  className?: string; 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fontName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative p-2 bg-gradient-to-br from-muted/20 to-muted/5 rounded border border-border/20 hover:border-border transition-all duration-200 hover:shadow-sm ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium mb-0.5 text-muted-foreground">{label}</div>
          <div 
            className="text-sm font-bold"
            style={{ fontFamily }}
          >
            {fontName}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-muted rounded"
          title="Copy font name"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}

export function ColorsScene() {
  const { currentTheme } = useThemeStore();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center space-y-3 py-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span 
              className="text-xs font-medium text-primary"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Brand Identity
            </span>
          </div>
          <h1 
            className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {currentTheme.name}
          </h1>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className="max-w-3xl mx-auto mt-6 space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-3">
            <h2 
              className="text-lg font-bold"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Logo
            </h2>
            
            {/* Logo Display - More Compact */}
            <div className="relative max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-lg" />
              <div className="relative aspect-[3/2] flex items-center justify-center p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border border-border/30">
                <Logo size="lg" showGenerateButton={false} />
              </div>
            </div>
          </div>

          {/* Typography & Colors Section */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Typography Section - More Compact */}
            <div>
              <h2 
                className="text-base font-bold mb-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Typography
              </h2>
              <div className="space-y-1.5">
                <TypographyCard 
                  label="Heading"
                  fontName={currentTheme.fonts?.sans || 'Inter'}
                  fontFamily="var(--font-sans)"
                />
                <TypographyCard 
                  label="Body"
                  fontName={currentTheme.fonts?.serif || 'Lora'}
                  fontFamily="var(--font-serif)"
                />
                <TypographyCard 
                  label="Mono"
                  fontName={currentTheme.fonts?.mono || 'Fira Code'}
                  fontFamily="var(--font-mono)"
                />
              </div>
            </div>

            {/* Colors Section */}
            <div>
              <h2 
                className="text-base font-bold mb-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Colors
              </h2>
              <div className="grid gap-1.5">
                <ColorSwatch name="Primary" cssVarName="--primary" />
                <ColorSwatch name="Secondary" cssVarName="--secondary" />
                <ColorSwatch name="Accent" cssVarName="--accent" />
                <ColorSwatch name="Destructive" cssVarName="--destructive" />
                <ColorSwatch name="Muted" cssVarName="--muted" />
                <ColorSwatch name="Border" cssVarName="--border" />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}