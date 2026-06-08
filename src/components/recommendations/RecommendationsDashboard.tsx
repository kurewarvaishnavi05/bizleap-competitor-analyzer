"use client";

import React, { useState } from 'react';
import { ScoreCards } from './ScoreCards';
import { RecommendationCards } from './RecommendationCards';
import { PriorityMatrix } from './PriorityMatrix';
import { ExecutiveSummary } from './ExecutiveSummary';
import { Visualizations } from './Visualizations';
import { ExportActions } from './ExportActions';
import { MOCK_RECOMMENDATIONS, MOCK_SCORES, EXECUTIVE_SUMMARY_MOCK } from './mockData';
import { motion } from 'framer-motion';
import { Bot, RefreshCcw } from 'lucide-react';

export const RecommendationsDashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // In a real app, this would call the AI API
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setDataLoaded(true);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans p-6 md:p-8 lg:p-12 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
              AI-Powered Growth Recommendations
            </h1>
            <p className="text-gray-400 text-lg">
              Data-driven strategies to improve your market position and outperform competitors.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {dataLoaded && (
              <ExportActions 
                recommendations={MOCK_RECOMMENDATIONS} 
                scores={MOCK_SCORES} 
                summary={EXECUTIVE_SUMMARY_MOCK} 
              />
            )}
            {!dataLoaded && (
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-70"
              >
                {isGenerating ? (
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
                {isGenerating ? 'Analyzing Market...' : 'Generate AI Recommendations'}
              </button>
            )}
          </div>
        </header>

        {/* Content Section */}
        {dataLoaded ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <section>
              <ExecutiveSummary summary={EXECUTIVE_SUMMARY_MOCK} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Business Health Overview
              </h2>
              <ScoreCards scores={MOCK_SCORES} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Strategic Visualizations</h2>
              <Visualizations recommendations={MOCK_RECOMMENDATIONS} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Actionable Growth Strategies</h2>
              <RecommendationCards recommendations={MOCK_RECOMMENDATIONS} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Recommendation Priority Matrix</h2>
              <PriorityMatrix recommendations={MOCK_RECOMMENDATIONS} />
            </section>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
            <div className="bg-indigo-500/10 p-4 rounded-full mb-6">
              <Bot className="w-12 h-12 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Ready to discover your growth potential?</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Our AI engine analyzes your competitor data to provide specific, practical recommendations on product features, SEO, pricing, and marketing.
            </p>
            {isGenerating && (
              <div className="flex items-center gap-3 text-indigo-400">
                <RefreshCcw className="w-5 h-5 animate-spin" />
                <span>Running deep competitor analysis...</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default RecommendationsDashboard;
