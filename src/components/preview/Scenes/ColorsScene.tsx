'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function ColorsScene() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Color Palette</h1>
        <p className="text-muted-foreground">Your theme&apos;s color tokens and their values</p>
      </div>

      <div className="grid gap-6 @xl:grid-cols-2">
        {/* Brand Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>Primary brand colors and accents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-primary" />
                  <span className="text-sm font-medium">Primary</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--primary))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-primary-foreground" />
                  <span className="text-sm font-medium">Primary Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--primary-foreground))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-secondary" />
                  <span className="text-sm font-medium">Secondary</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--secondary))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-secondary-foreground" />
                  <span className="text-sm font-medium">Secondary Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--secondary-foreground))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-accent" />
                  <span className="text-sm font-medium">Accent</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--accent))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-accent-foreground" />
                  <span className="text-sm font-medium">Accent Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--accent-foreground))</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surface Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Surface Colors</CardTitle>
            <CardDescription>Backgrounds, cards, and containers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-background border" />
                  <span className="text-sm font-medium">Background</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--background))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-foreground" />
                  <span className="text-sm font-medium">Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--foreground))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-card border" />
                  <span className="text-sm font-medium">Card</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--card))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-card-foreground" />
                  <span className="text-sm font-medium">Card Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--card-foreground))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-popover border" />
                  <span className="text-sm font-medium">Popover</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--popover))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-popover-foreground" />
                  <span className="text-sm font-medium">Popover Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--popover-foreground))</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Chart Colors</CardTitle>
            <CardDescription>Data visualization colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
                  <span className="text-sm font-medium">Chart 1</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--chart-1))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
                  <span className="text-sm font-medium">Chart 2</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--chart-2))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
                  <span className="text-sm font-medium">Chart 3</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--chart-3))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-4))' }} />
                  <span className="text-sm font-medium">Chart 4</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--chart-4))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-5))' }} />
                  <span className="text-sm font-medium">Chart 5</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--chart-5))</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Utility Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Utility Colors</CardTitle>
            <CardDescription>Borders, inputs, and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-border" />
                  <span className="text-sm font-medium">Border</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--border))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-input" />
                  <span className="text-sm font-medium">Input</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--input))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-ring" />
                  <span className="text-sm font-medium">Ring</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--ring))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-destructive" />
                  <span className="text-sm font-medium">Destructive</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--destructive))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-muted" />
                  <span className="text-sm font-medium">Muted</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--muted))</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-muted-foreground" />
                  <span className="text-sm font-medium">Muted Foreground</span>
                </div>
                <div className="text-xs text-muted-foreground">hsl(var(--muted-foreground))</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CSS Variables Display */}
      <Card>
        <CardHeader>
          <CardTitle>CSS Variables</CardTitle>
          <CardDescription>Raw CSS custom properties for your theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`:root {
  --background: hsl(var(--background));
  --foreground: hsl(var(--foreground));
  --card: hsl(var(--card));
  --card-foreground: hsl(var(--card-foreground));
  --popover: hsl(var(--popover));
  --popover-foreground: hsl(var(--popover-foreground));
  --primary: hsl(var(--primary));
  --primary-foreground: hsl(var(--primary-foreground));
  --secondary: hsl(var(--secondary));
  --secondary-foreground: hsl(var(--secondary-foreground));
  --muted: hsl(var(--muted));
  --muted-foreground: hsl(var(--muted-foreground));
  --accent: hsl(var(--accent));
  --accent-foreground: hsl(var(--accent-foreground));
  --destructive: hsl(var(--destructive));
  --destructive-foreground: hsl(var(--destructive-foreground));
  --border: hsl(var(--border));
  --input: hsl(var(--input));
  --ring: hsl(var(--ring));
  --chart-1: hsl(var(--chart-1));
  --chart-2: hsl(var(--chart-2));
  --chart-3: hsl(var(--chart-3));
  --chart-4: hsl(var(--chart-4));
  --chart-5: hsl(var(--chart-5));
}`}</pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
