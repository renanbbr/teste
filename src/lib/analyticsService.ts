export interface AnalyticsEvent {
  event: string;
  timestamp: number;
  section_name?: string;
  button_text?: string;
  button_location?: string;
  plan_name?: string;
  plan_price?: string;
  click_url?: string;
  page_url?: string;
  scroll_depth_percent?: number;
}

export interface Metrics {
  totalViews: number;
  ctaClicks: number;
  whatsappClicks: number;
  checkoutClicks: number;
  conversionRate: number;
}

export interface CTAStats {
  text: string;
  location: string;
  clicks: number;
  percentage: number;
}

export interface ChartData {
  hour: string;
  cta_click: number;
  whatsapp_click: number;
  checkout_click: number;
  section_view: number;
}

export interface FunnelStep {
  name: string;
  value: number;
  percentage: number;
}

export interface PlanStats {
  name: string;
  clicks: number;
  percentage: number;
  color: string;
}

const STORAGE_KEY = 'sealclub_analytics_events';
const MAX_EVENTS = 1000;

export const analyticsService = {
  // Obter eventos do dataLayer
  getEventsFromDataLayer(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    const dataLayer = (window as any).dataLayer || [];
    return dataLayer.filter((item: any) => item.event).map((item: any) => ({
      ...item,
      timestamp: item.timestamp || Date.now()
    }));
  },

  // Salvar eventos no localStorage
  saveEventsToLocalStorage(events: AnalyticsEvent[]): void {
    if (typeof window === 'undefined') return;
    const limited = events.slice(-MAX_EVENTS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  },

  // Obter eventos armazenados
  getStoredEvents(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  },

  // Calcular métricas principais
  calculateMetrics(events: AnalyticsEvent[]): Metrics {
    const ctaClicks = events.filter(e => e.event === 'cta_click').length;
    const whatsappClicks = events.filter(e => e.event === 'whatsapp_click').length;
    const checkoutClicks = events.filter(e => e.event === 'checkout_click').length;
    const sectionViews = events.filter(e => e.event === 'section_view').length;
    
    const conversionRate = sectionViews > 0 
      ? (checkoutClicks / sectionViews) * 100 
      : 0;

    return {
      totalViews: sectionViews,
      ctaClicks,
      whatsappClicks,
      checkoutClicks,
      conversionRate: parseFloat(conversionRate.toFixed(2))
    };
  },

  // Agrupar eventos por hora
  groupEventsByHour(events: AnalyticsEvent[]): ChartData[] {
    const now = Date.now();
    const last24Hours = now - (24 * 60 * 60 * 1000);
    const recentEvents = events.filter(e => e.timestamp >= last24Hours);

    const hourMap = new Map<string, ChartData>();

    // Inicializar últimas 24 horas
    for (let i = 23; i >= 0; i--) {
      const date = new Date(now - (i * 60 * 60 * 1000));
      const hour = date.getHours().toString().padStart(2, '0') + ':00';
      hourMap.set(hour, {
        hour,
        cta_click: 0,
        whatsapp_click: 0,
        checkout_click: 0,
        section_view: 0
      });
    }

    // Contar eventos por hora
    recentEvents.forEach(event => {
      const date = new Date(event.timestamp);
      const hour = date.getHours().toString().padStart(2, '0') + ':00';
      const data = hourMap.get(hour);
      if (data && event.event in data) {
        (data as any)[event.event]++;
      }
    });

    return Array.from(hourMap.values());
  },

  // Obter top CTAs
  getTopCTAs(events: AnalyticsEvent[]): CTAStats[] {
    const ctaEvents = events.filter(e => e.event === 'cta_click');
    const ctaMap = new Map<string, { location: string; clicks: number }>();

    ctaEvents.forEach(event => {
      const key = event.button_text || 'Desconhecido';
      const existing = ctaMap.get(key);
      if (existing) {
        existing.clicks++;
      } else {
        ctaMap.set(key, {
          location: event.button_location || 'Desconhecido',
          clicks: 1
        });
      }
    });

    const total = ctaEvents.length;
    return Array.from(ctaMap.entries())
      .map(([text, data]) => ({
        text,
        location: data.location,
        clicks: data.clicks,
        percentage: total > 0 ? (data.clicks / total) * 100 : 0
      }))
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 5);
  },

  // Calcular funil de conversão
  calculateConversionFunnel(events: AnalyticsEvent[]): FunnelStep[] {
    const sectionViews = events.filter(e => e.event === 'section_view');
    const ctaClicks = events.filter(e => e.event === 'cta_click').length;
    const checkoutClicks = events.filter(e => e.event === 'checkout_click').length;
    
    const featuresViews = sectionViews.filter(e => e.section_name === 'features').length;
    const pricingViews = sectionViews.filter(e => e.section_name === 'pricing').length;
    const testimonialsViews = sectionViews.filter(e => e.section_name === 'testimonials').length;

    const total = sectionViews.length || 1;

    return [
      { name: 'Visualizações', value: total, percentage: 100 },
      { name: 'Features', value: featuresViews, percentage: (featuresViews / total) * 100 },
      { name: 'Pricing', value: pricingViews, percentage: (pricingViews / total) * 100 },
      { name: 'Testimonials', value: testimonialsViews, percentage: (testimonialsViews / total) * 100 },
      { name: 'CTA Clicks', value: ctaClicks, percentage: (ctaClicks / total) * 100 },
      { name: 'Checkout', value: checkoutClicks, percentage: (checkoutClicks / total) * 100 }
    ];
  },

  // Obter estatísticas de planos
  getPlanStats(events: AnalyticsEvent[]): PlanStats[] {
    const checkoutEvents = events.filter(e => e.event === 'checkout_click');
    const planMap = new Map<string, number>();

    checkoutEvents.forEach(event => {
      const plan = event.plan_name || 'Desconhecido';
      planMap.set(plan, (planMap.get(plan) || 0) + 1);
    });

    const total = checkoutEvents.length || 1;
    const colors = {
      'PRO': '#3b82f6',
      'TECH': '#8b5cf6',
      'ULTRA': '#ec4899',
      'ENTERPRISE': '#f59e0b'
    };

    return Array.from(planMap.entries())
      .map(([name, clicks]) => ({
        name,
        clicks,
        percentage: (clicks / total) * 100,
        color: (colors as any)[name] || '#6b7280'
      }))
      .sort((a, b) => b.clicks - a.clicks);
  },

  // Sincronizar eventos (dataLayer -> localStorage)
  syncEvents(): AnalyticsEvent[] {
    const dataLayerEvents = this.getEventsFromDataLayer();
    const storedEvents = this.getStoredEvents();
    
    // Merge e remover duplicatas
    const allEvents = [...storedEvents, ...dataLayerEvents];
    const uniqueEvents = Array.from(
      new Map(allEvents.map(e => [JSON.stringify(e), e])).values()
    );

    this.saveEventsToLocalStorage(uniqueEvents);
    return uniqueEvents;
  }
};
