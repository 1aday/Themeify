'use client';

import { useThemeStore } from '@/state/themeStore';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/ui/logo';
import { 
  Maximize2, 
  Minimize2, 
  Pointer, 
  MoreHorizontal,
  Undo2,
  Redo2,
  RotateCcw
} from 'lucide-react';

const SCENES = [
  { id: 'landing', label: 'Landing' },
  { id: 'cards', label: 'Cards' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'mail', label: 'Mail' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'colors', label: 'Brand' },
] as const;

export function PreviewHeader() {
  const { 
    activeScene, 
    setScene, 
    isDarkMode, 
    toggleDarkMode, 
    undo, 
    redo, 
    reset,
    canUndo,
    canRedo,
    generateTheme
  } = useThemeStore();
  
  const handleDarkModeToggle = () => {
    toggleDarkMode();
    // Theme is automatically preserved because we're just switching the mode
    // The same theme object is used, just with different vars for light/dark
  };

  const handleSceneChange = (value: string) => {
    // Type-safe conversion from string to Scene
    if (SCENES.some(scene => scene.id === value)) {
      setScene(value as 'cards' | 'dashboard' | 'mail' | 'pricing' | 'colors');
    }
  };

  const handleRegenerate = async () => {
    // Regenerate with a default prompt to create a new random theme
    await generateTheme('Create a modern, professional theme with a unique color palette and typography', false, 'create');
  };

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-4">
      <div className="flex h-20 items-center px-4">
        {/* Logo Area - Left Side */}
        <div className="flex items-center space-x-4 mr-6">
          <Logo size="sm" showGenerateButton={false} />
        </div>
        
        {/* TopBar - Tabs wrapper */}
        <div className="flex items-center space-x-4 flex-1">
          <Tabs 
            value={activeScene} 
            onValueChange={handleSceneChange}
            className="w-full"
          >
            <TabsList className="h-10 p-1 rounded-full">
              {SCENES.map((scene) => (
                <TabsTrigger
                  key={scene.id}
                  value={scene.id}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {scene.label}
                </TabsTrigger>
              ))}
              {/* More menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full ml-2"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TabsList>
          </Tabs>
        </div>

        {/* TopBarActions - small icon buttons */}
        <div className="flex items-center space-x-2">
          {/* Regenerate button */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRegenerate}
            className="h-8 px-3"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Regenerate
          </Button>

          <div className="w-px h-4 bg-border" />

          {/* Theme toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Light</span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={handleDarkModeToggle}
              className="data-[state=checked]:bg-primary"
            />
            <span className="text-xs text-muted-foreground">Dark</span>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Action buttons */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Pointer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-4 bg-border" />

          {/* Undo/Redo/Reset */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={undo}
            disabled={!canUndo}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={redo}
            disabled={!canRedo}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={reset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
