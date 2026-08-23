import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export interface ConverterLink {
  to: string;
  label: string;
  description: string;
}

export const CONVERTER_LINKS: ConverterLink[] = [
  {
    to: "/jpg-to-pdf",
    label: "JPG to PDF",
    description: "Camera rolls, scans and photos — with a quality slider.",
  },
  {
    to: "/png-to-pdf",
    label: "PNG to PDF",
    description: "Lossless conversion that keeps sharp text and transparency.",
  },
  {
    to: "/webp-to-pdf",
    label: "WebP to PDF",
    description: "Turn web downloads into files anyone can open and print.",
  },
];

export function RelatedConverters({
  links,
  heading = "Related converters",
}: {
  links: ConverterLink[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="related-converters" className="border-t-2 border-ink/70 bg-secondary/50">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 id="related-converters" className="text-center text-2xl font-bold sm:text-3xl">
          {heading}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="group flex h-full flex-col rounded-xl border-2 border-ink/70 bg-card p-5 shadow-hard-sm transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-hard-none"
              >
                <span className="flex items-center justify-between gap-2 font-display text-lg font-semibold">
                  {link.label}
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {link.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
