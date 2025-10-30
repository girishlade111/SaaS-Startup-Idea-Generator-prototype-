
export interface Idea {
  name: string;
  tagline: string;
  description: string;
  targetMarket: string;
  problemSolved: string;
  keyFeatures: string[];
  techStack: string[];
  revenueModel: string;
  competitiveAdvantage: string;
  usp: string;
  launchStrategy: string;
  difficultyLevel: number;
  estimatedTimeToMvp: number; // in weeks
  marketValidationScore: number;
}

export interface IdeaFormData {
  industry: string;
  audience: string;
  stack: string;
  monetization: string;
  complexity: string;
}
