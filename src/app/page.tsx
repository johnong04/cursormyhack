import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight, Zap } from "lucide-react";
import { PrimaryCTASection } from "@/components/ui-custom/primary-cta-section";
import { ProgressBarRow } from "@/components/ui-custom/progress-bar-row";
import { PredictionList } from "@/components/ui-custom/prediction-list";

export default function Home() {
  return (
    <div className="space-y-8 pb-20">
      {/* 3.1 Simple Header Strip */}
      <PrimaryCTASection 
        title="SPM Prediction · Hafal.ai"
        description="Master Sejarah with AI-powered predictions and funny reveals."
        ctaText="Start Studying"
        ctaHref="/study"
      />

      {/* 3.2 Main Study Card (High Signal) */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Current Mode</h2>
        <Card className="border shadow-sm hover:shadow-md transition-all cursor-pointer group rounded-xl overflow-hidden">
          <Link href="/study">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                <Brain className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    Study Mode (Reveal)
                  </h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Predict & learn with AI teachers. Covers high-probability topics first.
                </p>
              </div>
            </CardContent>
          </Link>
          <div className="bg-muted/30 px-5 py-2 border-t border-border/40 flex gap-4">
             <span className="text-[10px] font-medium text-muted-foreground/70 flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
               Live
             </span>
             <span className="text-[10px] font-medium text-muted-foreground/50">
               Trial Papers (Coming soon)
             </span>
          </div>
        </Card>
      </section>

      {/* 3.3 Minimal Progress */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Your Progress</h2>
        <ProgressBarRow 
          label="Sejarah Mastery"
          value={7}
          total={28}
          subtext="Come back daily to keep your streak"
        />
      </section>

      {/* 3.4 Compressed Heatmap */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Forecast</h2>
        <PredictionList 
          title="Malaysia Prediction Heatmap"
          description="Kelantan & Terengganu are high probability this year."
          items={[
            { state: "Kelantan", prob: "90%", isHigh: true },
            { state: "Terengganu", prob: "90%", isHigh: true },
            { state: "Kuala Lumpur", prob: "45%" },
            { state: "Selangor", prob: "40%" },
          ]}
        />
      </section>
    </div>
  );
}
