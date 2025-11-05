import { useRealtimeMetrics } from "@/hooks/useRealtimeMetrics";
import { MetricCard } from "@/components/analytics/MetricCard";
import { EventsChart } from "@/components/analytics/EventsChart";
import { ConversionFunnel } from "@/components/analytics/ConversionFunnel";
import { TopCTAs } from "@/components/analytics/TopCTAs";
import { PlanPerformance } from "@/components/analytics/PlanPerformance";
import { Eye, MousePointerClick, MessageCircle, ShoppingCart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

const Analytics = () => {
  const { metrics, topCTAs, eventsByHour, funnelData, planStats, lastUpdate, isLoading, refresh } = useRealtimeMetrics();

  const formatLastUpdate = () => {
    return formatDistance(lastUpdate, Date.now(), { 
      addSuffix: true,
      locale: ptBR 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Métricas em tempo real • SealClub
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Última atualização: {formatLastUpdate()}
              </span>
              <Button 
                onClick={refresh}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Visualizações"
            value={metrics.totalViews.toLocaleString()}
            icon={Eye}
            trend="neutral"
          />
          <MetricCard
            title="Cliques em CTAs"
            value={metrics.ctaClicks.toLocaleString()}
            icon={MousePointerClick}
            trend="neutral"
          />
          <MetricCard
            title="Cliques no WhatsApp"
            value={metrics.whatsappClicks.toLocaleString()}
            icon={MessageCircle}
            trend="neutral"
          />
          <MetricCard
            title="Taxa de Conversão"
            value={`${metrics.conversionRate.toFixed(2)}%`}
            icon={ShoppingCart}
            trend={metrics.conversionRate > 5 ? 'up' : metrics.conversionRate > 2 ? 'neutral' : 'down'}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EventsChart data={eventsByHour} />
          <PlanPerformance data={planStats} />
        </div>

        {/* Funnel and CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ConversionFunnel data={funnelData} />
          <TopCTAs data={topCTAs} />
        </div>

        {/* Info Footer */}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Os dados são coletados do dataLayer e armazenados localmente no navegador. 
            Atualização automática a cada 10 segundos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
