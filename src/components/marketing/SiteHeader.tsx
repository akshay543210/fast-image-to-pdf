import { Link } from "@tanstack/react-router";
import { FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  // The logo already links home, so hide this duplicate on small screens to prevent overflow.
  { to: "/", label: "Image to PDF", className: "hidden min-[560px]:inline-block" },
  { to: "/jpg-to-pdf", label: "JPG to PDF", className: "" },
  { to: "/png-to-pdf", label: "PNG to PDF", className: "" },
  { to: "/webp-to-pdf", label: "WebP to PDF", className: "" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink/70 bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          aria-label="Image to PDF Maker — home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-ink bg-primary text-primary-foreground shadow-hard-sm">
            <FileImage className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden min-[420px]:inline">
            Image<span className="text-primary">→</span>PDF
          </span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: true }}
              className={cn(
                "rounded-md px-2 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:px-3 sm:text-sm sm:normal-case sm:tracking-normal sm:font-body sm:font-medium",
                link.className,
              )}
              activeProps={{ className: "text-primary font-semibold" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
