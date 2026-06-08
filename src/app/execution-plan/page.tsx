"use client";

import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Users, Zap, Award, Target, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExecutionPlanPage() {
  const { analysisResults, executionPlan, analysisInput } = useAppStore();

  if (!analysisResults || !executionPlan || !analysisInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">No Execution Plan Found</h2>
        <p className="text-muted-foreground">Run an analysis to generate a strategic execution plan.</p>
        <Link href="/analysis">
          <Button size="lg">Start Analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Strategic Execution Plan</h1>
        <p className="text-muted-foreground mt-2">AI-generated roadmap for {analysisInput.companyName} based on competitive gaps.</p>
      </div>

      {/* Business Impact Forecast */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Traffic Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{executionPlan.businessImpact.trafficGrowth}</div>
            <p className="text-xs text-muted-foreground mt-1">Expected 90-day impact</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lead Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{executionPlan.businessImpact.leadGrowth}</div>
            <p className="text-xs text-muted-foreground mt-1">Expected 90-day impact</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{executionPlan.businessImpact.revenueOpp}</div>
            <p className="text-xs text-muted-foreground mt-1">Annualized value</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Advantage Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{executionPlan.businessImpact.advantageScore}/100</div>
            <p className="text-xs text-muted-foreground mt-1">Post-execution</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Columns */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <Zap className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold">Phase 1: Immediate</h2>
            <Badge variant="outline" className="ml-auto">0-30 Days</Badge>
          </div>
          <div className="space-y-4">
            {executionPlan.highPriority.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500 bg-card/50">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    {item.priority && <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Score: {item.priority}</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs font-medium text-foreground/80">Impact: {item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <Target className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold">Phase 2: Growth</h2>
            <Badge variant="outline" className="ml-auto">30-60 Days</Badge>
          </div>
          <div className="space-y-4">
            {executionPlan.mediumPriority.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-amber-500 bg-card/50">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs font-medium text-foreground/80">Impact: {item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <Rocket className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Phase 3: Scale</h2>
            <Badge variant="outline" className="ml-auto">60-90 Days</Badge>
          </div>
          <div className="space-y-4">
            {executionPlan.longTerm.map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-blue-500 bg-card/50">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <p className="text-xs font-medium text-foreground/80">Impact: {item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Planning Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Planning</CardTitle>
          <CardDescription>Required team allocations to execute this plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Estimated Effort</TableHead>
                <TableHead className="text-right">Timeline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {executionPlan.resources.map((res, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{res.task}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{res.team}</Badge>
                  </TableCell>
                  <TableCell>{res.effort}</TableCell>
                  <TableCell className="text-right">{res.timeline}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* AI Recommendations */}
      <Card className="border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" /> 
            AI Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysisResults.aiInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-muted-foreground">{insight}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
