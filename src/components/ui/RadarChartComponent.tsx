"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { AnimatedCard } from "./AnimatedCard";

interface RadarChartComponentProps {
  data: any[];
  myCompanyName?: string;
  competitors?: string[];
}

export function RadarChartComponent({ 
  data, 
  myCompanyName = "My Company", 
  competitors = ["Competitor 1"] 
}: RadarChartComponentProps) {
  
  const colors = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"];

  return (
    <AnimatedCard className="h-[400px] w-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            
            <Radar
              name={myCompanyName}
              dataKey="myCompany"
              stroke={colors[0]}
              fill={colors[0]}
              fillOpacity={0.4}
            />
            
            {competitors.map((comp, idx) => (
              <Radar
                key={comp}
                name={comp}
                dataKey={`competitor${idx + 1}`}
                stroke={colors[(idx + 1) % colors.length]}
                fill={colors[(idx + 1) % colors.length]}
                fillOpacity={0.2}
              />
            ))}
            
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(17,17,17,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </AnimatedCard>
  );
}
