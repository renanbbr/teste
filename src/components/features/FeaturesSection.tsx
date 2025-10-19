import { useEffect, useRef, useState } from "react";
import { features } from "@/config/features";

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);

  const cardStyle = {
    height: '70vh',
    maxHeight: '700px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2.5;
          
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          if (progress >= 0.75) {
            setActiveCardIndex(3);
          } else if (progress >= 0.5) {
            setActiveCardIndex(2);
          } else if (progress >= 0.25) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative" style={{ height: '350vh' }}>
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="mb-4 md:mb-6">
            <h2 className="section-title text-4xl sm:text-5xl md:text-6xl font-normal mb-6 tracking-tight">
              Transforme a forma
              <br />
              <span className="text-gradient font-medium">como você compra Apple no Brasil</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Com o SealClub, você não precisa mais esperar promoção nem parcelar com juros. Aqui você tem acesso inteligente a produtos Apple com valor real de mercado.
            </p>
          </div>
          
          {/* Cards Container */}
          <div className="relative flex-1 perspective-1000">
            {features.map((feature, index) => {
              const isVisible = activeCardIndex >= index;
              const zIndex = 10 + (index * 10);
              const scale = 0.88 + (index * 0.04);
              const translateY = isVisible 
                ? activeCardIndex === index 
                  ? `${90 - (index * 20)}px`
                  : `${70 - (index * 20)}px`
                : '200px';
              
              return (
                <div 
                  key={feature.title}
                  className={`absolute inset-0 overflow-hidden shadow-2xl ${isVisible ? 'animate-card-enter' : ''}`} 
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${translateY}) scale(${scale})`,
                    opacity: isVisible ? (activeCardIndex === index ? 1 : 0.85) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                >
                  <div className="glass absolute inset-0 z-0" />
                  <div 
                    className="absolute inset-0 z-10 bg-gradient-to-br from-primary/10 to-transparent"
                    style={{
                      backgroundImage: `url(${feature.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay"
                    }}
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="feature-badge">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-sm font-semibold">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium">{feature.title}</span>
                    </div>
                  </div>
                  <div className="relative z-20 p-6 sm:p-8 md:p-10 h-full flex items-end">
                    <div className="max-w-lg">
                      <div className="mb-4 text-primary">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};