# SEO Architecture — Image to PDF Maker

Status: **Design — approved direction, pending page builds.**
Audience: whoever implements the next pages. Follow this doc before adding any route.

---

## 1. Demand snapshot (Semrush, US, Aug 2026)

| Keyword | Volume/mo | Difficulty | Verdict |
|---|---|---|---|
| jpg to pdf | 301,000 | 85 (very hard) | Core page; long game |
| convert jpg to pdf free | 90,500 | medium comp | Fold into `/jpg-to-pdf` copy |
| png to pdf | 110,000 | 46 (possible) | **Best near-term win** |
| image to pdf | 49,500 | ~hard | Homepage head term |
| jpeg to pdf | 49,500 | — | Synonym → same page as JPG, never its own URL |
| image compressor | 49,500 | 84 (hard) | Different tool/intent → separate product, deferred |
| heic to pdf | 40,500 | 36 (possible) | **Build — requires HEIC decode support first** |
| photo to pdf | 18,100 | 71 (hard) | Synonym intent → homepage copy + guides, no URL |
| how to save jpg as pdf | 5,400 | — | Guide (blog) |
| how to make a photo a pdf | 5,400 | — | Guide (blog) |
| webp to pdf | 2,900 | 23 (easy) | **Quick win, low competition** |
| how to convert photo to pdf on iphone | 1,900 | — | Guide (blog) |

---

## 2. Verdict on the proposed page list

| Proposed URL | Decision | Reason |
|---|---|---|
| `/` | **Keep** | Head term "image to pdf converter". Brand + primary tool. |
| `/image-to-pdf` | **Cut** | Identical intent to `/`. Two pages = self-cannibalization. If ever created, 301 → `/`. |
| `/jpg-to-pdf` | **Keep** (exists) | Largest keyword in the cluster. |
| `/png-to-pdf` | **Keep** (exists) | Second largest, winnable (KD 46). |
| `/webp-to-pdf` | **Build** | KD 23, genuine differentiated story (WebP files downloaded from the web are awkward to share/print). Tool already accepts WebP. |
| `/heic-to-pdf` | **Build — gated on engineering** | 40.5k/mo at KD 36 is the biggest growth opportunity. But browsers can't decode HEIC natively: ship a WASM decoder (e.g. `heic-to` / libheif-js, dynamically imported like pdf-lib) *before* publishing the page. Never publish a landing page for a format the tool rejects. |
| `/photo-to-pdf` | **Cut** | Synonym intent of `/`. Google clusters it with "image to pdf". A separate page is a doorway page. Cover "photo/picture" phrasing in homepage copy + guides. |
| `/picture-to-pdf` | **Cut** | Same as above. |
| `/image-compressor` | **Defer** | Different job-to-be-done (shrink file size vs. change container). It is a *second tool*, not a landing-page variant, and KD 84 against entrenched brands (TinyPNG etc.). Revisit as a `/tools/` expansion only after the PDF cluster ranks. |
| `/blog/` | **Keep, repositioned** | Not a diary — an intent-targeted **guides** layer answering the "how do I…" questions the tool pages can't. See §9. |

**Final URL inventory (target state):**

```
/                  Image to PDF converter (head term + brand)
/jpg-to-pdf        Format tool page
/png-to-pdf        Format tool page
/webp-to-pdf       Format tool page
/heic-to-pdf       Format tool page (after HEIC decode ships)
/blog/             Guides index
/blog/<slug>/      One guide per genuinely distinct question
```

Flat structure, no `/tools/` or `/converters/` prefix folders yet — four tool pages don't justify a directory level. Add a level only when a second tool family (e.g. compressor) exists.

---

## 3. Title strategy

Pattern: `<Primary keyword> — <differentiator> | <brand>`. Under 60 chars. One keyword per page; modifiers ("free", "online", "no upload") carry the long tail.

