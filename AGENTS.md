# AGENTS.md — Dhriti Portfolio

## Commands
- `npm run dev` — dev server (Turbopack, port 9002)
- `npm run build` — production build (TS/ESLint errors ignored in prod per next.config.ts)
- `npm run lint` — `next lint`
- `npm run typecheck` — `tsc --noEmit` (run before commit)
- `npm run genkit:dev` — start Genkit AI flow dev server

## Architecture
- Next.js 15 App Router, TypeScript, Tailwind CSS v3, shadcn/ui (default style, neutral base)
- Path alias `@/*` → `./src/*`
- Route groups: `(main)/` groups sub-pages (achievements, contact, projects, volunteer)
- Homepage in `src/app/page.tsx` (`"use client"`) — hero + section imports
- Layout in `src/app/layout.tsx` wraps with ThemeProvider (forced dark, no system toggle), FirebaseClientProvider, Toaster
- Server actions in `src/lib/actions.ts` (contact form via Resend)
- Forms validated with `zod` in `src/lib/schemas.ts`
- Firebase client SDK in `src/firebase/` (config uses dummy placeholder keys — set real keys in `.env`)

## Firebase
- Firestore collection `/contacts` — public `create`, no read/update/delete (firestore.rules)
- `.env*` in .gitignore — add real Firebase config + `RESEND_API_KEY` there

## Style & Conventions
- `cn()` utility (`clsx` + `tailwind-merge`) for class merging
- UI components in `src/components/ui/` (shadcn — do not edit directly unless adding a new one via `npx shadcn@latest add`)
- Custom components in `src/components/` (about/, icons/, layout/, projects/)
- Hooks in `src/hooks/`
- Tailwind config uses CSS variables for all colors (dark mode via class)
- Inter and JetBrains Mono via next/font

## Notable
- next.config.ts ignores TS/ESLint during `next build` — rely on `npm run typecheck` and `npm run lint` for local validation
- Profile images use `placehold.co` and `www.canva.com` in next.config remotePatterns
