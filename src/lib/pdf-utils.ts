/**
 * PDF generation — runs fully client-side.
 * pdf-lib is dynamically imported so it never blocks initial page load.
 */

import type { PdfSettings, QueuedImage } from "./image-utils";
import { normalizeImage } from "./image-utils";

/** Page sizes in PDF points (1/72 inch). */
const PAGE_SIZES: Record<"a4" | "letter", [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
};

const MARGINS: Record<PdfSettings["margin"], number> = {
  none: 0,
  small: 24,
  large: 56,
};

export type ProgressCallback = (done: number, total: number) => void;

export async function generatePdf(
  items: QueuedImage[],
  settings: PdfSettings,
  onProgress?: ProgressCallback,
): Promise<Blob> {
  if (items.length === 0) throw new Error("Add at least one image first");

  const { PDFDocument } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  doc.setTitle("Images converted to PDF");
  doc.setProducer("Image to PDF Maker");
  doc.setCreator("Image to PDF Maker");
  doc.setCreationDate(new Date());

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item) continue;
    const norm = await normalizeImage(item, settings.quality);
    const image =
      norm.kind === "png"
        ? await doc.embedPng(norm.bytes)
        : await doc.embedJpg(norm.bytes);

    let pageW: number;
    let pageH: number;
    if (settings.pageSize === "fit") {
      // Page matches the image (px treated as pt), capped at a sane size.
      const cap = Math.min(1, 1440 / Math.max(norm.width, norm.height));
      pageW = Math.max(72, norm.width * cap);
      pageH = Math.max(72, norm.height * cap);
    } else {
      const [baseW, baseH] = PAGE_SIZES[settings.pageSize];
      const imageIsLandscape = norm.width > norm.height;
      const landscape =
        settings.orientation === "landscape" ||
        (settings.orientation === "auto" && imageIsLandscape);
      pageW = landscape ? baseH : baseW;
      pageH = landscape ? baseW : baseH;
    }

    const margin = settings.pageSize === "fit" ? 0 : MARGINS[settings.margin];
    const availW = pageW - margin * 2;
    const availH = pageH - margin * 2;
    const fit = Math.min(availW / norm.width, availH / norm.height);
    const drawW = norm.width * fit;
    const drawH = norm.height * fit;

    const page = doc.addPage([pageW, pageH]);
    page.drawImage(image, {
      x: (pageW - drawW) / 2,
      y: (pageH - drawH) / 2,
      width: drawW,
      height: drawH,
    });

    onProgress?.(i + 1, items.length);
  }

  const bytes = await doc.save();
  return new Blob([bytes as unknown as ArrayBuffer], { type: "application/pdf" });
}

/** Trigger a browser download for a generated blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  // Delay revoke so the download has time to start.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
