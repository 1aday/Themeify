'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Color Palette scene showing swatches for all main tokens + chart-1..5
 * Uses semantic classes exclusively as specified in the PRD
 */
export function PaletteScene() {
  const colorGroups = [
    {
      title: 'Brand Colors',
      colors: [
        { name: 'Primary', token: 'primary', description: 'Main brand color for buttons and links' },
        { name: 'Primary Foreground', token: 'primary-foreground', description: 'Text on primary backgrounds' },
        { name: 'Secondary', token: 'secondary', description: 'Secondary brand color for subtle elements' },
        { name: 'Secondary Foreground', token: 'secondary-foreground', description: 'Text on secondary backgrounds' },
        { name: 'Accent', token: 'accent', description: 'Accent color for highlights and focus states' },
        { name: 'Accent Foreground', token: 'accent-foreground', description: 'Text on accent backgrounds' },
        { name: 'Ring', token: 'ring', description: 'Focus ring color for form elements' }
      ]
    },
    {
      title: 'Surface Colors',
      colors: [
        { name: 'Background', token: 'background', description: 'Main page background' },
        { name: 'Foreground', token: 'foreground', description: 'Primary text color' },
        { name: 'Card', token: 'card', description: 'Card and panel backgrounds' },
        { name: 'Card Foreground', token: 'card-foreground', description: 'Text on card backgrounds' },
        { name: 'Popover', token: 'popover', description: 'Popover and dropdown backgrounds' },
        { name: 'Popover Foreground', token: 'popover-foreground', description: 'Text on popover backgrounds' },
        { name: 'Muted', token: 'muted', description: 'Muted background for subtle elements' },
        { name: 'Muted Foreground', token: 'muted-foreground', description: 'Text on muted backgrounds' }
      ]
    },
    {
      title: 'Sidebar Colors',
      colors: [
        { name: 'Sidebar', token: 'sidebar', description: 'Sidebar background' },
        { name: 'Sidebar Foreground', token: 'sidebar-foreground', description: 'Text in sidebar' },
        { name: 'Sidebar Primary', token: 'sidebar-primary', description: 'Primary actions in sidebar' },
        { name: 'Sidebar Primary Foreground', token: 'sidebar-primary-foreground', description: 'Text on sidebar primary' },
        { name: 'Sidebar Accent', token: 'sidebar-accent', description: 'Accent elements in sidebar' },
        { name: 'Sidebar Accent Foreground', token: 'sidebar-accent-foreground', description: 'Text on sidebar accent' },
        { name: 'Sidebar Border', token: 'sidebar-border', description: 'Sidebar border color' },
        { name: 'Sidebar Ring', token: 'sidebar-ring', description: 'Focus ring in sidebar' }
      ]
    },
    {
      title: 'Utility Colors',
      colors: [
        { name: 'Border', token: 'border', description: 'General border color' },
        { name: 'Input', token: 'input', description: 'Input field background' },
        { name: 'Destructive', token: 'destructive', description: 'Error and danger states' },
        { name: 'Destructive Foreground', token: 'destructive-foreground', description: 'Text on destructive backgrounds' }
      ]
    },
    {
      title: 'Chart Colors',
      colors: [
        { name: 'Chart 1', token: 'chart-1', description: 'First chart color for data visualization' },
        { name: 'Chart 2', token: 'chart-2', description: 'Second chart color for data visualization' },
        { name: 'Chart 3', token: 'chart-3', description: 'Third chart color for data visualization' },
        { name: 'Chart 4', token: 'chart-4', description: 'Fourth chart color for data visualization' },
        { name: 'Chart 5', token: 'chart-5', description: 'Fifth chart color for data visualization' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 
          className="text-3xl font-bold"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Color Palette
        </h1>
        <p 
          className="text-muted-foreground mt-2"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Complete overview of all theme colors and their usage
        </p>
      </div>

      {/* Color Groups */}
      {colorGroups.map((group) => (
        <Card key={group.title} className="theme-shadow">
          <CardHeader>
            <CardTitle 
              className="text-lg"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {group.title}
            </CardTitle>
            <CardDescription 
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {group.colors.length} color{group.colors.length !== 1 ? 's' : ''} in this group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.colors.map((color) => (
                <div key={color.token} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border border-border theme-shadow"
                      style={{ backgroundColor: `oklch(var(--${color.token}))` }}
                    />
                    <div>
                      <div 
                        className="font-medium text-sm"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {color.name}
                      </div>
                      <div className="text-xs text-muted-foreground font-mono">
                        --{color.token}
                      </div>
                    </div>
                  </div>
                  <p 
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {color.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* CSS Variables Display */}
      <Card className="theme-shadow">
        <CardHeader>
          <CardTitle 
            className="text-lg"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            CSS Variables
          </CardTitle>
          <CardDescription 
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Raw CSS custom properties for developers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="text-xs">
{`/* Light Mode */
:root {
  --background: oklch(var(--background));
  --foreground: oklch(var(--foreground));
  --card: oklch(var(--card));
  --card-foreground: oklch(var(--card-foreground));
  --popover: oklch(var(--popover));
  --popover-foreground: oklch(var(--popover-foreground));
  --primary: oklch(var(--primary));
  --primary-foreground: oklch(var(--primary-foreground));
  --secondary: oklch(var(--secondary));
  --secondary-foreground: oklch(var(--secondary-foreground));
  --muted: oklch(var(--muted));
  --muted-foreground: oklch(var(--muted-foreground));
  --accent: oklch(var(--accent));
  --accent-foreground: oklch(var(--accent-foreground));
  --destructive: oklch(var(--destructive));
  --destructive-foreground: oklch(var(--destructive-foreground));
  --border: oklch(var(--border));
  --input: oklch(var(--input));
  --ring: oklch(var(--ring));
  --chart-1: oklch(var(--chart-1));
  --chart-2: oklch(var(--chart-2));
  --chart-3: oklch(var(--chart-3));
  --chart-4: oklch(var(--chart-4));
  --chart-5: oklch(var(--chart-5));
  --sidebar: oklch(var(--sidebar));
  --sidebar-foreground: oklch(var(--sidebar-foreground));
  --sidebar-primary: oklch(var(--sidebar-primary));
  --sidebar-primary-foreground: oklch(var(--sidebar-primary-foreground));
  --sidebar-accent: oklch(var(--sidebar-accent));
  --sidebar-accent-foreground: oklch(var(--sidebar-accent-foreground));
  --sidebar-border: oklch(var(--sidebar-border));
  --sidebar-ring: oklch(var(--sidebar-ring));
  --radius: var(--radius);
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);
  --letter-spacing: var(--letter-spacing);
  --box-shadow: var(--box-shadow);
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
