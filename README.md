# Hafal.ai - SPM Prediction & Gamified Study App

A Next.js 15 application that helps Malaysian students prepare for SPM exams with AI-powered predictions, funny Manglish audio explanations, and comic strip summaries.

## Project Status: Bootstrap Complete ✅

The foundational Next.js 15 shell is now complete with:

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **Icons**: Lucide React
- **Routes**: Dashboard (`/`) and Study Mode (`/study`)
- **Layout**: Global navbar with navigation and streak indicator
- **UI Components**: Button, Card, Badge, Input, Textarea, Select, Skeleton

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Hafal.ai dashboard.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Icons**: Lucide React
- **Backend** (Coming Next): Convex
- **AI Integrations** (Coming Next): Anthropic (text), ElevenLabs (voice), Gemini (images)

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Global layout with navbar
│   │   ├── page.tsx            # Dashboard with heatmap
│   │   └── study/
│   │       └── page.tsx        # Study Mode page
│   ├── components/
│   │   ├── navbar.tsx          # Navigation component
│   │   └── ui/                 # Shadcn UI primitives
│   └── lib/
│       └── utils.ts            # Utility functions (cn)
```

## Next Steps (From Master Plan)

1. ✅ Bootstrap Next.js 15 App (COMPLETED)
2. 🔄 Setup Convex backend (Next)
3. 🔄 Define domain model (users, studySessions, streaks)
4. 🔄 Implement prediction logic (`lib/predictions.ts`)
5. 🔄 Wire Reveal backend (Anthropic, ElevenLabs, Gemini, Apify)
6. 🔄 Integrate Lindy "Cikgu Hafal" chat widget

## Features (Current)

- **Dashboard**: Malaysia heatmap showing hardcoded predictions (Kelantan/Terengganu marked as high probability)
- **Study Mode**: Subject selection (Sejarah highlighted), predicted Bab 4: Malayan Union topic
- **Streak System**: Placeholder UI (backend integration pending)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deploy on Vercel

The easiest way to deploy this app is using the [Vercel Platform](https://vercel.com/new).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
