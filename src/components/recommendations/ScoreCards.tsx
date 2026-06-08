"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RecommendationScores } from './types';
import { TrendingUp, Target, Zap, Lightbulb, ShieldAlert } from 'lucide-react';

interface ScoreCardsProps {
  scores: RecommendationScores;
}

const ScoreCard = ({ title, score, icon: Icon, color }: { title: string, score: number, icon: any, color: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl"
    >
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20 blur-2xl ${color}`} />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className={`p-2 rounded-lg bg-white/5 ${color.replace('bg-', 'text-')}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold tracking-tight text-white">{score}</span>
        <span className="text-sm font-medium text-gray-500 mb-1">/ 100</span>
      </div>
      
      <div className="mt-4 h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
};

export const ScoreCards: React.FC<ScoreCardsProps> = ({ scores }) => {
  const cards = [
    { title: 'Overall Improvement', score: scores.overallImprovement, icon: TrendingUp, color: 'bg-emerald-500' },
    { title: 'Growth Opportunity', score: scores.growthOpportunity, icon: Target, color: 'bg-blue-500' },
    { title: 'Competitive Advantage', score: scores.competitiveAdvantage, icon: Zap, color: 'bg-purple-500' },
    { title: 'Innovation Score', score: scores.innovation, icon: Lightbulb, color: 'bg-amber-500' },
    { title: 'Risk Assessment', score: scores.riskAssessment, icon: ShieldAlert, color: 'bg-rose-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, index) => (
        <ScoreCard key={index} {...card} />
      ))}
    </div>
  );
};
