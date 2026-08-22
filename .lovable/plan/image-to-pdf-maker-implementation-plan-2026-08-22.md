# Image to PDF Maker — Implementation Plan

A fast, privacy-first, SEO-optimized Image→PDF converter. All processing happens **100% in the browser** — images never leave the user's device. No backend, no database, no accounts.

## 1. Architecture overview

- **Stack**: Existing TanStack Start (React 19, Vite 7, Tailwind v4, shadcn/Radix). No new framework dependencies.
- **PDF generation**: `pdf-lib` (pure JS, Worker/edge-safe, no native binaries) — the only new runtime dependency. Loaded via dynamic `import()` so it never blocks initial page load.
- **Image decoding**: Native `createImageBitmap` / `<img>` + canvas, all client-side.
- **State**: Local React state in a single `useImageQueue` hook (no global store needed — one screen, one job).

## 2. Routes (SEO architecture)

Separate indexable routes per search intent, each with unique `head()` (title, description, og tags, JSON-LD):

| Route | Target keyword | Content |
|---|---|---|
| `/` | image to PDF, photos to PDF | Main converter tool + hero + how-it-works + FAQ |
| `/jpg-to-pdf` | JPG to PDF, JPG to PDF converter | Same tool, JPG-focused copy |
| `/png-to-pdf` | PNG to PDF | Same tool, PNG-focused copy |

The converter is one reusable component; the keyword routes reuse it with different surrounding copy. `public/robots.txt` allows crawling; `public/sitemap.xml` lists the three routes. JSON-LD `WebApplication` + `FAQPage` schema on the home page.

## 3. Components

```
src/components/converter/
  ImageToPdfTool.tsx      — orchestrator: queue state, settings, generate action
  DropZone.tsx            — drag/drop + file input + paste-from-clipboard, fully keyboard accessible
  ImageQueueList.tsx      — thumbnail list: reorder (up/down buttons + drag), rotate, remove
  PdfSettingsPanel.tsx    — page size (A4/Letter/fit), orientation, margin, quality
  GenerateButton.tsx      — progress + download state
src/components/marketing/
  Hero.tsx, HowItWorks.tsx, Faq.tsx, PrivacyNote.tsx, SiteFooter.tsx
```

shadcn primitives (button, select, radio-group, accordion, progress) are already installed — reused, not duplicated.

## 4. Image processing pipeline (client-side)

1. **Ingest**: accept JPG/PNG/WebP/GIF via file picker, drag-drop, and clipboard paste. Validate MIME type and size (per-file cap ~25 MB, total cap ~100 MB) with clear error messages.
2. **Normalize**: decode each image, correct EXIF orientation via canvas, optionally downscale to a max dimension (default 2000px) to keep PDFs small.
3. **Queue ops**: reorder, rotate 90°, remove, clear all — all in-memory object URLs, revoked on removal/unload.
4. **Generate**: dynamic-import `pdf-lib`, embed each processed image as JPEG (quality slider) or lossless PNG, lay out per page-size/orientation/margin settings, produce a Blob, trigger download (`images.pdf`).

## 5. State management

Single `useImageQueue` hook: `{ items: QueuedImage[], settings, status }` with reducer-style actions (`add`, `remove`, `move`, `rotate`, `clear`, `updateSettings`). `QueuedImage = { id, file, objectUrl, width, height, rotation }`. No server functions, no Supabase, no localStorage (privacy: nothing persists).

## 6. Accessibility

- DropZone is a real `<button>` + hidden `<input type="file">`, with visible focus ring and `aria-describedby` instructions.
- Queue items are a labelled list; reorder/rotate/remove are icon buttons with `aria-label`s and visible text on desktop.
- Progress announced via `aria-live="polite"`; errors via `role="alert"`.
- Full keyboard flow: tab → add files → configure → generate → download.
- Color contrast AA on all tokens; respects `prefers-reduced-motion`.

## 7. Performance

- Route-level code splitting is automatic; `pdf-lib` (~300 KB) is dynamically imported only when the user clicks Generate.
- Thumbnails via `createImageBitmap` downscale, not full-res `<img>`.
- Object URLs revoked aggressively to avoid memory pressure on mobile.
- Fonts: one variable font via `<link>` in `__root.tsx` head (no CSS @import of remote URLs).
- Mobile-first layout: single column, thumb-friendly 44px+ targets, settings collapse into a sheet on small screens.

## 8. Error handling

- Per-file rejection messages (unsupported type, too large, corrupt/undecodable) shown inline with the option to remove and continue.
- PDF generation wrapped in try/catch → toast + inline error state with retry.
- Route-level `errorComponent` already exists in `__root.tsx`; home route gets a tailored fallback.

## 9. SEO details

- Home title ~"Image to PDF Converter — Free, Private, No Upload" (<60 chars); unique meta descriptions per route.
- One H1 per page; semantic landmarks (`header`, `main`, `section`, `footer`); alt text on all imagery.
- JSON-LD: `WebApplication` (free, browser-based) + `FAQPage` on `/`; `BreadcrumbList` on keyword routes.
- Canonical links: relative paths until a project URL exists. `sitemap.xml` + `robots.txt` updated.

## 10. Build order

1. Design system tokens in `src/styles.css` + fonts in `__root.tsx`
2. `useImageQueue` hook + image processing utils (`src/lib/image-utils.ts`, `src/lib/pdf-utils.ts`)
3. Converter components + home page
4. `/jpg-to-pdf` and `/png-to-pdf` routes reusing the tool
5. SEO: head() per route, JSON-LD, robots.txt, sitemap.xml
6. Playwright verification: upload → reorder → generate → download, mobile viewport

**Dependencies added**: `pdf-lib` only.
