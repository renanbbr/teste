import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FunnelStep } from "@/lib/analyticsService";

interface ConversionFunnelProps {
  data: FunnelStep[];
}

export const ConversionFunnel = ({ data }: ConversionFunnelProps) => {
  const maxValue = data[0]?.value || 1;

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Funil de Conversão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((step, index) => {
            const width = (step.value / maxValue) * 100;
            const colors = [
              'bg-primary',
              'bg-blue-500',
              'bg-purple-500',
              'bg-pink-500',
              'bg-orange-500',
              'bg-green-500'
            ];
            
            return (
              <div key={step.name} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-foreground font-medium">{step.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {step.value.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      ({step.percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <div className="h-10 bg-secondary rounded-lg overflow-hidden">
                  <div
                    className={`h-full ${colors[index % colors.length]} transition-all duration-500 flex items-center justify-end px-4`}
                    style={{ width: `${width}%` }}
                  >
                    {width > 20 && (
                      <span className="text-white font-semibold text-sm">
                        {step.percentage.toFixed(1)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
