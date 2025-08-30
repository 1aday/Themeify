'use client';

import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorsTab } from './Tabs/ColorsTab';
import { TypographyTab } from './Tabs/TypographyTab';
import { OtherTab } from './Tabs/OtherTab';
import { GenerateTab } from './Tabs/GenerateTab';
import { useThemeStore } from '@/state/themeStore';

/**
 * Main sidebar editor with tabs for theme customization
 * Fixed width 320-360px as specified in the PRD
 * Now uses OpenAI theme values for styling
 */
export function SidebarEditor() {
  const { currentTheme, isDarkMode } = useThemeStore();
  
  // Get the active mode (light or dark)
  const activeMode = isDarkMode ? currentTheme.dark : currentTheme.light;
  const activeVars = activeMode.vars;

  // Initialize theme on document root after mounting (client side only)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const { isDarkMode: currentDarkMode } = useThemeStore.getState();
      const activeMode = currentDarkMode ? currentTheme.dark : currentTheme.light;
      
      // Apply all theme variables to document root
      Object.entries(activeMode.vars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      
      // Also apply fonts, radius, and letter-spacing
      document.documentElement.style.setProperty('--font-sans', currentTheme.fonts.sans);
      document.documentElement.style.setProperty('--font-serif', currentTheme.fonts.serif);
      document.documentElement.style.setProperty('--font-mono', currentTheme.fonts.mono);
      document.documentElement.style.setProperty('--radius', currentTheme.radius);
      document.documentElement.style.setProperty('--letter-spacing', currentTheme.letterSpacing);
    }
  }, [currentTheme, isDarkMode]);

  return (
    <aside 
      className="w-[360px] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{
        borderColor: activeVars['--sidebar-border'] || 'var(--sidebar-border)',
        backgroundColor: activeVars['--sidebar'] || 'var(--sidebar)',
        color: activeVars['--sidebar-foreground'] || 'var(--sidebar-foreground)',
        borderRadius: activeVars['--radius'] || 'var(--radius)',
        fontFamily: activeVars['--font-sans'] || 'var(--font-sans)'
      }}
    >
      <div className="p-6">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList 
            className="grid w-full grid-cols-1"
            style={{ 
              backgroundColor: activeVars['--sidebar-accent'] || 'var(--sidebar-accent)',
              borderColor: activeVars['--sidebar-border'] || 'var(--sidebar-border)'
            }}
          >
            <TabsTrigger 
              value="generate"
              style={{ 
                color: activeVars['--sidebar-accent-foreground'] || 'var(--sidebar-accent-foreground)',
                borderRadius: activeVars['--radius'] || 'var(--radius)',
                backgroundColor: 'transparent'
              }}
              className="data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground hover:bg-sidebar-accent/80 transition-colors"
            >
              Generate
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <GenerateTab />
          </TabsContent>
        </Tabs>
      </div>
    </aside>
  );
}
