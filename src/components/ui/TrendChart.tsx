"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface TrendChartProps {
  data: any[];
  xAxisKey: string;
  lines: { key: string; name: string; color: string }[];
  isForecast?: boolean;
}

export function TrendChart({ data, xAxisKey, lines, isForecast = false }: TrendChartProps) {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {lines.map((line) => (
              <linearGradient key={`color-${line.key}`} id={`color-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={line.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
            tickMargin={10}
            axisLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.4)" 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} 
            tickFormatter={(val) => isForecast ? `$${(val/1000000).toFixed(0)}M` : val}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(10,10,10,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: any) => isForecast ? [`$${(value/1000000).toFixed(1)}M`, "Revenue"] : [value, "Metric"]}
          />
          <Legend verticalAlign="top" height={36} />
          
          {lines.map((line) => (
            <Area 
              key={line.key}
              type="monotone" 
              dataKey={line.key} 
              name={line.name} 
              stroke={line.color} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#color-${line.key})`} 
              strokeDasharray={isForecast ? "5 5" : "0"}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
