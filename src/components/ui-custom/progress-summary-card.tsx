import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressItem {
  label: string;
  count: number;
  total: number;
  colorClass?: string;
  isMain?: boolean;
}

export function ProgressSummaryCard() {
  return (
    <Card className="border shadow-sm rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b border-border/50 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-accent" />
           </div>
           <div>
             <p className="font-semibold">Sejarah Mastery</p>
             <p className="text-xs text-muted-foreground">Based on your recent study sessions</p>
           </div>
        </div>
        <div className="p-4 grid grid-cols-1 gap-4">
          {/* Item 1 */}
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary transform -rotate-45" />
              <span className="text-xs font-bold">9</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">Still learning</span>
                <span className="text-sm text-muted-foreground">9 terms</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/20 w-[15%]" />
              </div>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="flex items-center gap-4 opacity-60">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-muted" />
              <span className="text-xs font-bold text-muted-foreground">268</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-sm">Not studied</span>
                <span className="text-sm text-muted-foreground">268 terms</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

