import { CheckCircle2 } from "lucide-react";

export function PricingAnalysis() {
  const plans = [
    {
      name: "Starter",
      yourPrice: "$49",
      compAPrice: "$59",
      compBPrice: "$39",
      features: ["Up to 5 users", "Basic AI Analysis", "Email Support", "7-day history"]
    },
    {
      name: "Professional",
      yourPrice: "$149",
      compAPrice: "$199",
      compBPrice: "$129",
      features: ["Up to 20 users", "Advanced AI Insights", "Priority Support", "30-day history", "Custom Exports"]
    },
    {
      name: "Enterprise",
      yourPrice: "Custom",
      compAPrice: "$499+",
      compBPrice: "Custom",
      features: ["Unlimited users", "Custom AI Models", "24/7 Dedicated Support", "Unlimited history", "API Access"]
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-semibold mb-6">Pricing Comparison</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan, idx) => (
          <div key={idx} className="rounded-xl border border-white/10 bg-card p-6 flex flex-col relative overflow-hidden">
            {plan.name === "Professional" && (
              <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
            )}
            <h4 className="text-xl font-bold mb-2">{plan.name}</h4>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-baseline border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Your Company</span>
                <span className="text-2xl font-bold text-primary">{plan.yourPrice}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Competitor A</span>
                <span className="text-lg font-semibold">{plan.compAPrice}</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Competitor B</span>
                <span className="text-lg font-semibold">{plan.compBPrice}</span>
              </div>
            </div>
            
            <div className="mt-auto">
              <p className="text-sm font-medium mb-3">Key Features:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