| Page | Title |
|---|---|
| `/` | Image to PDF Converter — Free, Private, No Upload *(current, keep)* |
| `/jpg-to-pdf` | JPG to PDF Converter — Free & Private, No Upload *(current, keep)* |
| `/png-to-pdf` | PNG to PDF Converter — Free & Private, No Upload *(current, keep)* |
| `/webp-to-pdf` | WebP to PDF Converter — Free, No Upload, No Signup |
| `/heic-to-pdf` | HEIC to PDF Converter — Free iPhone Photo to PDF |

Rules:
- Never repeat the exact title across pages (synonym pages were cut partly to make this natural).
- "Free" appears in every tool title — it's a top-3 modifier in this SERP.
- Brand suffix only where length allows; the keyword leads.

## 4. Meta description strategy

150–160 chars, formula: **what it does + the privacy differentiator + the friction removal**.

- What: "Convert JPG photos to a single PDF"
- Differentiator: "processed in your browser, never uploaded"
- Friction: "free, unlimited, no signup"

Every page gets a *unique* description that also names its page-specific angle (JPG: camera rolls/scans; PNG: lossless + transparency; WebP: web downloads; HEIC: iPhone photos). No description may be a substring of another.

## 5. H1 strategy

One H1 per page, phrased as the task, not the keyword string:

| Page | H1 |
|---|---|
| `/` | Turn images into a PDF in seconds *(current)* |
| `/jpg-to-pdf` | Convert JPG to PDF in seconds *(current)* |
| `/png-to-pdf` | Convert PNG to PDF losslessly *(current)* |
| `/webp-to-pdf` | Convert WebP to PDF |
| `/heic-to-pdf` | Convert iPhone HEIC photos to PDF |

H1 carries the format keyword; the title tag carries the modifiers. They are deliberately not identical.

## 6. Heading hierarchy

Tool pages, every one:

```
H1  task statement (Hero)
H2  The converter tool itself (visually the tool card; labelled region)
H2  Page-specific explainer      ← the anti-thin-content block, unique per page
H2  How it works (3 steps)
H2  Why it's private
H2  FAQ                          ← questions unique to this format's intent
H3  individual FAQ questions
```

Guides:

```
H1  the question ("How to convert iPhone photos to PDF")
H2  per method/step
H3  sub-steps
```

