import { createFileRoute } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq } from "@/components/marketing/Faq";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const TITLE = "JPG to PDF Converter — Free & Private, No Upload";
const DESCRIPTION =
  "Convert JPG photos to PDF online for free. Combine multiple JPGs into one PDF, reorder and rotate pages — processed in your browser, never uploaded.";

export const Route = createFileRoute("/jpg-to-pdf")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/jpg-to-pdf" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/jpg-to-pdf" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Image to PDF Maker", item: "/" },
            { "@type": "ListItem", position: 2, name: "JPG to PDF", item: "/jpg-to-pdf" },
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
      </main>
      <SiteFooter />
    </div>
  );
}
