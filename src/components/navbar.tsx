"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-lg md:max-w-xl lg:max-w-2xl">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-lg font-bold tracking-tight text-foreground">Hafal.ai</span>
        </Link>
        
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 h-6 bg-muted text-muted-foreground border-transparent font-medium text-[10px] tracking-wide uppercase">
            3 Day Streak
          </Badge>
          
          <div className="flex items-center p-0.5 bg-muted rounded-full">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "h-7 px-3 text-[11px] font-medium rounded-full hover:bg-background/50",
                  pathname === "/" && "bg-background shadow-sm text-foreground"
                )}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/study">
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "h-7 px-3 text-[11px] font-medium rounded-full hover:bg-background/50",
                  pathname === "/study" && "bg-background shadow-sm text-foreground"
                )}
              >
                Study
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
