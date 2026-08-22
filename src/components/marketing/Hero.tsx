import type { ReactNode } from "react";
import { ShieldCheck } from "lucide-react";

interface HeroProps {
  title: ReactNode;
  description: string;
}

export function Hero({ title, description }: HeroProps) {
  return (
    <section className="bg-paper-dots">
      <div className="mx-auto max-w-5xl px-4 pb-8 pt-10 text-center sm:px-6 sm:pt-16">
        <p className="mx-auto inline-flex -rotate-2 items-center gap-1.5 rounded-md border-2 border-primary bg-card px-3 py-1 font-mono text-xs font-medium uppercase tracking-widest text-primary shadow-hard-sm">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
          100% private — no upload
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
