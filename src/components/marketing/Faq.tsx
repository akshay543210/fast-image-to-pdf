import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ_ITEMS = [
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
] as const;

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="border-t-2 border-ink/70">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 id="faq-heading" className="text-center text-2xl font-bold sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-8">
          {FAQ_ITEMS.map((item, index) => (
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
