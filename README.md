# SiteGov Marketing Site

Static marketing site built with [Astro](https://astro.build) and Tailwind CSS.

## Setup

```bash
npm install
```

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server at `http://localhost:4321` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |

## Pages

| URL | File | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage |
| `/use-cases` | `src/pages/use-cases.astro` | Use cases |
| `/what-is-sitegov` | `src/pages/what-is-sitegov.astro` | Category explainer (has two stub sections to fill in) |
| `/pricing` | `src/pages/pricing.astro` | Pricing — placeholder tiers, ready for Stripe embed |

## Project Structure

```
src/
  layouts/
    BaseLayout.astro   # Shared <head>, nav, footer. All pages use this.
  pages/
    index.astro
    pricing.astro
    use-cases.astro
    what-is-sitegov.astro
vendor/
  tailwindplus/        # Reference component library (not used in production)
```

## Layout and Styling

All pages extend `BaseLayout.astro`, which handles:
- `<head>` with meta/OG tags (passed as props per page)
- Sticky nav with active link highlighting (pass `currentPage` prop matching the nav label)
- Footer with consistent links
- Google Fonts (Inter) loaded via CDN

Styling is Tailwind CSS v3 with a proper build step (not CDN). Config is in `tailwind.config.mjs`. The font stack and any global styles (scroll-behavior) live in `BaseLayout.astro`.

## Adding a Page

1. Create `src/pages/your-page.astro`
2. Import and wrap with `BaseLayout`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Page Title — SiteGov"
  description="Meta description."
  currentPage="Nav Label"  // optional — highlights matching nav link
>
  <!-- page content -->
</BaseLayout>
```

3. If it's a top-level nav link, add it to the `navLinks` array in `src/layouts/BaseLayout.astro`.

## Stripe / Payments

The `/pricing` page has placeholder tier cards. When you're ready to connect Stripe:

**Option A — Stripe Pricing Table** (recommended for subscriptions):
1. Create a Pricing Table in the Stripe Dashboard
2. Replace the placeholder cards in `src/pages/pricing.astro` with the embed snippet — there's a comment marking exactly where it goes

**Option B — Stripe Payment Links** (simpler, no embed):
1. Create Payment Links for each plan in Stripe
2. Point each tier's CTA button `href` to its Payment Link URL

## Deploying

The site builds to static HTML in `dist/`. It can be hosted anywhere that serves static files:

- **Netlify / Vercel**: connect the repo, set build command to `npm run build`, publish directory to `dist`
- **Kamal / self-hosted**: `npm run build` and serve the `dist/` folder with nginx or caddy

## What's in `vendor/`

The `vendor/tailwindplus/` directory is a local copy of Tailwind Plus component examples (marketing, application UI, ecommerce). It's reference material only — nothing in it is imported or used by the site. Safe to ignore.