No skipping levels, exactly one H1, H2 sections must be genuinely different per page — the explainer section is where each tool page earns its right to exist (JPG: quality slider guidance; PNG: lossless embedding + transparency; WebP: what WebP is and why it needs converting; HEIC: what HEIC is, iPhone defaults, why it won't open elsewhere).

## 7. Canonical strategy

- Every page: **self-referencing** canonical, relative path until a domain is set (`<link rel="canonical" href="/jpg-to-pdf">`). Already implemented on the three live routes.
- No cross-page canonicals — we cut the duplicate pages instead of canonicalizing them.
- No query-param states of the tool produce URLs (all state is in-memory), so no parameter canonicalization is needed. Keep it that way: never move queue state into the URL without revisiting this.

## 8. Internal linking architecture

Hub-and-spoke. `/` is the hub; format pages are spokes; guides link *up* to tools, tools link *laterally* to sibling tools.

```text
                        ┌──────────┐
                        │    /     │  (hub — links to every tool + guides index)
                        └────┬─────┘
        ┌────────────┬───────┼────────┬────────────┐
   /jpg-to-pdf  /png-to-pdf  /webp-to-pdf  /heic-to-pdf
        └────────────┴──"Related converters" module──┘
                        ▲
                        │ contextual links (anchor = task, e.g. "convert it to a PDF")
              ┌─────────┴─────────┐
              │   /blog/<guide>   │
              └───────────────────┘
```

Implementation rules:
1. **Header nav**: all live tool pages (already in place; extend as pages ship). Cap at 5 items.
2. **"Related converters" module** at the bottom of every tool page — cards to the other 3 format pages. Anchor text = page's keyword ("PNG to PDF"), not "click here".
3. **Footer**: full tool list + guides index (already in place; extend).
4. **Guides → tools**: every guide links to the relevant tool page within the first two paragraphs (that's the guide's job) and to 1–2 sibling guides at the end.
5. **Tools → guides**: one contextual link per tool page to its most relevant guide (e.g. `/heic-to-pdf` → "how to convert iPhone photos to PDF") inside the explainer section. Not more — tool pages convert, guides inform.
6. **Breadcrumbs** (visible) on every non-home page: `Home / JPG to PDF`, `Home / Guides / <title>`.

## 9. Guides layer (`/blog/`)

Reposition "blog" as intent-targeted guides. Each guide must answer one question better than a forum thread does, and every guide's answer *uses this tool*.

Launch set (from real question-keyword demand):

| Slug | Target question | Volume |
|---|---|---|
| `/blog/how-to-save-jpg-as-pdf/` | how to save jpg as pdf | 5,400 |
| `/blog/how-to-make-a-photo-a-pdf/` | how to make a photo a pdf | 5,400 |
| `/blog/how-to-convert-photo-to-pdf-on-iphone/` | …on iphone | 1,900 |
| `/blog/convert-heic-to-pdf-on-mac/` | heic to pdf on mac | 170 (pairs with `/heic-to-pdf`) |

Editorial rules: unique, firsthand instructions with real screenshots of *this* tool; platform-specific steps (iPhone/Mac/Windows) where the query demands it; no AI-slop listicles; no publishing a guide whose only purpose is to hold a keyword. Add a guide only when a real question cluster exists.

## 10. Structured data

| Page type | Schema |
|---|---|
| `/` | `WebApplication` (free offer, browser platform) + `FAQPage` — **already live** |
| Tool pages | `WebApplication` (same shape, per-format name/featureList) + `FAQPage` (only if visible FAQ on page) + `BreadcrumbList` *(BreadcrumbList live on jpg/png; upgrade to add WebApplication+FAQ when each page gets its unique FAQ)* |
| Guides | `Article` + `HowTo` (steps match visible content) + `BreadcrumbList` |
| `__root` | `Organization`/`WebSite` sitewide default |

Rules: schema must mirror visible content exactly; no FAQPage without a rendered FAQ; no aggregate ratings (we have none).

## 11. Sitemap architecture

Current: static `public/sitemap.xml`, 3 entries, relative `BASE_URL=""` placeholder — correct for now.

Target: one sitemap at `/sitemap.xml`, one `<url>` per indexable page above, **no `<lastmod>`** unless we have a real per-page content-change timestamp (never build-time stamps). When guides exist, they join the same sitemap — no sitemap index until 50+ URLs.

Migration note: at guide-launch time, replace the static file with the `src/routes/sitemap[.]xml.ts` server route so entries stay in sync with the route tree (confirm before replacing the static mechanism).

## 12. robots.txt requirements

Current file is fine (`Allow: /` for all major bots + wildcard). Requirements going forward:

- Keep `Allow: /` — every route is public and indexable.
- No `Sitemap:` directive until a real domain exists (relative sitemap URLs are invalid in robots.txt).
- If staging/preview ever needs blocking, do it via `noindex` on the environment, not a wildcard `Disallow` here.

## 13. Anti-doorway rules (permanent)

1. One URL per **intent cluster**, not per keyword string. "image/photo/picture/jpeg to pdf" are one intent → one page (`/`, with `/jpg-to-pdf` as the format-specific exception that has a distinct angle).
2. A new tool page must pass the test: *"Does this page say something true and useful that no other page on the site says?"* (format-specific behavior, platform-specific steps, unique FAQ). If not, it's a section, not a page.
3. Never publish a page for a format the tool doesn't accept.
4. No near-duplicate templates with find-and-replace keywords — each page's explainer, FAQ, and description are written per-page.
5. No indexable filter/search/tag pages. The tool has none; keep it that way.

## 14. Rollout order

1. **`/webp-to-pdf`** — tool already supports WebP; KD 23 quick win. Add unique explainer + FAQ + related-converters module (§8.2) in the same change.
2. **HEIC decoding (WASM, dynamically imported)** → then **`/heic-to-pdf`** — biggest demand/difficulty ratio (40.5k @ KD 36).
3. **Guides**: launch set from §9, starting with the two 5.4k-volume how-tos.
4. Revisit `/image-compressor` only after the PDF cluster ranks — it's a new product, not a page.
