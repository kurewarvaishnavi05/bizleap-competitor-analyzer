import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const seoData = [
  {
    name: "Organic Traffic",
    "Your Company": 45000,
    "Competitor A": 82000,
    "Competitor B": 31000,
  },
  {
    name: "Domain Authority",
    "Your Company": 54,
    "Competitor A": 68,
    "Competitor B": 49,
  },
  {
    name: "Backlinks (k)",
    "Your Company": 12,
    "Competitor A": 45,
    "Competitor B": 8,
  },
];

export function SeoIntelligence() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-semibold mb-6">SEO Intelligence</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-[300px] w-full">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Traffic & Authority Comparison</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={seoData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="Your Company" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Competitor A" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Competitor B" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">Top Shared Keywords</h4>
          <div className="space-y-3">
            {["AI Marketing", "Competitor Analysis", "SaaS Dashboard"].map((kw, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-white/5">
                <span className="font-medium">{kw}</span>
                <span className="text-sm text-primary">High Volume</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
