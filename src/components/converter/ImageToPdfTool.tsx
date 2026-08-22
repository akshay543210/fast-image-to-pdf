import { useCallback, useEffect, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { DropZone } from "./DropZone";
import { ImageQueueList } from "./ImageQueueList";
import { PdfSettingsPanel } from "./PdfSettingsPanel";
import { GenerateButton, type GenerateStatus } from "./GenerateButton";
import { useImageQueue } from "@/hooks/use-image-queue";
import { pdfFileName } from "@/lib/image-utils";
import { downloadBlob, generatePdf } from "@/lib/pdf-utils";

/**
 * The complete image→PDF converter. 100% client-side:
 * images are decoded, arranged, and embedded into a PDF in the browser.
 */
export function ImageToPdfTool() {
  const {
    items,
    settings,
    rejections,
    addFiles,
    remove,
    clear,
    move,
    moveToIndex,
    rotate,
    updateSettings,
    dismissRejections,
  } = useImageQueue();

  const [status, setStatus] = useState<GenerateStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const processing = status === "processing";

  // Paste images from the clipboard anywhere on the page.
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
        file.type.startsWith("image/"),
      );
      if (files.length > 0) {
        event.preventDefault();
        void addFiles(files);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [addFiles]);

  const handleAdd = useCallback(
    (files: File[]) => {
      void addFiles(files).then(() => {
        setAnnouncement(files.length > 0 ? `${files.length} file(s) added to the queue` : "");
      });
    },
    [addFiles],
  );

  const handleGenerate = useCallback(async () => {
    setStatus("processing");
    setProgress(0);
    setAnnouncement("Building your PDF");
    try {
      const blob = await generatePdf(items, settings, (done, total) => {
        setProgress(done / total);
        setProgressLabel(`Processing image ${done} of ${total}`);
      });
      downloadBlob(blob, pdfFileName(items));
      setStatus("idle");
      setAnnouncement("Your PDF is ready and downloading");
      toast.success("Your PDF is downloading", {
        description: `${items.length} ${items.length === 1 ? "page" : "pages"} · ${(blob.size / (1024 * 1024)).toFixed(1)} MB`,
      });
    } catch (error) {
      setStatus("error");
      setAnnouncement("Something went wrong while building the PDF");
      toast.error("Could not create the PDF", {
        description: error instanceof Error ? error.message : "Please try again",
      });
    }
  }, [items, settings]);

  return (
    <div className="space-y-5">
      {/* Screen-reader announcements for queue and generation changes */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <DropZone onFiles={handleAdd} disabled={processing} compact={items.length > 0} />

      {rejections.length > 0 && (
        <div
          role="alert"
          className="rounded-lg border-2 border-destructive bg-card p-3 shadow-hard-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-destructive">
                  {rejections.length} {rejections.length === 1 ? "file" : "files"} skipped
                </p>
                <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                  {rejections.map((rejection, index) => (
                    <li key={`${rejection.name}-${index}`}>
                      <span className="font-medium text-foreground">{rejection.name}</span> —{" "}
                      {rejection.reason}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissRejections}
              aria-label="Dismiss skipped files notice"
              className="rounded-md p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-destructive">
          The PDF could not be created. Try removing any problematic image and generating again.
        </p>
      )}

      {items.length > 0 && (
        <div className="grid gap-5 lg:grid-cols-[1fr_340px] lg:items-start">
          <ImageQueueList
            items={items}
            onMove={move}
            onMoveToIndex={moveToIndex}
            onRotate={rotate}
            onRemove={remove}
            onClear={clear}
            disabled={processing}
          />
          <div className="space-y-5 lg:sticky lg:top-20">
            <PdfSettingsPanel settings={settings} onChange={updateSettings} disabled={processing} />
            <GenerateButton
              status={status}
              progress={progress}
              progressLabel={progressLabel}
              disabled={items.length === 0}
              onGenerate={handleGenerate}
            />
            <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Files never leave your device
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
