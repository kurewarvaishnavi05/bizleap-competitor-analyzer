import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

const data = [
  { name: "Your Company", price: 50, value: 85, fill: "#4f46e5" },
  { name: "Competitor A", price: 80, value: 75, fill: "#10b981" },
  { name: "Competitor B", price: 30, value: 40, fill: "#f59e0b" },
  { name: "Competitor C", price: 90, value: 95, fill: "#ef4444" },
];

export function PositioningMap() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-semibold mb-2">Competitor Positioning Map</h3>
      <p className="text-muted-foreground mb-8">
        Visualizing market placement based on perceived value versus price point.
      </p>

      <div className="h-[400px] w-full bg-card/20 rounded-xl p-4 border border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              type="number" 
              dataKey="price" 
              name="Price Level" 
              unit="%" 
              stroke="#888" 
              domain={[0, 100]} 
              label={{ value: 'Price Level', position: 'insideBottomRight', offset: -10, fill: '#888' }}
            />
            <YAxis 
              type="number" 
              dataKey="value" 
              name="Perceived Value" 
              unit="%" 
              stroke="#888" 
              domain={[0, 100]}
              label={{ value: 'Perceived Value', angle: -90, position: 'insideLeft', fill: '#888' }}
            />
            <ZAxis type="number" range={[400, 400]} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
              formatter={(value, name, props) => {
                return [value + '%', name];
              }}
            />
            {data.map((entry, index) => (
              <Scatter 
                key={index} 
                name={entry.name} 
                data={[entry]} 
                fill={entry.fill} 
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-center text-muted-foreground flex justify-center gap-6">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.fill }}></div>
            <span>{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
