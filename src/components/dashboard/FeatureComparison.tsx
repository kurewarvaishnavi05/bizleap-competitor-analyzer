import { CheckCircle2, XCircle } from "lucide-react";

export function FeatureComparison() {
  const features = [
    { name: "AI Powered Insights", me: true, cA: false, cB: true },
    { name: "Real-time Monitoring", me: true, cA: true, cB: false },
    { name: "Export to PDF/Excel", me: true, cA: true, cB: true },
    { name: "White-label Reports", me: false, cA: true, cB: false },
    { name: "Sentiment Analysis", me: true, cA: false, cB: false },
    { name: "API Access", me: true, cA: false, cB: true },
    { name: "Custom Dashboards", me: false, cA: true, cB: true },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-semibold mb-6">Feature Comparison Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Feature Core</th>
              <th className="px-6 py-4 font-medium text-center text-primary">Your Company</th>
              <th className="px-6 py-4 font-medium text-center">Competitor A</th>
              <th className="px-6 py-4 font-medium text-center">Competitor B</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx} className="border-b border-border hover:bg-muted/20 transition-colors">
                <td className="px-6 py-4 font-medium">{feature.name}</td>
                <td className="px-6 py-4 text-center">
                  {feature.me ? <CheckCircle2 className="inline h-5 w-5 text-green-500" /> : <XCircle className="inline h-5 w-5 text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.cA ? <CheckCircle2 className="inline h-5 w-5 text-green-500" /> : <XCircle className="inline h-5 w-5 text-red-500" />}
                </td>
                <td className="px-6 py-4 text-center">
                  {feature.cB ? <CheckCircle2 className="inline h-5 w-5 text-green-500" /> : <XCircle className="inline h-5 w-5 text-red-500" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
