import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CTAStats } from "@/lib/analyticsService";

interface TopCTAsProps {
  data: CTAStats[];
}

export const TopCTAs = ({ data }: TopCTAsProps) => {
  if (data.length === 0) {
    return (
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Top CTAs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">Nenhum dado disponível ainda.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Top CTAs Mais Clicados</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Botão</TableHead>
              <TableHead className="text-muted-foreground">Localização</TableHead>
              <TableHead className="text-muted-foreground text-right">Cliques</TableHead>
              <TableHead className="text-muted-foreground text-right">Taxa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cta, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-foreground">{cta.text}</TableCell>
                <TableCell className="text-muted-foreground text-sm capitalize">
                  {cta.location.replace(/_/g, ' ')}
                </TableCell>
                <TableCell className="text-right text-foreground">{cta.clicks}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    {cta.percentage.toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
