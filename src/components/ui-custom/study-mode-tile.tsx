import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyModeTileProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
}

export function StudyModeTile({ href, icon, title, description, isComingSoon }: StudyModeTileProps) {
  const content = (
    <Card className={cn(
      "border shadow-sm hover:bg-muted/50 transition-colors cursor-pointer rounded-xl group",
      isComingSoon && "opacity-75"
    )}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-background border flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base flex items-center gap-2">
            {title}
            {isComingSoon && <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal">Soon</Badge>}
          </h3>
          <p className="text-sm text-muted-foreground leading-tight">{description}</p>
        </div>
        {!isComingSoon && <ArrowRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary transition-colors" />}
      </CardContent>
    </Card>
  );

  if (isComingSoon) {
    return <div>{content}</div>;
  }

  return (
    <Link href={href}>
      {content}
    </Link>
  );
}

