'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useThemeStore, useLogoUrl, useIsGeneratingLogo } from '@/state/themeStore';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showGenerateButton?: boolean;
  onLogoGenerated?: (logoUrl: string) => void;
  customPrompt?: string;
}

export function Logo({ 
  className = '', 
  size = 'md', 
  showGenerateButton = true,
  onLogoGenerated,
  customPrompt
}: LogoProps) {
  const [error, setError] = useState<string | null>(null);
  const { currentTheme, generateLogo, isDarkMode, lastLogoPrompt } = useThemeStore();
  const logoUrl = useLogoUrl();
  const isGenerating = useIsGeneratingLogo();

  const sizeClasses = {
    sm: 'w-40 aspect-[3/2]', // 3:2 aspect ratio - bigger for nav
    md: 'w-48 aspect-[3/2]', // 3:2 aspect ratio
    lg: 'w-64 aspect-[3/2]' // 3:2 aspect ratio - much bigger for brand page
  };

  const handleGenerateLogo = async () => {
    setError(null);
    
    try {
      const prompt = customPrompt || `Create a modern, minimalist logo for "${currentTheme.name}" - clean design, suitable for web use, professional appearance, matches the theme aesthetic`;
      await generateLogo(prompt);
      onLogoGenerated?.(logoUrl || '');
    } catch (error) {
      console.error('Failed to generate logo:', error);
      // The error is already handled gracefully in the store, so we don't need to set it here
      // The store will update lastLogoPrompt with a user-friendly message
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      {/* Logo Display Area */}
      <div className="flex items-center justify-center">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={`${currentTheme.name} Logo`}
            className={`${sizeClasses[size]} object-contain rounded-lg transition-all duration-200 ${
              isDarkMode ? 'brightness-125 contrast-110' : ''
            }`}
          />
        ) : (
          <div className={`${sizeClasses[size]} flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25`}>
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : (
              <div className="text-center text-muted-foreground">
                <div className="text-xs">Logo</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generate Button */}
      {showGenerateButton && (
        <Button
          onClick={handleGenerateLogo}
          disabled={isGenerating}
          size="sm"
          variant="outline"
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-3 w-3 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-3 w-3 mr-2" />
              Generate Logo
            </>
          )}
        </Button>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-xs text-destructive text-center max-w-full break-words">
          {error}
        </div>
      )}

      {/* Status Message Display */}
      {lastLogoPrompt && lastLogoPrompt !== customPrompt && !isGenerating && (
        <div className={`text-xs text-center max-w-full break-words ${
          lastLogoPrompt.includes('Failed') || lastLogoPrompt.includes('flagged') || lastLogoPrompt.includes('exceeded') || lastLogoPrompt.includes('timeout') || lastLogoPrompt.includes('error')
            ? 'text-destructive' 
            : 'text-muted-foreground'
        }`}>
          {lastLogoPrompt}
        </div>
      )}


    </div>
  );
}
