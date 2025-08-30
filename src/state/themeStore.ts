import { create } from 'zustand';
import { InternalTheme, createDefaultTheme, adaptLLMResponse } from '@/lib/colors/adapter';
import { parseIntent, patchTheme } from '@/lib/colors/patcher';
import { hexToOklch } from '@/lib/colors/hexToOklch';

export type Scene = 'cards' | 'dashboard' | 'mail' | 'pricing' | 'colors';

interface ThemeStore {
  // Current theme state
  currentTheme: InternalTheme;
  isDarkMode: boolean;
  activeScene: Scene;
  
  // Generation state
  isGenerating: boolean;
  lastGenerationText: string;
  
  // History for undo/redo
  history: InternalTheme[];
  historyIndex: number;
  
  // Computed properties
  canUndo: boolean;
  canRedo: boolean;
  
  // Actions
  setTheme: (theme: InternalTheme) => void;
  toggleDarkMode: () => void;
  setScene: (scene: Scene) => void;
  setGenerating: (generating: boolean) => void;
  setLastGenerationText: (text: string) => void;
  
  // Theme modifications
  updateToken: (token: string, value: string, mode: 'light' | 'dark' | 'both') => void;
  updateFonts: (fonts: { sans?: string; serif?: string; mono?: string }) => void;
  updateRadius: (radius: string) => void;
  updateLetterSpacing: (spacing: string) => void;
  
  // History management
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  
  // Theme generation
  generateTheme: (prompt: string, useBase?: boolean, mode?: 'create' | 'remix' | 'tweak') => Promise<void>;
}

const MAX_HISTORY = 50;

