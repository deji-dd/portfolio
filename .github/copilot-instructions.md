# Copilot Instructions for my-portfolio

## Project Overview

A Next.js 16 portfolio website built with modern web standards. The project showcases a personal portfolio with animated hero section and grid-based layout. Tech stack: React 19, TypeScript, Tailwind CSS 4, and Framer Motion for animations.

## Architecture & Key Patterns

### Directory Structure

- **`app/`** - Next.js App Router with layout and page components
- **`components/`** - React components split into feature (`hero.tsx`) and reusable UI components (`ui/`)
- **`lib/`** - Utility functions like `cn()` for className merging
- **`public/`** - Static assets

### Component Patterns

**UI Component Library Pattern** (`components/ui/`):

- Uses `class-variance-authority` (CVA) for variant-based styling with Tailwind
- Example: `button.tsx` defines `buttonVariants` with variants (default, destructive, outline, etc.) and sizes (sm, default, lg, icon)
- All UI components support the `asChild` pattern via `@radix-ui/react-slot` for flexible composition
- Components use `cn()` utility to merge Tailwind classes safely

**Client Components**:

- Animate components with `"use client"` directive (e.g., `background-boxes.tsx` uses Framer Motion)
- Hero component (`components/hero.tsx`) composes UI primitives: imports `BoxesCore` and uses `cn()` for styling

### Styling & Theme

- Tailwind CSS v4 with custom utilities installed via `tw-animate-css`
- Post-CSS configured via `postcss.config.mjs`
- CSS variables for theme colors defined in `app/globals.css`
- Dark mode: Project uses dark theme by default (see `app/page.tsx` with `bg-black text-white`)
- Typography: Uses Geist fonts (sans and mono) loaded via Next.js font optimization

### Path Aliases & Imports

Configured in `tsconfig.json` and `components.json`:

- `@/*` maps to root directory
- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/ui` → `components/ui/`

Use `@/` prefix for all imports to avoid relative paths.

## Development Workflow

### Build & Run Commands

- `pnpm dev` - Start development server (port 3000)
- `pnpm build` - Production build
- `pnpm start` - Run production build locally
- `pnpm lint` - Run ESLint (configured for Next.js + TypeScript)

### Package Manager

- Uses **pnpm** (see `pnpm-lock.yaml` and `pnpm-workspace.yaml`)
- Install dependencies with `pnpm install`, add with `pnpm add`

### Code Quality

- **TypeScript**: Strict mode enabled in `tsconfig.json`
- **ESLint**: Configured with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- ESLint ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## External Integrations

- **Vercel Analytics & Speed Insights**: Already integrated in `app/layout.tsx` via `@vercel/analytics` and `@vercel/speed-insights`
- **shadcn/ui Configuration**: `components.json` configured for RSC (React Server Components), using "new-york" style, Lucide icons

## Key Dependencies

| Library                    | Purpose                                               |
| -------------------------- | ----------------------------------------------------- |
| `framer-motion`            | Animations (used in `background-boxes.tsx`)           |
| `lucide-react`             | Icon library (configured in shadcn/ui)                |
| `clsx` + `tailwind-merge`  | Utility for safe className merging                    |
| `@radix-ui/react-slot`     | Polymorphic component pattern (button `asChild` prop) |
| `class-variance-authority` | Variant-based component styling                       |

## Common Tasks

### Adding New Components

1. Create in `components/` for feature components or `components/ui/` for reusable UI
2. Use `cn()` for className merging
3. For styled variants, use CVA (see `button.tsx` as example)
4. Mark client components with `"use client"` if using hooks or Framer Motion

### Styling New Pages

- Use Tailwind's utility classes with dark-mode defaults
- Reference color palette in `globals.css` via CSS variables
- Grid layout pattern: see `page.tsx` using CSS Grid with responsive spans

### Typography & Fonts

- Geist fonts already configured; use `font-geist-sans` or `font-geist-mono` classes
- Mono text: wrap in `font-mono` or use semantic HTML with class
