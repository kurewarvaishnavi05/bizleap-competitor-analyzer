"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Target, Search, BarChart4, TrendingUp, Cpu, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeatureComparison } from "@/components/dashboard/FeatureComparison";
import { SwotAnalysis } from "@/components/dashboard/SwotAnalysis";
import { SeoIntelligence } from "@/components/dashboard/SeoIntelligence";
import { PricingAnalysis } from "@/components/dashboard/PricingAnalysis";
import { MarketGapFinder } from "@/components/dashboard/MarketGapFinder";
import { PositioningMap } from "@/components/dashboard/PositioningMap";
import { CustomerSentiment } from "@/components/dashboard/CustomerSentiment";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";

const TABS = [
  "Executive Summary",
  "Feature Comparison",
  "SWOT Analysis",
  "Pricing Analysis",
  "SEO Intelligence",
  "Market Gap Finder",
  "Positioning Map",
  "Customer Sentiment",
  "AI Recommendations"
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [analysisPayload, setAnalysisPayload] = useState<any>(null);

  useEffect(() => {
    const dataStr = sessionStorage.getItem('aiAnalysisData');
    if (dataStr) {
      try {
        setAnalysisPayload(JSON.parse(dataStr));
      } catch (e) {
        console.error("Failed to parse analysis data", e);
      }
    }
  }, []);

  const aiData = analysisPayload?.analysis || {};
  const urls = analysisPayload?.urlsAnalyzed || ["YourCompany.com", "CompetitorA.com"];
  
  // Dynamic metrics based on AI Data (falling back to mock data if AI is missing fields)
  const overviewMetrics = [
    { title: "Market Position Score", value: aiData.marketPositionScore ? `${aiData.marketPositionScore}/100` : "84/100", trend: "+2.5%", icon: Target },
    { title: "Brand Visibility", value: "High", trend: "Top 10%", icon: Activity },
    { title: "SEO Strength", value: "72/100", trend: "+5.1%", icon: Search },
    { title: "Social Media Score", value: "68/100", trend: "-1.2%", icon: BarChart4 },
    { title: "Innovation Score", value: "89/100", trend: "+4.0%", icon: Cpu },
    { title: "Overall Competitive Rating", value: "Strong", trend: "Leading", icon: TrendingUp },
  ];

  return (
    <>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Competitor Analysis Dashboard</h2>
          <p className="text-muted-foreground">
            Comparing {urls.join(" vs ")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden md:flex border-border">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        {overviewMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <Card key={i} className="bg-card/50 backdrop-blur border-white/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={cn("text-xs mt-1 font-medium", metric.trend.startsWith('+') ? 'text-green-500' : metric.trend.startsWith('-') ? 'text-red-500' : 'text-muted-foreground')}>
                  {metric.trend}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex flex-col space-y-4">
        <div className="flex overflow-x-auto pb-2 scrollbar-hide border-b border-border">
          <div className="flex space-x-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap border-b-2",
                  activeTab === tab
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="mt-6 rounded-xl border border-white/10 bg-card/30 backdrop-blur p-6 min-h-[400px]">
          {activeTab === "Executive Summary" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-semibold mb-4">AI Executive Summary</h3>
              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
                {aiData.executiveSummary ? (
                  <p>{aiData.executiveSummary}</p>
                ) : (
                  <>
                    <p>Based on our AI analysis, <strong className="text-primary-foreground">YourCompany</strong> is currently positioned as a strong challenger in the market, trailing slightly behind CompetitorA in total market share but leading in innovation and feature velocity.</p>
                    <p><strong>Key Strengths:</strong> Your product offers superior ease of use and a more robust API than competitors, giving you an edge with developer-focused teams.</p>
                    <p><strong>Primary Weaknesses:</strong> Brand visibility in enterprise segments is lower than CompetitorB, and your pricing model lacks a dedicated mid-market tier.</p>
                    <p><strong>Growth Opportunities:</strong> There is a significant underserved segment in the EU market that competitors are ignoring. Localization and targeted marketing could yield high ROI.</p>
                  </>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "Feature Comparison" && <FeatureComparison />}
          {activeTab === "SWOT Analysis" && <SwotAnalysis data={aiData} />}
          {activeTab === "SEO Intelligence" && <SeoIntelligence />}
          {activeTab === "Pricing Analysis" && <PricingAnalysis />}
          {activeTab === "Market Gap Finder" && <MarketGapFinder />}
          {activeTab === "Positioning Map" && <PositioningMap />}
          {activeTab === "Customer Sentiment" && <CustomerSentiment />}
          {activeTab === "AI Recommendations" && <AIRecommendations data={aiData.recommendations} />}
          
        </div>
      </div>
    </>
  );
}
