"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Shield, Zap } from "lucide-react";
import { Header } from "@/components/Header";

export default function Home() {
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
            <Link href="/analysis">
              <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-white/90">
                Start Analysis <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base glass hover:bg-white/5">
              View Demo
            </Button>
          </div>

          {/* Competitor Input Section Replaced by Analysis Module */}
          <div className="w-full max-w-4xl p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl">
            <div className="bg-card/50 backdrop-blur-xl rounded-xl p-12 md:p-16 border border-white/5 text-center space-y-6">
              <h2 className="text-3xl font-semibold">Ready to dominate your market?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Generate a comprehensive AI report with deep insights into your competitors, pricing strategies, market gaps, and execution plans.
              </p>
              <div className="pt-4">
                <Link href="/analysis">
                  <Button 
                    className="h-14 px-10 text-lg font-semibold shadow-[0_0_20px_-3px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_-3px_rgba(79,70,229,0.7)] transition-shadow"
                  >
                    Go to Analysis Module <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
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
