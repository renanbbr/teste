import { useEffect, useRef } from 'react';

export const useSectionTracking = () => {
  const observedSectionsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections = document.querySelectorAll('[data-track-section]');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Dispara quando 30% da seção está visível
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionName = entry.target.getAttribute('data-track-section');
          
          // Dispara evento apenas uma vez por seção
          if (sectionName && !observedSectionsRef.current.has(sectionName)) {
            observedSectionsRef.current.add(sectionName);
            
            // Push para dataLayer
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'section_view',
              section_name: sectionName,
              page_url: window.location.href,
              scroll_depth_percent: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100)
            });

            console.log(`[GA4 Tracking] Section viewed: ${sectionName}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
};
