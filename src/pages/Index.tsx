import { motion } from "framer-motion";
import React from "react";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonHard } from "@/components/ui/button-hard";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import AppleProductsSection from "@/components/AppleProductsSection";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSectionV2 } from "@/components/pricing/PricingSectionV2";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import sealclubLogo from "@/assets/sealclub-logo.png";
const topLogos = [
  { src: "/partner-logos/italo-caldeira.png", alt: "Ítalo Caldeira Nutricionista" },
  { src: "/partner-logos/yellow-brownie.png", alt: "Yellow Brownie" },
  { src: "/partner-logos/q-caroline-fit.png", alt: "Q Caroline Fit" },
  { src: "/partner-logos/heinze-excursoes.png", alt: "Heinze Excursões" },
  { src: "/partner-logos/lancheria-pelotense.png", alt: "Lancheria Pelotense Bar" }
];

const bottomLogos = [
  { src: "/partner-logos/nina-doces.png", alt: "Nina Doces de Palotas" },
  { src: "/partner-logos/nina-fit.png", alt: "Nina Fit Doces Proteicos" },
  { src: "/partner-logos/ubuntu.svg", alt: "Ubuntu" },
  { src: "/partner-logos/paula-azambuya.png", alt: "Paula Azambuya Beauty" }
];
const Index = () => {
  return <div className="min-h-screen bg-black text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <motion.section initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="relative container px-4 pt-40 pb-20 py-0">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{
          objectFit: 'cover',
          zIndex: 0
        }}>
            <source src="https://framerusercontent.com/assets/Bax1SXv4b9QI33bMvkicABKnI.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30 z-[1]" />
        </div>
        
        {/* Overlay escuro universal (mobile e desktop) */}
        <div className="absolute inset-0 bg-black/20 z-[1]" />
        
        {/* Sombra de transição na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent z-[5]" />
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
            <span className="text-gray-200">
              <TextGenerateEffect words="Você sempre pagou caro" />
            </span>
            <br />
            <span className="text-white font-medium">
              <TextGenerateEffect words="por algo que poderia custar menos. Muito menos." />
            </span>
          </h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }} className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl text-left">
            Agora, com o SealClub, você acessa iPhones, Apple Watch, AirPods e até MacBooks{" "}
            <span className="text-white">com preço de custo.</span>
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="flex flex-col sm:flex-row gap-4 items-start">
            <ButtonHard className="text-base">
              Quero ser membro
            </ButtonHard>
          </motion.div>
        </div>

        {/* Dashboard integrado na mesma seção */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.8
      }} className="mt-20 max-w-7xl mx-auto relative">
          {/* Border gradient wrapper */}
          
        </motion.div>

      </motion.section>


      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features" className="bg-black">
        <FeaturesSection />
      </div>

      {/* New Arrivals Section */}
      <div className="bg-black">
        <NewArrivalsSection />
      </div>
      {/* Branding Section / SealPass Section */}
      <section className="relative bg-black pt-20 pb-8 overflow-hidden my-0 py-[8px]">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover" style={{
          objectFit: 'cover',
          zIndex: 0
        }}>
            <source src="/lovable-uploads/sealclub-branding.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50 z-[1]" />
        </div>

        {/* Overlay escuro universal (mobile e desktop) */}
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] z-[2]" />
        
        {/* Título e Subtítulo da Section */}
        <div className="container px-4 relative z-10 mb-8">
          {/* Badge */}
        

          {/* Título */}
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl font-normal mb-6 tracking-tight text-center">
            SealPass: faça parte da nossa{" "}
            <span className="text-gradient font-medium">comunidade e economize todos os dias</span>
          </motion.h2>

          {/* Subtítulo */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto">Descontos e vantagens reais com marcas parceiras que fazem você economizar todos os dias.</motion.p>
        </div>

        <div className="container px-4 relative z-10 my-0 py-0">
          {/* Carrossel de logos sobreposto */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }} className="relative z-10">
            <div className="flex flex-col items-center justify-center gap-8 py-8">
              {/* Linha superior - move para direita */}
            <div className="w-full overflow-hidden">
              <div className="relative flex">
                <div className="animate-marquee-partners flex min-w-full shrink-0 items-center gap-10">
                    {topLogos.map((logo, index) => <motion.div key={`top-1-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                    scale: 1.05,
                    y: -5
                  }} transition={{
                    duration: 0.3
                  }}>
                      <div className="relative w-28 h-28 md:w-32 md:h-32 
                                bg-[#1B1B1B]/40 backdrop-blur-xl 
                                border border-white/10
                                rounded-2xl 
                                shadow-2xl shadow-black/40
                                flex items-center justify-center
                                overflow-hidden
                                transition-all duration-300
                                group-hover:border-white/20
                                group-hover:bg-[#1B1B1B]/60">
                          
                        <img 
                          src={logo.src} 
                          alt={logo.alt} 
                          className="relative z-10 w-20 h-20 md:w-24 md:h-24 
                                    object-contain
                                    filter brightness-100 contrast-100
                                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                                    transition-all duration-300
                                    group-hover:scale-105"
                          style={{ mixBlendMode: 'normal' }}
                        />
                        </div>
                      </motion.div>)}
                  </div>
                  <div className="animate-marquee-partners flex min-w-full shrink-0 items-center gap-10">
                    {topLogos.map((logo, index) => <motion.div key={`top-2-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                    scale: 1.05,
                    y: -5
                  }} transition={{
                    duration: 0.3
                  }}>
                        <div className="relative w-24 h-24 md:w-28 md:h-28 
                                      bg-[#1B1B1B]/40 backdrop-blur-xl 
                                      border border-white/10
                                      rounded-2xl 
                                      shadow-2xl shadow-black/60
                                      flex items-center justify-center
                                      overflow-hidden
                                      transition-all duration-300
                                      group-hover:border-white/20
                                      group-hover:bg-[#1B1B1B]/60">
                          
                          <img 
                            src={logo.src} 
                            alt={logo.alt} 
                            className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                      object-contain
                                      filter brightness-95 contrast-105
                                      transition-all duration-300
                                      group-hover:scale-105"
                            style={{ mixBlendMode: 'normal' }}
                          />
                        </div>
                      </motion.div>)}
                  </div>
                </div>
              </div>

              {/* Linha inferior - move para esquerda */}
              <div className="w-full overflow-hidden">
              <div className="relative flex">
                <div className="animate-marquee-partners-reverse flex min-w-full shrink-0 items-center gap-10">
                    {bottomLogos.map((logo, index) => <motion.div key={`bottom-1-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                    scale: 1.05,
                    y: -5
                  }} transition={{
                    duration: 0.3
                  }}>
                        <div className="relative w-24 h-24 md:w-28 md:h-28 
                                      bg-[#1B1B1B]/40 backdrop-blur-xl 
                                      border border-white/10 
                                      rounded-2xl 
                                      shadow-2xl shadow-black/60
                                      flex items-center justify-center
                                      overflow-hidden
                                      transition-all duration-300
                                      group-hover:border-white/20
                                      group-hover:bg-[#1B1B1B]/60">
                          
                          <img 
                            src={logo.src} 
                            alt={logo.alt} 
                            className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                      object-contain
                                      filter brightness-95 contrast-105
                                      transition-all duration-300
                                      group-hover:scale-105"
                            style={{ mixBlendMode: 'normal' }}
                          />
                        </div>
                      </motion.div>)}
                  </div>
                  <div className="animate-marquee-partners-reverse flex min-w-full shrink-0 items-center gap-10">
                    {bottomLogos.map((logo, index) => <motion.div key={`bottom-2-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                    scale: 1.05,
                    y: -5
                  }} transition={{
                    duration: 0.3
                  }}>
                        <div className="relative w-24 h-24 md:w-28 md:h-28 
                                      bg-[#1B1B1B]/40 backdrop-blur-xl 
                                      border border-white/10 
                                      rounded-2xl 
                                      shadow-2xl shadow-black/60
                                      flex items-center justify-center
                                      overflow-hidden
                                      transition-all duration-300
                                      group-hover:border-white/20
                                      group-hover:bg-[#1B1B1B]/60">
                          
                          <img 
                            src={logo.src} 
                            alt={logo.alt} 
                            className="relative z-10 w-16 h-16 md:w-20 md:h-20 
                                      object-contain
                                      filter brightness-95 contrast-105
                                      transition-all duration-300
                                      group-hover:scale-105"
                            style={{ mixBlendMode: 'normal' }}
                          />
                        </div>
                      </motion.div>)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>


          {/* CTA */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.2
        }} className="flex justify-center">
            
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSectionV2 />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* FAQ Section */}
      <div className="bg-black">
        <FAQSection />
      </div>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative bg-black">
        <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'url("/lovable-uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="bg-[#0A0A0A]/80 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para Elevar Sua Experiência Tecnológica?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se à comunidade que está redefinindo o acesso à tecnologia de ponta. Seu upgrade inteligente começa agora.
          </p>
          <Button size="lg" className="button-gradient">
            Quero Minha Vantagem Exclusiva
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>
    </div>;
};
export default Index;