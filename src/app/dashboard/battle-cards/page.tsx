"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Swords, CheckCircle2, XCircle, DollarSign, Users, Code, Crosshair } from "lucide-react";
import { BattleCard } from "@/types/analysis";

export default function BattleCardsPage() {
  const { analysisResults } = useAppStore();

  if (!analysisResults) return <div>No analysis found.</div>;

  const { battleCards } = analysisResults;

  const renderCard = (card: BattleCard, index: number) => (
    <AnimatedCard key={index} delay={0.1 * (index + 1)} className="flex flex-col border border-white/10 bg-black/40">
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h2 className="text-2xl font-bold mb-2">{card.name}</h2>
        <p className="text-sm text-muted-foreground">{card.overview}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-brand-500/20 text-brand-300 rounded-full text-xs font-semibold">
            {card.marketPosition}
          </span>
          <span className="px-3 py-1 bg-white/10 text-white rounded-full text-xs font-semibold flex items-center gap-1">
            <DollarSign className="w-3 h-3" /> {card.pricing}
          </span>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6 flex-1">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2 mb-3 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h3>
            <ul className="space-y-2">
              {card.strengths.map((s, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span> {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-3 uppercase tracking-wider">
              <XCircle className="w-4 h-4" /> Weaknesses
            </h3>
            <ul className="space-y-2">
              {card.weaknesses.map((w, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-blue-400 flex items-center gap-2 mb-3 uppercase tracking-wider">
              <Crosshair className="w-4 h-4" /> How We Win
            </h3>
            <ul className="space-y-2">
              {card.winLossStrategy.howToWin.map((w, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span> {w}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <h4 className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                <Users className="w-3 h-3" /> Key Customers
              </h4>
              <div className="flex flex-wrap gap-1">
                {card.keyCustomers.map((c, i) => (
                  <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                <Code className="w-3 h-3" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1">
                {card.techStack.map((t, i) => (
                  <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Swords className="w-8 h-8 text-brand-500" /> Competitor Battle Cards
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Actionable intelligence for your sales and strategy teams to win competitive deals.
        </p>
      </div>

      <div className="grid gap-6">
        {battleCards.map((card, idx) => renderCard(card, idx))}
      </div>
    </div>
  );
}
