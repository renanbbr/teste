import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const heroCards = [
  {
    image: "/lovable-uploads/apple-products-dark.jpg",
    title: "Você sempre pagou caro",
    subtitle: "por algo que poderia custar menos. Muito menos.",
    description: "Agora, com o SealClub, você acessa iPhones, Apple Watch, AirPods e até MacBooks com preço de custo.",
    badge: "Preço de Custo"
  },
  {
    image: "/lovable-uploads/apple-products-dashboard.jpg",
    title: "Exclusividade que você merece",
    subtitle: "Acesso VIP aos melhores produtos Apple",
    description: "Clube fechado com número limitado de membros. Não é para todos — é para quem valoriza experiência premium.",
    badge: "Membros Exclusivos"
  },
  {
    image: "/lovable-uploads/7335619d-58a9-41ad-a233-f7826f56f3e9.png",
    title: "Suporte que faz diferença",
    subtitle: "Atendimento personalizado para membros",
    description: "Suporte vitalício, consultor pessoal e garantia completa. Aqui você não é mais um. Você é membro.",
    badge: "Suporte Premium"
  },
  {
    image: "/lovable-uploads/79f2b901-8a4e-42a5-939f-fae0828e0aef.png",
    title: "Agilidade quando você precisa",
    subtitle: "Aparelho reserva sempre disponível",
    description: "Aparelho reserva se o seu der problema. Porque você não pode parar.",
    badge: "Backup Garantido"
  }
];

export const HeroCardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);

  const cardStyle = {
    height: '75vh',
    maxHeight: '800px',
    borderRadius: '24px',
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

  const currentCard = heroCards[activeCardIndex];

  return (
    <div ref={sectionRef} className="relative" style={{ height: '400vh' }}>
      <section className="w-full h-screen sticky top-0 overflow-hidden bg-black">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col pt-32 pb-10">
          {/* Header - Animado baseado no card ativo */}
          <motion.div 
            key={activeCardIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 max-w-4xl z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
              <span className="text-gray-200">
                {currentCard.title}
              </span>
              <br />
              <span className="text-white font-medium">
                {currentCard.subtitle}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left">
              {currentCard.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button size="lg" className="button-gradient">
                Quero ser membro
              </Button>
            </div>
          </motion.div>
          
          {/* Cards Container */}
          <div className="relative flex-1 perspective-1000">
            {heroCards.map((card, index) => {
              const isVisible = activeCardIndex >= index;
              const zIndex = 10 + (index * 10);
              const scale = 0.85 + (index * 0.05);
              const translateY = isVisible 
                ? activeCardIndex === index 
                  ? `${20}px`
                  : `${10 - (index * 5)}px`
                : '200px';
              
              return (
                <div 
                  key={card.title}
                  className={`absolute inset-0 overflow-hidden shadow-2xl ${isVisible ? 'animate-card-enter' : ''}`} 
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${translateY}) scale(${scale})`,
                    opacity: isVisible ? (activeCardIndex === index ? 1 : 0.7) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none'
                  }}
                >
                  <div className="glass absolute inset-0 z-0" />
                  <div 
                    className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80"
                    style={{
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundBlendMode: "overlay"
                    }}
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="feature-badge">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2 text-sm font-semibold">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium">{card.badge}</span>
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
