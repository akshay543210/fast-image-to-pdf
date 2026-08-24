import { FileDown, Images, SlidersHorizontal } from "lucide-react";

const STEPS = [
  {
    icon: Images,
    title: "Add your images",
    text: "Drop files, browse your device, or paste from the clipboard. JPG, PNG, WebP and GIF all work.",
    image: "/images/image-to-pdf-converter-add-images.webp",
    alt: "Adding photos to the ImageToPDF image to PDF converter drop zone",
  },
  {
    icon: SlidersHorizontal,
    title: "Arrange and adjust",
    text: "Reorder pages, rotate images, and pick a page size, orientation, margin and quality.",
    image: "/images/image-to-pdf-converter-arrange-pages.webp",
    alt: "Reordering and rotating pages before converting an image to PDF",
  },
  {
    icon: FileDown,
    title: "Download your PDF",
    text: "The PDF is built right in your browser and saved straight to your device. Nothing is uploaded.",
    image: "/images/image-to-pdf-converter-download-pdf.webp",
    alt: "Downloading the finished PDF from the free image to PDF converter",
  },
] as const;

export function HowItWorks({ heading = "Three steps. Ten seconds." }: { heading?: string }) {
  return (
    <section aria-labelledby="how-it-works" className="border-t-2 border-ink/70 bg-secondary/50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 id="how-it-works" className="text-center text-2xl font-bold sm:text-3xl">
          {heading}
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="rounded-xl border-2 border-ink/70 bg-card p-5 shadow-hard-sm"
            >
              <img
                src={step.image}
                alt={step.alt}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="mb-4 aspect-[4/3] w-full rounded-lg border-2 border-ink/60 object-cover"
              />
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-ink bg-accent">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
