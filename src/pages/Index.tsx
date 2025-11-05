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
import { SealPassSection } from "@/components/SealPassSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
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
            <ButtonHard 
              className="text-base"
              onClick={() => {
                (window as any).dataLayer = (window as any).dataLayer || [];
                (window as any).dataLayer.push({
                  event: 'cta_click',
                  button_text: 'Quero ser membro',
                  button_location: 'hero_section',
                  page_url: window.location.href
                });
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
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
        <SealPassSection title="SealPass: faça parte da nossa" titleHighlight="comunidade e economize todos os dias" subtitle="Descontos e vantagens reais com marcas parceiras que fazem você economizar todos os dias." />

      {/* Pricing Section */}
      <div id="pricing" className="bg-black">
        <PricingSectionV2 />
      </div>

      {/* Testimonials Section */}
      <div className="bg-black">
        <TestimonialsSection />
      </div>

      {/* Segunda Seção SealPass */}
        

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
          <Button 
            size="lg" 
            className="button-gradient"
            onClick={() => {
              (window as any).dataLayer = (window as any).dataLayer || [];
              (window as any).dataLayer.push({
                event: 'cta_click',
                button_text: 'Quero Minha Vantagem Exclusiva',
                button_location: 'final_cta_section',
                page_url: window.location.href
              });
              const pricingSection = document.getElementById('pricing');
              if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Quero Minha Vantagem Exclusiva
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <div className="bg-black">
        <Footer />
      </div>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>;
};
export default Index;