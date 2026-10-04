# 🗺️ Travel App & CMS Development Checklist

# Implementation Checklist

## App Routing (`app/`)
- [ ] **Public Website**
  - [ ] `app/(app)/` - Public-facing website pages and layout
- [ ] **Payload Core**
  - [ ] `app/(payload)/` - Payload admin & API setup (do not modify)
- [ ] **CMS Application** (`app/(cms)/`)
  - [ ] `layout.tsx` - Root CMS layout (`<html>`, fonts, styles)
  - [ ] `cms.css` - Tailwind configuration and design tokens
  - [ ] `cms/login/page.tsx` - Admin login screen
  - [ ] `cms/(dashboard)/layout.tsx` - Dashboard shell (auth guard, header, tabs)
  - [ ] `cms/(dashboard)/page.tsx` - Entry redirect to `/cms/tours`
  - [ ] `cms/(dashboard)/tours/page.tsx` - Tour listing view
  - [ ] `cms/(dashboard)/tours/new/page.tsx` - Create tour page
  - [ ] `cms/(dashboard)/tours/[id]/page.tsx` - Edit tour page
  - [ ] `cms/(dashboard)/destinations/page.tsx` - Destination management view
  - [ ] `cms/(dashboard)/gallery/page.tsx` - Media gallery view

## Reusable Components (`components/`)
- [ ] **CMS Components** (`components/cms/`)
  - [ ] `CmsHeader.tsx` - Global CMS navigation header
  - [ ] `CmsTabs.tsx` - Sub-navigation tabs
  - [ ] `ui/Field.tsx` - Form field wrapper with labels and validation display

## Feature Modules (`features/`)
- [ ] **Authentication** (`features/auth/`)
  - [ ] `actions.ts` - Login and session server actions
  - [ ] `components/LoginForm.tsx` - Interactive login form
- [ ] **Tours Management** (`features/tours/`)
  - [ ] `schema.ts` - Zod validation schemas for tour data
  - [ ] `queries.ts` - Data fetching utilities for tours
  - [ ] `actions.ts` - Server actions for create, update, and delete operations
  - [ ] `components/TourTable.tsx` - Tours data table
  - [ ] `components/RowActions.tsx` - Table row action triggers (edit, delete)
  - [ ] `components/TourForm.tsx` - Tour create/edit form

## Shared Utilities & Config
- [ ] `collections/` - Payload collection definitions
- [ ] `lib/payload.ts` - Local Payload client instance initialization
- [ ] `lib/auth.ts` - Auth helpers and session management
- [ ] `payload.config.ts` - Payload CMS global configuration


## 🛠️ Phase 1: Environment & Base Infrastructure
- [ ] Initialize Next.js 15+ App Router project using TypeScript and Tailwind CSS.
- [ ] Install Payload CMS core dependencies (`pnpm add payload graphql`).
- [ ] Create and isolate local `.env` variables (e.g., `DATABASE_URI`, `PAYLOAD_SECRET`).
- [ ] Configure `vite.config.ts` / `next.config.mjs` path aliases to resolve directly to `@/*`.
- [ ] Ensure `.env` is securely added to the `.gitignore` baseline file.
- [ ] Spin up local MongoDB instance via Docker Compose or MongoDB Atlas.

## 🗄️ Phase 2: Payload CMS Configuration & Collections
- [ ] Build the local Payload singleton engine setup in `src/lib/payloadClient.ts`.
- [ ] Create the **Media Collection** configuration for asset storage and image hosting.
- [ ] Create the **Destinations Collection** schema with editable text names and descriptors.
- [ ] Create the **Travel Packages Collection** schema:
    - [ ] Add relationship block connecting to `destinations`.
    - [ ] Add relationship block connecting to `media` for dynamic image arrays.
    - [ ] Add structural `itinerary` array (fields: `dayNumber`, `date`, `activity`).
- [ ] Complete the base config handshake inside `src/payload/payload.config.ts`.
- [ ] Run the automated schema type generator to output `src/types/payload-types.ts`.

## ⚡ Phase 3: Secure Server Actions (Data Access Layer)
- [ ] Write `getPublishedPackages()` action to fetch deep-populated package indexes.
- [ ] Write `getPackageById(id)` action to render detailed target profiles.
- [ ] Write `updatePackageItinerary()` mutation action to modify target array contents.
- [ ] Write `deletePackageRecord()` action for administrative CMS cleanups.
- [ ] Incorporate Next.js `revalidatePath()` hooks to clear layout data caches on update.

## 🎨 Phase 4: Frontend UI Assembly (Tailwind & React)
- [ ] Scaffold the global application router inside `src/app/(app)/`.
- [ ] Implement the structural layout shell (`Navbar`, `Sidebar`, `Footer`).
- [ ] Mount the custom full-width, zero-padding search input element.
- [ ] Apply typography standards: `Manrope` for primary elements, `Cormorant` for headers.
- [ ] Apply target hex palette colors (`#ca9d33`, `#0B0B0B`, `#010101`, `#95928b`).
- [ ] Assemble **Travel Package Card Components**:
    - [ ] Strip out dot list bullets; convert text to continuous single-paragraph blocks.
    - [ ] Style standard card footer layout: `[Price] [View Itinerary (Outline)] [Arrow (Primary)]`.
- [ ] Mount clean carousel displays with pagination bullet dots entirely removed.
- [ ] Build the interactive Multi-Image Dropzone layout container.

## 🔑 Phase 5: Demo Access & Content Management Views
- [ ] Construct the mock Client Admin login gateway dashboard route.
- [ ] Attach button interaction loops to route directly to administrative CMS paths.
- [ ] Wire up frontend components to hit Server Actions on form submissions.
- [ ] Audit application functionality to ensure custom itinerary additions modify the database.

## 🚀 Phase 6: System Validation & Cloud Deployment
- [ ] Run `pnpm build` locally to identify and resolve type or linting compilation errors.
- [ ] Push the clean repository up to your secure GitHub profile.
- [ ] Provision database services and configure production environment keys in your cloud host.
