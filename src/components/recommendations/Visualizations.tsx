"use client";

import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { Recommendation } from './types';
import { motion } from 'framer-motion';

interface VisualizationsProps {
  recommendations: Recommendation[];
}

export const Visualizations: React.FC<VisualizationsProps> = ({ recommendations }) => {
  // Mock data for Radar chart
  const radarData = [
    { subject: 'Product', A: 80, B: 95, fullMark: 100 },
    { subject: 'Marketing', A: 65, B: 80, fullMark: 100 },
    { subject: 'SEO', A: 45, B: 90, fullMark: 100 },
    { subject: 'Pricing', A: 85, B: 75, fullMark: 100 },
    { subject: 'Customer Exp', A: 90, B: 70, fullMark: 100 },
    { subject: 'Sales', A: 75, B: 85, fullMark: 100 },
  ];

  // Data for Growth Potential Bar Chart
  const barData = recommendations.map(rec => ({
    name: rec.title.substring(0, 15) + '...',
    fullTitle: rec.title,
    Growth: rec.growthPotentialPercent,
    category: rec.category
  }));

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Competitor Comparison Radar</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
              <Radar name="Your Company" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
              <Radar name="Top Competitor" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Growth Potential by Recommendation</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#374151', opacity: 0.4 }}
                contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
                formatter={(value: any) => [`${value}%`, 'Growth Potential']}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.fullTitle;
                  }
                  return label;
                }}
              />
              <Bar dataKey="Growth" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
