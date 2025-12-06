import { action, query, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

/**
 * Fetch trial papers using Apify
 * This is a stub implementation that demonstrates the integration
 */
export const fetchTrialPapers = action({
  args: {
    subject: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apifyToken = process.env.APIFY_API_TOKEN;
    
    if (!apifyToken) {
      console.warn("APIFY_API_TOKEN not set, using mock data");
      // Return mock data for development
      const mockPapers = [
        {
          title: "SPM Sejarah 2023 Trial Paper - Kelantan",
          url: "https://example.com/sejarah-2023-kelantan.pdf",
          subject: "Sejarah",
          year: 2023,
          source: "apify-mock",
        },
        {
          title: "SPM Sejarah 2023 Trial Paper - Terengganu",
          url: "https://example.com/sejarah-2023-terengganu.pdf",
          subject: "Sejarah",
          year: 2023,
          source: "apify-mock",
        },
      ];

      // Store mock papers in the database
      for (const paper of mockPapers) {
        // Check if paper already exists
        const existing = await ctx.runQuery(api.apify.getTrialPapers, {
          subject: paper.subject,
        });
        
        const alreadyExists = existing.some((p: any) => p.url === paper.url);
        
        if (!alreadyExists) {
          await ctx.runMutation(api.apify.insertTrialPaper, {
            ...paper,
          });
        }
      }

      return {
        success: true,
        message: "Mock trial papers stored successfully",
        count: mockPapers.length,
      };
    }

    try {
      // In production, this would call an Apify actor to scrape trial paper links
      // Example Apify API call structure:
      const actorId = "your-trial-papers-scraper-actor-id";
      
      const response = await fetch(
        `https://api.apify.com/v2/acts/${actorId}/runs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apifyToken}`,
          },
          body: JSON.stringify({
            // Actor input parameters
            subject: args.subject || "Sejarah",
            year: new Date().getFullYear(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Apify API error: ${response.status} ${response.statusText}`);
      }

      const runData = await response.json();
      const runId = runData.data.id;

      // Wait for the actor to finish (in production, use webhooks instead)
      // This is simplified for the stub
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Fetch results
      const resultsResponse = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}/dataset/items`,
        {
          headers: {
            "Authorization": `Bearer ${apifyToken}`,
          },
        }
      );

      const results = await resultsResponse.json();

      // Store papers in database
      let count = 0;
      for (const item of results) {
        await ctx.runMutation(api.apify.insertTrialPaper, {
          title: item.title || "Trial Paper",
          url: item.url,
          subject: args.subject || "Sejarah",
          year: item.year,
          source: "apify",
        });
        count++;
      }

      return {
        success: true,
        message: `Successfully fetched and stored ${count} trial papers`,
        count,
      };
    } catch (error) {
      console.error("Error fetching trial papers:", error);
      return {
        success: false,
        message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  },
});

// Query to get trial papers
export const getTrialPapers = query({
  args: { subject: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("trialPapers")
      .withIndex("by_subject", (q) => q.eq("subject", args.subject))
      .collect();
  },
});

// Mutation to insert a trial paper
export const insertTrialPaper = mutation({
  args: {
    title: v.string(),
    url: v.string(),
    subject: v.string(),
    year: v.optional(v.number()),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("trialPapers", {
      ...args,
      fetchedAt: Date.now(),
    });
  },
});

