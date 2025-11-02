import { motion } from "framer-motion";
import React from "react";
import { ArrowRight, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        {/* Background Video para Desktop */}
        <div className="absolute inset-0 hidden md:block">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://framerusercontent.com/assets/Bax1SXv4b9QI33bMvkicABKnI.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Background Gradiente para Mobile */}
        <div className="absolute inset-0 md:hidden bg-gradient-to-br from-black via-black/80 to-black" />
        
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
            <Button size="lg" className="button-gradient">
              Quero ser membro
            </Button>
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
        {/* Background com gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black py-0 my-[220px]" />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] mx-0 py-0 my-[220px]" />
        
        {/* Título e Subtítulo da Section */}
        <div className="container px-4 relative z-10 mb-8">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="flex justify-center mb-8">
            <span className="inline-flex items-center px-6 py-2 rounded-full 
                           bg-gradient-to-r from-blue-500/10 to-cyan-500/10 
                           border border-blue-500/20 text-sm font-medium text-blue-400">
              SEAL PASS
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-4xl md:text-5xl font-bold text-center mb-4">
            SealPass: conecte-se ao{" "}
            <span className="text-gradient">ecossistema</span>
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
        }} className="text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Descontos e experiências exclusivas com marcas que fazem parte da comunidade Seal.
            Cada parceria foi escolhida a dedo para oferecer vantagens reais ao membro SealClub.
          </motion.p>
        </div>

        <div className="container px-4 relative z-10 my-0 py-0">
          {/* Video do SealClub */}
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
        }} className="flex items-center justify-center mb-8">
            <div className="relative w-full max-w-[104rem]">
                <video autoPlay loop muted playsInline className="w-full h-full aspect-video object-cover">
                  <source src="/lovable-uploads/sealclub-branding.mp4" type="video/mp4" />
                </video>
              
              {/* Overlay de opacidade sobre o vídeo */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
              
              {/* Carrossel horizontal de logos sobreposto - 2 linhas */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 pointer-events-none py-8">
                {/* Linha superior - move para direita */}
                <div className="w-full overflow-hidden">
                  <motion.div className="flex items-center gap-8" animate={{
                  x: [-1500, 0]
                }} transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }} style={{
                  width: "fit-content"
                }}>
                    {[...Array(6)].map((_, setIndex) => <React.Fragment key={`top-${setIndex}`}>
                        {[{
                      src: "/brand-logos/apple-logo-new.png",
                      alt: "Apple"
                    }, {
                      src: "/brand-logos/dji-logo-new.png",
                      alt: "DJI"
                    }, {
                      src: "/brand-logos/motorola-logo-new.png",
                      alt: "Motorola"
                    }, {
                      src: "/brand-logos/jbl-logo-new.png",
                      alt: "JBL"
                    }].map((logo, index) => <motion.div key={`top-${setIndex}-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                      scale: 1.05,
                      y: -5
                    }} transition={{
                      duration: 0.3
                    }}>
                            <div className="relative w-14 h-14 md:w-16 md:h-16 
                                         bg-black/80 backdrop-blur-lg 
                                         border border-white/10
                                         rounded-xl 
                                         shadow-xl shadow-black/50
                                         flex items-center justify-center
                                         overflow-hidden
                                         transition-all duration-300
                                         group-hover:border-blue-500/30
                                         group-hover:bg-black/70
                                         group-hover:shadow-2xl
                                         group-hover:shadow-blue-500/30">
                              
                              <div className="absolute inset-0 bg-gradient-to-br 
                                           from-blue-500/0 to-cyan-500/0 
                                           group-hover:from-blue-500/20 
                                           group-hover:to-cyan-500/20 
                                           transition-all duration-300" />
                              
                              <img src={logo.src} alt={logo.alt} className="relative z-10 w-8 h-8 md:w-10 md:h-10 
                                         object-contain
                                         brightness-90 contrast-110
                                         transition-all duration-300
                                         group-hover:brightness-110 
                                         group-hover:scale-110" />
                            </div>
                          </motion.div>)}
                      </React.Fragment>)}
                  </motion.div>
                </div>

                {/* Linha inferior - move para esquerda */}
                <div className="w-full overflow-hidden">
                  <motion.div className="flex items-center gap-8" animate={{
                  x: [0, -1500]
                }} transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear"
                }} style={{
                  width: "fit-content"
                }}>
                    {[...Array(6)].map((_, setIndex) => <React.Fragment key={`bottom-${setIndex}`}>
                        {[{
                      src: "/brand-logos/garmin-logo-new.png",
                      alt: "Garmin"
                    }, {
                      src: "/brand-logos/playstation-logo-new.png",
                      alt: "PlayStation"
                    }, {
                      src: "/brand-logos/polar-logo-new.png",
                      alt: "Polar"
                    }, {
                      src: "/brand-logos/hollyland-logo-new.png",
                      alt: "Hollyland"
                    }].map((logo, index) => <motion.div key={`bottom-${setIndex}-${index}`} className="flex-shrink-0 pointer-events-auto group" whileHover={{
                      scale: 1.05,
                      y: -5
                    }} transition={{
                      duration: 0.3
                    }}>
                            <div className="relative w-14 h-14 md:w-16 md:h-16 
                                         bg-black/80 backdrop-blur-lg 
                                         border border-white/10 
                                         rounded-xl 
                                         shadow-xl shadow-black/50
                                         flex items-center justify-center
                                         overflow-hidden
                                         transition-all duration-300
                                         group-hover:border-blue-500/30
                                         group-hover:bg-black/70
                                         group-hover:shadow-2xl
                                         group-hover:shadow-blue-500/30">
                              
                              <div className="absolute inset-0 bg-gradient-to-br 
                                           from-blue-500/0 to-cyan-500/0 
                                           group-hover:from-blue-500/20 
                                           group-hover:to-cyan-500/20 
                                           transition-all duration-300" />
                              
                              <img src={logo.src} alt={logo.alt} className="relative z-10 w-8 h-8 md:w-10 md:h-10 
                                         object-contain
                                         brightness-90 contrast-110
                                         transition-all duration-300
                                         group-hover:brightness-110 
                                         group-hover:scale-110" />
                            </div>
                          </motion.div>)}
                      </React.Fragment>)}
                  </motion.div>
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