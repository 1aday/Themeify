'use client';

import { useState, useMemo, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Collapsible } from '@/components/ui/collapsible';
import { useThemeStore } from '@/state/themeStore';
import { AlertTriangle, ExternalLink, Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

interface GoogleFont {
  family: string;
  category: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: Record<string, string>;
}

// Curated list of high-quality, popular fonts for better performance
const CURATED_FONTS: GoogleFont[] = [
  // Sans-serif fonts
  { family: 'Inter', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v8', lastModified: '2020-06-26', files: {} },
  { family: 'Roboto', category: 'sans-serif', variants: ['400', '500', '700'], subsets: ['latin'], version: 'v27', lastModified: '2020-06-26', files: {} },
  { family: 'Open Sans', category: 'sans-serif', variants: ['400', '600', '700'], subsets: ['latin'], version: 'v18', lastModified: '2020-06-26', files: {} },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v15', lastModified: '2020-06-26', files: {} },
  { family: 'Lato', category: 'sans-serif', variants: ['400', '700'], subsets: ['latin'], version: 'v23', lastModified: '2020-06-26', files: {} },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v25', lastModified: '2020-06-26', files: {} },
  { family: 'Source Sans Pro', category: 'sans-serif', variants: ['400', '600', '700'], subsets: ['latin'], version: 'v21', lastModified: '2020-06-26', files: {} },
  { family: 'Nunito', category: 'sans-serif', variants: ['400', '600', '700'], subsets: ['latin'], version: 'v25', lastModified: '2020-06-26', files: {} },
  { family: 'Ubuntu', category: 'sans-serif', variants: ['400', '500', '700'], subsets: ['latin'], version: 'v20', lastModified: '2020-06-26', files: {} },
  { family: 'Work Sans', category: 'sans-serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v18', lastModified: '2020-06-26', files: {} },
  
  // Serif fonts
  { family: 'Lora', category: 'serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v16', lastModified: '2020-06-26', files: {} },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700'], subsets: ['latin'], version: 'v28', lastModified: '2020-06-26', files: {} },
  { family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v22', lastModified: '2020-06-26', files: {} },
  { family: 'Source Serif Pro', category: 'serif', variants: ['400', '600', '700'], subsets: ['latin'], version: 'v8', lastModified: '2020-06-26', files: {} },
  { family: 'Crimson Text', category: 'serif', variants: ['400', '600', '700'], subsets: ['latin'], version: 'v19', lastModified: '2020-06-26', files: {} },
  
  // Monospace fonts
  { family: 'Fira Code', category: 'monospace', variants: ['400', '500'], subsets: ['latin'], version: 'v9', lastModified: '2020-06-26', files: {} },
  { family: 'Source Code Pro', category: 'monospace', variants: ['400', '500', '600'], subsets: ['latin'], version: 'v13', lastModified: '2020-06-26', files: {} },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['400', '500', '600', '700'], subsets: ['latin'], version: 'v1', lastModified: '2020-06-26', files: {} },
  { family: 'IBM Plex Mono', category: 'monospace', variants: ['400', '500', '600'], subsets: ['latin'], version: 'v19', lastModified: '2020-06-26', files: {} },
  { family: 'Roboto Mono', category: 'monospace', variants: ['400', '500', '700'], subsets: ['latin'], version: 'v22', lastModified: '2020-06-26', files: {} }
];

export function TypographyTab() {
  const { currentTheme, updateFonts, updateLetterSpacing } = useThemeStore();
  const [fonts, setFonts] = useState<GoogleFont[]>(CURATED_FONTS);
  const [loading, setLoading] = useState(false);
  const [searchQueries, setSearchQueries] = useState({
    sans: '',
    serif: '',
    mono: ''
  });
  const [showMoreFonts, setShowMoreFonts] = useState(false);

  // Memoized font lists for better performance
  const sansFonts = useMemo(() => 
    fonts.filter(font => font.category === 'sans-serif'), [fonts]
  );
  
  const serifFonts = useMemo(() => 
    fonts.filter(font => font.category === 'serif'), [fonts]
  );
  
  const monoFonts = useMemo(() => 
    fonts.filter(font => font.category === 'monospace'), [fonts]
  );

  // Debounced font update to prevent excessive re-renders
  const debouncedUpdateFonts = useDebouncedCallback(
    (fontType: 'sans' | 'serif' | 'mono', fontFamily: string) => {
      updateFonts({ ...currentTheme.fonts, [fontType]: fontFamily });
    },
    300 // 300ms delay
  );

  // Debounced letter spacing update
  const debouncedUpdateLetterSpacing = useDebouncedCallback(
    (spacing: string) => {
      updateLetterSpacing(spacing);
    },
    200 // 200ms delay
  );

  // Optimized font change handler
  const handleFontChange = useCallback((type: 'sans' | 'serif' | 'mono', fontFamily: string) => {
    debouncedUpdateFonts(type, fontFamily);
  }, [debouncedUpdateFonts]);

  // Optimized letter spacing handler
  const handleLetterSpacingChange = useCallback((value: number[]) => {
    debouncedUpdateLetterSpacing(value[0].toString());
  }, [debouncedUpdateLetterSpacing]);

  // Memoized current font getter
  const getCurrentFont = useCallback((type: 'sans' | 'serif' | 'mono') => {
    const font = currentTheme.fonts[type];
    return font.split(',')[0].replace(/['"]/g, '').trim();
  }, [currentTheme.fonts]);

  // Memoized filtered fonts for search
  const filteredSansFonts = useMemo(() => 
    sansFonts
      .filter(font => font.family.toLowerCase().includes(searchQueries.sans.toLowerCase()))
      .slice(0, showMoreFonts ? 100 : 50),
    [sansFonts, searchQueries.sans, showMoreFonts]
  );

  const filteredSerifFonts = useMemo(() => 
    serifFonts
      .filter(font => font.family.toLowerCase().includes(searchQueries.serif.toLowerCase()))
      .slice(0, showMoreFonts ? 100 : 50),
    [serifFonts, searchQueries.serif, showMoreFonts]
  );

  const filteredMonoFonts = useMemo(() => 
    monoFonts
      .filter(font => font.family.toLowerCase().includes(searchQueries.mono.toLowerCase()))
      .slice(0, showMoreFonts ? 100 : 50),
    [monoFonts, searchQueries.mono, showMoreFonts]
  );

  // Search query handler
  const handleSearchChange = useCallback((type: 'sans' | 'serif' | 'mono', value: string) => {
    setSearchQueries(prev => ({ ...prev, [type]: value }));
  }, []);

  // Load additional fonts only when needed
  const loadMoreFonts = useCallback(async () => {
    if (showMoreFonts) return; // Already loaded
    
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;
      if (!apiKey) {
        setShowMoreFonts(true);
        return;
      }

      const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`);
      if (response.ok) {
        const data = await response.json();
        setFonts([...CURATED_FONTS, ...(data.items || [])]);
      }
    } catch {
      console.warn('Failed to load additional fonts, using curated list');
    } finally {
      setLoading(false);
      setShowMoreFonts(true);
    }
  }, [showMoreFonts]);

  // Font dropdown component with search
  const FontDropdown = ({ 
    type, 
    label, 
    filteredFonts, 
    searchQuery, 
    onSearchChange, 
    onFontChange 
  }: {
    type: 'sans' | 'serif' | 'mono';
    label: string;
    filteredFonts: GoogleFont[];
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onFontChange: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={`font-${type}`}>{label}</Label>
      <Select value={getCurrentFont(type)} onValueChange={(value: string) => onFontChange(value)}>
        <SelectTrigger>
          <SelectValue placeholder={`Choose a ${type === 'sans' ? 'sans-serif' : type === 'serif' ? 'serif' : 'monospace'} font...`} />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${type === 'sans' ? 'sans-serif' : type === 'serif' ? 'serif' : 'monospace'} fonts...`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
          
          {/* Font list */}
          <div className="max-h-60 overflow-y-auto">
            {filteredFonts.length > 0 ? (
              filteredFonts.map(font => (
                <SelectItem key={font.family} value={font.family}>
                  <span style={{ fontFamily: font.family }} className="text-sm">
                    {font.family}
                  </span>
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No fonts found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
          
          {/* Load more option */}
          {!showMoreFonts && (
            <div className="border-t border-border p-2">
              <SelectItem value="__load_more__" onSelect={loadMoreFonts}>
                <span className="text-muted-foreground text-sm">Load more fonts...</span>
              </SelectItem>
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="flex items-start gap-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
        <div className="text-sm text-destructive">
          To use custom fonts, embed them in your project. See{' '}
          <a 
            href="https://tailwindcss.com/docs/font-family#font-families" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-destructive hover:underline font-medium"
          >
            Tailwind docs
            <ExternalLink className="h-3 w-3" />
          </a>{' '}
          for details.
        </div>
      </div>

      {/* Font Family Section */}
      <Collapsible title="Font Family" defaultOpen={true}>
        <div className="space-y-6">
          {/* Sans Serif Font */}
          <FontDropdown
            type="sans"
            label="Sans-Serif Font"
            filteredFonts={filteredSansFonts}
            searchQuery={searchQueries.sans}
            onSearchChange={(value) => handleSearchChange('sans', value)}
            onFontChange={(value) => handleFontChange('sans', value)}
          />

          {/* Serif Font */}
          <FontDropdown
            type="serif"
            label="Serif Font"
            filteredFonts={filteredSerifFonts}
            searchQuery={searchQueries.serif}
            onSearchChange={(value) => handleSearchChange('serif', value)}
            onFontChange={(value) => handleFontChange('serif', value)}
          />

          {/* Monospace Font */}
          <FontDropdown
            type="mono"
            label="Monospace Font"
            filteredFonts={filteredMonoFonts}
            searchQuery={searchQueries.mono}
            onSearchChange={(value) => handleSearchChange('mono', value)}
            onFontChange={(value) => handleFontChange('mono', value)}
          />
        </div>
      </Collapsible>

      {/* Letter Spacing Section */}
      <Collapsible title="Letter Spacing" defaultOpen={true}>
        <div className="space-y-2">
          <Label htmlFor="letter-spacing">Letter Spacing</Label>
          <div className="flex items-center gap-3">
            <div className="flex-1 px-3">
              <Slider
                id="letter-spacing"
                min={-2}
                max={10}
                step={0.1}
                value={[parseFloat(currentTheme.letterSpacing) || 0]}
                onValueChange={handleLetterSpacingChange}
                className="w-full"
              />
            </div>
            <Input
              type="number"
              value={currentTheme.letterSpacing}
              onChange={(e) => debouncedUpdateLetterSpacing(e.target.value)}
              className="w-20 h-8 text-center"
              step={0.1}
              min={-2}
              max={10}
            />
            <span className="text-sm text-muted-foreground">em</span>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
