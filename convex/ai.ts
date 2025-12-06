import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { GoogleGenAI } from "@google/genai";
import { v } from "convex/values";

// Initialize Gemini AI using the latest @google/genai SDK
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set. Add it to .env.local");
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Generate Sejarah Bab 4 question bank from PDF or hardcoded content
 * For MVP, this assumes the PDF is pre-processed and we generate Q&A based on
 * known Bab 4: Malayan Union content using the latest Gemini API
 */
export const generateSejarahBab4Bank = action({
  args: {
    pdfUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const genAI = getGeminiClient();

    // For MVP, we'll generate questions based on known Bab 4 content
    // In production, this would parse the PDF first
    const sejarahBab4Context = `
Topic: Bab 4 - Malayan Union (1946-1948)

Key Historical Facts:
1. The Malayan Union was proposed by the British in 1946 after World War II
2. Main features: Centralized government under British Governor, equal citizenship rights (jus soli), 
   and Malay rulers lost their sovereignty
3. Strong opposition from Malays led by Dato' Onn Jaafar and UMNO (formed March 1, 1946)
4. Reasons for opposition: Loss of Malay sovereignty, threat to Malay special rights, 
   citizenship given too easily to non-Malays
5. The Malayan Union was dissolved in 1948 and replaced by the Federation of Malaya
6. Federation of Malaya restored some Malay privileges and rulers' sovereignty
`;

    const prompt = `You are an expert SPM Sejarah teacher in Malaysia. Based on this content about Bab 4 (Malayan Union), 
generate 5 high-quality Q&A pairs for SPM students.

Context: ${sejarahBab4Context}

For EACH question, provide in this EXACT JSON format:
{
  "questions": [
    {
      "topicTitle": "Short topic name (e.g., 'Malayan Union Formation')",
      "questionText": "A specific SPM-style question",
      "standardAnswer": "Complete marking scheme answer (3-5 sentences)",
      "comicPrompt": "A wild, funny, but historically accurate prompt for a comic illustration. Make it like a meme or exaggerated historical scene. Example: 'Dato Onn Jaafar as a superhero dramatically tearing up the Malayan Union document while British officials watch in shock, manga style'",
      "voiceExplanation": "A funny Manglish explanation told like a joke or story. Use Malaysian slang like 'lah', 'wah', 'kan', 'aiyo'. Make it entertaining but educational. Example: 'Wah, this Malayan Union thing ah, the British come after war right, then they say eh lets do centralized government lah. But the Malays very angry one, because their Sultan become powerless already! Like taking away your nasi lemak in the morning, confirm angry right?'"
    }
  ]
}

Make the comic prompts VERY VISUAL and FUNNY. Make the voice explanations sound like your funny Malaysian friend explaining history at mamak. Keep answers factually correct but presentation should be entertaining!`;

    try {
      console.log("🤖 Calling Gemini API to generate questions...");
      
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: prompt,
      });
      
      const text = response.text();
      console.log("📥 Received response from Gemini");
      console.log("Response preview:", text.substring(0, 200));
      
      // Parse the JSON response
      let parsedData;
      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedData = JSON.parse(jsonMatch[0]);
        } else {
          parsedData = JSON.parse(text);
        }
        console.log(`✅ Successfully parsed ${parsedData.questions?.length || 0} questions`);
      } catch (parseError) {
        console.error("Failed to parse Gemini response:", text);
        throw new Error("Failed to parse Gemini response as JSON");
      }

      // Insert questions into the database
      const insertedIds = [];
      for (const q of parsedData.questions) {
        console.log(`💾 Storing question: ${q.topicTitle}`);
        const id = await ctx.runMutation(api.queries.insertQuestion, {
          subject: "Sejarah",
          chapter: "Bab 4",
          topicTitle: q.topicTitle,
          questionText: q.questionText,
          standardAnswer: q.standardAnswer,
          comicPrompt: q.comicPrompt,
          voiceExplanation: q.voiceExplanation,
        });
        insertedIds.push(id);
      }

      console.log(`🎉 Successfully generated and stored ${insertedIds.length} questions!`);

      return {
        success: true,
        message: `Successfully generated and stored ${insertedIds.length} questions for Sejarah Bab 4`,
        questionIds: insertedIds,
      };
    } catch (error) {
      console.error("❌ Error generating questions:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

/**
 * Generate a comic image using Gemini's Nano Banana image generation
 * Note: Using Gemini 2.5 Flash with image generation capability (Nano Banana)
 */
export const generateComicImage = action({
  args: {
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const genAI = getGeminiClient();

    const enhancedPromptRequest = `Take this comic prompt and enhance it for an AI image generator. 
Make it more specific, add art style details (like manga, cartoon, meme style), and ensure it's visually funny:

Original prompt: ${args.prompt}

Return ONLY the enhanced prompt, nothing else.`;

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: enhancedPromptRequest,
      });
      
      const enhancedPrompt = response.text().trim();

      // TODO: Use Gemini Nano Banana for actual image generation when available
      // For now, return a placeholder SVG with the prompt text
      // Simple sanitization for SVG text content
      const sanitizeForSvg = (text: string) => 
        text.replace(/[<>&'"]/g, (c) => 
          ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&#39;', '"': '&quot;' }[c] || c)
        );

      const placeholderImage = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
          <rect width="800" height="600" fill="#f3f4f6"/>
          <text x="400" y="250" font-family="Arial" font-size="24" fill="#1f2937" text-anchor="middle">
            🎨 Comic Illustration
          </text>
          <text x="400" y="300" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle" width="700">
            ${sanitizeForSvg(args.prompt.substring(0, 100))}...
          </text>
          <text x="400" y="350" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle">
            (Image generation placeholder - integrate Nano Banana for production)
          </text>
        </svg>
      `)}`;

      return {
        success: true,
        imageUrl: placeholderImage,
        enhancedPrompt,
      };
    } catch (error) {
      console.error("Error generating comic:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

