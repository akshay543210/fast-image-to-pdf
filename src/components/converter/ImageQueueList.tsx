import { useState } from "react";
import { ArrowDown, ArrowUp, GripVertical, RotateCw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes, type QueuedImage } from "@/lib/image-utils";
import { cn } from "@/lib/utils";

interface ImageQueueListProps {
  items: QueuedImage[];
  onMove: (id: string, direction: -1 | 1) => void;
  onMoveToIndex: (id: string, index: number) => void;
  onRotate: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function ImageQueueList({
  items,
  onMove,
  onMoveToIndex,
  onRotate,
  onRemove,
  onClear,
  disabled = false,
}: ImageQueueListProps) {
  const [dragId, setDragId] = useState<string | null>(null);
  const totalBytes = items.reduce((sum, item) => sum + item.size, 0);

  return (
    <section aria-label="Selected images" className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {items.length} {items.length === 1 ? "image" : "images"} · {formatBytes(totalBytes)}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={disabled}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Clear all
        </Button>
      </div>

      <ol className="space-y-2">
        {items.map((item, index) => {
          const swapped = item.rotation === 90 || item.rotation === 270;
          const fitScale = swapped
            ? Math.min(item.width, item.height) / Math.max(item.width, item.height)
            : 1;
          return (
            <li
              key={item.id}
              draggable={!disabled}
              onDragStart={(event) => {
                setDragId(item.id);
                event.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (dragId && dragId !== item.id) onMoveToIndex(dragId, index);
                setDragId(null);
              }}
              onDragEnd={() => setDragId(null)}
              className={cn(
                "flex items-center gap-3 rounded-lg border-2 border-ink/70 bg-card p-2 shadow-hard-sm transition-opacity",
                dragId === item.id && "opacity-40",
              )}
            >
              <GripVertical
                className="hidden h-5 w-5 shrink-0 cursor-grab text-muted-foreground sm:block"
                aria-hidden="true"
              />

              <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-secondary">
                <img
                  src={item.objectUrl}
                  alt={`Preview of ${item.name}`}
                  className="max-h-full max-w-full object-contain transition-transform duration-200"
                  style={{ transform: `rotate(${item.rotation}deg) scale(${fitScale})` }}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{item.name}</span>
                <span className="block font-mono text-xs text-muted-foreground">
                  {item.width}×{item.height} · {formatBytes(item.size)}
                  {item.rotation !== 0 && ` · ↻${item.rotation}°`}
                </span>
              </span>

              <span className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-9 sm:w-9"
                  onClick={() => onMove(item.id, -1)}
                  disabled={disabled || index === 0}
                  aria-label={`Move ${item.name} earlier`}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-9 sm:w-9"
                  onClick={() => onMove(item.id, 1)}
                  disabled={disabled || index === items.length - 1}
                  aria-label={`Move ${item.name} later`}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 sm:h-9 sm:w-9"
                  onClick={() => onRotate(item.id)}
                  disabled={disabled}
                  aria-label={`Rotate ${item.name} 90 degrees clockwise`}
                >
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 hover:border-destructive hover:text-destructive sm:h-9 sm:w-9"
                  onClick={() => onRemove(item.id)}
                  disabled={disabled}
                  aria-label={`Remove ${item.name}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
