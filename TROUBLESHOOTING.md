# 🔧 Troubleshooting the Gemini → ElevenLabs Flow

## ✅ Quick Checklist

Before you start, make sure:

1. ✅ `.env.local` exists in project root with valid API keys
2. ✅ Both dev servers are running (`npx convex dev` + `npm run dev`)
3. ✅ You've restarted servers after adding keys
4. ✅ Questions have been generated (at `/admin/setup`)

---

## 🧪 Step-by-Step Verification

### **Step 1: Test API Connections**

Go to http://localhost:3000/admin/setup

Click both test buttons:
- **"Test Gemini API"** → Should show green ✅
- **"Test ElevenLabs API"** → Should show green ✅

**If either fails:**
- Check `.env.local` has the correct keys
- Restart both servers
- Check Convex logs: `npx convex dashboard` → Functions tab

---

### **Step 2: Generate Questions**

Still at http://localhost:3000/admin/setup

Click **"Generate Questions"** → Wait ~10 seconds

**Expected result:** 
```
✅ Successfully generated and stored 5 questions for Sejarah Bab 4
```

**If it fails:**
1. Open Convex dashboard: `npx convex dashboard`
2. Go to **Functions** → Find `ai:generateSejarahBab4Bank`
3. Check the logs for errors

**Common errors:**
- `GEMINI_API_KEY is not set` → Add key to `.env.local` and restart
- `API key not valid` → Get a new key from https://makersuite.google.com/app/apikey
- `Failed to parse JSON` → Gemini response format changed, check logs

---

### **Step 3: Test the Reveal Flow**

Go to http://localhost:3000/study

Click **"Reveal Answer"**

**What you should see:**
1. Button changes to "Revealing..." ← **This means the workflow is triggered!**
2. Card shows "Generating your reveal..." with spinner
3. After ~5-10 seconds:
   - Standard answer appears
   - Comic illustration loads (placeholder SVG for now)
   - "Play Funny Explanation" button appears

**If it gets stuck on "Revealing...":**

Open Browser DevTools (F12):

1. **Console tab** → Look for errors:
   ```
   Error during reveal: ...
   ```
   
2. **Network tab** → Filter by "reveal" → Click the request → Check:
   - Status: Should be 200
   - Response: Look at the JSON:
     ```json
     {
       "success": false,
       "message": "Error: ..."
     }
     ```

3. **Common errors:**
   - `No questions found` → Go back to Step 2
   - `GEMINI_API_KEY is not set` → Check `.env.local`
   - `ElevenLabs API error: 401` → Check ELEVENLABS_API_KEY

---

### **Step 4: Verify Audio Playback**

After reveal succeeds, click **"Play Funny Explanation"**

**Expected:** Audio plays with Manglish explanation

**If no audio plays:**
1. Check if `audioUrl` is in the response (Network tab)
2. If `audioUrl` is present but not playing:
   - Browser might block autoplay
   - Check Console for audio errors
3. If `audioUrl` is missing:
   - ELEVENLABS_API_KEY not set
   - Check Convex logs for ElevenLabs errors

---

## 📊 Using Convex Dashboard for Debugging

Open dashboard:
```bash
npx convex dashboard
```

### **Check Questions Were Generated**

1. Click **Data** tab
2. Select `questions` table
3. Should see 5 records with:
   - `subject`: "Sejarah"
   - `chapter`: "Bab 4"
   - `standardAnswer`: text
   - `comicPrompt`: text
   - `voiceExplanation`: text

**If table is empty:** Questions weren't generated. Go to Step 2.

### **Check Function Logs**

1. Click **Functions** tab
2. Look for recent runs of:
   - `ai:generateSejarahBab4Bank`
   - `reveal:revealSejarahBab4`
   - `elevenlabs:generateVoice`
3. Click any function → View logs with emojis:
   ```
   🤖 Calling Gemini API...
   ✅ Audio generated successfully
   ❌ Error: ...
   ```

---

## 🐛 Common Issues & Solutions

### **Issue: "GEMINI_API_KEY is not set"**

**Solution:**
1. Create/edit `.env.local` in project root
2. Add:
   ```env
   GEMINI_API_KEY=AIzaSy...your_key
   ```
3. Restart BOTH servers:
   ```bash
   # Terminal 1: Ctrl+C then restart
   npx convex dev
   
   # Terminal 2: Ctrl+C then restart
   npm run dev
   ```

