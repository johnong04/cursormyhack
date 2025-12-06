import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarRowProps {
  label: string;
  value: number;
  total: number;
  subtext?: string;
}

export function ProgressBarRow({ label, value, total, subtext }: ProgressBarRowProps) {
  const percentage = Math.min(100, Math.max(0, (value / total) * 100));
  
  return (
    <div className="space-y-2 p-4 bg-card border rounded-xl shadow-sm">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{label}</h3>
          {subtext && <p className="text-xs text-muted-foreground mt-0.5">{subtext}</p>}
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">/{total}</span>
        </div>
      </div>
      
      <div className="h-2 w-full bg-muted/80 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

