"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Search, AlertCircle, Crosshair, TrendingUp, Zap } from "lucide-react";

export default function MarketGapsPage() {
  const { analysisResults } = useAppStore();

  if (!analysisResults) return <div>No analysis found.</div>;

  const { marketGaps } = analysisResults;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Crosshair className="w-8 h-8 text-brand-500" /> Market Opportunity Center
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          AI-detected gaps in the market that your competitors are failing to address.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatedCard delay={0.1} className="bg-brand-900/10 border-brand-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-brand-400">
            <Zap className="w-5 h-5" /> Missing Features
          </h2>
          <ul className="space-y-3">
            {marketGaps.missingFeatures.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.2} className="bg-green-900/10 border-green-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-400">
            <Search className="w-5 h-5" /> Untapped Segments
          </h2>
          <ul className="space-y-3">
            {marketGaps.untappedSegments.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="bg-blue-900/10 border-blue-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
            <TrendingUp className="w-5 h-5" /> Pricing Opportunities
          </h2>
          <ul className="space-y-3">
            {marketGaps.pricingOpportunities.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedCard>

        <AnimatedCard delay={0.4} className="bg-orange-900/10 border-orange-500/20">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-orange-400">
            <AlertCircle className="w-5 h-5" /> Competitor Weaknesses
          </h2>
          <ul className="space-y-3">
            {marketGaps.competitorWeaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                <span className="text-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedCard>
      </div>
    </div>
  );
}