---

### **Issue: "ElevenLabs API error: 401 Unauthorized"**

**Solution:**
1. Get new API key from https://elevenlabs.io/
2. Add to `.env.local`:
   ```env
   ELEVENLABS_API_KEY=sk_...your_key
   ```
3. Restart both servers

---

### **Issue: "No questions found"**

**Solution:**
1. Go to http://localhost:3000/admin/setup
2. Click "Generate Questions"
3. Wait for success message
4. Try reveal again

---

### **Issue: Reveal gets stuck on "Revealing..."**

**Check:**
1. Browser Console for JavaScript errors
2. Network tab → Look for failed requests
3. Convex dashboard → Functions → Check for errors

**Most common cause:** One of the API keys is invalid or missing

---

### **Issue: Audio doesn't play**

**Solutions:**
1. **No ELEVENLABS_API_KEY set:**
   - Add key to `.env.local`
   - Restart servers
   
2. **Browser blocks audio:**
   - User must interact with page first (click something)
   - Try clicking "Play" button again
   
3. **API quota exceeded:**
   - Check ElevenLabs dashboard for quota
   - Free tier: 10,000 characters/month

---

### **Issue: Comic image is just placeholder**

**This is expected for MVP!**

The current implementation uses a placeholder SVG. To add real image generation:

1. Wait for Gemini Nano Banana API to be stable
2. Update `convex/ai.ts` → `generateComicImage`
3. Use Imagen or other image generation API

For now, the placeholder shows the comic prompt text, which proves the flow is working.

---

## 🔍 Debug Mode

To see detailed logs in Convex:

1. All actions now have console.log statements with emojis:
   - 🤖 = Gemini calls
   - 🎨 = Image generation
   - 🎙️ = Audio generation
   - ✅ = Success
   - ❌ = Error

2. View logs in Convex dashboard:
   ```bash
   npx convex dashboard
   ```
   → Functions tab → Click any function run

---

## 📝 Verification Checklist

Use this to verify the complete flow works:

- [ ] Convex dev is running
- [ ] Next.js dev is running
- [ ] `.env.local` has `GEMINI_API_KEY`
- [ ] `.env.local` has `ELEVENLABS_API_KEY`
- [ ] Both API tests pass (green ✅ at `/admin/setup`)
- [ ] Questions generated successfully (5 questions)
- [ ] Reveal button triggers "Revealing..." state
- [ ] Answer appears after ~5-10 seconds
- [ ] Comic image displays (placeholder SVG)
- [ ] Audio button appears
- [ ] Audio plays when clicked
- [ ] Convex dashboard shows successful function runs

---

## 🆘 Still Not Working?

### **Check Environment Variables**

Run this in your terminal:
```bash
# Windows
type .env.local

# Mac/Linux
cat .env.local
```

Should show:
```env
CONVEX_DEPLOYMENT=dev:...
NEXT_PUBLIC_CONVEX_URL=https://...
GEMINI_API_KEY=AIzaSy...
ELEVENLABS_API_KEY=sk_...
```

**If missing:** Create the file and add keys

**If present but not working:** Restart both dev servers

---

### **Check API Key Validity**

**Gemini:**
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent" \
  -H "x-goog-api-key: YOUR_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"test"}]}]}'
```

Should return JSON, not 401/403

**ElevenLabs:**
```bash
curl "https://api.elevenlabs.io/v1/user" \
  -H "xi-api-key: YOUR_KEY"
```

Should return user info, not 401

---

### **Nuclear Option: Fresh Start**

If nothing works:

```bash
# Stop all servers (Ctrl+C)

# Delete node_modules
rm -rf node_modules
npm install

# Clear Convex
npx convex dev --once

# Restart everything
# Terminal 1:
npx convex dev

# Terminal 2:
npm run dev

# Go to /admin/setup and start over
```

---

## 📚 Helpful Links

- **Gemini API Docs**: https://ai.google.dev/gemini-api/docs
- **ElevenLabs Docs**: https://elevenlabs.io/docs/api-reference/text-to-speech
- **Convex Docs**: https://docs.convex.dev/
- **Get Gemini Key**: https://makersuite.google.com/app/apikey
- **Get ElevenLabs Key**: https://elevenlabs.io/ → Profile → API Keys

---

**The flow is designed to work automatically once the keys are set!** If you see "Revealing..." that means the workflow is triggering correctly. Check the logs to see where it's failing.

