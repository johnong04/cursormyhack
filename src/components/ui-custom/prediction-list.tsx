import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PredictionItem {
  state: string;
  prob: string;
  isHigh?: boolean;
}

interface PredictionListProps {
  title: string;
  description: string;
  items: PredictionItem[];
}

export function PredictionList({ title, description, items }: PredictionListProps) {
  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      
      <div className="divide-y divide-border/40">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3.5 hover:bg-muted/20 transition-colors">
            <span className={cn("text-sm font-medium", item.isHigh && "text-foreground")}>
              {item.state}
            </span>
            <div className="flex items-center gap-3">
              {item.isHigh && (
                <Badge variant="outline" className="h-5 text-[10px] px-1.5 border-red-200 text-red-700 bg-red-50">
                  High
                </Badge>
              )}
              <span className={cn(
                "text-sm font-bold font-mono", 
                item.isHigh ? "text-red-600" : "text-muted-foreground"
              )}>
                {item.prob}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

