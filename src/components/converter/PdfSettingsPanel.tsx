import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import type { PdfSettings } from "@/lib/image-utils";

interface PdfSettingsPanelProps {
  settings: PdfSettings;
  onChange: (patch: Partial<PdfSettings>) => void;
  disabled?: boolean;
}

function OptionRow({
  value,
  id,
  label,
}: {
  value: string;
  id: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}

export function PdfSettingsPanel({ settings, onChange, disabled = false }: PdfSettingsPanelProps) {
  const isFit = settings.pageSize === "fit";

  return (
    <section
      aria-label="PDF settings"
      className="space-y-5 rounded-xl border-2 border-ink/70 bg-card p-4 shadow-hard-sm sm:p-5"
    >
      <h2 className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
        PDF settings
      </h2>

      <fieldset disabled={disabled} className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-medium">Page size</p>
          <RadioGroup
            value={settings.pageSize}
            onValueChange={(value) => onChange({ pageSize: value as PdfSettings["pageSize"] })}
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Page size"
          >
            <OptionRow value="a4" id="size-a4" label="A4" />
            <OptionRow value="letter" id="size-letter" label="US Letter" />
            <OptionRow value="fit" id="size-fit" label="Fit to image" />
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Orientation</p>
          <RadioGroup
            value={settings.orientation}
            onValueChange={(value) => onChange({ orientation: value as PdfSettings["orientation"] })}
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Page orientation"
            disabled={isFit}
          >
            <OptionRow value="auto" id="orient-auto" label="Auto" />
            <OptionRow value="portrait" id="orient-portrait" label="Portrait" />
            <OptionRow value="landscape" id="orient-landscape" label="Landscape" />
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Margin</p>
          <RadioGroup
            value={settings.margin}
            onValueChange={(value) => onChange({ margin: value as PdfSettings["margin"] })}
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Page margin"
            disabled={isFit}
          >
            <OptionRow value="none" id="margin-none" label="None" />
            <OptionRow value="small" id="margin-small" label="Small" />
            <OptionRow value="large" id="margin-large" label="Large" />
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="quality-slider" className="text-sm font-medium">
              JPG quality
            </Label>
            <span className="font-mono text-xs text-muted-foreground">
              {Math.round(settings.quality * 100)}%
            </span>
          </div>
          <Slider
            id="quality-slider"
            min={50}
            max={100}
            step={5}
            value={[settings.quality * 100]}
            onValueChange={([value]) => {
              if (typeof value === "number") onChange({ quality: value / 100 });
            }}
            aria-label="JPEG quality percentage"
          />
          <p className="text-xs text-muted-foreground">
            Lower quality means a smaller PDF. PNG images always stay lossless.
          </p>
        </div>
      </fieldset>
    </section>
  );
}
