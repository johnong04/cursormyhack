import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Questions table - stores Sejarah Bab 4 questions, answers, and generation prompts
  questions: defineTable({
    subject: v.string(), // "Sejarah"
    chapter: v.string(), // "Bab 4"
    topicTitle: v.string(), // e.g., "Malayan Union"
    questionText: v.optional(v.string()), // Optional question text
    standardAnswer: v.string(), // The standard marking scheme answer
    comicPrompt: v.string(), // Prompt for Gemini image generation (wild & funny)
    voiceExplanation: v.string(), // Script text for ElevenLabs (Manglish style)
    imageUrl: v.optional(v.string()), // Generated comic image URL (cached)
    audioUrl: v.optional(v.string()), // Generated audio URL (cached)
    createdAt: v.number(),
  })
    .index("by_subject_chapter", ["subject", "chapter"])
    .index("by_creation", ["createdAt"]),

  // User progress table - tracks streaks and reveal counts
  userProgress: defineTable({
    userId: v.string(), // Anonymous or future auth ID (for MVP, use "anonymous")
    streak: v.number(), // Consecutive days of reveals
    lastRevealAt: v.optional(v.number()), // Last reveal timestamp
    revealsCompleted: v.number(), // Total reveals count
    topicsCompleted: v.number(), // Topics mastered count
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Reveal sessions table - tracks individual reveal events
  revealSessions: defineTable({
    userId: v.string(),
    questionId: v.id("questions"),
    revealedAt: v.number(),
    imageGenerated: v.boolean(),
    audioGenerated: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_question", ["questionId"])
    .index("by_timestamp", ["revealedAt"]),

  // Trial papers table - stores Apify fetched links
  trialPapers: defineTable({
    title: v.string(),
    url: v.string(),
    subject: v.string(),
    year: v.optional(v.number()),
    source: v.string(), // "apify"
    fetchedAt: v.number(),
  })
    .index("by_subject", ["subject"])
    .index("by_fetch_time", ["fetchedAt"]),
});

