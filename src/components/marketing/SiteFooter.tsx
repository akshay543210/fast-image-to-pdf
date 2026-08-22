import { Link } from "@tanstack/react-router";
import { FileImage } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink/70 bg-secondary/50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link to="/" className="flex items-center gap-2 font-display font-bold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-ink bg-primary text-primary-foreground">
              <FileImage className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Image<span className="text-primary">→</span>PDF
          </Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Image to PDF
            </Link>
            <Link to="/jpg-to-pdf" className="text-sm text-muted-foreground hover:text-foreground">
              JPG to PDF
            </Link>
            <Link to="/png-to-pdf" className="text-sm text-muted-foreground hover:text-foreground">
              PNG to PDF
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Free forever · No uploads · Files never leave your device
        </p>
      </div>
    </footer>
  );
}
