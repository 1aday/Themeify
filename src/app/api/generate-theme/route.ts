import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    
    const body = await request.json();
    const { prompt, useBase, images, svg, mode } = body;
    
    console.log('Request body:', { prompt, useBase, mode });
    
    // Read the system prompt
    let systemPrompt: string;
    try {
      const systemPromptPath = join(process.cwd(), 'system_prompt.txt');
      console.log('System prompt path:', systemPromptPath);
      
      systemPrompt = readFileSync(systemPromptPath, 'utf-8');
      console.log('System prompt loaded, length:', systemPrompt.length);
      
      // Replace the JSON instructions with CSS schema instructions
      systemPrompt = systemPrompt.replace(
        /I output JSON matching the schema exactly\./,
        'I output CSS matching the schema exactly.'
      );
    } catch (fileError) {
      console.error('Error reading system prompt:', fileError);
      return NextResponse.json(
        { error: `Failed to read system prompt: ${fileError}` },
        { status: 500 }
      );
    }
    
    // Check if OpenAI API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('No OpenAI API key found');
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }
    
    console.log('OpenAI API key found, length:', apiKey.length);

    // Create a JSON schema description for OpenAI to follow exactly
    // Create a JSON schema description for OpenAI to follow exactly
    const jsonSchemaDescription = `
IMPORTANT: You must respond with a JSON object that exactly matches this structure:

{
  "text": "Your friendly response text here",
  "theme": {
    "light": {
      "background": "#FFFFFF",
      "foreground": "#020817",
      "card": "#FFFFFF",
      "card-foreground": "#020817",
      "popover": "#FFFFFF",
      "popover-foreground": "#020817",
      "primary": "#1E40AF",
      "primary-foreground": "#F8FAFC",
      "secondary": "#F1F5F9",
      "secondary-foreground": "#0F172A",
      "muted": "#F1F5F9",
      "muted-foreground": "#64748B",
      "accent": "#F1F5F9",
      "accent-foreground": "#0F172A",
      "destructive": "#[generated-color]",
      "destructive-foreground": "#[generated-color]",
      "border": "#E2E8F0",
      "input": "#E2E8F0",
      "ring": "#1D4ED8",
      "chart-1": "#1E40AF",
      "chart-2": "#1D4ED8",
      "chart-3": "#2563EB",
      "chart-4": "#3B82F6",
      "chart-5": "#60A5FA",
      "sidebar": "#F8FAFC",
      "sidebar-foreground": "#020817",
      "sidebar-primary": "#1E40AF",
      "sidebar-primary-foreground": "#F8FAFC",
      "sidebar-accent": "#F1F5F9",
      "sidebar-accent-foreground": "#0F172A",
      "sidebar-border": "#E2E8F0",
      "sidebar-ring": "#1D4ED8",
      "font-sans": "Inter",
      "font-serif": "Lora",
      "font-mono": "Fira Code",
      "radius": "0.5rem",
      "shadow-color": "#020817",
      "shadow-opacity": "0.1",
      "shadow-blur": "10px",
      "shadow-spread": "-3px",
      "shadow-offset-x": "0px",
      "shadow-offset-y": "4px",
      "letter-spacing": "0px"
    },
    "dark": {
      "background": "#020817",
      "foreground": "#F8FAFC",
      "card": "#020817",
      "card-foreground": "#F8FAFC",
      "popover": "#020817",
      "popover-foreground": "#F8FAFC",
      "primary": "#3B82F6",
      "primary-foreground": "#F8FAFC",
      "secondary": "#1E293B",
      "secondary-foreground": "#F8FAFC",
      "muted": "#1E293B",
      "muted-foreground": "#94A3B8",
      "accent": "#1E293B",
      "accent-foreground": "#F8FAFC",
      "destructive": "#[generated-color]",
      "destructive-foreground": "#[generated-color]",
      "border": "#1E293B",
      "input": "#1E293B",
      "ring": "#2563EB",
      "chart-1": "#3B82F6",
      "chart-2": "#60A5FA",
      "chart-3": "#93C5FD",
      "chart-4": "#BFDBFE",
      "chart-5": "#DBEAFE",
      "sidebar": "#0B1120",
      "sidebar-foreground": "#F8FAFC",
      "sidebar-primary": "#3B82F6",
      "sidebar-primary-foreground": "#F8FAFC",
      "sidebar-accent": "#1E293B",
      "sidebar-accent-foreground": "#F8FAFC",
      "sidebar-border": "#1E293B",
      "sidebar-ring": "#2563EB",
      "font-sans": "Inter",
      "font-serif": "Lora",
      "font-mono": "Fira Code",
      "radius": "0.5rem",
      "shadow-color": "#000000",
      "shadow-opacity": "0.5",
      "shadow-blur": "15px",
      "shadow-spread": "-5px",
      "shadow-offset-x": "0px",
      "shadow-offset-y": "5px",
      "letter-spacing": "0px"
    }
  }
}

All colors must be in HEX format (#RRGGBB). Do not use rgba() or other formats.


All colors must be in HEX format (#RRGGBB). Do not use rgba() or other formats.
`;

    // Prepare the user message with system prompt included
    let userMessage = systemPrompt + '\n\n' + jsonSchemaDescription + '\n\nUser request: ' + prompt;
    if (useBase) {
      userMessage = systemPrompt + '\n\n' + jsonSchemaDescription + '\n\nUser request: @[base_theme] ' + prompt;
    }
    
    // Add image/SVG context if provided
    if (images && images.length > 0) {
      userMessage += `\n\nImages provided: ${images.length} image(s)`;
    }
    if (svg) {
      userMessage += `\n\nSVG provided: ${svg}`;
    }

    console.log('Calling OpenAI API with:', {
      model: 'gpt-4.1-nano-2025-04-14',
      promptLength: prompt.length
    });

    // Call OpenAI API with chat completions format for gpt-4.1-nano
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-nano-2025-04-14',
        messages: [
          {
            role: 'system',
            content: systemPrompt + '\n\n' + jsonSchemaDescription
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: 'No response content from OpenAI' },
        { status: 500 }
      );
    }

    console.log('OpenAI response received, content length:', content.length);

    // Parse the JSON response
    let llmResponse;
    try {
      llmResponse = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      console.error('Raw content:', content);
      return NextResponse.json(
        { error: 'Invalid JSON response from OpenAI' },
        { status: 500 }
      );
    }

    // Use exactly what OpenAI gives us - no validation or modification
    console.log('Using OpenAI response as-is:', llmResponse);
    return NextResponse.json(llmResponse);

  } catch (error) {
    console.error('Theme generation error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
