"use client";

import { useAppStore } from "@/store/useAppStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, ExternalLink, ShieldAlert, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CompetitorsPage() {
  const { analysisResults, analysisInput } = useAppStore();

  if (!analysisResults || !analysisInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">No Competitors Analyzed</h2>
        <p className="text-muted-foreground">Run an analysis to see competitor profiles.</p>
        <Link href="/analysis">
          <Button size="lg">Start Analysis</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Competitor Intelligence</h1>
          <p className="text-muted-foreground mt-2">Deep dive into {analysisResults.competitors.length} analyzed competitors in the {analysisInput.industry} sector.</p>
        </div>
        <Link href="/analysis">
          <Button variant="outline">Analyze New Competitors</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysisResults.competitors.map((comp, idx) => (
          <Card key={idx} className="flex flex-col h-full hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{comp.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Globe className="h-3 w-3" />
                    <a href={comp.url.startsWith('http') ? comp.url : `https://${comp.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {comp.url.replace(/^https?:\/\//, '')}
                    </a>
                  </CardDescription>
                </div>
                {analysisResults.marketPosition.leader === comp.name && (
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-black">Market Leader</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-1 text-muted-foreground">Market Positioning</h4>
                <p className="text-sm">{comp.positioning}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-1 text-green-500">
                  <ShieldCheck className="h-4 w-4" /> Core Strengths
                </h4>
                <ul className="text-sm space-y-1">
                  {comp.strengths.slice(0, 2).map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-1 text-red-500">
                  <ShieldAlert className="h-4 w-4" /> Key Vulnerabilities
                </h4>
                <ul className="text-sm space-y-1">
                  {comp.weaknesses.slice(0, 2).map((w, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-border">
              <Button variant="ghost" className="w-full justify-between" onClick={() => alert(`Showing full profile for ${comp.name}`)}>
                View Full Profile <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
