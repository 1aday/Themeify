import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: NextRequest) {
  try {
    console.log('Logo generation API called');
    
    const body = await request.json();
    const { prompt, themeName } = body;
    
    console.log('Request body:', { prompt, themeName });
    
    // Check if Replicate API key is configured
    const replicateApiKey = process.env.REPLICATE_API_TOKEN;
    if (!replicateApiKey) {
      console.log('No Replicate API key found');
      return NextResponse.json(
        { error: 'Replicate API key not configured. Please add REPLICATE_API_TOKEN to your .env.local file.' },
        { status: 500 }
      );
    }
    
    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.log('No OpenAI API key found');
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }
    
    console.log('API keys found, initializing Replicate client');
    
    // Initialize Replicate client
    const replicate = new Replicate({
      auth: replicateApiKey,
    });
    
    // Create a logo-specific prompt if none provided
    const logoPrompt = prompt || `Create a modern, minimalist logo for "${themeName || 'Themer'}" - clean design, suitable for web use, professional appearance, high contrast, works well on both light and dark backgrounds, add a subtle border around the logo to make it work for both dark and white backgrounds`;
    
    console.log('Generating logo with prompt:', logoPrompt);
    
    // Generate logo using OpenAI's image model via Replicate
    const output = await replicate.run("openai/gpt-image-1", {
      input: {
        prompt: logoPrompt,
        quality: "low",
        number_of_images: 1,
        aspect_ratio: "3:2",
        openai_api_key: openaiApiKey
      }
    });
    
    console.log('Logo generation completed');
    
    // Extract the URL from the output
    const logoUrl = (output as any)[0]?.url();
    
    if (!logoUrl) {
      throw new Error('No logo URL returned from Replicate');
    }
    
    console.log('Logo URL:', logoUrl);
    
    return NextResponse.json({
      success: true,
      logoUrl,
      prompt: logoPrompt
    });
    
  } catch (error) {
    console.error('Logo generation error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle specific error cases
    let statusCode = 500;
    let userMessage = 'Failed to generate logo';
    
    if (errorMessage.includes('E005') || errorMessage.includes('sensitive')) {
      statusCode = 400;
      userMessage = 'Content flagged as sensitive. Please try a different prompt.';
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
      statusCode = 429;
      userMessage = 'Rate limit exceeded. Please try again in a moment.';
    } else if (errorMessage.includes('invalid') || errorMessage.includes('malformed')) {
      statusCode = 400;
      userMessage = 'Invalid prompt. Please try a different description.';
    } else if (errorMessage.includes('timeout')) {
      statusCode = 408;
      userMessage = 'Request timed out. Please try again.';
    } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
      statusCode = 503;
      userMessage = 'Network error. Please check your connection and try again.';
    }
    
    return NextResponse.json(
      { 
        error: userMessage,
        details: errorMessage,
        code: errorMessage.includes('E005') ? 'E005' : undefined
      },
      { status: statusCode }
    );
  }
}
