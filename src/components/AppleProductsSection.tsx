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
            <div className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: 10,
            transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
            opacity: isFirstCardVisible ? 0.9 : 0
          }}>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/40 to-black/80" style={{
              backgroundImage: "url('/lovable-uploads/apple-products-hero.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay"
            }} />
              <div className="absolute top-4 right-4 z-20">
                
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  
                  
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: 20,
            transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
            opacity: isSecondCardVisible ? 1 : 0,
            pointerEvents: isSecondCardVisible ? 'auto' : 'none'
          }}>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/40 to-black/80" style={{
              backgroundImage: "url('/lovable-uploads/apple-products-dashboard.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay"
            }} />
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Economia Real</span>
                </div>
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  
                  
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} style={{
            ...cardStyle,
            zIndex: 30,
            transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
            opacity: isThirdCardVisible ? 1 : 0,
            pointerEvents: isThirdCardVisible ? 'auto' : 'none'
          }}>
              <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/40 to-black/80" style={{
              backgroundImage: "url('/lovable-uploads/apple-products-dark.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "overlay"
            }} />
              <div className="absolute top-4 right-4 z-20">
                
              </div>
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-center">
                <div className="max-w-lg">
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default AppleProductsSection;