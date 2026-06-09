export interface AnalysisInput {
  companyName: string;
  companyWebsite: string;
  industry: string;
  targetMarket: string;
  competitors: string[];
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

// Simple hash function to generate deterministic pseudo-random numbers based on strings
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const generateMockAnalysis = async (input: AnalysisInput): Promise<{ results: AnalysisResults }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 3500));

  const competitorKeys = input.competitors.map((c, i) => `competitor${i + 1}`);
  
  const baseSeed = hashString(input.companyName + input.industry + input.competitors.join(""));
  const randScore = (min: number, max: number, offset: number) => {
    const val = (baseSeed + offset) % (max - min + 1);
    return min + val;
  };

  const industryStr = input.industry || "Software";
  const myName = input.companyName || "Your Company";
  
  const isB2B = industryStr.toLowerCase().includes("b2b") || industryStr.toLowerCase().includes("saas");
  const isEcommerce = industryStr.toLowerCase().includes("ecommerce") || industryStr.toLowerCase().includes("retail");
  
  const overallScore = randScore(65, 92, 1);
  const seoScore = randScore(40, 85, 2);
  const compScore = randScore(50, 88, 3);
  const riskScore = randScore(20, 60, 4);

  // Market Share calc
  let remainingShare = 100;
  const myShare = randScore(8, 35, 20);
  const myTrend = randScore(0, 2, 25) === 0 ? 'up' : (randScore(0, 2, 26) === 1 ? 'down' : 'flat');
  remainingShare -= myShare;
  
  const compShares = input.competitors.map((c, i) => {
    const share = Math.min(remainingShare - (input.competitors.length - i) * 5, randScore(10, 40, 21 + i));
    const trend = randScore(0, 2, 27 + i) === 0 ? 'down' : (randScore(0, 2, 28 + i) === 1 ? 'up' : 'flat');
    remainingShare -= share;
    return { name: c, share, trend };
  });

  const allPlayers = [{ name: myName, share: myShare, trend: myTrend }, ...compShares].sort((a, b) => b.share - a.share);
  const myRank = allPlayers.findIndex(p => p.name === myName) + 1;
  const leader = allPlayers[0];
  const gap = myRank > 1 ? leader.share - myShare : 0;
  
  const insightsText = myRank === 1 
    ? `${myName} is currently the market leader with an estimated ${myShare}% share. To maintain this lead, focus on product innovation and defensive pricing strategies.`
    : `${myName} currently holds an estimated ${myShare}% market share and ranks #${myRank} among analyzed competitors. Closing the ${gap}% gap with the market leader (${leader.name}) would require stronger SEO visibility, content marketing, and customer acquisition initiatives.`;

  const possibleStrengths = [
    `Agile product development cycles compared to ${input.competitors[0] || 'legacy competitors'}`,
    `Modern tech stack allowing rapid scaling in the ${industryStr} market`,
    `High customer retention rate among ${input.targetMarket || 'core'} users`,
    `Strong organic SEO footprint for high-intent ${industryStr} keywords`,
    `Proprietary AI algorithms outperforming ${input.competitors[1] || 'industry averages'}`,
    `Highly competitive pricing model capturing the ${input.targetMarket || 'mid-market'} segment`,
    `Deep domain expertise in ${industryStr}`,
    `Excellent customer support metrics compared to ${input.competitors[0] || 'industry benchmarks'}`
  ];
  const possibleWeaknesses = [
    `Low brand awareness compared to incumbents like ${input.competitors[0] || 'market leaders'}`,
    `Lack of enterprise compliance (SOC2) hindering ${input.targetMarket || 'enterprise'} deals`,
    `High customer acquisition costs on paid channels`,
    `Limited native integrations for the ${industryStr} ecosystem`,
    `Onboarding friction for non-technical users`,
    `Smaller sales team compared to ${input.competitors[1] || 'fast-growing challengers'}`,
    `Complex setup process leading to drop-offs`,
    `Outdated legacy code in core product slowing feature velocity`
  ];
  const possibleOpportunities = [
    `Underserved mid-market segment abandoned by ${input.competitors[0] || 'competitors'}`,
    `Expansion via strategic partnerships in the ${industryStr} space`,
    `Automated reporting features highly demanded by ${input.targetMarket || 'users'}`,
    `International expansion (EU market) where ${input.competitors[1] || 'competitors'} are weak`,
    `Upselling premium support tiers to existing ${input.targetMarket || 'enterprise'} customers`,
    `Influencer marketing on emerging platforms`,
    `Launch of mobile applications for on-the-go ${industryStr} workflows`,
    `Targeting the public sector with specific compliance updates`
  ];
  const possibleThreats = [
    `${input.competitors[0] || 'Competitors'} aggressively cutting prices to capture market share`,
    `Changing data privacy laws affecting ${industryStr} data collection`,
    `New venture-backed entrants disrupting the ${input.targetMarket || 'core'} market`,
    `Economic downturn reducing ${industryStr} software spend`,
    `Platform dependency risks (e.g. API changes from major platforms)`,
    `Talent poaching from big tech and well-funded ${industryStr} startups`,
    `Open source alternatives offering similar features for free`,
    `Vendor consolidation by CFOs impacting point solutions like ${myName}`
  ];
  const possibleTech = ["React", "Vue", "Java", "Python", "AWS", "GCP", "Salesforce", "PostgreSQL", "MongoDB", "Node.js", "Docker", "Kubernetes"];
  const possibleCustomers = ["Fortune 500s", "Large Agencies", "Gov Agencies", "Tech Startups", "Mid-market B2B", "E-commerce brands", "Healthcare Providers", "Financial Services"];

  // Dynamic Generator Helpers
  const genDynamicRecs = (category: string, count: number, offsetSeed: number): Recommendation[] => {
    const recs: Recommendation[] = [];
    for (let i = 0; i < count; i++) {
      const seed = offsetSeed + i * 50;
      
      const difficulty = randScore(0, 2, seed) === 0 ? "Low" : (randScore(0, 2, seed + 1) === 1 ? "Medium" : "High");
      const priority = randScore(0, 3, seed + 2) === 0 ? "Critical" : (randScore(0, 2, seed + 3) === 1 ? "High" : "Medium");
      
      const impactMultiplier = randScore(10, 50, seed + 4);
      const roiMultiplier = randScore(20, 200, seed + 5) * 1000;
      
      let title = "";
      let explanation = "";
      let reasoning = "";
      let expectedImpact = "";
      let actionPlan: string[] = [];

      if (category === "product") {
        const features = ["Advanced API Integrations", "AI Analytics Module", "Mobile Application", "Custom Reporting Engine", "Enterprise SSO"];
        const feat = features[randScore(0, features.length - 1, seed + 6)];
        title = `Build ${feat}`;
        explanation = `Enterprise clients in the ${industryStr} sector require ${feat.toLowerCase()} to close deals.`;
        reasoning = `Analysis of ${input.competitors[0] || 'market leaders'} shows this feature is present in 80% of winning deals.`;
        expectedImpact = `Increase Enterprise win rate by ${impactMultiplier}%`;
        actionPlan = [`Gather requirements for ${feat}`, "Build MVP prototype", "Beta test with power users", "Public launch"];
      } else if (category === "marketing") {
        const channels = ["Comparison Pages", "Industry Webinars", "Account-Based Marketing (ABM)", "Influencer Partnerships"];
        const ch = channels[randScore(0, channels.length - 1, seed + 6)];
        title = `Launch ${ch} Campaign`;
        explanation = `Capture high-intent traffic directly comparing ${myName} to competitors.`;
        reasoning = `Current inbound pipeline lacks bottom-of-funnel conversion mechanisms.`;
        expectedImpact = `Generate ${impactMultiplier * 10}+ MQLs per quarter`;
        actionPlan = ["Identify target segments", `Create ${ch} collateral`, "Launch distribution campaign", "Measure attribution"];
      } else if (category === "seo") {
        const tactics = ["'How-To' Long-Tail Keywords", "Programmatic SEO Pages", "Technical Core Web Vitals", "Competitor Alternative Pages"];
        const tac = tactics[randScore(0, tactics.length - 1, seed + 6)];
        title = `Focus on ${tac}`;
        explanation = `Build a content moat around specific workflows in ${industryStr}.`;
        reasoning = `Your SEO score is ${seoScore}/100. Competitors dominate broad terms but ignore niche queries.`;
        expectedImpact = `Increase organic traffic by ${impactMultiplier * 5}%`;
        actionPlan = ["Keyword gap analysis", "Create content briefs", "Publish at high velocity", "Build backlinks"];
      } else if (category === "sales") {
        const tactics = ["Automated Lead Scoring", "Conversational AI Chatbots", "Interactive ROI Calculators", "Outbound Sequence Optimization"];
        const tac = tactics[randScore(0, tactics.length - 1, seed + 6)];
        title = `Implement ${tac}`;
        explanation = `Help sales reps focus on the accounts most likely to close.`;
        reasoning = `Sales velocity is lagging behind ${input.competitors[1] || 'industry averages'} due to manual qualification.`;
        expectedImpact = `Reduce sales cycle by ${impactMultiplier} days`;
        actionPlan = ["Define qualification criteria", "Set up CRM automation", "Train sales team", "Review and refine rules"];
      } else if (category === "cx") {
        const tactics = ["Proactive Day-60 Check-ins", "Customer Community Forum", "In-App Interactive Onboarding", "Quarterly Business Reviews (QBRs)"];
        const tac = tactics[randScore(0, tactics.length - 1, seed + 6)];
        title = `Launch ${tac}`;
        explanation = `Reduce friction and improve time-to-value for new signups.`;
        reasoning = `Data indicates a churn spike around month 3 for ${industryStr} products.`;
        expectedImpact = `Reduce churn by ${impactMultiplier / 2}%`;
        actionPlan = ["Map user journey drop-offs", "Implement automated outreach", "Track user engagement", "Iterate based on feedback"];
      } else if (category === "revenue") {
        const tactics = ["Add-on Modules for Power Users", "Usage-Based Pricing Shift", "Annual Contract Discounts", "Implementation Fees"];
        const tac = tactics[randScore(0, tactics.length - 1, seed + 6)];
        title = `Introduce ${tac}`;
        explanation = `Align cost with the actual value derived by the customer.`;
        reasoning = `Current pricing structure leaves money on the table for high-usage accounts.`;
        expectedImpact = `Increase ARPU by ${impactMultiplier}%`;
        actionPlan = ["Analyze usage data percentiles", "Model new pricing tiers", "Update billing system", "Communicate to users"];
      }

      recs.push({
        title,
        explanation,
        reasoning,
        expectedImpact,
        implementationDifficulty: difficulty as any,
        estimatedROI: `$${(roiMultiplier / 1000).toFixed(0)}k ARR`,
        priorityLevel: priority as any,
        actionPlan
      });
    }
    return recs;
  };

  const pickN = (arr: any[], n: number, seedOffset: number) => {
    const copy = [...arr];
    const result = [];
    for(let i=0; i<Math.min(n, arr.length); i++) {
      const idx = randScore(0, copy.length - 1, seedOffset + i * 10);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  };

  const results: AnalysisResults = {
    overview: {
      summary: `${myName} is positioned to disrupt the ${industryStr} sector. Our analysis indicates a strong product-market fit but underutilized acquisition channels compared to competitors.`,
      businessModel: isB2B ? "B2B / Subscription" : (isEcommerce ? "B2C / E-commerce" : "Hybrid Model"),
      targetAudience: input.targetMarket || "Mid-market to Enterprise",
    },
    executiveSummary: {
      marketPosition: seoScore > 70 ? `Strong organic leader in the ${industryStr} space, capturing significant high-intent traffic.` : `Challenger in the ${industryStr} space with high product growth potential but currently outpaced in SEO.`,
      keyStrengths: [
        randScore(1, 10, 5) > 5 ? "Modern technology stack & architecture" : "Strong community engagement",
        "Agile product development cycles", 
        "Highly competitive pricing model"
      ],
      keyWeaknesses: [
        seoScore < 60 ? "Low brand awareness & organic traffic" : "High customer acquisition costs",
        "Limited enterprise compliance certifications",
        isEcommerce ? "Cart abandonment rates" : "Onboarding friction"
      ],
      biggestOpportunities: [
        `Underserved segments in ${input.targetMarket || 'adjacent markets'}`, 
        "Automated reporting features", 
        isB2B ? "Partnership distribution channels" : "Influencer marketing"
      ],
      majorThreats: [
        "New venture-backed entrants entering the market", 
        "Legacy competitors engaging in price wars", 
        "Changing data privacy regulations"
      ],
      recommendedNextActions: [
        seoScore < 60 ? "Overhaul technical SEO & content strategy" : "Optimize ad spend ROI", 
        "Launch targeted expansion campaigns", 
        "Begin compliance/security certification process"
      ],
      marketSizeEstimate: `$${randScore(5, 50, 100)} Billion`,
      marketSaturationIndex: randScore(40, 85, 101),
      aiConfidenceScore: randScore(88, 98, 102),
    },
    healthScores: {
      overall: overallScore,
      competitive: compScore,
      innovation: randScore(75, 98, 6),
      seo: seoScore,
      marketing: randScore(55, 85, 7),
      customerExperience: randScore(70, 95, 8),
      revenueGrowthPotential: randScore(70, 99, 9),
      risk: riskScore,
      explanations: {
        overall: `Based on your metrics relative to ${input.competitors.length} competitors.`,
        competitive: compScore > 70 ? "Strong feature moat." : "Lacking critical differentiation.",
        innovation: "High velocity of feature shipping.",
        seo: seoScore > 70 ? "Dominating core keywords." : "Critically low organic footprint.",
        marketing: "Average performance; messaging could be sharper.",
        customerExperience: "Excellent UX, leading to high retention.",
        revenueGrowthPotential: "Massive upside if top-of-funnel is scaled.",
        risk: riskScore > 40 ? "Moderate risk due to market consolidation." : "Low immediate threat.",
      }
    },
    marketShare: {
      myCompany: { share: myShare, trend: myTrend as 'up' | 'down' | 'flat' },
      competitors: compShares as { name: string; share: number; trend: 'up' | 'down' | 'flat' }[],
      others: Math.max(0, remainingShare),
      explanation: "Estimated market share is calculated using publicly available competitive signals and should be treated as an analytical estimate rather than exact market data.",
      insights: insightsText,
      confidence: randScore(1, 10, 200) > 3 ? 'High' : 'Medium'
    },
    positioning: {
      myCompany: { presence: randScore(30, 80, 50), innovation: randScore(60, 95, 51) },
      competitors: input.competitors.map((c, i) => ({
        name: c,
        presence: randScore(40, 95, 52 + i),
        innovation: randScore(30, 85, 60 + i)
      })),
      quadrantInsights: {
        leaders: pickN([
          `Dominant forces like ${input.competitors[0] || 'the market leader'} dictating ${industryStr} market trends with massive enterprise footprints.`,
          `High innovation and massive market presence. They are setting the standard for ${industryStr} platforms targeting ${input.targetMarket || 'users'}.`,
          `Established incumbents with deep pockets driving the core expectations of ${input.targetMarket || 'enterprise'} buyers.`
        ], 1, 900)[0],
        challengers: pickN([
          `Heavy reliance on existing customer bases with slower feature velocity in the ${industryStr} space compared to ${myName}.`,
          `High market presence but facing innovation roadblocks. Vulnerable to agile disruptors like ${myName}.`,
          `Strong legacy players that dominate traditional distribution channels but lag in modern tech stack adoption.`
        ], 1, 910)[0],
        visionaries: pickN([
          `Highly innovative but lacking the market presence to threaten ${industryStr} incumbents immediately.`,
          `Startups with disruptive technology pushing boundaries, but fighting for brand awareness against ${input.competitors[0] || 'market leaders'}.`,
          `Niche innovators with cutting-edge AI features, often serving as acquisition targets for Leaders in ${industryStr}.`
        ], 1, 920)[0],
        nichePlayers: pickN([
          `Early-stage entrants or highly specialized tools focusing on specific ${industryStr} sub-segments that ${input.competitors[0] || 'leaders'} ignore.`,
          `Low on both axes. They focus on hyper-specific workflows for ${input.targetMarket || 'niche audiences'} that larger players ignore.`,
          `Regional or deeply specialized vendors offering bespoke solutions rather than broad platforms.`
        ], 1, 930)[0]
      }
    },
    swot: {
      aiConfidence: randScore(85, 99, 200),
      strengths: pickN(possibleStrengths, 3, 400).map((s, i) => ({ text: s, impactScore: randScore(70, 95, 410 + i), priority: i === 0 ? "High" : "Medium" })),
      weaknesses: pickN(possibleWeaknesses, 3, 420).map((w, i) => ({ text: w, impactScore: randScore(60, 90, 430 + i), priority: i === 0 ? "Critical" : "High" })),
      opportunities: pickN(possibleOpportunities, 2, 440).map((o, i) => ({ text: o, impactScore: randScore(75, 98, 450 + i), priority: i === 0 ? "Critical" : "Medium" })),
      threats: pickN(possibleThreats, 2, 460).map((t, i) => ({ text: t, impactScore: randScore(65, 95, 470 + i), priority: i === 0 ? "High" : "Medium" }))
    },
    trends: {
      historical: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => ({
        month: m,
        industry: 100 + i * 5,
        myCompany: 80 + i * 12,
        competitorAvg: 110 + i * 4
      })),
      forecast: ["2026", "2027", "2028"].map((y, i) => ({
        year: y,
        projectedRevenue: randScore(1, 10, 300) * 1000000 * (i + 1.5),
        industryAverage: randScore(2, 8, 301) * 1000000 * (i + 1.2)
      }))
    },
    battleCards: input.competitors.map((c, i) => {
      const isLeader = i === 0;
      return {
        name: c,
        overview: isLeader ? `Established market leader in the ${industryStr} market with a strong focus on enterprise clients.` : `Fast-growing challenger in the ${industryStr} sector focusing on product velocity.`,
        strengths: pickN(possibleStrengths, 3, 500 + i),
        weaknesses: pickN(possibleWeaknesses, 3, 520 + i),
        pricing: isLeader ? "Premium ($999/mo+)" : "Freemium to Mid-Market",
        keyCustomers: pickN(possibleCustomers, 3, 540 + i),
        techStack: pickN(possibleTech, 4, 560 + i),
        marketPosition: isLeader ? "Market Leader" : "Strong Challenger",
        winLossStrategy: {
          howToWin: pickN(["Pitch agility and faster implementation", "Highlight modern, intuitive UX", "Offer flexible, transparent pricing", "Emphasize responsive customer support", "Showcase native integrations"], 3, 580 + i),
          whyWeLose: pickN(["Lack of SOC2 compliance", "Missing legacy integrations", "Brand trust deficit", "Fewer enterprise features", "Smaller community ecosystem"], 3, 600 + i)
        }
      };
    }),
    liveFeed: [
      { id: "1", competitor: input.competitors[0] || "Competitor A", type: "Pricing", content: "Updated enterprise pricing tiers", date: "2 hours ago", impact: "High" },
      { id: "2", competitor: input.competitors[1] || "Competitor B", type: "Launch", content: "Launched new AI-powered analytics module", date: "1 day ago", impact: "High" },
      { id: "3", competitor: input.competitors[0] || "Competitor A", type: "Hiring", content: "Hired new VP of Sales from Salesforce", date: "3 days ago", impact: "Medium" },
      { id: "4", competitor: input.competitors[2] || "Competitor C", type: "News", content: "Mentioned in Gartner Magic Quadrant report", date: "1 week ago", impact: "High" },
    ],
    multiPerspective: {
      ceo: { insights: ["Revenue concentration is healthy"], risks: ["Burn rate might exceed runway if growth stalls"], opportunities: ["M&A of smaller point solutions"] },
      marketing: { insights: ["Social presence needs work"], risks: ["Over-reliance on single acquisition channel"], opportunities: [`Content marketing for 'how-to' queries`] },
      sales: { insights: ["Close rate is above industry average"], risks: ["Lack of battle cards against new competitors"], opportunities: ["Implement automated lead scoring"] },
      customer: { insights: ["Users request more native integrations"], risks: ["Churn spikes around renewal"], opportunities: ["Proactive day-60 check-ins"] },
      investor: { insights: ["LTV:CAC ratio is attractive"], risks: ["CAC is trending slightly upwards"], opportunities: ["Expansion revenue via add-on modules"] }
    },
    comparisonData: {
      features: [
        { category: "AI Automation", myCompany: true, [competitorKeys[0] || "c1"]: false, [competitorKeys[1] || "c2"]: "Partial" },
        { category: "Predictive Analytics", myCompany: true, [competitorKeys[0] || "c1"]: true, [competitorKeys[1] || "c2"]: false },
        { category: "API Access", myCompany: true, [competitorKeys[0] || "c1"]: true, [competitorKeys[1] || "c2"]: false },
      ],
      radarMetrics: [
        { metric: "Features", myCompany: randScore(70, 95, 11), [competitorKeys[0] || "c1"]: 70, [competitorKeys[1] || "c2"]: 50 },
        { metric: "Pricing", myCompany: randScore(75, 95, 12), [competitorKeys[0] || "c1"]: 60, [competitorKeys[1] || "c2"]: 80 },
        { metric: "Innovation", myCompany: randScore(80, 99, 13), [competitorKeys[0] || "c1"]: 50, [competitorKeys[1] || "c2"]: 65 },
        { metric: "UX/UI", myCompany: randScore(75, 95, 14), [competitorKeys[0] || "c1"]: 55, [competitorKeys[1] || "c2"]: 85 },
        { metric: "SEO/Brand", myCompany: seoScore, [competitorKeys[0] || "c1"]: 95, [competitorKeys[1] || "c2"]: 60 },
      ],
      pricing: [
        { tier: "Pro", myCompany: "$149/mo", [competitorKeys[0] || "c1"]: "$299/mo", [competitorKeys[1] || "c2"]: "$199/mo" },
      ],
    },
    marketGaps: {
      missingFeatures: [`Native CRM Integration for ${industryStr}`, "White-label reports"],
      untappedSegments: [`Mid-market ${industryStr} companies (50-200 employees)`],
      pricingOpportunities: ["Introduce a 'Lite' tier"],
      industryTrends: ["Shift towards usage-based pricing"],
      competitorWeaknesses: [`${input.competitors[0] || 'Top competitor'} is bloated and slow`],
    },
    dynamicRecommendations: {
      product: genDynamicRecs("product", 2, 7000),
      marketing: genDynamicRecs("marketing", 2, 7200),
      seo: genDynamicRecs("seo", 2, 7400),
      sales: genDynamicRecs("sales", 2, 7600),
      customerExperience: genDynamicRecs("cx", 2, 7800),
      revenue: genDynamicRecs("revenue", 2, 8000)
    }
  };

  return { results };
};
