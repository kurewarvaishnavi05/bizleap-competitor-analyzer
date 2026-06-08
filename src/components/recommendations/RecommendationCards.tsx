"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Recommendation } from './types';
import { CheckCircle2, TrendingUp, AlertTriangle, Info, ArrowRight } from 'lucide-react';

interface RecommendationCardsProps {
  recommendations: Recommendation[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
    case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

const Card = ({ rec, index }: { rec: Recommendation, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md hover:bg-white/10 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 mb-3">
            {rec.category}
          </span>
          <h3 className="text-xl font-semibold text-white leading-tight mb-2">{rec.title}</h3>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-bold text-sm">+{rec.growthPotentialPercent}% Growth</span>
        </div>
      </div>

      <p className="text-gray-400 text-sm mb-6 flex-grow">{rec.explanation}</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/20 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs uppercase tracking-wider">
            <AlertTriangle className="w-3 h-3" /> Priority
          </div>
          <span className={`inline-block px-2 py-0.5 rounded text-sm font-medium border ${getPriorityColor(rec.priority)}`}>
            {rec.priority}
          </span>
        </div>
        <div className="bg-black/20 rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-1 text-gray-500 text-xs uppercase tracking-wider">
            <Info className="w-3 h-3" /> Difficulty
          </div>
          <span className={`inline-block px-2 py-0.5 rounded text-sm font-medium border ${getDifficultyColor(rec.difficulty)}`}>
            {rec.difficulty}
          </span>
        </div>
      </div>

      <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-medium text-blue-300 mb-2">Business Impact</h4>
        <p className="text-gray-300 text-sm">{rec.businessImpact}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
          Action Steps <ArrowRight className="w-4 h-4 text-gray-500" />
        </h4>
        <ul className="space-y-2">
          {rec.actionSteps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const RecommendationCards: React.FC<RecommendationCardsProps> = ({ recommendations }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {recommendations.map((rec, index) => (
        <Card key={rec.id} rec={rec} index={index} />
      ))}
    </div>
  );
};
