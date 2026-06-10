"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { RadarChartComponent } from "@/components/ui/RadarChartComponent";
import { BarChart2, Check, X, Minus } from "lucide-react";

export default function ComparisonPage() {
  const { analysisResults, analysisInput } = useAppStore();

  if (!analysisResults || !analysisInput) return <div>No analysis found.</div>;

  const { comparisonData } = analysisResults;
  const competitors = analysisInput.competitors;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <BarChart2 className="w-8 h-8 text-brand-500" /> Advanced Comparison
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Deep-dive competitive comparison across features, pricing, and key metrics.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <RadarChartComponent 
          data={comparisonData.radarMetrics} 
          myCompanyName={analysisInput.companyName}
          competitors={competitors}
        />

        {/* Feature Comparison Table */}
        <AnimatedCard className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Feature Matrix</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 font-medium text-muted-foreground">Feature</th>
                <th className="p-3 font-semibold text-brand-400">{analysisInput.companyName}</th>
                {competitors.map(c => (
                  <th key={c} className="p-3 font-semibold text-muted-foreground">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData.features.map((feature, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 text-foreground/90">{feature.category}</td>
                  
                  {/* My Company */}
                  <td className="p-3">
                    {typeof feature.myCompany === 'boolean' ? (
                      feature.myCompany ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />
                    ) : (
                      <span className="text-sm font-medium">{feature.myCompany}</span>
                    )}
                  </td>

                  {/* Competitors */}
                  {competitors.map((compName, i) => {
                    const val = feature[compName] ?? feature[`c${i + 1}`] ?? feature[`competitor${i + 1}`];
                    return (
                      <td key={i} className="p-3">
                        {typeof val === 'boolean' ? (
                          val ? <Check className="w-5 h-5 text-green-500/70" /> : <X className="w-5 h-5 text-red-500/70" />
                        ) : val === 'Partial' ? (
                          <Minus className="w-5 h-5 text-yellow-500/70" />
                        ) : val !== undefined ? (
                          <span className="text-sm text-muted-foreground">{val}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedCard>
      </div>
      
    </div>
  );
}
