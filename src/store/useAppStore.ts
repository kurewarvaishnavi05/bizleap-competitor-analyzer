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
    
    try {
      // Step 2: Call the real Gemini API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (!response.ok) {
        const textError = await response.text().catch(() => '');
        throw new Error(textError || 'Failed to generate analysis. The API might have timed out.');
      }

      set({ analysisStep: 'Analyzing live market data (this might take 10-20 seconds)...' });

      // Read the stream
      const reader = response.body?.getReader();
      if (!reader) throw new Error("Failed to read stream from server.");
      
      const decoder = new TextDecoder();
      let fullText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }
      
      set({ analysisStep: 'Formatting execution plan...' });
      
      // Strip markdown JSON blocks if the AI includes them
      fullText = fullText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
      
      let results;
      try {
        results = JSON.parse(fullText);
      } catch (e) {
        throw new Error("Received malformed data from AI. Please try again.");
      }
      
      set({ analysisStep: 'Formatting execution plan...' });
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set({ 
        analysisResults: results,
        executionPlan: null,
        isAnalyzing: false,
        analysisStep: 'Complete'
      });
    } catch (error: any) {
      console.error(error);
      set({ 
        isAnalyzing: false, 
        analysisStep: 'Error: ' + error.message 
      });
      alert('Analysis failed: ' + error.message);
    }
  },

  resetStore: () => set({
    analysisInput: null,
    analysisResults: null,
    executionPlan: null,
    isAnalyzing: false,
    analysisStep: '',
  })
}));
