"use client";

import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { FileText, Download, Target, ShieldAlert, Sparkles, TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import Link from "next/link";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { ScoreGauge } from "@/components/ui/ScoreGauge";
import { MarketShareChart } from "@/components/ui/MarketShareChart";
import { exportToPDF, exportToExcel } from "@/lib/exportUtils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const { analysisResults, analysisInput } = useAppStore();
  const [exportOpen, setExportOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!analysisResults || !analysisInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">No Analysis Found</h2>
        <p className="text-muted-foreground">Run an analysis to see your dashboard data.</p>
        <Link href="/analysis">
          <Button size="lg" className="bg-brand-600 hover:bg-brand-700">Start Analysis</Button>
        </Link>
      </div>
    );
  }

  const { overview, executiveSummary, healthScores, marketShare } = analysisResults;

  return (
    <div className="space-y-8 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Executive Overview
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            High-level competitive intelligence for <span className="text-brand-400 font-semibold">{analysisInput.companyName}</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative" ref={dropdownRef}>
            <Button 
              variant="outline" 
              className="border-white/10 hover:bg-white/5"
              onClick={() => setExportOpen(!exportOpen)}
            >
              <Download className="w-4 h-4 mr-2" /> Export Report
            </Button>
            <AnimatePresence>
              {exportOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-black/90 border border-white/10 rounded-md shadow-lg overflow-hidden z-50 backdrop-blur-md"
                >
                  <button 
                    onClick={() => { exportToPDF(analysisInput, analysisResults); setExportOpen(false); }} 
                    className="w-full text-left px-4 py-3 text-sm flex items-center hover:bg-brand-600/20 text-white transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2 text-brand-400" /> PDF Executive Report
                  </button>
                  <button 
                    onClick={() => { exportToExcel(analysisInput, analysisResults); setExportOpen(false); }} 
                    className="w-full text-left px-4 py-3 text-sm flex items-center hover:bg-brand-600/20 text-white transition-colors"
                  >
                    <Target className="w-4 h-4 mr-2 text-green-400" /> Excel Data Matrix
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AnimatedCard delay={0.1} className="p-5 flex flex-col justify-between" hoverEffect={false}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Competitors Analyzed</h3>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold">{analysisInput.competitors.length}</div>
        </AnimatedCard>
        <AnimatedCard delay={0.15} className="p-5 flex flex-col justify-between" hoverEffect={false}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Market Size Estimate</h3>
            <BarChart3 className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-3xl font-bold">{executiveSummary.marketSizeEstimate}</div>
        </AnimatedCard>
        <AnimatedCard delay={0.2} className="p-5 flex flex-col justify-between" hoverEffect={false}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Market Saturation</h3>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-bold">{executiveSummary.marketSaturationIndex}/100</div>
        </AnimatedCard>
        <AnimatedCard delay={0.25} className="p-5 flex flex-col justify-between border-brand-500/30" hoverEffect={false}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-brand-400">AI Confidence Score</h3>
            <Sparkles className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-3xl font-bold text-brand-300">{executiveSummary.aiConfidenceScore}%</div>
        </AnimatedCard>
      </div>

      {/* Market Share & Overview */}
      <div className="grid md:grid-cols-1 gap-6">
        <AnimatedCard className="bg-gradient-to-br from-brand-900/40 to-black/60 border-brand-500/30 border" delay={0.3}>
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-brand-500/20 rounded-lg text-brand-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Strategic Position Overview</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {executiveSummary.marketPosition}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <h4 className="text-sm text-muted-foreground mb-1">Business Model</h4>
              <p className="font-semibold">{overview.businessModel}</p>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground mb-1">Target Audience</h4>
              <p className="font-semibold">{overview.targetAudience}</p>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard delay={0.4}>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-400" /> Estimated Market Share Analysis
          </h3>
          <MarketShareChart data={marketShare} myCompanyName={analysisInput.companyName} />
        </AnimatedCard>
      </div>

      {/* Health Scores Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Business Health Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedCard className="flex items-center justify-center py-6" delay={0.5} hoverEffect={false}>
            <ScoreGauge score={healthScores.overall} label="Overall Strength" delay={0.5} size={100} />
          </AnimatedCard>
          <AnimatedCard className="flex items-center justify-center py-6" delay={0.6} hoverEffect={false}>
            <ScoreGauge score={healthScores.competitive} label="Competitive Moat" delay={0.6} size={100} />
          </AnimatedCard>
          <AnimatedCard className="flex items-center justify-center py-6" delay={0.7} hoverEffect={false}>
            <ScoreGauge score={healthScores.innovation} label="Innovation" delay={0.7} size={100} />
          </AnimatedCard>
          <AnimatedCard className="flex items-center justify-center py-6" delay={0.8} hoverEffect={false}>
            <ScoreGauge score={healthScores.seo} label="SEO & Brand" delay={0.8} size={100} />
          </AnimatedCard>
        </div>
      </div>

    </div>
  );
}
