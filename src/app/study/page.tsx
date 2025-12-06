import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StudyPage() {
  return (
    <div className="space-y-6 pb-20 max-w-xl mx-auto">
      {/* 4.1 Header & Progress (Lightweight) */}
      <div className="flex items-center justify-between pt-2">
        <h1 className="text-lg font-bold tracking-tight text-foreground">Study Mode</h1>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
          <span>7 / 28 topics</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary/80 w-[25%] rounded-full" />
      </div>

      {/* 4.2 Core Flashcard (Minimal) */}
      <section className="py-2">
        <Card className="min-h-[320px] flex flex-col justify-center items-center text-center p-8 border shadow-sm relative overflow-hidden bg-card">
           <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50" />
           
           <div className="flex flex-col items-center gap-3 mb-6">
             <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-[10px] tracking-wider font-bold uppercase py-0.5">
               Sejarah
             </Badge>
             <Badge className="bg-red-50 text-red-600 hover:bg-red-50 border border-red-100 text-[10px] font-bold gap-1.5 py-0.5 pl-1.5 pr-2 shadow-none">
                <Sparkles className="w-3 h-3 fill-red-500/20" />
                90% Probability
             </Badge>
           </div>
           
           <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight tracking-tight">
             Bab 4: Malayan Union
           </h2>
           
           <p className="text-muted-foreground/80 text-base max-w-sm leading-relaxed">
             Key events, opposition, and the formation of Malayan Union after World War II.
           </p>
        </Card>
      </section>

      {/* 4.3 Subject Selection (Minimal Pills) */}
      <section className="flex justify-center gap-2">
         <SubjectPill label="Sejarah" active />
         <SubjectPill label="Math" disabled />
         <SubjectPill label="Sains" disabled />
         <SubjectPill label="B.Melayu" disabled />
      </section>

      {/* 4.4 Reveal CTA (Single Focus) */}
      <section className="space-y-3 pt-2">
        <Button size="lg" className="w-full h-12 text-base font-bold shadow-sm gap-2 rounded-xl" disabled>
            <Zap className="h-4 w-4 fill-current" />
            Reveal Answer
            <span className="text-xs font-normal opacity-70 ml-1">(Coming Soon)</span>
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Reveals marking scheme, funny audio explanation, and comic strip.
        </p>
      </section>

      {/* 4.5 Optional Key Points (Very Clean) */}
      <section className="space-y-3 pt-4 border-t border-border/40">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">
          Key Focus Areas
        </h3>
        <div className="space-y-2">
            <SimplePoint term="Features" def="Citizenship jus soli, centralized rule." />
            <SimplePoint term="Opposition" def="Loss of sovereignty, strict laws." />
        </div>
      </section>
    </div>
  );
}

function SubjectPill({ label, active, disabled }: { label: string; active?: boolean; disabled?: boolean }) {
    return (
        <button 
            disabled={disabled}
            className={cn(
                "h-8 px-3 rounded-full text-[11px] font-semibold transition-all border",
                active 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-background text-muted-foreground border-transparent hover:bg-muted",
                disabled && "opacity-40 cursor-not-allowed hover:bg-transparent"
            )}
        >
            <span className="flex items-center gap-1.5">
                {label}
                {active && <CheckCircle2 className="h-3 w-3" />}
                {disabled && <Lock className="h-2.5 w-2.5" />}
            </span>
        </button>
    );
}

function SimplePoint({ term, def }: { term: string; def: string }) {
    return (
        <div className="flex items-baseline justify-between py-2 px-3 rounded-lg bg-muted/20 border border-transparent hover:border-border/50 transition-colors">
            <span className="text-sm font-medium text-foreground">{term}</span>
            <span className="text-xs text-muted-foreground">{def}</span>
        </div>
    );
}
