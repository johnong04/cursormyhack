import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get user progress (for MVP, use anonymous user)
export const getUserProgress = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const userId = args.userId || "anonymous";
    
    let progress = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    // If no progress exists, create default progress
    if (!progress) {
      const newProgressId = await ctx.db.insert("userProgress", {
        userId,
        streak: 0,
        revealsCompleted: 0,
        topicsCompleted: 7,
        updatedAt: Date.now(),
      });
      
      progress = await ctx.db.get(newProgressId);
    }

    return progress;
  },
});

// Get all questions for a subject and chapter
export const getQuestions = query({
  args: { 
    subject: v.string(), 
    chapter: v.string() 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("questions")
      .withIndex("by_subject_chapter", (q) => 
        q.eq("subject", args.subject).eq("chapter", args.chapter)
      )
      .collect();
  },
});

// Get a single question by ID
export const getQuestion = query({
  args: { questionId: v.id("questions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.questionId);
  },
});

// Update user progress after a reveal
export const updateUserProgress = mutation({
  args: {
    userId: v.string(),
    incrementReveals: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const now = Date.now();
    
    if (existing) {
      // Calculate streak logic
      const oneDayMs = 24 * 60 * 60 * 1000;
      const lastReveal = existing.lastRevealAt || 0;
      const timeSinceLastReveal = now - lastReveal;
      
      let newStreak = existing.streak;
      if (timeSinceLastReveal > oneDayMs * 2) {
        // Reset streak if more than 2 days
        newStreak = 1;
      } else if (timeSinceLastReveal > oneDayMs) {
        // Increment if it's a new day
        newStreak = existing.streak + 1;
      }

      await ctx.db.patch(existing._id, {
        streak: newStreak,
        lastRevealAt: now,
        revealsCompleted: args.incrementReveals 
          ? existing.revealsCompleted + 1 
          : existing.revealsCompleted,
        updatedAt: now,
      });

      return { ...existing, streak: newStreak };
    } else {
      // Create new progress
      const id = await ctx.db.insert("userProgress", {
        userId: args.userId,
        streak: 1,
        lastRevealAt: now,
        revealsCompleted: args.incrementReveals ? 1 : 0,
        topicsCompleted: 7,
        updatedAt: now,
      });

      return await ctx.db.get(id);
    }
  },
});

// Insert a new question
export const insertQuestion = mutation({
  args: {
    subject: v.string(),
    chapter: v.string(),
    topicTitle: v.string(),
    questionText: v.optional(v.string()),
    standardAnswer: v.string(),
    comicPrompt: v.string(),
    voiceExplanation: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("questions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Record a reveal session
export const recordRevealSession = mutation({
  args: {
    userId: v.string(),
    questionId: v.id("questions"),
    imageGenerated: v.boolean(),
    audioGenerated: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("revealSessions", {
      ...args,
      revealedAt: Date.now(),
    });
  },
});

// Update question with generated assets
export const updateQuestionAssets = mutation({
  args: {
    questionId: v.id("questions"),
    imageUrl: v.optional(v.string()),
    audioUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { questionId, ...updates } = args;
    await ctx.db.patch(questionId, updates);
  },
});

