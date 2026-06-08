import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Zap, AlertTriangle } from "lucide-react";

export function SwotAnalysis({ data }: { data?: any }) {
  const swotData = {
    strengths: data?.strengths || [
      "Intuitive, modern user interface",
      "Robust AI capabilities integrated natively",
      "Competitive pricing for entry-level tier",
    ],
    weaknesses: data?.weaknesses || [
      "Limited integrations with legacy CRM systems",
      "Brand recognition is lower than top competitor",
    ],
    opportunities: data?.opportunities || [
      "Expansion into European markets",
      "Partnership with digital marketing agencies",
      "Launch of enterprise-specific features",
    ],
    threats: data?.threats || [
      "Competitor A releasing a similar AI feature set",
      "Economic downturn affecting marketing budgets",
    ]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-semibold mb-6">SWOT Analysis</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-green-500">
              <ArrowUpRight className="mr-2 h-5 w-5" /> Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {swotData.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-red-500">
              <ArrowDownRight className="mr-2 h-5 w-5" /> Weaknesses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {swotData.weaknesses.map((w: string, i: number) => <li key={i}>{w}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-blue-500">
              <Zap className="mr-2 h-5 w-5" /> Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {swotData.opportunities.map((o: string, i: number) => <li key={i}>{o}</li>)}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-orange-500">
              <AlertTriangle className="mr-2 h-5 w-5" /> Threats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {swotData.threats.map((t: string, i: number) => <li key={i}>{t}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
