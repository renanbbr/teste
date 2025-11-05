import { useState, useEffect } from 'react';
import { analyticsService, type Metrics, type CTAStats, type ChartData, type FunnelStep, type PlanStats } from '@/lib/analyticsService';

export interface RealtimeMetrics {
  metrics: Metrics;
  topCTAs: CTAStats[];
  eventsByHour: ChartData[];
  funnelData: FunnelStep[];
  planStats: PlanStats[];
  lastUpdate: number;
}

export const useRealtimeMetrics = (refreshInterval = 10000) => {
  const [data, setData] = useState<RealtimeMetrics>({
    metrics: {
      totalViews: 0,
      ctaClicks: 0,
      whatsappClicks: 0,
      checkoutClicks: 0,
      conversionRate: 0
    },
    topCTAs: [],
    eventsByHour: [],
    funnelData: [],
    planStats: [],
    lastUpdate: Date.now()
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    try {
      const events = analyticsService.syncEvents();
      const metrics = analyticsService.calculateMetrics(events);
      const topCTAs = analyticsService.getTopCTAs(events);
      const eventsByHour = analyticsService.groupEventsByHour(events);
      const funnelData = analyticsService.calculateConversionFunnel(events);
      const planStats = analyticsService.getPlanStats(events);

      setData({
        metrics,
        topCTAs,
        eventsByHour,
        funnelData,
        planStats,
        lastUpdate: Date.now()
      });

      setIsLoading(false);
    } catch (error) {
      console.error('[Analytics] Erro ao buscar dados:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Buscar dados inicialmente
    fetchData();

    // Atualizar periodicamente
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { ...data, isLoading, refresh: fetchData };
};
