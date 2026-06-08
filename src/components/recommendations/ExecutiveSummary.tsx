"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';

interface ExecutiveSummaryProps {
  summary: string;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-900/40 to-black/40 p-8 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Quote className="w-32 h-32 text-indigo-400" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">AI Executive Summary</h2>
        </div>
        
        <div className="pl-4 border-l-4 border-indigo-500 mt-6">
          <p className="text-xl leading-relaxed text-indigo-100 font-medium italic">
            "{summary}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};
