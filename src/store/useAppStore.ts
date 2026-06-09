import { create } from 'zustand';
import { AnalysisInput, AnalysisResults } from '@/types/analysis';

interface AppState {
  analysisInput: AnalysisInput | null;
  analysisResults: AnalysisResults | null;
  executionPlan: any | null;
  isAnalyzing: boolean;
  analysisStep: string;
  setAnalysisInput: (input: AnalysisInput) => void;
  runAnalysis: (input: AnalysisInput) => Promise<void>;
  resetStore: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  analysisInput: null,
  analysisResults: null,
  executionPlan: null,
  isAnalyzing: false,
  analysisStep: '',

  setAnalysisInput: (input) => set({ analysisInput: input }),

  runAnalysis: async (input) => {
    set({ 
      isAnalyzing: true, 
      analysisStep: 'Gathering company data...',
      analysisInput: input 
    });
    
    // Step 2: Call the real Gemini API
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate analysis');
    }

    const { results } = await response.json();
    
    set({ analysisStep: 'Formatting execution plan...' });
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    set({ 
      analysisResults: results,
      executionPlan: null,
      isAnalyzing: false,
      analysisStep: 'Complete'
    });
  },

  resetStore: () => set({
    analysisInput: null,
    analysisResults: null,
    executionPlan: null,
    isAnalyzing: false,
    analysisStep: '',
  })
}));
