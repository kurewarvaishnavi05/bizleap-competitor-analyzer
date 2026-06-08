export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';
export type Category = 'Product' | 'Marketing' | 'SEO' | 'Pricing' | 'Customer Experience' | 'Sales';

export interface Recommendation {
  id: string;
  title: string;
  explanation: string;
  businessImpact: string;
  difficulty: DifficultyLevel;
  priority: PriorityLevel;
  growthPotentialPercent: number;
  actionSteps: string[];
  category: Category;
}

export interface RecommendationScores {
  overallImprovement: number;
  growthOpportunity: number;
  competitiveAdvantage: number;
  innovation: number;
  riskAssessment: number;
}
