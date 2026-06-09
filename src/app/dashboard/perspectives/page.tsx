"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Briefcase, Building, Target, Users, LineChart, ShieldAlert } from "lucide-react";

export default function PerspectivesPage() {
  const { analysisResults } = useAppStore();

  if (!analysisResults) return <div>No analysis found.</div>;

  const { multiPerspective } = analysisResults;

  const perspectives = [
    { id: 'ceo', title: 'CEO & Executive', icon: Briefcase, color: 'text-brand-400', data: multiPerspective.ceo },
    { id: 'marketing', title: 'Marketing Leadership', icon: Target, color: 'text-pink-400', data: multiPerspective.marketing },
    { id: 'sales', title: 'Sales Strategy', icon: LineChart, color: 'text-green-400', data: multiPerspective.sales },
    { id: 'customer', title: 'Customer Success', icon: Users, color: 'text-blue-400', data: multiPerspective.customer },
    { id: 'investor', title: 'Investor Relations', icon: Building, color: 'text-purple-400', data: multiPerspective.investor },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-brand-500" /> Multi-Perspective Analysis
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Actionable intelligence tailored for different stakeholders within your organization.
        </p>
      </div>

      <div className="space-y-8">
        {perspectives.map((p, idx) => (
          <AnimatedCard key={p.id} delay={idx * 0.1} className="overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
              <div className={`p-3 bg-white/5 rounded-lg ${p.color}`}>
                <p.icon className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">{p.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Insights</h3>
                <ul className="space-y-3">
                  {p.data.insights.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span className="text-foreground/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" /> Opportunities
                </h3>
                <ul className="space-y-3">
                  {p.data.opportunities.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      <span className="text-foreground/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" /> Risks
                </h3>
                <ul className="space-y-3">
                  {p.data.risks.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span className="text-foreground/90 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
