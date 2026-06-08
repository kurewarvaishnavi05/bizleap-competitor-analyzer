"use client";

import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, TrendingUp, AlertTriangle, Users, BarChart2, CheckCircle } from "lucide-react";
import Link from "next/link";
// Assuming we are using recharts based on package.json
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const { analysisResults, analysisInput } = useAppStore();

  if (!analysisResults || !analysisInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">No Analysis Found</h2>
        <p className="text-muted-foreground">Run an analysis to see your dashboard data.</p>
        <Link href="/analysis">
          <Button size="lg">Start Analysis</Button>
        </Link>
      </div>
    );
  }

  const { kpis, overview, competitors } = analysisResults;

  // Mock data for charts
  const marketShareData = [
    { name: analysisInput.companyName, value: 35 },
    ...competitors.map((c, i) => ({ name: c.name, value: Math.max(10, 30 - i * 5) }))
  ];

  const trendData = [
    { month: 'Jan', [analysisInput.companyName]: 40, [competitors[0]?.name || 'Comp 1']: 60 },
    { month: 'Feb', [analysisInput.companyName]: 45, [competitors[0]?.name || 'Comp 1']: 58 },
    { month: 'Mar', [analysisInput.companyName]: 55, [competitors[0]?.name || 'Comp 1']: 55 },
    { month: 'Apr', [analysisInput.companyName]: 70, [competitors[0]?.name || 'Comp 1']: 50 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Competitive intelligence for {analysisInput.companyName} vs {competitors.length} competitors.</p>
        </div>
        <Link href="/analysis">
          <Button variant="outline">New Analysis</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Competitors Analyzed</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.competitorsAnalyzed}</div>
            <p className="text-xs text-muted-foreground">in {analysisInput.industry}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Competitive Score</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.competitiveScore}/100</div>
            <p className="text-xs text-green-500 font-medium">+5 pts this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Market Position</CardTitle>
            <BarChart2 className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.marketPositionScore}/100</div>
            <p className="text-xs text-muted-foreground">Challenger</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.growthOpportunities}</div>
            <p className="text-xs text-muted-foreground">High impact actions found</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.riskScore}/100</div>
            <p className="text-xs text-muted-foreground">Low immediate threat</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your performance vs top competitor over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Line type="monotone" dataKey={analysisInput.companyName} stroke="#00C49F" strokeWidth={3} />
                <Line type="monotone" dataKey={competitors[0]?.name || 'Comp 1'} stroke="#8884d8" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Estimated Market Share</CardTitle>
            <CardDescription>Based on traffic and SEO visibility.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketShareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Recent Analyses</h2>
        <Card>
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <p className="font-semibold">{analysisInput.companyName} vs Market</p>
                <p className="text-sm text-muted-foreground">{analysisInput.industry} • Just now</p>
              </div>
              <Button variant="ghost" size="sm">View Report</Button>
            </div>
            <div className="flex items-center justify-between p-4 border-border opacity-50">
              <div>
                <p className="font-semibold">Acme Corp vs Top 3</p>
                <p className="text-sm text-muted-foreground">E-commerce • 2 days ago</p>
              </div>
              <Button variant="ghost" size="sm" disabled>Archived</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
