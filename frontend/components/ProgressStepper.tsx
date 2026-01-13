import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const steps = [
  "Download",
  "Audio",
  "Transcript",
  "Hook",
  "Render",
  "Thumbs",
  "Metadata",
  "Done",
];

export function ProgressStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold",
                isComplete && "border-primary bg-primary text-primary-foreground",
                isActive && "border-primary text-primary",
                !isComplete && !isActive && "border-muted text-muted-foreground"
              )}
            >
              {isComplete ? <Check className="h-3 w-3" /> : index + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                isComplete && "text-foreground",
                isActive && "text-primary",
                !isComplete && !isActive && "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
