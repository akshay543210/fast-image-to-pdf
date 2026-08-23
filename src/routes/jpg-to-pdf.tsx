import { createFileRoute } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq, FAQ_ITEMS } from "@/components/marketing/Faq";
import { RelatedConverters, CONVERTER_LINKS } from "@/components/marketing/RelatedConverters";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

const PATH = "/jpg-to-pdf";
const TITLE = "JPG to PDF Converter — Free & Private | ImageToPDF";
const DESCRIPTION =
  "Convert JPG photos to PDF online for free. Combine multiple JPGs into one PDF, reorder and rotate pages — processed in your browser, never uploaded.";

export const Route = createFileRoute("/jpg-to-pdf")({
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
          name: "JPG to PDF Converter — ImageToPDF",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          description: DESCRIPTION,
          url: `${SITE_URL}${PATH}`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList:
            "Convert JPG photos to PDF; combine multiple JPGs into one PDF; reorder and rotate pages; adjustable JPG quality; no upload — all processing happens in the browser",
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ImageToPDF", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "JPG to PDF", item: `${SITE_URL}${PATH}` },
          ],
        }),
      },
    ],
  }),
  component: JpgToPdfPage,
});

function JpgToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "JPG to PDF" }]} />
        <Hero
          title={
            <>
              Convert <span className="text-primary">JPG to PDF</span> in seconds
            </>
          }
          description="Turn one JPG photo or a whole camera roll into a single, shareable PDF. Free, unlimited, and private — your photos never leave your device."
        />

        <section aria-label="JPG to PDF converter" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard sm:p-6">
            <ImageToPdfTool />
          </div>
        </section>

        <section
          aria-labelledby="jpg-about"
          className="mx-auto max-w-3xl px-4 pb-16 sm:px-6"
        >
          <h2 id="jpg-about" className="text-2xl font-bold sm:text-3xl">
            The simplest way to turn JPGs into a PDF
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              JPG is the format every camera and phone shoots in — which makes it the format most
              often needing conversion. Whether you're submitting scanned documents, sending
              receipts, or bundling photos for print, a PDF keeps every image in order and at a
              predictable page size.
            </p>
            <p>
              Add your JPGs above, drag them into the right order, rotate any sideways shots, and
              choose A4 or US Letter. The JPG quality slider lets you trade file size for fidelity —
              85% is a great default for documents, while 100% keeps photos virtually untouched.
              Because conversion happens entirely on your device, even large batches finish in
              seconds.
            </p>
          </div>
        </section>

        <HowItWorks />
        <PrivacyNote />
        <Faq />
        <RelatedConverters links={CONVERTER_LINKS.filter((link) => link.to !== PATH)} />
      </main>
      <SiteFooter />
    </div>
  );
}
