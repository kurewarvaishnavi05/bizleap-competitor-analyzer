"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketShareChartProps {
  data: {
    myCompany: { share: number; trend: 'up' | 'down' | 'flat' };
    competitors: { name: string; share: number; trend: 'up' | 'down' | 'flat' }[];
    others: number;
    explanation: string;
    insights: string;
    confidence: 'High' | 'Medium' | 'Low';
  };
  myCompanyName: string;
}

export function MarketShareChart({ data, myCompanyName }: MarketShareChartProps) {
  // Combine and sort data
  const combinedData = [
    { name: myCompanyName, share: data.myCompany.share, trend: data.myCompany.trend, isMe: true },
    ...data.competitors.map(c => ({ ...c, isMe: false })),
    { name: "Others", share: data.others, trend: 'flat', isMe: false }
  ].filter(d => d.share > 0)
   .sort((a, b) => b.share - a.share);

  const competitorPalette = ["#14b8a6", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4", "#a8a29e"];
  
  const getCompetitorColor = (index: number) => {
    return competitorPalette[index % competitorPalette.length];
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <ArrowDownRight className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const confidenceColors = {
    High: "text-green-400 border-green-500/20 bg-green-500/10",
    Medium: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
    Low: "text-red-400 border-red-500/20 bg-red-500/10"
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* Chart and Table container */}
      <div className="grid md:grid-cols-2 gap-8 mb-6 flex-1">
        
        {/* Table View */}
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20 shadow-inner">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-5 py-4 font-semibold tracking-wider">Company</th>
                  <th className="px-5 py-4 font-semibold tracking-wider">Share</th>
                  <th className="px-5 py-4 font-semibold tracking-wider text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {combinedData.map((row, idx) => (
                  <tr key={idx} className={cn(
                    "border-b border-white/5 last:border-0 transition-colors hover:bg-white/5",
                    row.isMe ? "bg-brand-500/10 hover:bg-brand-500/20" : "bg-transparent"
                  )}>
                    <td className="px-5 py-3 font-medium flex items-center gap-3 max-w-[220px]">
                      {row.isMe ? (
                        <div className="w-3 h-3 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse shrink-0" />
                      ) : (
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: getCompetitorColor(idx) }} />
                      )}
                      <span className={cn(
                        "truncate",
                        row.isMe ? "text-brand-100 font-bold" : "text-foreground/80"
                      )} title={row.name}>
                        {row.name.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-foreground">{row.share}%</td>
                    <td className="px-5 py-3 flex justify-center">{getTrendIcon(row.trend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart View */}
        <div className="order-1 md:order-2 h-[280px] md:h-auto min-h-[280px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="pieBrand" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                  <stop offset="100%" stopColor="#4338ca" stopOpacity={1} />
                </linearGradient>
              </defs>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(10,10,10,0.95)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                formatter={(value: number) => [`${value}%`, 'Market Share']}
              />
              <Pie
                data={combinedData}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={5}
                dataKey="share"
                stroke="rgba(0,0,0,0.5)"
                strokeWidth={3}
                cornerRadius={4}
              >
                {combinedData.map((entry, index) => {
                  if (entry.isMe) return <Cell key={`cell-${index}`} fill="url(#pieBrand)" className="drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]" />;
                  
                  return <Cell key={`cell-${index}`} fill={getCompetitorColor(index)} opacity={0.85} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Donut Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-foreground drop-shadow-md">
              {data.myCompany.share}%
            </span>
            <span className="text-xs text-brand-300 font-medium uppercase tracking-wider">
              Your Share
            </span>
          </div>
        </div>

      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-br from-brand-900/20 to-black/60 border border-brand-500/20 rounded-xl p-6 mt-auto shadow-[0_0_20px_rgba(99,102,241,0.05)]">
        <h4 className="text-sm font-semibold text-brand-400 mb-3 uppercase tracking-wider flex items-center gap-2">
          <span className="p-1 rounded bg-brand-500/20"><AlertCircle className="w-4 h-4 text-brand-300" /></span>
          Strategic Insights
        </h4>
        <p className="text-foreground/90 text-[15px] leading-relaxed border-l-2 border-brand-500/40 pl-4 ml-1">
          {data.insights}
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-6 border-t border-white/10 w-full pb-1">
        <div className={cn("shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold border whitespace-nowrap", confidenceColors[data.confidence])}>
          {data.confidence} Confidence
        </div>
        <div className="flex items-start gap-2.5 text-[13px] text-muted-foreground bg-white/[0.03] p-3.5 rounded-lg w-full lg:max-w-xl border border-white/5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-white/40" />
          <p className="leading-relaxed">
            {data.explanation}
          </p>
        </div>
      </div>

    </div>
  );
}
