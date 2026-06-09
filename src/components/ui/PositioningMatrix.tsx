"use client";

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ZAxis } from "recharts";

interface PositioningMatrixProps {
  data: {
    myCompany: { presence: number; innovation: number };
    competitors: { name: string; presence: number; innovation: number }[];
  };
  myCompanyName: string;
}

export function PositioningMatrix({ data, myCompanyName }: PositioningMatrixProps) {
  const chartData = [
    { name: myCompanyName, presence: data.myCompany.presence, innovation: data.myCompany.innovation, type: "myCompany" },
    ...data.competitors.map(c => ({ name: c.name, presence: c.presence, innovation: c.innovation, type: "competitor" }))
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 border border-white/10 p-3 rounded-lg shadow-xl">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <p className="text-sm text-muted-foreground">Market Presence: <span className="text-white">{data.presence}</span></p>
          <p className="text-sm text-muted-foreground">Innovation: <span className="text-white">{data.innovation}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[400px] relative">
      {/* Quadrant Labels */}
      <div className="absolute top-4 left-4 text-xs font-semibold text-muted-foreground/50 tracking-wider">CHALLENGERS</div>
      <div className="absolute top-4 right-4 text-xs font-semibold text-brand-500/50 tracking-wider">LEADERS</div>
      <div className="absolute bottom-12 left-4 text-xs font-semibold text-muted-foreground/50 tracking-wider">NICHE PLAYERS</div>
      <div className="absolute bottom-12 right-4 text-xs font-semibold text-muted-foreground/50 tracking-wider">VISIONARIES</div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis type="number" dataKey="presence" name="Market Presence" domain={[0, 100]} tick={false} axisLine={{ stroke: 'rgba(255,255,255,0.2)' }} />
          <YAxis type="number" dataKey="innovation" name="Innovation" domain={[0, 100]} tick={false} axisLine={{ stroke: 'rgba(255,255,255,0.2)' }} />
          <ZAxis type="category" dataKey="name" name="Company" />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          
          <ReferenceLine x={50} stroke="rgba(255,255,255,0.2)" />
          <ReferenceLine y={50} stroke="rgba(255,255,255,0.2)" />

          <Scatter 
            name="Competitors" 
            data={chartData.filter(d => d.type === "competitor")} 
            fill="#8b5cf6" 
            shape="circle" 
            r={12} 
            fillOpacity={0.6}
          />
          <Scatter 
            name={myCompanyName} 
            data={chartData.filter(d => d.type === "myCompany")} 
            fill="#6366f1" 
            shape="star" 
            r={16} 
            fillOpacity={1}
          />
        </ScatterChart>
      </ResponsiveContainer>
      
      {/* Axis Labels */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Market Presence →</div>
      <div className="absolute top-1/2 left-2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">Innovation →</div>
    </div>
  );
}
