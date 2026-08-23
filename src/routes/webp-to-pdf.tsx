import { createFileRoute } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq, type FaqItem } from "@/components/marketing/Faq";
import { RelatedConverters, CONVERTER_LINKS } from "@/components/marketing/RelatedConverters";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

const PATH = "/webp-to-pdf";
const TITLE = "WebP to PDF Converter — Free, No Upload | ImageToPDF";
const DESCRIPTION =
  "Convert WebP images to PDF for free. Turn web downloads into a shareable, printable PDF — processed locally in your browser, never uploaded, no signup.";

const WEBP_FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "What is a WebP file?",
    answer:
      "WebP is an image format developed by Google for the web. It compresses well, so most images you save from a website today arrive as .webp files — great for web pages, but awkward everywhere else.",
  },
  {
    question: "Why won't my WebP image open in my apps?",
    answer:
      "Many email clients, office suites, print dialogs and older devices still don't support WebP. Converting the image to PDF puts it in a format that virtually every device, app and printer can open.",
  },
  {
    question: "Can I combine multiple WebP images into one PDF?",
    answer:
      "Yes. Add as many WebP files as you need — each becomes one PDF page. Drag to reorder them, rotate any that are sideways, and choose a page size before downloading.",
  },
  {
    question: "Does converting WebP to PDF reduce the quality?",
    answer:
      "Barely. Each WebP is decoded at full resolution and embedded at up to 2000 px on the longest edge — more than enough for sharp on-screen viewing and crisp A4 or Letter prints.",
  },
  {
    question: "Can I convert WebP to PDF on iPhone or Android?",
    answer:
      "Yes. Modern mobile browsers decode WebP natively, so the converter works fully on phones and tablets. Tap the drop zone to pick images straight from your photo library or files app.",
  },
  {
    question: "Is this WebP to PDF converter free and private?",
    answer:
      "Yes on both counts. It's completely free with no signup or watermark, and your images never leave your device — the entire conversion runs in your browser's memory.",
  },
];

export const Route = createFileRoute("/webp-to-pdf")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}${PATH}` },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}${PATH}` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "WebP to PDF Converter — ImageToPDF",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          description: DESCRIPTION,
          url: `${SITE_URL}${PATH}`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList:
            "Convert WebP images to PDF; combine multiple WebP files into one PDF; reorder and rotate pages; no upload — all processing happens in the browser",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: WEBP_FAQ_ITEMS.map((item) => ({
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ImageToPDF", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "WebP to PDF", item: `${SITE_URL}${PATH}` },
          ],
        }),
      },
    ],
  }),
  component: WebpToPdfPage,
});

function WebpToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "WebP to PDF" }]} />
        <Hero
          title={
            <>
              Convert <span className="text-primary">WebP to PDF</span>
            </>
          }
          description="Turn WebP images saved from the web into a PDF anyone can open, print and share. Free, unlimited, and private — your files never leave your device."
        />

        <section aria-label="WebP to PDF converter" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard sm:p-6">
            <ImageToPdfTool />
          </div>
        </section>

        <section
          aria-labelledby="webp-about"
          className="mx-auto max-w-3xl px-4 pb-16 sm:px-6"
        >
          <h2 id="webp-about" className="text-2xl font-bold sm:text-3xl">
            Why WebP images need converting
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Save an image from almost any modern website and it arrives as a .webp file. WebP is
              excellent for web pages — small files, fast loads — but the moment you try to email
              it, print it, or drop it into a document, you hit a wall: many apps still refuse to
              open it. PDF is the universal container that solves this. Anyone, on any device, can
              open and print a PDF.
            </p>
            <p>
              This tool decodes your WebP files right in the browser and places each one on its own
              PDF page. Combine several downloads into a single document, put the pages in order,
              and choose A4, US Letter or an exact fit. Because nothing is uploaded, even
              confidential screenshots and saved receipts stay on your device.
            </p>
          </div>
        </section>

        <HowItWorks />
        <PrivacyNote />
        <Faq items={WEBP_FAQ_ITEMS} heading="WebP to PDF FAQ" />
        <RelatedConverters links={CONVERTER_LINKS.filter((link) => link.to !== PATH)} />
      </main>
      <SiteFooter />
    </div>
  );
}
