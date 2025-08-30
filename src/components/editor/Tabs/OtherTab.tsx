'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useCurrentTheme, useThemeStore } from '@/state/themeStore';

/**
 * Other tab for radius, shadows, and global transforms
 * Shadow controls only enabled when user wants to override as specified in the PRD
 */
export function OtherTab() {
  const currentTheme = useCurrentTheme();
  const { updateRadius } = useThemeStore();
  const [enableShadows, setEnableShadows] = useState(false);
  const [shadowValues, setShadowValues] = useState({
    color: '#000000',
    opacity: '0.1',
    blur: '10px',
    spread: '0px',
    offsetX: '0px',
    offsetY: '4px'
  });

  const handleRadiusChange = (value: string) => {
    updateRadius(value);
  };

  const handleShadowChange = (key: string, value: string) => {
    setShadowValues(prev => ({ ...prev, [key]: value }));
    // In a real implementation, this would update the theme
  };

  const radiusPresets = [
    '0px', '2px', '4px', '6px', '8px', '12px', '16px', '20px', '24px', '32px'
  ];

  const radiusRemPresets = [
    '0rem', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '2.5rem', '3rem'
  ];

  return (
    <div className="space-y-6">
      {/* Border Radius */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Border Radius</Label>
        <div className="space-y-3">
          {/* Custom radius input */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Custom radius</Label>
            <Input
              value={currentTheme.radius}
              onChange={(e) => handleRadiusChange(e.target.value)}
              placeholder="0.5rem"
              className="h-8"
            />
          </div>
          
          {/* Pixel presets */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Pixel values</Label>
            <div className="flex flex-wrap gap-2">
              {radiusPresets.map((radius) => (
                <Button
                  key={radius}
                  variant={currentTheme.radius === radius ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRadiusChange(radius)}
                  className="h-6 px-2 text-xs"
                >
                  {radius}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Rem presets */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Rem values</Label>
            <div className="flex flex-wrap gap-2">
              {radiusRemPresets.map((radius) => (
                <Button
                  key={radius}
                  variant={currentTheme.radius === radius ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleRadiusChange(radius)}
                  className="h-6 px-2 text-xs"
                >
                  {radius}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shadow Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Shadow Controls</Label>
          <Switch
            checked={enableShadows}
            onCheckedChange={setEnableShadows}
          />
        </div>
        
        {enableShadows && (
          <Card className="theme-shadow">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Custom Shadows</CardTitle>
              <CardDescription>Override default shadow settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Shadow Color */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Shadow Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={shadowValues.color}
                    onChange={(e) => handleShadowChange('color', e.target.value)}
                    className="w-16 h-8 p-1"
                  />
                  <Input
                    value={shadowValues.color}
                    onChange={(e) => handleShadowChange('color', e.target.value)}
                    placeholder="#000000"
                    className="flex-1 h-8"
                  />
                </div>
              </div>
              
              {/* Shadow Opacity */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Opacity</Label>
                <div className="flex gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={parseFloat(shadowValues.opacity)}
                    onChange={(e) => handleShadowChange('opacity', e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm font-mono w-16">
                    {shadowValues.opacity}
                  </span>
                </div>
              </div>
              
              {/* Shadow Blur */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Blur</Label>
                <Input
                  value={shadowValues.blur}
                  onChange={(e) => handleShadowChange('blur', e.target.value)}
                  placeholder="10px"
                  className="h-8"
                />
              </div>
              
              {/* Shadow Spread */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Spread</Label>
                <Input
                  value={shadowValues.spread}
                  onChange={(e) => handleShadowChange('spread', e.target.value)}
                  placeholder="0px"
                  className="h-8"
                />
              </div>
              
              {/* Shadow Offset */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Offset X</Label>
                  <Input
                    value={shadowValues.offsetX}
                    onChange={(e) => handleShadowChange('offsetX', e.target.value)}
                    placeholder="0px"
                    className="h-8"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Offset Y</Label>
                  <Input
                    value={shadowValues.offsetY}
                    onChange={(e) => handleShadowChange('offsetY', e.target.value)}
                    placeholder="4px"
                    className="h-8"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Global Transforms (Optional) */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Global Transforms (Optional)</Label>
        <Card className="theme-shadow">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Color Adjustments</CardTitle>
            <CardDescription>Apply global adjustments to all colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hue Shift */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Hue Shift</Label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="1"
                  defaultValue="0"
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">0°</span>
              </div>
            </div>
            
            {/* Saturation Adjustment */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Saturation</Label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="1"
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">1.0x</span>
              </div>
            </div>
            
            {/* Lightness Adjustment */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Lightness</Label>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="5"
                  defaultValue="0"
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">0%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <Card className="theme-shadow">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Preview</CardTitle>
          <CardDescription>See how your settings affect the theme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Radius Preview */}
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Border Radius</Label>
            <div 
              className="w-20 h-20 bg-primary rounded"
              style={{ borderRadius: currentTheme.radius }}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Current: {currentTheme.radius}
            </p>
          </div>
          
          {/* Shadow Preview */}
          {enableShadows && (
            <div>
              <Label className="text-xs text-muted-foreground mb-2 block">Shadow</Label>
              <div 
                className="w-20 h-20 bg-card rounded border"
                style={{
                  boxShadow: `${shadowValues.offsetX} ${shadowValues.offsetY} ${shadowValues.blur} ${shadowValues.spread} ${shadowValues.color}${shadowValues.opacity !== '1' ? Math.round(parseFloat(shadowValues.opacity) * 255).toString(16).padStart(2, '0') : ''}`
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {shadowValues.offsetX} {shadowValues.offsetY} {shadowValues.blur} {shadowValues.spread} {shadowValues.color} / {shadowValues.opacity}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
