import { action } from "./_generated/server";
import { GoogleGenAI } from "@google/genai";
import { v } from "convex/values";

/**
 * Test action to verify Gemini API key works
 */
export const testGeminiConnection = action({
  args: {},
  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return {
          success: false,
          message: "GEMINI_API_KEY is not set in environment variables. Add it to .env.local",
        };
      }

      const genAI = new GoogleGenAI({ apiKey });
      
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash-exp",
        contents: "Say 'Gemini API is working!' in one sentence.",
      });
      
      const text = response.text();
      
      return {
        success: true,
        message: "Gemini API connection successful!",
        response: text,
      };
    } catch (error) {
      return {
        success: false,
        message: `Gemini API error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

/**
 * Test action to verify ElevenLabs API key works
 */
export const testElevenLabsConnection = action({
  args: {},
  handler: async (ctx, args) => {
    try {
      const apiKey = process.env.ELEVENLABS_API_KEY;
      
      if (!apiKey) {
        return {
          success: false,
          message: "ELEVENLABS_API_KEY is not set in environment variables. Add it to .env.local",
        };
      }

      const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
      
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": apiKey,
          },
          body: JSON.stringify({
            text: "Testing ElevenLabs API connection!",
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          message: `ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`,
        };
      }

      return {
        success: true,
        message: "ElevenLabs API connection successful! Audio generated.",
      };
    } catch (error) {
      return {
        success: false,
        message: `ElevenLabs API error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

