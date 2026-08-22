import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export type GenerateStatus = "idle" | "processing" | "error";

interface GenerateButtonProps {
  status: GenerateStatus;
  progress: number; // 0–1
  progressLabel: string;
  disabled?: boolean;
  onGenerate: () => void;
}

export function GenerateButton({
  status,
  progress,
  progressLabel,
  disabled = false,
  onGenerate,
}: GenerateButtonProps) {
  const processing = status === "processing";

  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        onClick={onGenerate}
        disabled={disabled || processing}
        className="h-14 w-full border-2 border-ink font-display text-lg font-semibold shadow-hard transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-hard-sm active:shadow-hard-none"
      >
        {processing ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Building your PDF…
          </>
        ) : (
          <>
            <FileDown className="h-5 w-5" aria-hidden="true" />
            Create PDF
          </>
        )}
      </Button>

      <div aria-live="polite" className="min-h-6">
        {processing && (
          <div className="space-y-1.5">
            <Progress value={Math.round(progress * 100)} className="h-2" />
            <p className="text-center font-mono text-xs text-muted-foreground">{progressLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}
