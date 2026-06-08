"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, Search, ChevronRight, CheckCircle2, Shield, Zap, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState({
    company1: "",
    company2: "",
    company3: "",
    company4: "",
    company5: "",
  });

  const handleRunAnalysis = async () => {
    const activeUrls = [urls.company1, urls.company2, urls.company3, urls.company4, urls.company5].filter(Boolean);
    
    if (activeUrls.length < 2) {
      alert("Please enter at least 2 URLs (Your Company and Main Competitor).");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: activeUrls }),
      });
      const data = await res.json();
      
      if (data.success) {
        // Save the AI response to sessionStorage so the dashboard can pick it up
        sessionStorage.setItem('aiAnalysisData', JSON.stringify(data.data));
        router.push("/dashboard");
      } else {
        alert(data.error || "An error occurred during analysis.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the analysis engine.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] -z-10" />

        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40 flex flex-col items-center text-center px-4">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <Zap className="mr-2 h-4 w-4" />
            Introducing Bizleap Competitor Analyzer 2.0
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            AI-Powered Competitor Intelligence Platform
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            Analyze competitors, discover market gaps, compare products, pricing, SEO, social presence, and business opportunities in real time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-white/90">
              Start Analysis <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base glass hover:bg-white/5">
              View Demo
            </Button>
          </div>

          {/* Competitor Input Section */}
          <div className="w-full max-w-4xl p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl">
            <div className="bg-card/50 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/5">
              <div className="flex flex-col gap-2 mb-6 text-left">
                <h2 className="text-2xl font-semibold">Run Competitive Analysis</h2>
                <p className="text-muted-foreground text-sm">Enter up to 5 competitor websites to generate a comprehensive AI report.</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company 1 (Your Company)</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="https://yourcompany.com" 
                      className="pl-9 bg-background/50 border-white/10 focus-visible:ring-primary h-11"
                      value={urls.company1}
                      onChange={(e) => setUrls({...urls, company1: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company 2 (Main Competitor)</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="https://competitor.com" 
                      className="pl-9 bg-background/50 border-white/10 focus-visible:ring-primary h-11"
                      value={urls.company2}
                      onChange={(e) => setUrls({...urls, company2: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] flex-1 bg-border/50"></div>
                <span className="text-xs text-muted-foreground uppercase font-medium tracking-wider">Optional Competitors</span>
                <div className="h-[1px] flex-1 bg-border/50"></div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="relative">
                  <Input 
                    placeholder="Company 3 URL (Optional)" 
                    className="bg-background/30 border-white/5 text-sm h-10"
                    value={urls.company3}
                    onChange={(e) => setUrls({...urls, company3: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Input 
                    placeholder="Company 4 URL (Optional)" 
                    className="bg-background/30 border-white/5 text-sm h-10"
                    value={urls.company4}
                    onChange={(e) => setUrls({...urls, company4: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Input 
                    placeholder="Company 5 URL (Optional)" 
                    className="bg-background/30 border-white/5 text-sm h-10"
                    value={urls.company5}
                    onChange={(e) => setUrls({...urls, company5: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                onClick={handleRunAnalysis}
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold shadow-[0_0_20px_-3px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-3px_rgba(79,70,229,0.7)] transition-shadow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing Competitors...
                  </>
                ) : (
                  "Run AI Analysis"
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Real-time Data</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> AI-Powered Insights</span>
            <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-green-500" /> Enterprise Grade</span>
          </div>
        </section>
      </main>
    </div>
  );
}
