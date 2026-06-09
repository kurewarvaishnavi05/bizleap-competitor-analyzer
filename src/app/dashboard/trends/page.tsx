"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { TrendChart } from "@/components/ui/TrendChart";
import { TrendingUp, Activity } from "lucide-react";

export default function TrendsPage() {
  const { analysisResults, analysisInput } = useAppStore();

  if (!analysisResults || !analysisInput) return <div>No analysis found.</div>;

  const { trends } = analysisResults;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-brand-500" /> Market Trends & Forecasts
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Historical growth analysis and AI-driven predictive revenue forecasting.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <AnimatedCard delay={0.1}>
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Historical Growth Index (YTD)</h2>
          </div>
          <TrendChart 
            data={trends.historical} 
            xAxisKey="month" 
            lines={[
              { key: "myCompany", name: analysisInput.companyName, color: "#6366f1" },
              { key: "industry", name: "Industry Benchmark", color: "#14b8a6" },
              { key: "competitorAvg", name: "Competitor Avg", color: "#f59e0b" }
            ]} 
          />
        </AnimatedCard>

        <AnimatedCard delay={0.2}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-semibold">3-Year Revenue Projection</h2>
          </div>
          <TrendChart 
            data={trends.forecast} 
            xAxisKey="year" 
            isForecast={true}
            lines={[
              { key: "projectedRevenue", name: `${analysisInput.companyName} (Projected)`, color: "#6366f1" },
              { key: "industryAverage", name: "Industry Avg (Projected)", color: "#14b8a6" }
            ]} 
          />
        </AnimatedCard>
      </div>
    </div>
  );
}
