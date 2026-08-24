import { createFileRoute, Link } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq, FAQ_ITEMS } from "@/components/marketing/Faq";
import { RelatedConverters, CONVERTER_LINKS } from "@/components/marketing/RelatedConverters";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

const TITLE = "Image to PDF Converter — Free & Private | ImageToPDF";
const DESCRIPTION =
  "Free online image to PDF converter. Combine JPG, PNG, WebP and GIF into one PDF, reorder pages, adjust quality — processed in your browser, never uploaded.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ImageToPDF — Image to PDF Converter",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          description: DESCRIPTION,
          url: `${SITE_URL}/`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList:
            "Convert JPG, PNG, WebP and GIF to PDF; reorder, rotate and combine multiple images; no upload — all processing happens in the browser",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: "How to convert images to PDF with ImageToPDF",
          description:
            "A short demo of the free ImageToPDF image to PDF converter: add images, arrange the pages, and download a PDF — all in the browser, with no upload.",
          thumbnailUrl: `${SITE_URL}/images/image-to-pdf-converter-demo-poster.webp`,
          uploadDate: "2026-08-24",
          duration: "PT15S",
          contentUrl: `${SITE_URL}/videos/image-to-pdf-converter-demo.mp4`,
        }),
      },
    ],
  }),
  component: HomePage,
});

const FORMATS = [
  {
    name: "JPG / JPEG",
    text: "The format every camera and phone shoots in. Compress with the quality slider to keep file size in check.",
    to: "/jpg-to-pdf",
    link: "JPG to PDF converter",
  },
  {
    name: "PNG",
    text: "Screenshots, scans and graphics — embedded losslessly, so sharp text and transparency survive.",
    to: "/png-to-pdf",
    link: "PNG to PDF converter",
  },
  {
    name: "WebP",
    text: "Images saved from websites arrive as WebP, which many apps can't open. A PDF fixes that.",
    to: "/webp-to-pdf",
    link: "WebP to PDF converter",
  },
  {
    name: "GIF",
    text: "Static GIFs convert too — the still image is placed on its own PDF page like any other format.",
    to: null,
    link: null,
  },
] as const;

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero
          title={
            <>
              Image to PDF <span className="text-primary">Converter</span>
            </>
          }
          description="The free online image to PDF converter that's completely private. Drop in your photos, arrange the pages, and download one clean PDF — no upload, no signup, no watermark."
        />

        <section aria-label="Image to PDF converter" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard sm:p-6">
            <ImageToPdfTool />
          </div>
        </section>

        <HowItWorks heading="How to convert images to PDF" />

        <section aria-labelledby="demo-video" className="border-t-2 border-ink/70">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 id="demo-video" className="text-center text-2xl font-bold sm:text-3xl">
              Watch it in action
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
              A fifteen-second look at how to convert image to PDF online: three photos in, pages
              rearranged, one PDF out — without anything leaving the browser.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border-2 border-ink shadow-hard">
              <video
                controls
                preload="none"
                poster="/images/image-to-pdf-converter-demo-poster.webp"
                className="aspect-video w-full bg-card"
              >
                <source src="/videos/image-to-pdf-converter-demo.mp4" type="video/mp4" />
                Your browser doesn't support the video tag — the steps above show the same process.
              </video>
            </div>
          </div>
        </section>

        <section aria-labelledby="multi-image" className="border-t-2 border-ink/70 bg-secondary/50">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 id="multi-image" className="text-2xl font-bold sm:text-3xl">
              Merge images into one PDF
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Add as many images as you need — every image becomes one page of the finished PDF,
                so you can merge images to PDF in any order. Drag files in, browse your device, or
                paste straight from the clipboard, then drag the thumbnails (or use the arrow
                buttons) until the pages are in the right order. Sideways photos can be rotated in
                90° steps without leaving the page.
              </p>
              <p>
                Pick A4 or US Letter with margins for printing, or "Fit to image" for pages that
                match each picture exactly. Up to 25 MB per image and 100 MB per batch is plenty
                for a full camera roll, and there is no page limit on the PDF itself.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="supported-formats" className="border-t-2 border-ink/70">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 id="supported-formats" className="text-2xl font-bold sm:text-3xl">
              Supported image formats
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              This image converter to PDF handles the four formats you're most likely to have on
              your phone or computer — and you can mix them freely in a single PDF.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {FORMATS.map((format) => (
                <li
                  key={format.name}
                  className="rounded-xl border-2 border-ink/70 bg-card p-4 shadow-hard-sm"
                >
                  <h3 className="font-display text-base font-semibold">{format.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {format.text}
                  </p>
                  {format.to && (
                    <Link
                      to={format.to}
                      className="mt-2 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      {format.link}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <PrivacyNote heading="How our image to PDF converter works" />

        <section aria-labelledby="is-it-free" className="border-t-2 border-ink/70">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 id="is-it-free" className="text-2xl font-bold sm:text-3xl">
              Is this image to PDF converter free?
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Yes — with ImageToPDF you convert image to PDF free: no account, no watermark and
                no page limits. This free image to PDF maker converts your images on your own
                device instead of on a server, so there are no storage or processing costs to pass
                on to you. That also means no waiting in a queue behind other people's files.
              </p>
            </div>
          </div>
        </section>

        <Faq heading="Image to PDF FAQ" />

        <RelatedConverters heading="Related PDF tools" links={[...CONVERTER_LINKS]} />
      </main>
      <SiteFooter />
    </div>
  );
}
