"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { BarChart3, ArrowUpRight, ArrowDownRight, Zap, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SWOTItem } from "@/types/analysis";

export default function SWOTPage() {
  const { analysisResults } = useAppStore();

  if (!analysisResults) return <div>No analysis found.</div>;

  const { swot } = analysisResults;

  const renderSwotList = (items: SWOTItem[], type: 'positive' | 'negative') => {
    const priorityColors = {
      Low: "bg-blue-500/20 text-blue-400",
      Medium: "bg-yellow-500/20 text-yellow-400",
      High: "bg-orange-500/20 text-orange-400",
      Critical: "bg-red-500/20 text-red-400"
    };

    return (
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-black/40 rounded-lg border border-white/5">
            <div className="flex items-start gap-3">
              <div className={cn("mt-1 shrink-0 w-2 h-2 rounded-full", type === 'positive' ? "bg-green-500" : "bg-red-500")} />
              <p className="text-sm font-medium">{item.text}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-5 sm:ml-0">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                Impact: <strong className="text-foreground">{item.impactScore}</strong>
              </span>
              <span className={cn("px-2 py-0.5 rounded text-xs font-semibold", priorityColors[item.priority])}>
                {item.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-brand-500" /> AI SWOT Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Dynamic analysis of Strengths, Weaknesses, Opportunities, and Threats relative to the competitive landscape.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-semibold text-sm">
          <Sparkles className="w-4 h-4" /> AI Confidence: {swot.aiConfidence}%
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AnimatedCard delay={0.1} className="bg-green-900/10 border-green-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-green-400">
            <ArrowUpRight className="w-6 h-6" /> Strengths
          </h2>
          {renderSwotList(swot.strengths, 'positive')}
        </AnimatedCard>

        <AnimatedCard delay={0.2} className="bg-red-900/10 border-red-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
            <ArrowDownRight className="w-6 h-6" /> Weaknesses
          </h2>
          {renderSwotList(swot.weaknesses, 'negative')}
        </AnimatedCard>

        <AnimatedCard delay={0.3} className="bg-blue-900/10 border-blue-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
            <Zap className="w-6 h-6" /> Opportunities
          </h2>
          {renderSwotList(swot.opportunities, 'positive')}
        </AnimatedCard>

        <AnimatedCard delay={0.4} className="bg-orange-900/10 border-orange-500/20">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-400">
            <ShieldAlert className="w-6 h-6" /> Threats
          </h2>
          {renderSwotList(swot.threats, 'negative')}
        </AnimatedCard>
      </div>
    </div>
  );
}
