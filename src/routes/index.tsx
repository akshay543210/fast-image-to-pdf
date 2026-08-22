import { createFileRoute } from "@tanstack/react-router";
import { ImageToPdfTool } from "@/components/converter/ImageToPdfTool";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { PrivacyNote } from "@/components/marketing/PrivacyNote";
import { Faq, FAQ_ITEMS } from "@/components/marketing/Faq";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const TITLE = "Image to PDF Converter — Free, Private, No Upload";
const DESCRIPTION =
  "Convert JPG, PNG, WebP and GIF images to a single PDF in seconds. 100% free and private — files are processed in your browser and never uploaded.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Image to PDF Maker",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any (web browser)",
          description: DESCRIPTION,
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
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero
          title={
            <>
              Turn images into a PDF <span className="text-primary">in seconds</span>
            </>
          }
          description="Drop in your photos, arrange the pages, and download a clean PDF. Free, unlimited, and completely private — everything happens in your browser."
        />

        <section aria-label="Image to PDF converter" className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border-2 border-ink bg-card p-4 shadow-hard sm:p-6">
            <ImageToPdfTool />
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
