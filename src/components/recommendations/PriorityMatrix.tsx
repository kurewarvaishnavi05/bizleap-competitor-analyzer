"use client";

import React from 'react';
import { Recommendation } from './types';
import { motion } from 'framer-motion';
import { Zap, Rocket, Clock, ShieldAlert } from 'lucide-react';

interface PriorityMatrixProps {
  recommendations: Recommendation[];
}

export const PriorityMatrix: React.FC<PriorityMatrixProps> = ({ recommendations }) => {
  const quickWins = recommendations.filter(r => r.priority === 'High' && (r.difficulty === 'Easy' || r.difficulty === 'Medium'));
  const highImpact = recommendations.filter(r => r.priority === 'High' && r.difficulty === 'Hard');
  const longTerm = recommendations.filter(r => r.priority !== 'High' && r.difficulty === 'Hard');
  const competitiveThreats = recommendations.filter(r => r.priority !== 'High' && r.difficulty !== 'Hard');

  const quadrants = [
    {
      title: 'Quick Wins',
      icon: Zap,
      items: quickWins,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/5',
      border: 'border-emerald-400/20'
    },
    {
      title: 'High Impact Projects',
      icon: Rocket,
      items: highImpact,
      color: 'text-blue-400',
      bg: 'bg-blue-400/5',
      border: 'border-blue-400/20'
    },
    {
      title: 'Long-Term Opportunities',
      icon: Clock,
      items: longTerm,
      color: 'text-amber-400',
      bg: 'bg-amber-400/5',
      border: 'border-amber-400/20'
    },
    {
      title: 'Competitive Threats',
      icon: ShieldAlert,
      items: competitiveThreats,
      color: 'text-rose-400',
      bg: 'bg-rose-400/5',
      border: 'border-rose-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quadrants.map((quadrant, index) => {
        const Icon = quadrant.icon;
        return (
          <motion.div
            key={quadrant.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-2xl border ${quadrant.border} ${quadrant.bg} backdrop-blur-sm`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-black/20 ${quadrant.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{quadrant.title}</h3>
            </div>
            
            <ul className="space-y-3">
              {quadrant.items.length > 0 ? (
                quadrant.items.map(item => (
                  <li key={item.id} className="text-sm text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5 flex flex-col gap-1">
                    <span className="font-medium text-white">{item.title}</span>
                    <span className="text-xs text-gray-500">{item.category} • {item.growthPotentialPercent}% Growth Potential</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic p-3">No recommendations in this category.</li>
              )}
            </ul>
          </motion.div>
        );
      })}
    </div>
  );
};
