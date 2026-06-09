"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";

export default function AnalysisPage() {
  const router = useRouter();
  const { runAnalysis, isAnalyzing, analysisStep, analysisResults } = useAppStore();

  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [competitors, setCompetitors] = useState<{id: number, value: string}[]>([{ id: Date.now(), value: "" }]);

  useEffect(() => {
    // If analysis is complete and we have results, redirect to dashboard
    if (!isAnalyzing && analysisResults) {
      router.push("/dashboard");
    }
  }, [isAnalyzing, analysisResults, router]);

  const handleAddCompetitor = () => {
    if (competitors.length < 5) {
      setCompetitors([...competitors, { id: Date.now(), value: "" }]);
    }
  };

  const handleRemoveCompetitor = (index: number) => {
    const newCompetitors = [...competitors];
    newCompetitors.splice(index, 1);
    setCompetitors(newCompetitors);
  };

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index].value = value;
    setCompetitors(newCompetitors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validCompetitors = competitors.filter(c => c.value.trim() !== "").map(c => c.value);
    
    if (!companyName || !industry || validCompetitors.length === 0) {
      alert("Please fill in the required fields and at least one competitor.");
      return;
    }

    await runAnalysis({
      companyName,
      companyWebsite,
      industry,
      targetMarket,
      competitors: validCompetitors
    });
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative flex items-center justify-center w-24 h-24">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">AI Analysis in Progress</h2>
          <p className="text-muted-foreground animate-pulse">{analysisStep}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
        <p className="text-muted-foreground mt-2">Enter your company details and competitors to generate actionable intelligence.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Company</CardTitle>
            <CardDescription>Details about your own business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name *</label>
                <Input 
                  placeholder="e.g. Acme Corp" 
                  value={companyName} 
                  onChange={e => setCompanyName(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Website URL</label>
                <Input 
                  type="url" 
                  placeholder="https://acme.com" 
                  value={companyWebsite} 
                  onChange={e => setCompanyWebsite(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Industry *</label>
                <Input 
                  placeholder="e.g. B2B SaaS" 
                  value={industry} 
                  onChange={e => setIndustry(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Market</label>
                <Input 
                  placeholder="e.g. Mid-market tech companies" 
                  value={targetMarket} 
                  onChange={e => setTargetMarket(e.target.value)} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitors</CardTitle>
            <CardDescription>Add up to 5 competitors to analyze</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {competitors.map((comp, index) => (
              <div key={comp.id} className="flex items-center gap-2">
                <Input 
                  type="url" 
                  placeholder={`https://competitor${index + 1}.com`}
                  value={comp.value}
                  onChange={e => handleCompetitorChange(index, e.target.value)}
                  required={index === 0}
                />
                {competitors.length > 1 && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveCompetitor(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {competitors.length < 5 && (
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-dashed"
                onClick={handleAddCompetitor}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Competitor
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Run Full Analysis
          </Button>
        </div>
      </form>
    </div>
  );
}
