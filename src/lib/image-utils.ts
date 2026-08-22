/**
 * Client-side image types, validation, and normalization.
 * Everything runs in the browser — files are never uploaded anywhere.
 */

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp,.gif";
export const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB per image
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024; // 100 MB per batch
export const MAX_DIMENSION = 2000; // px, longest edge after normalization

export type Rotation = 0 | 90 | 180 | 270;

export interface QueuedImage {
  id: string;
  file: File;
  objectUrl: string;
  name: string;
  size: number;
  width: number;
  height: number;
  rotation: Rotation;
}

export interface PdfSettings {
  pageSize: "a4" | "letter" | "fit";
  orientation: "auto" | "portrait" | "landscape";
  margin: "none" | "small" | "large";
  /** JPEG re-encode quality, 0.5–1. PNG sources stay lossless. */
  quality: number;
}

export const DEFAULT_SETTINGS: PdfSettings = {
  pageSize: "a4",
  orientation: "auto",
  margin: "small",
  quality: 0.85,
};

export interface FileRejection {
  name: string;
  reason: string;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns a human-readable reason the file is rejected, or null if OK. */
export function validateFile(file: File, currentTotalBytes: number): string | null {
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return "Unsupported format — use JPG, PNG, WebP or GIF";
  }
  if (file.size > MAX_FILE_BYTES) {
    return `Too large (${formatBytes(file.size)}) — max ${formatBytes(MAX_FILE_BYTES)} per image`;
  }
  if (currentTotalBytes + file.size > MAX_TOTAL_BYTES) {
    return `Batch limit reached — max ${formatBytes(MAX_TOTAL_BYTES)} total`;
  }
  return null;
}

/** Decode a file to read its (EXIF-corrected) dimensions and build a queue item. */
export async function readImageItem(file: File): Promise<QueuedImage> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  bitmap.close();
  return {
    id: crypto.randomUUID(),
    file,
    objectUrl: URL.createObjectURL(file),
    name: file.name || "pasted-image",
    size: file.size,
    width,
    height,
    rotation: 0,
  };
}

export interface NormalizedImage {
  bytes: Uint8Array;
  width: number;
  height: number;
  kind: "jpeg" | "png";
}

/**
 * Decode an image with EXIF orientation applied, bake in the user's rotation,
 * downscale to MAX_DIMENSION, and re-encode for embedding into the PDF.
 * PNG sources stay lossless PNG; everything else becomes JPEG at `quality`.
 */
export async function normalizeImage(
  item: QueuedImage,
  quality: number,
): Promise<NormalizedImage> {
  const bitmap = await createImageBitmap(item.file);
  try {
    const swapped = item.rotation === 90 || item.rotation === 270;
    const outW = swapped ? bitmap.height : bitmap.width;
    const outH = swapped ? bitmap.width : bitmap.height;
    const scale = Math.min(1, MAX_DIMENSION / Math.max(outW, outH));
    const w = Math.max(1, Math.round(outW * scale));
    const h = Math.max(1, Math.round(outH * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is not supported in this browser");

    const preferPng = item.file.type === "image/png";
    if (!preferPng) {
      // JPEG has no alpha — flatten transparency onto white.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    ctx.scale(scale, scale);
    ctx.translate(outW / 2, outH / 2);
    ctx.rotate((item.rotation * Math.PI) / 180);
    ctx.drawImage(bitmap, -bitmap.width / 2, -bitmap.height / 2);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, preferPng ? "image/png" : "image/jpeg", quality),
    );
    if (!blob) throw new Error(`Could not process "${item.name}"`);

    return {
      bytes: new Uint8Array(await blob.arrayBuffer()),
      width: w,
      height: h,
      kind: preferPng ? "png" : "jpeg",
    };
  } finally {
    bitmap.close();
  }
}

/** Derive a friendly output filename from the queue. */
export function pdfFileName(items: QueuedImage[]): string {
  const first = items[0]?.name;
  if (!first) return "images.pdf";
  const base = first.replace(/\.[^.]+$/, "").replace(/[^\w-]+/g, "-").slice(0, 60);
  return `${base || "images"}.pdf`;
}
