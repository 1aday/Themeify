'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { useThemeStore } from '@/state/themeStore';
import { Sparkles, Image } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

/**
 * Generate tab for creating themes from prompts, images, or SVG
 * Implements the core generation workflow as specified in the PRD
 */
export function GenerateTab() {
  const [prompt, setPrompt] = useState('');
  const [modifyPrompt, setModifyPrompt] = useState('');
  const [showModify, setShowModify] = useState(false);
  
  const { generateTheme, generateLogo, isGenerating, lastGenerationText } = useThemeStore();

  const loadingMessages = [
    "Crafting your theme...",
    "Mixing colors...",
    "Finding the perfect palette...",
    "Designing with intention...",
    "Creating something beautiful...",
    "Curating your aesthetic...",
    "Building visual harmony...",
    "Infusing personality...",
    "Balancing contrast...",
    "Polishing details..."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating, loadingMessages.length]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }
    
    // Generate both theme and logo in parallel
    await Promise.all([
      generateTheme(prompt, false, 'create'),
      generateLogo(prompt)
    ]);
    setShowModify(true);
  };

  const handleModify = async () => {
    if (!modifyPrompt.trim()) {
      return;
    }
    
    // Send modify prompt with previous generation context
    await generateTheme(modifyPrompt, true, 'tweak');
    setModifyPrompt('');
  };

  return (
    <div className="space-y-6">
      {/* Main Prompt Input */}
      <div className="space-y-3">
        <Label htmlFor="prompt" className="text-sm font-medium">
          What can I help you theme, Amir?
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe your theme..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Create Button */}
      <Button 
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        Create
      </Button>

      {/* Modify Section - appears after generation */}
      {showModify && (
        <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-muted">
          <Label htmlFor="modify-prompt" className="text-sm font-medium">
            Refine your theme
          </Label>
          <Textarea
            id="modify-prompt"
            placeholder="Describe what you'd like to adjust... (e.g., 'make it more vibrant', 'add more contrast', 'softer colors')"
            value={modifyPrompt}
            onChange={(e) => setModifyPrompt(e.target.value)}
            className="min-h-[80px] resize-none text-sm"
          />
          <Button 
            onClick={handleModify}
            disabled={isGenerating || !modifyPrompt.trim()}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Modify Theme
          </Button>
        </div>
      )}

      {/* Logo Generation Section */}
      <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-muted">
        <div className="flex items-center space-x-2">
          <Image className="h-4 w-4" />
          <Label className="text-sm font-medium">Generate Logo</Label>
        </div>
        <p className="text-xs text-muted-foreground">
          Create a custom logo that matches your theme
        </p>
        <Logo size="sm" showGenerateButton={true} customPrompt={prompt} />
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="relative">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60" />
            </div>
            <span className="font-medium tracking-wide min-w-[200px] text-center">
              {loadingMessages[currentMessageIndex]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
