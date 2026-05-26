# SiteGov Marketing Site

Static marketing site built with [Astro](https://astro.build) and Tailwind CSS.

## Setup

```bash
npm install
cp .env.example .env
```

The `.env` file sets the app URL used by sign-in and sign-up links across the site. The default dev value points to `http://app.lvh.me:3000`. In production this is set as an environment variable in Cloudflare Pages (see [Deploying to Cloudflare Pages](#deploying-to-cloudflare-pages)).

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

## Deploying to Cloudflare Pages

The site builds to static HTML in `dist/`. In Cloudflare Pages, use:

| Setting | Value |
|---|---|
| Framework preset | `Astro` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | repository root, or `sitegov-public` if this lives in a monorepo |
| Environment variable | `APP_URL=https://app.sitegov.io` |

Cloudflare Pages will deploy the production branch automatically on pushes and create preview deployments for pull requests.

For a Git-connected Pages project, leave any custom deploy command blank if the dashboard allows it. If the dashboard requires a deploy command, use a no-op command so Cloudflare can publish the configured output directory:

```bash
echo "Cloudflare Pages will publish dist"
```

For direct deploys with Wrangler, use an API token with `Account > Cloudflare Pages > Edit` permission:

```bash
npm run build
npx wrangler pages deploy dist --project-name sitegov-public
```

There is also a local script:

```bash
npm run pages:deploy
```

The `wrangler.toml` file pins the Pages project name and output directory for Wrangler-based deploys.

## What's in `vendor/`

The `vendor/tailwindplus/` directory is a local copy of Tailwind Plus component examples (marketing, application UI, ecommerce). It's reference material only — nothing in it is imported or used by the site. Safe to ignore.