// Utility function to safely apply theme to document root
function applyThemeToDocument(theme: InternalTheme, isDarkMode: boolean) {
  if (typeof document === 'undefined') return; // Server-side safety check
  
  const activeMode = isDarkMode ? theme.dark : theme.light;
  
  // Apply all theme variables to document root
  Object.entries(activeMode.vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  
  // Also apply fonts, radius, and letter-spacing
  document.documentElement.style.setProperty('--font-sans', theme.fonts.sans);
  document.documentElement.style.setProperty('--font-serif', theme.fonts.serif);
  document.documentElement.style.setProperty('--font-mono', theme.fonts.mono);
  document.documentElement.style.setProperty('--radius', theme.radius);
  document.documentElement.style.setProperty('--letter-spacing', theme.letterSpacing);
}

export const useThemeStore = create<ThemeStore>((set, get) => {
  // Create initial theme
  const initialTheme = createDefaultTheme();
  
  // Don't apply theme during SSR - only on client side
  let isInitialized = false;
  
  return {
    // Initial state
    currentTheme: initialTheme,
    isDarkMode: false,
    activeScene: 'cards',
    isGenerating: false,
    lastGenerationText: '',
    history: [initialTheme],
    historyIndex: 0,

    // Computed properties
    get canUndo() {
      return get().historyIndex > 0;
    },
    get canRedo() {
      return get().historyIndex < get().history.length - 1;
    },
  
    // Basic setters
    setTheme: (theme) => {
      set({ currentTheme: theme });
      
      // Apply theme to document root for sidebar updates (only on client side)
      if (typeof document !== 'undefined') {
        const { isDarkMode } = get();
        applyThemeToDocument(theme, isDarkMode);
      }
    },
    toggleDarkMode: () => {
      const { currentTheme } = get();
      const newDarkMode = !get().isDarkMode;
      
      set({ isDarkMode: newDarkMode });
      
      // Apply the current theme to document root with the new mode
      if (typeof document !== 'undefined') {
        applyThemeToDocument(currentTheme, newDarkMode);
      }
    },
    setScene: (scene) => set({ activeScene: scene }),
    setGenerating: (generating) => set({ isGenerating: generating }),
    setLastGenerationText: (text) => set({ lastGenerationText: text }),
    
    // Theme modifications
    updateToken: (token, value, mode) => {
      const { currentTheme, isDarkMode } = get();
      const updatedTheme = { ...currentTheme };
      
      // Convert HEX to OKLCH if it's a color token
      let processedValue = value;
      if (value.startsWith('#') && value.length === 7) {
        processedValue = `oklch(${hexToOklch(value)})`;
      }
      
      if (mode === 'light' || mode === 'both') {
        updatedTheme.light.vars[`--${token}`] = processedValue;
      }
      if (mode === 'dark' || mode === 'both') {
        updatedTheme.dark.vars[`--${token}`] = processedValue;
      }
      
      set({ currentTheme: updatedTheme });
      
      // Apply the entire updated theme to document root to ensure sidebar updates
      applyThemeToDocument(updatedTheme, isDarkMode);
      
      get().saveToHistory();
    },
    
    updateFonts: (fonts) => {
      const { currentTheme, isDarkMode } = get();
      const updatedTheme = { ...currentTheme };
      
      if (fonts.sans) updatedTheme.fonts.sans = fonts.sans;
      if (fonts.serif) updatedTheme.fonts.serif = fonts.serif;
      if (fonts.mono) updatedTheme.fonts.mono = fonts.mono;
      
      // Update CSS variables
      if (fonts.sans) updatedTheme.light.vars['--font-sans'] = fonts.sans;
      if (fonts.serif) updatedTheme.light.vars['--font-serif'] = fonts.serif;
      if (fonts.mono) updatedTheme.light.vars['--font-mono'] = fonts.mono;
      
      if (fonts.sans) updatedTheme.dark.vars['--font-sans'] = fonts.sans;
      if (fonts.serif) updatedTheme.dark.vars['--font-serif'] = fonts.serif;
      if (fonts.mono) updatedTheme.dark.vars['--font-mono'] = fonts.mono;
      
      set({ currentTheme: updatedTheme });
      
      // Apply the entire updated theme to document root to ensure sidebar updates
      applyThemeToDocument(updatedTheme, isDarkMode);
      
      get().saveToHistory();
    },
    
    updateRadius: (radius) => {
      const { currentTheme, isDarkMode } = get();
      const updatedTheme = { ...currentTheme };
      
      updatedTheme.radius = radius;
      updatedTheme.light.vars['--radius'] = radius;
      updatedTheme.dark.vars['--radius'] = radius;
      
      set({ currentTheme: updatedTheme });
      
      // Apply the entire updated theme to document root to ensure sidebar updates
      applyThemeToDocument(updatedTheme, isDarkMode);
      
      get().saveToHistory();
    },
    
    updateLetterSpacing: (spacing) => {
      const { currentTheme, isDarkMode } = get();
      const updatedTheme = { ...currentTheme };
      
      updatedTheme.letterSpacing = spacing;
      updatedTheme.light.vars['--letter-spacing'] = spacing;
      updatedTheme.dark.vars['--letter-spacing'] = spacing;
      
      set({ currentTheme: updatedTheme });
      
      // Apply the entire updated theme to document root to ensure sidebar updates
      applyThemeToDocument(updatedTheme, isDarkMode);
      
      get().saveToHistory();
    },
    
    // History management
    saveToHistory: () => {
      const { currentTheme, history, historyIndex } = get();
      
      // Remove any history after current index
      const newHistory = history.slice(0, historyIndex + 1);
      
      // Add current theme
      newHistory.push({ ...currentTheme });
      
      // Limit history size
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      
      set({
        history: newHistory,
        historyIndex: newHistory.length - 1
      });
    },
    
    undo: () => {
      const { history, historyIndex, isDarkMode } = get();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        const restoredTheme = { ...history[newIndex] };
        
        set({
          currentTheme: restoredTheme,
          historyIndex: newIndex
        });
        
        // Apply the restored theme to document root
        if (typeof document !== 'undefined') {
          applyThemeToDocument(restoredTheme, isDarkMode);
        }
      }
    },
    
    redo: () => {
      const { history, historyIndex, isDarkMode } = get();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        const restoredTheme = { ...history[newIndex] };
        
        set({
          currentTheme: restoredTheme,
          historyIndex: newIndex
        });
        
        // Apply the restored theme to document root
        if (typeof document !== 'undefined') {
          applyThemeToDocument(restoredTheme, isDarkMode);
        }
      }
    },
    
    reset: () => {
      const defaultTheme = createDefaultTheme();
      set({
        currentTheme: defaultTheme,
        history: [defaultTheme],
        historyIndex: 0
      });
      
      // Apply the default theme to document root
      if (typeof document !== 'undefined') {
        const { isDarkMode } = get();
        applyThemeToDocument(defaultTheme, isDarkMode);
      }
    },


    
    // Theme generation
    generateTheme: async (prompt, useBase = false, mode = 'create') => {
      const { currentTheme, setGenerating, setLastGenerationText, setTheme, saveToHistory } = get();
      
      setGenerating(true);
      
      try {
        console.log('Starting theme generation with prompt:', prompt);
        
        // Call the API endpoint
        const response = await fetch('/api/generate-theme', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            useBase,
            mode,
            seed: Math.floor(Math.random() * 1000), // Random seed for variety
            allowFonts: true,
            allowShadows: false
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
          throw new Error(errorMessage);
        }
        
        const llmResponse = await response.json();
        console.log('Received LLM response:', llmResponse);
        
        // Validate the response structure
        if (!llmResponse.theme || !llmResponse.theme.light || !llmResponse.theme.dark) {
          throw new Error('Invalid theme structure received from API');
        }
        
        let newTheme: InternalTheme;
        
        if (useBase) {
          // Parse intent and patch existing theme
          const intent = parseIntent(prompt);
          newTheme = patchTheme(currentTheme, llmResponse, intent);
        } else {
          // Create new theme from LLM response
          newTheme = adaptLLMResponse(llmResponse, `Generated Theme - ${mode}`);
        }
        
        console.log('Created new theme:', newTheme);
        console.log('Setting theme in store...');
        
        setTheme(newTheme);
        setLastGenerationText(llmResponse.text || 'Theme generated successfully');
        saveToHistory();
        
        console.log('Theme applied successfully');
        
      } catch (error) {
        console.error('Failed to generate theme:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        setLastGenerationText(`Failed to generate theme: ${errorMessage}`);
      } finally {
        setGenerating(false);
      }
    }
  };
});

// Selectors for better performance
export const useCurrentTheme = () => useThemeStore((state) => state.currentTheme);
export const useIsDarkMode = () => useThemeStore((state) => state.isDarkMode);
export const useActiveScene = () => useThemeStore((state) => state.activeScene);
export const useIsGenerating = () => useThemeStore((state) => state.isGenerating);
export const useLastGenerationText = () => useThemeStore((state) => state.lastGenerationText);
export const useCanUndo = () => useThemeStore((state) => state.historyIndex > 0);
export const useCanRedo = () => useThemeStore((state) => state.historyIndex < state.history.length - 1);
