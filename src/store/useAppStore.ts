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
    
    let retries = 5;
    let delay = 3000; // start with 3 seconds

    while (retries > 0) {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input)
        });

        if (!response.ok) {
          const textError = await response.text().catch(() => '');
          if (textError.includes('503') || textError.includes('high demand') || response.status === 503) {
            throw new Error('Google servers are currently overloaded (503).');
          }
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
        let cleanText = fullText.replace(/```json/gi, '').replace(/```/g, '').trim();
        
        let results;
        let parsed = false;

        // Try to parse. If it fails, strip everything after the last '}' and try again.
        // Keep doing this to bypass citations that have '{' '}' in them.
        while (cleanText.length > 10) {
          try {
            const firstBrace = cleanText.indexOf('{');
            const lastBrace = cleanText.lastIndexOf('}');
            
            if (firstBrace === -1 || lastBrace === -1) break;
            
            let attempt = cleanText.substring(firstBrace, lastBrace + 1);
            
            // Fix common AI JSON hallucinations
            attempt = attempt.replace(/\"\s*\.\s*\]/g, '"]');
            attempt = attempt.replace(/,\s*\]/g, ']');
            attempt = attempt.replace(/,\s*\}/g, '}');
            
            results = JSON.parse(attempt);
            parsed = true;
            break; // Success!
          } catch (e) {
            // Parsing failed. The lastBrace might be a stray brace from a citation.
            // Remove the last brace and any trailing text, then try again.
            const lastBrace = cleanText.lastIndexOf('}');
            if (lastBrace <= 0) break;
            cleanText = cleanText.substring(0, lastBrace - 1);
          }
        }

        if (!parsed) {
          if (fullText.includes('503') || fullText.includes('high demand')) {
            throw new Error('Google servers are currently overloaded (503).');
          }
          console.error("Malformed AI Data:", fullText);
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
        
        return; // Success, exit the retry loop

      } catch (error: any) {
        const isRetriable = error.message.includes('503') || error.message.includes('network error') || error.message.includes('overloaded');
        if (isRetriable && retries > 1) {
          retries--;
          set({ analysisStep: `Google servers are busy. Retrying automatically in ${delay/1000}s... (${retries} attempts left)` });
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay += 2000; // Exponential backoff
        } else {
          console.error(error);
          set({ 
            isAnalyzing: false, 
            analysisStep: 'Error: ' + error.message 
          });
          alert('Analysis failed: ' + error.message);
          return; // Exit on hard errors
        }
      }
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
