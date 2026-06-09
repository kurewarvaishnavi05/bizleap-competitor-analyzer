"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Activity, Megaphone, Tag, Users, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LiveFeedPage() {
  const { analysisResults } = useAppStore();

  if (!analysisResults) return <div>No analysis found.</div>;

  const { liveFeed } = analysisResults;

  const getIcon = (type: string) => {
    switch (type) {
      case 'Launch': return <Megaphone className="w-4 h-4 text-blue-400" />;
      case 'Pricing': return <Tag className="w-4 h-4 text-green-400" />;
      case 'Hiring': return <Users className="w-4 h-4 text-orange-400" />;
      case 'News': return <Newspaper className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return "bg-red-500/20 text-red-400 border-red-500/30";
      case 'Medium': return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case 'Low': return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Activity className="w-8 h-8 text-brand-500" /> Live Competitor Monitoring
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Real-time alerts on competitor product launches, pricing changes, and market movements.
        </p>
      </div>

      <AnimatedCard className="max-w-4xl" delay={0.1}>
        <div className="relative border-l-2 border-white/10 ml-4 py-4 space-y-8">
          {liveFeed.map((item, idx) => (
            <div key={item.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-black border-2 border-brand-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-brand-400" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {getIcon(item.type)}
                    <span className="font-semibold text-lg">{item.competitor}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.date}</span>
                  </div>
                  <span className={cn("text-xs font-semibold px-2 py-1 rounded border", getImpactColor(item.impact))}>
                    {item.impact} Impact
                  </span>
                </div>
                <p className="text-foreground/90 mt-2">{item.content}</p>
                <div className="mt-3 inline-block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground bg-black/50 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  );
}
