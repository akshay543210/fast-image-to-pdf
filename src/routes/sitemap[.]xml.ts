import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/lib/seo";

/**
 * Dynamic sitemap: routes are discovered at build time from the actual
 * files in src/routes via Vite's import.meta.glob. Adding a new public
 * page automatically adds its canonical URL here — no manual edits.
 *
 * Excluded automatically:
 * - pathless layouts (__root, _foo) and the root index segment
 * - dynamic params ($id) — no canonical URL without data
 * - escaped-dot utility routes (sitemap[.]xml) and any bracketed segments
 * - /api/* server routes (they are .ts handlers, not .tsx pages)
 */
const routeModules = import.meta.glob("./**/*.tsx");

function fileToPublicPath(file: string): string | null {
  const rel = file.replace(/^\.\//, "").replace(/\.tsx$/, "");
  const segments = rel.split("/");
  if (
    segments.some(
      (s) => s.startsWith("_") || s.startsWith("$") || s.includes("[") || s.includes("]"),
    )
  ) {
    return null;
  }
  const path = "/" + segments.filter((s) => s !== "index").join("/");
  return path.replace(/\/+$/, "") || "/";
}

function publicPaths(): string[] {
  const paths = new Set<string>();
  for (const file of Object.keys(routeModules)) {
    const p = fileToPublicPath(file);
    if (p) paths.add(p);
  }
  return [...paths].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = publicPaths().map(
          (path) => `  <url>\n    <loc>${SITE_URL}${path === "/" ? "/" : path}</loc>\n  </url>`,
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
