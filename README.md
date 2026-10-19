# PNS Ride Sri Lanka: Travel & Tours Website

A fast, SEO-ready travel and tourism website with a custom-built content management dashboard. Visitors browse tour packages, destinations and a photo gallery, then send an enquiry. Staff manage everything from a branded dashboard, with no code involved.

![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?logo=nextdotjs&logoColor=white)
![Payload CMS](https://img.shields.io/badge/Payload_CMS-3.x-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

<!-- Add screenshots to docs/screenshots/ and link them here. -->

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Content model](#content-model)
- [Using the CMS](#using-the-cms)
- [Rendering and caching](#rendering-and-caching)
- [SEO and analytics](#seo-and-analytics)
- [Security](#security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Known limitations and roadmap](#known-limitations-and-roadmap)

---

## Features

**Public website**

- Home page with a hero slideshow, tour search, filterable tour grid, stats, destinations, filterable gallery, testimonials and a contact section
- Package detail pages (`/packages/[slug]`) with a photo lightbox, day-by-day itinerary and a booking card
- About page
- Enquiry dialog with a preferred date and group size, stored in the database and emailed to the business
- Optional "Chat on WhatsApp" button with a prefilled message
- Mobile-first, accessible markup and reduced-motion support

**Custom CMS dashboard (`/cms`)**

- Branded dashboard built to the approved design, not Payload's default UI
- Packages: create, edit, show or hide, delete, mark as featured
- Destinations: create, edit, delete, with comma-separated highlights shown as tags
- Gallery: multi-image upload, inline caption editing that autosaves, per-batch categories, delete
- Direct-to-CDN image uploads with previews and progress

**Under the hood**

- Static generation with on-demand revalidation when content changes
- Sitemap, robots rules, canonical URLs, Open Graph tags and JSON-LD structured data
- GA4 analytics with a `generate_lead` event on every successful enquiry
- Payload's own admin panel kept as a fallback at `/admin`

---

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| CMS and API | Payload CMS 3 running inside the Next.js app |
| Database | MongoDB (Atlas recommended) |
| Styling | Tailwind CSS, shadcn/ui components, `next/font` |
| Animation | Motion (`motion/react`) |
| Media storage | UploadThing (browser-to-CDN uploads) |
| Email | Resend |
| Validation | Zod |
| Analytics | Google Analytics 4 via `@next/third-parties` |
| Package manager | pnpm |

---

## Getting started

### Prerequisites

- Node.js 20.9 or newer (LTS recommended)
- pnpm
- A MongoDB database (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- An [UploadThing](https://uploadthing.com) account and token
- *(Optional)* a [Resend](https://resend.com) account for enquiry emails

### Installation

```bash
git clone <repository-url>
cd pns-ride-travel
pnpm install
```

### Configure the environment

Create a `.env` file in the project root and fill in the values from [Environment variables](#environment-variables).

### Run it

```bash
pnpm generate:importmap
pnpm generate:types
pnpm dev
```

Open <http://localhost:3000>.

### Create the first admin user

1. Open <http://localhost:3000/admin>. On a fresh database, Payload shows a **Create first user** screen.
2. Create the admin account.
3. Sign in to the dashboard at <http://localhost:3000/cms/login> with the same credentials.

The two panels share one login cookie.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | Yes | MongoDB connection string |
| `PAYLOAD_SECRET` | Yes | Long random string used to sign sessions |
| `UPLOADTHING_TOKEN` | Yes | UploadThing API token (image uploads) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL with no trailing slash, e.g. `https://example.com` |
| `NEXT_PUBLIC_INDEXABLE` | Yes | `true` in **production only**. Anything else tells search engines not to index the site |
| `NEXT_PUBLIC_GA_ID` | No | GA4 measurement ID (`G-XXXXXXXXXX`). Loaded in production only |
| `GOOGLE_SITE_VERIFICATION` | No | Search Console verification token |
| `RESEND_API_KEY` | No | Enables enquiry emails |
| `INQUIRY_FROM_EMAIL` | No | Sender address (must be on a domain verified in Resend) |
| `INQUIRY_TO_EMAIL` | No | Inbox that receives enquiries |
| `WHATSAPP_NUMBER` | No | Digits with country code, e.g. `94771234567`. The WhatsApp button hides when empty |

```env
# .env.example
DATABASE_URI=mongodb://127.0.0.1:27017/travel-site
PAYLOAD_SECRET=replace-with-a-long-random-string
UPLOADTHING_TOKEN=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_INDEXABLE=false
NEXT_PUBLIC_GA_ID=
GOOGLE_SITE_VERIFICATION=
RESEND_API_KEY=
INQUIRY_FROM_EMAIL=
INQUIRY_TO_EMAIL=
WHATSAPP_NUMBER=
```

Restart the dev server after changing any of these.

---

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build (queries the database to pre-render pages) |
| `pnpm start` | Serve the production build |
| `pnpm generate:types` | Regenerate `payload-types.ts` after any collection change |
| `pnpm generate:importmap` | Regenerate Payload's admin import map |

> Test performance and caching on `pnpm build && pnpm start`. Development mode renders every page on demand and is much slower.

---

## Architecture

### Route groups

Three independent areas live side by side under `app/`. Each owns its own root layout.

| Group | URLs | Purpose |
|---|---|---|
| `(app)` | `/`, `/about`, `/packages/[slug]` | Public website |
| `(cms)` | `/cms/*` | Custom CMS dashboard |
| `(payload)` | `/admin`, `/api/*` | Payload admin panel and REST API |

### Feature modules

Code is organised by business feature, not by file type. Each feature owns its logic, and routes in `app/` stay thin.

```
features/<name>/
  actions/      Server Actions: the only way the browser calls the server
  services/     All Payload and database access (server-only)
  schemas/      Zod validation
  hooks/        Client state wrapping actions
  components/   UI
  types.ts
```

### Layering

```
Page (server) ───────────────▶ service ──▶ Payload ──▶ MongoDB
Component ──▶ hook ──▶ action ──▶ service ──▶ Payload ──▶ MongoDB
```

| Layer | Rule |
|---|---|
| **Pages** | Fetch data and compose components. No business logic |
| **Components** | UI only. Never call Payload |
| **Hooks** | Client state around an action (`useTransition`, `useActionState`) |
| **Actions** (`'use server'`) | Validate input, check the user, call a service, then revalidate or redirect. Every exported action is a public endpoint |
| **Services** (`import 'server-only'`) | All Payload calls. The build fails if a client component imports one |

Other conventions:

- **Public reads** use `*.public.ts` services. They call Payload with `overrideAccess: false` and filter by published status, so hidden content never reaches the public site.
- **CMS reads and writes** call `requireUser()` and pass `user` with `overrideAccess: false`. A layout guard alone is not enough, because layouts don't re-run on client navigations.
- **Props passed to client components are small DTOs** (`TourCardData`, `TourDetailData`), never raw Payload documents.
- Features don't import each other's components, hooks or actions. They talk through services, or the page passes one feature's component into another as a prop.
- No barrel `index.ts` files, so server and client code never share an export.

### Data flow for media

Images upload **directly from the browser to UploadThing**, so no image bytes pass through the server. The server action then receives only the returned URLs, validates the host, and stores them as `media` records.

---

## Project structure

```
app/
  (app)/                    public site
    layout.tsx              fonts, header/footer, analytics, org JSON-LD
    page.tsx                home
    about/page.tsx
    packages/[slug]/page.tsx
    not-found.tsx
  (cms)/                    custom dashboard
    cms/login/
    cms/(dashboard)/        tours, destinations, gallery
  (payload)/                Payload admin and REST API (generated structure)
  api/uploadthing/route.ts  UploadThing handler
  robots.ts
  sitemap.ts
collections/                Payload collection configs
  hooks/                    auto-slug, revalidation
features/
  auth/  tours/  destinations/  gallery/  inquiries/
  media/  landing/  about/  testimonials/
components/
  site/                     header, footer, navigation
  cms/                      dashboard shell
  seo/                      JSON-LD
  ui/                       shared primitives
lib/                        payload client, site config, SEO helpers
styles/tokens.css           design tokens shared by the public site and CMS
payload.config.ts
```

---

## Content model

| Collection | Key fields |
|---|---|
| `users` | Email and password authentication |
| `media` | `url`, `key`, `name`, `alt`, `size`. A plain collection: files live in UploadThing and this stores the reference. Deleting a record also deletes the file |
| `destinations` | `title`, `slug` (auto), `status` (`published` / `draft`), `province`, `description`, `highlights[]`, `coverImage` |
| `tours` | `title`, `slug` (auto), `tourType`, `status` (`published` / `hidden`), `featured`, `destination`, `durationDays`, `price` (USD per person), `maxGroupSize`, `description`, `coverImage`, `images[]`, `itinerary[]` |
| `gallery` | `image`, `caption` (used as alt text), `category` |
| `inquiries` | `name`, `email`, `phone`, `message`, `tourTitle`, `travelDate`, `travelers`, `status`. Cannot be created through the public API; only the server action writes to it |

**Slugs** are generated from the title on every save and are read-only. Renaming a package changes its URL.

---

## Using the CMS

Sign in at `/cms/login`. Three tabs:

- **Packages**: add, edit, hide (eye icon) or delete tours. The first image is the cover; the rest become the tour's photos. Add itinerary days and reorder them.
- **Destinations**: add or edit a destination. Type highlights separated by commas and they appear as tags.
- **Gallery**: drop several images, choose a category for the batch, and press **Add to gallery**. Edit any caption directly on its card. It saves when you click away or press Enter. Captions double as image alt text, so write them for people and search engines.

Enquiries arrive by email and are stored under **Inquiries** in the Payload admin at `/admin`. Share only the `/cms` address with the client's team.

---

## Rendering and caching

- Public pages are **statically generated** and revalidated at most every hour (`export const revalidate = 3600`).
- Collections also revalidate the affected pages **immediately** when content is created, edited or deleted, so changes appear without waiting for the hour (`collections/hooks/revalidate.ts`).
- `/packages/[slug]` pages are pre-built for every published tour. A tour added later renders on its first visit and is then cached.
- Hiding or deleting a tour makes its URL return a real `404`.
- `pnpm build` reads the database, so `DATABASE_URI` must be available at build time.

---

## SEO and analytics

**Implemented**

- Unique title and description per page, a title template, canonical URLs, and Open Graph and Twitter metadata
- `sitemap.xml` generated from published tours, and `robots.txt` that blocks `/cms`, `/admin` and `/api/`
- JSON-LD: `TravelAgency` site-wide, `TouristTrip` on package pages, `AboutPage` on the about page
- Content rendered on the server, one `<h1>` per page, descriptive alt text, and crawlable links
- Staging protection: unless `NEXT_PUBLIC_INDEXABLE=true`, the site emits `noindex` and a `Disallow: /` robots file
- GA4 loaded in production only, with a `generate_lead` event after a successful enquiry

**Before launch**

- Verify the domain in Google Search Console and submit `/sitemap.xml`
- Mark `generate_lead` as a key event in GA4
- Add a 1200×630 default share image at `app/(app)/opengraph-image.png`
- Validate structured data with Google's Rich Results Test

---

## Security

- All CMS reads and writes require a signed-in user and respect Payload access rules
- Public queries run anonymously and only return published content
- `inquiries` blocks creation through the REST API. Only the server action can write to it
- UploadThing uploads require a signed-in session, and image URLs are checked against allowed hosts before being stored
- The enquiry form validates on the server with Zod and includes a honeypot field. Add a CAPTCHA such as Cloudflare Turnstile if spam appears
- Services are marked `server-only`, so secrets can't leak into client bundles
- Never commit `.env`. Use a fresh `PAYLOAD_SECRET` in production

## Known limitations and roadmap

- Replaced or removed images stay in UploadThing. A cleanup job for unreferenced media is planned
- No roles yet. All users have full access. Add `admin` and `editor` roles before onboarding staff
- Testimonials come from a data file. They can move into a collection when the client wants to manage them
- The gallery has no lightbox on the home page
- Inquiries are read in the Payload admin and don't have a tab in the custom dashboard yet
- Single language (English)

---

## License

Proprietary. All rights reserved. Replace this section with the agreed terms.

## Contact

Built by `Brightly Dunsford`. For support, contact `dunsfordbright@gmail.com`.