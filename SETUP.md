# Hafal.ai - Setup Instructions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

Convex should already be initialized. The local deployment is configured automatically.

### 3. Configure API Keys

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Then add your API keys to `.env.local`:

#### Required API Keys:

**Gemini API Key** (for question generation and comic prompts):

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Add to `.env.local`: `GEMINI_API_KEY=your_key_here`

**ElevenLabs API Key** (for funny Manglish voice):

1. Sign up at https://elevenlabs.io/
2. Go to Profile → API Keys
3. Create a new API key
4. Add to `.env.local`: `ELEVENLABS_API_KEY=your_key_here`

#### Optional API Keys:

**Apify Token** (for trial papers scraping):

- Add to `.env.local`: `APIFY_API_TOKEN=your_token_here`
- If not provided, mock data will be used

### 4. Generate Question Bank

Before you can use the Reveal feature, you need to generate the Sejarah Bab 4 question bank:

1. Start the Convex dev server in a separate terminal:

```bash
npx convex dev
```

2. In another terminal, run the generation action:

```bash
npx convex run ai:generateSejarahBab4Bank
```

This will use Gemini to create 5 Q&A pairs with comic prompts and voice explanations.

### 5. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🎮 How It Works

### Architecture

- **Frontend**: Next.js 15 (App Router) with Tailwind CSS + Shadcn UI
- **Backend**: Convex (handles all data and API orchestration)
- **AI Integration**:
  - Gemini for Q&A generation and comic prompts
  - ElevenLabs for funny Manglish voice explanations
  - Apify for trial papers (stub implementation)

### The Reveal Flow

1. User clicks "Reveal Answer" on the Study page
2. Convex action `revealSejarahBab4` runs:
   - Selects a random question from Sejarah Bab 4
   - Updates user streak/progress
   - Generates comic image (if not cached)
   - Generates audio explanation (if not cached)
   - Returns everything to the frontend
3. UI displays:
   - Standard answer text (immediately)
   - Comic illustration (Gemini-generated)
   - Audio player with funny Manglish explanation

### Data Storage

All data is stored in Convex:

- `questions`: Q&A bank with comic prompts and voice scripts
- `userProgress`: Streaks, reveals count, topics completed
- `revealSessions`: Individual reveal events for analytics
- `trialPapers`: Apify-fetched trial paper links

## 🔧 Customization

### Voice Settings

Edit `convex/elevenlabs.ts` to customize the voice:

- Change `voiceId` for different voices
- Adjust `voice_settings` for stability, similarity, and style

### Question Generation

Edit `convex/ai.ts` to:

- Adjust the Gemini prompt for different Q&A styles
- Change the number of questions generated
- Modify the comic prompt style

### Image Generation

Currently uses placeholder SVGs. To integrate real image generation:

1. Use Gemini Imagen API when available
2. Or integrate with other image APIs (DALL-E, Midjourney, etc.)
3. Update `generateComicImage` in `convex/ai.ts`

## 📝 Manual Testing

### Test the Reveal Flow

1. Generate questions: `npx convex run ai:generateSejarahBab4Bank`
2. Go to http://localhost:3000/study
3. Click "Reveal Answer"
4. Verify:
   - Answer text appears
   - Comic image loads
   - Audio can be played
   - Streak updates on dashboard

### Test Progress Tracking

1. Do multiple reveals
2. Check dashboard at http://localhost:3000
3. Verify streak counter increases
4. Check "Sejarah Mastery" progress bar

## 🐛 Troubleshooting

**"No questions found" error**:

- Run the question generation action first
- Check Convex dashboard to verify questions exist

**API Key errors**:

- Verify keys are added to `.env.local`
- Restart the dev server after adding keys
- Check Convex logs for detailed error messages

**Audio not playing**:

- Check ELEVENLABS_API_KEY is set
- Verify browser allows audio playback (some browsers require user interaction)
- Check browser console for errors

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `ELEVENLABS_API_KEY`
   - `APIFY_API_TOKEN` (optional)
4. Deploy!

### Set Up Production Convex

1. Run `npx convex login` and create an account
2. Run `npx convex deploy` to create a production deployment
3. Convex will update your `.env.local` with production URLs
4. Add the production `CONVEX_URL` to Vercel

## 🎯 PRD Requirements Checklist

✅ Dashboard with Malaysia Heatmap (hardcoded Kelantan/Terengganu high probability)
✅ Study Mode with Sejarah → Bab 4 selection
✅ Reveal interaction with text answer, comic, and audio
✅ Convex stores user streaks/progress
✅ Apify integration stub for trial papers
✅ ByteRover context management (via CLI)
✅ Gemini generates Q&A bank and comic prompts
✅ ElevenLabs generates funny Manglish audio
✅ Prediction logic hardcoded (Sejarah → Bab 4: Malayan Union)

## 📚 Next Steps

- [ ] Add real Sejarah textbook PDF ingestion
- [ ] Integrate actual image generation API
- [ ] Implement real Apify scraper for trial papers
- [ ] Add user authentication
- [ ] Expand to other subjects (Math, Sains, etc.)
- [ ] Add more chapters beyond Bab 4
