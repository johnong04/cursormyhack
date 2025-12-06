# Product: Hafal.ai (SPM Prediction & Gamified Study App)

## Core Flow
1. **Dashboard:** Show "Malaysia Heatmap" (Hardcode: Kelantan/Terengganu = High Probability).
2. **Study Mode:** User selects "Sejarah" -> "Bab 4".
3. **The Reveal:**
   - User clicks "Reveal Answer".
   - App shows standard text answer.
   - **PLUS:** App plays funny ElevenLabs audio (Manglish) + Gemini Comic Strip.

## Sponsor Integrations (Must Include)
- **Convex:** Store user streaks/progress here.
- **Apify:** A simple background action that "fetches" trial paper links.
- **Lindy:** Embed the "Cikgu Hafal" chat widget in the corner.
- **ByteRover:** I am running this in CLI, so just assume context is managed.

## MVP Goal
Build the "Reveal" interaction first. It needs to feel "instant" and funny.

## Prediction Logic (HARD REQUIREMENT)
- Do NOT build a real AI model for the prediction. Follow example below:
- Create a hardcoded JSON object: `const PREDICTIONS = { 'kelantan': 0.9, 'kl': 0.4 }`.
- If user selects 'Sejarah', ALWAYS return 'Bab 4: Malayan Union' as the result.