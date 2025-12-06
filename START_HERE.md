# 🚀 QUICK START - Hafal.ai

## ⚡ Get Running in 3 Minutes

### Step 1: Add API Keys
Edit `.env.local` in the project root:

```env
GEMINI_API_KEY=your_gemini_key_here
ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

**Get keys:**
- Gemini: https://makersuite.google.com/app/apikey
- ElevenLabs: https://elevenlabs.io/ → Profile → API Keys

### Step 2: Start Servers
```bash
# Terminal 1
npx convex dev

# Terminal 2  
npm run dev
```

### Step 3: Generate Questions
1. Go to http://localhost:3000/admin/setup
2. Click **"Generate Questions"**
3. Wait ~10 seconds

### Step 4: Try Reveal!
1. Go to http://localhost:3000/study
2. Click **"Reveal Answer"**
3. Click **"Play Funny Explanation"** 🎙️

---

## 📖 Full Guides

- **API Keys**: See `API_KEYS_SETUP.md`
- **Complete Setup**: See `SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`

---

## 🐛 Troubleshooting

**"GEMINI_API_KEY is not set"**
→ Add key to `.env.local` and restart servers

**"No questions found"**
→ Go to `/admin/setup` and generate questions first

**Audio not playing**
→ Add `ELEVENLABS_API_KEY` to `.env.local` and restart

---

## 🎯 Key URLs

- Dashboard: http://localhost:3000
- Study Mode: http://localhost:3000/study
- Admin Panel: http://localhost:3000/admin/setup
- Convex Dashboard: `npx convex dashboard`

---

**That's it!** You now have a working AI-powered SPM study app with funny Manglish explanations! 🇲🇾

Questions? Open the detailed guides above or check Convex logs: `npx convex dashboard`

