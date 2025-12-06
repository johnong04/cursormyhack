# 🔑 API Keys Setup Guide

This guide will help you set up the required API keys for Hafal.ai.

## 📋 Required API Keys

You need **2 API keys** to run the app:
1. **Gemini API Key** (for Q&A generation)
2. **ElevenLabs API Key** (for voice generation)

---

## 1️⃣ Gemini API Key Setup

### Get Your API Key

1. Go to **Google AI Studio**: https://makersuite.google.com/app/apikey
2. Click **"Get API key"** or **"Create API key"**
3. Choose **"Create API key in new project"** (or use existing project)
4. Copy the generated API key (starts with `AIza...`)

### Add to Your Project

Open or create `.env.local` in your project root and add:

```env
GEMINI_API_KEY=AIzaSy...your_key_here
```

### Test Your Key

Run this command to verify it works:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent" \
  -H "x-goog-api-key: YOUR_API_KEY_HERE" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{"contents":[{"parts":[{"text":"Say hello"}]}]}'
```

### Pricing

- **Free tier**: 1,500 requests per day (for `gemini-2.0-flash-exp`)
- Perfect for development and testing!
- See pricing: https://ai.google.dev/pricing

---

## 2️⃣ ElevenLabs API Key Setup

### Get Your API Key

1. Sign up at **ElevenLabs**: https://elevenlabs.io/
2. Go to your **Profile** (click your avatar in top-right)
3. Navigate to **"API Keys"** section
4. Click **"Create API Key"**
5. Give it a name (e.g., "Hafal.ai Dev")
6. Copy the generated key

### Add to Your Project

Add this to your `.env.local`:

```env
ELEVENLABS_API_KEY=sk_...your_key_here
```

### (Optional) Create a Custom Voice for Malaysian Accent

For the authentic funny Manglish experience:

1. Go to **ElevenLabs Voice Library**: https://elevenlabs.io/voice-library
2. Search for "Malaysian" or "Asian English" voices
3. OR create your own custom voice:
   - Go to **"Voices"** → **"Add Voice"**
   - Upload 1-2 minutes of audio with Malaysian accent
   - ElevenLabs will clone the voice!
4. Copy the **Voice ID** (looks like `21m00Tcm4TlvDq8ikWAM`)

Add the custom voice ID to `.env.local`:

```env
ELEVENLABS_VOICE_ID=your_custom_voice_id_here
```

If you don't set this, the app will use a default English voice.

### Test Your Key

Run this curl command:

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM" \
  -H "xi-api-key: YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello from ElevenLabs!","model_id":"eleven_multilingual_v2"}' \
  --output test-audio.mp3
```

Then play `test-audio.mp3` to verify it works!

### Pricing

- **Free tier**: 10,000 characters/month (about 40-50 audio generations)
- Perfect for development!
- See pricing: https://elevenlabs.io/pricing

---

## 3️⃣ Complete .env.local File

Your final `.env.local` should look like this:

```env
# Convex (auto-generated when you run npx convex dev)
CONVEX_DEPLOYMENT=dev:xxxxxxxx
NEXT_PUBLIC_CONVEX_URL=https://xxxxxxxx.convex.cloud

# Gemini API (Required)
GEMINI_API_KEY=AIzaSy...your_gemini_key

# ElevenLabs API (Required)
ELEVENLABS_API_KEY=sk_...your_elevenlabs_key

# ElevenLabs Custom Voice (Optional - for Malaysian accent)
ELEVENLABS_VOICE_ID=your_voice_id_here

# Apify (Optional - uses mock data if not set)
APIFY_API_TOKEN=your_apify_token
```

---

## 🚀 Quick Start After Adding Keys

1. **Restart your dev servers** (both Convex and Next.js):
   ```bash
   # Terminal 1: Stop (Ctrl+C) and restart
   npx convex dev
   
   # Terminal 2: Stop (Ctrl+C) and restart
   npm run dev
   ```

2. **Generate questions**:
   - Go to http://localhost:3000/admin/setup
   - Click **"Generate Questions"**
   - Wait ~10 seconds for Gemini to create 5 Q&A pairs

3. **Try the Reveal feature**:
   - Go to http://localhost:3000/study
   - Click **"Reveal Answer"**
   - Enjoy the funny Manglish explanation! 🎙️

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY is not set"

- Make sure the key is in `.env.local` (NOT `.env`)
- Restart both `npx convex dev` and `npm run dev`
- Check for typos in the variable name

### "ElevenLabs API error: 401"

- Your API key is invalid or expired
- Generate a new key from ElevenLabs dashboard
- Make sure there are no extra spaces in `.env.local`

### "Using placeholder audio"

- This means ELEVENLABS_API_KEY is not set
- The app will work but won't generate real audio
- Add your key and restart servers

### Questions not generating

- Check Convex logs: `npx convex dashboard`
- Look for error messages in the Functions section
- Verify your Gemini API key has quota remaining

---

## 📚 API Documentation Links

- **Gemini API Docs**: https://ai.google.dev/gemini-api/docs
- **Gemini Models**: https://ai.google.dev/gemini-api/docs/models/gemini
- **ElevenLabs Docs**: https://elevenlabs.io/docs/api-reference/text-to-speech
- **ElevenLabs Voice Settings**: https://elevenlabs.io/docs/speech-synthesis/voice-settings

---

## 💡 Pro Tips

1. **Voice Settings**: Edit `convex/elevenlabs.ts` to adjust:
   - `stability`: Lower = more expressive (try 0.3 for comedy)
   - `style`: Higher = more animated (try 0.7 for funny stories)
   - `similarity_boost`: How close to original voice

2. **Malaysian Voice**: Search "Malaysian English" on ElevenLabs voice library for pre-made voices!

3. **API Limits**: The free tiers are generous for development. Upgrade when you go to production.

4. **Security**: NEVER commit `.env.local` to Git! It's already in `.gitignore`.

---

## ✅ Verification Checklist

- [ ] Gemini API key added to `.env.local`
- [ ] ElevenLabs API key added to `.env.local`
- [ ] Both dev servers restarted
- [ ] Questions generated successfully at `/admin/setup`
- [ ] Reveal feature works at `/study`
- [ ] Audio plays when clicking "Play Funny Explanation"

---

**Need help?** Check the main `SETUP.md` file or open the Convex dashboard to view logs: `npx convex dashboard`

