# Themer - shadcn/ui Theme Generator

A web application that lets users generate and edit **shadcn/ui** themes from **text prompts, images, or SVG**. The left panel handles generation and editing; the **right panel is a live mockup** that instantly reflects the active theme without reloading the page or restyling the editor chrome.

## Features

- **AI-Powered Theme Generation**: Generate themes from natural language prompts
- **Image & SVG Analysis**: Upload images or paste SVG to extract color schemes
- **Live Preview**: Multiple preview scenes (Cards, Dashboard, Mail, Pricing, Color Palette)
- **Theme Editing**: Manual editing of colors, typography, and other properties
- **Accessibility**: WCAG AA contrast checking with auto-fix capabilities
- **Import/Export**: Support for CSS and JSON formats
- **Undo/Redo**: Full history management for theme changes

## Architecture

The application follows the specifications outlined in the PRD:

- **Left Sidebar (360px)**: Theme generation and editing tabs
- **Right Content**: Live preview with scene tabs and controls
- **Scoped Theme Isolation**: Preview themes don't affect the editor chrome
- **OKLCH Color Model**: Internal rendering uses OKLCH for perceptual stability
- **HEX Output**: LLM generates HEX colors as specified in system_prompt.txt

## Tech Stack

- **Next.js 15** with App Router
- **Tailwind CSS 4** with CSS variables
- **shadcn/ui** components
- **Zustand** for state management
- **Culori** for color conversions
- **Radix UI** primitives

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Generating Themes

1. **Text Prompts**: Enter natural language descriptions like "Retro Terminal UI, green phosphor glow"
2. **Image Upload**: Drop images to extract dominant colors and mood
3. **SVG Analysis**: Paste SVG markup to analyze colors and styles
4. **Base Theme Patching**: Use `@[base_theme]` to modify existing themes

### Editing Themes

- **Colors Tab**: Edit all color tokens with live preview and contrast checking
- **Typography Tab**: Select Google Fonts and adjust letter spacing
- **Other Tab**: Modify border radius, shadows, and global transforms

### Preview Scenes

- **Cards**: KPIs, graphs, forms, and CTAs
- **Dashboard**: Tables, filters, and KPI tiles
- **Mail**: Sidebar navigation and message view
- **Pricing**: Tiered pricing with primary CTAs
- **Color Palette**: Complete theme color overview

## API Integration

The theme generation uses the system prompt defined in `system_prompt.txt` to ensure consistent LLM behavior and output format.

## Development

### Project Structure

```
/src
  /components
    /editor          # Theme editing interface
    /preview         # Live preview system
    /ui              # shadcn/ui components
  /lib
    /colors          # Color utilities and conversion
    /fonts           # Google Fonts data
  /state             # Zustand store
  /pages/api         # API endpoints
```

### Key Components

- **SidebarEditor**: Main editing interface with tabs
- **ThemePreview**: Scoped preview wrapper with scene routing
- **Scene Components**: Individual preview scenes (Cards, Dashboard, etc.)
- **Color Utilities**: HEX↔OKLCH conversion, contrast checking
- **Theme Store**: Centralized state management

## Contributing

This project implements the specifications from the PRD document. All changes should maintain:

1. **Preview isolation** - Editor chrome never inherits preview themes
2. **OKLCH color model** - Internal rendering uses OKLCH, LLM uses HEX
3. **Accessibility compliance** - WCAG AA contrast requirements
4. **Performance** - Theme changes apply in ≤1 frame

## License

MIT License - see LICENSE file for details.
