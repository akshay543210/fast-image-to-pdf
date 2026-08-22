import { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { ACCEPTED_EXTENSIONS, MAX_FILE_BYTES, formatBytes } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function DropZone({ onFiles, disabled = false, compact = false }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    if (disabled) return;
    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );
    onFiles(files);
  };

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        dragDepth.current += 1;
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) setIsDragging(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={cn(
        "rounded-xl border-2 border-dashed border-ink/50 bg-card transition-all",
        isDragging && "border-primary bg-accent shadow-hard-sm",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          onFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        aria-describedby="dropzone-hint"
        className={cn(
          "group flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl text-center transition-colors",
          compact ? "px-4 py-6" : "px-6 py-10 sm:py-14",
          "hover:bg-accent/40 focus-visible:bg-accent/40",
          disabled && "cursor-not-allowed opacity-50",
        )}
      >
        <span
          className={cn(
            "flex items-center justify-center rounded-lg border-2 border-ink bg-primary text-primary-foreground shadow-hard-sm transition-transform group-hover:-translate-y-0.5",
            compact ? "h-10 w-10" : "h-14 w-14",
          )}
          aria-hidden="true"
        >
          <ImagePlus className={compact ? "h-5 w-5" : "h-7 w-7"} />
        </span>
        <span className="font-display text-lg font-semibold sm:text-xl">
          {isDragging ? "Drop your images" : compact ? "Add more images" : "Drop images here"}
        </span>
        {!compact && (
          <span className="text-sm text-muted-foreground">
            or{" "}
            <span className="font-semibold text-primary underline underline-offset-2">
              browse your files
            </span>{" "}
            — pasting works too
          </span>
        )}
        <span
          id="dropzone-hint"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          JPG · PNG · WebP · GIF — up to {formatBytes(MAX_FILE_BYTES)} each
        </span>
      </button>
    </div>
  );
}
