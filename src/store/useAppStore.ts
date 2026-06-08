import { create } from 'zustand';
import { AnalysisInput, AnalysisResults, ExecutionPlan, generateMockAnalysis } from '@/lib/mockAiService';

interface AppState {
  analysisInput: AnalysisInput | null;
  analysisResults: AnalysisResults | null;
  executionPlan: ExecutionPlan | null;
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
    
    // Step 1: Simulate gathering data
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ analysisStep: 'Analyzing competitors...' });
    
    // Step 2: Simulate deep analysis (using our mock service which takes time)
    const { results, plan } = await generateMockAnalysis(input);
    
    set({ analysisStep: 'Generating execution plan...' });
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    set({ 
      analysisResults: results,
      executionPlan: plan,
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
