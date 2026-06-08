import { Lightbulb, AlertCircle } from "lucide-react";

export function MarketGapFinder() {
  const gaps = [
    {
      title: "Missing Integrations",
      description: "Neither Competitor A nor Competitor B offers seamless integration with legacy ERP systems (like SAP or Oracle).",
      impact: "High",
      difficulty: "Medium",
      action: "Prioritize SAP integration for Q3 to capture enterprise segment."
    },
    {
      title: "Pricing Flexibility",
      description: "Current market leaders force users into rigid tiers. There is no 'pay-as-you-go' model available for seasonal businesses.",
      impact: "Medium",
      difficulty: "Low",
      action: "Introduce a usage-based billing tier."
    },
    {
      title: "Automated Reporting",
      description: "Competitors require manual configuration for weekly reports. AI-driven automated insights are missing across the board.",
      impact: "High",
      difficulty: "High",
      action: "Accelerate development of the 'Auto-Insight' scheduled reports feature."
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="h-6 w-6 text-yellow-500" />
        <h3 className="text-2xl font-semibold">AI Market Gap Finder</h3>
      </div>
      <p className="text-muted-foreground mb-8">
        Our AI has analyzed the feature sets, customer reviews, and pricing models of your competitors to identify underserved areas in the market.
      </p>
      
      <div className="space-y-6">
        {gaps.map((gap, idx) => (
          <div key={idx} className="bg-card/40 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50"></div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="text-lg font-bold mb-2 flex items-center">
                  {gap.title}
                </h4>
                <p className="text-muted-foreground text-sm mb-4">{gap.description}</p>
                <div className="bg-primary/10 border border-primary/20 rounded-md p-3 text-sm">
                  <span className="font-semibold text-primary">Recommendation: </span>
                  {gap.action}
                </div>
              </div>
              <div className="flex flex-row md:flex-col gap-4 min-w-[150px]">
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Business Impact</div>
                  <div className={`text-sm font-medium ${gap.impact === 'High' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {gap.impact}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Implementation Effort</div>
                  <div className={`text-sm font-medium ${gap.difficulty === 'High' ? 'text-red-500' : gap.difficulty === 'Low' ? 'text-green-500' : 'text-yellow-500'}`}>
                    {gap.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
