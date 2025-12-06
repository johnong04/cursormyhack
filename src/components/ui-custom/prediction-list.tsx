import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PredictionItem {
  label: string;
  prob: string;
  severity?: "CRITICAL" | "VERY HIGH" | "HIGH" | "MODERATE" | "LOW";
  trend?: string;
}

interface PredictionListProps {
  title: string;
  description: string;
  items: PredictionItem[];
}

const severityConfig = {
  CRITICAL: {
    badge: "Critical",
    badgeClass: "border-red-300 text-red-800 bg-red-100 dark:border-red-800 dark:text-red-300 dark:bg-red-950",
    textClass: "text-red-600 dark:text-red-400",
  },
  "VERY HIGH": {
    badge: "Very High",
    badgeClass: "border-orange-300 text-orange-800 bg-orange-100 dark:border-orange-800 dark:text-orange-300 dark:bg-orange-950",
    textClass: "text-orange-600 dark:text-orange-400",
  },
  HIGH: {
    badge: "High",
    badgeClass: "border-amber-300 text-amber-800 bg-amber-100 dark:border-amber-800 dark:text-amber-300 dark:bg-amber-950",
    textClass: "text-amber-600 dark:text-amber-400",
  },
  MODERATE: {
    badge: "Moderate",
    badgeClass: "border-blue-300 text-blue-800 bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:bg-blue-950",
    textClass: "text-blue-600 dark:text-blue-400",
  },
  LOW: {
    badge: "Low",
    badgeClass: "border-gray-300 text-gray-700 bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-900",
    textClass: "text-gray-600 dark:text-gray-400",
  },
};

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
        {items.map((item, index) => {
          const config = item.severity ? severityConfig[item.severity] : null;
          const isHighPriority = item.severity === "CRITICAL" || item.severity === "VERY HIGH";
          
          return (
            <div key={index} className="p-3.5 hover:bg-muted/20 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className={cn("text-sm font-medium block truncate", isHighPriority && "text-foreground")}>
                    {item.label}
                  </span>
                  {item.trend && (
                    <span className="text-[10px] text-muted-foreground/70 mt-0.5 block uppercase tracking-wide">
                      {item.trend}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {config && (
                    <Badge variant="outline" className={cn("h-5 text-[10px] px-1.5", config.badgeClass)}>
                      {config.badge}
                    </Badge>
                  )}
                  <span className={cn(
                    "text-sm font-bold font-mono whitespace-nowrap", 
                    config ? config.textClass : "text-muted-foreground"
                  )}>
                    {item.prob}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

