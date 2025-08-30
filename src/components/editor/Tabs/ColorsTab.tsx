'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCurrentTheme, useThemeStore } from '@/state/themeStore';
import { TOKEN_GROUPS, FOREGROUND_PAIRS, getForegroundToken } from '@/lib/colors/tokens';
import { checkWCAGAA, autoFixContrast, getContrastRatio } from '@/lib/colors/contrast';
import { oklchToHex } from '@/lib/colors/hexToOklch';
import { ColorPicker } from '@/components/ui/color-picker';
import { CheckCircle, XCircle, Wrench } from 'lucide-react';

/**
 * Colors tab for editing all token pairs with swatches and contrast badges
 * Shows contrast badges (AA/Fail with "Fix" button) as specified in the PRD
 */
export function ColorsTab() {
  const currentTheme = useCurrentTheme();
  const { updateToken } = useThemeStore();

  const handleAutoFix = (backgroundToken: string) => {
    const foregroundToken = getForegroundToken(backgroundToken);
    if (foregroundToken) {
      const bgValue = currentTheme.light.vars[`--${backgroundToken}`];
      const fgValue = currentTheme.light.vars[`--${foregroundToken}`];
      
      // Extract OKLCH values from the CSS function strings
      let bgOklchValues = bgValue;
      let fgOklchValues = fgValue;
      if (bgValue.startsWith('oklch(') && bgValue.endsWith(')')) {
        bgOklchValues = bgValue.slice(6, -1);
      }
      if (fgValue.startsWith('oklch(') && fgValue.endsWith(')')) {
        fgOklchValues = fgValue.slice(6, -1);
      }
      
      const bgHex = oklchToHex(bgOklchValues);
      const fgHex = oklchToHex(fgOklchValues);
      const fixedFgHex = autoFixContrast(bgHex, fgHex);
      updateToken(foregroundToken, fixedFgHex, 'both');
    }
  };

  const renderColorSwatch = (token: string) => {
    const value = currentTheme.light.vars[`--${token}`];
    
    // Extract OKLCH values from the CSS function string
    let oklchValues = value;
    if (value.startsWith('oklch(') && value.endsWith(')')) {
      oklchValues = value.slice(6, -1); // Remove 'oklch(' and ')'
    }
    
    const hexValue = oklchToHex(oklchValues);
    
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded border border-border theme-shadow"
            style={{ backgroundColor: value }}
          />
          <div className="flex-1">
            <div className="text-sm font-medium">{token}</div>
            <div className="text-xs text-muted-foreground font-mono">{hexValue}</div>
          </div>
        </div>
        
        <ColorPicker
          value={hexValue}
          onChange={(newColor) => {
            updateToken(token, newColor, 'both');
          }}
        />
      </div>
    );
  };

  const renderContrastPair = (backgroundToken: string) => {
    const foregroundToken = getForegroundToken(backgroundToken);
    if (!foregroundToken) return null;

    const bgValue = currentTheme.light.vars[`--${backgroundToken}`];
    const fgValue = currentTheme.light.vars[`--${foregroundToken}`];
    
    // Extract OKLCH values from the CSS function strings
    let bgOklchValues = bgValue;
    let fgOklchValues = fgValue;
    if (bgValue.startsWith('oklch(') && bgValue.endsWith(')')) {
      bgOklchValues = bgValue.slice(6, -1);
    }
    if (fgValue.startsWith('oklch(') && fgValue.endsWith(')')) {
      fgOklchValues = fgValue.slice(6, -1);
    }
    
    const bgHex = oklchToHex(bgOklchValues);
    const fgHex = oklchToHex(fgOklchValues);
    
    const contrastRatio = getContrastRatio(bgHex, fgHex);
    const contrastCheck = checkWCAGAA(contrastRatio, false);
    const passes = contrastCheck.passes;

    return (
      <Card key={backgroundToken} className="theme-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{backgroundToken} / {foregroundToken}</CardTitle>
          <CardDescription className="text-xs">Background and foreground pair</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Background</Label>
              {renderColorSwatch(backgroundToken)}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Foreground</Label>
              {renderColorSwatch(foregroundToken)}
            </div>
          </div>
          
          {/* Contrast Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {passes ? (
                <CheckCircle className="w-4 h-4 text-primary" />
              ) : (
                <XCircle className="w-4 h-4 text-destructive" />
              )}
              <span className={`text-xs font-medium ${passes ? 'text-primary' : 'text-destructive'}`}>
                {passes ? 'WCAG AA Pass' : 'WCAG AA Fail'} ({contrastCheck.actualRatio.toFixed(2)}:1)
              </span>
            </div>
            
            {!passes && (
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleAutoFix(backgroundToken)}
                className="h-6 px-2 text-xs"
              >
                <Wrench className="w-3 h-3 mr-1" />
                Auto-fix
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Brand Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Brand Colors</Label>
        <div className="grid grid-cols-2 gap-4">
          {TOKEN_GROUPS.brand.map(token => (
            <div key={token} className="space-y-2">
              {renderColorSwatch(token)}
            </div>
          ))}
        </div>
      </div>

      {/* Surface Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Surface Colors</Label>
        <div className="grid grid-cols-2 gap-4">
          {TOKEN_GROUPS.surfaces.map(token => (
            <div key={token} className="space-y-2">
              {renderColorSwatch(token)}
            </div>
          ))}
        </div>
      </div>

      {/* Contrast Pairs */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Contrast Pairs</Label>
        <div className="space-y-3">
          {Object.keys(FOREGROUND_PAIRS).map(backgroundToken => 
            renderContrastPair(backgroundToken)
          )}
        </div>
      </div>

      {/* Chart Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Chart Colors</Label>
        <div className="grid grid-cols-5 gap-2">
          {TOKEN_GROUPS.chart.map(token => (
            <div key={token} className="space-y-2">
              {renderColorSwatch(token)}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Colors */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Sidebar Colors</Label>
        <div className="grid grid-cols-2 gap-4">
          {TOKEN_GROUPS.sidebar.map(token => (
            <div key={token} className="space-y-2">
              {renderColorSwatch(token)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
