"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Zap, Target, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Recommendation } from "@/lib/mockAiService";

export function RecommendationAccordion({ recommendation, index }: { recommendation: Recommendation; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const priorityColors = {
    Low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    High: "text-orange-400 bg-orange-400/10 border-orange-400/20",
    Critical: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  const difficultyColors = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-red-400",
  };

  return (
    <div className="mb-4 glass-card rounded-xl overflow-hidden border border-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 font-bold">
            {index + 1}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground">{recommendation.title}</h4>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{recommendation.explanation}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium border", priorityColors[recommendation.priorityLevel])}>
            {recommendation.priorityLevel} Priority
          </span>
          <ChevronDown
            className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180")}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-5 pt-0 border-t border-white/5 mt-2 space-y-6">
              
              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Target className="w-4 h-4 text-brand-400" /> Expected Impact
                  </div>
                  <div className="font-semibold">{recommendation.expectedImpact}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" /> Estimated ROI
                  </div>
                  <div className="font-semibold text-green-400">{recommendation.estimatedROI}</div>
                </div>
                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <AlertTriangle className="w-4 h-4" /> Difficulty
                  </div>
                  <div className={cn("font-semibold", difficultyColors[recommendation.implementationDifficulty])}>
                    {recommendation.implementationDifficulty}
                  </div>
                </div>
              </div>

              {/* Reasoning */}
              <div className="bg-brand-900/20 p-4 rounded-lg border border-brand-500/20">
                <div className="flex items-center gap-2 font-semibold text-brand-300 mb-2">
                  <Zap className="w-4 h-4" /> AI Reasoning
                </div>
                <p className="text-sm text-brand-100/80 leading-relaxed">{recommendation.reasoning}</p>
              </div>

              {/* Action Plan */}
              <div>
                <h5 className="font-semibold mb-3 flex items-center gap-2">
                  Step-by-Step Action Plan
                </h5>
                <div className="space-y-3">
                  {recommendation.actionPlan.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="mt-0.5">
                        <ArrowRight className="w-4 h-4 text-brand-500" />
                      </div>
                      <p className="text-sm text-foreground/90">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
