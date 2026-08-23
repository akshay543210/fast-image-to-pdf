import { Lock, ShieldCheck, WifiOff } from "lucide-react";

const POINTS = [
  {
    icon: ShieldCheck,
    title: "No uploads, ever",
    text: "Images are processed in your browser's memory and never sent over the network.",
  },
  {
    icon: Lock,
    title: "No accounts, no tracking of files",
    text: "No sign-up, no file logs, nothing stored. Close the tab and everything is gone.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    text: "Once the page is loaded you can go offline — conversion keeps working.",
  },
] as const;

export function PrivacyNote({ heading = "Your photos stay yours" }: { heading?: string }) {
  return (
    <section aria-labelledby="privacy-heading" className="border-t-2 border-ink/70">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <div className="rounded-xl border-2 border-ink bg-primary p-6 shadow-hard sm:p-10">
          <h2
            id="privacy-heading"
            className="text-center text-2xl font-bold text-primary-foreground sm:text-3xl"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-primary-foreground/85 sm:text-base">
            Most converters upload your images to a server. This one doesn't — the entire
            conversion happens on your own device.
          </p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {POINTS.map((point) => (
              <li key={point.title} className="flex flex-col items-center text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-primary-foreground/60 text-primary-foreground">
                  <point.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-primary-foreground">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm text-primary-foreground/80">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
