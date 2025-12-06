import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

/**
 * Main Reveal action - orchestrates the entire reveal flow
 * 1. Select a question from Sejarah Bab 4
 * 2. Update user progress
 * 3. Generate comic image if not cached
 * 4. Generate audio if not cached
 * 5. Return everything to the client
 */
export const revealSejarahBab4 = action({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = args.userId || "anonymous";

    try {
      console.log("🚀 Starting reveal flow for user:", userId);
      
      // 1. Get questions for Sejarah Bab 4
      const questions = await ctx.runQuery(api.queries.getQuestions, {
        subject: "Sejarah",
        chapter: "Bab 4",
      });

      console.log(`📚 Found ${questions.length} questions in database`);

      if (questions.length === 0) {
        return {
          success: false,
          message: "No questions found. Please run the generateSejarahBab4Bank action first.",
        };
      }

      // 2. Select a question (for MVP, rotate through or pick random)
      const questionIndex = Math.floor(Math.random() * questions.length);
      const question = questions[questionIndex];
      
      console.log(`📝 Selected question: ${question.topicTitle}`);

      // 3. Update user progress
      await ctx.runMutation(api.queries.updateUserProgress, {
        userId,
        incrementReveals: true,
      });
      
      console.log("✅ Updated user progress");

      // 4. Generate or retrieve comic image
      let imageUrl = question.imageUrl;
      if (!imageUrl) {
        console.log("🎨 Generating comic image with Gemini...");
        const imageResult = await ctx.runAction(api.ai.generateComicImage, {
          prompt: question.comicPrompt,
        });
        
        if (imageResult.success && imageResult.imageUrl) {
          imageUrl = imageResult.imageUrl;
          console.log("✅ Comic image generated");
          // Cache the image URL
          await ctx.runMutation(api.queries.updateQuestionAssets, {
            questionId: question._id,
            imageUrl,
          });
        } else {
          console.error("❌ Comic image generation failed:", imageResult.message);
        }
      } else {
        console.log("✅ Using cached comic image");
      }

      // 5. Generate or retrieve audio
      let audioUrl = question.audioUrl;
      if (!audioUrl) {
        console.log("🎙️ Generating audio with ElevenLabs...");
        console.log("Voice explanation text:", question.voiceExplanation);
        
        const audioResult = await ctx.runAction(api.elevenlabs.generateVoice, {
          text: question.voiceExplanation,
        });
        
        if (audioResult.success && audioResult.audioUrl) {
          audioUrl = audioResult.audioUrl;
          console.log("✅ Audio generated successfully");
          // Cache the audio URL
          await ctx.runMutation(api.queries.updateQuestionAssets, {
            questionId: question._id,
            audioUrl,
          });
        } else {
          console.error("❌ Audio generation failed:", audioResult.message);
        }
      } else {
        console.log("✅ Using cached audio");
      }

      // 6. Record the reveal session
      await ctx.runMutation(api.queries.recordRevealSession, {
        userId,
        questionId: question._id,
        imageGenerated: !!imageUrl,
        audioGenerated: !!audioUrl,
      });

      console.log("🎉 Reveal complete!");

      // 7. Return the full reveal payload
      return {
        success: true,
        reveal: {
          topicTitle: question.topicTitle,
          questionText: question.questionText,
          standardAnswer: question.standardAnswer,
          imageUrl,
          audioUrl,
          subject: question.subject,
          chapter: question.chapter,
        },
      };
    } catch (error) {
      console.error("❌ Error in revealSejarahBab4:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

