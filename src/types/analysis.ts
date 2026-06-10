export interface AnalysisInput {
  companyName: string;
  companyWebsite: string;
  industry: string;
  targetMarket: string;
  competitors: string[];
  useWebSearch?: boolean;
}

export interface Recommendation {
  title: string;
  explanation: string;
  reasoning: string;
  expectedImpact: string;
  implementationDifficulty: 'Low' | 'Medium' | 'High';
  estimatedROI: string;
  priorityLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  actionPlan: string[];
}

export interface SWOTItem {
  text: string;
  impactScore: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface BattleCard {
  name: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  keyCustomers: string[];
  techStack: string[];
  marketPosition: string;
  winLossStrategy: {
    howToWin: string[];
    whyWeLose: string[];
  };
}

export interface FeedItem {
  id: string;
  competitor: string;
  type: 'Launch' | 'Pricing' | 'Hiring' | 'News';
  content: string;
  date: string;
  impact: 'Low' | 'Medium' | 'High';
}

export interface AnalysisResults {
  overview: {
    summary: string;
    businessModel: string;
    targetAudience: string;
  };
  executiveSummary: {
    marketPosition: string;
    keyStrengths: string[];
    keyWeaknesses: string[];
    biggestOpportunities: string[];
    majorThreats: string[];
    recommendedNextActions: string[];
    marketSizeEstimate: string;
    marketSaturationIndex: number;
    aiConfidenceScore: number;
  };
  healthScores: {
    overall: number;
    competitive: number;
    innovation: number;
    seo: number;
    marketing: number;
    customerExperience: number;
    revenueGrowthPotential: number;
    risk: number;
    explanations: Record<string, string>;
  };
  marketShare: {
    myCompany: { share: number; trend: 'up' | 'down' | 'flat' };
    competitors: { name: string; share: number; trend: 'up' | 'down' | 'flat' }[];
    others: number;
    explanation: string;
    insights: string;
    confidence: 'High' | 'Medium' | 'Low';
  };
  positioning: {
    myCompany: { presence: number; innovation: number };
    competitors: { name: string; presence: number; innovation: number }[];
    quadrantInsights: {
      leaders: string;
      challengers: string;
      visionaries: string;
      nichePlayers: string;
    };
  };
  swot: {
    strengths: SWOTItem[];
    weaknesses: SWOTItem[];
    opportunities: SWOTItem[];
    threats: SWOTItem[];
    aiConfidence: number;
  };
  trends: {
    historical: { month: string; industry: number; myCompany: number; competitorAvg: number }[];
    forecast: { year: string; projectedRevenue: number; industryAverage: number }[];
  };
  battleCards: BattleCard[];
  liveFeed: FeedItem[];
  multiPerspective: {
    ceo: { insights: string[]; risks: string[]; opportunities: string[] };
    marketing: { insights: string[]; risks: string[]; opportunities: string[] };
    sales: { insights: string[]; risks: string[]; opportunities: string[] };
    customer: { insights: string[]; risks: string[]; opportunities: string[] };
    investor: { insights: string[]; risks: string[]; opportunities: string[] };
  };
  comparisonData: {
    features: { category: string; [key: string]: any }[];
    radarMetrics: { metric: string; myCompany: number; [key: string]: number | string }[];
    pricing: { tier: string; myCompany: string; [key: string]: string }[];
  };
  marketGaps: {
    missingFeatures: string[];
    untappedSegments: string[];
    pricingOpportunities: string[];
    industryTrends: string[];
    competitorWeaknesses: string[];
  };
  dynamicRecommendations: {
    product: Recommendation[];
    marketing: Recommendation[];
    seo: Recommendation[];
    sales: Recommendation[];
    customerExperience: Recommendation[];
    revenue: Recommendation[];
  };
}
