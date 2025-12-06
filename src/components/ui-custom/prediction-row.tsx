import React from "react";
import { cn } from "@/lib/utils";

interface PredictionRowProps {
  state: string;
  prob: string;
  isHigh?: boolean;
  compact?: boolean;
}

export function PredictionRow({ state, prob, isHigh, compact }: PredictionRowProps) {
  return (
    <div className={cn("flex items-center justify-between p-2 rounded-lg", isHigh ? "bg-background shadow-sm border border-red-100 dark:border-red-900/30" : "bg-muted/30", compact && "text-xs p-1.5")}>
      <span className={cn("font-medium", isHigh && "text-red-700 dark:text-red-400")}>{state}</span>
      <span className={cn("font-bold font-mono", isHigh ? "text-red-600 dark:text-red-400" : "text-muted-foreground")}>{prob}</span>
    </div>
  );
}

