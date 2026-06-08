export interface AnalysisInput {
  companyName: string;
  companyWebsite: string;
  industry: string;
  targetMarket: string;
  competitors: string[];
}

export interface AnalysisResults {
  overview: {
    summary: string;
    businessModel: string;
    targetAudience: string;
  };
  competitors: {
    name: string;
    url: string;
    positioning: string;
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  }[];
  features: {
    name: string;
    myCompany: boolean | string;
    [competitor: string]: boolean | string;
  }[];
  pricing: {
    tier: string;
    myCompany: string;
    [competitor: string]: string;
  }[];
  seo: {
    score: number;
    contentQuality: number;
    keywords: string[];
  };
  marketPosition: {
    leader: string;
    gaps: string[];
    differentiation: string;
  };
  aiInsights: string[];
  kpis: {
    competitorsAnalyzed: number;
    competitiveScore: number;
    marketPositionScore: number;
    growthOpportunities: number;
    riskScore: number;
  };
}

export interface ExecutionPlan {
  highPriority: { title: string; description: string; impact: string; priority: number }[];
  mediumPriority: { title: string; description: string; impact: string }[];
  longTerm: { title: string; description: string; impact: string }[];
  resources: { task: string; team: string; effort: string; timeline: string }[];
  businessImpact: {
    trafficGrowth: string;
    leadGrowth: string;
    revenueOpp: string;
    advantageScore: number;
  };
}

export const generateMockAnalysis = async (input: AnalysisInput): Promise<{ results: AnalysisResults; plan: ExecutionPlan }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3500));

  const competitorKeys = input.competitors.map((c, i) => `competitor${i + 1}`);

  const results: AnalysisResults = {
    overview: {
      summary: `${input.companyName} is poised to disrupt the ${input.industry} space with a modern approach targeted at ${input.targetMarket}.`,
      businessModel: "B2B SaaS Subscription Model",
      targetAudience: input.targetMarket,
    },
    competitors: input.competitors.map((url, i) => ({
      name: `Competitor ${i + 1}`,
      url,
      positioning: "Established enterprise solution with high market penetration but aging UI.",
      strengths: ["Brand recognition", "Extensive feature set", "Large enterprise client base"],
      weaknesses: ["Slow feature velocity", "Complex pricing", "Outdated user experience"],
      opportunities: ["SMB market segment is currently underserved", "Modern API integrations needed"],
      threats: ["Nimble startups offering point solutions", "Changing data privacy regulations"],
    })),
    features: [
      { name: "AI Automation", myCompany: true, [competitorKeys[0] || "c1"]: false, [competitorKeys[1] || "c2"]: "Partial" },
      { name: "Real-time Analytics", myCompany: true, [competitorKeys[0] || "c1"]: true, [competitorKeys[1] || "c2"]: true },
      { name: "Custom Reporting", myCompany: "Advanced", [competitorKeys[0] || "c1"]: "Basic", [competitorKeys[1] || "c2"]: "Basic" },
      { name: "API Access", myCompany: true, [competitorKeys[0] || "c1"]: true, [competitorKeys[1] || "c2"]: false },
      { name: "White-labeling", myCompany: false, [competitorKeys[0] || "c1"]: true, [competitorKeys[1] || "c2"]: false },
    ],
    pricing: [
      { tier: "Starter", myCompany: "$49/mo", [competitorKeys[0] || "c1"]: "$99/mo", [competitorKeys[1] || "c2"]: "$29/mo" },
      { tier: "Pro", myCompany: "$149/mo", [competitorKeys[0] || "c1"]: "$299/mo", [competitorKeys[1] || "c2"]: "$199/mo" },
      { tier: "Enterprise", myCompany: "Custom", [competitorKeys[0] || "c1"]: "Starts at $1k", [competitorKeys[1] || "c2"]: "Custom" },
    ],
    seo: {
      score: 72,
      contentQuality: 85,
      keywords: ["ai business analytics", "competitor tracking software", "automated market research"],
    },
    marketPosition: {
      leader: "Competitor 1",
      gaps: ["Lack of affordable mid-market solutions", "Poor mobile experience across all competitors"],
      differentiation: "Focus heavily on intuitive design and fast time-to-value for SMBs.",
    },
    aiInsights: [
      "Your pricing strategy is highly competitive in the Pro tier, consider emphasizing this in marketing.",
      "Competitor 1 is ignoring the SMB segment; aggressively target businesses with 10-50 employees.",
      "SEO gap identified: 'automated market research' has high search volume and low difficulty.",
    ],
    kpis: {
      competitorsAnalyzed: input.competitors.length,
      competitiveScore: 84,
      marketPositionScore: 76,
      growthOpportunities: 12,
      riskScore: 32,
    }
  };

  const plan: ExecutionPlan = {
    highPriority: [
      { title: "Launch SEO Campaign", description: "Target 'automated market research' keyword cluster.", impact: "High", priority: 95 },
      { title: "Revamp Pricing Page", description: "Highlight the value of the Pro tier vs Competitor 1.", impact: "High", priority: 88 },
      { title: "Develop Mobile App MVP", description: "Capitalize on the market gap for mobile experiences.", impact: "Medium", priority: 82 },
    ],
    mediumPriority: [
      { title: "Build Partnership Program", description: "Partner with marketing agencies for distribution.", impact: "High" },
      { title: "Implement SOC2 Compliance", description: "Required for moving upmarket in 6-12 months.", impact: "Medium" },
    ],
    longTerm: [
      { title: "International Expansion", description: "Localize product for EU markets.", impact: "High" },
      { title: "Launch Enterprise Tier", description: "Introduce advanced access controls and dedicated support.", impact: "High" },
    ],
    resources: [
      { task: "SEO Content Creation", team: "Marketing", effort: "2 Weeks", timeline: "Q3" },
      { task: "Mobile App MVP", team: "Engineering", effort: "6 Weeks", timeline: "Q3-Q4" },
      { task: "SOC2 Audit", team: "Operations", effort: "3 Months", timeline: "Q4" },
    ],
    businessImpact: {
      trafficGrowth: "+45%",
      leadGrowth: "+28%",
      revenueOpp: "$120k ARR",
      advantageScore: 88,
    }
  };

  return { results, plan };
};
