import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIRecommendations({ data }: { data?: any[] }) {
  const recommendations = data || [
    {
      category: "Product Strategy",
      action: "Develop native Salesforce integration to close the enterprise gap with Competitor A."
    },
    {
      category: "Marketing & SEO",
      action: "Double down on 'AI Marketing' keywords where you currently have a slight lead."
    },
    {
      category: "Pricing Strategy",
      action: "Introduce a mid-tier plan ($99/mo) to capture users churning from Competitor A's high price jump."
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-semibold">Strategic AI Recommendations</h3>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Based on the full comparative analysis, our AI suggests the following actionable strategies to outmaneuver your competition:
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {recommendations.map((rec: any, idx: number) => (
          <div key={idx} className="bg-gradient-to-b from-card to-card/50 border border-white/10 rounded-xl p-6">
            <h4 className="text-lg font-bold mb-4 text-primary">{rec.category}</h4>
            <div className="flex items-start text-sm text-muted-foreground">
              <ArrowRight className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
              <span>{rec.action}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" className="shadow-[0_0_20px_-3px_rgba(79,70,229,0.5)]">
          <Sparkles className="mr-2 h-4 w-4" /> Generate Detailed Execution Plan
        </Button>
      </div>
    </div>
  );
}
