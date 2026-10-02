# AI SaaS Startup Idea Generator

An AI-powered web application that generates creative, validated, and market-ready SaaS startup ideas based on user inputs such as industry, target audience, tech stack, and monetization preferences.

## Features

- **Idea generation form** — describe your industry, target audience, preferred tech stack, and monetization model
- **AI-generated media** — creates 4 custom hero-section images per idea using `gemini-2.5-flash-image`
- **AI video generation** — generates a promotional video concept for each startup idea
- **Idea cards** — neatly presents each generated startup idea with details
- **API key prompt** — users enter their own Gemini API key at runtime via the built-in `SelectKeyPrompt` dialog (no key is baked into the build)

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS (CDN)
- **AI:** Google Gemini API (`@google/genai` v1.28.0) — `gemini-2.5-flash-image` for image generation
- **Module loading:** importmap pointing at `aistudiocdn.com` (AI Studio CDN)

## Quick Start

Prerequisites: Node.js (v18+)

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
# -> http://localhost:3000
```

Open the app, enter your Gemini API key when prompted in the UI, fill in the idea form, and generate.

### Build for production

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Project Structure

```
.
├── App.tsx                  # Main app: form state, generation orchestration
├── index.tsx                # React entry point
├── index.html               # HTML shell (importmap, Tailwind CDN)
├── types.ts                 # Shared types (IdeaFormData, etc.)
├── metadata.json            # App metadata
├── vite.config.ts           # Vite config (aliases, env defines)
├── components/
│   ├── Header.tsx           # App header
│   ├── IdeaForm.tsx         # Input form (industry, audience, stack, monetization)
│   ├── IdeaCard.tsx         # Rendered startup idea card
│   ├── GenerationFactors.tsx# Generation factor controls
│   ├── MediaResults.tsx     # Generated image/video results display
│   ├── SelectKeyPrompt.tsx  # Runtime Gemini API-key entry dialog
│   └── icons/               # SVG icon components
└── services/
    └── geminiService.ts     # Gemini API wrappers (image + video generation)
```

## Environment Variables

None required at build time. The Gemini API key is supplied by each user at runtime through the in-app key dialog (`process.env.API_KEY` is only a dev-time fallback via `vite.config.ts`).

## Deploy Notes

Static SPA — builds to `dist/` with `npm run build`. Deploy `dist/` to any static host (Cloudflare Pages, Netlify, GitHub Pages). The app only calls the Gemini API client-side with the user's own key.

## License

Free to use and modify.

---

Built by Girish Lade — https://ladestack.in
