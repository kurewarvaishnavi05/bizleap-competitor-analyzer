import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

const sentimentData = [
  { name: "Positive", value: 65, color: "#10b981" },
  { name: "Neutral", value: 20, color: "#6b7280" },
  { name: "Negative", value: 15, color: "#ef4444" },
];

export function CustomerSentiment() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h3 className="text-2xl font-semibold">Customer Sentiment Analysis</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card/30 border border-white/5 p-6 rounded-xl">
          <h4 className="text-center text-sm font-medium text-muted-foreground mb-4">Overall Brand Sentiment (Aggregated)</h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 font-semibold text-green-500 mb-2">
              <ThumbsUp className="h-4 w-4" /> Common Praises
            </h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>"Customer support is incredibly fast and helpful."</li>
              <li>"The UI is much cleaner than Competitor A."</li>
              <li>"The AI features save our team hours every week."</li>
            </ul>
          </div>
          
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
            <h4 className="flex items-center gap-2 font-semibold text-red-500 mb-2">
              <ThumbsDown className="h-4 w-4" /> Common Complaints
            </h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>"Missing native Salesforce integration out of the box."</li>
              <li>"Pricing jumps too quickly from Starter to Pro."</li>
              <li>"Mobile app is sometimes laggy when loading heavy charts."</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
