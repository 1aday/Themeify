# Logo Generation Setup

## Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Required for logo generation
REPLICATE_API_TOKEN=r8_23y**********************************
OPENAI_API_KEY=your_openai_api_key_here
```

## How to Get Replicate API Token

1. Go to [Replicate.com](https://replicate.com)
2. Sign up or log in
3. Go to your account settings
4. Generate an API token
5. Copy the token and add it to your `.env.local` file

## Features Added

### 1. Logo Generation API (`/api/generate-logo`)
- Uses Replicate's `openai/gpt-image-1` model
- Generates logos based on theme names and prompts
- Quality set to "auto" with 1 image output
- Uses your OpenAI API key for generation

### 2. Logo Component (`/components/ui/logo.tsx`)
- Displays generated logos with fallback placeholder
- Generate and regenerate buttons
- Loading states and error handling
- Multiple sizes (sm, md, lg)
- Optional generate button display

### 3. Logo Integration in All Scenes
- **Landing Page**: Large logo in hero section
- **Cards Scene**: Medium logo in header
- **Dashboard**: Medium logo in header
- **Pricing**: Medium logo in header
- **Mail**: Medium logo in header
- **Colors**: Medium logo in header

### 4. Logo Generation in Generate Tab
- Dedicated logo generation section
- Small logo preview
- Generate button for creating logos

## Usage

1. Set up environment variables
2. Generate a theme
3. Go to the Generate tab
4. Click "Generate Logo" in the logo section
5. Logo will appear in all scenes automatically

## API Parameters

The logo generation uses these parameters:
- `quality`: "low" (optimized for speed and cost)
- `aspect_ratio`: "3:2" (standard logo aspect ratio)
- `number_of_images`: 1
- `prompt`: Auto-generated based on theme name and aesthetic
- `openai_api_key`: Your OpenAI API key

## Error Handling

- Missing API keys show helpful error messages
- Network errors are caught and displayed
- Invalid responses are handled gracefully
- Loading states provide user feedback
