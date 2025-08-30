'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/state/themeStore';
import { PreviewHeader } from './PreviewHeader';
import { SceneRouter } from './SceneRouter';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ThemePreview() {
  const { currentTheme, isDarkMode, activeScene } = useThemeStore();
  
  // Get the active mode (light or dark)
  const activeMode = isDarkMode ? currentTheme.dark : currentTheme.light;
  const activeVars = activeMode.vars;

  // Extract font values for dependency tracking
  const fontSans = activeVars['--font-sans'];
  const fontSerif = activeVars['--font-serif'];
  const fontMono = activeVars['--font-mono'];

  // Optimized font loading - only run when fonts actually change
  useEffect(() => {
    const loadThemeFonts = () => {
      // Only load fonts that aren't already system fonts
      const fontsToLoad = [fontSans, fontSerif, fontMono].filter(font => 
        font && 
        !font.includes('ui-sans-serif') && 
        !font.includes('ui-serif') && 
        !font.includes('ui-monospace') &&
        !font.includes('system-ui')
      );
      
      fontsToLoad.forEach(fontFamily => {
        // Check if font is already loaded
        const existingLink = document.querySelector(`link[href*="${fontFamily.replace(/ /g, '+')}"]`);
        if (!existingLink) {
          console.log('Loading font:', fontFamily);
          const link = document.createElement('link');
          link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
          link.rel = 'stylesheet';
          document.head.appendChild(link);
        }
      });
    };
    
    loadThemeFonts();
  }, [fontSans, fontSerif, fontMono]);

  // Create a comprehensive style object that ensures all variables are set
  const previewStyle: React.CSSProperties & Record<string, string> = {
    isolation: 'isolate',
    // Apply all theme variables as CSS custom properties
    ...activeVars,
    // Ensure these core variables are always set with fallbacks
    '--background': activeVars['--background'] || 'hsl(0deg 0% 100%)',
    '--foreground': activeVars['--foreground'] || 'hsl(222deg 84% 5%)',
    '--card': activeVars['--card'] || 'hsl(0deg 0% 100%)',
    '--card-foreground': activeVars['--card-foreground'] || 'hsl(222deg 84% 5%)',
    '--primary': activeVars['--primary'] || 'hsl(222deg 84% 5%)',
    '--primary-foreground': activeVars['--primary-foreground'] || 'hsl(210deg 40% 98%)',
    '--secondary': activeVars['--secondary'] || 'hsl(210deg 40% 96%)',
    '--secondary-foreground': activeVars['--secondary-foreground'] || 'hsl(222deg 84% 5%)',
    '--muted': activeVars['--muted'] || 'hsl(210deg 40% 96%)',
    '--muted-foreground': activeVars['--muted-foreground'] || 'hsl(215deg 16% 47%)',
    '--accent': activeVars['--accent'] || 'hsl(210deg 40% 96%)',
    '--accent-foreground': activeVars['--accent-foreground'] || 'hsl(222deg 84% 5%)',
    '--destructive': activeVars['--destructive'] || 'hsl(0deg 84% 60%)',
    '--destructive-foreground': activeVars['--destructive-foreground'] || 'hsl(210deg 40% 98%)',
    '--border': activeVars['--border'] || 'hsl(214deg 32% 91%)',
    '--input': activeVars['--input'] || 'hsl(214deg 32% 91%)',
    '--ring': activeVars['--ring'] || 'hsl(222deg 84% 5%)',
    '--popover': activeVars['--popover'] || 'hsl(0deg 0% 100%)',
    '--popover-foreground': activeVars['--popover-foreground'] || 'hsl(222deg 84% 5%)',
    '--sidebar': activeVars['--sidebar'] || 'hsl(210deg 40% 98%)',
    '--sidebar-foreground': activeVars['--sidebar-foreground'] || 'hsl(210deg 40% 98%)',
    '--sidebar-primary': activeVars['--sidebar-primary'] || 'hsl(222deg 84% 5%)',
    '--sidebar-primary-foreground': activeVars['--sidebar-primary-foreground'] || 'hsl(210deg 40% 98%)',
    '--sidebar-accent': activeVars['--sidebar-accent'] || 'hsl(210deg 40% 96%)',
    '--sidebar-accent-foreground': activeVars['--sidebar-accent-foreground'] || 'hsl(222deg 84% 5%)',
    '--sidebar-border': activeVars['--sidebar-border'] || 'hsl(214deg 32% 91%)',
    '--sidebar-ring': activeVars['--sidebar-ring'] || 'hsl(222deg 84% 5%)',
    '--chart-1': activeVars['--chart-1'] || 'hsl(222deg 84% 5%)',
    '--chart-2': activeVars['--chart-2'] || 'hsl(215deg 16% 47%)',
    '--chart-3': activeVars['--chart-3'] || 'hsl(210deg 40% 96%)',
    '--chart-4': activeVars['--chart-4'] || 'hsl(222deg 84% 5%)',
    '--chart-5': activeVars['--chart-5'] || 'hsl(215deg 16% 47%)',
    '--radius': activeVars['--radius'] || '0.625rem',
    '--letter-spacing': activeVars['--letter-spacing'] || '0px',
    '--box-shadow': activeVars['--box-shadow'] || '0 4px 10px -2px hsl(0deg 0% 0% / 0.1)',
    '--font-sans': activeVars['--font-sans'] || 'Inter, ui-sans-serif, system-ui',
    '--font-serif': activeVars['--font-serif'] || 'Lora, ui-serif',
    '--font-mono': activeVars['--font-mono'] || '"Fira Code", ui-monospace',
    // Apply font families directly to ensure they work
    fontFamily: activeVars['--font-sans'] || 'Inter, ui-sans-serif, system-ui',
  };

  return (
    <div 
      id="preview-surface" 
      className="flex min-h-0 flex-1 flex-col"
      style={{
        ...previewStyle,
        backgroundColor: activeVars['--background'] || 'hsl(0deg 0% 100%)',
        color: activeVars['--foreground'] || 'hsl(222deg 84% 5%)'
      }}
    >
      {/* Top-level skeleton - AppShell */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* TopBarScrollArea - horizontal ScrollArea with gradient edges */}
        <div className="relative">
          <PreviewHeader />
          {/* Gradient edges for scroll fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent opacity-0" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent opacity-0" />
        </div>

        {/* MainSection - the active tab's content lives here */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-6">
              <SceneRouter />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
