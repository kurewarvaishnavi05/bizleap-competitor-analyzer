"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { PositioningMatrix } from "@/components/ui/PositioningMatrix";
import { Crosshair, Info } from "lucide-react";

export default function PositioningPage() {
  const { analysisResults, analysisInput } = useAppStore();

  if (!analysisResults || !analysisInput) return <div>No analysis found.</div>;

  const { positioning } = analysisResults;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Crosshair className="w-8 h-8 text-brand-500" /> Competitor Positioning Matrix
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          A strategic 2x2 matrix plotting market presence against innovation scores.
        </p>
      </div>

      <AnimatedCard delay={0.1}>
        <PositioningMatrix data={positioning} myCompanyName={analysisInput.companyName} />
      </AnimatedCard>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-semibold text-brand-300 mb-1">Leaders</h3>
          <p className="text-sm text-muted-foreground">{analysisResults.positioning.quadrantInsights.leaders}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-semibold text-blue-300 mb-1">Challengers</h3>
          <p className="text-sm text-muted-foreground">{analysisResults.positioning.quadrantInsights.challengers}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-semibold text-purple-300 mb-1">Visionaries</h3>
          <p className="text-sm text-muted-foreground">{analysisResults.positioning.quadrantInsights.visionaries}</p>
        </div>
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="font-semibold text-orange-300 mb-1">Niche Players</h3>
          <p className="text-sm text-muted-foreground">{analysisResults.positioning.quadrantInsights.nichePlayers}</p>
        </div>
      </div>
    </div>
  );
}
