import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Generate voice audio using ElevenLabs API
 * Uses the latest ElevenLabs text-to-speech endpoint
 * Docs: https://elevenlabs.io/docs/api-reference/text-to-speech
 */
export const generateVoice = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      console.warn("ELEVENLABS_API_KEY not set, returning placeholder audio");
      // Return a placeholder/silent audio data URL
      return {
        success: true,
        audioUrl: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAABhADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/////////////////////////////////////////////////////////////////////////////////////AAAAAExhdmM1OC4xMzQAAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZDwP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",
        message: "Using placeholder audio - configure ELEVENLABS_API_KEY in .env.local for real voice generation",
      };
    }

    try {
      // Use custom voice ID if provided, otherwise use a default English voice
      // For Malaysian accent, you can create a custom voice on ElevenLabs platform
      const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Rachel voice
      
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
            text: args.text,
            model_id: "eleven_multilingual_v2", // Supports multiple languages including English
            voice_settings: {
              stability: 0.5,        // 0-1, lower = more variable/expressive
              similarity_boost: 0.75, // 0-1, higher = closer to original voice
              style: 0.6,            // 0-1, higher = more exaggerated/styled
              use_speaker_boost: true, // Enhance clarity
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      // Get the audio data as array buffer
      const audioBuffer = await response.arrayBuffer();
      
      // Convert to base64 data URL for easy frontend playback
      const base64Audio = Buffer.from(audioBuffer).toString("base64");
      const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;

      return {
        success: true,
        audioUrl,
      };
    } catch (error) {
      console.error("Error generating voice:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

