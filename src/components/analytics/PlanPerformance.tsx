import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlanStats } from "@/lib/analyticsService";

interface PlanPerformanceProps {
  data: PlanStats[];
}

export const PlanPerformance = ({ data }: PlanPerformanceProps) => {
  if (data.length === 0) {
    return (
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Performance de Planos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Nenhum checkout registrado ainda.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.map(plan => ({
    name: plan.name,
    value: plan.clicks
  }));

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Performance de Planos</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Legend 
              wrapperStyle={{ color: 'hsl(var(--foreground))' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((plan, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: plan.color }}
                />
                <span className="text-foreground font-medium">{plan.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{plan.clicks} clicks</span>
                <span className="text-foreground font-semibold">
                  {plan.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
