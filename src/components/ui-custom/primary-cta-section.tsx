import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PrimaryCTASectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export function PrimaryCTASection({ title, description, ctaText, ctaHref }: PrimaryCTASectionProps) {
  return (
    <section className="space-y-4 py-2">
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Link href={ctaHref} className="block">
        <Button className="w-full h-11 text-sm font-semibold shadow-sm gap-2 rounded-xl group" size="lg">
          {ctaText}
          <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </Button>
      </Link>
    </section>
  );
}

