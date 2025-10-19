import React, { useEffect, useRef, useState } from "react";
const AppleProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;
  return <div ref={sectionRef} className="relative" style={{
    height: '300vh'
  }}>
      <section className="w-full h-screen py-10 sticky top-0 overflow-hidden bg-black md:py-0">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 text-white">
              Por que SealClub
            </h2>
          </div>

          {/* Cards Container */}
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {/* Card 1 */}
            <div className={`absolute inset-0 overflow-visible shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: activeCardIndex === 0 ? 30 : 10,
            transform: activeCardIndex === 0 
              ? 'translateY(0) scale(1)' 
              : activeCardIndex === 1 
                ? 'translateY(120px) scale(0.95)' 
                : 'translateY(160px) scale(0.9)',
            opacity: activeCardIndex === 0 ? 1 : 0.7
          }}>
              <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.5))' }}>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#4C1D95', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#C2410C', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#F97316', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient1)" rx="20" />
              </svg>
              <div className="absolute inset-[3px] z-0 bg-gradient-to-br from-purple-900 via-orange-800 to-orange-500 rounded-[18px]" />
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500/90 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Exclusivo</span>
                </div>
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Acesso a preços de custo
                  </h3>
                  <p className="text-lg text-white/90">
                    Produtos Apple com economia de até 40% comparado ao varejo tradicional
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className={`absolute inset-0 overflow-visible shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: activeCardIndex === 1 ? 30 : activeCardIndex === 0 ? 20 : 15,
            transform: activeCardIndex === 1 
              ? 'translateY(0) scale(1)' 
              : activeCardIndex === 0 
                ? 'translateY(60px) scale(0.95)' 
                : 'translateY(120px) scale(0.95)',
            opacity: activeCardIndex === 1 ? 1 : 0.8,
            pointerEvents: 'auto'
          }}>
              <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.5))' }}>
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#581C87', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#EA580C', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#FB923C', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient2)" rx="20" />
              </svg>
              <div className="absolute inset-[3px] z-0 bg-gradient-to-br from-purple-950 via-orange-700 to-orange-400 rounded-[18px]" />
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500/90 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Economia Real</span>
                </div>
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Sem taxas escondidas
                  </h3>
                  <p className="text-lg text-white/90">
                    Transparência total: você paga apenas o preço de custo + a mensalidade do clube
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className={`absolute inset-0 overflow-visible shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: activeCardIndex === 2 ? 30 : 20,
            transform: activeCardIndex === 2 
              ? 'translateY(0) scale(1)' 
              : activeCardIndex === 1 
                ? 'translateY(60px) scale(0.98)' 
                : 'translateY(120px) scale(0.96)',
            opacity: activeCardIndex === 2 ? 1 : 0.9,
            pointerEvents: 'auto'
          }}>
              <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 20px rgba(249, 115, 22, 0.5))' }}>
                <defs>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#6B21A8', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#FBBF24', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient3)" rx="20" />
              </svg>
              <div className="absolute inset-[3px] z-0 bg-gradient-to-br from-purple-900 via-red-700 to-yellow-500 rounded-[18px]" />
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-orange-500/90 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Premium</span>
                </div>
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Comunidade exclusiva
                  </h3>
                  <p className="text-lg text-white/90">
                    Faça parte de um grupo seleto que tem acesso aos melhores produtos com os melhores preços
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AppleProductsSection;