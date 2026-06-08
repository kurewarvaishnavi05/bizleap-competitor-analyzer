import { Recommendation, RecommendationScores } from './types';

export const MOCK_SCORES: RecommendationScores = {
  overallImprovement: 78,
  growthOpportunity: 85,
  competitiveAdvantage: 62,
  innovation: 45,
  riskAssessment: 30, // Lower is better or higher is safer? Let's assume higher score = better health/lower risk
};

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Implement AI-Driven Analytics Feature',
    explanation: 'Competitors A and B offer built-in AI analytics for their users. Adding this feature will close a critical product gap and cater to enterprise clients.',
    businessImpact: 'High potential to increase enterprise tier adoption and reduce churn.',
    difficulty: 'Hard',
    priority: 'High',
    growthPotentialPercent: 15,
    actionSteps: [
      'Define scope of AI analytics MVP',
      'Integrate with OpenAI or similar LLM provider',
      'Beta test with top 5 enterprise customers',
    ],
    category: 'Product',
  },
  {
    id: 'rec-2',
    title: 'Launch a Comprehensive Content Strategy',
    explanation: 'Your SEO visibility is lagging behind Competitor C. A focused blog strategy targeting "competitor analysis tools" and "market research software" will capture missed organic traffic.',
    businessImpact: 'Increase organic lead generation and brand authority.',
    difficulty: 'Medium',
    priority: 'Medium',
    growthPotentialPercent: 8,
    actionSteps: [
      'Perform keyword gap analysis',
      'Publish 2 high-quality articles per week',
      'Implement a backlink outreach campaign',
    ],
    category: 'SEO',
  },
  {
    id: 'rec-3',
    title: 'Introduce Freemium Subscription Tier',
    explanation: 'Market trends show high adoption rates for freemium models. Competitor A recently introduced a free tier, significantly boosting their user acquisition.',
    businessImpact: 'Rapidly expand top-of-funnel user base and create an upsell pipeline.',
    difficulty: 'Medium',
    priority: 'High',
    growthPotentialPercent: 22,
    actionSteps: [
      'Determine feature limits for the free tier',
      'Adjust pricing page and billing infrastructure',
      'Launch promotional campaign for the new tier',
    ],
    category: 'Pricing',
  },
  {
    id: 'rec-4',
    title: 'Enhance Onboarding UX Flow',
    explanation: 'Customer reviews indicate a steep learning curve. Simplifying the initial onboarding and adding tooltips can improve 30-day retention.',
    businessImpact: 'Improve activation rate and reduce early drop-offs.',
    difficulty: 'Easy',
    priority: 'High',
    growthPotentialPercent: 5,
    actionSteps: [
      'Map current user journey bottlenecks',
      'Design and implement interactive product tour',
      'A/B test new onboarding against the old one',
    ],
    category: 'Customer Experience',
  },
];

export const EXECUTIVE_SUMMARY_MOCK = "Based on competitor analysis, your company is strong in customer engagement but lags behind competitors in feature innovation and SEO visibility. Implementing the recommended product enhancements and content strategy could significantly improve market positioning and lead generation.";
