"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Search, 
  Brain, 
  FileText, 
  Gauge, 
  PieChart, 
  Target, 
  Users, 
  Check,
  Star
} from "lucide-react";
import { Header } from "@/components/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      // In a real app we might pass this URL via state or query params.
      // For now, redirect to the analysis dashboard.
      router.push("/analysis");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Header />

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] -z-10" />

        {/* Hero Section */}
        <section className="w-full pt-20 pb-28 flex flex-col items-center text-center px-4 relative z-10">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-8 shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            <Zap className="mr-2 h-3 w-3" />
            AI-powered competitor intelligence
          </div>

          <div className="flex items-center justify-center gap-3 mb-8 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {['bg-purple-500', 'bg-indigo-500', 'bg-blue-500', 'bg-pink-500'].map((color, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-bold text-white ${color}`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <span>Trusted by 500+ founders and marketers</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl text-white">
            Spy on Your Competitors.<br/>Win Your Market.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered competitor analysis in 60 seconds. Get instant insights on positioning, tech stack, SEO, and growth opportunities.
          </p>
          
          <div className="w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleAnalyze} className="relative glass-card rounded-xl p-1.5 shadow-2xl flex items-center">
              <div className="flex items-center flex-1 pl-4">
                <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
                <input 
                  type="url" 
                  placeholder="https://competitor.com" 
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-muted-foreground py-3 outline-none w-full"
                />
              </div>
              <Button type="submit" className="px-6 py-6 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition text-md">
                Analyze
              </Button>
            </form>
            <p className="text-center text-muted-foreground text-xs mt-3">No credit card required · 3 free analyses</p>
          </div>

          {/* Dashboard Image Mockup */}
          <div className="w-full max-w-6xl mx-auto mt-20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-30"></div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
              <Image 
                src="/hero-mockup-v3.png" 
                alt="BizLeap Analyzer Dashboard" 
                width={1200} 
                height={675}
                className="w-full h-auto object-cover opacity-90"
                priority
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 sm:px-6 py-12 border-y border-border/50 bg-black/20">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">12,000+</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Websites analyzed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">47<span className="text-xl text-muted-foreground">s</span></div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Average report time</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">4.8<span className="text-xl text-muted-foreground">/5</span></div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Average user rating</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">6</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Languages supported</div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="px-4 sm:px-6 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">How It Works</h2>
              <p className="text-muted-foreground text-lg">From URL to actionable insights in three steps</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative glass rounded-xl p-6 hover:border-primary/50 transition duration-300">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">1</div>
                <Search className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">Enter URL</h3>
                <p className="text-muted-foreground text-sm">Drop any competitor website link. We handle the scraping and data collection.</p>
              </div>
              <div className="relative glass rounded-xl p-6 hover:border-primary/50 transition duration-300">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">2</div>
                <Brain className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">AI Analyzes</h3>
                <p className="text-muted-foreground text-sm">Our AI scans positioning, SEO, content, tech stack and design patterns.</p>
              </div>
              <div className="relative glass rounded-xl p-6 hover:border-primary/50 transition duration-300">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">3</div>
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-white font-semibold text-lg mb-2">Get Insights</h3>
                <p className="text-muted-foreground text-sm">Receive a structured report and SWOT analysis you can act on in minutes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 sm:px-6 py-20 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Everything You Need to Outperform</h2>
              <p className="text-muted-foreground text-lg">Stop guessing. Start winning with real data.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Target, title: "Value Proposition", desc: "Understand exactly what your competitor is selling." },
                { icon: Users, title: "Target Audience", desc: "Discover primary and secondary audiences." },
                { icon: Search, title: "SEO Deep Dive", desc: "Title tags, meta, headings, and content quality." },
                { icon: Shield, title: "Tech Stack", desc: "Frontend, backend, analytics, marketing tools." },
                { icon: Gauge, title: "PageSpeed & Vitals", desc: "Mobile and desktop performance scores." },
                { icon: PieChart, title: "SWOT Analysis", desc: "Strengths, Weaknesses, Opportunities, Threats." },
              ].map((feat, i) => (
                <div key={i} className="glass rounded-xl p-5 hover:border-primary/40 transition group cursor-default">
                  <feat.icon className="w-7 h-7 text-primary mb-3 group-hover:scale-110 transition duration-300" />
                  <h3 className="text-white font-semibold text-sm mb-1.5">{feat.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
                </div>
              ))}
              
              <div className="glass rounded-xl p-5 hover:border-amber-500/40 transition group relative border-amber-500/20 cursor-default">
                <div className="absolute top-3 right-3 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 border border-amber-500/40 text-amber-400">Coming Q3</div>
                <Zap className="w-7 h-7 mb-3 group-hover:scale-110 transition duration-300 text-amber-500" />
                <h3 className="text-white font-semibold text-sm mb-1.5">Competitor Tracking</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">Set up weekly monitoring and get notified of changes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-4 sm:px-6 py-20 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Simple Pricing. Real Value.</h2>
              <p className="text-muted-foreground text-lg">Start free. Upgrade when you're ready.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <div className="glass rounded-2xl p-8 flex flex-col border border-white/5">
                <h3 className="text-white font-bold text-xl mb-1">Free</h3>
                <p className="text-muted-foreground text-xs mb-4">Perfect to try BizLeap</p>
                <div className="mb-5">
                  <span className="text-4xl font-bold text-white">$0</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent border-border hover:bg-white/5">Start Free</Button>
                <ul className="mt-8 space-y-3 flex-1">
                  {["3 analyses total", "Value proposition extraction", "Target audience profiling", "Executive summary"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="glass-card rounded-2xl p-8 flex flex-col border border-primary/50 relative shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-primary to-purple-600 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">🔥 Most Popular</div>
                <h3 className="text-white font-bold text-xl mb-1">Pro</h3>
                <p className="text-muted-foreground text-xs mb-4">For founders and marketers</p>
                <div className="mb-5">
                  <span className="text-4xl font-bold text-white">$19</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">Upgrade to Pro</Button>
                <ul className="mt-8 space-y-3 flex-1">
                  {[
                    "Unlimited analyses", 
                    "Everything in Free", 
                    "Content quality analysis", 
                    "PageSpeed & Core Web Vitals", 
                    "Full SEO audit", 
                    "Tech stack detection",
                    "SWOT Analysis"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-200 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
