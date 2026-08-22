import { createFileRoute } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq } from "@/components/marketing/Faq";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const TITLE = "PNG to PDF Converter — Free & Private, No Upload";
const DESCRIPTION =
  "Convert PNG images to PDF online for free. Lossless quality, transparency preserved, multiple PNGs in one PDF — processed in your browser, never uploaded.";

export const Route = createFileRoute("/png-to-pdf")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/png-to-pdf" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/png-to-pdf" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Image to PDF Maker", item: "/" },
            { "@type": "ListItem", position: 2, name: "PNG to PDF", item: "/png-to-pdf" },
          ],
        }),
      },
    ],
  }),
  component: PngToPdfPage,
});

function PngToPdfPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero
          title={
            <>
              Convert <span className="text-primary">PNG to PDF</span> losslessly
            </>
          }
          description="Turn PNG screenshots, scans and graphics into a crisp PDF. PNGs are embedded without recompression, and your files never leave your device."
        />

        <section aria-label="PNG to PDF converter" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard sm:p-6">
            <ImageToPdfTool />
          </div>
        </section>

        <section
          aria-labelledby="png-about"
          className="mx-auto max-w-3xl px-4 pb-16 sm:px-6"
        >
          <h2 id="png-about" className="text-2xl font-bold sm:text-3xl">
            Pixel-perfect PDFs from your PNGs
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              PNG is the format of screenshots, scans, diagrams and design exports — images where
              every pixel of sharp text matters. Unlike many converters, this tool embeds PNGs
              losslessly: no JPEG artifacts, no blurry lettering, and transparency is preserved.
            </p>
            <p>
              Drop in as many PNGs as you need, order them with the arrows or by dragging, and pick
              a page size. "Fit to image" creates a PDF where every page matches its image exactly —
              ideal for design handoffs — while A4 or Letter with margins is perfect for printing.
              Everything runs locally in your browser, so confidential screenshots stay confidential.
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
