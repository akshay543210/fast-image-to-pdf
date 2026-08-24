import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: "How do I convert an image to PDF?",
    answer:
      "Drop your images into the box above (or tap to browse on mobile), arrange the pages in the order you want, pick a page size and quality, then press \"Create PDF\". The finished file downloads straight to your device — that's how to convert an image to PDF in about ten seconds.",
  },
  {
    question: "Is this image to PDF converter really free?",
    answer:
      "Yes — completely free, with no account, no watermark, and no page limits. The tool runs entirely in your browser, so there are no server costs passed on to you.",
  },
  {
    question: "Are my images uploaded to a server?",
    answer:
      "No. Your images never leave your device. All processing — decoding, resizing, rotating and PDF generation — happens locally in your browser. You can even disconnect from the internet after the page loads and it will still work.",
  },
  {
    question: "Which image formats can I convert to PDF?",
    answer:
      "You can convert JPG, PNG, WebP and GIF images to PDF. JPG photos are compressed with a quality setting you control; PNG images are embedded losslessly to preserve sharp text and transparency.",
  },
  {
    question: "How many images can I put in one PDF?",
    answer:
      "There is no fixed page count — each image becomes one PDF page. You can add up to 25 MB per image and 100 MB per batch, which is plenty for hundreds of typical photos.",
  },
  {
    question: "Does it work on phones and tablets?",
    answer:
      "Yes. The converter is mobile-first: it works in any modern browser on iPhone, Android, iPad and desktop. On mobile, tap the drop zone to pick photos straight from your camera roll.",
  },
  {
    question: "Will my images lose quality in the PDF?",
    answer:
      "Barely. Images are kept at up to 2000 px on the longest edge — more than enough for crisp A4 or Letter prints — and you can raise the JPG quality slider to 100% for maximum fidelity.",
  },
  {
    question: "Do I need to download an image to PDF converter app?",
    answer:
      "No. Instead of hunting for an image to PDF converter free download, just open this page — this is a free image to PDF converter that runs entirely in your web browser, with no software to install and no app store visit. The only file you download is the finished PDF itself.",
  },
  {
    question: "How do I get my PDF under 200 KB or 100 KB?",
    answer:
      "If you need a small image to PDF file — for example under 200 KB or 100 KB for an upload form — lower the JPG quality slider before generating and keep the page count small. The exact size depends on your photos, so try 60–70% quality and check the result.",
  },
  {
    question: "Is ImageToPDF an alternative to iLovePDF's image to PDF tool?",
    answer:
      "Yes. Unlike iLovePDF's image to PDF converter, which uploads your files to a server, ImageToPDF converts everything locally in your browser. Your photos never leave your device, there are no daily limits, and it works even with the internet disconnected after the page loads.",
  },
  {
    question: "Can I convert PDF to image with this tool?",
    answer:
      "No — this tool works in one direction only: image to PDF. It doesn't convert PDF files back to images, so for PDF to image conversion you'd need a dedicated PDF to image converter. Everything here is focused on turning JPG, PNG, WebP and GIF into clean PDFs.",
  },
];

export function Faq({
  items = FAQ_ITEMS,
  heading = "Frequently asked questions",
}: {
  items?: readonly FaqItem[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className="border-t-2 border-ink/70">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 id="faq-heading" className="text-center text-2xl font-bold sm:text-3xl">
          {heading}
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left font-display text-base font-semibold">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
